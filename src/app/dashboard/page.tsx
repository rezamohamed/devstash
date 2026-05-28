import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-muted"
            />
          </div>
        </div>
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          New Item
        </Button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar placeholder */}
        <aside className="w-64 border-r bg-muted/30 p-4">
          <h2>Sidebar</h2>
        </aside>

        {/* Main area */}
        <main className="flex-1 p-4">
          <h2>Main</h2>
        </main>
      </div>
    </div>
  );
}
