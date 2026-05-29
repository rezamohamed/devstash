# Current Feature

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Feature: Add Pro Badge To Sidebar

### Requirements (from @context/features/add-pro-badge-to-sidebar.md)
- Use a ShadCN UI badge
- Make the badge subtle but clear
- Add "Pro" badge to files and images item type links in sidebar

### Steps
1. [x] Find sidebar component with item type links
2. [x] Import ShadCN Badge component
3. [x] Add Pro badge next to files/images links
4. [x] Run build and verify
5. [ ] Test in browser


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
