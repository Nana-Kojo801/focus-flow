import { createFileRoute } from '@tanstack/react-router'
import {
  DurationSetting,
  ThemeSetting,
} from './-components/settings-components'
import {
  ShieldCheck,
  Palette,
  Zap,
} from 'lucide-react'
import { useFocusDuration, useLongBreakDuration, useSettingsStoreActions, useShortBreakDuration } from '@/stores/settings-store'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const focusDuration = useFocusDuration()
  const shortBreakDuration = useShortBreakDuration()
  const longBreakDuration = useLongBreakDuration()

  const { setFocusDuration, setShortBreakDuration, setLongBreakDuration } = useSettingsStoreActions()

  return (
    <div className="max-w-3xl mx-auto px-6 py-6 md:py-12 space-y-10">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] border border-border/10">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-focus" />
          System configuration
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-none">
          Settings
        </h1>
      </div>

      <div className="grid gap-12">
        {/* Appearance Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-l-2 border-brand-focus pl-4">
            <Palette className="w-5 h-5 text-brand-focus opacity-70" />
            <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60">
              Appearance
            </h2>
          </div>
          <ThemeSetting />
        </section>

        {/* Timers Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-l-2 border-orange-500 pl-4">
            <Zap className="w-5 h-5 text-orange-500 opacity-70" />
            <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60">
              Time Intervals
            </h2>
          </div>
          <div className="grid gap-3">
            <DurationSetting
              label="Focus"
              description="Minutes for deep work"
              value={focusDuration}
              onChange={(e) => setFocusDuration(+e.target.value)}
            />
            <DurationSetting
              label="Short Break"
              description="Quick rest period"
              value={shortBreakDuration}
              onChange={(e) => setShortBreakDuration(+e.target.value)}
            />
            <DurationSetting
              label="Long Break"
              description="Extended rest period"
              value={longBreakDuration}
              onChange={(e) => setLongBreakDuration(+e.target.value)}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
