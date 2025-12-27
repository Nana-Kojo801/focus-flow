import type { SessionType } from '@/lib/db'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SettingsStore {
  focusDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  actions: {
    setFocusDuration: (duration: number) => void
    setShortBreakDuration: (duration: number) => void
    setLongBreakDuration: (duration: number) => void
    getSessionDuration: (sessionType: SessionType) => number
  }
}

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      focusDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      actions: {
        setFocusDuration: (duration) => set({ focusDuration: duration }),
        setShortBreakDuration: (duration) =>
          set({ shortBreakDuration: duration }),
        setLongBreakDuration: (duration) =>
          set({ longBreakDuration: duration }),
        getSessionDuration: (type: SessionType) => {
          switch (type) {
            case 'focus':
              return get().focusDuration
            case 'short-break':
              return get().shortBreakDuration
            case 'long-break':
              return get().longBreakDuration
          }
        },
      },
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useSettingsStoreActions = () =>
  useSettingsStore((state) => state.actions)
export const useFocusDuration = () =>
  useSettingsStore((state) => state.focusDuration)
export const useShortBreakDuration = () =>
  useSettingsStore((state) => state.shortBreakDuration)
export const useLongBreakDuration = () =>
  useSettingsStore((state) => state.longBreakDuration)
