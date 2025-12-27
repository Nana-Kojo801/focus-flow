import { useEffect } from 'react'
import {
  useAppStateStoreActions,
  useIsTimerRunning,
  useTimeRemaining,
  useSessionType,
  useActiveSessionId,
} from '@/stores/app-state-store'
import {
  useFocusDuration,
  useLongBreakDuration,
  useShortBreakDuration,
} from '@/stores/settings-store'
import { getNextSessionType } from '@/lib/helper-functions'
import db from '@/lib/db'

export const TimerDisplay = () => {
  const timeRemaining = useTimeRemaining()
  const isTimerRunning = useIsTimerRunning()
  const sessionType = useSessionType()
  const focusDuration = useFocusDuration()
  const longBreakDuration = useLongBreakDuration()
  const shortBreakDuration = useShortBreakDuration()
  const activeSessionId = useActiveSessionId()
  const { setTimeRemaining, pauseTimer, setSessionType, setActiveSessionId } =
    useAppStateStoreActions()

  // Initial time set if nothing is running
  const displayTime = timeRemaining > 0 ? timeRemaining : focusDuration

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
    } else if (timeRemaining === 0 && isTimerRunning) {
      pauseTimer()
      const nextSessionType = getNextSessionType(sessionType)
      const nextDuration =
        sessionType === 'focus'
          ? shortBreakDuration
          : sessionType === 'short-break'
            ? longBreakDuration
            : sessionType === 'long-break'
              ? focusDuration
              : focusDuration
      setSessionType(nextSessionType)
      setTimeRemaining(nextDuration)
      if (activeSessionId) {
        db.sessions.update(activeSessionId, {
          endTime: new Date().toISOString(),
          completed: true
        })
        setActiveSessionId(null)
      }
      // Here we could trigger a notification or auto-switch session types
    }

    return () => clearInterval(interval)
  }, [isTimerRunning, timeRemaining, setTimeRemaining, pauseTimer])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getSessionLabel = () => {
    switch (sessionType) {
      case 'short-break':
        return 'Short Break'
      case 'long-break':
        return 'Long Break'
      default:
        return 'Focus Session'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-4 md:py-8 relative z-10">
      <div className="relative inline-flex flex-col items-center">
        {/* Adjusted for non-scrolling: Large but compact */}
        <span className="text-[64px] md:text-[90px] font-bold tracking-[-0.06em] leading-none tabular-nums text-foreground select-none">
          {formatTime(displayTime * 60)}
        </span>

        <div className="mt-2 md:mt-4 flex items-center gap-2">
          <div className="h-px w-4 md:w-6 bg-brand-focus/40 rounded-full" />
          <span className="text-[8px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-brand-focus">
            {getSessionLabel()}
          </span>
          <div className="h-px w-4 md:w-6 bg-brand-focus/40 rounded-full" />
        </div>
      </div>
    </div>
  )
}
