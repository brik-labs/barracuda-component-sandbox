// ============================================================
// @vinr/components — Root barrel export (Vinr-prefixed public API)
// ============================================================
// Internal module barrels keep unprefixed names for library-internal use.
// This root barrel re-exports everything with the Vinr prefix for consumers.
// ============================================================

// =========================
// UI Primitives
// =========================
export { ActionDropdown as VinrActionDropdown } from "./components/ui/action-dropdown"

export {
  Badge as VinrBadge,
  badgeVariants as vinrBadgeVariants,
  type BadgeProps as VinrBadgeProps,
} from "./components/ui/badge"

export {
  Button as VinrButton,
  buttonVariants as vinrButtonVariants,
  type ButtonProps as VinrButtonProps,
} from "./components/ui/button"

export {
  Calendar as VinrCalendar,
  type CalendarProps as VinrCalendarProps,
} from "./components/ui/calendar"

export {
  Card as VinrCard,
  CardHeader as VinrCardHeader,
  CardFooter as VinrCardFooter,
  CardTitle as VinrCardTitle,
  CardDescription as VinrCardDescription,
  CardContent as VinrCardContent,
} from "./components/ui/card"

export {
  Checkbox as VinrCheckbox,
  type CheckboxProps as VinrCheckboxProps,
} from "./components/ui/checkbox"

export {
  DatePicker as VinrDatePicker,
  DateRangePicker as VinrDateRangePicker,
} from "./components/ui/date-picker"

export {
  Dialog as VinrDialog,
  DialogPortal as VinrDialogPortal,
  DialogOverlay as VinrDialogOverlay,
  DialogClose as VinrDialogClose,
  DialogTrigger as VinrDialogTrigger,
  DialogContent as VinrDialogContent,
  DialogHeader as VinrDialogHeader,
  DialogFooter as VinrDialogFooter,
  DialogTitle as VinrDialogTitle,
  DialogDescription as VinrDialogDescription,
} from "./components/ui/dialog"

export {
  DropdownMenu as VinrDropdownMenu,
  DropdownMenuTrigger as VinrDropdownMenuTrigger,
  DropdownMenuContent as VinrDropdownMenuContent,
  DropdownMenuItem as VinrDropdownMenuItem,
  DropdownMenuLabel as VinrDropdownMenuLabel,
  DropdownMenuSeparator as VinrDropdownMenuSeparator,
  DropdownMenuSub as VinrDropdownMenuSub,
  DropdownMenuSubContent as VinrDropdownMenuSubContent,
  DropdownMenuSubTrigger as VinrDropdownMenuSubTrigger,
} from "./components/ui/dropdown-menu"

export { Input as VinrInput } from "./components/ui/input"
export { Label as VinrLabel } from "./components/ui/label"

export {
  MultiSelect as VinrMultiSelect,
  MultiSelectButton as VinrMultiSelectButton,
  useMultiSelect as useVinrMultiSelect,
  type MultiSelectConfigOption as VinrMultiSelectConfigOption,
} from "./components/ui/multi-select"

export {
  Popover as VinrPopover,
  PopoverTrigger as VinrPopoverTrigger,
  PopoverContent as VinrPopoverContent,
} from "./components/ui/popover"

export { Progress as VinrProgress } from "./components/ui/progress"

export {
  Select as VinrSelect,
  SelectGroup as VinrSelectGroup,
  SelectValue as VinrSelectValue,
  SelectTrigger as VinrSelectTrigger,
  SelectContent as VinrSelectContent,
  SelectLabel as VinrSelectLabel,
  SelectItem as VinrSelectItem,
  SelectCheckboxItem as VinrSelectCheckboxItem,
  SelectSeparator as VinrSelectSeparator,
  SelectScrollUpButton as VinrSelectScrollUpButton,
  SelectScrollDownButton as VinrSelectScrollDownButton,
} from "./components/ui/select"

export { Separator as VinrSeparator } from "./components/ui/separator"
export { SeparatorWithText as VinrSeparatorWithText } from "./components/ui/separator-with-text"

export {
  Sheet as VinrSheet,
  SheetPortal as VinrSheetPortal,
  SheetOverlay as VinrSheetOverlay,
  SheetTrigger as VinrSheetTrigger,
  SheetClose as VinrSheetClose,
  SheetContent as VinrSheetContent,
  SheetHeader as VinrSheetHeader,
  SheetBody as VinrSheetBody,
  SheetFooter as VinrSheetFooter,
  SheetTitle as VinrSheetTitle,
  SheetDescription as VinrSheetDescription,
} from "./components/ui/sheet"

export {
  ShowMoreButton as VinrShowMoreButton,
  type ShowMoreButtonProps as VinrShowMoreButtonProps,
} from "./components/ui/show-more-button"

export { Switch as VinrSwitch } from "./components/ui/switch"

export {
  Table as VinrTable,
  TableHeader as VinrTableHeader,
  TableBody as VinrTableBody,
  TableFooter as VinrTableFooter,
  TableRow as VinrTableRow,
  TableHead as VinrTableHead,
  TableCell as VinrTableCell,
} from "./components/ui/table"

export {
  Tabs as VinrTabs,
  TabsList as VinrTabsList,
  TabsTrigger as VinrTabsTrigger,
  TabsContent as VinrTabsContent,
} from "./components/ui/tabs"

export { Textarea as VinrTextarea } from "./components/ui/textarea"

export {
  Tooltip as VinrTooltip,
  TooltipTrigger as VinrTooltipTrigger,
  TooltipContent as VinrTooltipContent,
  TooltipProvider as VinrTooltipProvider,
} from "./components/ui/tooltip"

