# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run build:check  # TypeScript check + production build
```

No test runner or linter is configured.

## Path Aliases

- `@/*` → `./src/*`
- `@shared/*` → `./src/shared/*`
- `@styles/*` → `./src/styles/*`

Defined in both `tsconfig.json` and `vite.config.ts`.

## Architecture

This is a **component sandbox** for prototyping shared UI components extracted from the Barracuda verticals app (`/home/pavel/brik/verticals/barracuda/`). It's a single-page Vite + React 18 + TypeScript + Tailwind CSS app.

**Entry flow**: `main.tsx` → `App.tsx` (wraps in AppProviders) → `ComponentShowcase.tsx` (interactive demo page)

### Showcase Layout

`ComponentShowcase.tsx` is organized into two sections:

- **UI Primitives** — tabs: Display, Buttons, Inputs, Filters, Charts
- **Page Components** — tabs: Data Table, Detail View, Edit Patterns, Rules, Info Box

Demo components live in `src/app/demos/` (DataTableDemo, DetailViewDemo, EditPatternsDemo, ChartsDemo).

### Shared Library (`src/shared/`)

The core reusable code lives here. Key areas:

- **`components/ui/`** — Shadcn/Radix-based primitives (button, dialog, popover, select, calendar, etc.). Follow the shadcn pattern: each file exports a set of composed Radix primitives styled with CVA + `cn()`.

- **`components/charts/`** — Recharts-based visualization components:
  - `LineChart.tsx` — Multi-series line chart (dashed comparison lines, custom tooltips, label mapping)
  - `BarChart.tsx` — Bar chart with horizontal/vertical layout, rounded corners
  - Both read theme colors from CSS variables (`--chart-1` through `--chart-5`, `--chart-grid`, etc.) at runtime via `cssVar()` helper with fallbacks
  - Uses Monument Grotesk Mono for axis labels

- **`components/filters/`** — Filter system with a layered architecture:
  - `base/` — Generic filter shells (FilterButton, MultiSelectFilter, SearchableSelectFilter)
  - `components/` — Domain filters (date/, amount/, factory-created filters)
  - `hooks/` — State logic per filter type (useMultiSelectFilter, useDateFilter, useAmountFilter, useFilterManager)
  - `utils/createFilterComponent.tsx` — Factory that generates filter components from config
  - `TableFilters.tsx` — Container that orchestrates multiple filters together

- **`components/rule-builder/`** — "When X then Y" rule builder with:
  - `rule-builder.tsx` — Main component managing criteria rows + action
  - `rule-builder-modal.tsx` — Dialog wrapper (sm/lg sizes)
  - `components/primitives/` — Layout building blocks (Section, Label, Rows, Row, Cols, Col)
  - `components/rule-builder-param-row/` — Per-row UI with param/operator/value selects and `input-factory.tsx` for type-based inputs
  - Config loaded from `src/data/rule-builder-data.json`

- **`components/data-table/`** — Full-featured data table:
  - `DataTable.tsx` — Main component (selection, sorting, actions, hover actions, pagination, loading/empty states)
  - `DataTableHeader.tsx` — Sortable column headers (cycles: asc → desc → none)
  - `Row.tsx`, `Cell.tsx` — Memoized row and cell renderers
  - `HoverActions.tsx` — Action buttons visible on row hover
  - `Pagination.tsx` — Page navigation with smart ellipsis
  - `LoadingSkeleton.tsx` — Shimmer animation using inline CSS variables (dark mode aware)
  - Types in `types/data-table.ts`: `Column<T>`, `TableAction<T>`, `DataTableProps<T>`, `SortState`

- **`components/detail-view/`** — Entity detail page system:
  - `EntityDetailPage.tsx` — Flat layout shell (no built-in padding/max-width — parent controls layout)
  - `EntityStatusPanel.tsx` — Header with primary value, status badge, metadata, actions, navigation
  - `SectionCard.tsx` — Card wrapper with title and actions (supports compact and detail-view layouts)
  - `DetailSection.tsx` — SectionCard + DetailsList with show more/less
  - `DetailRow.tsx` — Label/value pair (copyable, badge variants)
  - `constants.ts` — `DETAIL_SPACING` and `DETAIL_TEXT` design tokens
  - Types in `types/detail-view.ts`: `DetailItem`, `StatusPanelConfig<T>`, `SectionConfig`

- **`components/edit-sheet/`** — Sheet (slide-in) edit pattern:
  - `EditSheet.tsx` — Composed sheet with header, scrollable body, and save/cancel footer

- **`components/inline-edit/`** — Inline edit pattern:
  - `InlineEditSection.tsx` — Section card that toggles between read-only and edit mode in-place

- **`lib/utils.ts`** — `cn()` helper (clsx + tailwind-merge)
- **`lib/z-index.ts`** — Z-index layering system (classes for SHEET, OVERLAY, MODAL, etc.)
- **`lib/filters/`** — Filter option data and factory functions
- **`types/`** — Shared TypeScript types (filters.ts, dateFilter.ts, amountFilter.ts, data-table.ts, detail-view.ts)
- **`utils/`** — FilterSessionManager (localStorage), filterValidation, dateFilterUtils

### Theming

CSS variable-based theming with light/dark mode (class-based toggle via ThemeProvider). Variables defined in `src/styles/theme.css`, consumed by Tailwind config. Primary color is teal (`#038A6C` light / `#04BF8A` dark).

**Dark mode**: All components use semantic color tokens (`bg-card`, `bg-background`, `text-foreground`, etc.) instead of hardcoded colors. Chart components use `--chart-*` CSS variables with dark mode values defined in `.dark {}`.

### Design Conventions

- **Fonts**: Roobert (body, 300 weight default) + Monument Grotesk Mono (uppercase via `.font-mono` global rule)
- **Font hierarchy**: page-title (36px) → section-header (24px) → card/tab title (16px) → sub-heading (16px semibold) → body (14px)
- **Capitalization**: UPPERCASE only for mono category markers/table headers; Title Case for interactive elements; Sentence case for descriptions
- **Colors**: Use CSS variables, never hardcoded hex in components. `bg-gray-200` resolves to `var(--gray-200)` (theme override, not default Tailwind)

### App-Specific Code

- `src/app/` — App shell, ComponentShowcase, and `demos/` directory
- `src/components/` — App-only components (e.g., SampleMetricCard)
- `src/providers/` — AppProviders (ThemeProvider, TooltipProvider, Toaster)
- `src/data/` — Static config data (rule-builder-data.json)
