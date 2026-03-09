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

**Entry flow**: `main.tsx` → `App.tsx` (wraps in AppProviders) → `ComponentShowcase.tsx` (interactive demo page with tabs)

### Shared Library (`src/shared/`)

The core reusable code lives here. Key areas:

- **`components/ui/`** — Shadcn/Radix-based primitives (button, dialog, popover, select, calendar, etc.). Follow the shadcn pattern: each file exports a set of composed Radix primitives styled with CVA + `cn()`.

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
  - `components/rule-builder-param-row/` — Per-row UI with param/operator/value selects and `input-factory.tsx` for type-based inputs (date, number, select, text)
  - `use-rule-builder-rows.ts` — Row state management hook
  - Config loaded from `src/data/rule-builder-data.json`

- **`lib/utils.ts`** — `cn()` helper (clsx + tailwind-merge)
- **`lib/filters/`** — Filter option data and factory functions
- **`types/`** — Shared TypeScript types (filters.ts, dateFilter.ts, amountFilter.ts)
- **`utils/`** — FilterSessionManager (localStorage), filterValidation, dateFilterUtils

### Theming

CSS variable-based theming with light/dark mode (class-based toggle via ThemeProvider). Variables defined in `src/styles/theme.css`, consumed by Tailwind config. Primary color is teal (`#038A6C` light / `#04BF8A` dark).

### App-Specific Code

- `src/app/` — App shell and ComponentShowcase demo page
- `src/components/` — App-only components (e.g., SampleMetricCard)
- `src/providers/` — AppProviders (ThemeProvider, TooltipProvider, Toaster)
- `src/data/` — Static config data (rule-builder-data.json)
