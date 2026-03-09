import { ChevronUp, ChevronDown, X, type LucideIcon } from "lucide-react"
import { Button } from "@shared/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/components/ui/tooltip"
import { cn } from "@shared/lib/utils"
import { DETAIL_SPACING } from "./constants"

function NavigationButton({
  icon: Icon,
  onClick,
  disabled,
  ariaLabel,
  tooltip,
}: {
  icon: LucideIcon
  onClick?: () => void
  disabled?: boolean
  ariaLabel: string
  tooltip: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel}
          className="h-5 w-5 p-0 transition-all duration-150"
        >
          <Icon className="!h-3 !w-3" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}

interface NavigationHeaderProps {
  onBack?: () => void
  entityLabel?: string
  totalItems?: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
}

export function NavigationHeader({
  onBack,
  entityLabel = "item",
  totalItems = 0,
  navigatePrevious,
  navigateNext,
  canNavigatePrevious = false,
  canNavigateNext = false,
}: NavigationHeaderProps) {
  return (
    <div className={cn("flex items-center", DETAIL_SPACING.NAV_ITEM_GAP)}>
      <NavigationButton
        icon={X}
        onClick={onBack}
        ariaLabel="Close"
        tooltip="Close"
      />

      {totalItems > 1 && (
        <div className={cn("flex items-center", DETAIL_SPACING.NAV_ITEM_GAP)}>
          <NavigationButton
            icon={ChevronUp}
            onClick={navigatePrevious}
            disabled={!canNavigatePrevious || !navigatePrevious}
            ariaLabel={`Previous ${entityLabel}`}
            tooltip={`Previous ${entityLabel}`}
          />
          <NavigationButton
            icon={ChevronDown}
            onClick={navigateNext}
            disabled={!canNavigateNext || !navigateNext}
            ariaLabel={`Next ${entityLabel}`}
            tooltip={`Next ${entityLabel}`}
          />
        </div>
      )}
    </div>
  )
}
