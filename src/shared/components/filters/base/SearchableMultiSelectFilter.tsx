import React, { useState, useCallback, useEffect, useRef } from "react"
import { Input } from "@shared/components/ui/input"
import { Button } from "@shared/components/ui/button"
import { Label } from "@shared/components/ui/label"
import { Search } from "lucide-react"
import { Checkbox } from "@shared/components/ui/checkbox"
import { FilterButton } from "./FilterButton"
import { useFilterToggle } from "../hooks/useFilterToggle"
import type { FilterConfig } from "@shared/types/filters"

export interface SearchableMultiSelectOption {
  value: string
  label: string
  [key: string]: any
}

export interface SearchableMultiSelectFilterProps<T extends SearchableMultiSelectOption> {
  value?: string[]
  onChange?: (value: string[] | null) => void
  options: T[]
  searchFields: (keyof T)[]
  displayTitle: string
  searchPlaceholder: string
  filterKey: string
  filterLabel: string
  className?: string
  renderOption?: (option: T) => React.ReactNode
  getOptionValue?: (option: T) => string
}

const SearchableMultiSelectFilter = <T extends SearchableMultiSelectOption>({
  value = [],
  onChange,
  options,
  searchFields,
  displayTitle,
  searchPlaceholder,
  filterKey,
  filterLabel,
  className,
  renderOption,
  getOptionValue = (option) => option.value,
}: SearchableMultiSelectFilterProps<T>) => {
  const { isOpen, setIsOpen, close } = useFilterToggle()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value)
  const previousValueRef = useRef<string[]>(value)

  useEffect(() => {
    const valueString = JSON.stringify(value)
    const previousValueString = JSON.stringify(previousValueRef.current)

    if (valueString !== previousValueString) {
      setSelectedOptions(value)
      previousValueRef.current = value
    }
  }, [value])

  const filteredOptions = options.filter(option => {
    const query = searchQuery.toLowerCase()
    return searchFields.some(field => {
      const fieldValue = option[field]
      return typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(query)
    })
  })

  const handleOptionToggle = useCallback((optionValue: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionValue)
        ? prev.filter(id => id !== optionValue)
        : [...prev, optionValue]
    )
  }, [])

  const handleApply = useCallback(() => {
    onChange?.(selectedOptions.length > 0 ? selectedOptions : null)
    close()
  }, [selectedOptions, onChange, close])

  const handleClear = useCallback(() => {
    setSelectedOptions([])
    onChange?.(null)
  }, [onChange])

  const filterConfig: FilterConfig = {
    key: filterKey,
    label: filterLabel,
    type: "multiSelect",
  }

  const isActive = selectedOptions.length > 0
  const displayValue = {
    label: filterLabel,
    displayValue: selectedOptions.length > 0
      ? `${selectedOptions.length} selected`
      : "",
  }

  const defaultRenderOption = (option: T) => (
    <div className="flex-1 min-w-0">
      <div className="text-sm font-medium truncate">{option.label}</div>
    </div>
  )

  return (
    <div className={className}>
      <FilterButton
        filter={filterConfig}
        isActive={isActive}
        isOpen={isOpen}
        displayValue={displayValue}
        onToggle={setIsOpen}
        onClear={handleClear}
      >
        <div className="p-3 space-y-3 min-w-[300px] select-none">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {displayTitle}
            </span>
          </div>

          <div className="relative mb-3">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-8 h-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-1 overflow-y-auto max-h-40">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const optionValue = getOptionValue(option)
                return (
                  <Label
                    key={optionValue}
                    htmlFor={`${filterKey}-${optionValue}`}
                    className="flex items-center space-x-2 py-1.5 px-2 rounded-md cursor-pointer hover:bg-accent/50 transition-colors"
                  >
                    <Checkbox
                      id={`${filterKey}-${optionValue}`}
                      checked={selectedOptions.includes(optionValue)}
                      onCheckedChange={() => handleOptionToggle(optionValue)}
                    />
                    {renderOption ? renderOption(option) : defaultRenderOption(option)}
                  </Label>
                )
              })
            ) : (
              <div className="text-sm py-4 text-center text-muted-foreground">
                {searchQuery ? `No ${filterLabel.toLowerCase()} found` : `No ${filterLabel.toLowerCase()} available`}
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
              Apply ({selectedOptions.length})
            </Button>
          </div>
        </div>
      </FilterButton>
    </div>
  )
}

export default React.memo(SearchableMultiSelectFilter) as <T extends SearchableMultiSelectOption>(
  props: SearchableMultiSelectFilterProps<T>
) => React.ReactElement
