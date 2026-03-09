import { cva } from "class-variance-authority"
import { Z_INDEX_CLASSES } from "@shared/lib/z-index"

const STICKY_BASE = `sticky ${Z_INDEX_CLASSES.TABLE_STICKY} bg-component group-hover:bg-inherit group-data-[state=selected]:bg-inherit group-data-[active=true]:bg-inherit right-0 text-center w-12 min-w-12 max-w-12 px-1 transition-colors duration-200`

const SHADOW_CLASS =
  "drop-shadow-[-4px_0_8px_rgba(11,59,69,0.08)] dark:drop-shadow-[-4px_0_8px_rgba(0,0,0,0.2)]"

const shadowVariants = {
  variants: {
    showRightShadow: {
      true: SHADOW_CLASS,
      false: "",
    },
  },
  defaultVariants: {
    showRightShadow: false as const,
  },
}

export const stickyColumnVariants = cva(STICKY_BASE, shadowVariants)
