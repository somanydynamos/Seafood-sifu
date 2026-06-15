import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { CATEGORY_META, CATEGORY_ORDER, getSeafoodByCategory, recipes } from '../utils/data'

export default function Home() {
  const byCategory = getSeafoodByCategory()

  return (
    <div className="mx-auto max-w-2xl px-4 pb-10 pt-6 bg-wave">
      <header className="text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-deep text-3xl shadow-lg">
          🐟
        </div>
        <h1 className="font-display text-3xl font-bold leading-tight text-ocean">Seafood Sifu</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink/60">
          Snap it, know it, cook it. Identify seafood from Singapore's wet markets — with their
          conservation status, how to prepare them, and the best local recipes.
        </p>
      </header>

      <div className="mt-6">
        <SearchBar />
      </div>

      {/* Primary action: take a photo */}
      <Link
        to="/camera"
        className="mt-5 flex items-center gap-4 rounded-3xl bg-gradient-to-br from-ocean to-deep p-5 text-white shadow-lg transition-transform active:scale-[0.99]"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-3xl">
          📷
        </span>
        <span>
          <span className="block font-display text-xl font-semibold">Take a photo of seafood</span>
          <span className="block text-sm text-white/75">Point your camera at the catch to identify it</span>
        </span>
        <span className="ml-auto text-2xl">›</span>
      </Link>

      {/* Two quick links */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Link
          to="/library"
          className="rounded-2xl border border-ocean/10 bg-white p-4 shadow-sm transition-colors hover:border-ocean/30"
        >
          <div className="text-2xl">🐟</div>
          <div className="mt-1 font-display text-lg font-semibold text-ocean">Seafood library</div>
          <div className="text-xs text-ink/55">{Object.values(byCategory).flat().length} species, by category</div>
        </Link>
        <Link
          to="/recipes"
          className="rounded-2xl border border-ocean/10 bg-white p-4 shadow-sm transition-colors hover:border-ocean/30"
        >
          <div className="text-2xl">🍳</div>
          <div className="mt-1 font-display text-lg font-semibold text-ocean">Recipe library</div>
          <div className="text-xs text-ink/55">{recipes.length} local & SE Asian recipes</div>
        </Link>
      </div>

      {/* Browse by category */}
      <h2 className="mt-8 mb-3 font-display text-lg font-semibold text-ink">Browse by category</h2>
      <div className="grid grid-cols-2 gap-4">
        {CATEGORY_ORDER.map((cat) => {
          const meta = CATEGORY_META[cat]
          return (
            <Link
              key={cat}
              to={`/library?category=${encodeURIComponent(cat)}`}
              className="rounded-2xl border border-ocean/10 bg-white p-4 shadow-sm transition-colors hover:border-ocean/30"
            >
              <div className="text-3xl">{meta.emoji}</div>
              <div className="mt-1 font-semibold text-ocean">{meta.label}</div>
              <div className="text-xs text-ink/55">{meta.blurb}</div>
              <div className="mt-1 text-xs text-ink/40">{byCategory[cat].length} species</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
