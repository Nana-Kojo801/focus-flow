import { createFileRoute } from '@tanstack/react-router'
import { TimerDisplay } from './-components/timer-display'
import { ModeSelector } from './-components/mode-selector'
import { TimerControls } from './-components/timer-controls'
import { TaskInput } from './-components/task-input'
import HeaderStats from './-components/header-stats'

export const Route = createFileRoute('/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] md:h-auto max-w-sm md:max-w-md mx-auto px-6 py-4 md:py-8">
      {/* 1. Header Stats */}
      <HeaderStats />

      {/* 2. Main Stage: Centered with flex-1 */}
      <div className="flex-1 flex items-center justify-center md:flex-none md:mt-0">
        <section className="w-full flex flex-col items-center space-y-8 md:space-y-4 py-2">
          <TaskInput />

          <div className="relative w-full flex justify-center">
            <div className="absolute inset-0 bg-brand-focus/5 blur-[50px] rounded-full -z-10" />
            <TimerDisplay />
          </div>

          <div className="w-full flex flex-col items-center space-y-8 md:space-y-4">
            <TimerControls />

            <div className="w-full flex flex-col items-center">
              <ModeSelector />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}