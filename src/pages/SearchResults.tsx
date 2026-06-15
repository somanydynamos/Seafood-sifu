import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import SeafoodCard from '../components/SeafoodCard'
import RecipeCard from '../components/RecipeCard'
import { getSeafood } from '../utils/data'
import { search } from '../utils/search'
import type { RecognitionMatch } from '../types'

export default function SearchResults() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''
  const from = params.get('from')

  // Camera flow passes matches via the `matches` query param (base64 JSON)
  const cameraMatches = useMemo<RecognitionMatch[] | null>(() => {
    const raw = params.get('matches')
    if (!raw) return null
    try {
      return JSON.parse(decodeURIComponent(escape(atob(raw)))) as RecognitionMatch[]
    } catch {
      return null
    }
  }, [params])

  // --- Camera results view ---
  if (from === 'camera' && cameraMatches) {
    const known = cameraMatches
      .map((m) => ({ match: m, item: m.seafoodId ? getSeafood(m.seafoodId) : undefined }))
      .filter((x) => x.item)

    return (
      <div className="mx-auto max-w-2xl px-4 pb-10 pt-5">
        <h1 className="font-display text-2xl font-bold text-ocean">Top matches</h1>
        <p className="mt-1 text-sm text-ink/55">
          Based on your photo — tap the closest one to open its record.
        </p>

        {known.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-white p-5 text-center shadow-sm border border-ocean/10">
            <p className="text-sm text-ink/70">
              Couldn't confidently match that to the library. Try a clearer, closer photo of a single
              item, or browse the library to find it.
            </p>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-4">
            {known.map(({ match, item }, i) => (
              <div key={item!.id}>
                <SeafoodCard item={item!} rank={i + 1} highlight={i === 0} confidence={match.confidence} />
                {match.reasoning && (
                  <p className="mt-1 px-1 text-xs text-ink/50">{match.reasoning}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 rounded-xl bg-white/70 p-3 text-xs text-ink/50">
          Not quite right? AI identification can be wrong — always double-check the species before
          buying or eating. <span className="font-medium">Browse the full library</span> from the menu.
        </div>
      </div>
    )
  }

  // --- Text search view ---
  const results = q ? search(q) : { seafood: [], recipes: [] }
  const total = results.seafood.length + results.recipes.length

  return (
    <div className="mx-auto max-w-2xl px-4 pb-10 pt-5">
      <SearchBar initialValue={q} autoFocus={!q} />

      {q && (
        <p className="mt-3 text-sm text-ink/55">
          {total} result{total === 1 ? '' : 's'} for “{q}”
        </p>
      )}

      {results.seafood.length > 0 && (
        <section className="mt-4">
          <h2 className="mb-3 font-display text-lg font-semibold text-ink">Seafood</h2>
          <div className="grid grid-cols-2 gap-4">
            {results.seafood.map((item) => (
              <SeafoodCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {results.recipes.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-3 font-display text-lg font-semibold text-ink">Recipes</h2>
          <div className="space-y-3">
            {results.recipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>
      )}

      {q && total === 0 && (
        <p className="mt-8 text-center text-sm text-ink/55">
          No matches. Try a local name like “sotong”, “see hum” or “batang”.
        </p>
      )}
    </div>
  )
}
