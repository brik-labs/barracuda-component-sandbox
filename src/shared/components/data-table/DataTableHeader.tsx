import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react"
import { TableHead, TableHeader, TableRow } from "@shared/components/ui/table"
import { Checkbox } from "@shared/components/ui/checkbox"
import { cn } from "@shared/lib/utils"
import type { Column, SortState } from "@shared/types/data-table"
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
  sort?: SortState | null
  onSortChange?: (sort: SortState | null) => void
}

export function DataTableHeader<T>({
  columns,
  hasSelection,
  hasActions,
  showRightShadow,
  selectionState,
  onToggleAllSelection,
  sort,
  onSortChange,
}: DataTableHeaderProps<T>) {
  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !onSortChange) return
    if (sort?.key === column.key) {
      if (sort.direction === "asc") {
        onSortChange({ key: column.key, direction: "desc" })
      } else {
        onSortChange(null)
      }
    } else {
      onSortChange({ key: column.key, direction: "asc" })
    }
  }

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

        {columns.map((column) => {
          const isSorted = sort?.key === column.key
          const isSortable = column.sortable && !!onSortChange

          return (
            <TableHead
              key={column.key}
              className={cn(
                column.align === "center"
                  ? "text-center"
                  : column.align === "right"
                    ? "text-right"
                    : "text-left",
                isSortable && "cursor-pointer select-none hover:text-foreground transition-colors",
                column.headerClassName
              )}
              style={{
                width: column.width,
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
              }}
              role="columnheader"
              scope="col"
              onClick={isSortable ? () => handleSort(column) : undefined}
              aria-sort={
                isSorted
                  ? sort.direction === "asc" ? "ascending" : "descending"
                  : undefined
              }
            >
              <div className={cn(
                "flex items-center gap-1",
                column.align === "right" && "justify-end",
                column.align === "center" && "justify-center",
              )}>
                {column.header}
                {isSortable && (
                  isSorted ? (
                    sort.direction === "asc"
                      ? <ArrowUp className="h-3 w-3 shrink-0" />
                      : <ArrowDown className="h-3 w-3 shrink-0" />
                  ) : (
                    <ArrowUpDown className="h-3 w-3 shrink-0 opacity-40" />
                  )
                )}
              </div>
            </TableHead>
          )
        })}

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
