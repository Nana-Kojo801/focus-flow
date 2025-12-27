import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export const IntervalCard = ({
  label,
  defaultValue,
  color,
}: {
  label: string
  defaultValue: string
  color: string
}) => {
  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-card/30 border border-border/40 hover:bg-card/40 transition-all duration-300">
      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">
        {label}
      </Label>
      <div className="relative flex items-baseline gap-1">
        <Input
          type="number"
          defaultValue={defaultValue}
          className="w-16 h-10 p-0 text-center text-2xl font-black border-none focus-visible:ring-0 bg-transparent"
        />
        <span
          className={cn('text-[10px] font-bold uppercase opacity-40', color)}
        >
          min
        </span>
      </div>
      <div
        className={cn(
          'h-1 w-8 rounded-full opacity-20',
          color.replace('text', 'bg'),
        )}
      />
    </div>
  )
}
