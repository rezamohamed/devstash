import { prisma } from "@/lib/prisma";
import type { Item, Tag, ItemType } from "@/features/items/types/item";

export type ItemWithDetails = Item;

export async function getRecentItems(limit = 50): Promise<ItemWithDetails[]> {
  const items = await prisma.item.findMany({
    include: {
      itemType: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: limit,
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    contentType: item.contentType,
    content: item.content,
    fileUrl: item.fileUrl,
    fileName: item.fileName,
    url: item.url,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    language: item.language,
    itemTypeId: item.itemTypeId,
    tagIds: item.tags.map((t) => t.tagId),
    collectionIds: [],
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
}

export async function getPinnedItems(): Promise<ItemWithDetails[]> {
  const items = await prisma.item.findMany({
    where: {
      isPinned: true,
    },
    include: {
      itemType: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    contentType: item.contentType,
    content: item.content,
    fileUrl: item.fileUrl,
    fileName: item.fileName,
    url: item.url,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    language: item.language,
    itemTypeId: item.itemTypeId,
    tagIds: item.tags.map((t) => t.tagId),
    collectionIds: [],
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
}

export async function getAllTags(): Promise<Tag[]> {
  const tags = await prisma.tag.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return tags.map((tag) => ({
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
  const itemTypes = await prisma.itemType.findMany();

  return itemTypes
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
