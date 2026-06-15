import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { imageToBase64, loadImage, recognizeSeafood } from '../utils/recognize'
import { hasApiKey } from '../utils/settings'

interface Rect {
  x: number
  y: number
  w: number
  h: number
}

type Status = 'idle' | 'loading' | 'error'

function encodeMatches(matches: unknown): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(matches))))
}

export default function Camera() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [rect, setRect] = useState<Rect | null>(null)
  const dragStart = useRef<{ x: number; y: number } | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const navigate = useNavigate()
  const keyPresent = hasApiKey()

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImageUrl(reader.result as string)
      setRect(null)
      setStatus('idle')
      setError('')
    }
    reader.readAsDataURL(file)
  }

  // --- drag-to-select a region (for photos with several items) ---
  function relativePoint(e: React.PointerEvent) {
    const el = e.currentTarget as HTMLElement
    const r = el.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }
  function onPointerDown(e: React.PointerEvent) {
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    const p = relativePoint(e)
    dragStart.current = p
    setRect({ x: p.x, y: p.y, w: 0, h: 0 })
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragStart.current) return
    const p = relativePoint(e)
    const s = dragStart.current
    setRect({ x: Math.min(s.x, p.x), y: Math.min(s.y, p.y), w: Math.abs(p.x - s.x), h: Math.abs(p.y - s.y) })
  }
  function onPointerUp() {
    dragStart.current = null
    if (rect && (rect.w < 12 || rect.h < 12)) setRect(null)
  }

  async function identify() {
    if (!imageUrl) return
    setStatus('loading')
    setError('')
    try {
      const img = await loadImage(imageUrl)
      let base64: string
      const displayed = imgRef.current
      if (rect && rect.w > 12 && rect.h > 12 && displayed) {
        // Map the on-screen selection to natural image pixels and crop
        const scaleX = img.naturalWidth / displayed.clientWidth
        const scaleY = img.naturalHeight / displayed.clientHeight
        const cx = Math.round(rect.x * scaleX)
        const cy = Math.round(rect.y * scaleY)
        const cw = Math.round(rect.w * scaleX)
        const ch = Math.round(rect.h * scaleY)
        const canvas = document.createElement('canvas')
        canvas.width = cw
        canvas.height = ch
        canvas.getContext('2d')!.drawImage(img, cx, cy, cw, ch, 0, 0, cw, ch)
        base64 = await imageToBase64(canvas)
      } else {
        base64 = await imageToBase64(img)
      }

      const matches = await recognizeSeafood(base64)
      navigate(`/search?from=camera&matches=${encodeURIComponent(encodeMatches(matches))}`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setStatus('error')
      if (msg === 'NO_API_KEY') setError('NO_API_KEY')
      else if (msg === 'BAD_API_KEY') setError('Your API key was rejected. Check it in Settings.')
      else if (msg === 'PARSE_ERROR') setError("Couldn't read the result. Please try another photo.")
      else setError(`Identification failed: ${msg}`)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-10 pt-5">
      <h1 className="font-display text-2xl font-bold text-ocean">Identify Seafood</h1>
      <p className="mt-1 text-sm text-ink/55">
        Take or upload a photo of the catch. For a clearer result, get close and fill the frame with a
        single item.
      </p>

      {/* Capture / upload */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="flex cursor-pointer flex-col items-center gap-1 rounded-2xl bg-gradient-to-br from-ocean to-deep p-5 text-white shadow active:scale-[0.99]">
          <span className="text-3xl">📷</span>
          <span className="text-sm font-semibold">Take photo</span>
          <input type="file" accept="image/*" capture="environment" className="hidden" onChange={onFile} />
        </label>
        <label className="flex cursor-pointer flex-col items-center gap-1 rounded-2xl border border-ocean/15 bg-white p-5 text-ocean shadow-sm active:scale-[0.99]">
          <span className="text-3xl">🖼️</span>
          <span className="text-sm font-semibold">Upload photo</span>
          <input type="file" accept="image/*" className="hidden" onChange={onFile} />
        </label>
      </div>

      {/* Preview + selection */}
      {imageUrl && (
        <div className="mt-5">
          <div
            className="relative touch-none overflow-hidden rounded-2xl border border-ocean/15 bg-black/5 select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <img ref={imgRef} src={imageUrl} alt="Captured seafood" className="block w-full" draggable={false} />
            {rect && (
              <div
                className="pointer-events-none absolute border-2 border-coral bg-coral/15"
                style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }}
              />
            )}
          </div>
          <p className="mt-2 text-xs text-ink/50">
            {rect && rect.w > 12
              ? '✅ Selected region will be identified. Drag again to reselect.'
              : 'Several items in the photo? Drag a box around the one you want.'}
          </p>

          <button
            onClick={identify}
            disabled={status === 'loading'}
            className="mt-3 w-full rounded-2xl bg-coral py-3.5 font-display text-lg font-semibold text-white shadow disabled:opacity-60"
          >
            {status === 'loading' ? 'Identifying…' : 'Identify this seafood'}
          </button>
        </div>
      )}

      {/* No API key notice */}
      {!keyPresent && (
        <div className="mt-5 rounded-2xl border border-amber/40 bg-amber/10 p-4">
          <h3 className="font-semibold text-ink">AI identification needs a one-time setup</h3>
          <p className="mt-1 text-sm text-ink/70">
            Photo recognition uses Claude's vision model. Add your own Anthropic API key once — it's
            stored only on this device and never sent anywhere except Anthropic.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link to="/settings" className="rounded-xl bg-ocean px-4 py-2 text-sm font-semibold text-white">
              Add API key
            </Link>
            <Link
              to="/library"
              className="rounded-xl border border-ocean/20 bg-white px-4 py-2 text-sm font-semibold text-ocean"
            >
              Match manually in library
            </Link>
          </div>
        </div>
      )}

      {/* Errors */}
      {status === 'error' && error === 'NO_API_KEY' && (
        <div className="mt-4 rounded-2xl border border-amber/40 bg-amber/10 p-4 text-sm text-ink/80">
          Add your Anthropic API key in{' '}
          <Link to="/settings" className="font-semibold text-ocean underline">
            Settings
          </Link>{' '}
          to use AI identification, or{' '}
          <Link to="/library" className="font-semibold text-ocean underline">
            browse the library
          </Link>
          .
        </div>
      )}
      {status === 'error' && error !== 'NO_API_KEY' && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      <p className="mt-6 text-xs text-ink/40">
        AI identification is a guide, not a guarantee. Always confirm the species — especially for
        anything you'll eat — and note that look-alikes are common in wet markets.
      </p>
    </div>
  )
}
