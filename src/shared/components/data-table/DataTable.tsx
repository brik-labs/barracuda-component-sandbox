import { useRef, useMemo } from "react"
import { Table } from "@shared/components/ui/table"
import { cn } from "@shared/lib/utils"
import type { DataTableProps } from "@shared/types/data-table"
import { LoadingSkeleton } from "./LoadingSkeleton"
import { EmptyState } from "./EmptyState"
import { Pagination } from "./Pagination"
import { DataTableHeader } from "./DataTableHeader"
import { DataTableBody } from "./DataTableBody"
import { useDataTableSelection } from "./hooks/use-data-table-selection"
import { useTableScroll } from "./hooks/use-table-scroll"
import { useScrollToActiveRow } from "./hooks/use-scroll-to-active-row"

function defaultSortFn<T extends Record<string, any>>(a: T, b: T, key: string): number {
  const aVal = a[key]
  const bVal = b[key]
  if (aVal == null && bVal == null) return 0
  if (aVal == null) return -1
  if (bVal == null) return 1
  if (typeof aVal === "number" && typeof bVal === "number") return aVal - bVal
  return String(aVal).localeCompare(String(bVal))
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  getItemId,
  onRowClick,
  rowActions,
  hoverActions,
  pagination,
  loading = false,
  loadingRows = 10,
  className,
  activeItemId,
  selectedItems = [],
  onSelectionChange,
  sort,
  onSortChange,
  emptyIcon,
  emptyTitle,
  emptyDescription,
}: DataTableProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasSelection = Boolean(onSelectionChange)
  const hasActions = Boolean(rowActions || onRowClick)
  const hasData = Boolean(data?.length)

  const { showRightShadow } = useTableScroll(scrollRef)
  useScrollToActiveRow(activeItemId)

  const { toggleItemSelection, toggleAllSelection, selectionState } =
    useDataTableSelection({
      data: data || [],
      selectedItems,
      onSelectionChange,
      getItemId,
    })

  // Sort data
  const sortedData = useMemo(() => {
    if (!sort || !data?.length) return data
    const column = columns.find((c) => c.key === sort.key)
    if (!column) return data
    const sorted = [...data].sort((a, b) => {
      const result = column.sortFn
        ? column.sortFn(a, b)
        : defaultSortFn(a, b, sort.key)
      return sort.direction === "desc" ? -result : result
    })
    return sorted
  }, [data, sort, columns])

  // Flatten grouped actions for internal row components
  const flatRowActions = rowActions as any
  const flatHoverActions = hoverActions as any

  if (loading) {
    return (
      <LoadingSkeleton
        columns={columns.length}
        rows={loadingRows}
        hasActions={hasActions}
        hasSelection={hasSelection}
      />
    )
  }

  if (!hasData) {
    return (
      <div className={cn("relative w-full py-12", className)}>
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          icon={emptyIcon}
        />
      </div>
    )
  }

  return (
    <div className={cn("relative w-full flex flex-col", className)}>
      <div ref={scrollRef} className="relative overflow-x-auto scroll-smooth">
        <Table className="w-full table-auto">
          <DataTableHeader
            columns={columns}
            hasSelection={hasSelection}
            hasActions={hasActions}
            showRightShadow={showRightShadow}
            selectionState={selectionState}
            onToggleAllSelection={toggleAllSelection}
            sort={sort}
            onSortChange={onSortChange}
          />
          <DataTableBody
            data={sortedData}
            columns={columns}
            selectedItems={selectedItems}
            hasSelection={hasSelection}
            rowActions={flatRowActions}
            hoverActions={flatHoverActions}
            onRowClick={onRowClick}
            onToggleSelection={toggleItemSelection}
            showRightShadow={showRightShadow}
            getItemId={getItemId}
            activeItemId={activeItemId}
          />
        </Table>
      </div>
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          loading={pagination.loading}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  )
}
