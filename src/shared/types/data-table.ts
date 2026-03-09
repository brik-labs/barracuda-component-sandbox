import type { ReactNode } from "react"

export type Alignment = "left" | "center" | "right"
export type SortDirection = "asc" | "desc"

export interface SortState {
  key: string
  direction: SortDirection
}

/**
 * Column configuration for data table
 */
export interface Column<T> {
  key: string
  header: ReactNode
  width?: string | number
  minWidth?: string | number
  maxWidth?: string | number
  align?: Alignment
  render: (item: T, index: number) => ReactNode
  /** Enable sorting on this column */
  sortable?: boolean
  /** Custom sort comparator. If omitted, sorts by item[key] using default comparison */
  sortFn?: (a: T, b: T) => number
  className?: string
  headerClassName?: string
  cellClassName?: string
}

/**
 * Action button configuration for table rows
 */
export interface TableAction<T> {
  key: string
  label: string
  icon?: ReactNode
  onClick: (item: T) => void | Promise<void>
  variant?: "default" | "destructive" | "ghost" | "outline"
  condition?: (item: T) => boolean
  disabled?: ((item: T) => boolean) | boolean
}

/**
 * Group of related actions with a label
 */
export interface TableActionGroup<T> {
  label: string
  actions: TableAction<T>[]
}

export type TableActions<T> = TableAction<T>[] | TableActionGroup<T>[]

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  loading?: boolean
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  getItemId: (item: T) => string
  onRowClick?: (item: T) => void
  rowActions?: TableActions<T> | ((item: T) => TableActions<T>)
  hoverActions?: TableAction<T>[] | ((item: T) => TableAction<T>[])
  pagination?: PaginationProps
  loading?: boolean
  loadingRows?: number
  className?: string
  activeItemId?: string
  // Selection (optional)
  selectedItems?: string[]
  onSelectionChange?: (selectedIds: string[]) => void
  // Sorting
  sort?: SortState | null
  onSortChange?: (sort: SortState | null) => void
  // Empty state
  emptyIcon?: React.ComponentType<{ className?: string }>
  emptyTitle?: string
  emptyDescription?: string
}
