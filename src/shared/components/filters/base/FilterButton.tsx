import React, { useCallback } from "react"
import { X, CirclePlus } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/components/ui/popover"
import { Button } from "@shared/components/ui/button"
import { cn } from "@shared/lib/utils"
import { Z_INDEX_CLASSES } from "@shared/lib/z-index"
import type { FilterButtonProps } from "@shared/types/filters"

function FilterButtonImpl({
  filter,
  isActive,
  isOpen,
  displayValue,
  onToggle,
  onClear,
  children,
}: FilterButtonProps) {
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onClear()
  }, [onClear])

  const handlePopoverOpenChange = (open: boolean) => onToggle(open)

  return (
    <Popover open={isOpen} onOpenChange={handlePopoverOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant={isActive ? "secondary" : "outline"}
          className={cn(
            "rounded-full text-xs font-normal leading-none transition-all duration-200 select-none h-6",
            isActive
              ? "pl-1 pr-2 border border-primary/40 bg-primary/5 text-primary hover:bg-primary/15"
              : "py-2 pl-2 pr-3 border-dashed border-teal-100 bg-background text-teal-300 hover:bg-muted/50"
          )}
        >
          <div className="flex items-center gap-1.5">
            {isActive ? (
              <>
                <div
                  onClick={handleClear}
                  className="h-3.5 w-3.5 rounded-full flex items-center justify-center group cursor-pointer hover:bg-destructive/10 transition-colors"
                >
                  <X className="h-2 w-2 text-muted-foreground group-hover:text-destructive transition-colors" />
                </div>
                <div className="flex items-center truncate">
                  <span className="text-foreground font-semibold">{displayValue.label}</span>
                  <span className="mx-1 text-border">|</span>
                  <span className="font-semibold text-primary">{displayValue.displayValue}</span>
                </div>
              </>
            ) : (
              <>
                <CirclePlus className="h-4 w-4" />
                <span className="truncate font-medium">{filter.label}</span>
              </>
            )}
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn("p-0 shadow-lg border bg-popover rounded-md w-auto select-none", Z_INDEX_CLASSES.MODAL_POPOVER)}
        align="start"
        sideOffset={4}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}

export const FilterButton = React.memo(FilterButtonImpl)
