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

- `src/app/(marketing)/page.tsx` — Home page route (`/`)
- `src/app/layout.tsx` — Root layout with metadata and fonts
- `src/app/globals.css` — Global styles and Tailwind imports
- `next.config.ts` — Next.js configuration (React Compiler enabled)
- `tsconfig.json` — TypeScript config with `@/*` path alias

## Documentation

Use the `mcp__context7__query-docs` tool to fetch the latest official documentation for any library, framework, or SDK before writing code. This is especially important for Next.js, React, Tailwind, and other core dependencies where APIs change frequently.

## Project Structure Conventions

DevStash uses a feature-oriented structure on top of the Next.js App Router.

### Core Rules

- `src/app` is for Next.js routes, layouts, route groups, loading files, error files, and route handlers only.
- Use route groups to separate public marketing routes from authenticated app routes.
- Public routes belong under `src/app/(marketing)`.
- Authenticated product routes belong under `src/app/(app)`.
- Shared UI primitives live in `src/components/ui`.
- Domain-specific UI belongs in `src/features/<domain>/components`.
- Server actions belong in `src/features/<domain>/actions`.
- Zod schemas belong in `src/features/<domain>/schemas`.
- Feature-specific types belong in `src/features/<domain>/types`.
- Feature-specific utilities belong in `src/features/<domain>/utils`.
- Feature-specific hooks belong in `src/features/<domain>/hooks`.
- Feature-specific mock data belongs inside the relevant feature, usually `src/features/<domain>/mock`.
- Global infrastructure belongs in `src/lib`.
- Do not dump feature logic, mock data, or domain utilities into `src/lib`.
- Keep shadcn/ui generated components in `src/components/ui`.
- Prefer server components by default.
- Use client components only when interaction, hooks, browser APIs, or local state are required.
- Do not over-componentize early. Prefer readable files until duplication appears.

### Route Organization

```txt
src/app/
  (marketing)/
    page.tsx
  (app)/
    dashboard/
      page.tsx
    items/
    collections/
    settings/
```

Route groups should not change URLs.

Examples:

- `src/app/(marketing)/page.tsx` serves `/`
- `src/app/(app)/dashboard/page.tsx` serves `/dashboard`

### Feature Organization Example

```txt
src/features/items/
  components/
  actions/
  schemas/
  types/
  utils/
  hooks/
  mock/

src/features/collections/
  components/
  actions/
  schemas/
  types/
  utils/
  hooks/
  mock/

src/features/dashboard/
  components/
  mock/
```

### Global Infrastructure

`src/lib` is reserved for global utilities and infrastructure only.

Acceptable examples:

```txt
src/lib/prisma.ts
src/lib/utils.ts
src/lib/auth.ts
src/lib/env.ts
```

Avoid:

```txt
src/lib/mock-data.ts
src/lib/item-utils.ts
src/lib/collection-helpers.ts
```

Those should live in their relevant feature folders.

### Prisma Conventions

Generated Prisma client code should live outside `src`:

```txt
generated/prisma/
```

The human-authored Prisma schema and migrations live in:

```txt
prisma/
  schema.prisma
  migrations/
  seed.ts
```

`prisma/schema.prisma` should use:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}
```

Application code should import Prisma only from:

```ts
import { prisma } from "@/lib/prisma";
```

Do not import from `generated/prisma` directly outside `src/lib/prisma.ts`.

Never use:

```bash
prisma db push
```

Use migrations only:

```bash
npx prisma migrate dev
npx prisma migrate deploy
```

### Import Guidance

Use path aliases.

Preferred:

```ts
import { Sidebar } from "@/features/dashboard/components/sidebar";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
```

Avoid deep relative imports like:

```ts
import { Button } from "../../../components/ui/button";
```

### Migration Policy

Never use `prisma db push`.

Use migrations only:

```bash
npx prisma migrate dev
npx prisma migrate deploy
```
