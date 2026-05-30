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

  const { currentPassword, newPassword } = await request.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { error: "Current password and new password are required" },
      { status: 400 }
    );
  }

  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters" },
      { status: 400 }
    );
  }

  // Verify current password
  const sql = getSql();
  const accounts = (await sql`
    SELECT "password"
    FROM "Account"
    WHERE "userId" = ${session.user.id} AND "providerId" = 'credential'
    LIMIT 1
  `) as { password: string | null }[];

  if (accounts.length === 0) {
    return NextResponse.json({ error: "No password account found" }, { status: 400 });
  }

  const account = accounts[0];

  if (!account.password) {
    return NextResponse.json({ error: "No password set" }, { status: 400 });
  }

  const isValid = await bcrypt.compare(currentPassword, account.password);

  if (!isValid) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
  }

  // Hash new password and update
  const newHash = await bcrypt.hash(newPassword, 10);

  await sql`
    UPDATE "Account"
    SET "password" = ${newHash}, "updatedAt" = NOW()
    WHERE "userId" = ${session.user.id} AND "providerId" = 'credential'
  `;

  return NextResponse.json({ success: true });
}
