# Current Feature

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Feature

<!-- What are we building? -->

Auth Phase 1 - BetterAuth Setup

## Goals

<!-- What does success looks like? -->

- [x] Install better-auth and @better-auth/prisma-adapter
- [x] Create src/lib/auth.ts with BetterAuth config
- [x] Create auth API route handler at /api/auth/[...betterauth]
- [x] Create src/middleware.ts for route protection
- [x] Verify build passes

## Notes

<!-- Additional context, constraints, or details from spec -->

- kysely@0.28.17 required (0.29.x incompatible with bundled SQLite dialects)
- bcryptjs used for password hashing (already installed)
- baseURL warning: set BETTER_AUTH_URL env var for production
- middleware convention deprecated in Next.js 16+ (use "proxy" in future update)

## History
- **2026-05-30** — Auth Phase 1 (BetterAuth Setup) completed — installed better-auth + prisma adapter, created auth.ts, API route, middleware; kysely@0.28.17 required for compatibility
- **2026-05-29** — Code Quality Quick Wins completed — replaced magic number with MS_PER_DAY constant, added defensive handling to getInitials(), removed unused viewMode prop
- **2026-05-29** — Add Pro Badge To Sidebar completed — created badge component with pro variant, added to files/images links in sidebar
- **2026-05-28** — Stats & Sidebar from Database completed — sidebar now fetches item types, collections, current user from DB; item types ordered and capitalized
- **2026-05-28** — Dashboard Items from Database completed — items and tags now fetched from Neon PostgreSQL via Prisma (src/lib/db/items.ts)
- **2026-05-28** — Dashboard Collections from Database completed — collections now fetched from Neon PostgreSQL via Prisma
- **2026-05-28** — Dashboard UI Phase 3 completed — Stats cards, Recent Collections, Pinned Items, Recent Items list
- **2026-05-27** — Dashboard UI Phase 2 completed — Collapsible sidebar, items/types navigation, favorites, pinned, collections, user avatar
- **2026-05-27** — Dashboard UI Phase 2 started
- **2026-05-27** — Dashboard UI Phase 1 completed
- **2026-05-27** — Dashboard UI Phase 1 started
- **2026-05-27** — Initial Next.js and Tailwind CSS setup, added project documentation, configured context files, pushed to GitHub
