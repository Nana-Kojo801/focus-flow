import { cn } from "@/lib/utils"

export default function StatItem({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: any
  value: string
  label: string
  color: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-1 md:py-1.5 flex-1 border-r border-border/10 last:border-0 group transition-colors hover:bg-muted/30">
      <div className="flex items-center gap-1 opacity-60 mb-0.5">
        <Icon className={cn('w-2 h-2 md:w-2.5 md:h-2.5', color)} />
        <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest leading-none">
          {label}
        </span>
      </div>
      <span className="text-sm md:text-lg font-black tabular-nums tracking-tighter leading-none">
        {value}
      </span>
    </div>
  )
}