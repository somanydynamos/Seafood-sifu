import { Link, useParams } from 'react-router-dom'
import { getRecipe, getSeafoodForRecipe } from '../utils/data'

export default function RecipeDetail() {
  const { id } = useParams()
  const recipe = id ? getRecipe(id) : undefined

  if (!recipe) {
    return (
      <div className="mx-auto max-w-2xl px-4 pt-10 text-center">
        <p className="text-ink/60">Recipe not found.</p>
        <Link to="/recipes" className="mt-2 inline-block text-ocean underline">
          Back to recipes
        </Link>
      </div>
    )
  }

  const seafood = getSeafoodForRecipe(recipe)

  return (
    <div className="mx-auto max-w-2xl px-4 pb-10 pt-3">
      <Link to="/recipes" className="inline-flex items-center gap-1 text-sm text-ocean">
        ‹ Recipes
      </Link>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-ocean/10 px-2 py-0.5 font-medium text-ocean">{recipe.cuisine}</span>
        <span className="text-ink/50">{recipe.difficulty}</span>
        <span className="text-ink/50">· {recipe.prepTimeMinutes} min</span>
      </div>

      <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ocean">{recipe.name}</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink/75">{recipe.description}</p>

      {/* Linked seafood */}
      {seafood.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="self-center text-xs text-ink/45">Works with:</span>
          {seafood.map((s) => (
            <Link
              key={s.id}
              to={`/seafood/${s.id}`}
              className="rounded-full border border-ocean/20 bg-white px-3 py-1 text-xs font-medium text-ocean hover:bg-ocean/5"
            >
              {s.commonName.split('(')[0].trim()}
            </Link>
          ))}
        </div>
      )}

      {/* Ingredients */}
      <h2 className="mt-6 font-display text-lg font-semibold text-ink">Ingredients</h2>
      <ul className="mt-2 divide-y divide-ocean/10 rounded-2xl bg-white px-4 shadow-sm border border-ocean/10">
        {recipe.ingredients.map((ing, i) => (
          <li key={i} className="flex items-baseline justify-between gap-4 py-2.5 text-sm">
            <span className="text-ink/80">{ing.name}</span>
            <span className="shrink-0 font-medium text-ink/60">{ing.amount}</span>
          </li>
        ))}
      </ul>

      {/* Steps */}
      <h2 className="mt-6 font-display text-lg font-semibold text-ink">Method</h2>
      <ol className="mt-2 space-y-3">
        {recipe.steps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean text-sm font-bold text-white">
              {i + 1}
            </span>
            <p className="pt-0.5 text-sm leading-relaxed text-ink/80">{step}</p>
          </li>
        ))}
      </ol>

      {/* Tip */}
      <div className="mt-6 rounded-2xl border border-amber/40 bg-amber/10 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-coral">Sifu's tip</h3>
        <p className="mt-1 text-sm text-ink/80">{recipe.tip}</p>
      </div>

      <p className="mt-4 text-xs text-ink/40">{recipe.inspiredBy}</p>
    </div>
  )
}
