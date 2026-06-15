import { Link, useSearchParams } from 'react-router-dom'
import SeafoodCard from '../components/SeafoodCard'
import { CATEGORY_META, CATEGORY_ORDER, getSeafoodByCategory } from '../utils/data'
import type { SeafoodCategory } from '../types'

export default function Library() {
  const [params, setParams] = useSearchParams()
  const active = params.get('category') as SeafoodCategory | null
  const byCategory = getSeafoodByCategory()
  const categories = active ? [active] : CATEGORY_ORDER

  function selectCategory(cat: SeafoodCategory | null) {
    if (cat) setParams({ category: cat })
    else setParams({})
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-10 pt-5">
      <h1 className="font-display text-2xl font-bold text-ocean">Seafood Library</h1>
      <p className="mt-1 text-sm text-ink/55">
        Common catch from Singapore's wet markets. Tap any species for prices, prep and recipes.
      </p>

      {/* Category filter chips */}
      <div className="mt-4 flex flex-wrap gap-2">
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
            {byCategory[cat].map((item) => (
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
