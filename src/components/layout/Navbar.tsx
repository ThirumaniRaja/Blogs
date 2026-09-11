import { BookMarked, Code2, Home, ListChecks, Menu, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/questions', label: 'Questions', icon: Code2, end: false },
  { to: '/quiz', label: 'Quiz', icon: Sparkles, end: false },
  { to: '/bookmarks', label: 'Bookmarks', icon: BookMarked, end: false },
  { to: '/progress', label: 'Progress', icon: ListChecks, end: false },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 font-semibold text-gray-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-400 text-white">
            <Code2 size={18} />
          </span>
          <span className="hidden sm:inline">JS Interview Prep</span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-500/15 text-brand-400'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-gray-300 hover:bg-white/5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border-subtle px-4 py-3 md:hidden">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-brand-500/15 text-brand-400' : 'text-gray-400 hover:bg-white/5'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
