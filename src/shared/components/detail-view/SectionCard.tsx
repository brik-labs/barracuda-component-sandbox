import React from "react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu"
import { cn } from "@shared/lib/utils"
import { DETAIL_TEXT } from "./constants"
import type { SectionAction } from "@shared/types/detail-view"

interface SectionCardProps {
  title: string
  children: React.ReactNode
  actions?: SectionAction[]
  className?: string
  /** Two-column layout: title on left, content on right */
  isDetailView?: boolean
}

/**
 * A card wrapper for detail page sections.
 * Supports both compact (panel) and detail-view (two-column) layouts.
 */
export const SectionCard = React.memo<SectionCardProps>(
  ({ title, children, actions, className, isDetailView = false }) => {
    const renderActions = () => {
      if (!actions || actions.length === 0) return null

      if (actions.length === 1) {
        return (
          <Button
            variant="outline"
            className="h-7 px-2.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200"
            onClick={actions[0].onClick}
          >
            {actions[0].label}
          </Button>
        )
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-muted"
            >
              <MoreHorizontal className="h-2.5 w-2.5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {actions.map((action, index) => (
              <DropdownMenuItem
                key={`action-${index}`}
                onClick={action.onClick}
                className="cursor-pointer"
              >
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    if (isDetailView) {
      return (
        <div
          className={cn(
            "bg-white dark:bg-card rounded-xl border overflow-hidden mb-2 shadow-sm",
            className
          )}
        >
          <div className="flex items-center justify-between px-5 py-3">
            <div className={DETAIL_TEXT.sectionTitle}>{title}</div>
            {renderActions()}
          </div>
          <div className="px-5 pb-4">{children}</div>
        </div>
      )
    }

    return (
      <div
        className={cn(
          "bg-white dark:bg-card rounded-xl border overflow-hidden mb-2 shadow-sm",
          className
        )}
      >
        <div className="flex items-center justify-between px-5 py-3 relative">
          <div className={DETAIL_TEXT.sectionTitle}>{title}</div>
          {renderActions()}
        </div>
        <div className="px-5 pb-4">{children}</div>
      </div>
    )
  }
)

SectionCard.displayName = "SectionCard"
