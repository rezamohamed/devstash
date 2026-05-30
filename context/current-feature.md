# Current Feature

## Status

<!-- Not Started|In Progress|Complete -->

In Progress

## Feature

Email Verification on Registration — Users receive a verification email via Resend after signing up and must click a link to verify before signing in.

## Goals

- User receives a verification email after registering
- Email contains a link that verifies the user's email address
- User cannot sign in until email is verified
- Verification link expires after a reasonable window (e.g., 24 hours)
- Resend API key is in `.env` as `RESEND_API_KEY`
- `NEXT_PUBLIC_APP_URL` is available for building verification URLs

## Technical Approach

### BetterAuth Email Verification

BetterAuth supports email verification via the `sendVerificationEmail` option in the auth config:

```ts
emailVerification: {
  sendVerificationEmail: async ({ user, url, token }) => {
    // Use Resend to send the email
  },
  expiresAt: 24 * 60 * 60 // 24 hours
}
```

### Required Env Vars

```
RESEND_API_KEY=re_...    # Already in .env
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Already in .env
```

### Implementation Steps

1. Install Resend SDK: `npm install resend`
2. Create `src/lib/email.ts` with Resend client and `sendVerificationEmail` helper
3. Update `src/lib/auth.ts` to add `emailVerification` config with Resend
4. Ensure user record has `emailVerified` field updated on verification
5. BetterAuth automatically handles verification token generation and verification API route

### Register Flow

1. User submits name/email/password at `/register`
2. `/api/auth/register` creates the user (BetterAuth handles this via `auth.api.createUser`)
3. BetterAuth sends verification email via Resend automatically
4. User clicks link → BetterAuth verifies and sets `emailVerified: true`
5. User can now sign in

### Verification Email Page

Optionally create a `/verify-email` page that shows a "check your email" message after registration.

## Notes

- Resend SDK: `npm install resend`
- Resend API key already in `.env` as `RESEND_API_KEY`
- `NEXT_PUBLIC_APP_URL` already set to `http://localhost:3000`
- BetterAuth's email verification plugin handles token generation and verification flow automatically
- See BetterAuth docs: https://better-auth.com/docs/authentication/email-verification

## History
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
