import { useLayoutEffect, useState, useCallback, type RefObject, useRef } from "react"

export function useTableScroll(scrollRef: RefObject<HTMLElement | null>): { showRightShadow: boolean } {
  const [showRightShadow, setShowRightShadow] = useState(false)
  const rafId = useRef<number | null>(null)

  const updateShadow = useCallback(() => {
    const container = scrollRef.current
    if (!container) {
      setShowRightShadow(false)
      return
    }

    const { scrollWidth, clientWidth, scrollLeft } = container

    if (scrollWidth <= clientWidth) {
      setShowRightShadow(false)
      return
    }

    const maxScroll = scrollWidth - clientWidth
    const isAtEnd = scrollLeft >= maxScroll - 4
    setShowRightShadow(!isAtEnd)
  }, [scrollRef])

  const handleScroll = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(updateShadow)
  }, [updateShadow])

  useLayoutEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver(updateShadow)
    resizeObserver.observe(container)
    container.addEventListener("scroll", handleScroll, { passive: true })

    updateShadow()

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      resizeObserver.disconnect()
      container.removeEventListener("scroll", handleScroll)
    }
  }, [scrollRef, handleScroll, updateShadow])

  return { showRightShadow }
}
