import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@shared/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const Calendar = ({ className, ...props }: CalendarProps) => {
  return (
    <DayPicker
      className={cn("rdp-calendar", className)}
      navLayout="around"
      showOutsideDays
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          ),
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
