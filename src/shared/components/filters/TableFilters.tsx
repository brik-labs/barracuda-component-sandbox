import { useState, memo } from "react"
import { Button } from "@shared/components/ui/button"
import { cn } from "@shared/lib/utils"
import type { TableFiltersProps, FilterConfig } from "@shared/types/filters"
import { useFilterManager } from "./hooks/useFilterManager"
import { useFilterDisplayHelpers } from "./hooks/useFilterDisplayHelpers"
import { FilterActionsMenu } from "./components/FilterActionsMenu"
import { SelectionActions } from "./components/SelectionActions"
import { FILTER_RENDERERS, renderGenericFilter } from "./components/FilterRenderers"
import { MoreFiltersButton } from "./components/MoreFiltersButton"

type DisplayMode = 'selection' | 'filters'

const getDisplayMode = (showSelectionActions: boolean): DisplayMode => {
  if (showSelectionActions) return 'selection'
  return 'filters'
}

const TableFilters = memo(function TableFilters({
  config,
  onFiltersChange,
  onClearAllFilters,
  className,
  initialValues = {},
  hasSelection = false,
  selectedCount = 0,
  onSelectionCancel,
  onSelectionFlag,
  onClearSelection,
  currentPageSize,
  onPageSizeChange,
  availablePageSizes,
}: TableFiltersProps) {
  const {
    filterValues,
    defaultVisibleFilters,
    activatedHiddenFilterConfigs,
    availableHiddenFilters,
    hasActiveFilters,
    handleFilterChange,
    clearFilter,
    clearAllFilters,
    activateHiddenFilter,
  } = useFilterManager({
    config,
    initialValues,
    onFiltersChange,
  })

  const { getFilterDisplayValue } = useFilterDisplayHelpers()
  const [openFilter, setOpenFilter] = useState<string | null>(null)

  const showSelectionActions = hasSelection && !!(onSelectionCancel && onSelectionFlag && onClearSelection)
  const displayMode = getDisplayMode(showSelectionActions)

  const renderFilter = (filter: FilterConfig) => {
    const value = filterValues[filter.key]
    const onChange = (newValue: unknown) => handleFilterChange(filter.key, newValue)

    const renderer = FILTER_RENDERERS[filter.key] ?? FILTER_RENDERERS[filter.type]
    if (renderer) return renderer(filter, value, onChange)

    return renderGenericFilter(
      filter,
      value,
      openFilter === filter.key,
      (open) => setOpenFilter(open ? filter.key : null),
      () => clearFilter(filter.key),
      getFilterDisplayValue(filter, value)
    )
  }

  const handleClearAllFilters = () => {
    clearAllFilters()
    onClearAllFilters?.()
  }

  if (!config?.filters?.length) return null

  const allFilters: FilterConfig[] = [
    ...(defaultVisibleFilters as FilterConfig[]),
    ...(activatedHiddenFilterConfigs as FilterConfig[]).sort((a, b) => a.label.localeCompare(b.label))
  ]

  const renderMainContent = () => {
    if (displayMode === 'selection') {
      return (
        <SelectionActions
          selectedCount={selectedCount}
          entityType={config.entityType}
          onCancel={onSelectionCancel!}
          onFlag={onSelectionFlag!}
          onExport={config.onExport}
          onUpdateStatus={config.onUpdateStatus}
          onUpdateCapabilities={config.onUpdateCapabilities}
          onClearSelection={onClearSelection!}
        />
      )
    }

    return (
      <div className="w-full flex items-center justify-between gap-4 select-none min-h-[48px] px-1">
        <div className="flex items-center gap-3 flex-wrap min-w-0 flex-1">
          {allFilters.map((filter) => (
            <div key={filter.key} className="flex-shrink-0">
              {renderFilter(filter)}
            </div>
          ))}

          <MoreFiltersButton
            availableHiddenFilters={availableHiddenFilters as FilterConfig[]}
            activatedHiddenFilterConfigs={activatedHiddenFilterConfigs as FilterConfig[]}
            onActivateHiddenFilter={activateHiddenFilter}
            clearFilter={clearFilter}
          />

          {hasActiveFilters && (
            <Button
              variant="link"
              onClick={handleClearAllFilters}
              className="px-0 text-sm font-medium text-primary hover:text-primary hover:bg-transparent whitespace-nowrap flex-shrink-0"
            >
              Clear filters
            </Button>
          )}
        </div>

        <div className="flex-shrink-0 ml-auto">
          <FilterActionsMenu
            currentPageSize={currentPageSize}
            onPageSizeChange={onPageSizeChange}
            availablePageSizes={availablePageSizes}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="min-h-[48px] flex items-center">
        {renderMainContent()}
      </div>
    </div>
  )
})

export { TableFilters }
