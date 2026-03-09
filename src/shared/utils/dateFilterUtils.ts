import { format } from "date-fns"
import { TIME_UNITS, type DateFilterValue } from "@shared/types/dateFilter"

const getUnitLabel = (unitValue: "h" | "d" | "m" | undefined) => {
  if (!unitValue) return ""
  return TIME_UNITS.find(u => u.value === unitValue)?.label ?? unitValue
}

export function getDisplayLabel(
  value: DateFilterValue | null | undefined,
  label: string,
): { label: string; displayValue: string } {
  if (!value) return { label, displayValue: "" }

  switch (value.operator) {
    case "last":
      return {
        label,
        displayValue: `Last ${value.lastNumber} ${getUnitLabel(value.lastUnit)}`,
      }
    case "equal":
      return {
        label,
        displayValue: value.value ? format(value.value, "M/d/yyyy") : "",
      }
    case "between":
      if (value.startDate && value.endDate) {
        return {
          label,
          displayValue: `${format(value.startDate, "M/d/yyyy")} - ${format(
            value.endDate,
            "M/d/yyyy",
          )}`,
        }
      }
      return { label, displayValue: "" }
    case "before":
      return {
        label,
        displayValue: value.value
          ? `Ending on ${format(value.value, "M/d/yyyy")}`
          : "",
      }
    case "after":
      return {
        label,
        displayValue: value.value
          ? `Starting from ${format(value.value, "M/d/yyyy")}`
          : "",
      }
    default:
      return { label, displayValue: "" }
  }
}
