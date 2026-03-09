import type { ReactNode } from "react"
import { cn } from "@shared/lib/utils"
import { EntityStatusPanel } from "./EntityStatusPanel"
import { DETAIL_SPACING } from "./constants"
import type { StatusPanelConfig, DetailNavigationProps } from "@shared/types/detail-view"

interface EntityDetailPageProps<T> extends DetailNavigationProps {
  entity: T
  config: StatusPanelConfig<T>
  /** Status label displayed as a badge next to the entity name */
  status?: string
  /** Badge variant for the status */
  statusVariant?: "default" | "success" | "warning" | "danger" | "secondary"
  /** CSS class for a custom status badge (legacy — prefer statusVariant) */
  statusClassName?: string
  /** Metadata rendered inline after secondary value */
  metadata?: ReactNode
  /** Action buttons for the header */
  actions?: ReactNode
  /** Section content */
  children: ReactNode
  /** Loading overlay */
  loading?: boolean
  className?: string
}

/**
 * Full-page detail view shell.
 * Composes EntityStatusPanel + section content slots.
 */
export function EntityDetailPage<T>({
  entity,
  config,
  status,
  statusVariant,
  statusClassName,
  metadata,
  actions,
  children,
  loading = false,
  className,
  ...navigationProps
}: EntityDetailPageProps<T>) {
  return (
    <div className={cn("min-h-screen", className)}>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div
            className={cn(
              "transition-opacity duration-200",
              loading ? "opacity-75" : "opacity-100"
            )}
          >
            <div className={`space-y-8 ${DETAIL_SPACING.CARD_CONTENT_PADDING}`}>
              <EntityStatusPanel
                entity={entity}
                config={config}
                status={status}
                statusVariant={statusVariant}
                statusClassName={statusClassName}
                metadata={metadata}
                actions={actions}
                {...navigationProps}
              />
              <div className="space-y-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
