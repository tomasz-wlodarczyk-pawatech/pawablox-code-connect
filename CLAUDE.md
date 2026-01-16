# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pawablox is a React 19 design system monorepo using Bun as the package manager and runtime. It provides UI components, icons, and design tokens with Figma integration via Code Connect.

## Commands

```bash
# Development
bun install              # Install dependencies
bun run dev              # Run all packages in dev mode
bun run storybook        # Start Storybook on port 6006

# Quality checks
bun run lint             # ESLint + Stylelint
bun run fix              # Auto-fix lint issues
bun run typecheck        # TypeScript check
bun run format           # Prettier format
bun run format:check     # Check formatting
bun run test             # Run Vitest tests

# Test a single file
bunx vitest run packages/components/src/path/to/file.test.tsx

# Figma integration
bun run figma:connect    # Check Figma Code Connect
bun run figma:publish    # Publish Code Connect to Figma

# Code generation
bun scripts/generate-component.mjs ComponentName [category]
# Categories: primitives (default), layout, compositions
# Example: bun scripts/generate-component.mjs Card compositions

# Token/Icon generation (requires Figma API credentials)
bun script:tokens        # Generate SCSS from tokens/tokens.json
bun script:icons         # Generate icons from Figma
```

## Architecture

### Monorepo Structure

```
packages/
├── components/     # @tomasz-wlodarczyk-pawatech/components - React UI components
│   └── src/
│       ├── primitives/   # Basic components (button, input, checkbox, etc.)
│       ├── compositions/ # Complex composed components
│       ├── hooks/        # Shared React hooks
│       └── utils/        # Utility functions
├── icons/          # @tomasz-wlodarczyk-pawatech/icons - Icon components from Figma
├── tokens/         # @tomasz-wlodarczyk-pawatech/tokens - Design tokens as SCSS
│   └── scss/
│       ├── vars/         # Generated variables (colors, spacing, typography)
│       └── _mixins.scss  # Reusable SCSS mixins
├── figma/          # @tomasz-wlodarczyk-pawatech/figma - Figma Code Connect definitions
└── storybook/      # Storybook stories
```

### Component Structure

Each component follows this pattern:

```
primitives/button/
├── Button.tsx           # Component implementation
└── Button.module.scss   # Scoped styles
```

Stories and Figma connections are in separate packages:

- `packages/storybook/stories/primitives/Button.stories.tsx`
- `packages/figma/src/primitives/Button.figma.tsx`

### Design Tokens Flow

1. Designers update tokens in Figma via Tokens Studio plugin
2. Tokens sync to `tokens/tokens.json` (W3C DTCG format)
3. `bun script:tokens` generates SCSS variables
4. GitHub Actions auto-creates PR on token changes

### Icon Generation Flow

1. Run GitHub Action "Generate Icons from Figma" with node ID
2. Script fetches SVGs from Figma API
3. Generates React components wrapping base `Icon` component
4. Auto-creates PR with new icons

## Styling Conventions

Components use CSS Modules with SCSS. Import tokens like:

```scss
@use '@tomasz-wlodarczyk-pawatech/tokens/scss/mixins';
@use '@tomasz-wlodarczyk-pawatech/tokens/scss/vars/colors';
@use '@tomasz-wlodarczyk-pawatech/tokens/scss/vars/spacing';
```

Available mixins include media queries (`mq-sm-up`, `mobile`, `tablet`, `desktop`), `visually-hidden`, `truncate`, `line-clamp`, `focus-ring`, `reset-button`, `reset-list`.

## Path Aliases

```typescript
'@tomasz-wlodarczyk-pawatech/tokens'     → packages/tokens
'@tomasz-wlodarczyk-pawatech/components' → packages/components/src
'@tomasz-wlodarczyk-pawatech/icons'      → packages/icons/src
```

## Related Projects

### frontend-react-web (BetPawa Monorepo)

**Path:** `/Users/tomaszwlodarczyk/IdeaProjects/frontend-react-web`

Main Next.js 15 monorepo for BetPawa's frontend web application. This is the consumer of the pawablox design system. Uses Bun workspaces with packages `@betpawa-monorepo/*`:

- `web/` - Main Next.js application (pages router)
- `packages/design-system/` - Current UI components (to be migrated to pawablox)
- `packages/redux/` - State management with Redux Toolkit
- `packages/shared/` - Shared utilities and types

### sds (Simple Design System)

**Path:** `/Users/tomaszwlodarczyk/IdeaProjects/sds`

Figma's reference implementation for Code Connect. Used as a learning resource for:

- Figma Code Connect patterns for primitives and compositions
- `documentUrlSubstitutions` in figma.config.json
- Design tokens and variables integration
- React Aria Components usage
