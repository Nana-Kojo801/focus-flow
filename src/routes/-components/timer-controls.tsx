import { Play, Pause, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  useActiveSessionId,
  useAppStateStoreActions,
  useGoal,
  useIsTimerRunning,
  useSessionType,
  useTimeRemaining,
} from '@/stores/app-state-store'
import db from '@/lib/db'
import { useSettingsStoreActions } from '@/stores/settings-store'
import { useStreakStoreActions } from '@/stores/streak-store'
export const TimerControls = () => {
  const { startTimer, pauseTimer, resetTimer, setActiveSessionId } =
    useAppStateStoreActions()
  const { getSessionDuration } = useSettingsStoreActions()
  const isTimerRunning = useIsTimerRunning()
  const timeRemaining = useTimeRemaining()
  const sessionType = useSessionType()
  const activeSessionId = useActiveSessionId()
  const goal = useGoal()
  const { checkStreak } = useStreakStoreActions()

  const handleStart = async () => {
    if(activeSessionId) {
      startTimer(timeRemaining)
    } else {
      const newSessionId = await db.sessions.add({
        id: crypto.randomUUID(),
        label: goal,
        type: sessionType,
        completed: false,
        startTime: new Date().toISOString(),
        endTime: null,
      })
      checkStreak()
      setActiveSessionId(newSessionId)
      startTimer(getSessionDuration(sessionType))
    }
  }

  return (
    <div className="flex items-center justify-center gap-3 w-full max-w-[280px] md:max-w-[320px] mx-auto">
      {isTimerRunning ? (
        <>
          <Button
            variant="secondary"
            className="h-11 md:h-13 flex-1 rounded-xl text-xs font-bold tracking-widest uppercase transition-all shadow-sm"
            onClick={pauseTimer}
          >
            <Pause className="w-4 h-4 mr-2 fill-current" />
            Pause
          </Button>
          <Button
            variant="destructive"
            className="h-11 md:h-13 w-11 md:w-13 rounded-xl flex items-center justify-center text-destructive hover:bg-destructive/20 transition-all border border-destructive/20"
            onClick={() => {
              db.sessions.update(activeSessionId!, {
                endTime: new Date().toISOString(),
                completed: true
              })
              resetTimer()
            }}
          >
            <Square className="w-4 h-4 fill-current" />
          </Button>
        </>
      ) : (
        <>
          <Button
            size="lg"
            className="h-11 md:h-13 flex-1 rounded-xl text-sm font-bold tracking-wider uppercase bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/10"
            onClick={handleStart}
          >
            <Play className="w-4 h-4 mr-2.5 fill-current" />
            {activeSessionId ? 'Resume' : 'Start'}
          </Button>
        </>
      )}
    </div>
  )
}
