import type React from "react"
import type { AmountFilterValue } from "./amountFilter"
import type { DateFilterValue } from "./dateFilter"

// ================================
// CORE FILTER TYPES
// ================================

export interface FilterOption {
  value: string
  label: string
  icon?: React.ReactNode
  description?: string
  color?: string
  category?: string
}

export interface StatusFilter {
  value: string
  label: string
  count?: number
  color?: string
  icon?: React.ReactNode
}

export type FilterType =
  | "search"
  | "text"
  | "select"
  | "multiSelect"
  | "searchableMultiSelect"
  | "combobox"
  | "checkbox"
  | "switch"
  | "date"
  | "dateRange"
  | "dateFilter"
  | "amountRange"
  | "advancedAmount"
  | "numberRange"
  | "currency"
  | "status"
  | "transactionStatus"
  | "slider"
  | "merchant"
  | "customer"
  | "program"
  | "organization"
  | "productPlatform"
  | "processor"
  | "bank"
  | "location"
  | "store"
  | "channel"
  | "paymentMethod"

export interface FilterConfig {
  type: FilterType
  key: string
  label: string
  placeholder?: string
  searchPlaceholder?: string
  options?: readonly FilterOption[]
  icon?: React.ReactNode
  min?: number
  max?: number
  defaultValue?: unknown
  description?: string
  isVisible?: boolean
  searchable?: boolean
  clearable?: boolean
  currency?: string
}

export interface NumberRangeValue {
  min?: number
  max?: number
}

export interface DateRangeValue {
  startDate?: Date
  endDate?: Date
}

export type FilterValue =
  | string
  | string[]
  | number
  | boolean
  | Date
  | DateFilterValue
  | AmountFilterValue
  | NumberRangeValue
  | DateRangeValue
  | null
  | undefined

export interface FilterState {
  [key: string]: FilterValue
}

// ================================
// COMPONENT CONFIGURATION
// ================================

export interface ColumnConfig {
  id: string
  label: string
  visible?: boolean
  required?: boolean
  order?: number
}

export interface BulkAction {
  key: string
  label: string
  icon?: React.ReactNode
  variant?: "default" | "destructive"
}

export interface TableFiltersConfig {
  title?: string
  description?: string
  filters: FilterConfig[]
  additionalFilters?: FilterConfig[]
  bulkActions?: BulkAction[]
  visibleFilters?: number
  enableSessionPersistence?: boolean
  sessionKey?: string
  entityType?: string
  getColumnsForStatus?: (status?: string) => ColumnConfig[]
  onExport?: () => void
  onUpdateStatus?: () => void
  onUpdateCapabilities?: () => void
}

export interface TableFiltersProps {
  config: TableFiltersConfig
  onFiltersChange?: (filters: Record<string, unknown>) => void
  onClearAllFilters?: () => void
  onBulkAction?: (actionKey: string, selectedItems: string[]) => void
  className?: string
  initialValues?: Record<string, unknown>
  availableColumns?: ColumnConfig[]
  totalRecords?: number
  selectedItems?: string[]
  hasSelection?: boolean
  selectedCount?: number
  onSelectionCancel?: () => void
  onSelectionFlag?: () => void
  onClearSelection?: () => void
  onColumnsChange?: (columns: ColumnConfig[]) => void
  managedColumns?: ColumnConfig[]
  currentPageSize?: number
  onPageSizeChange?: (pageSize: number) => void
  availablePageSizes?: number[]
  status?: string
}

// ================================
// COMPONENT PROPS
// ================================

export interface FilterButtonProps {
  filter: FilterConfig
  isActive: boolean
  isOpen: boolean
  displayValue: {
    label: string
    displayValue: string
  }
  onToggle: (open: boolean) => void
  onClear: () => void
  children: React.ReactNode
}

// ================================
// ENTITY TYPES
// ================================

export type EntityType =
  | "payments"
  | "orders"
  | "refunds"
  | "disputes"
  | "customers"
  | "terminals"
  | "merchants"
  | "members"
  | "programs"
  | "clearing"
  | "settlement"
  | "digital"

export type UserType = "default" | "merchant" | "bank" | "admin"
