import type { User } from "@/features/users/types/user";
import { getSql } from "@/lib/db/sql";

export async function getUser(userId: string): Promise<User | null> {
  const sql = getSql();
  const users = await sql`
    SELECT "id", "email", "name", "image", "isPro"
    FROM "User"
    WHERE "id" = ${userId}
    LIMIT 1
  `;
  const user = (users as User[])[0];

  if (!user) return null;

  return {
    id: user.id,
    email: user.email || "",
    name: user.name,
    image: user.image,
    isPro: user.isPro,
  };
}

export async function getFirstUser(): Promise<User | null> {
  const sql = getSql();
  const users = await sql`
    SELECT "id", "email", "name", "image", "isPro"
    FROM "User"
    ORDER BY "createdAt" ASC
    LIMIT 1
  `;
  const user = (users as User[])[0];

  if (!user) return null;

  return {
    id: user.id,
    email: user.email || "",
    name: user.name,
    image: user.image,
    isPro: user.isPro,
  };
}
