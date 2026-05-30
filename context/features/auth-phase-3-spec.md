# Auth UI - Sign In, Register & Sign Out

## Overview

Replace BetterAuth default pages with custom UI. Update user icon, email and username in bottom of sidebar.

## Requirements

### Sign In Page (`/sign-in`)

- Email and password input fields
- "Sign in with GitHub" button
- Link to register page
- Form validation and error display
- Use `authClient` from `better-auth/react`

### Register Page (`/register`)

- Name, email, password fields
- Form validation (email format, password requirements)
- Submit to `/api/auth/register` (see phase 2)
- Redirect to sign-in on success

### Bottom Of Sidebar

- Display user avatar (GitHub image or initials fallback)
- Display user name
- Dropdown on avatar click with "Sign out" link
- Clicking on the icon should go to "/profile"

## Client Auth Setup

```ts
// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
});
```

## Server Session (Server Components)

```ts
// src/lib/auth.ts
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// In a server component or server action:
const session = await auth.api.getSession({
  headers: await headers(),
});
// session.user has id, name, email, image
```

## Sign-In Component

```tsx
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await authClient.signIn.email({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  const handleGitHubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* email/password fields */}
      <button type="submit">Sign in</button>
      <button type="button" onClick={handleGitHubSignIn}>
        Sign in with GitHub
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

## Sign-Out

```tsx
// In sidebar dropdown:
const handleSignOut = async () => {
  await authClient.signOut();
  window.location.href = "/sign-in";
};
```

## Avatar Logic

- If user has `image` (from GitHub): use that
- Otherwise: generate initials from name (e.g., "Brad Traversy" → "BT")

### getInitials Utility

```ts
export function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
```

### Avatar Component

```tsx
interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ src, name, size = "md" }: AvatarProps) {
  const sizeClass = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  }[size];

  if (src) {
    return (
      <img src={src} alt={name ?? "Avatar"} className={`rounded-full object-cover ${sizeClass}`} />
    );
  }

  return (
    <div className={`rounded-full bg-muted flex items-center justify-center ${sizeClass}`}>
      {getInitials(name)}
    </div>
  );
}
```

## Session in Sidebar

The sidebar is a server component — use `auth.api.getSession()`:

```tsx
// src/features/dashboard/components/sidebar.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function Sidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <aside>
      {/* ... nav items ... */}
      <div className="flex items-center gap-2">
        <Avatar src={session?.user.image} name={session?.user.name} />
        <span>{session?.user.name}</span>
      </div>
      {/* dropdown with sign-out */}
    </aside>
  );
}
```

## Testing

1. Go to `/sign-in` - verify custom page renders
2. Sign in with GitHub - verify flow works
3. Sign in with email/password - verify flow works
4. Verify avatar shows in sidebar (GitHub image or initials)
5. Click avatar - verify dropdown appears
6. Click "Sign out" - verify logout and redirect
7. Go to `/register` - create new account - verify redirect to sign-in

## References

- [Better Auth React Client](https://better-auth.com/docs/client/react)
- [Sign In Methods](https://better-auth.com/docs/authentication/email-password#sign-in)
- [Session Management](https://better-auth.com/docs/reference/options#session-management)
