import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Sidebar, MobileSidebar } from "@/components/dashboard/sidebar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar - 64px height per design spec */}
      <header
        className="sticky top-0 z-50 flex h-16 items-center gap-4 px-6 border-b"
        style={{
          backgroundColor: 'var(--bg-main)',
          borderColor: 'var(--border-color)'
        }}
      >
        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <MobileSidebar />
          <span
            className="text-base font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            DevStash
          </span>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex flex-1 items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 h-10 rounded-lg"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>

        {/* Mobile search */}
        <div className="flex md:hidden flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-xs">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 h-9 rounded-lg"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>

        {/* New Item button with gradient */}
        <Button
          size="sm"
          className="gap-2 h-9 rounded-lg text-white"
          style={{ background: 'var(--accent-gradient)' }}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Item</span>
        </Button>
      </header>

      <div className="flex flex-1">
        {/* Desktop sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main area */}
        <main
          className="flex-1 p-6"
          style={{ backgroundColor: 'var(--bg-main)' }}
        >
          <div className="space-y-6 max-w-5xl">
            {/* Welcome section */}
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                Welcome to DevStash
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
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
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
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
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
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
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
        </main>
      </div>
    </div>
  );
}
