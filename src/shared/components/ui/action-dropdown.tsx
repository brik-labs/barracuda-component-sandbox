import { Button } from "@shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu"
import { cn } from "@shared/lib/utils"
import { MoreHorizontal } from "lucide-react"
import type { TableAction, TableActionGroup } from "@shared/types/data-table"

interface ActionDropdownProps<T> {
  actions: TableAction<T>[] | TableActionGroup<T>[]
  item: T
  triggerClassName?: string
  variant?: "ghost" | "outline"
}

function isGroupedActions<T>(
  actions: TableAction<T>[] | TableActionGroup<T>[]
): actions is TableActionGroup<T>[] {
  return actions.length > 0 && "label" in actions[0] && "actions" in actions[0]
}

export function ActionDropdown<T>({
  actions,
  item,
  triggerClassName,
  variant = "ghost",
}: ActionDropdownProps<T>) {
  if (!actions.length) return null

  const filterAction = (action: TableAction<T>): boolean => {
    if (action.condition && !action.condition(item)) return false
    if (typeof action.disabled === "function") {
      if (action.disabled(item)) return false
    } else if (action.disabled === true) {
      return false
    }
    return true
  }

  const renderAction = (action: TableAction<T>) => {
    if (!filterAction(action)) return null
    return (
      <DropdownMenuItem
        key={action.key}
        onClick={() => action.onClick(item)}
        className={cn(
          action.variant === "destructive" &&
            "text-red-600 hover:text-red-600 focus:text-red-600"
        )}
      >
        {action.label}
      </DropdownMenuItem>
    )
  }

  const grouped = isGroupedActions(actions)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === "outline" ? (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 p-0 border border-input bg-background rounded-full shadow-sm hover:bg-accent",
              "focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
              triggerClassName
            )}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-7 w-7 rounded-lg border border-transparent transition-all duration-200",
              "hover:bg-card hover:border-sidebar-border hover:shadow-sm",
              "data-[state=open]:bg-card data-[state=open]:border-sidebar-border data-[state=open]:shadow-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              triggerClassName
            )}
          >
            <MoreHorizontal className="h-2.5 w-2.5" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {grouped
          ? actions.map((group) => (
              <div key={group.label}>
                <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                {group.actions.map(renderAction)}
              </div>
            ))
          : actions.map(renderAction)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
