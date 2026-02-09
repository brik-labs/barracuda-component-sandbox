import { Button } from "@shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@shared/components/ui/dropdown-menu"
import { CirclePlus, Check } from "lucide-react"
import { cn } from "@shared/lib/utils"
import type { FilterConfig } from "@shared/types/filters"

interface MoreFiltersButtonProps {
  availableHiddenFilters: FilterConfig[]
  activatedHiddenFilterConfigs: FilterConfig[]
  onActivateHiddenFilter: (key: string) => void
  clearFilter: (key: string) => void
}

export function MoreFiltersButton({
  availableHiddenFilters,
  activatedHiddenFilterConfigs,
  onActivateHiddenFilter,
  clearFilter,
}: MoreFiltersButtonProps) {
  const sortedAvailableFilters = [...availableHiddenFilters].sort((a, b) =>
    a.label.localeCompare(b.label)
  )

  const sortedActivatedFilters = [...activatedHiddenFilterConfigs].sort((a, b) =>
    a.label.localeCompare(b.label)
  )

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "rounded-full text-xs font-normal leading-none transition-all duration-200 select-none h-6",
            "py-2 pl-2 pr-3 border-dashed border-teal-100 bg-background text-teal-300 hover:bg-muted/50"
          )}
        >
          <div className="flex items-center justify-center gap-1.5">
            <CirclePlus className="h-4 w-4" />
            <span className="truncate font-medium">More filters</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {sortedActivatedFilters.length === 0 && sortedAvailableFilters.length === 0 ? (
          <div className="p-3 text-xs text-muted-foreground text-center">
            No additional filters available
          </div>
        ) : (
          <>
            {sortedActivatedFilters.length > 0 && (
              <>
                <DropdownMenuLabel>
                  Active
                </DropdownMenuLabel>
                {sortedActivatedFilters.map((filter) => (
                  <DropdownMenuItem
                    key={filter.key}
                    onClick={() => clearFilter(filter.key)}
                  >
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    {filter.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </>
            )}
            {sortedAvailableFilters.length > 0 && (
              <>
                <DropdownMenuLabel>
                  Available
                </DropdownMenuLabel>
                {sortedAvailableFilters.map((filter) => (
                  <DropdownMenuItem
                    key={filter.key}
                    onClick={() => onActivateHiddenFilter(filter.key)}
                  >
                    {filter.label}
                  </DropdownMenuItem>
                ))}
              </>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
