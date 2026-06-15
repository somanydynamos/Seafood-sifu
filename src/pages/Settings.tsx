import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  DEFAULT_MODEL,
  MODEL_OPTIONS,
  getApiKey,
  getModel,
  setApiKey,
  setModel,
} from '../utils/settings'

export default function Settings() {
  const [key, setKey] = useState(getApiKey())
  const [model, setModelState] = useState(getModel() || DEFAULT_MODEL)
  const [saved, setSaved] = useState(false)

  function save() {
    setApiKey(key.trim())
    setModel(model)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function clearKey() {
    setApiKey('')
    setKey('')
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-10 pt-5">
      <h1 className="font-display text-2xl font-bold text-ocean">Settings</h1>
      <p className="mt-1 text-sm text-ink/55">
        Photo identification uses Claude's vision model directly from your browser.
      </p>

      <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm border border-ocean/10">
        <label className="block text-sm font-semibold text-ink">Anthropic API key</label>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="sk-ant-…"
          autoComplete="off"
          className="mt-2 w-full rounded-xl border border-ocean/20 px-3 py-2.5 text-sm outline-none focus:border-ocean/50"
        />
        <p className="mt-2 text-xs text-ink/55">
          Stored only in this browser (localStorage). It is sent only to Anthropic's API when you
          identify a photo. Get a key at{' '}
          <a
            href="https://console.anthropic.com/settings/keys"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-ocean underline"
          >
            console.anthropic.com
          </a>
          .
        </p>

        <label className="mt-4 block text-sm font-semibold text-ink">Model</label>
        <div className="mt-2 space-y-2">
          {MODEL_OPTIONS.map((m) => (
            <label
              key={m.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${
                model === m.id ? 'border-ocean bg-ocean/5' : 'border-ocean/15'
              }`}
            >
              <input
                type="radio"
                name="model"
                checked={model === m.id}
                onChange={() => setModelState(m.id)}
                className="accent-ocean"
              />
              <span>
                <span className="block text-sm font-medium text-ink">{m.label}</span>
                <span className="block text-xs text-ink/55">{m.note}</span>
              </span>
            </label>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button onClick={save} className="rounded-xl bg-ocean px-5 py-2.5 text-sm font-semibold text-white">
            Save
          </button>
          {key && (
            <button onClick={clearKey} className="text-sm font-medium text-red-600">
              Remove key
            </button>
          )}
          {saved && <span className="text-sm font-medium text-emerald-600">Saved ✓</span>}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-ocean/10 bg-white/70 p-4 text-xs text-ink/55">
        <p className="font-semibold text-ink/70">A note on privacy & cost</p>
        <p className="mt-1">
          Your key never leaves your device except in the direct request to Anthropic. Each photo
          identification is a single API call billed to your Anthropic account. You can remove the key
          any time.
        </p>
      </div>

      <Link to="/camera" className="mt-5 inline-block text-sm font-medium text-ocean underline">
        ← Back to identify
      </Link>
    </div>
  )
}
