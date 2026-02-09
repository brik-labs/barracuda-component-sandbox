import { useCallback } from "react"
import { FilterButton } from "@shared/components/filters/base/FilterButton"
import { DateFilterContent } from "./DateFilterContent"
import { DateFilterSelectContent } from "./DateFilterSelectContent"
import { DATE_PRESET_OPTIONS } from "./datePresets"
import { getDisplayLabel } from "@shared/utils/dateFilterUtils"
import { useFilterToggle } from "../../hooks/useFilterToggle"
import type { DateFilterValue } from "@shared/types/dateFilter"
import type { FilterConfig } from "@shared/types/filters"
import { isFilterActive } from "@shared/utils"

export { DATE_PRESET_OPTIONS } from "./datePresets"
export type { DatePresetValue } from "./datePresets"

interface DateFilterBaseProps {
  label?: string
}

interface DateFilterFullProps extends DateFilterBaseProps {
  mode?: 'full'
  value?: DateFilterValue | null
  onChange: (value: DateFilterValue | null) => void
}

interface DateFilterSelectProps extends DateFilterBaseProps {
  mode: 'select'
  value?: string | null
  onChange: (value: string | null) => void
}

type DateFilterProps = DateFilterFullProps | DateFilterSelectProps

const dateFilterConfig: FilterConfig = {
  key: "date",
  label: "Date",
  type: "dateFilter",
}

const selectFilterConfig: FilterConfig = {
  key: "date",
  label: "Date",
  type: "select",
}

export function DateFilter(props: DateFilterProps) {
  const { label = "Date", mode = 'full' } = props
  const { isOpen, setIsOpen, close } = useFilterToggle()

  const handleClear = useCallback(() => {
    if (mode === 'select') {
      (props as DateFilterSelectProps).onChange(null)
    } else {
      (props as DateFilterFullProps).onChange(null)
    }
  }, [props, mode])

  if (mode === 'select') {
    const selectProps = props as DateFilterSelectProps
    const config = { ...selectFilterConfig, label }
    const isActive = !!selectProps.value
    const selectedOption = DATE_PRESET_OPTIONS.find(opt => opt.value === selectProps.value)
    const displayInfo = {
      label,
      displayValue: selectedOption?.label || '',
    }

    return (
      <div className="relative select-none">
        <FilterButton
          filter={config}
          isActive={isActive}
          isOpen={isOpen}
          displayValue={displayInfo}
          onToggle={setIsOpen}
          onClear={handleClear}
        >
          <DateFilterSelectContent
            value={selectProps.value}
            onChange={selectProps.onChange}
            onClose={close}
          />
        </FilterButton>
      </div>
    )
  }

  // Full mode (default)
  const fullProps = props as DateFilterFullProps
  const config = { ...dateFilterConfig, label }
  const isActive = isFilterActive(fullProps.value, config.type)
  const displayInfo = getDisplayLabel(fullProps.value, config.label)

  const filterProps = {
    filter: config,
    isActive,
    isOpen,
    displayValue: displayInfo,
    onToggle: setIsOpen,
    onClear: handleClear,
  }

  return (
    <div className="relative select-none">
      <FilterButton {...filterProps}>
        <DateFilterContent
          label={label}
          value={fullProps.value}
          onChange={fullProps.onChange}
          onClose={close}
        />
      </FilterButton>
    </div>
  )
}
