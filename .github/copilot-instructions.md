# Copilot Instructions — Vinr Common Components

## What This Is

A **shared component library** (Vite + React 18 + TypeScript + Tailwind CSS) providing common UI components consumed by two projects: **Barracuda** (`C:\dev\verticals\barracuda`) and **Gateway** (`C:\dev\gateway`). The sandbox includes a demo app for developing/testing components and Storybook for interactive component documentation. Entry: `main.tsx` → `App.tsx` → `ComponentShowcase.tsx` (tabbed demo page). No backend, no routing, no test runner, no linter.

## Commands

```bash
npm run dev             # Start Vite dev server (sandbox demo)
npm run build           # Production build (SPA demo)
npm run build:lib       # Library build (ES modules + .d.ts declarations → dist/)
npm run build:check     # TypeScript check + SPA build (use this to verify changes)
npm run storybook       # Start Storybook dev server (port 6006)
npm run build-storybook # Build static Storybook site
```

## Path Aliases

Use these instead of relative paths: `@/*` → `src/*`, `@shared/*` → `src/shared/*`, `@styles/*` → `src/styles/*`. Defined in both `tsconfig.json` and `vite.config.ts`.

## Project Structure

- **`src/shared/`** — The core reusable library. All shared components, types, hooks, and utilities live here. This is the primary area of work and what gets consumed by Barracuda and Gateway.
- **`src/shared/index.ts`** — Root barrel file. Single entry point for consumers. All exports are aliased with `Vinr` prefix here (alias-at-root strategy).
- **`src/app/demos/`** — Demo pages that exercise shared components (DataTableDemo, DetailViewDemo, etc.). These stay in the sandbox — not published.
- **`src/shared/components/ui/`** — Shadcn/Radix primitives (button, dialog, select, popover…). Follow the shadcn pattern: CVA variants + `cn()` helper + `asChild` via Radix `Slot`.
- **`src/shared/components/`** — Higher-level composed components: `data-table/`, `detail-view/`, `edit-sheet/`, `filters/`, `charts/`, `rule-builder/`, `inline-edit/`.
- **`src/shared/types/`** — Centralized TypeScript types, separate from component files.
- **`src/shared/lib/`** — `utils.ts` (`cn()` helper), `z-index.ts` (layering constants), filter utilities.
- **`.storybook/`** — Storybook configuration. Stories are co-located with components as `*.stories.tsx` files.

## Component Prefix: `Vinr`

All shared components are exported with the `Vinr` prefix to avoid naming collisions in consuming projects.

**Strategy: Alias-at-root** — Internal component code uses unprefixed names. The root barrel (`src/shared/index.ts`) re-exports everything with `Vinr` prefix aliases:

```tsx
// Internal: src/shared/components/ui/button.tsx
export function Button() { ... }

// Root barrel: src/shared/index.ts
export { Button as VinrButton } from './components/ui'

// Consumer usage:
import { VinrButton, VinrDataTable } from '@vinr/components'
```

**Prefixing rules:**
- Component names: `Vinr` prefix (PascalCase) — e.g., `VinrButton`, `VinrCard`, `VinrDataTable`
- Type/interface names: `Vinr` prefix — e.g., `VinrButtonProps`, `VinrColumn<T>`, `VinrSortState`
- Utility functions: `vinr` prefix (camelCase) — e.g., `vinrCn()`, `vinrCssVar()`
- Hooks: `useVinr` prefix — e.g., `useVinrFilterManager`, `useVinrMultiSelect`
- **CSS variables do NOT need prefix** — keep as `--background`, `--primary`, etc.
- File names do NOT get the prefix — only exports do
- **Demos and Storybook stories** use unprefixed internal imports (e.g., `import { Button } from '@shared/components/ui'`), not the Vinr-prefixed public API

## Library Packaging

The package is `@vinr/components`. Library build is configured and working.

