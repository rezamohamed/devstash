import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { getSql } from "@/lib/sql";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { password } = await request.json().catch(() => ({}));

  const sql = getSql();

  // Check if user has a password account (email/password user)
  const accounts = (await sql`
    SELECT "password"
    FROM "Account"
    WHERE "userId" = ${session.user.id} AND "providerId" = 'credential'
    LIMIT 1
  `) as { password: string | null }[];

  const hasPasswordAccount = accounts.length > 0;

  if (hasPasswordAccount) {
    // Email/password user — verify password before deletion
    const account = accounts[0];

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    if (!account.password) {
      return NextResponse.json({ error: "No password set" }, { status: 400 });
    }

    const isValid = await bcrypt.compare(password, account.password);

    if (!isValid) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 400 });
    }
  }

  // Delete user — cascade will handle items, collections, sessions, accounts
  await sql`
    DELETE FROM "User" WHERE "id" = ${session.user.id}
  `;

  return NextResponse.json({ success: true });
}
