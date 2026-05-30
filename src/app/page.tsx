import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { getRecentCollections } from "@/features/collections/data/collections";
import { getRecentItems, getAllTags, getItemTypes } from "@/features/items/data/items";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const [recentCollections, items, tags, itemTypes] = await Promise.all([
    getRecentCollections(6),
    getRecentItems(50),
    getAllTags(),
    getItemTypes(),
  ]);

  return (
    <DashboardShell
      recentCollections={recentCollections}
      items={items}
      tags={tags}
      itemTypes={itemTypes}
      user={
        session?.user
          ? {
              id: session.user.id,
              name: session.user.name ?? null,
              email: session.user.email,
              image: session.user.image ?? null,
            }
          : null
      }
    />
  );
}
