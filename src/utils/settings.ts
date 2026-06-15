const KEY_STORAGE = 'seafood-sifu.apiKey'
const MODEL_STORAGE = 'seafood-sifu.model'

export const DEFAULT_MODEL = 'claude-opus-4-8'

export const MODEL_OPTIONS: { id: string; label: string; note: string }[] = [
  { id: 'claude-opus-4-8', label: 'Claude Opus 4.8', note: 'Most accurate identification' },
  { id: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6', note: 'Balanced speed and accuracy' },
  { id: 'claude-haiku-4-5-20251001', label: 'Claude Haiku 4.5', note: 'Fastest and cheapest' },
]

export function getApiKey(): string {
  try {
    return localStorage.getItem(KEY_STORAGE) ?? ''
  } catch {
    return ''
  }
}

export function setApiKey(key: string): void {
  try {
    if (key) localStorage.setItem(KEY_STORAGE, key)
    else localStorage.removeItem(KEY_STORAGE)
  } catch {
    /* ignore storage errors (private mode) */
  }
}

export function hasApiKey(): boolean {
  return getApiKey().length > 0
}

export function getModel(): string {
  try {
    return localStorage.getItem(MODEL_STORAGE) || DEFAULT_MODEL
  } catch {
    return DEFAULT_MODEL
  }
}

export function setModel(model: string): void {
  try {
    localStorage.setItem(MODEL_STORAGE, model)
  } catch {
    /* ignore */
  }
}
