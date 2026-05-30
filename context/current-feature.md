# Current Feature

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Feature

Auth Phase 2 — Email/Password Provider

## Goals

- [x] Enable `emailAndPassword` provider in `auth.ts` with bcrypt hash/verify
- [x] Create `POST /api/auth/register` route handler
- [x] Build passes
- [x] Register a new user via curl
- [x] Sign in via BetterAuth API endpoint (UI pages not yet created)
- [ ] Verify GitHub OAuth still works

## Notes

- bcryptjs for hashing configured in auth.ts (not in route handler)
- admin plugin added to auth.ts to enable `auth.api.createUser`
- Schema fixes: `emailVerified` changed to Boolean, added `role`/`banned`, Account/Session models aligned to BetterAuth schema
- Sign-in endpoint: `POST /api/auth/sign-in/email`
- UI pages (`/sign-in`, `/register`) not yet created — only API routes

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
