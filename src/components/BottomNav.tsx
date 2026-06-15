import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', icon: '🏠', end: true },
  { to: '/library', label: 'Library', icon: '🐟', end: false },
  { to: '/camera', label: 'Identify', icon: '📷', end: false },
  { to: '/recipes', label: 'Recipes', icon: '🍳', end: false },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t border-ocean/15 bg-white/95 py-1.5 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 rounded-lg px-5 py-1 text-xs transition-colors ${
              isActive ? 'font-semibold text-ocean' : 'text-ink/55'
            }`
          }
        >
          <span className="text-lg leading-none">{link.icon}</span>
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
