# Auth Credentials - Email/Password Provider

## Overview

Add email/password authentication with registration using BetterAuth's built-in emailAndPassword provider. bcrypt is configured in `auth.ts`, not used directly in the registration route.

## Requirements

- bcryptjs for hashing (configure in auth.ts, not in route handler)
- User model already has `password String?` field — no migration needed
- Enable `emailAndPassword` provider in `auth.ts`
- Create registration API route at `/api/auth/register`

## Registration API Route

`POST /api/auth/register`

```ts
// src/app/api/auth/register/route.ts
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  // Validate input
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are required" },
      { status: 400 }
    );
  }

  // Check if user already exists
  const existingUser = await auth.api.getUserByEmail({ body: { email } });
  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 409 }
    );
  }

  // Create user — password hashing is handled by auth.ts config
  const user = await auth.api.createUser({
    body: { name, email, password },
  });

  return NextResponse.json({ success: true, user }, { status: 201 });
}
```

## Notes

### bcrypt Configuration in auth.ts

Password hashing is configured once in `auth.ts` via `emailAndPassword.password`:

```ts
import bcrypt from "bcrypt";

export const auth = betterAuth({
  // ... other config
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => await bcrypt.hash(password, 10),
      verify: async ({ hash, password }) => await bcrypt.compare(password, hash),
    },
  },
});
```

### Key API Methods

- `auth.api.createUser({ body: { name, email, password } })` — creates user with hashed password
- `auth.api.signIn.emailPassword({ body: { email, password } })` — sign-in (handled by Better Auth's built-in endpoint)
- `auth.api.getUserByEmail({ body: { email } })` — check if user exists

### User Model

The User model already has `password String?` field from the initial Prisma schema. No migration needed.

## Testing

1. Register via curl:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123"}'
```

2. Go to `/sign-in`
3. Sign in with email/password
4. Verify redirect to home page
5. Verify GitHub OAuth still works

## References

- [Email/Password Provider](https://better-auth.com/docs/authentication/email-password)
- [Password Hashing Config](https://better-auth.com/docs/reference/options#password)
