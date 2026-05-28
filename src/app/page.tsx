import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { items, collections, tags } from "@/lib/mock-data";

export default function Home() {
  const recentCollections = [...collections].slice(0, 3);

  return (
    <DashboardShell
      recentCollections={recentCollections}
      items={items}
      tags={tags}
    />
  );
}
