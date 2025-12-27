import { Zap, Focus, Coffee } from 'lucide-react'
import StatItem from './stat-item'
import { useLiveQuery } from 'dexie-react-hooks'
import db from '@/lib/db'
import HeaderStatsSkeleton from './header-stats-skeleton'

export default function HeaderStats() {
  const sessions = useLiveQuery(() =>
    db.sessions
      .filter(
        (session) =>
          new Date(session.startTime).getDate() === new Date().getDate(),
      )
      .toArray(),
  )

  const totalSessions =
    sessions?.filter((session) => session.completed).length || 0
  const totalTime =
    sessions?.reduce((total, session) => {
      // Only count sessions that have actually ended
      if (!session.endTime) return total

      const timeDiff =
        new Date(session.endTime).getTime() -
        new Date(session.startTime).getTime()
      return total + timeDiff
    }, 0) || 0

  const totalMinutes = Math.floor(totalTime / 60000)
  const totalBreaks =
    sessions?.filter((session) => session.type !== 'focus').length || 0

    if(sessions === undefined) return <HeaderStatsSkeleton />

  return (
    <section className="w-full mb-4 md:mb-6">
      <div className="flex items-center justify-center w-full bg-card/40 border border-border/20 rounded-[20px] overflow-hidden backdrop-blur-xl shadow-sm">
        <StatItem
          icon={Zap}
          value={totalSessions.toString()}
          label="Sessions"
          color="text-brand-focus"
        />
        <StatItem
          icon={Focus}
          value={totalMinutes.toString()}
          label="Minutes"
          color="text-orange-500"
        />
        <StatItem
          icon={Coffee}
          value={totalBreaks.toString()}
          label="Breaks"
          color="text-blue-500"
        />
      </div>
    </section>
  )
}
