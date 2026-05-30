import type { Item, Tag, ItemType } from "@/features/items/types/item";
import { getSql, toDate, toStringArray } from "@/lib/sql";

export type ItemWithDetails = Item;

type ItemRow = {
  id: string;
  title: string;
  description: string | null;
  contentType: Item["contentType"];
  content: string | null;
  fileUrl: string | null;
  fileName: string | null;
  url: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  language: string | null;
  itemTypeId: string;
  tagIds: unknown;
  collectionIds: unknown;
  createdAt: Date | string;
  updatedAt: Date | string;
};

function mapItem(row: ItemRow): ItemWithDetails {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    contentType: row.contentType,
    content: row.content,
    fileUrl: row.fileUrl,
    fileName: row.fileName,
    url: row.url,
    isFavorite: row.isFavorite,
    isPinned: row.isPinned,
    language: row.language,
    itemTypeId: row.itemTypeId,
    tagIds: toStringArray(row.tagIds),
    collectionIds: toStringArray(row.collectionIds),
    createdAt: toDate(row.createdAt),
    updatedAt: toDate(row.updatedAt),
  };
}

export async function getRecentItems(limit = 50): Promise<ItemWithDetails[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT
      i."id",
      i."title",
      i."description",
      i."contentType",
      i."content",
      i."fileUrl",
      i."fileName",
      i."url",
      i."isFavorite",
      i."isPinned",
      i."language",
      i."itemTypeId",
      i."createdAt",
      i."updatedAt",
      COALESCE(array_agg(DISTINCT item_tag."tagId") FILTER (WHERE item_tag."tagId" IS NOT NULL), '{}') AS "tagIds",
      COALESCE(array_agg(DISTINCT item_collection."collectionId") FILTER (WHERE item_collection."collectionId" IS NOT NULL), '{}') AS "collectionIds"
    FROM "Item" i
    LEFT JOIN "ItemTag" item_tag ON item_tag."itemId" = i."id"
    LEFT JOIN "ItemCollection" item_collection ON item_collection."itemId" = i."id"
    GROUP BY i."id"
    ORDER BY i."updatedAt" DESC
    LIMIT ${limit}
  `;

  return (rows as ItemRow[]).map(mapItem);
}

export async function getPinnedItems(): Promise<ItemWithDetails[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT
      i."id",
      i."title",
      i."description",
      i."contentType",
      i."content",
      i."fileUrl",
      i."fileName",
      i."url",
      i."isFavorite",
      i."isPinned",
      i."language",
      i."itemTypeId",
      i."createdAt",
      i."updatedAt",
      COALESCE(array_agg(DISTINCT item_tag."tagId") FILTER (WHERE item_tag."tagId" IS NOT NULL), '{}') AS "tagIds",
      COALESCE(array_agg(DISTINCT item_collection."collectionId") FILTER (WHERE item_collection."collectionId" IS NOT NULL), '{}') AS "collectionIds"
    FROM "Item" i
    LEFT JOIN "ItemTag" item_tag ON item_tag."itemId" = i."id"
    LEFT JOIN "ItemCollection" item_collection ON item_collection."itemId" = i."id"
    WHERE i."isPinned" = true
    GROUP BY i."id"
    ORDER BY i."updatedAt" DESC
  `;

  return (rows as ItemRow[]).map(mapItem);
}

export async function getAllTags(): Promise<Tag[]> {
  const sql = getSql();
  const tags = await sql`
    SELECT "id", "name"
    FROM "Tag"
    ORDER BY "name" ASC
  `;

  return (tags as Tag[]).map((tag) => ({
    id: tag.id,
    name: tag.name,
  }));
}

const ITEM_TYPE_ORDER = [
  "snippet",
  "prompt",
  "command",
  "note",
  "file",
  "image",
  "link",
];

export async function getItemTypes(): Promise<ItemType[]> {
  const sql = getSql();
  const itemTypes = await sql`
    SELECT "id", "name", "icon", "color", "isSystem"
    FROM "ItemType"
  `;

  return (itemTypes as ItemType[])
    .map((type) => ({
      id: type.id,
      name: type.name,
      icon: type.icon,
      color: type.color,
      isSystem: type.isSystem,
    }))
    .sort((a, b) => {
      const aIndex = ITEM_TYPE_ORDER.indexOf(a.name.toLowerCase());
      const bIndex = ITEM_TYPE_ORDER.indexOf(b.name.toLowerCase());
      const aPos = aIndex === -1 ? 999 : aIndex;
      const bPos = bIndex === -1 ? 999 : bIndex;
      return aPos - bPos;
    });
}
