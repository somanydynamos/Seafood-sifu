import { useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import { recipes } from '../utils/data'

export default function Recipes() {
  const cuisines = ['All', ...Array.from(new Set(recipes.map((r) => r.cuisine)))]
  const [cuisine, setCuisine] = useState('All')
  const filtered = cuisine === 'All' ? recipes : recipes.filter((r) => r.cuisine === cuisine)

  return (
    <div className="mx-auto max-w-2xl px-4 pb-10 pt-5">
      <h1 className="font-display text-2xl font-bold text-ocean">Recipe Library</h1>
      <p className="mt-1 text-sm text-ink/55">
        Local Singapore and Southeast Asian recipes that make the most of each catch's flavour and texture.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
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

      <div className="mt-5 space-y-3">
        {filtered.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  )
}
