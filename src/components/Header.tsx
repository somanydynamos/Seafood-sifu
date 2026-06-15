import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'

const MENU = [
  { to: '/camera', label: 'Take photo of seafood', icon: '📷' },
  { to: '/library', label: 'Seafood library', icon: '🐟' },
  { to: '/recipes', label: 'Recipes', icon: '🍳' },
  { to: '/search', label: 'Search', icon: '🔍' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
]

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Close overlays whenever the route changes
  useEffect(() => {
    setDrawerOpen(false)
    setSearchOpen(false)
  }, [location.pathname, location.search])

  function goSearch() {
    // On the dedicated search page, focus its own bar; elsewhere toggle inline
    if (location.pathname === '/search') {
      navigate('/search')
    } else {
      setSearchOpen((v) => !v)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-30 bg-deep text-white shadow-md pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-3 py-3">
          <button
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/10"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          <Link to="/" className="flex flex-1 items-center justify-center gap-2">
            <span className="text-xl" aria-hidden>🐟</span>
            <span className="font-display text-xl font-semibold tracking-tight">Seafood Sifu</span>
          </Link>

          <button
            aria-label="Search"
            onClick={goSearch}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
        </div>

        {searchOpen && (
          <div className="mx-auto max-w-2xl px-3 pb-3">
            <SearchBar autoFocus onSubmitted={() => setSearchOpen(false)} />
          </div>
        )}
      </header>

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <nav className="absolute left-0 top-0 h-full w-72 max-w-[80%] bg-white shadow-2xl pt-[env(safe-area-inset-top)] animate-[slidein_0.18s_ease-out]">
            <div className="flex items-center gap-2 bg-deep px-4 py-4 text-white">
              <span className="text-xl">🐟</span>
              <span className="font-display text-lg font-semibold">Seafood Sifu</span>
              <button
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </div>
            <ul className="p-2">
              {MENU.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-ink hover:bg-sand"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="px-5 pt-2 text-xs text-ink/40">
              Identify seafood from Singapore wet markets.
            </p>
          </nav>
          <style>{`@keyframes slidein{from{transform:translateX(-100%)}to{transform:translateX(0)}}`}</style>
        </div>
      )}
    </>
  )
}
