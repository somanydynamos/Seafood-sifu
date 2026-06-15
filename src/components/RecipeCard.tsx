import { Link } from 'react-router-dom'
import type { Recipe } from '../types'

interface Props {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: Props) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="block rounded-2xl bg-white p-4 shadow-sm border border-ocean/10 transition-all hover:border-ocean/30 hover:shadow-md"
    >
      <div className="flex items-center gap-2 text-xs">
        <span className="rounded-full bg-ocean/10 px-2 py-0.5 font-medium text-ocean">{recipe.cuisine}</span>
        <span className="text-ink/45">{recipe.difficulty}</span>
        <span className="text-ink/45">· {recipe.prepTimeMinutes} min</span>
      </div>
      <h3 className="mt-2 font-display text-lg font-semibold leading-tight text-ink">{recipe.name}</h3>
      <p className="mt-1 text-sm text-ink/60 line-clamp-2">{recipe.description}</p>
    </Link>
  )
}
