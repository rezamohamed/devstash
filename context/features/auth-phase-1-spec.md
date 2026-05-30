# Auth Setup - BetterAuth + Email/Password

## Overview

Set up BetterAuth with Prisma adapter and email/password authentication.

## Requirements

- Install BetterAuth (`better-auth`) and `@better-auth/prisma-adapter`
- Set up auth config pattern for edge compatibility
- Protect `/dashboard/*` routes using Next.js middleware
- Redirect unauthenticated users to sign-in

## Files to Create

1. `src/lib/auth.ts` - Full auth config with Prisma adapter
2. `src/app/api/auth/[...betterauth]/route.ts` - Export handlers via `toNextJsHandler`
3. `src/middleware.ts` - Route protection with `getSessionCookie`

## auth.ts Structure

```ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => await bcrypt.hash(password, 10),
      verify: async ({ hash, password }) => await bcrypt.compare(password, hash),
    },
  },
});
```

**Note:** Use `provider: "postgresql"` matching your database, not `"sqlite"`.

## Route Handler

`src/app/api/auth/[...betterauth]/route.ts`:

```ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

## Middleware

`src/middleware.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  if (sessionCookie && ["/sign-in", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!sessionCookie && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/register"],
};
```

## Environment Variables

One `.env` file for local development. Production env vars are set via your hosting platform (Vercel, Railway, etc.).

### .env (committed to repo)

```env
BETTER_AUTH_SECRET=        # min 32 chars: openssl rand -base64 32
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production

Set `NEXT_PUBLIC_APP_URL` in your hosting platform's env vars:

- `NEXT_PUBLIC_APP_URL=https://yourdomain.com`
- `BETTER_AUTH_SECRET=<same secret from .env.local>`

Sessions are domain-specific (localhost cookies won't work on production), so the same secret works across environments.

### auth.ts (server-side)

```ts
export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  // ...
});
```

### auth-client.ts (client-side)

```ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});
```

## Key Gotchas

- **Single auth file**: No separate `auth.config.ts` — all config in `src/lib/auth.ts`
- **Single URL var**: `NEXT_PUBLIC_APP_URL` is used for both server (`auth.ts`) and client (`authClient`)
- **Model names**: Better Auth uses Prisma model names (e.g., `"User"`, not `"users"`)
- **Hashing**: bcrypt config goes inside `emailAndPassword.password`, not at top level
- **Middleware cookie**: Use `getSessionCookie` from `better-auth/cookies`, not manual cookie parsing
- **Database provider**: Set correct provider (`"postgresql"`, `"mysql"`, or `"sqlite"`) matching your Prisma config

## Testing

1. Run `npx @better-auth/cli@latest migrate` to apply schema
2. Go to `/dashboard` - should redirect to sign-in
3. Sign in with email/password (test credentials created in phase 2)
4. Verify redirect back to `/dashboard` after auth

## References

- [Better Auth Installation](https://better-auth.com/docs/installation)
- [Prisma Adapter](https://better-auth.com/docs/database-adapters/prisma)
- [Email/Password Provider](https://better-auth.com/docs/authentication/email-password)
- [Next.js Integration](https://better-auth.com/docs/integrations/next)
