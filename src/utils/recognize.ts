import type { RecognitionMatch } from '../types'
import { seafood } from './data'
import { getApiKey, getModel } from './settings'

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'

/**
 * Draw an image source onto a canvas, downscale to a max dimension, and return
 * base64-encoded JPEG data (no data: prefix) suitable for the Anthropic API.
 */
export async function imageToBase64(
  source: HTMLImageElement | HTMLCanvasElement,
  maxDim = 1024,
): Promise<string> {
  const srcW = source instanceof HTMLImageElement ? source.naturalWidth : source.width
  const srcH = source instanceof HTMLImageElement ? source.naturalHeight : source.height
  const scale = Math.min(1, maxDim / Math.max(srcW, srcH))
  const w = Math.round(srcW * scale)
  const h = Math.round(srcH * scale)

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(source, 0, 0, w, h)
  const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
  return dataUrl.split(',')[1]
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function buildPrompt(): string {
  const list = seafood
    .map(
      (s) =>
        `- id: "${s.id}" | ${s.commonName} (${s.scientificName}) | also called ${s.localNames.join(
          ', ',
        )} | ${s.category} | ${s.description}`,
    )
    .join('\n')

  return `You are "Seafood Sifu", an expert at identifying seafood sold in Singapore wet markets.

Identify the seafood in the photo. Choose the best matches ONLY from this known library:

${list}

Return STRICT JSON — an array of up to 3 objects, ranked most-likely first, in this exact shape:
[{"seafoodId": "<id from the list, or null if none fits>", "commonName": "<the common name>", "confidence": <number 0-1>, "reasoning": "<one short sentence on the visual cues>"}]

Rules:
- Use the "id" values exactly as written above for seafoodId.
- If the photo clearly is not seafood from this library, return a single object with seafoodId null, commonName "Not recognised", confidence 0, and a brief reason.
- Output ONLY the JSON array, no markdown, no commentary.`
}

function parseMatches(text: string): RecognitionMatch[] {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/, '')
    .trim()
  const start = cleaned.indexOf('[')
  const end = cleaned.lastIndexOf(']')
  const json = start >= 0 && end >= 0 ? cleaned.slice(start, end + 1) : cleaned
  const raw = JSON.parse(json) as Array<{
    seafoodId: string | null
    commonName?: string
    confidence?: number
    reasoning?: string
  }>
  return raw.slice(0, 3).map((m) => ({
    seafoodId: m.seafoodId ?? null,
    commonName: m.commonName ?? 'Unknown',
    confidence: typeof m.confidence === 'number' ? m.confidence : 0,
    reasoning: m.reasoning ?? '',
  }))
}

export async function recognizeSeafood(base64Jpeg: string): Promise<RecognitionMatch[]> {
  const apiKey = getApiKey()
  if (!apiKey) throw new Error('NO_API_KEY')

  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: getModel(),
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: 'image/jpeg', data: base64Jpeg },
            },
            { type: 'text', text: buildPrompt() },
          ],
        },
      ],
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    if (res.status === 401) throw new Error('BAD_API_KEY')
    throw new Error(`API_ERROR_${res.status}: ${body.slice(0, 200)}`)
  }

  const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> }
  const text = data.content?.find((c) => c.type === 'text')?.text ?? ''
  try {
    return parseMatches(text)
  } catch {
    throw new Error('PARSE_ERROR')
  }
}
