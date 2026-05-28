# Current Feature

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Feature: Dashboard Items from Database

### Requirements (from @context/features/dashboard-items-spec.md)
- Create src/lib/db/items.ts with data fetching functions
- Fetch items directly in server component
- Item card icon/border derived from the item type
- Display item type tags and anything else currently there
- Update collection stats display

### Steps
1. [x] Create src/lib/db/items.ts with getRecentItems function
2. [x] Create ItemWithDetails type that matches DashboardShell expectations
3. [x] Update DashboardPage to fetch from database instead of mock data
4. [x] Run build and verify
5. [x] Test in browser (server running on port 3000/3001)
6. [x] Flatten route structure — moved dashboard to root, removed (app)/(marketing) folders
7. [x] Moved favicon.ico to public/

## History
- **2026-05-28** — Dashboard Items from Database completed — items and tags now fetched from Neon PostgreSQL via Prisma (src/lib/db/items.ts)
- **2026-05-28** — Dashboard Collections from Database completed — collections now fetched from Neon PostgreSQL via Prisma
- **2026-05-28** — Dashboard UI Phase 3 completed — Stats cards, Recent Collections, Pinned Items, Recent Items list
- **2026-05-27** — Dashboard UI Phase 2 completed — Collapsible sidebar, items/types navigation, favorites, pinned, collections, user avatar
- **2026-05-27** — Dashboard UI Phase 2 started
- **2026-05-27** — Dashboard UI Phase 1 completed
- **2026-05-27** — Dashboard UI Phase 1 started
- **2026-05-27** — Initial Next.js and Tailwind CSS setup, added project documentation, configured context files, pushed to GitHub
