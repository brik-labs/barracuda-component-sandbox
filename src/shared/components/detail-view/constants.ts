/**
 * Centralized spacing constants for detail view components.
 */
export const DETAIL_SPACING = {
  SECTION_CONTENT_GAP: "gap-3",
  SECTION_BOTTOM_MARGIN: "mb-2",
  DETAIL_ROW_PADDING: "py-[5px]",
  FLEX_GAP_SMALL: "gap-1",
  FLEX_GAP_MEDIUM: "gap-2",
  FLEX_GAP_LARGE: "gap-4",
  CARD_CONTENT_PADDING: "p-6",
  SECTION_SEPARATOR_HEIGHT: "h-2",
  NAV_ITEM_GAP: "gap-2",
} as const

/**
 * Centralized text styles for detail view components.
 */
export const DETAIL_TEXT = {
  sectionTitle: "text-base font-semibold text-card-foreground leading-6",
  subsectionTitle: "text-sm font-medium text-foreground leading-5",
  label: "text-muted-foreground text-sm leading-5",
  value: "text-foreground text-sm leading-5",
  largeValue: "text-base text-foreground",
  mutedValue: "text-muted-foreground text-xs opacity-70",
  description: "text-sm text-muted-foreground",
  link: "text-xs text-primary hover:underline cursor-pointer",
} as const
