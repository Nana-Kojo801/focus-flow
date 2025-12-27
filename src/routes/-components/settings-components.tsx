import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import type { ChangeEvent } from 'react'

interface DurationSettingProps {
  label: string
  description: string
  value: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const DurationSetting = ({
  label,
  description,
  value,
  onChange
}: DurationSettingProps) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-5 rounded-xl border border-border/40 bg-card/30 hover:bg-card/40 transition-all duration-300">
      <div className="space-y-0.5">
        <Label className="text-sm font-semibold tracking-tight">{label}</Label>
        <p className="text-xs text-muted-foreground opacity-70">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={value}
          onChange={onChange}
          className="w-16 h-8 bg-muted/30 border-border/40 text-center font-medium text-xs rounded-lg"
        />
        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest pl-1 opacity-50">
          Min
        </span>
      </div>
    </div>
  )
}

export const ThemeSetting = () => {
  const { setTheme, theme } = useTheme()
  return (
    <div className="grid grid-cols-2 gap-2 p-1 bg-muted/30 border border-border/20 rounded-xl">
      <button
        onClick={() => setTheme('light')}
        className={`flex items-center justify-center gap-2 py-2.5 rounded-lg ${theme === 'light' ? 'bg-background' : ''} text-foreground shadow-sm text-xs font-bold transition-all hover:opacity-90`}
      >
        <Sun className="w-3.5 h-3.5" />
        Light
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`flex items-center justify-center gap-2 py-2.5 rounded-lg ${theme === 'dark' ? 'bg-background' : ''} text-foreground shadow-sm text-xs font-bold transition-all hover:opacity-90`}
      >
        <Moon className="w-3.5 h-3.5" />
        Dark
      </button>
    </div>
  )
}
