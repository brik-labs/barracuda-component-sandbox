import { Button } from "@shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@shared/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

interface FilterActionsMenuProps {
  onExportOpen?: (open: boolean) => void
  onColumnOpen?: (open: boolean) => void
  currentPageSize?: number
  onPageSizeChange?: (pageSize: number) => void
  availablePageSizes?: number[]
}

export function FilterActionsMenu({
  onExportOpen,
  onColumnOpen,
  currentPageSize = 20,
  onPageSizeChange,
  availablePageSizes = [20, 30, 40, 50],
}: FilterActionsMenuProps) {

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 rounded-full hover:bg-accent/50"
          aria-label="Filter actions menu"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">

        {onExportOpen && (
          <DropdownMenuItem onClick={() => onExportOpen(true)}>
            Export Data
          </DropdownMenuItem>
        )}

        {onColumnOpen && (
          <DropdownMenuItem onClick={() => onColumnOpen(true)}>
            Manage Columns
          </DropdownMenuItem>
        )}

        {onPageSizeChange && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              Page Size ({currentPageSize})
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {availablePageSizes.map((pageSize) => {
                const isSelected = currentPageSize === pageSize

                return (
                  <DropdownMenuItem
                    key={pageSize}
                    onClick={() => onPageSizeChange(pageSize)}
                    className={isSelected ? "bg-accent" : ""}
                  >
                    <span>{pageSize} rows</span>
                    {isSelected && (
                      <span className="ml-auto text-primary">✓</span>
                    )}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
