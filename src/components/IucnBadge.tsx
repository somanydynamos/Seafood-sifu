import type { IucnCode } from '../types'
import { IUCN_META } from '../utils/iucn'

interface Props {
  code: IucnCode
  showLabel?: boolean
  className?: string
}

export default function IucnBadge({ code, showLabel = true, className = '' }: Props) {
  const meta = IUCN_META[code]
  return (
    <span
      title={`IUCN: ${meta.label}`}
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${meta.className} ${className}`}
    >
      <span className="font-bold">{meta.short}</span>
      {showLabel && <span className="font-medium">{meta.label}</span>}
    </span>
  )
}