// UI Hooks
export {
  useTheme as useVinrTheme,
  ThemeProviderContext as VinrThemeProviderContext,
  type Theme as VinrTheme,
  type ThemeProviderState as VinrThemeProviderState,
} from "./components/ui/hooks/use-theme"

// =========================
// Data Table
// =========================
export {
  DataTable as VinrDataTable,
  Pagination as VinrPagination,
  EmptyState as VinrEmptyState,
  LoadingSkeleton as VinrLoadingSkeleton,
} from "./components/data-table"

// =========================
// Detail View
// =========================
export {
  DetailRow as VinrDetailRow,
  DetailsList as VinrDetailsList,
  DetailSection as VinrDetailSection,
  SectionCard as VinrSectionCard,
  EntityStatusPanel as VinrEntityStatusPanel,
  EntityDetailPage as VinrEntityDetailPage,
  NavigationHeader as VinrNavigationHeader,
  DETAIL_SPACING as VINR_DETAIL_SPACING,
  DETAIL_TEXT as VINR_DETAIL_TEXT,
} from "./components/detail-view"

// =========================
// Edit Sheet
// =========================
export { EditSheet as VinrEditSheet } from "./components/edit-sheet"

// =========================
// Filters
// =========================
export { FilterButton as VinrFilterButton } from "./components/filters/base/FilterButton"
export { TableFilters as VinrTableFilters } from "./components/filters/TableFilters"

// Filter components (factory-created + specialized)
export {
  FilterActionsMenu as VinrFilterActionsMenu,
  FILTER_RENDERERS as VINR_FILTER_RENDERERS,
  renderGenericFilter as vinrRenderGenericFilter,
} from "./components/filters"

// =========================
// Charts
// =========================
export {
  LineChart as VinrLineChart,
  type LineChartProps as VinrLineChartProps,
  type LineChartDataPoint as VinrLineChartDataPoint,
  BarChart as VinrBarChart,
  type BarChartProps as VinrBarChartProps,
  type BarChartDataPoint as VinrBarChartDataPoint,
} from "./components/charts"

// =========================
// Inline Edit
// =========================
export { InlineEditSection as VinrInlineEditSection } from "./components/inline-edit"

// =========================
// Rule Builder
// =========================
export { RuleBuilder as VinrRuleBuilder } from "./components/rule-builder"
export { RuleBuilderModal as VinrRuleBuilderModal } from "./components/rule-builder-modal"

// Rule Builder Types
export type {
  RuleBuilderAction as VinrRuleBuilderAction,
  RuleBuilderData as VinrRuleBuilderData,
  RuleBuilderParam as VinrRuleBuilderParam,
  RuleBuilderParamOperator as VinrRuleBuilderParamOperator,
  RuleBuilderParamOperators as VinrRuleBuilderParamOperators,
  RuleBuilderProps as VinrRuleBuilderProps,
  RowData as VinrRowData,
  ParamOption as VinrParamOption,
} from "./components/rule-builder"

// =========================
// Shared Types
// =========================

// Data Table types
export type {
  Column as VinrColumn,
  TableAction as VinrTableAction,
  TableActionGroup as VinrTableActionGroup,
  TableActions as VinrTableActions,
  SortDirection as VinrSortDirection,
  SortState as VinrSortState,
  PaginationProps as VinrPaginationProps,
  DataTableProps as VinrDataTableProps,
} from "./types/data-table"

// Detail View types
export type {
  DetailItem as VinrDetailItem,
  SectionAction as VinrSectionAction,
  StatusPanelConfig as VinrStatusPanelConfig,
  DetailNavigationProps as VinrDetailNavigationProps,
  SectionConfig as VinrSectionConfig,
} from "./types/detail-view"

// Filter types
export type {
  FilterOption as VinrFilterOption,
  StatusFilter as VinrStatusFilter,
  FilterType as VinrFilterType,
  FilterConfig as VinrFilterConfig,
  NumberRangeValue as VinrNumberRangeValue,
  DateRangeValue as VinrDateRangeValue,
  FilterValue as VinrFilterValue,
  FilterState as VinrFilterState,
  ColumnConfig as VinrColumnConfig,
  BulkAction as VinrBulkAction,
  TableFiltersConfig as VinrTableFiltersConfig,
  TableFiltersProps as VinrTableFiltersProps,
  FilterButtonProps as VinrFilterButtonProps,
  EntityType as VinrEntityType,
  UserType as VinrUserType,
} from "./types/filters"

// Date filter types
export type { DateFilterValue as VinrDateFilterValue } from "./types/dateFilter"
export { DATE_OPERATORS as VINR_DATE_OPERATORS, TIME_UNITS as VINR_TIME_UNITS } from "./types/dateFilter"

// Amount filter types
export type {
  AmountOperator as VinrAmountOperator,
  AmountFilterValue as VinrAmountFilterValue,
} from "./types/amountFilter"

// =========================
// Utilities
// =========================
export { cn as vinrCn } from "./lib/utils"
export { Z_INDEX_CLASSES as VINR_Z_INDEX_CLASSES, getZIndexClass as vinrGetZIndexClass } from "./lib/z-index"
export { commonOptions as vinrCommonOptions } from "./lib/filters"

// Utils
export { FilterSessionManager as VinrFilterSessionManager } from "./utils/FilterSessionManager"
export { getDisplayLabel as vinrGetDisplayLabel } from "./utils/dateFilterUtils"
export {
  SPECIALIZED_FILTER_TYPES as VINR_SPECIALIZED_FILTER_TYPES,
  DEFAULT_VISIBLE_FILTERS as VINR_DEFAULT_VISIBLE_FILTERS,
  isFilterActive as vinrIsFilterActive,
  formatDateSafe as vinrFormatDateSafe,
  isValidObjectWithOperator as vinrIsValidObjectWithOperator,
} from "./utils/filterValidation"
