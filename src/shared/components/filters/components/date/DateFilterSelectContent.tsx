import { Button } from "@shared/components/ui/button"
import { DATE_PRESET_OPTIONS } from "./datePresets"

interface DateFilterSelectContentProps {
  value: string | null | undefined
  onChange: (value: string | null) => void
  onClose: () => void
}

export function DateFilterSelectContent({
  value,
  onChange,
  onClose,
}: DateFilterSelectContentProps) {
  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue)
    onClose()
  }

  return (
    <div className="p-2">
      <div className="space-y-1">
        {DATE_PRESET_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant="ghost"
            size="sm"
            className={`w-full justify-start text-sm font-normal ${
              value === option.value ? 'bg-accent' : ''
            }`}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
