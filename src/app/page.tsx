"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Terminal, Sun, Code, Sparkles, StickyNote, Link as LinkIcon, Pin, Star, Folder, Layers, FileText, Grid, List } from "lucide-react";
import { Sidebar, MobileSidebar } from "@/components/dashboard/sidebar";
import { currentUser, collections, items, itemTypes } from "@/lib/mock-data";

const iconMap: Record<string, React.ElementType> = {
  Code,
  Sparkles,
  StickyNote,
  Terminal,
  Link: LinkIcon,
  File: FileText,
  Image: FileText,
};

function getItemTypeIcon(typeId: string) {
  const type = itemTypes.find(t => t.id === typeId);
  if (!type) return Code;
  return iconMap[type.icon] || Code;
}

function getItemTypeColor(typeId: string): string {
  const type = itemTypes.find(t => t.id === typeId);
  return type?.color || "#6b7280";
}

function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const collectionColors = ["col-blue", "col-purple", "col-orange", "col-green"];

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const recentCollections = [...collections].slice(0, 3);

  return (
    <div className="flex h-screen" style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Left Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full" style={{ overflow: 'hidden' }}>
        {/* Top Header Bar */}
        <header
          className="h-16 border-b flex items-center justify-between gap-4 px-6 shrink-0"
          style={{
            backgroundColor: 'rgba(9, 11, 14, 0.3)',
            backdropFilter: 'blur(12px)',
            borderColor: 'var(--border-color)'
          }}
        >
          {/* Left side: Mobile menu + Search */}
          <div className="flex items-center gap-3 flex-1">
            <div className="flex md:hidden">
              <MobileSidebar />
            </div>

            {/* Search bar */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
              />
              <Input
                type="search"
                placeholder="Instant retrieval across snippets, tags, collections..."
                className="pl-10 h-9 rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px'
                }}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: 'var(--border-color)',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)'
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
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)'
              }}
            >
              <Terminal className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 border"
              style={{
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)'
              }}
            >
              <Sun className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              className="gap-2 h-9 rounded-lg text-white shrink-0"
              style={{
                background: 'var(--accent-gradient)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Item</span>
            </Button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ backgroundColor: 'var(--bg-main)' }}
        >
          <div className="p-6 space-y-8">

            {/* Section: Recent Collections */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}
                >
                  <Folder style={{ width: '18px', height: '18px', color: 'var(--color-snippet)' }} />
                  Recent Collections
                </h2>
                <button
                  className="transition-opacity hover:opacity-80"
                  style={{
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 500
                  }}
                >
                  View all folders
                </button>
              </div>

              <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
                {recentCollections.map((collection, index) => (
                  <div
                    key={collection.id}
                    className="collection-card rounded-xl p-4 border cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--border-color)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '4px',
                        height: '100%',
                        backgroundColor: index === 0 ? 'var(--color-snippet)' : index === 1 ? 'var(--color-prompt)' : 'var(--color-command)'
                      }}
                    />
                    <div className="flex items-center justify-between mb-2" style={{ color: 'var(--text-muted)' }}>
                      <Folder style={{ width: '14px', height: '14px' }} />
                      {collection.isFavorite && (
                        <Star style={{ width: '12px', height: '12px', color: '#eab308', fill: '#eab308' }} />
                      )}
                    </div>
                    <h3
                      className="mb-1"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--text-primary)'
                      }}
                    >
                      {collection.name}
                    </h3>
                    <p
                      className="mb-3"
                      style={{
                        color: 'var(--text-secondary)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '12px',
                        lineHeight: 1.4
                      }}
                    >
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between" style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500, fontFamily: 'var(--font-sans)' }}>
                      <span>{items.filter(i => i.collectionIds.includes(collection.id)).length} assets</span>
                      <span>Modified 2d ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: All Resources */}
            <section>
              {/* Filter bar */}
              <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <h2
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}
                >
                  All Resources
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--text-muted)'
                    }}
                  >
                    ({items.length} items found)
                  </span>
                </h2>

                {/* View toggle */}
                <div
                  className="flex items-center p-0.5 rounded-md"
                  style={{ backgroundColor: 'var(--bg-sidebar)' }}
                >
                  <button
                    className="w-7 h-7 rounded flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: viewMode === 'grid' ? 'var(--bg-card)' : 'transparent',
                      color: 'var(--text-muted)',
                      boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none'
                    }}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid style={{ width: '14px', height: '14px' }} />
                  </button>
                  <button
                    className="w-7 h-7 rounded flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: viewMode === 'list' ? 'var(--bg-card)' : 'transparent',
                      color: 'var(--text-muted)',
                      boxShadow: viewMode === 'list' ? 'var(--shadow-sm)' : 'none'
                    }}
                    onClick={() => setViewMode('list')}
                  >
                    <List style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </div>

              {/* Items grid */}
              <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
                {items.map((item) => {
                  const Icon = getItemTypeIcon(item.itemTypeId);
                  const color = getItemTypeColor(item.itemTypeId);
                  const isSnippet = item.contentType === "TEXT" && item.content;
                  const isCommand = item.itemTypeId === "type_command";
                  const isLink = item.contentType === "URL";

                  return (
                    <div
                      key={item.id}
                      className="item-card rounded-xl p-5 border cursor-pointer"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        borderColor: 'var(--border-color)',
                        transition: 'border-color 0.15s, transform 0.15s'
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${color}15` }}
                          >
                            <Icon style={{ width: '12px', height: '12px', color }} />
                          </div>
                          <h4
                            className="truncate"
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '14px',
                              fontWeight: 600,
                              color: 'var(--text-primary)'
                            }}
                          >
                            {item.title}
                          </h4>
                          {item.isPinned && (
                            <Pin style={{ width: '12px', height: '12px', color: 'var(--accent-color)' }} />
                          )}
                        </div>
                        <button
                          className="w-7 h-7 rounded flex items-center justify-center shrink-0 transition-colors"
                          style={{
                            color: item.isFavorite ? '#eab308' : 'var(--text-muted)'
                          }}
                        >
                          <Star style={{ width: '14px', height: '14px', fill: item.isFavorite ? '#eab308' : 'none' }} />
                        </button>
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p
                          className="mb-3"
                          style={{
                            color: 'var(--text-secondary)',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '12px',
                            lineHeight: 1.4
                          }}
                        >
                          {item.description}
                        </p>
                      )}

                      {/* Preview box */}
                      {isSnippet && item.content && (
                        <div
                          className="rounded-md p-3 mb-3 overflow-hidden"
                          style={{
                            backgroundColor: 'var(--bg-sidebar)',
                            border: '1px solid var(--border-color)',
                            color: '#60a5fa',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            lineHeight: 1.5,
                            maxHeight: '80px',
                            whiteSpace: 'pre'
                          }}
                        >
                          {item.content.slice(0, 150)}
                        </div>
                      )}

                      {isCommand && item.content && (
                        <div
                          className="rounded-md p-2.5 mb-3 flex items-center gap-2"
                          style={{
                            backgroundColor: 'var(--bg-sidebar)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px'
                          }}
                        >
                          <span style={{ color: 'var(--color-command)', fontWeight: 600 }}>$</span>
                          <span className="truncate">{item.content.split('\n')[0]}</span>
                        </div>
                      )}

                      {isLink && item.url && (
                        <div
                          className="rounded-md p-3 mb-3 flex items-center gap-2"
                          style={{
                            backgroundColor: 'var(--bg-sidebar)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--color-link)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px'
                          }}
                        >
                          <LinkIcon style={{ width: '14px', height: '14px' }} />
                          <span className="truncate">{item.url}</span>
                        </div>
                      )}

                      {/* Footer */}
                      <div
                        className="flex items-center justify-between pt-2"
                        style={{ borderTop: '1px solid var(--border-color)' }}
                      >
                        <div className="flex items-center gap-1.5">
                          {item.tagIds.slice(0, 2).map(tagId => {
                            const tag = itemTypes.find(t => t.id === tagId);
                            return (
                              <span
                                key={tagId}
                                className="rounded"
                                style={{
                                  backgroundColor: 'var(--bg-sidebar)',
                                  border: '1px solid var(--border-color)',
                                  color: 'var(--text-secondary)',
                                  fontFamily: 'var(--font-sans)',
                                  fontSize: '10px',
                                  fontWeight: 500,
                                  padding: '2px 6px'
                                }}
                              >
                                #{tag?.name || tagId}
                              </span>
                            );
                          })}
                        </div>
                        <span
                          style={{
                            color: 'var(--text-muted)',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '11px',
                            fontWeight: 500
                          }}
                        >
                          {formatDate(item.updatedAt)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
