import type { SessionType } from '@/lib/db'
import { create } from 'zustand'

interface AppStateStoreType {
  sessionType: SessionType
  isTimerRunning: boolean
  timeRemaining: number
  activeSessionId: string | null
  goal: string

  actions: {
    setSessionType: (type: SessionType) => void
    setIsTimerRunning: (running: boolean) => void
    setTimeRemaining: (time: number) => void
    setActiveSessionId: (id: string | null) => void
    setGoal: (goal: string) => void

    startTimer: (duration: number) => void
    pauseTimer: () => void
    resetTimer: () => void
    startShortBreak: (duration: number) => void
    startLongBreak: (duration: number) => void
  }
}

const useAppStateStore = create<AppStateStoreType>()((set) => ({
  sessionType: 'focus',
  isTimerRunning: false,
  timeRemaining: 0,
  activeSessionId: null,
  goal: "Focus time",

  actions: {
    setSessionType: (type) => set({ sessionType: type }),
    setIsTimerRunning: (running) => set({ isTimerRunning: running }),
    setTimeRemaining: (time) => set({ timeRemaining: time }),
    setActiveSessionId: (id) => set({ activeSessionId: id }),
    setGoal: (goal) => set({ goal }),

    startTimer: (duration) => {
      set({ isTimerRunning: true, timeRemaining: duration })
    },
    pauseTimer: () => {
      set({ isTimerRunning: false })
    },
    resetTimer: () => {
      set({
        isTimerRunning: false,
        timeRemaining: 0,
        activeSessionId: null,
        sessionType: 'focus',
      })
    },
    startShortBreak: (duration) => {
      set({ sessionType: 'short-break', timeRemaining: duration })
    },
    startLongBreak: (duration) => {
      set({ sessionType: 'long-break', timeRemaining: duration })
    },
  },
}))

export const useAppStateStoreActions = () =>
  useAppStateStore((state) => state.actions)

export const useSessionType = () =>
  useAppStateStore((state) => state.sessionType)
export const useIsTimerRunning = () =>
  useAppStateStore((state) => state.isTimerRunning)
export const useTimeRemaining = () =>
  useAppStateStore((state) => state.timeRemaining)
export const useActiveSessionId = () =>
  useAppStateStore((state) => state.activeSessionId)
export const useGoal = () => useAppStateStore((state) => state.goal)
