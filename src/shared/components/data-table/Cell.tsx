import { memo } from "react"
import { TableCell } from "@shared/components/ui/table"
import { cn } from "@shared/lib/utils"
import type { Column } from "@shared/types/data-table"

interface CellProps<T> {
  column: Column<T>
  item: T
  index: number
}

function CellComponent<T>({ column, item, index }: CellProps<T>) {
  const hasWidthStyles = column.width || column.minWidth || column.maxWidth

  return (
    <TableCell
      className={cn(
        "truncate bg-inherit",
        column.align === "center"
          ? "text-center"
          : column.align === "right"
            ? "text-right tabular-nums"
            : "text-left",
        column.cellClassName
      )}
      style={
        hasWidthStyles
          ? {
              width: column.width,
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
            }
          : undefined
      }
      role="gridcell"
    >
      {column.render(item, index)}
    </TableCell>
  )
}

export const Cell = memo(CellComponent)
