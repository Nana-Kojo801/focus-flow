import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Target } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useAppStateStoreActions, useGoal } from '@/stores/app-state-store'
import type { KeyboardEvent } from 'react'

interface TaskInputDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const taskInputSchema = z.object({
  goal: z.string().min(2, 'Goal must be at least 2 characters'),
})

export default function TaskInputDialog({
  isOpen,
  onOpenChange,
}: TaskInputDialogProps) {
  const goal = useGoal()
  const { setGoal } = useAppStateStoreActions()
  
  const form = useForm<z.infer<typeof taskInputSchema>>({
    resolver: zodResolver(taskInputSchema as any),
    defaultValues: {
      goal,
    },
  })

  const onSubmit = (data: z.infer<typeof taskInputSchema>) => {
    setGoal(data.goal)
    handleOpenChange(false)
  }

  // Update form when dialog opens with current goal
  const handleOpenChange = (open: boolean) => {
    if (open) {
      form.reset({ goal: goal || '' })
    }
    onOpenChange(open)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      form.handleSubmit(onSubmit)()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Your Goal</DialogTitle>
          <DialogDescription>
            What would you like to focus on during this session?
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="goal"
              rules={{
                required: 'Please enter a goal',
                minLength: {
                  value: 2,
                  message: 'Goal must be at least 2 characters',
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-focus" />
                      <Input
                        placeholder="Enter your goal..."
                        className="pl-10"
                        autoFocus
                        onKeyDown={handleKeyDown}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                Save Goal
              </Button>
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
