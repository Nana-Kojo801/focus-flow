import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface StreakStoreType {
  streak: number
  lastActiveDate: string | null

  actions: {
    setStreak: (streak: number) => void
    setLastActiveDate: (date: string) => void
    checkStreak: () => void
  }
}

const useStreakStore = create<StreakStoreType>()(
  persist(
    (set, get) => ({
      streak: 0,
      lastActiveDate: null,

      actions: {
        setStreak: (streak) => set({ streak }),
        setLastActiveDate: (date) => set({ lastActiveDate: date }),

        checkStreak: () => {
          const lastActive = get().lastActiveDate
          if (!lastActive) return
          const todayDate = new Date().getUTCDay()
          const lastActiveDate = new Date(lastActive).getUTCDay()

          if(todayDate === lastActiveDate) return

          if (lastActiveDate - todayDate === 1) {
            set((state) => ({
              streak: state.streak + 1,
              lastActiveDate: new Date().toISOString(),
            }))
          } else {
            set({
              streak: 1,
              lastActiveDate: new Date().toISOString(),
            })
          }
        },
      },
    }),
    {
      name: 'streak-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useStreakStoreActions = () => useStreakStore(state => state.actions)

export const useStreak = () => useStreakStore(state => state.streak)
export const lastActiveDate = () => useStreakStore(state => state.lastActiveDate)