### Build architecture
- `npm run build:lib` — Vite library mode (`--mode lib`) builds ES modules with `preserveModules` + `tsc` generates `.d.ts` declarations
- Entry point: `src/shared/index.ts` → re-exports everything with `Vinr` prefix
- Barrel files: `src/shared/components/ui/index.ts`, `src/shared/types/index.ts`, and each component module's `index.ts`
- All peer dependencies are externalized (React, Radix, recharts, framer-motion, etc.)
- Output: `dist/` with tree-shakeable ES modules + type declarations (~108 modules)
- Type declarations: generated via `tsconfig.lib.json` (extends `tsconfig.json`, `emitDeclarationOnly: true`, excludes stories)

### Consuming in Barracuda / Gateway
```bash
# Link locally during development
npm link                          # in this repo
npm link @vinr/components         # in consumer project

# Or publish to registry
npm publish                       # after npm login
```

Consumers import from the package:
```tsx
import { VinrDataTable, VinrButton, VinrEditSheet } from '@vinr/components'
import type { VinrColumn, VinrSortState } from '@vinr/components'
```

### Remaining TODO
- [ ] **Update all demo files** in `src/app/demos/` to use prefixed names (optional — demos can use internal imports)

## Storybook

Storybook 8.6.18 is configured with `@storybook/react-vite` for interactive component documentation.

### Writing Stories

- **Co-locate** stories with their component: `Button.stories.tsx` next to `button.tsx`
- Use **internal imports** (not Vinr-prefixed): `import { Button } from '@shared/components/ui'`
- Follow the **CSF 3** format (Component Story Format)
- Stories are excluded from the library build via `tsconfig.lib.json`

