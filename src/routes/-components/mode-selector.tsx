import db from '@/lib/db'
import { cn } from '@/lib/utils'
import {
  useActiveSessionId,
  useAppStateStoreActions,
  useSessionType,
} from '@/stores/app-state-store'
import {
  useFocusDuration,
  useShortBreakDuration,
  useLongBreakDuration,
} from '@/stores/settings-store'

interface ModeButtonProps {
  label: string
  isActive?: boolean
  onClick: () => void
}

const ModeButton = ({ label, isActive, onClick }: ModeButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      'px-4 md:px-5 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-xl',
      isActive
        ? 'bg-secondary text-foreground shadow-sm scale-105'
        : 'text-muted-foreground hover:text-foreground hover:bg-white/5',
    )}
  >
    {label}
  </button>
)

export const ModeSelector = () => {
  const currentType = useSessionType()
  const activeSessionId = useActiveSessionId()
  const { setSessionType, setTimeRemaining, pauseTimer, setActiveSessionId } =
    useAppStateStoreActions()

  const focusDuration = useFocusDuration()
  const shortBreakDuration = useShortBreakDuration()
  const longBreakDuration = useLongBreakDuration()

  const handleModeChange = (
    type: 'focus' | 'short-break' | 'long-break',
    duration: number,
  ) => {
    pauseTimer()
    setSessionType(type)
    setTimeRemaining(duration)

    if (activeSessionId) {
      db.sessions.update(activeSessionId, {
        endTime: new Date().toISOString(),
        completed: true,
      })
      setActiveSessionId(null)
    }
  }

  return (
    <div className="flex items-center justify-center gap-1 p-1 bg-card/40 border border-border/10 rounded-2xl w-fit mx-auto backdrop-blur-xl shadow-sm">
      <ModeButton
        label="Focus"
        isActive={currentType === 'focus'}
        onClick={() => handleModeChange('focus', focusDuration)}
      />
      <ModeButton
        label="Short"
        isActive={currentType === 'short-break'}
        onClick={() => handleModeChange('short-break', shortBreakDuration)}
      />
      <ModeButton
        label="Long"
        isActive={currentType === 'long-break'}
        onClick={() => handleModeChange('long-break', longBreakDuration)}
      />
    </div>
  )
}
