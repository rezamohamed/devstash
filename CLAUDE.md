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
