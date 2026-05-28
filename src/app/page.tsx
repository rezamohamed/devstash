import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { getRecentCollections } from "@/lib/db/collections";
import { getRecentItems, getAllTags, getItemTypes } from "@/lib/db/items";
import { getFirstUser } from "@/lib/db/users";

export default async function DashboardPage() {
  const [recentCollections, items, tags, itemTypes, currentUser] = await Promise.all([
    getRecentCollections(6),
    getRecentItems(50),
    getAllTags(),
    getItemTypes(),
    getFirstUser(),
  ]);

  return (
    <DashboardShell
      recentCollections={recentCollections}
      items={items}
      tags={tags}
      itemTypes={itemTypes}
      currentUser={currentUser}
    />
  );
}
