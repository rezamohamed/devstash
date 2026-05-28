"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Menu, Terminal, Sun } from "lucide-react";
import { Sidebar, MobileSidebar } from "@/components/dashboard/sidebar";

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
            {/* Mobile menu button */}
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
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Item</span>
            </Button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div
          className="flex-1 overflow-y-auto p-6"
          style={{ backgroundColor: 'var(--bg-main)' }}
        >
          <div className="space-y-8 max-w-5xl">
            {/* Welcome section */}
            <div>
              <h1
                className="text-2xl font-bold"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-primary)'
                }}
              >
                Welcome back
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Your developer knowledge hub
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div
                className="collection-card rounded-xl p-6 border"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <h3
                  className="text-base font-semibold"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--text-primary)'
                  }}
                >
                  Getting Started
                </h3>
                <p
                  className="mt-2 text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Start adding your snippets, prompts, commands, and more.
                </p>
              </div>
              <div
                className="collection-card rounded-xl p-6 border"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <h3
                  className="text-base font-semibold"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--text-primary)'
                  }}
                >
                  Collections
                </h3>
                <p
                  className="mt-2 text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Organize your items into collections for easy access.
                </p>
              </div>
              <div
                className="collection-card rounded-xl p-6 border"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <h3
                  className="text-base font-semibold"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--text-primary)'
                  }}
                >
                  Search
                </h3>
                <p
                  className="mt-2 text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Quickly find anything using the search bar above.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
