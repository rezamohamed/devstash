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

- `src/app/page.tsx` — Home page route (`/`)
- `src/app/layout.tsx` — Root layout with metadata and fonts
- `src/app/globals.css` — Global styles and Tailwind imports
- `next.config.ts` — Next.js configuration (React Compiler enabled)
- `tsconfig.json` — TypeScript config with `@/*` path alias

## Documentation

Use the `mcp__context7__query-docs` tool to fetch the latest official documentation for any library, framework, or SDK before writing code. This is especially important for Next.js, React, Tailwind, and other core dependencies where APIs change frequently.

## Project Structure Conventions

DevStash uses a feature-oriented structure on top of the Next.js App Router.

The primary goals are:

- Fast development velocity
- Clear ownership of code
- Low architectural complexity
- Easy future scaling

Avoid introducing structure before it is needed.

---

## Core Rules

### App Router

`src/app` is reserved for:

- routes
- layouts
- loading files
- error files
- route handlers

Do not place business logic in `src/app`.

Current structure:

```txt
src/app/
  page.tsx
  dashboard/
  items/
  collections/
  settings/
  api/
```

Do not introduce route groups such as `(app)` or `(marketing)` until they provide real value.

Route groups should only be added when the application has multiple layouts that need separation (marketing site vs authenticated application).

---

### Feature Organization

Organize business logic by feature.

Example:

```txt
src/features/
  dashboard/
  items/
  collections/
  users/
```

Each feature owns its own code.

Recommended structure:

```txt
src/features/items/
  components/
  actions/
  schemas/
  types/
  utils/
  hooks/
  mock/
```

Not every folder must exist immediately.

Create folders only when they are needed.

---

### Components

Shared UI primitives belong in:

```txt
src/components/ui/
```

Examples:

```txt
Button
Input
Dialog
DropdownMenu
Sheet
Tabs
```

These should be generic and reusable.

Feature-specific UI belongs inside the feature:

```txt
src/features/items/components/
src/features/dashboard/components/
```

Examples:

```txt
ItemCard
ItemDrawer
CollectionCard
DashboardShell
```

Rule:

If the component understands DevStash business concepts, it belongs inside a feature.

If the component is generic UI, it belongs in `components/ui`.

---

### Shared Layout Components

If a component becomes shared across multiple features, move it into:

```txt
src/components/layout/
```

Examples:

```txt
AppSidebar
AppHeader
AppShell
CommandPalette
```

Do not move components here prematurely.

Wait until multiple features genuinely share them.

---

### Global Infrastructure

`src/lib` is reserved for shared infrastructure.

Examples:

```txt
src/lib/prisma.ts
src/lib/auth.ts
src/lib/env.ts
src/lib/utils.ts
```

Do not place feature-specific logic inside `src/lib`.

Avoid:

```txt
src/lib/item-utils.ts
src/lib/collection-utils.ts
src/lib/mock-data.ts
```

These belong in their respective features.

---

### Prisma Conventions

Human-authored Prisma files belong in:

```txt
prisma/
  schema.prisma
  migrations/
  seed.ts
```

Generated Prisma client code belongs outside `src`:

```txt
generated/prisma/
```

Configure Prisma:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}
```

Application code should only import Prisma from:

```ts
import { prisma } from "@/lib/prisma";
```

Never import generated Prisma files directly throughout the application.

---

### Database Migrations

Never use:

```bash
prisma db push
```

Always use migrations:

```bash
npx prisma migrate dev
npx prisma migrate deploy
```

---

### Import Conventions

Use path aliases.

Preferred:

```ts
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/features/dashboard/components/sidebar";
import { prisma } from "@/lib/prisma";
```

Avoid deep relative imports:

```ts
../../../components/ui/button
```

---

### Server vs Client Component Rules

DevStash follows a server-first architecture.

#### Default Rule

Start with a Server Component.

Only convert a component to a Client Component when there is a clear requirement.

#### Use Server Components By Default

Prefer Server Components for:

- pages
- layouts
- database reads
- authentication checks
- loading collections
- loading items
- loading user settings
- rendering static content
- SEO-sensitive content

Examples:

```tsx
export default async function ItemsPage() {
  const items = await getItems();

  return <ItemsView items={items} />;
}
```

#### Use Client Components Only When Required

Add `"use client"` only when the component needs:

- useState
- useEffect
- useReducer
- useRef
- event handlers
- browser APIs
- local UI state
- drag and drop
- keyboard shortcuts
- command palette behavior
- drawer open/close state
- optimistic updates
- animations that require client state

Examples:

```tsx
"use client";

export function ItemDrawer() {
  const [open, setOpen] = useState(false);

  return ...
}
```

#### Keep Client Boundaries Small

Do not convert an entire page to a Client Component because one section needs interaction.

Bad:

```tsx
"use client";

export default function DashboardPage() {
  ...
}
```

Good:

```tsx
export default async function DashboardPage() {
  const items = await getItems();

  return (
    <>
      <ItemsList items={items} />
      <ItemDrawer />
    </>
  );
}
```

Where `ItemsList` is a Server Component and `ItemDrawer` is a Client Component.

#### Data Loading

Database queries should generally happen in:

- Server Components
- Server Actions
- Route Handlers

Avoid fetching database data directly from Client Components when possible.

Preferred:

```tsx
const items = await getItems();
```

inside a Server Component.

#### DevStash Specific Guidance

Typically Server Components:

- dashboard pages
- item pages
- collection pages
- settings pages
- data tables
- item lists
- collection lists

Typically Client Components:

- search input
- command palette
- item drawer
- collection picker
- favorite button
- pin button
- drag and drop
- sidebar collapse state
- toast notifications

#### Performance Philosophy

Server Components are the default.

Client Components should be treated as interactive islands inside a primarily server-rendered application.

When uncertain:

1. Start as a Server Component.
2. Add `"use client"` only when a real requirement appears.
3. Keep the client boundary as small as possible.

---

### Architecture Philosophy

Favor simplicity.

Do not introduce:

- route groups
- monorepos
- service layers
- abstraction layers
- architectural patterns

until there is a clear need.

Optimize for:

- readability
- maintainability
- iteration speed

Refactor when complexity appears, not before.
