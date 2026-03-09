import { useMemo, useCallback } from "react"

interface UseDataTableSelectionProps<T> {
  data: T[]
  selectedItems: string[]
  onSelectionChange?: (selectedIds: string[]) => void
  getItemId: (item: T) => string
}

export function useDataTableSelection<T>({
  data,
  selectedItems,
  onSelectionChange,
  getItemId,
}: UseDataTableSelectionProps<T>) {
  const currentPageIds = useMemo(
    () => data.map((item) => getItemId(item)),
    [data, getItemId]
  )

  const selectionState = useMemo(() => {
    if (currentPageIds.length === 0) {
      return { isAllSelected: false, isIndeterminate: false }
    }
    const selectedCount = currentPageIds.filter((id) =>
      selectedItems.includes(id)
    ).length
    return {
      isAllSelected: selectedCount === currentPageIds.length,
      isIndeterminate: selectedCount > 0 && selectedCount < currentPageIds.length,
    }
  }, [currentPageIds, selectedItems])

  const toggleItemSelection = useCallback(
    (itemId: string) => {
      if (!onSelectionChange) return
      const isSelected = selectedItems.includes(itemId)
      const next = isSelected
        ? selectedItems.filter((id) => id !== itemId)
        : [...selectedItems, itemId]
      onSelectionChange(next)
    },
    [selectedItems, onSelectionChange]
  )

  const toggleAllSelection = useCallback(() => {
    if (!onSelectionChange) return
    const next = selectionState.isAllSelected
      ? selectedItems.filter((id) => !currentPageIds.includes(id))
      : Array.from(new Set([...selectedItems, ...currentPageIds]))
    onSelectionChange(next)
  }, [selectionState.isAllSelected, currentPageIds, selectedItems, onSelectionChange])

  return { toggleItemSelection, toggleAllSelection, selectionState }
}
