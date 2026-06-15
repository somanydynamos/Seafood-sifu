import { useMemo, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import { recipes } from '../utils/data'
import type { Recipe } from '../types'

type SortKey = 'featured' | 'time' | 'difficulty'
type SortDir = 'asc' | 'desc'

const DIFFICULTY_RANK: Record<Recipe['difficulty'], number> = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
}

const SORTS: { key: SortKey; label: string; ascLabel: string; descLabel: string }[] = [
  { key: 'featured', label: 'Featured', ascLabel: '', descLabel: '' },
  { key: 'time', label: 'Prep time', ascLabel: 'fastest first', descLabel: 'slowest first' },
  { key: 'difficulty', label: 'Difficulty', ascLabel: 'easiest first', descLabel: 'hardest first' },
]

export default function Recipes() {
  const cuisines = ['All', ...Array.from(new Set(recipes.map((r) => r.cuisine)))]
  const [cuisine, setCuisine] = useState('All')
  const [sortKey, setSortKey] = useState<SortKey>('featured')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  function handleSort(key: SortKey) {
    if (key === 'featured') {
      setSortKey('featured')
      return
    }
    if (key === sortKey) {
      // Toggle direction when tapping the active sort again
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const visible = useMemo(() => {
    const list = cuisine === 'All' ? recipes : recipes.filter((r) => r.cuisine === cuisine)
    if (sortKey === 'featured') return list
    const sorted = [...list].sort((a, b) => {
      const diff =
        sortKey === 'time'
          ? a.prepTimeMinutes - b.prepTimeMinutes
          : DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty]
      return sortDir === 'asc' ? diff : -diff
    })
    return sorted
  }, [cuisine, sortKey, sortDir])

  return (
    <div className="mx-auto max-w-2xl px-4 pb-10 pt-5">
      <h1 className="font-display text-2xl font-bold text-ocean">Recipe Library</h1>
      <p className="mt-1 text-sm text-ink/55">
        Local Singapore and Southeast Asian recipes that make the most of each catch's flavour and texture.
      </p>

      {/* Sort controls */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink/45">Sort</span>
        {SORTS.map((s) => {
          const active = sortKey === s.key
          const arrow = active && s.key !== 'featured' ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''
          return (
            <button
              key={s.key}
              onClick={() => handleSort(s.key)}
              aria-pressed={active}
              title={
                s.key === 'featured'
                  ? 'Original order'
                  : active
                    ? `Sorted ${sortDir === 'asc' ? s.ascLabel : s.descLabel} — tap to reverse`
                    : `Sort by ${s.label.toLowerCase()}`
              }
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                active ? 'bg-coral text-white' : 'bg-white text-ink/70 border border-ocean/15'
              }`}
            >
              {s.label}
              {arrow}
            </button>
          )
        })}
        {sortKey !== 'featured' && (
          <span className="text-xs text-ink/45">
            {sortDir === 'asc'
              ? SORTS.find((s) => s.key === sortKey)?.ascLabel
              : SORTS.find((s) => s.key === sortKey)?.descLabel}
          </span>
        )}
      </div>

      {/* Cuisine filter */}
      <div className="mt-3 flex flex-wrap gap-2">
        {cuisines.map((c) => (
          <button
            key={c}
            onClick={() => setCuisine(c)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              cuisine === c ? 'bg-ocean text-white' : 'bg-white text-ink/70 border border-ocean/15'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-ink/45">
        {visible.length} recipe{visible.length === 1 ? '' : 's'}
      </p>

      <div className="mt-2 space-y-3">
        {visible.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  )
}
