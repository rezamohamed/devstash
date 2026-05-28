import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { getRecentCollections } from "@/lib/db/collections";
import { getRecentItems, getAllTags } from "@/lib/db/items";

export default async function DashboardPage() {
  const [recentCollections, items, tags] = await Promise.all([
    getRecentCollections(6),
    getRecentItems(50),
    getAllTags(),
  ]);

  return (
    <DashboardShell
      recentCollections={recentCollections}
      items={items}
      tags={tags}
    />
  );
}
