import type { Recipe, Seafood, SeafoodCategory } from '../types'
import seafoodData from '../data/seafood.json'
import recipesData from '../data/recipes.json'

export const seafood = seafoodData as Seafood[]
export const recipes = recipesData as Recipe[]

const seafoodById = new Map(seafood.map((s) => [s.id, s]))
const recipeById = new Map(recipes.map((r) => [r.id, r]))

export function getSeafood(id: string): Seafood | undefined {
  return seafoodById.get(id)
}

export function getRecipe(id: string): Recipe | undefined {
  return recipeById.get(id)
}

export const CATEGORY_ORDER: SeafoodCategory[] = [
  'Fish',
  'Crustacean',
  'Cephalopod',
  'Shellfish',
  'Other',
]

export const CATEGORY_META: Record<
  SeafoodCategory,
  { label: string; blurb: string; emoji: string }
> = {
  Fish: { label: 'Fish', blurb: 'Finfish — from threadfin to grouper', emoji: '🐟' },
  Crustacean: {
    label: 'Crustaceans',
    blurb: 'Prawns, crabs & mantis shrimp',
    emoji: '🦐',
  },
  Cephalopod: {
    label: 'Cephalopods',
    blurb: 'Squid, cuttlefish & octopus',
    emoji: '🦑',
  },
  Shellfish: {
    label: 'Shellfish',
    blurb: 'Clams, cockles, mussels, oysters & snails',
    emoji: '🦪',
  },
  Other: {
    label: 'Other',
    blurb: 'Sea urchin, jellyfish & sea cucumber',
    emoji: '🪼',
  },
}

export function getSeafoodByCategory(): Record<string, Seafood[]> {
  return CATEGORY_ORDER.reduce<Record<string, Seafood[]>>((acc, category) => {
    acc[category] = seafood.filter((s) => s.category === category)
    return acc
  }, {})
}

export function getRecipesForSeafood(id: string): Recipe[] {
  return recipes.filter((r) => r.seafoodIds.includes(id))
}

export function getSeafoodForRecipe(recipe: Recipe): Seafood[] {
  return recipe.seafoodIds
    .map((id) => seafoodById.get(id))
    .filter((s): s is Seafood => Boolean(s))
}
