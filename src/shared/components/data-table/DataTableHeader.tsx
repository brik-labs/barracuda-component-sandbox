import { TableHead, TableHeader, TableRow } from "@shared/components/ui/table"
import { Checkbox } from "@shared/components/ui/checkbox"
import { cn } from "@shared/lib/utils"
import type { Column } from "@shared/types/data-table"
import { stickyColumnVariants } from "./sticky-column-variants"

interface SelectionState {
  isIndeterminate: boolean
  isAllSelected: boolean
}

interface DataTableHeaderProps<T> {
  columns: Column<T>[]
  hasSelection: boolean
  hasActions: boolean
  showRightShadow: boolean
  selectionState: SelectionState
  onToggleAllSelection: () => void
}

export function DataTableHeader<T>({
  columns,
  hasSelection,
  hasActions,
  showRightShadow,
  selectionState,
  onToggleAllSelection,
}: DataTableHeaderProps<T>) {
  return (
    <TableHeader role="rowgroup">
      <TableRow className="transition-none hover:bg-transparent" role="row">
        {hasSelection && (
          <TableHead
            className="w-9 min-w-9 max-w-9 px-1 text-center"
            role="columnheader"
            scope="col"
          >
            <div className="flex items-center justify-center">
              <Checkbox
                checked={
                  selectionState.isIndeterminate
                    ? "indeterminate"
                    : selectionState.isAllSelected
                }
                onCheckedChange={onToggleAllSelection}
                aria-label={`${selectionState.isAllSelected ? "Deselect" : "Select"} all items`}
              />
            </div>
          </TableHead>
        )}

        {columns.map((column) => (
          <TableHead
            key={column.key}
            className={cn(
              column.align === "center"
                ? "text-center"
                : column.align === "right"
                  ? "text-right"
                  : "text-left",
              column.headerClassName
            )}
            style={{
              width: column.width,
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
            }}
            role="columnheader"
            scope="col"
          >
            {column.header}
          </TableHead>
        ))}

        <TableHead className="w-full" role="columnheader" scope="col" />

        {hasActions && (
          <TableHead
            className={stickyColumnVariants({ showRightShadow })}
            data-sticky-action="true"
            role="columnheader"
            scope="col"
          >
            <span className="sr-only">Actions</span>
          </TableHead>
        )}
      </TableRow>
    </TableHeader>
  )
}
