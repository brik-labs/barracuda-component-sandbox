import { useMemo, useCallback, memo } from "react"
import { TableCell, TableRow } from "@shared/components/ui/table"
import { Checkbox } from "@shared/components/ui/checkbox"
import { cn } from "@shared/lib/utils"
import type { Column, TableAction } from "@shared/types/data-table"
import { Cell } from "./Cell"
import { ActionDropdown } from "@shared/components/ui/action-dropdown"
import { HoverActions } from "./HoverActions"
import { stickyColumnVariants } from "./sticky-column-variants"

interface RowProps<T> {
  item: T
  index: number
  itemId: string
  columns: Column<T>[]
  selectedItems: string[]
  hasSelection: boolean
  rowActions?: TableAction<T>[] | ((item: T) => TableAction<T>[])
  hoverActions?: TableAction<T>[] | ((item: T) => TableAction<T>[])
  onRowClick?: (item: T) => void
  onToggleSelection: (itemId: string) => void
  showRightShadow: boolean
  activeItemId?: string
}

function RowComponent<T extends Record<string, unknown>>({
  item,
  index,
  itemId,
  columns,
  selectedItems,
  hasSelection,
  rowActions,
  hoverActions,
  onRowClick,
  onToggleSelection,
  showRightShadow,
  activeItemId,
}: RowProps<T>) {
  const isSelected = selectedItems.includes(itemId)
  const isActive = activeItemId === itemId

  const visibleRowActions = useMemo(() => {
    const actions = rowActions
      ? typeof rowActions === "function"
        ? rowActions(item)
        : rowActions
      : []
    return actions.filter((action) => !action.condition || action.condition(item))
  }, [rowActions, item])

  const visibleHoverActions = useMemo(() => {
    const actions = hoverActions
      ? typeof hoverActions === "function"
        ? hoverActions(item)
        : hoverActions
      : []
    return actions.filter((action) => !action.condition || action.condition(item))
  }, [hoverActions, item])

  const handleToggle = useCallback(() => {
    onToggleSelection(itemId)
  }, [onToggleSelection, itemId])

  const handleRowClick = useCallback(() => {
    if (onRowClick) onRowClick(item)
  }, [onRowClick, item])

  const handleSelectionClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      handleToggle()
    },
    [handleToggle]
  )

  return (
    <TableRow
      selected={isSelected}
      data-row-id={itemId}
      data-active={isActive}
      className={cn(
        "group cursor-pointer transition-colors duration-200 ease-in-out",
        isActive &&
          "bg-primary-light dark:bg-primary-light hover:bg-primary-light/80 dark:hover:bg-primary-light/60 border-l-4 border-l-primary",
        isSelected &&
          !isActive &&
          "bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800",
        !isActive &&
          !isSelected &&
          "hover:bg-gray-50 dark:hover:bg-gray-800/50"
      )}
      onClick={handleRowClick}
      tabIndex={onRowClick ? 0 : undefined}
      aria-selected={isSelected}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleRowClick()
        }
      }}
    >
      {hasSelection && (
        <TableCell
          className="w-9 min-w-9 max-w-9 px-1 text-center bg-inherit"
          onClick={handleSelectionClick}
          role="gridcell"
        >
          <div className="flex items-center justify-center">
            <Checkbox
              checked={isSelected}
              onCheckedChange={handleToggle}
              aria-label={`${isSelected ? "Deselect" : "Select"} row ${index + 1}`}
            />
          </div>
        </TableCell>
      )}

      {columns.map((column) => (
        <Cell key={column.key} column={column as any} item={item} index={index} />
      ))}

      <TableCell className="w-full relative bg-inherit" role="gridcell">
        {visibleHoverActions.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-end pr-4">
            <HoverActions actions={visibleHoverActions} item={item} />
          </div>
        )}
      </TableCell>

      {visibleRowActions.length > 0 && (
        <TableCell
          className={stickyColumnVariants({ showRightShadow })}
          data-sticky-action="true"
          onClick={(e) => e.stopPropagation()}
          role="gridcell"
        >
          <div className="flex items-center justify-center">
            <ActionDropdown actions={visibleRowActions} item={item} />
          </div>
        </TableCell>
      )}
    </TableRow>
  )
}

export const Row = memo(RowComponent) as <T extends Record<string, unknown>>(
  props: RowProps<T>
) => JSX.Element
