# @vinr/components

A shared React component library providing common UI components for **Barracuda** and **Gateway** projects.

Built with React 18, TypeScript, Tailwind CSS, Radix UI, and Vite.

## Installation

```bash
npm install @vinr/components
```

### Peer Dependencies

This library requires the following peer dependencies in your project:

```bash
npm install react react-dom lucide-react tailwind-merge clsx class-variance-authority date-fns framer-motion sonner recharts react-day-picker @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-tooltip
```

## Usage

All exports are prefixed with `Vinr` to avoid naming collisions:

```tsx
import { VinrButton, VinrDataTable, VinrEditSheet } from '@vinr/components'
import type { VinrColumn, VinrSortState } from '@vinr/components'

function App() {
  return (
    <VinrButton variant="default" size="sm">
      Click me
    </VinrButton>
  )
}
```

### Styles

Import the library styles in your app's entry point:

```tsx
import '@vinr/components/styles'
```

Consumers must load the required fonts:
- **Roobert** (body, weight 300)
- **Monument Grotesk Mono** (monospace category markers)

## Components

### UI Primitives (~25)

`VinrButton`, `VinrBadge`, `VinrCard`, `VinrInput`, `VinrSelect`, `VinrCheckbox`, `VinrSwitch`, `VinrDialog`, `VinrSheet`, `VinrTabs`, `VinrTooltip`, `VinrDropdownMenu`, `VinrPopover`, `VinrCalendar`, `VinrDatePicker`, `VinrDateRangePicker`, `VinrMultiSelect`, `VinrTable`, `VinrProgress`, `VinrTextarea`, `VinrLabel`, `VinrSeparator`, `VinrActionDropdown`, `VinrShowMoreButton`, and more.

### Composed Components

| Module | Exports |
|--------|---------|
| **DataTable** | `VinrDataTable`, `VinrPagination`, `VinrLoadingSkeleton`, `VinrEmptyState` |
| **Detail View** | `VinrEntityDetailPage`, `VinrEntityStatusPanel`, `VinrSectionCard`, `VinrDetailSection`, `VinrDetailRow`, `VinrDetailsList`, `VinrNavigationHeader` |
| **Edit Sheet** | `VinrEditSheet` |
| **Filters** | `VinrTableFilters`, `VinrFilterButton`, `VinrMultiSelectFilter`, `VinrSearchableSelectFilter`, date/amount filters |
| **Charts** | `VinrLineChart`, `VinrBarChart` |
| **Inline Edit** | `VinrInlineEditSection` |
| **Rule Builder** | `VinrRuleBuilder`, `VinrRuleBuilderModal` |

## Development

```bash
npm run dev             # Start Vite dev server (sandbox demo)
npm run build           # Production build (SPA demo)
npm run build:lib       # Library build (ES modules + .d.ts → dist/)
npm run build:check     # TypeScript check + SPA build
npm run storybook       # Start Storybook dev server (port 6006)
npm run build-storybook # Build static Storybook site
```

### Local Development with Consumer Projects

```bash
# In this repo
npm link

# In consumer project (Barracuda or Gateway)
npm link @vinr/components
```

## Theming

Components use CSS custom properties for theming. Override variables on `:root` (light) and `.dark` (dark mode) to customize. See `src/styles/theme.css` for the full list.

Components use semantic tokens (`bg-background`, `text-foreground`, `border-border`, etc.) — never hardcoded colors.

## License

MIT © Vinr
