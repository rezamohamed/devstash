import { prisma } from "@/lib/prisma";
import type { Item, Tag } from "@/features/items/types/item";

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
