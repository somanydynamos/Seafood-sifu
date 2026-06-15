import { Link, useParams } from 'react-router-dom'
import SeafoodIllustration from '../components/SeafoodIllustration'
import IucnBadge from '../components/IucnBadge'
import RecipeCard from '../components/RecipeCard'
import { CATEGORY_META, getRecipesForSeafood, getSeafood } from '../utils/data'
import { IUCN_META, iucnRedlistUrl } from '../utils/iucn'

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-3 shadow-sm border border-ocean/10">
      <div className="text-xs font-medium uppercase tracking-wide text-ink/45">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-ink">{value}</div>
    </div>
  )
}

export default function SeafoodDetail() {
  const { id } = useParams()
  const item = id ? getSeafood(id) : undefined

  if (!item) {
    return (
      <div className="mx-auto max-w-2xl px-4 pt-10 text-center">
        <p className="text-ink/60">Seafood not found.</p>
        <Link to="/library" className="mt-2 inline-block text-ocean underline">
          Back to library
        </Link>
      </div>
    )
  }

  const recipes = getRecipesForSeafood(item.id)
  const meta = IUCN_META[item.iucnStatus]

  return (
    <div className="mx-auto max-w-2xl px-4 pb-10 pt-3">
      <Link to="/library" className="inline-flex items-center gap-1 text-sm text-ocean">
        ‹ Library
      </Link>

      {/* Hero */}
      <div className="mt-2 flex items-center justify-center rounded-3xl bg-sand bg-wave py-6 shadow-inner">
        <SeafoodIllustration shape={item.illustrationKey} className="h-36 w-full max-w-xs" />
      </div>

      <div className="mt-4">
        <span className="rounded-full bg-ocean/10 px-2 py-0.5 text-xs font-medium text-ocean">
          {CATEGORY_META[item.category].emoji} {item.category}
        </span>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ocean">
          {item.commonName}
        </h1>
        <p className="text-sm italic text-ink/50">{item.scientificName}</p>
        <p className="mt-1 text-sm text-ink/70">
          Also known as: {item.localNames.join(' · ')}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink/75">{item.description}</p>
      </div>

      {/* Conservation status */}
      <div className={`mt-5 rounded-2xl border p-4 ${meta.className}`}>
        <div className="flex items-center gap-2">
          <IucnBadge code={item.iucnStatus} />
        </div>
        <p className="mt-2 text-sm text-ink/80">{item.iucnNote}</p>
        <a
          href={iucnRedlistUrl(item.scientificName)}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-xs font-medium text-ink/70 underline"
        >
          Verify on the IUCN Red List ↗
        </a>
      </div>

      {/* Facts grid */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Fact label="Price (per 100g)" value={item.pricePer100g} />
        <Fact label="Habitat" value={item.habitat} />
        <Fact label="Size (length)" value={item.sizeLength} />
        <Fact label="Size (weight)" value={item.sizeWeight} />
      </div>

      {/* Flavour & texture */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-ocean/10">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-seafoam">Flavour</h3>
          <p className="mt-1 text-sm text-ink/75">{item.flavour}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-ocean/10">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-seafoam">Texture</h3>
          <p className="mt-1 text-sm text-ink/75">{item.texture}</p>
        </div>
      </div>

      {/* Preparation */}
      <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm border border-ocean/10">
        <h3 className="font-display text-lg font-semibold text-ocean">How to prepare & cut</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink/75">{item.preparation}</p>
      </div>

      {/* Recipes */}
      {recipes.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 font-display text-lg font-semibold text-ink">
            Favourite dishes with {item.commonName.split('(')[0].trim()}
          </h3>
          <div className="space-y-3">
            {recipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
