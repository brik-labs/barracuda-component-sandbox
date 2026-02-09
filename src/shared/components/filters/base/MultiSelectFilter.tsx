import { Button } from "@shared/components/ui/button"
import { Checkbox } from "@shared/components/ui/checkbox"
import { Label } from "@shared/components/ui/label"
import { cn } from "@shared/lib/utils"
import { FilterButton } from "./FilterButton"
import { useMultiSelectFilter } from "../hooks/useMultiSelectFilter"
import type { FilterConfig } from "@shared/types/filters"

interface FilterOption {
  value: string
  label: string
}

interface MultiSelectFilterProps<T extends FilterOption> {
  options: readonly T[]
  value?: string[]
  onChange?: (value: string[] | null) => void
  filterConfig: FilterConfig
  maxHeight?: string
  className?: string
}

export function MultiSelectFilter<T extends FilterOption>({
  options = [],
  value = [],
  onChange,
  filterConfig,
  maxHeight,
  className,
}: MultiSelectFilterProps<T>) {

  const {
    isOpen,
    selectedOptions,
    setIsOpen,
    handleOptionToggle,
    handleApply,
    handleClear,
    isActive,
    displayValue,
  } = useMultiSelectFilter({
    options,
    value,
    onChange,
    filterLabel: filterConfig.label,
  })

  return (
    <div className={cn("relative select-none", className)}>
      <FilterButton
        filter={filterConfig}
        isActive={isActive}
        isOpen={isOpen}
        displayValue={displayValue}
        onToggle={setIsOpen}
        onClear={handleClear}
      >
        <div className="p-3 space-y-3 min-w-[220px] select-none">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{filterConfig.label}</span>
          </div>

          <div className={cn("space-y-1 overflow-y-auto", maxHeight || "max-h-40")}>
            {options.length > 0 ? (
              options.map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`${filterConfig.key}-${option.value}`}
                  className="flex items-center space-x-2 py-1.5 px-2 rounded-md cursor-pointer hover:bg-accent/50 transition-colors"
                >
                  <Checkbox
                    id={`${filterConfig.key}-${option.value}`}
                    checked={selectedOptions.includes(option.value)}
                    onCheckedChange={() => handleOptionToggle(option.value)}
                  />
                  <span className="text-sm font-normal flex-1 text-foreground leading-none">
                    {option.label}
                  </span>
                </Label>
              ))
            ) : (
              <div className="text-sm py-4 text-center text-muted-foreground">
                No results found
              </div>
            )}
          </div>

          <div className="border-t border-border pt-2">
            <Button
              onClick={handleApply}
              size="sm"
              className="w-full h-8"
              disabled={selectedOptions.length === 0}
              aria-label="Apply filter"
            >
              Apply
            </Button>
          </div>
        </div>
      </FilterButton>
    </div>
  )
}
