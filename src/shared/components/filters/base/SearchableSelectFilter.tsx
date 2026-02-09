import { Button } from "@shared/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@shared/lib/utils"
import { FilterButton } from "./FilterButton"
import { useSearchableFilter } from "../hooks/useSearchableFilter"
import type { FilterConfig } from "@shared/types/filters"

interface FilterOption {
  value: string
  label: string
}

interface SearchableSelectFilterProps<T extends FilterOption> {
  options: readonly T[]
  value?: string | null
  onChange?: (value: string | null) => void
  filterConfig: FilterConfig
  searchPlaceholder?: string
  className?: string
  searchFields?: (keyof T)[]
}

export function SearchableSelectFilter<T extends FilterOption>({
  options,
  value,
  onChange,
  filterConfig,
  searchPlaceholder = "Search options...",
  className,
  searchFields = ["label", "value"] as (keyof T)[],
}: SearchableSelectFilterProps<T>) {
  const { label = "Filter" } = filterConfig
  const {
    isOpen,
    selectedOption,
    searchQuery,
    filteredOptions,
    setIsOpen,
    setSearchQuery,
    handleOptionSelect,
    handleApply,
    handleClear,
    isActive,
    displayValue,
  } = useSearchableFilter({
    options,
    value,
    onChange,
    searchFields,
    filterLabel: label,
  })

  return (
    <div className={cn("relative select-none", className)}>
      <FilterButton
        filter={{ ...filterConfig, label }}
        isActive={isActive}
        isOpen={isOpen}
        displayValue={displayValue}
        onToggle={setIsOpen}
        onClear={handleClear}
      >
        <div className="p-3 space-y-3 select-none">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{label}</span>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full px-3 py-2 border border-input rounded-lg text-sm bg-background select-text h-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={`Search ${label || "options"}`}
              autoFocus
            />
          </div>

          <div className="overflow-y-auto max-h-40">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "flex items-center cursor-pointer text-sm px-3 py-2 hover:bg-accent/50 transition-colors",
                    selectedOption?.value === option.value && "bg-primary/10 hover:bg-primary/15"
                  )}
                  onClick={() => handleOptionSelect(option.value)}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium truncate">{option.label}</span>
                  </div>
                  {selectedOption?.value === option.value && (
                    <Check className="h-3 w-3 text-primary shrink-0" />
                  )}
                </div>
              ))
            ) : (
              <div className="text-sm px-3 py-2 text-muted-foreground">
                No results found
              </div>
            )}
          </div>

          <div className="border-t border-border pt-2">
            <Button
              onClick={handleApply}
              disabled={!selectedOption}
              className="w-full h-8"
              size="sm"
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
