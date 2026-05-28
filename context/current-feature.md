# Current Feature

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Feature: Stats & Sidebar from Database

### Requirements (from @context/features/stats-sidebar-spec.md)
- Display stats from database instead of mock data
- Display item types in sidebar with icons, linking to /items/[typename]
- Add "View all collections" link under collections list that goes to /collections
- Keep star icons for favorite collections, but for recents show colored circle based on most-used item type
- Create src/lib/db/items.ts and add the database functions

### Steps
1. [x] Add getItemTypes function to src/lib/db/items.ts
2. [x] Add getFirstUser function to src/lib/db/users.ts
3. [x] Update Sidebar to accept items, itemTypes, collections, currentUser as props
4. [x] Remove mock-data imports from Sidebar
5. [x] Update DashboardShell to pass collections to Sidebar
6. [x] Update DashboardPage to fetch itemTypes, currentUser from DB and pass to DashboardShell
7. [x] Add colored circle for recent collections based on most-used item type
8. [x] Add "View all collections" link to sidebar
9. [x] Run build and verify
10. [ ] Test in browser

## History
- **2026-05-28** — Stats & Sidebar from Database completed — sidebar now fetches item types, collections, current user from DB; item types ordered and capitalized
- **2026-05-28** — Dashboard Items from Database completed — items and tags now fetched from Neon PostgreSQL via Prisma (src/lib/db/items.ts)
- **2026-05-28** — Dashboard Collections from Database completed — collections now fetched from Neon PostgreSQL via Prisma
- **2026-05-28** — Dashboard UI Phase 3 completed — Stats cards, Recent Collections, Pinned Items, Recent Items list
- **2026-05-27** — Dashboard UI Phase 2 completed — Collapsible sidebar, items/types navigation, favorites, pinned, collections, user avatar
- **2026-05-27** — Dashboard UI Phase 2 started
- **2026-05-27** — Dashboard UI Phase 1 completed
- **2026-05-27** — Dashboard UI Phase 1 started
- **2026-05-27** — Initial Next.js and Tailwind CSS setup, added project documentation, configured context files, pushed to GitHub
