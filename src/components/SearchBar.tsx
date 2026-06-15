import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  initialValue?: string
  autoFocus?: boolean
  onSubmitted?: () => void
}

export default function SearchBar({ initialValue = '', autoFocus = false, onSubmitted }: SearchBarProps) {
  const [value, setValue] = useState(initialValue)
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`)
      onSubmitted?.()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center gap-2 bg-white rounded-2xl shadow-sm border border-ocean/10 px-4 py-3 focus-within:border-ocean/40 transition-colors">
        <span className="text-lg" aria-hidden>
          🔍
        </span>
        <input
          type="search"
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search seafood or recipes — e.g. pomfret, crab, sambal…"
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink/40"
        />
      </div>
    </form>
  )
}
