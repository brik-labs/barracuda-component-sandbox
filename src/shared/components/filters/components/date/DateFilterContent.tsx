import { CornerDownRight } from "lucide-react"
import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/components/ui/select"
import { cn } from "@shared/lib/utils"
import {
  DATE_OPERATORS,
  TIME_UNITS,
  type DateFilterValue,
} from "@shared/types/dateFilter"
import { useDateFilter } from "../../hooks/useDateFilter"
import { DatePicker } from "@shared/components/ui/date-picker"

interface DateFilterContentProps {
  label: string
  value: DateFilterValue | null | undefined
  onChange: (value: DateFilterValue | null) => void
  onClose: () => void
}


export function DateFilterContent({
  label,
  value,
  onChange,
  onClose,
}: DateFilterContentProps) {
  const {
    operator,
    setOperator,
    formData,
    updateFormData,
    handleApply,
    isValidFormData,
  } = useDateFilter(value, onChange)

  const handleApplyAndClose = () => {
    handleApply()
    onClose()
  }


  const renderOperatorContent = () => {
    switch (operator) {
      case "last":
        return (
          <div className="flex items-center gap-1 pt-1">
            <CornerDownRight className="h-4 w-4 text-primary shrink-0" strokeWidth={3} />
            <Input
              type="number"
              value={formData.lastNumber}
              onChange={(e) => updateFormData({ lastNumber: e.target.valueAsNumber || "" })}
              className="w-[70px] rounded-lg border-2 shadow-sm h-8"
              min="1"
            />
            <Select value={formData.lastUnit} onValueChange={(value: "h" | "d" | "m") => updateFormData({ lastUnit: value })}>
              <SelectTrigger className="w-[100px] rounded-lg border-2 shadow-sm font-normal text-sm h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-lg shadow-lg border-2 select-none">
                {TIME_UNITS.map(unit => (
                  <SelectItem key={unit.value} value={unit.value} className="font-normal text-sm rounded-md">
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      case "equal":
      case "before":
      case "after":
        return (
          <div className="flex items-center gap-1 pt-1">
            <CornerDownRight className="h-4 w-4 text-primary shrink-0" strokeWidth={3} />
            <DatePicker
              date={formData.selectedDate}
              onSelect={(date) => updateFormData({ selectedDate: date })}
              variant="compact"
            />
          </div>
        )
      case "between":
        return (
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-[auto_auto_auto] items-center justify-start gap-y-1 gap-x-2">
              <DatePicker
                date={formData.startDate}
                onSelect={(date) => updateFormData({ startDate: date })}
                disabled={(date: Date) => formData.endDate ? date > formData.endDate : false}
                variant="compact"
              />
              <span className="text-xs font-normal text-muted-foreground text-center">and</span>
              <DatePicker
                date={formData.endDate}
                onSelect={(date) => updateFormData({ endDate: date })}
                disabled={(date: Date) => formData.startDate ? date < formData.startDate : false}
                variant="compact"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={cn(
        "p-3 space-y-3",
        "min-w-[260px] select-none",
        operator === "between" && "min-w-[300px]",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Filter by {label}</span>
      </div>

      <div className="space-y-2">
        <Select value={operator} onValueChange={(value) => setOperator(value as typeof operator)}>
          <SelectTrigger className="w-full font-semibold text-sm rounded-lg border-2 shadow-sm h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-lg shadow-lg border-2 select-none">
            {DATE_OPERATORS.map(op => (
              <SelectItem
                key={op.value}
                value={op.value}
                className="font-semibold text-sm rounded-md"
              >
                {op.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {renderOperatorContent()}
      </div>

      <div className="pt-1">
        <Button
          onClick={handleApplyAndClose}
          size="sm"
          className="w-full font-normal rounded-lg shadow-md h-8"
          disabled={!isValidFormData}
        >
          Apply
        </Button>
      </div>
    </div>
  )
}
