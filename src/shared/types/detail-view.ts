/**
 * A single label-value detail item for display in detail sections.
 */
export interface DetailItem {
  label: string
  value: string
  showBadge?: boolean
  badgeVariant?: "default" | "secondary" | "destructive" | "outline" | "success"
  isCopyable?: boolean
}

/**
 * Configuration for an action button in a section header.
 */
export interface SectionAction {
  label: string
  onClick: () => void
}

/**
 * Configuration for the entity status panel header.
 */
export interface StatusPanelConfig<T> {
  entityLabel: string
  primaryField: keyof T
  primaryFieldFormatter?: (value: T[keyof T]) => string
  secondaryField?: keyof T
  secondaryFieldFormatter?: (value: T[keyof T]) => string
}

/**
 * Navigation props passed to detail pages for prev/next browsing.
 */
export interface DetailNavigationProps {
  onBack?: () => void
  totalItems?: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
}

/**
 * Configuration for a detail page section.
 */
export interface SectionConfig {
  key: string
  title: string
  editMode?: "sheet" | "inline" | "none"
  component: React.ComponentType<any>
  props?: Record<string, any>
}
