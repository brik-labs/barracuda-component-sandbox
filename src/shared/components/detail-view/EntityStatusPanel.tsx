import { useMemo, memo, type ReactNode } from "react"
import { cn } from "@shared/lib/utils"
import { Badge } from "@shared/components/ui/badge"
import { NavigationHeader } from "./NavigationHeader"
import type { StatusPanelConfig, DetailNavigationProps } from "@shared/types/detail-view"

interface EntityStatusPanelProps<T> extends DetailNavigationProps {
  entity: T
  config: StatusPanelConfig<T>
  /** Status string displayed as a badge next to the entity name */
  status?: string
  /** Badge variant for the status */
  statusVariant?: "default" | "success" | "warning" | "danger" | "secondary"
  /** CSS class for the status bar background (legacy — prefer statusVariant) */
  statusClassName?: string
  /** Metadata rendered inline after secondary value */
  metadata?: ReactNode
  /** Actions rendered in the top-right (dropdown, edit button, etc.) */
  actions?: ReactNode
}

function EntityStatusPanelComponent<T>({
  entity,
  config,
  status,
  statusVariant = "default",
  statusClassName,
  metadata,
  actions,
  onBack,
  totalItems = 0,
  navigatePrevious,
  navigateNext,
  canNavigatePrevious,
  canNavigateNext,
}: EntityStatusPanelProps<T>) {
  const primaryValue = useMemo(() => {
    const fieldValue = entity[config.primaryField]
    return config.primaryFieldFormatter
      ? config.primaryFieldFormatter(fieldValue)
      : String(fieldValue ?? "N/A")
  }, [entity, config.primaryField, config.primaryFieldFormatter])

  const secondaryValue = useMemo(() => {
    if (!config.secondaryField) return null
    const fieldValue = entity[config.secondaryField]
    return config.secondaryFieldFormatter
      ? config.secondaryFieldFormatter(fieldValue)
      : String(fieldValue ?? "")
  }, [entity, config.secondaryField, config.secondaryFieldFormatter])

  return (
    <div className="bg-card rounded-xl border overflow-hidden shadow-sm mb-2">
      {/* Row 1: Navigation + entity label + actions */}
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-3">
          <NavigationHeader
            onBack={onBack}
            entityLabel={config.entityLabel}
            totalItems={totalItems}
            navigatePrevious={navigatePrevious}
            navigateNext={navigateNext}
            canNavigatePrevious={canNavigatePrevious}
            canNavigateNext={canNavigateNext}
          />
          <p className="text-xs text-teal-300 tracking-wide font-medium font-mono">
            {config.entityLabel}
          </p>
        </div>

        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* Row 2: Entity name + status badge + secondary + metadata */}
      <div className="px-5 pb-4">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight leading-tight">
            {primaryValue}
          </h1>
          {status && (
            statusClassName ? (
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                  statusClassName
                )}
              >
                {status}
              </span>
            ) : (
              <Badge variant={statusVariant}>{status}</Badge>
            )
          )}
        </div>

        {(secondaryValue || metadata) && (
          <div className="flex items-center gap-4 mt-1.5 text-sm text-muted-foreground">
            {secondaryValue && (
              <span>
                <span className="text-teal-300">on </span>
                <span className="text-primary">{secondaryValue}</span>
              </span>
            )}
            {metadata}
          </div>
        )}
      </div>
    </div>
  )
}

export const EntityStatusPanel = memo(
  EntityStatusPanelComponent
) as typeof EntityStatusPanelComponent
