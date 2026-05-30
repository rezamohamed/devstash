import { getSql, toDate } from "@/lib/sql";

export type UserProfileStats = {
  totalItems: number;
  totalCollections: number;
  itemTypeBreakdown: ItemTypeCount[];
  createdAt: Date;
};

export type ItemTypeCount = {
  itemTypeId: string;
  name: string;
  icon: string;
  color: string;
  count: number;
};

export async function getUserStats(userId: string): Promise<UserProfileStats> {
  const sql = getSql();

  const [itemStatsResult, collectionStatsResult, userRowResult, breakdownRowsResult] = await Promise.all([
    sql`
      SELECT COUNT(*) as "totalItems"
      FROM "Item"
      WHERE "userId" = ${userId}
    `,
    sql`
      SELECT COUNT(*) as "totalCollections"
      FROM "Collection"
      WHERE "userId" = ${userId}
    `,
    sql`
      SELECT "createdAt"
      FROM "User"
      WHERE "id" = ${userId}
    `,
    sql`
      SELECT
        it."id" as "itemTypeId",
        it."name",
        it."icon",
        it."color",
        COUNT(i."id") as "count"
      FROM "ItemType" it
      LEFT JOIN "Item" i ON i."itemTypeId" = it."id" AND i."userId" = ${userId}
      GROUP BY it."id", it."name", it."icon", it."color"
      ORDER BY it."name" ASC
    `,
  ]);

  const itemStats = itemStatsResult as { totalItems: bigint | number }[];
  const collectionStats = collectionStatsResult as { totalCollections: bigint | number }[];
  const userRow = userRowResult as { createdAt: Date }[];
  const breakdownRows = breakdownRowsResult as ItemTypeCount[];

  return {
    totalItems: Number(itemStats[0]?.totalItems ?? 0),
    totalCollections: Number(collectionStats[0]?.totalCollections ?? 0),
    itemTypeBreakdown: breakdownRows.map((row) => ({
      ...row,
      count: Number(row.count),
    })),
    createdAt: toDate(userRow[0]?.createdAt ?? new Date()),
  };
}

export async function hasPasswordAccount(userId: string): Promise<boolean> {
  const sql = getSql();

  const accounts = (await sql`
    SELECT "password"
    FROM "Account"
    WHERE "userId" = ${userId} AND "providerId" = 'credential'
    LIMIT 1
  `) as { password: string | null }[];

  if (accounts.length === 0) {
    return false;
  }

  const account = accounts[0];
  return account.password != null && account.password.length > 0;
}
