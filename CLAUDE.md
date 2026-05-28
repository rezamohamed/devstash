# DevStash

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A developer knowledge hub for snippets, prompts, commands, notes, files, images, links and custom item types.

## Context Files

Read these for full project context:

- @context/project-overview.md: Features, data models, tech stack, UI/UX
- @context/coding-standards.md: Code conventions and patterns
- @context/ai-interaction.md : Workflow and communication guidelines
- @context/current-feature.md: What we are currently working on

## Commands

```bash
bun run dev      # Start development server at http://localhost:3000
bun run build    # Build for production
bun run start    # Start production server
bun run lint     # Run ESLint
```

## Architecture

- **App Router**: Pages are in `src/app/` with `page.tsx` as the route file
- **Tailwind CSS v4**: Styles in `src/app/globals.css` using `@import "tailwindcss"`
- **React 19**: Uses the new React compiler (enabled in `next.config.ts`)
- **Path alias**: `@/*` maps to `./src/*`

## Key Files

- `src/app/page.tsx` — Home page route
- `src/app/layout.tsx` — Root layout with metadata and fonts
- `src/app/globals.css` — Global styles and Tailwind imports
- `next.config.ts` — Next.js configuration (React Compiler enabled)
- `tsconfig.json` — TypeScript config with `@/*` path alias

## Documentation

Use the `mcp__context7__query-docs` tool to fetch the latest official documentation for any library, framework, or SDK before writing code. This is especially important for Next.js, React, Tailwind, and other core dependencies where APIs change frequently.

## Project Structure Conventions

DevStash uses a feature-oriented structure on top of the Next.js App Router.

### Rules

- `src/app` is for routes, layouts, and route-level loading/error files only.
- Shared UI primitives live in `src/components/ui`.
- Domain-specific UI belongs in `src/features/<domain>/components`.
- Server actions belong in `src/features/<domain>/actions`.
- Zod schemas belong in `src/features/<domain>/schemas`.
- Feature-specific types belong in `src/features/<domain>/types`.
- Feature-specific utilities belong in `src/features/<domain>/utils`.
- Global infrastructure belongs in `src/lib`.
- Do not dump feature logic into `src/lib`.
- Do not over-componentize early; prefer readable files until duplication appears.
- Prefer server components by default.
- Use client components only when interaction, hooks, browser APIs, or local state are required.
- Keep shadcn/ui generated components in `src/components/ui`.

### Route Organization

Use route groups to separate public marketing pages from authenticated app pages:

```txt
src/app/
  (marketing)/
  (app)/
```

Authenticated product routes should live under:

```txt
src/app/(app)/
```

Examples:

```txt
src/app/(app)/dashboard/page.tsx
src/app/(app)/items/page.tsx
src/app/(app)/collections/page.tsx
src/app/(app)/settings/page.tsx
```

### Feature Organization Example

```txt
src/features/items/
  components/
  actions/
  schemas/
  types/
  utils/
  hooks/
```

### Import Guidance

Use path aliases where appropriate. Prefer clear imports like:

```ts
import { Sidebar } from "@/features/dashboard/components/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

### Migration Policy

Never use `prisma db push`.

Use migrations only:

```bash
npx prisma migrate dev
npx prisma migrate deploy
```
