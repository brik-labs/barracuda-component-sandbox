import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { Button } from '@shared/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@shared/components/ui/popover'
import { format } from 'date-fns'

export interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

export interface DateRangeFilterProps {
  value?: DateRange
  onChange?: (range: DateRange) => void
  presets?: Array<{
    label: string
    getValue: () => DateRange
  }>
}

const DEFAULT_PRESETS = [
  {
    label: 'Today',
    getValue: () => ({
      from: new Date(),
      to: new Date(),
    }),
  },
  {
    label: 'Last 7 days',
    getValue: () => {
      const to = new Date()
      const from = new Date()
      from.setDate(from.getDate() - 7)
      return { from, to }
    },
  },
  {
    label: 'Last 30 days',
    getValue: () => {
      const to = new Date()
      const from = new Date()
      from.setDate(from.getDate() - 30)
      return { from, to }
    },
  },
  {
    label: 'Last 90 days',
    getValue: () => {
      const to = new Date()
      const from = new Date()
      from.setDate(from.getDate() - 90)
      return { from, to }
    },
  },
  {
    label: 'This month',
    getValue: () => {
      const now = new Date()
      const from = new Date(now.getFullYear(), now.getMonth(), 1)
      const to = new Date()
      return { from, to }
    },
  },
  {
    label: 'Last month',
    getValue: () => {
      const now = new Date()
      const from = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const to = new Date(now.getFullYear(), now.getMonth(), 0)
      return { from, to }
    },
  },
]

export function DateRangeFilter({
  value,
  onChange,
  presets = DEFAULT_PRESETS,
}: DateRangeFilterProps) {
  const [open, setOpen] = useState(false)

  const handlePresetClick = (preset: { label: string; getValue: () => DateRange }) => {
    const range = preset.getValue()
    onChange?.(range)
    setOpen(false)
  }

  const formatDisplayText = () => {
    if (!value?.from) return 'Select date range'
    if (!value?.to) return format(value.from, 'PP')
    return `${format(value.from, 'PP')} - ${format(value.to, 'PP')}`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-start text-left font-normal min-w-[240px]"
        >
          <Calendar className="mr-2 h-4 w-4" />
          <span className="text-sm">{formatDisplayText()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-2 space-y-1">
          {presets.map((preset) => (
            <Button
              key={preset.label}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sm"
              onClick={() => handlePresetClick(preset)}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
