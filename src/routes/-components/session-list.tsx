import db, { type Session } from '@/lib/db'
import { cn } from '@/lib/utils'
import { useLiveQuery } from 'dexie-react-hooks'
import { CheckCircle2, Coffee } from 'lucide-react'

export const SessionItem = ({ type, label, startTime, endTime }: Session) => {
  const duration =Math.floor(
    (new Date(endTime || startTime).getTime() -
    new Date(startTime).getTime()) / 60000)
  const isFocus = type === 'focus'

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border/10 bg-card/20 hover:bg-card/40 transition-all duration-300 group">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'p-2 rounded-lg transition-all duration-500',
            isFocus
              ? 'bg-brand-focus/5 text-brand-focus'
              : 'bg-blue-500/5 text-blue-500',
          )}
        >
          {isFocus ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <Coffee className="w-4 h-4" />
          )}
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-bold tracking-tight">{label}</p>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider opacity-60">
            {new Date(startTime).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="text-right flex flex-col items-end gap-1">
        <p className="text-xs font-black tracking-widest opacity-80">
          {duration}m
        </p>
        <div className="h-1 w-12 rounded-full bg-border/20 overflow-hidden">
          <div
            className={cn(
              'h-full transition-all duration-1000',
              isFocus ? 'bg-brand-focus' : 'bg-blue-500',
            )}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}

export const SessionList = () => {
  const sessions = useLiveQuery(() => db.sessions.toArray())

  if (sessions === undefined) return <div></div>

  return (
    <div className="space-y-3">
      {sessions.map((session) => (
        <SessionItem key={session.id} {...session} />
      ))}
    </div>
  )
}
