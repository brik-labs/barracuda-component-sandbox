import * as React from "react"

import { cn } from "@shared/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-[10px] border border-input/50 bg-transparent px-3 py-2 text-base placeholder:text-muted-foreground placeholder:opacity-60 placeholder:font-light focus:outline-none focus:border-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
