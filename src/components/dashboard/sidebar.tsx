"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Code,
  Sparkles,
  StickyNote,
  Terminal,
  Link as LinkIcon,
  File,
  Image,
  Star,
  Clock,
  Menu,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { currentUser, itemTypes, collections, items } from "@/lib/mock-data";

const iconMap: Record<string, React.ElementType> = {
  Code,
  Sparkles,
  StickyNote,
  Terminal,
  Link: LinkIcon,
  File,
  Image,
};

function SidebarContent() {
  const pathname = usePathname();

  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const recentItems = [...items]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: 'var(--bg-sidebar)' }}>
      {/* Header */}
      <div
        className="flex h-16 items-center justify-between px-4 border-b"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <span className="text-base font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          DevStash
        </span>
      </div>

      {/* Scrollable content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Items/Types */}
          <div>
            <div className="flex items-center justify-between mb-3 px-2">
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Items
              </span>
            </div>
            <nav className="space-y-1">
              {itemTypes.map((type) => {
                const Icon = iconMap[type.icon] || Code;
                const href = `/items/${type.name.toLowerCase()}s`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={type.id}
                    href={href}
                    className={`nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150 ${
                      isActive
                        ? "text-accent-foreground"
                        : "hover:text-accent-foreground"
                    }`}
                    style={{
                      backgroundColor: isActive ? 'var(--sidebar-accent)' : 'transparent',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    <Icon
                      className="h-4 w-4 shrink-0"
                      style={{ color: type.color }}
                    />
                    <span>{type.name}s</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <Separator style={{ backgroundColor: 'var(--border-color)' }} />

          {/* Favorites */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-2">
              <Star className="h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Favorites
              </span>
            </div>
            <nav className="space-y-1">
              {favoriteCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.id}`}
                  className="nav-item flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-150 hover:text-accent-foreground"
                  style={{
                    color: 'var(--text-secondary)',
                  }}
                >
                  <div
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ background: 'var(--accent-gradient)' }}
                  />
                  <span className="truncate">{collection.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <Separator style={{ backgroundColor: 'var(--border-color)' }} />

          {/* Recent */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-2">
              <Clock className="h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Recent
              </span>
            </div>
            <nav className="space-y-1">
              {recentItems.map((item) => {
                const type = itemTypes.find((t) => t.id === item.itemTypeId);
                const Icon = type ? iconMap[type.icon] || Code : Code;
                return (
                  <Link
                    key={item.id}
                    href={`/items/${item.id}`}
                    className="nav-item flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-150 hover:text-accent-foreground"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Icon
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: type?.color }}
                    />
                    <span className="truncate">{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </ScrollArea>

      {/* User avatar at bottom */}
      <div
        className="border-t p-4"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-3">
          <Avatar
            className="h-9 w-9"
            style={{ background: 'var(--accent-gradient)' }}
          >
            <AvatarFallback
              className="text-xs font-medium"
              style={{ color: 'white' }}
            >
              {currentUser.name ? getInitials(currentUser.name) : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-medium truncate"
              style={{ color: 'var(--text-primary)' }}
            >
              {currentUser.name || "User"}
            </p>
            <p
              className="text-xs truncate"
              style={{ color: 'var(--text-muted)' }}
            >
              {currentUser.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SidebarProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed = false, onCollapsedChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onCollapsedChange?.(newState);
  };

  if (isCollapsed) {
    return (
      <aside
        className="flex flex-col h-full border-r sidebar-transition"
        style={{
          width: 'var(--sidebar-collapsed-width)',
          backgroundColor: 'var(--bg-sidebar)',
          borderColor: 'var(--border-color)'
        }}
      >
        <div
          className="flex h-16 items-center justify-center border-b"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <Tooltip>
            <TooltipTrigger
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-150 cursor-pointer hover:opacity-80"
              onClick={handleToggle}
              style={{ color: 'var(--text-secondary)' }}
            >
              <ChevronRight className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent side="right">Expand sidebar</TooltipContent>
          </Tooltip>
        </div>
        <div className="flex-1 flex flex-col items-center py-4 gap-2">
          {itemTypes.map((type) => {
            const Icon = iconMap[type.icon] || Code;
            return (
              <Tooltip key={type.id}>
                <TooltipTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-150 hover:opacity-80">
                  <Link href={`/items/${type.name.toLowerCase()}s`}>
                    <Icon className="h-5 w-5" style={{ color: type.color }} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{type.name}s</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </aside>
    );
  }

  return (
    <aside
      className="flex flex-col h-full border-r sidebar-transition"
      style={{
        width: 'var(--sidebar-width)',
        backgroundColor: 'var(--bg-sidebar)',
        borderColor: 'var(--border-color)'
      }}
    >
      <div
        className="flex h-16 items-center justify-between px-4 border-b"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <span
          className="text-base font-semibold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        >
          DevStash
        </span>
        <Tooltip>
          <TooltipTrigger
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-150 cursor-pointer hover:opacity-80"
            onClick={handleToggle}
            style={{ color: 'var(--text-secondary)' }}
          >
            <ChevronLeft className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent side="right">Collapse sidebar</TooltipContent>
        </Tooltip>
      </div>
      <SidebarContent />
    </aside>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-150 hover:opacity-80"
        style={{ color: 'var(--text-secondary)' }}
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[260px] p-0"
        style={{ backgroundColor: 'var(--bg-sidebar)' }}
      >
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}

export { SidebarContent };
