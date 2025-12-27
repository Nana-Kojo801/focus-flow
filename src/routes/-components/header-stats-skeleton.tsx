import { Zap, Focus, Coffee, type LucideIcon } from 'lucide-react'

function StatItemSkeleton({
  icon: Icon,
  color,
}: {
  icon: LucideIcon
  color: string
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-4 flex-1">
      <Icon className={`w-5 h-5 mb-2 ${color} opacity-50`} />
      <div className="h-3 w-16 bg-muted/30 rounded-md animate-pulse" />
    </div>
  )
}

export default function HeaderStatsSkeleton() {
  return (
    <section className="w-full mb-4 md:mb-6">
      <div className="flex items-center justify-center w-full bg-card/40 border border-border/20 rounded-[20px] overflow-hidden backdrop-blur-xl shadow-sm">
        <StatItemSkeleton icon={Zap} color="text-brand-focus" />
        <StatItemSkeleton icon={Focus} color="text-orange-500" />
        <StatItemSkeleton icon={Coffee} color="text-blue-500" />
      </div>
    </section>
  )
}
