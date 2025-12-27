import { useState } from 'react'
import { Target } from 'lucide-react'
import TaskInputDialog from './task-input-dialog'
import { useGoal } from '@/stores/app-state-store'

export const TaskInput = () => {
  const [isOpen, setIsOpen] = useState(false)
  const goal = useGoal()

  return (
    <>
      <div
        className="w-full max-w-[240px] group cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative flex items-center bg-input rounded-md">
          <Target className="absolute left-3 w-3.5 h-3.5 text-muted-foreground opacity-40 group-hover:text-brand-focus group-hover:opacity-100 transition-all duration-300" />
          <div className="w-full text-center text-sm font-medium h-8 pl-6 pr-2 flex items-center justify-center transition-all duration-300">
            {goal ? (
              <span className="text-foreground">{goal}</span>
            ) : (
              <span className="text-muted-foreground/40 font-normal">
                What's the goal?
              </span>
            )}
          </div>
        </div>
      </div>

      <TaskInputDialog isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