### Story conventions

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@shared/components/ui'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { children: 'Click me' },
}
```

**Generic components** (DataTable, EditSheet) that require render functions need a workaround for Storybook's `args` requirement:
```tsx
export const Default: Story = {
  args: {} as any,
  render: () => <DataTable columns={columns} data={data} />,
}
```

### Current Stories
- `ui/Button.stories.tsx` — all variants + icon combinations
- `ui/Badge.stories.tsx` — all variants gallery
- `ui/Card.stories.tsx` — default, with badge, compact metric cards
- `ui/Inputs.stories.tsx` — Input, Textarea, Checkbox, Switch, Select, form example
- `data-table/DataTable.stories.tsx` — default, with pagination, loading, empty states
- `edit-sheet/EditSheet.stories.tsx` — edit merchant, add new payment

## Component Conventions

1. **Named exports only** — no default exports (except Storybook `meta`). Barrel files (`index.ts`) re-export components and types with `export type` for type-only exports.
2. **`Vinr` prefix at root barrel** — all public exports use the `Vinr`/`vinr`/`useVinr` prefix via alias in `src/shared/index.ts`. Internal code stays unprefixed.
3. **Generics** — data-driven components (DataTable, DetailSection) use `<T extends Record<string, any>>` generics.
4. **Props** — define as `interface` (not `type`), with JSDoc on optional props. Destructure in function signature with defaults.
5. **Composition** — high-level components compose `ui/` primitives and Radix parts. See `EditSheet.tsx` and `EntityStatusPanel.tsx`.
6. **Factory pattern** — `filters/utils/createFilterComponent.tsx` stamps out filter components from config. New filters should use this factory.
7. **File naming** — PascalCase for components (`DataTable.tsx`), kebab-case for hooks/utilities (`use-rule-builder-rows.ts`), camelCase for type files (`dateFilter.ts`). File names do NOT get the `vinr-` prefix — only exports do.

## Theming & Styling

- **CSS variables** defined in `src/styles/theme.css` on `:root` (light) and `.dark` (dark). Values are raw hex, not HSL.
- **Always use semantic tokens** in components: `bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-muted-foreground`, etc. Never hardcode hex colors.
- **Tailwind `gray-*` values are theme overrides** — `bg-gray-200` resolves to `var(--gray-200)`, not default Tailwind gray.
- **Charts** read `--chart-1` through `--chart-5` at runtime via `cssVar()` helper with fallbacks.
- **Z-index** — use `Z_INDEX_CLASSES` from `@shared/lib/z-index.ts` (e.g., `Z_INDEX_CLASSES.MODAL`, `Z_INDEX_CLASSES.DROPDOWN`), not arbitrary `z-[]` values.
- **Fonts** — Roobert (body, 300 weight) + Monument Grotesk Mono (uppercase category markers via `.font-mono`). Consumers must load these fonts themselves.
- **Capitalization** — UPPERCASE only for mono category markers/table headers; Title Case for interactive elements; Sentence case for descriptions.

## Adding a New Shared Component

1. Create directory under `src/shared/components/<component-name>/`.
2. Add an `index.ts` barrel with named exports and `export type` for types.
3. Place types in `src/shared/types/<component-name>.ts` if they'll be shared across components.
4. Re-export from the root barrel `src/shared/index.ts` with `Vinr` prefix aliases.
5. Write a Storybook story file (`<Component>.stories.tsx`) co-located with the component.
6. Build a demo in `src/app/demos/` and wire it into `ComponentShowcase.tsx`.
7. Verify with `npm run build:check`.

## Key Patterns to Follow

- **DataTable** (`src/shared/components/data-table/`) — reference for generic component architecture, memoized rows/cells, sort state cycling (asc → desc → none), hover actions, and the loading skeleton pattern.
- **Detail View** (`src/shared/components/detail-view/`) — reference for config-driven entity pages with `StatusPanelConfig<T>` and `SectionConfig` types driving layout.
- **Filter System** (`src/shared/components/filters/`) — layered architecture: `base/` shells → `components/` domain filters → `hooks/` state → `TableFilters.tsx` orchestrator. Use `createFilterComponent` factory for new filters.
- **EditSheet** (`src/shared/components/edit-sheet/`) — slide-in panel pattern with header, scrollable body, save/cancel footer.

## Current Component Inventory

### UI Primitives (`ui/`) — ~25 components
`ActionDropdown`, `Badge`, `Button`, `Calendar`, `Card` (+ Header/Footer/Title/Description/Content), `Checkbox`, `DatePicker`, `DateRangePicker`, `Dialog` (+ parts), `DropdownMenu` (+ parts), `Input`, `Label`, `MultiSelect`, `Popover`, `Progress`, `Select` (+ parts), `Separator`, `SeparatorWithText`, `Sheet` (+ parts), `ShowMoreButton`, `Switch`, `Table` (+ parts), `Tabs` (+ parts), `Textarea`, `Tooltip` (+ parts)

### Composed Components — 7 modules
| Module | Key Exports |
|--------|-------------|
| `data-table/` | `DataTable`, `Pagination`, `LoadingSkeleton`, `EmptyState` |
| `detail-view/` | `EntityDetailPage`, `EntityStatusPanel`, `SectionCard`, `DetailSection`, `DetailRow`, `DetailsList`, `NavigationHeader` |
| `edit-sheet/` | `EditSheet` |
| `filters/` | `TableFilters`, `FilterButton`, `MultiSelectFilter`, `SearchableSelectFilter`, `createFilterComponent` factory, date/amount filter components |
| `charts/` | `LineChart`, `BarChart` |
| `inline-edit/` | `InlineEditSection` |
| `rule-builder/` | `RuleBuilder`, `RuleBuilderModal` |

### Shared Types — 5 modules
`data-table.ts` (Column, SortState, DataTableProps…), `detail-view.ts` (DetailItem, StatusPanelConfig…), `filters.ts` (FilterType, FilterConfig…), `dateFilter.ts`, `amountFilter.ts`

### Utilities
`cn()`, `Z_INDEX_CLASSES`, `FilterSessionManager`, `createFilterComponent`, `filterValidation`, `dateFilterUtils`
