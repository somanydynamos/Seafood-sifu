import { Link } from 'react-router-dom'
import type { Seafood } from '../types'
import SeafoodIllustration from './SeafoodIllustration'
import IucnBadge from './IucnBadge'

interface Props {
  item: Seafood
  highlight?: boolean
  rank?: number
  confidence?: number
}

export default function SeafoodCard({ item, highlight, rank, confidence }: Props) {
  return (
    <Link
      to={`/seafood/${item.id}`}
      className={`relative block rounded-2xl bg-white shadow-sm border transition-all hover:shadow-md ${
        highlight ? 'border-coral ring-2 ring-coral/30' : 'border-ocean/10 hover:border-ocean/30'
      }`}
    >
      {rank != null && (
        <span className="absolute -top-2 -left-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-coral text-white text-sm font-bold shadow">
          {rank}
        </span>
      )}
      <div className="flex items-center justify-center rounded-t-2xl bg-sand/60 bg-wave py-2">
        <SeafoodIllustration shape={item.illustrationKey} className="h-20 w-full px-4" />
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold leading-tight text-ocean">
            {item.commonName}
          </h3>
        </div>
        <p className="mt-0.5 text-xs italic text-ink/45">{item.scientificName}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <IucnBadge code={item.iucnStatus} showLabel={false} />
          {confidence != null ? (
            <span className="text-xs font-semibold text-coral">{Math.round(confidence * 100)}% match</span>
          ) : (
            <span className="text-xs text-ink/45">{item.pricePer100g.split('–')[0].trim()}/100g</span>
          )}
        </div>
      </div>
    </Link>
  )
}
