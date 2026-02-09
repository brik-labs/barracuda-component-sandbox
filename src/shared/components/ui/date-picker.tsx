import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { cn } from "@shared/lib/utils"
import { Button } from "@shared/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover"
import { Calendar } from "@shared/components/ui/calendar"

/**
 * Design tokens for DatePicker components
 */
const DATE_PICKER_STYLES = {
  trigger: "rounded-[10px]",
  content: "rounded-2xl",
  compact: {
    height: "h-8",
    width: "w-28",
    padding: "px-2.5",
    fontSize: "text-sm",
    gap: "gap-1",
  },
  clearButton: "inline-flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-sm",
} as const

/**
 * Props for the DatePicker component
 */
interface DatePickerProps {
  date?: Date
  onSelect?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: (date: Date) => boolean
  className?: string
  clearable?: boolean
  variant?: "default" | "compact"
  iconPosition?: "left" | "right"
  dateFormat?: "short" | "long"
  icon?: string
}

/**
 * Props for the DateRangePicker component
 */
interface DateRangePickerProps {
  dateRange?: DateRange
  onSelect?: (dateRange: DateRange | undefined) => void
  placeholder?: string
  disabled?: (date: Date) => boolean
  className?: string
  numberOfMonths?: number
  iconPosition?: "left" | "right"
}

const formatDateRange = (range: DateRange | undefined, placeholder: string): string => {
  if (!range?.from) return placeholder
  if (!range.to) return format(range.from, "d MMM yyyy")

  const sameYear = range.from.getFullYear() === range.to.getFullYear()

  if (sameYear) {
    return `${format(range.from, "d MMM")} - ${format(range.to, "d MMM yyyy")}`
  }

  return `${format(range.from, "d MMM yyyy")} - ${format(range.to, "d MMM yyyy")}`
}

/**
 * A date picker component built on top of Radix Popover and react-day-picker.
 * Supports compact and default variants with optional clear button.
 */
const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(({
  date,
  onSelect,
  placeholder = "Pick a date",
  disabled,
  className,
  clearable = false,
  variant = "default",
  iconPosition = "right",
  dateFormat = "long"
}, ref) => {
  const isCompact = variant === "compact"

  const getFormatString = () => {
    if (isCompact) return "MM/dd/yyyy"
    return dateFormat === "short" ? "d MMM yyyy" : "MMM d, yyyy"
  }

  const displayText = date ? format(date, getFormatString()) : isCompact ? "" : placeholder

  const handleClear = (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onSelect?.(undefined)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          className={cn(
            "text-left font-normal bg-white",
            DATE_PICKER_STYLES.trigger,
            isCompact
              ? `${DATE_PICKER_STYLES.compact.height} ${DATE_PICKER_STYLES.compact.padding} ${DATE_PICKER_STYLES.compact.fontSize} ${DATE_PICKER_STYLES.compact.gap} ${DATE_PICKER_STYLES.compact.width}`
              : "w-fit px-4 gap-2",
            iconPosition === "left" ? "justify-start" : "justify-between",
            !date && !isCompact && "text-teal-300",
            className
          )}
        >
          {isCompact ? (
            <>
              <CalendarIcon className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">{displayText}</span>
            </>
          ) : (
            <>
              {iconPosition === "left" && (
                <CalendarIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              <span className="truncate flex-1">{displayText}</span>
              {iconPosition === "right" && (
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                  {clearable && date && (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={handleClear}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleClear(e as unknown as React.MouseEvent<HTMLButtonElement>)
                        }
                      }}
                      className={DATE_PICKER_STYLES.clearButton}
                      aria-label="Clear date"
                    >
                      <X className="h-4 w-4" />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0", DATE_PICKER_STYLES.content)} align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  )
})
DatePicker.displayName = "DatePicker"

/**
 * A date range picker component built on top of Radix Popover and react-day-picker.
 * Supports selecting a date range with customizable month display and icon positioning.
 */
const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(({
  dateRange,
  onSelect,
  placeholder = "Pick a date range",
  disabled,
  className,
  numberOfMonths = 2,
  iconPosition = "right"
}, ref) => {
  const displayText = formatDateRange(dateRange, placeholder)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          className={cn(
            "w-full text-left font-normal px-4 gap-2 bg-white",
            DATE_PICKER_STYLES.trigger,
            iconPosition === "left" ? "justify-start" : "justify-between",
            !dateRange?.from && "text-muted-foreground",
            className
          )}
        >
          {iconPosition === "left" && (
            <CalendarIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
          )}
          <span className="truncate flex-1">{displayText}</span>
          {iconPosition === "right" && (
            <CalendarIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0", DATE_PICKER_STYLES.content)} align="start">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={onSelect}
          disabled={disabled}
          numberOfMonths={numberOfMonths}
        />
      </PopoverContent>
    </Popover>
  )
})
DateRangePicker.displayName = "DateRangePicker"

export { DatePicker, DateRangePicker }
