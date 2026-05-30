# Current Feature

## Status

<!-- Not Started|In Progress|Complete -->

In Progress

## Feature

Profile Page — user info, stats, change password, delete account

## Goals

- [x] Create `/profile` route with auth protection
- [x] Display user info: avatar, name, email, member since
- [x] Show usage stats: total items, total collections, breakdown by type
- [x] Change password (email/password users only)
- [x] Delete account with confirmation

## Technical Approach

- Server Component page with auth check via BetterAuth
- Raw SQL via `getSql()` for user stats queries
- Client Components for interactive forms/dialogs
- Direct SQL cascade deletion for account removal

### Env Vars

<!-- None required -->

### Implementation Steps

- [x] Create `src/features/profile/data/profile.ts` with `getUserStats()` and `hasPasswordAccount()`
- [x] Create `src/app/profile/page.tsx` Server Component
- [x] Create `src/features/profile/components/ProfileView.tsx` Client Component
- [x] Create `src/features/profile/components/ChangePasswordForm.tsx` Client Component
- [x] Create `src/features/profile/components/DeleteAccountDialog.tsx` Client Component
- [x] Create `src/app/api/profile/change-password/route.ts` API route
- [x] Create `src/app/api/profile/delete-account/route.ts` API route
- [x] Profile link already exists in sidebar dropdown
- [x] Verify build passes

### Register Flow

<!-- N/A -->

### Verification Email Page

<!-- N/A -->

## Notes

- Avatar: Use existing `UserAvatar` component (GitHub or initials)
- Change password only for email/password users (check `Account` table with `providerId = 'credential'`)
- Delete account: Direct SQL cascade via user deletion (PostgreSQL FK cascade handles items/collections)
- Item type breakdown uses existing `ItemType` data

## History

- **2026-05-30** — Email Verification on Registration completed — switched register route from createUser to signUpEmail so BetterAuth properly triggers sendVerificationEmail via Resend
- **2026-05-30** — Auth Phase 3 (Auth UI - Sign In, Register & Sign Out) completed
- **2026-05-30** — Auth Phase 3 (Auth UI - Sign In, Register & Sign Out) started
- **2026-05-30** — Auth Phase 2 (Email/Password Provider) completed — added BetterAuth email/password registration API, aligned schema to BetterAuth, updated seed to use createUser
- **2026-05-30** — Auth Phase 1 (BetterAuth Setup) completed — installed better-auth + prisma adapter, created auth.ts, API route, middleware; kysely@0.28.17 required for compatibility
- **2026-05-29** — Code Quality Quick Wins completed — replaced magic number with MS_PER_DAY constant, added defensive handling to getInitials(), removed unused viewMode prop
- **2026-05-29** — Add Pro Badge To Sidebar completed — created badge component with pro variant, added to files/images links in sidebar
- **2026-05-28** — Stats & Sidebar from Database completed — sidebar now fetches item types, collections, current user from DB; item types ordered and capitalized
- **2026-05-28** — Dashboard Items from Database completed — items and tags now fetched from Neon PostgreSQL via Prisma (src/features/items/data/items.ts)
- **2026-05-28** — Dashboard Collections from Database completed — collections now fetched from Neon PostgreSQL via Prisma
- **2026-05-28** — Dashboard UI Phase 3 completed — Stats cards, Recent Collections, Pinned Items, Recent Items list
- **2026-05-27** — Dashboard UI Phase 2 completed — Collapsible sidebar, items/types navigation, favorites, pinned, collections, user avatar
- **2026-05-27** — Dashboard UI Phase 2 started
- **2026-05-27** — Dashboard UI Phase 1 completed
- **2026-05-27** — Dashboard UI Phase 1 started
- **2026-05-27** — Initial Next.js and Tailwind CSS setup, added project documentation, configured context files, pushed to GitHub
