interface Props {
  shape: string
  className?: string
}

/**
 * Stylised, watercolour-flavoured SVG illustrations for each seafood type.
 * Keyed by `illustrationKey` in the data. Falls back to a generic fish.
 */
export default function SeafoodIllustration({ shape, className }: Props) {
  const common = {
    className,
    viewBox: '0 0 200 140',
    xmlns: 'http://www.w3.org/2000/svg',
    role: 'img' as const,
  }

  switch (shape) {
    case 'pomfret':
      return (
        <svg {...common}>
          <path
            d="M96 20c40 0 70 26 70 50s-30 50-70 50c-30 0-58-20-66-44 22-2 22-10 0-12 8-24 36-44 66-44z"
            fill="#cfe0e2"
          />
          <path d="M30 64c-6 0-6 12 0 12 12-1 14-11 0-12z" fill="#9bbfc2" />
          <path d="M166 56l24-16-6 30 6 30-24-16z" fill="#7fa6a9" />
          <circle cx="146" cy="56" r="5" fill="#0a3540" />
          <path d="M150 86c10 4 18 4 26-2" stroke="#7fa6a9" strokeWidth="3" fill="none" />
        </svg>
      )
    case 'mackerel':
      return (
        <svg {...common}>
          <path
            d="M30 70c20-30 70-40 120-30 18 4 30 14 36 30-6 16-18 26-36 30-50 10-100 0-120-30z"
            fill="#9fc1d6"
          />
          <path d="M186 70l8-18 0 36z" fill="#5f7f95" />
          <g stroke="#3d5d73" strokeWidth="3" fill="none">
            <path d="M70 52c0 12 0 24 0 36" />
            <path d="M92 50c0 13 0 27 0 40" />
            <path d="M114 50c0 13 0 27 0 40" />
            <path d="M136 52c0 12 0 24 0 36" />
          </g>
          <circle cx="48" cy="66" r="5" fill="#0a3540" />
          <path d="M150 96l10 8 8-6M150 44l10-8 8 6" stroke="#5f7f95" strokeWidth="2.5" fill="none" />
        </svg>
      )
    case 'snapper':
      return (
        <svg {...common}>
          <path
            d="M28 70c22-30 74-40 122-30 18 4 30 14 36 30-6 16-18 26-36 30-48 10-100 0-122-30z"
            fill="#e3a08a"
          />
          <path d="M186 70l8-18 0 36z" fill="#c46b52" />
          <path d="M60 42c12 4 20 16 22 28-14-2-22-14-22-28z" fill="#d98a72" />
          <circle cx="48" cy="66" r="5.5" fill="#0a3540" />
          <circle cx="120" cy="60" r="6" fill="#b85a42" opacity="0.5" />
          <path d="M150 96c10 0 18-4 24-12M150 44c10 0 18 4 24 12" stroke="#c46b52" strokeWidth="2.5" fill="none" />
        </svg>
      )
    case 'grouper':
      return (
        <svg {...common}>
          <path
            d="M26 72c24-32 70-42 120-34 22 4 36 16 42 34-6 18-20 30-42 34-50 8-96-2-120-34z"
            fill="#9d9270"
          />
          <path d="M188 72l6-16 0 32z" fill="#6f6647" />
          <g fill="#5f5638">
            <circle cx="70" cy="58" r="4" />
            <circle cx="96" cy="72" r="4.5" />
            <circle cx="120" cy="58" r="4" />
            <circle cx="138" cy="76" r="4" />
            <circle cx="86" cy="92" r="4" />
            <circle cx="120" cy="92" r="4.5" />
          </g>
          <circle cx="46" cy="66" r="6" fill="#0a3540" />
          <path d="M40 80c10 6 22 6 32 0" stroke="#6f6647" strokeWidth="3" fill="none" />
        </svg>
      )
    case 'scad':
      return (
        <svg {...common}>
          <path
            d="M34 70c24-22 76-28 118-20 16 3 26 11 32 20-6 9-16 17-32 20-42 8-94 2-118-20z"
            fill="#cdd6dc"
          />
          <path d="M184 70l10-14 0 28z" fill="#9aa6ad" />
          <path d="M40 70c40-8 96-8 138 0" stroke="#e9c34a" strokeWidth="6" fill="none" />
          <circle cx="50" cy="66" r="5" fill="#0a3540" />
        </svg>
      )
    case 'stingray':
      return (
        <svg {...common}>
          <path
            d="M100 28c40 0 78 20 90 42-30 6-54 22-66 42-8-14-16-22-24-22s-16 8-24 22c-12-20-36-36-66-42 12-22 50-42 90-42z"
            fill="#b9a98c"
          />
          <path d="M100 110c0 0 30 14 60 8" stroke="#8c7d61" strokeWidth="4" fill="none" />
          <circle cx="86" cy="56" r="4" fill="#5f5638" />
          <circle cx="114" cy="56" r="4" fill="#5f5638" />
          <path d="M70 70c8 30 52 30 60 0" stroke="#8c7d61" strokeWidth="2.5" fill="none" opacity="0.5" />
        </svg>
      )
    case 'prawn':
      return (
        <svg {...common}>
          <path
            d="M150 40c-6 30-34 56-70 60-22 2-44-4-54-18 16 6 34 4 44-6-18 0-30-10-32-24 12 10 26 10 36 2-10-6-14-18-8-28 6 14 22 18 34 12 0 16 14 26 30 24 10-2 16-8 20-22z"
            fill="#ef9f76"
          />
          <path d="M150 40c8-8 18-12 30-10-6 6-8 14-6 22-10-4-18-6-24-12z" fill="#e36414" />
          <path d="M40 92c-10 6-16 16-14 26" stroke="#e36414" strokeWidth="3" fill="none" />
          <path d="M48 98c-8 8-10 18-6 28M58 100c-4 10-2 20 4 28" stroke="#e36414" strokeWidth="2.5" fill="none" />
          <circle cx="150" cy="42" r="4" fill="#7a2e08" />
        </svg>
      )
    case 'crab':
      return (
        <svg {...common}>
          <ellipse cx="100" cy="78" rx="48" ry="30" fill="#e07a4e" />
          <path d="M64 60c-2-8-2-16 2-22M136 60c2-8 2-16-2-22" stroke="#c85a30" strokeWidth="6" fill="none" />
          <g fill="#c85a30">
            <path d="M52 70c-16-2-28 6-34 18 12 0 18 6 22 14 6-12 10-22 12-32z" />
            <path d="M148 70c16-2 28 6 34 18-12 0-18 6-22 14-6-12-10-22-12-32z" />
          </g>
          <g stroke="#c85a30" strokeWidth="4" fill="none">
            <path d="M60 92l-26 16M64 100l-22 20M140 92l26 16M136 100l22 20" />
          </g>
          <circle cx="88" cy="70" r="4" fill="#3a1404" />
          <circle cx="112" cy="70" r="4" fill="#3a1404" />
          <path d="M86 86c8 6 20 6 28 0" stroke="#a8431f" strokeWidth="3" fill="none" />
        </svg>
      )
    case 'squid':
      return (
        <svg {...common}>
          <path d="M100 14c20 0 32 18 32 44 0 20-6 38-12 50-4-8-8-8-12 0-4-8-8-8-12 0-6-12-12-30-12-50 0-26 12-44 28-44z" fill="#e7b7c4" />
          <path d="M72 50c-10-6-16-2-18 6 8 0 12 4 14 10zM128 50c10-6 16-2 18 6-8 0-12 4-14 10z" fill="#d290a3" />
          <g stroke="#d290a3" strokeWidth="4" fill="none" strokeLinecap="round">
            <path d="M90 104c-4 12-8 20-6 30M100 106c0 12 0 20 0 30M110 104c4 12 8 20 6 30M82 100c-8 10-14 16-16 26M118 100c8 10 14 16 16 26" />
          </g>
          <circle cx="90" cy="58" r="4" fill="#7a3a4c" />
          <circle cx="110" cy="58" r="4" fill="#7a3a4c" />
        </svg>
      )
    case 'cuttlefish':
      return (
        <svg {...common}>
          <ellipse cx="100" cy="56" rx="42" ry="36" fill="#d8c4a0" />
          <path d="M58 56c-8 0-12 8-12 18s4 18 12 18M142 56c8 0 12 8 12 18s-4 18-12 18" stroke="#b59f74" strokeWidth="5" fill="none" />
          <g stroke="#b59f74" strokeWidth="4" fill="none" strokeLinecap="round">
            <path d="M86 90c-2 14-4 22-2 32M100 92c0 12 0 22 0 32M114 90c2 14 4 22 2 32M78 88c-6 10-10 18-12 28M122 88c6 10 10 18 12 28" />
          </g>
          <g fill="#8c7a52" opacity="0.5">
            <path d="M70 40c20-6 40-6 60 0M70 52c20-6 40-6 60 0M74 64c18-4 34-4 52 0" stroke="#8c7a52" strokeWidth="2" fill="none" />
          </g>
          <circle cx="86" cy="50" r="4.5" fill="#3a3017" />
          <circle cx="114" cy="50" r="4.5" fill="#3a3017" />
        </svg>
      )
    case 'octopus':
      return (
        <svg {...common}>
          <path d="M100 16c24 0 40 18 40 42 0 10-2 18-6 24 4 2 6 6 6 10 0 8-8 12-16 8-6 6-16 8-24 8s-18-2-24-8c-8 4-16 0-16-8 0-4 2-8 6-10-4-6-6-14-6-24 0-24 16-42 40-42z" fill="#d98a8a" />
          <g stroke="#c46b6b" strokeWidth="5" fill="none" strokeLinecap="round">
            <path d="M64 92c-14 4-24 14-26 28M80 100c-8 8-12 20-10 32M120 100c8 8 12 20 10 32M136 92c14 4 24 14 26 28M100 104c0 14 0 24 0 34" />
          </g>
          <circle cx="86" cy="52" r="5" fill="#5e2a2a" />
          <circle cx="114" cy="52" r="5" fill="#5e2a2a" />
        </svg>
      )
    case 'cockle':
      return (
        <svg {...common}>
          <path d="M100 30c34 0 64 24 64 50 0 16-12 28-30 32-10-22-58-22-68 0-18-4-30-16-30-32 0-26 30-50 64-50z" fill="#cdbfae" />
          <g stroke="#9a8b76" strokeWidth="3" fill="none">
            <path d="M100 40v60M76 46l-14 50M124 46l14 50M58 64l-12 38M142 64l12 38" />
          </g>
          <path d="M70 110c10-16 50-16 60 0" fill="#b04a4a" opacity="0.6" />
        </svg>
      )
    case 'mussel':
      return (
        <svg {...common}>
          <path d="M40 50c30-18 90-18 120 18 6 8 4 18-6 26-26 20-78 22-104 4-16-12-22-36-10-48z" fill="#2f5d52" />
          <path d="M48 54c28-14 80-14 106 16-24 16-72 18-96 2-10-7-14-12-10-18z" fill="#7bb39e" />
          <path d="M150 70c8 0 14 4 16 12-8 2-14 0-18-4z" fill="#1f3f37" />
        </svg>
      )
    case 'oyster':
      return (
        <svg {...common}>
          <path d="M40 60c20-24 70-30 110-12 16 8 18 26 4 38-30 24-86 22-112-2-10-9-12-16-2-24z" fill="#bdbfb6" />
          <path d="M52 62c22-16 64-20 96-6-26 16-72 18-96 6z" fill="#e6e3d4" />
          <ellipse cx="108" cy="70" rx="22" ry="14" fill="#e8d3b0" />
          <path d="M40 60c-6 4-8 12-4 20M150 84c8-2 14-8 14-16" stroke="#8f9187" strokeWidth="2.5" fill="none" />
        </svg>
      )
    case 'clam':
      return (
        <svg {...common}>
          <path d="M100 38c30 0 56 18 64 40-8 18-34 30-64 30s-56-12-64-30c8-22 34-40 64-40z" fill="#cbb78e" />
          <g stroke="#9c8559" strokeWidth="2.5" fill="none" opacity="0.7">
            <path d="M44 78c20-6 92-6 112 0M48 66c18-6 86-6 104 0M56 56c16-4 72-4 88 0" />
          </g>
          <path d="M100 38c0 0-2 35 0 70" stroke="#9c8559" strokeWidth="2" fill="none" opacity="0.5" />
        </svg>
      )
    case 'razor':
      return (
        <svg {...common}>
          <path d="M28 86c0-8 6-12 14-14l130-26c10-2 16 2 16 10s-6 14-16 16L42 98c-8 1-14-4-14-12z" fill="#c9a86a" />
          <path d="M30 84l150-30" stroke="#a8854a" strokeWidth="2.5" fill="none" opacity="0.7" />
          <path d="M168 56c8-2 16 0 20 6-6 4-14 4-20 2zM34 96c-8 2-16 0-20-6 6-4 14-4 20-2z" fill="#e7d3a6" />
        </svg>
      )
    case 'eel':
      return (
        <svg {...common}>
          <path
            d="M22 64c14-18 30 8 48-2 16-9 22-30 44-30 26 0 40 22 64 22 8 0 16-3 22-9-2 14-14 22-26 22-22 0-36-20-60-20-18 0-26 18-44 26-20 9-38-6-48 10-4-8-2-14 6-18l-6 6c0-2 0-4 0-7z"
            fill="#5a6b57"
          />
          <path d="M158 47c8 0 16-3 22-9-2 9-8 15-16 17z" fill="#3f4d3d" />
          <circle cx="40" cy="62" r="4" fill="#1f2a1d" />
        </svg>
      )
    case 'lobster':
      return (
        <svg {...common}>
          <path d="M96 36c0 26-6 50-12 64-4 10-12 16-22 16-4 0-6-4-4-8 8-12 12-30 12-50 0-12 12-30 26-22z" fill="#d2452f" />
          <path d="M88 116c-2 8-2 14 2 20M104 112c0 8 2 14 6 18M118 104c4 6 8 12 14 14" stroke="#b5331f" strokeWidth="4" fill="none" strokeLinecap="round" />
          <g fill="#e0573f">
            <path d="M96 40c-10-14-28-18-44-10 8 4 10 12 8 20 12-6 26-4 36-10z" />
            <path d="M40 30c-10 0-16 8-14 18 6-4 12-4 18 0-2-8-2-14-4-18zM40 30c10-2 18 4 20 14-8-2-14 0-18 6-2-8-4-14-2-20z" />
          </g>
          <path d="M70 40c-16-8-30-2-40 10M70 48c-18-4-32 4-40 16" stroke="#b5331f" strokeWidth="2.5" fill="none" />
          <circle cx="86" cy="44" r="4" fill="#5e160c" />
        </svg>
      )
    case 'scallop':
      return (
        <svg {...common}>
          <path d="M100 38c40 0 64 24 70 56 2 8-4 14-12 14H42c-8 0-14-6-12-14 6-32 30-56 70-56z" fill="#f0b27a" />
          <g stroke="#cf8a4f" strokeWidth="3" fill="none">
            <path d="M100 44v62M78 48l-18 56M122 48l18 56M58 60l-22 44M142 60l22 44" />
          </g>
          <path d="M82 38c4-8 32-8 36 0-6 6-30 6-36 0z" fill="#e29a5c" />
        </svg>
      )
    case 'abalone':
      return (
        <svg {...common}>
          <path d="M40 78c-6-26 14-50 44-54 30-4 58 12 64 38 4 18-8 34-30 38-34 6-72-2-78-22z" fill="#7e8b7c" />
          <path d="M52 74c-2-18 12-34 36-37 22-2 42 8 47 26-26-14-62-12-83 11z" fill="#aeb8a8" />
          <g fill="#5d6a5c">
            <circle cx="70" cy="52" r="3" />
            <circle cx="84" cy="48" r="3" />
            <circle cx="98" cy="46" r="3" />
            <circle cx="112" cy="47" r="3" />
            <circle cx="125" cy="51" r="3" />
          </g>
        </svg>
      )
    case 'seacucumber':
      return (
        <svg {...common}>
          <path d="M30 78c-6-12 4-24 20-26l108-14c16-2 26 8 24 22-2 12-14 18-28 18l-100 14c-12 2-20-4-24-14z" fill="#6b5544" />
          <g fill="#4f3e30">
            <circle cx="56" cy="68" r="4" /><circle cx="78" cy="64" r="4" /><circle cx="100" cy="61" r="4" />
            <circle cx="122" cy="58" r="4" /><circle cx="144" cy="55" r="4" />
            <circle cx="66" cy="80" r="3.5" /><circle cx="90" cy="77" r="3.5" /><circle cx="114" cy="73" r="3.5" />
          </g>
        </svg>
      )
    case 'conch':
      return (
        <svg {...common}>
          <path d="M118 36c26 0 44 20 44 44 0 24-20 40-46 40-30 0-54-18-54-42 0-8 4-14 12-14 6 0 10 4 10 12 0 12 12 20 26 20 14 0 24-10 24-24 0-16-12-26-30-26-6 0-10-4-10-10s4-10 12-10c2 0 5 0 8 0z" fill="#e8c9a0" />
          <path d="M70 96c-14 4-26 14-34 28 14-2 26 2 34 10 2-14 2-28 0-38z" fill="#d9b483" />
          <g stroke="#bd9763" strokeWidth="2.5" fill="none" opacity="0.7">
            <path d="M96 52c14-6 30-4 42 6M92 66c14-4 28 0 38 10" />
          </g>
        </svg>
      )
    case 'shark':
      return (
        <svg {...common}>
          <path d="M24 72c20-16 54-26 104-24 14 1 26 5 34 14 10-8 22-14 34-16-4 10-6 20-4 30-12-2-24 2-34 8-8 7-20 11-34 12-50 2-84-8-104-24z" fill="#8a9aa6" />
          <path d="M96 50c4-14 12-24 22-28-2 12 0 22 6 30-10-4-20-4-28-2z" fill="#73828d" />
          <path d="M70 86c-2 10-8 18-18 24 14 0 24-4 30-12z" fill="#73828d" />
          <path d="M150 66l8-6-2 12z" fill="#73828d" />
          <circle cx="44" cy="68" r="4" fill="#1f2a30" />
        </svg>
      )
    case 'flatfish':
      return (
        <svg {...common}>
          <path d="M40 70c0-26 26-44 60-44s60 18 60 44-26 44-60 44-60-18-60-44z" fill="#9a8a6f" />
          <path d="M58 70c0-18 22-30 42-30 4 8 4 52 0 60-20 0-42-12-42-30z" fill="#b3a487" />
          <g fill="#6f6147">
            <circle cx="86" cy="56" r="3" /><circle cx="100" cy="64" r="3" /><circle cx="112" cy="54" r="3" />
            <circle cx="120" cy="72" r="3" /><circle cx="94" cy="82" r="3" />
          </g>
          <circle cx="120" cy="60" r="4" fill="#3a3017" />
          <circle cx="132" cy="62" r="4" fill="#3a3017" />
        </svg>
      )
    case 'urchin':
      return (
        <svg {...common}>
          <g stroke="#3a2f4a" strokeWidth="3" strokeLinecap="round">
            <path d="M100 70v-44M100 70v44M100 70h-46M100 70h46M100 70l-32-32M100 70l32 32M100 70l32-32M100 70l-32 32M100 70l-16-42M100 70l16 42M100 70l-42-16M100 70l42 16M100 70l42-16M100 70l-42 16M100 70l16-42M100 70l-16 42" />
          </g>
          <circle cx="100" cy="70" r="22" fill="#5e4a73" />
          <circle cx="100" cy="70" r="10" fill="#e6a94d" />
        </svg>
      )
    case 'jellyfish':
      return (
        <svg {...common}>
          <path d="M52 60c0-22 22-38 48-38s48 16 48 38c0 8-4 12-12 12H64c-8 0-12-4-12-12z" fill="#e7b7c4" opacity="0.85" />
          <path d="M60 72c4 8 12 8 16 0M84 72c4 8 12 8 16 0M108 72c4 8 12 8 16 0" stroke="#d290a3" strokeWidth="3" fill="none" />
          <g stroke="#d49bb0" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M70 76c-4 18-8 30-4 42M86 78c-2 18-2 32 2 44M100 78c0 18 0 32 0 44M114 78c2 18 2 32-2 44M130 76c4 18 8 30 4 42" />
          </g>
        </svg>
      )
    case 'snail':
      return (
        <svg {...common}>
          <path d="M70 96c-22 0-40-16-40-38S46 22 70 22c20 0 36 14 36 32 0 14-10 24-24 24-12 0-20-8-20-18s8-16 16-16 12 6 12 12" fill="none" stroke="#caa873" strokeWidth="12" strokeLinecap="round" />
          <path d="M70 96c20 6 44 4 62-8-6-10-6-22 0-32-18-8-40-6-56 8" fill="#e3c894" />
          <path d="M150 60c8-2 16 0 20 6-6 4-14 4-20 2z" fill="#d9b483" />
          <circle cx="150" cy="58" r="3" fill="#7a5d30" />
        </svg>
      )
    case 'geoduck':
      return (
        <svg {...common}>
          <path d="M48 88c-2-14 8-24 24-24h24c14 0 24 10 22 24-2 10-12 16-24 16H70c-12 0-20-6-22-16z" fill="#d8c2a4" />
          <path d="M96 64c14-30 34-44 64-46-6 14-8 30-30 44-10 6-22 6-34 2z" fill="#e6cdac" />
          <path d="M150 20c8-2 14 0 18 6-6 4-12 4-18 2z" fill="#d3b58c" />
          <path d="M58 86c18-6 44-6 60 0" stroke="#b89a6c" strokeWidth="2.5" fill="none" opacity="0.7" />
        </svg>
      )
    case 'fish':
    default:
      return (
        <svg {...common}>
          <path
            d="M30 70c24-28 74-38 120-30 18 3 32 14 38 30-6 16-20 27-38 30-46 8-96-2-120-30z"
            fill="#8fc0c9"
          />
          <path d="M188 70l8-18 0 36z" fill="#5f9ea0" />
          <path d="M58 44c12 4 20 16 22 28-14-2-22-14-22-28z" fill="#6fb0b5" />
          <circle cx="48" cy="66" r="5.5" fill="#0a3540" />
          <path d="M150 96c10 0 18-4 24-12M150 44c10 0 18 4 24 12" stroke="#5f9ea0" strokeWidth="2.5" fill="none" />
        </svg>
      )
  }
}
