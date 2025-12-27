import { Card, CardContent } from '@/components/ui/card'
import db from '@/lib/db'
import { useStreak } from '@/stores/streak-store'
import { useLiveQuery } from 'dexie-react-hooks'
import { Zap, Focus, Coffee, Flame } from 'lucide-react'

export const StatsSummary = () => {
  const sessions = useLiveQuery(() => db.sessions.toArray())
  const streak = useStreak()

  const focusTime = sessions?.reduce((total, session) => {
    if (session?.type !== "focus") return total
    const startTime = new Date(session.startTime).getTime()
    const endTime = new Date(session.endTime || session.startTime).getTime()

    return total + Math.floor((endTime - startTime) / 60000)
  }, 0) || 0

  const totalBreaks = sessions?.filter(session => session.type !== "focus").length || 0

  const stats = [
    {
      label: 'Sessions',
      value: sessions?.length,
      icon: Zap,
      color: 'text-brand-focus',
      bg: 'bg-brand-focus/10',
    },
    {
      label: 'Focus Time',
      value: `${focusTime}m`,
      icon: Focus,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
    {
      label: 'Breaks',
      value: totalBreaks,
      icon: Coffee,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Day Streak',
      value: streak,
      icon: Flame,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="border-border/10 bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden group hover:border-brand-focus/30 transition-all duration-500 shadow-sm"
        >
          <CardContent className="p-4 md:p-5 flex flex-col items-center justify-center gap-3">
            <div
              className={`p-2 rounded-xl ${stat.bg} ${stat.color} transition-all duration-500 group-hover:scale-110 shadow-sm`}
            >
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-center">
              <p className="text-xl md:text-3xl font-black tracking-tighter italic leading-none">
                {stat.value}
              </p>
              <p className="text-[10px] md:text-[11px] uppercase tracking-widest text-muted-foreground font-black mt-1.5 opacity-60">
                {stat.label}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
