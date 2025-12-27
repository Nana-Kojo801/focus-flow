import { createFileRoute } from '@tanstack/react-router'
import { StatsSummary } from './-components/stats-summary'
import { SessionList } from './-components/session-list'
import { Calendar, TrendingUp } from 'lucide-react'

export const Route = createFileRoute('/stats')({
  component: StatsPage,
})

function StatsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-6 md:py-12 space-y-10">
      {/* 1. Simplified Header */}
      <header className="space-y-1">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
          Activity
        </h1>
        <p className="text-sm text-muted-foreground font-medium opacity-60">
          Your productivity trends and session history.
        </p>
      </header>

      {/* 2. Metric Overview */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-l-2 border-brand-focus pl-4">
          <TrendingUp className="w-5 h-5 text-brand-focus opacity-70" />
          <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60">
            Metric Overview
          </h2>
        </div>
        <StatsSummary />
      </section>

      {/* 3. Session Log Section */}
      <section className="space-y-10">
        <div className="flex items-center justify-between border-l-2 border-border pl-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground opacity-70" />
            <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60">
              Recent History
            </h2>
          </div>
          <button className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors opacity-60 hover:opacity-100">
            Export Report
          </button>
        </div>
        <div className="max-w-4xl">
          <SessionList />
        </div>
      </section>
    </div>
  )
}
