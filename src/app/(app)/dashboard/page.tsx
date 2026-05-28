import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { getRecentCollections } from "@/lib/db/collections";
import { items, tags } from "@/features/dashboard/mock/mock-data";

export default async function DashboardPage() {
  const recentCollections = await getRecentCollections(6);

  return (
    <DashboardShell
      recentCollections={recentCollections}
      items={items}
      tags={tags}
    />
  );
}
