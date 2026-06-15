import type { Recipe, Seafood } from '../types'
import { recipes, seafood } from './data'

export interface SearchResults {
  seafood: Seafood[]
  recipes: Recipe[]
}

function matches(haystack: string, words: string[]): boolean {
  return words.some((w) => w.length > 1 && haystack.includes(w))
}

export function search(query: string): SearchResults {
  const q = query.trim().toLowerCase()
  if (!q) return { seafood: [], recipes: [] }
  const words = q.split(/\s+/)

  const seafoodHits = seafood.filter((s) => {
    const haystack = [
      s.commonName,
      s.scientificName,
      s.category,
      s.flavour,
      s.texture,
      ...s.localNames,
      ...s.recognitionKeywords,
    ]
      .join(' ')
      .toLowerCase()
    return matches(haystack, words)
  })

  const recipeHits = recipes.filter((r) => {
    const haystack = [r.name, r.cuisine, r.description, ...r.ingredients.map((i) => i.name)]
      .join(' ')
      .toLowerCase()
    return matches(haystack, words)
  })

  return { seafood: seafoodHits, recipes: recipeHits }
}
