import { prisma } from "@/lib/prisma";

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

export async function getRecentCollections(limit = 6): Promise<CollectionWithDetails[]> {
  const collections = await prisma.collection.findMany({
    include: {
      items: {
        include: {
          item: {
            include: {
              itemType: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: limit,
  });

  const now = new Date();

  return collections.map((collection) => {
    const items = collection.items.map((ic) => ic.item);

    // Count content types
    const contentTypeCount: Record<string, number> = {};
    const typeColors: string[] = [];

    for (const item of items) {
      const typeName = item.itemType.name;
      contentTypeCount[typeName] = (contentTypeCount[typeName] || 0) + 1;
      if (!typeColors.includes(item.itemType.color)) {
        typeColors.push(item.itemType.color);
      }
    }

    // Find most used content type
    let mostUsedContentType = "snippet";
    let maxCount = 0;
    for (const [type, count] of Object.entries(contentTypeCount)) {
      if (count > maxCount) {
        maxCount = count;
        mostUsedContentType = type;
      }
    }

    // Calculate days since last update
    const diffMs = now.getTime() - collection.updatedAt.getTime();
    const modifiedDaysAgo = Math.floor(diffMs / 86400000);

    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      isFavorite: collection.isFavorite,
      itemCount: items.length,
      mostUsedContentType,
      typeColors,
      modifiedDaysAgo,
    };
  });
}

export async function getCollections() {
  return getRecentCollections(50);
}
