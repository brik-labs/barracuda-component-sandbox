import type { ReactNode } from "react"
import { cn } from "@shared/lib/utils"
import { EntityStatusPanel } from "./EntityStatusPanel"
import type { StatusPanelConfig, DetailNavigationProps } from "@shared/types/detail-view"

interface EntityDetailPageProps<T> extends DetailNavigationProps {
  entity: T
  config: StatusPanelConfig<T>
  status?: string
  statusVariant?: "default" | "success" | "warning" | "danger" | "secondary"
  statusClassName?: string
  metadata?: ReactNode
  actions?: ReactNode
  children: ReactNode
  loading?: boolean
  className?: string
}

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
    <div
      className={cn(
        "space-y-8",
        loading && "opacity-75",
        className
      )}
    >
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
  )
}
