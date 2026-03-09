import { useEffect } from "react"

export function useScrollToActiveRow(activeItemId?: string) {
  useEffect(() => {
    if (!activeItemId) return

    const timeout = setTimeout(() => {
      const activeRow = document.querySelector(`[data-row-id="${activeItemId}"]`)
      if (!activeRow) return

      const scrollContainer = activeRow.closest(
        ".overflow-auto, .overflow-y-auto, .overflow-x-auto"
      ) as HTMLElement
      if (!scrollContainer) return

      const containerRect = scrollContainer.getBoundingClientRect()
      const rowRect = activeRow.getBoundingClientRect()

      const isVisible =
        rowRect.top >= containerRect.top + 80 &&
        rowRect.bottom <= containerRect.bottom - 80

      if (!isVisible) {
        const relativeTop = rowRect.top - containerRect.top
        const targetY =
          scrollContainer.scrollTop +
          relativeTop -
          containerRect.height / 2 +
          rowRect.height / 2
        scrollContainer.scrollTo({ top: targetY, behavior: "smooth" })
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [activeItemId])
}
