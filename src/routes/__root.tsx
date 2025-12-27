import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { Timer, BarChart3, Settings as SettingsIcon } from 'lucide-react'

export const Route = createRootRoute({
  component: RootLayout,
})

function NavLink({
  to,
  children,
  icon: Icon,
}: {
  to: string
  children: React.ReactNode
  icon: any
}) {
  return (
    <Link
      to={to}
      activeProps={{ className: 'text-foreground bg-secondary/80 shadow-sm' }}
      inactiveProps={{
        className:
          'text-muted-foreground hover:text-foreground hover:bg-secondary/40',
      }}
      className="flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-xl text-[10px] font-medium transition-all duration-300 md:flex-row md:px-4 md:py-2 md:text-sm md:gap-2"
    >
      <Icon className="w-5 h-5 md:w-4 md:h-4" />
      <span>{children}</span>
    </Link>
  )
}

function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Unified Header (Responsive) */}
      <header className="sticky top-0 z-50 w-full border-b border-border/10 bg-background/60 backdrop-blur-2xl">
        <div className="container max-w-5xl mx-auto flex h-14 md:h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2 md:gap-3">
            <img
              src="/icon-144x144.png"
              className="w-7 h-7 md:w-9 md:h-9 rounded-lg"
            />
            <span className="font-extrabold tracking-tighter text-lg md:text-xl">
              Focusflow
            </span>
          </div>

          {/* Desktop Only Nav in Header */}
          <nav className="hidden md:flex items-center gap-2 bg-muted/30 p-1.5 rounded-2xl border border-border/20">
            <NavLink to="/" icon={Timer}>
              Timer
            </NavLink>
            <NavLink to="/stats" icon={BarChart3}>
              Stats
            </NavLink>
            <NavLink to="/settings" icon={SettingsIcon}>
              Settings
            </NavLink>
          </nav>

          {/* Mobile Placeholder (to keep logo left) */}
          <div className="md:hidden w-6" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container max-w-4xl mx-auto pb-24 md:pb-12 md:pt-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 z-50 h-16 glass shadow-2xl rounded-4xl border border-white/10 flex items-center justify-around px-2 backdrop-blur-3xl">
        <NavLink to="/" icon={Timer}>
          Timer
        </NavLink>
        <NavLink to="/stats" icon={BarChart3}>
          Stats
        </NavLink>
        <NavLink to="/settings" icon={SettingsIcon}>
          Settings
        </NavLink>
      </nav>
    </div>
  )
}
