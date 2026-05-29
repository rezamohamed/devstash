import { getSql, toDate } from "@/lib/db/sql";

export type CollectionWithDetails = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  mostUsedContentType: string;
  typeColors: string[];
  modifiedDaysAgo: number;
};

type CollectionRow = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  updatedAt: Date | string;
  itemId: string | null;
  itemTypeName: string | null;
  itemTypeColor: string | null;
};

export async function getRecentCollections(limit = 6): Promise<CollectionWithDetails[]> {
  const sql = getSql();
  const rows = await sql`
    WITH recent_collections AS (
      SELECT *
      FROM "Collection"
      ORDER BY "updatedAt" DESC
      LIMIT ${limit}
    )
    SELECT
      collection."id",
      collection."name",
      collection."description",
      collection."isFavorite",
      collection."updatedAt",
      item."id" AS "itemId",
      item_type."name" AS "itemTypeName",
      item_type."color" AS "itemTypeColor"
    FROM recent_collections collection
    LEFT JOIN "ItemCollection" item_collection ON item_collection."collectionId" = collection."id"
    LEFT JOIN "Item" item ON item."id" = item_collection."itemId"
    LEFT JOIN "ItemType" item_type ON item_type."id" = item."itemTypeId"
    ORDER BY collection."updatedAt" DESC
  `;
  const now = new Date();
  const collections = new Map<string, CollectionRow[]>();

  for (const row of rows as CollectionRow[]) {
    collections.set(row.id, [...(collections.get(row.id) ?? []), row]);
  }

  return Array.from(collections.values()).map((collectionRows) => {
    const collection = collectionRows[0];
    const contentTypeCount: Record<string, number> = {};
    const typeColors: string[] = [];
    const itemIds = new Set<string>();

    for (const row of collectionRows) {
      if (!row.itemId || !row.itemTypeName || !row.itemTypeColor) continue;

      itemIds.add(row.itemId);
      contentTypeCount[row.itemTypeName] = (contentTypeCount[row.itemTypeName] || 0) + 1;
      if (!typeColors.includes(row.itemTypeColor)) {
        typeColors.push(row.itemTypeColor);
      }
    }

    let mostUsedContentType = "snippet";
    let maxCount = 0;
    for (const [type, count] of Object.entries(contentTypeCount)) {
      if (count > maxCount) {
        maxCount = count;
        mostUsedContentType = type;
      }
    }

    const diffMs = now.getTime() - toDate(collection.updatedAt).getTime();
    const modifiedDaysAgo = Math.floor(diffMs / 86400000);

    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      isFavorite: collection.isFavorite,
      itemCount: itemIds.size,
      mostUsedContentType,
      typeColors,
      modifiedDaysAgo,
    };
  });
}

export async function getCollections() {
  return getRecentCollections(50);
}
