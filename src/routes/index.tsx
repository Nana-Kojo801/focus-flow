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
    <div className="flex flex-col items-center h-[calc(100vh-14rem)] md:h-auto max-w-sm md:max-w-md mx-auto px-6 overflow-hidden py-4 md:py-8">
      {/* 1. Header Stats */}
      <HeaderStats />

      {/* Spacer to push content to center on mobile */}
      <div className="flex-1 md:hidden" />

      {/* 2. Main Stage: Focused group */}
      <section className="w-full flex flex-col items-center space-y-3 md:space-y-4 py-2">
        <TaskInput />

        <div className="relative w-full flex justify-center">
          <div className="absolute inset-0 bg-brand-focus/5 blur-[50px] rounded-full -z-10" />
          <TimerDisplay />
        </div>

        <div className="w-full flex flex-col items-center space-y-3 md:space-y-4">
          <TimerControls />

          <div className="w-full flex flex-col items-center space-y-3 md:space-y-4">
            <ModeSelector />
          </div>
        </div>
      </section>
    </div>
  )
}
