import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SeafoodCard from '../components/SeafoodCard'
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  getSeafoodByCategory,
  parsePriceLow,
} from '../utils/data'
import { iucnSortRank } from '../utils/iucn'
import type { Seafood, SeafoodCategory } from '../types'

type SortKey = 'category' | 'name' | 'price' | 'iucn'
type SortDir = 'asc' | 'desc'

const SORTS: {
  key: SortKey
  label: string
  defaultDir: SortDir
  ascLabel: string
  descLabel: string
}[] = [
  { key: 'category', label: 'Default', defaultDir: 'asc', ascLabel: '', descLabel: '' },
  { key: 'name', label: 'Name', defaultDir: 'asc', ascLabel: 'A–Z', descLabel: 'Z–A' },
  {
    key: 'price',
    label: 'Price',
    defaultDir: 'asc',
    ascLabel: 'cheapest first',
    descLabel: 'priciest first',
  },
  {
    key: 'iucn',
    label: 'IUCN status',
    defaultDir: 'desc',
    ascLabel: 'least threatened first',
    descLabel: 'most threatened first',
  },
]

export default function Library() {
  const [params, setParams] = useSearchParams()
  const active = params.get('category') as SeafoodCategory | null
  const byCategory = getSeafoodByCategory()
  const categories = active ? [active] : CATEGORY_ORDER

  const [sortKey, setSortKey] = useState<SortKey>('category')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  function selectCategory(cat: SeafoodCategory | null) {
    if (cat) setParams({ category: cat })
    else setParams({})
  }

  function handleSort(key: SortKey) {
    if (key === 'category') {
      setSortKey('category')
      return
    }
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(SORTS.find((s) => s.key === key)!.defaultDir)
    }
  }

  const sortItems = useMemo(() => {
    return (items: Seafood[]): Seafood[] => {
      if (sortKey === 'category') return items
      const sorted = [...items].sort((a, b) => {
        let base = 0
        if (sortKey === 'name') base = a.commonName.localeCompare(b.commonName)
        else if (sortKey === 'price') base = parsePriceLow(a.pricePer100g) - parsePriceLow(b.pricePer100g)
        else if (sortKey === 'iucn') base = iucnSortRank(a.iucnStatus) - iucnSortRank(b.iucnStatus)
        return sortDir === 'asc' ? base : -base
      })
      return sorted
    }
  }, [sortKey, sortDir])

  const activeSort = SORTS.find((s) => s.key === sortKey)!

  return (
    <div className="mx-auto max-w-2xl px-4 pb-10 pt-5">
      <h1 className="font-display text-2xl font-bold text-ocean">Seafood Library</h1>
      <p className="mt-1 text-sm text-ink/55">
        Common catch from Singapore's wet markets. Tap any species for prices, prep and recipes.
      </p>

      {/* Sort controls */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink/45">Sort</span>
        {SORTS.map((s) => {
          const isActive = sortKey === s.key
          const arrow = isActive && s.key !== 'category' ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''
          return (
            <button
              key={s.key}
              onClick={() => handleSort(s.key)}
              aria-pressed={isActive}
              title={
                s.key === 'category'
                  ? 'Default order within each category'
                  : isActive
                    ? `Sorted ${sortDir === 'asc' ? s.ascLabel : s.descLabel} — tap to reverse`
                    : `Sort by ${s.label.toLowerCase()}`
              }
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-coral text-white' : 'bg-white text-ink/70 border border-ocean/15'
              }`}
            >
              {s.label}
              {arrow}
            </button>
          )
        })}
        {sortKey !== 'category' && (
          <span className="text-xs text-ink/45">
            {sortDir === 'asc' ? activeSort.ascLabel : activeSort.descLabel}
          </span>
        )}
      </div>

      {/* Category filter chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => selectCategory(null)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            !active ? 'bg-ocean text-white' : 'bg-white text-ink/70 border border-ocean/15'
          }`}
        >
          All
        </button>
        {CATEGORY_ORDER.map((cat) => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              active === cat ? 'bg-ocean text-white' : 'bg-white text-ink/70 border border-ocean/15'
            }`}
          >
            {CATEGORY_META[cat].emoji} {CATEGORY_META[cat].label}
          </button>
        ))}
      </div>

      {categories.map((cat) => (
        <section key={cat} className="mt-7">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">
              {CATEGORY_META[cat].emoji} {CATEGORY_META[cat].label}
            </h2>
            <span className="text-xs text-ink/45">{byCategory[cat].length} species</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {sortItems(byCategory[cat]).map((item) => (
              <SeafoodCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}

      <p className="mt-8 rounded-xl bg-white/70 p-3 text-xs text-ink/50">
        Don't see a species? The library covers the most common wet-market seafood — more can be added.{' '}
        <Link to="/camera" className="font-medium text-ocean underline">
          Try identifying by photo
        </Link>
        .
      </p>
    </div>
  )
}
