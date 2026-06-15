import type { IucnCode } from '../types'

interface IucnMeta {
  code: IucnCode
  label: string
  short: string
  /** Tailwind classes for the badge */
  className: string
  /** Severity 0 (least concern) – 5 (critical); used for sorting/emphasis */
  severity: number
}

export const IUCN_META: Record<IucnCode, IucnMeta> = {
  LC: {
    code: 'LC',
    label: 'Least Concern',
    short: 'LC',
    className: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    severity: 0,
  },
  NT: {
    code: 'NT',
    label: 'Near Threatened',
    short: 'NT',
    className: 'bg-lime-100 text-lime-800 border-lime-200',
    severity: 1,
  },
  VU: {
    code: 'VU',
    label: 'Vulnerable',
    short: 'VU',
    className: 'bg-amber-100 text-amber-900 border-amber-300',
    severity: 2,
  },
  EN: {
    code: 'EN',
    label: 'Endangered',
    short: 'EN',
    className: 'bg-orange-100 text-orange-800 border-orange-300',
    severity: 3,
  },
  CR: {
    code: 'CR',
    label: 'Critically Endangered',
    short: 'CR',
    className: 'bg-red-100 text-red-800 border-red-300',
    severity: 4,
  },
  DD: {
    code: 'DD',
    label: 'Data Deficient',
    short: 'DD',
    className: 'bg-slate-100 text-slate-700 border-slate-200',
    severity: 0,
  },
  NE: {
    code: 'NE',
    label: 'Not Evaluated',
    short: 'NE',
    className: 'bg-slate-100 text-slate-600 border-slate-200',
    severity: 0,
  },
}

export function iucnRedlistUrl(scientificName: string): string {
  // Strip trailing "spp." and trim to the genus/species for a useful search
  const query = scientificName.replace(/\s*spp\.?$/i, '').trim()
  return `https://www.iucnredlist.org/search?query=${encodeURIComponent(query)}`
}
