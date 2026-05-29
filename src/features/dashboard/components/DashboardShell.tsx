"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Terminal, Sun, Grid, List } from "lucide-react";
import { Sidebar, MobileSidebar } from "@/features/dashboard/components/sidebar";
import { ItemCard } from "@/features/dashboard/components/ItemCard";
import { CollectionCard } from "@/features/dashboard/components/CollectionCard";
import { getItemTypeIcon, getItemTypeColor } from "@/features/items/utils/item-types";
import type { Item, Tag, ItemType } from "@/features/items/types/item";
import type { CollectionWithDetails } from "@/lib/db/collections";
import type { User } from "@/features/users/types/user";

interface DashboardShellProps {
  recentCollections: CollectionWithDetails[];
  items: Item[];
  tags: Tag[];
  itemTypes: ItemType[];
  currentUser: User | null;
}

export function DashboardShell({
  recentCollections,
  items,
  tags,
  itemTypes,
  currentUser,
}: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex h-screen" style={{ backgroundColor: "var(--bg-main)" }}>
      {/* Left Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        items={items}
        itemTypes={itemTypes}
        collections={recentCollections}
        currentUser={currentUser}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full" style={{ overflow: "hidden" }}>
        {/* Top Header Bar */}
        <header
          className="h-16 border-b flex items-center justify-between gap-4 px-6 shrink-0"
          style={{
            backgroundColor: "rgba(9, 11, 14, 0.3)",
            backdropFilter: "blur(12px)",
            borderColor: "var(--border-color)",
          }}
        >
          {/* Left side: Mobile menu + Search */}
          <div className="flex items-center gap-3 flex-1">
            <div className="flex md:hidden">
              <MobileSidebar
                items={items}
                itemTypes={itemTypes}
                collections={recentCollections}
                currentUser={currentUser}
              />
            </div>

            {/* Search bar */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: "var(--text-muted)" }}
              />
              <Input
                type="search"
                placeholder="Instant retrieval across snippets, tags, collections..."
                className="pl-10 h-9 rounded-lg"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                }}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--border-color)",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                /
              </span>
            </div>
          </div>

          {/* Right side: Action buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 border"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-secondary)",
              }}
            >
              <Terminal className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 border"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-secondary)",
              }}
            >
              <Sun className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              className="gap-2 h-9 rounded-lg text-white shrink-0"
              style={{
                background: "var(--accent-gradient)",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Item</span>
            </Button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto" style={{ backgroundColor: "var(--bg-main)" }}>
          <div className="p-6 space-y-8">
            {/* Section: Recent Collections */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  Recent Collections
                </h2>
                <button
                  className="transition-opacity hover:opacity-80"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  View all folders
                </button>
              </div>

              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}
              >
                {recentCollections.map((collection) => (
                  <CollectionCard
                    key={collection.id}
                    collection={collection}
                  />
                ))}
              </div>
            </section>

            {/* Section: All Resources */}
            <section>
              {/* Filter bar */}
              <div
                className="flex items-center justify-between mb-4 pb-3"
                style={{ borderBottom: "1px solid var(--border-color)" }}
              >
                <h2
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  All Resources
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--text-muted)",
                    }}
                  >
                    ({items.length} items found)
                  </span>
                </h2>

                {/* View toggle */}
                <div
                  className="flex items-center p-0.5 rounded-md"
                  style={{ backgroundColor: "var(--bg-sidebar)" }}
                >
                  <button
                    className="w-7 h-7 rounded flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: viewMode === "grid" ? "var(--bg-card)" : "transparent",
                      color: "var(--text-muted)",
                      boxShadow: viewMode === "grid" ? "var(--shadow-sm)" : "none",
                    }}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid style={{ width: "14px", height: "14px" }} />
                  </button>
                  <button
                    className="w-7 h-7 rounded flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: viewMode === "list" ? "var(--bg-card)" : "transparent",
                      color: "var(--text-muted)",
                      boxShadow: viewMode === "list" ? "var(--shadow-sm)" : "none",
                    }}
                    onClick={() => setViewMode("list")}
                  >
                    <List style={{ width: "14px", height: "14px" }} />
                  </button>
                </div>
              </div>

              {/* Items grid */}
              <div
                className="grid gap-5"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}
              >
                {items.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    tags={tags}
                    iconComponent={getItemTypeIcon(item.itemTypeId)}
                    iconColor={getItemTypeColor(item.itemTypeId)}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
