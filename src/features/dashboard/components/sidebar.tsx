"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Code,
  Star,
  Menu,
  X,
  LayoutDashboard,
  Pin,
  LogOut,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { iconMap } from "@/features/items/utils/item-types";
import { UserAvatar } from "@/components/avatar";
import { authClient } from "@/lib/auth-client";
import type { Item, ItemType } from "@/features/items/types/item";
import type { CollectionWithDetails } from "@/features/collections/data/collections";

interface SidebarContentProps {
  showCloseButton?: boolean;
  isCollapsed?: boolean;
  items: Item[];
  itemTypes: ItemType[];
  collections: CollectionWithDetails[];
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  } | null;
}

function SidebarContent({
  showCloseButton = false,
  isCollapsed = false,
  items,
  itemTypes,
  collections,
  user,
}: SidebarContentProps) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/sign-in";
  };

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: "var(--bg-sidebar)" }}>
      {/* Mobile Header with Logo and Close button */}
      {showCloseButton && (
        <div
          className="h-14 px-4 flex items-center justify-between border-b"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="logo-icon w-7 h-7 rounded-md flex items-center justify-center"
              style={{
                background: "var(--accent-gradient)",
                boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "white",
                }}
              >
                D
              </span>
            </div>
            <span
              className="logo-text"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 700,
                background: "var(--accent-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DevStash
            </span>
          </div>
          <SheetClose
            className="w-8 h-8 rounded-md flex items-center justify-center transition-all duration-150 hover:opacity-80"
            style={{ color: "var(--text-muted)" }}
          >
            <X style={{ width: "18px", height: "18px" }} />
          </SheetClose>
        </div>
      )}

      {/* Scrollable content */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-5">
          {/* Nav Section: Directory */}
          <div>
            <div className="mb-1 px-2">
              <span
                className="nav-section-title"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                }}
              >
                Directory
              </span>
            </div>
            <nav className="space-y-0.5">
              {/* All Resources */}
              <Link
                href="/"
                className={`nav-item ${pathname === "/" ? "active" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: pathname === "/" ? 600 : 500,
                  color:
                    pathname === "/"
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                  backgroundColor:
                    pathname === "/" ? "var(--border-color)" : "transparent",
                  textDecoration: "none",
                  position: "relative",
                  transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <LayoutDashboard
                    style={{ width: "16px", height: "16px", color: "var(--text-muted)" }}
                  />
                  <span>All Resources</span>
                </span>
                <span
                  className="nav-item-badge"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "10px",
                    fontWeight: 600,
                    backgroundColor: "var(--border-color)",
                    color: "var(--text-muted)",
                    padding: "2px 6px",
                    borderRadius: "10px",
                  }}
                >
                  {items.length}
                </span>
                {pathname === "/" && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "6px",
                      bottom: "6px",
                      width: "3px",
                      borderRadius: "0 4px 4px 0",
                      background: "var(--accent-gradient)",
                    }}
                  />
                )}
              </Link>
              {/* Favorites */}
              <Link
                href="/favorites"
                className="nav-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Star style={{ width: "16px", height: "16px", color: "#eab308" }} />
                  <span>Favorites</span>
                </span>
                <span
                  className="nav-item-badge"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "10px",
                    fontWeight: 600,
                    backgroundColor: "var(--border-color)",
                    color: "var(--text-muted)",
                    padding: "2px 6px",
                    borderRadius: "10px",
                  }}
                >
                  {items.filter((i) => i.isFavorite).length}
                </span>
              </Link>
              {/* Pinned */}
              <Link
                href="/pinned"
                className="nav-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Pin
                    style={{ width: "16px", height: "16px", color: "var(--color-snippet)" }}
                  />
                  <span>Pinned</span>
                </span>
                <span
                  className="nav-item-badge"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "10px",
                    fontWeight: 600,
                    backgroundColor: "var(--border-color)",
                    color: "var(--text-muted)",
                    padding: "2px 6px",
                    borderRadius: "10px",
                  }}
                >
                  {items.filter((i) => i.isPinned).length}
                </span>
              </Link>
            </nav>
          </div>

          <Separator style={{ backgroundColor: "var(--border-color)" }} />

          {/* Nav Section: Resource Types */}
          <div>
            <div className="mb-1 px-2">
              <span
                className="nav-section-title"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                }}
              >
                Resource Types
              </span>
            </div>
            <nav className="space-y-0.5">
              {itemTypes.map((type) => {
                const Icon = iconMap[type.icon] || Code;
                const href = `/items/${type.name.toLowerCase()}s`;
                const isActive = pathname === href;
                const count = items.filter((i) => i.itemTypeId === type.id).length;
                return (
                  <Link
                    key={type.id}
                    href={href}
                    className={`nav-item ${isActive ? "active" : ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 10px",
                      borderRadius: "6px",
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      backgroundColor: isActive ? "var(--border-color)" : "transparent",
                      textDecoration: "none",
                      position: "relative",
                      transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Icon style={{ width: "16px", height: "16px", color: type.color }} />
                      <span>
                        {type.name.charAt(0).toUpperCase() + type.name.slice(1)}s
                      </span>
                      {(type.name === "file" || type.name === "image") && (
                        <Badge variant="pro" className="text-[9px] px-1 py-0 h-4">
                          Pro
                        </Badge>
                      )}
                    </span>
                    <span
                      className="nav-item-badge"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "10px",
                        fontWeight: 600,
                        backgroundColor: "var(--border-color)",
                        color: "var(--text-muted)",
                        padding: "2px 6px",
                        borderRadius: "10px",
                      }}
                    >
                      {count}
                    </span>
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "6px",
                          bottom: "6px",
                          width: "3px",
                          borderRadius: "0 4px 4px 0",
                          background: "var(--accent-gradient)",
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <Separator style={{ backgroundColor: "var(--border-color)" }} />

          {/* Nav Section: Collections */}
          <div>
            <div className="mb-1 px-2 flex items-center justify-between">
              <span
                className="nav-section-title"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                }}
              >
                Collections
              </span>
              <Link
                href="/collections"
                className="text-xs transition-opacity hover:opacity-80"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  textDecoration: "none",
                }}
              >
                View all
              </Link>
            </div>
            <nav className="space-y-0.5">
              {collections.slice(0, 5).map((collection) => {
                const isFavorite = collection.isFavorite;
                const typeColor = collection.typeColors[0] || "var(--border-color)";
                return (
                  <Link
                    key={collection.id}
                    href={`/collections/${collection.id}`}
                    className="nav-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 10px",
                      borderRadius: "6px",
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {isFavorite ? (
                        <Star
                          style={{
                            width: "16px",
                            height: "16px",
                            color: "#eab308",
                            fill: "#eab308",
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "4px",
                            backgroundColor: typeColor,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      )}
                      <span className="truncate">{collection.name}</span>
                    </span>
                    <span
                      className="nav-item-badge"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "10px",
                        fontWeight: 600,
                        backgroundColor: "var(--border-color)",
                        color: "var(--text-muted)",
                        padding: "2px 6px",
                        borderRadius: "10px",
                      }}
                    >
                      {collection.itemCount}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </ScrollArea>

      {/* User profile at bottom */}
      <div
        className="border-t p-3"
        style={{ borderColor: "var(--border-color)" }}
      >
        {user ? (
          /* Signed in: avatar with dropdown */
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              className="w-full flex items-center gap-3 p-1.5 rounded-md transition-colors cursor-pointer hover:bg-[var(--border-color)]"
              style={{ backgroundColor: "transparent" }}
            >
              <UserAvatar
                src={user.image}
                name={user.name}
                size="sm"
              />
              <div className="flex-1 min-w-0 text-left">
                <p
                  className="profile-name"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.name || "User"}
                </p>
              </div>
            </button>

            {dropdownOpen && (
              <div
                className="absolute bottom-full left-0 right-0 mb-1 py-1 rounded-lg border shadow-lg"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                }}
              >
                <Link
                  href="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-[var(--border-color)]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                  }}
                >
                  <User style={{ width: "14px", height: "14px" }} />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleSignOut();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-[var(--border-color)]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "#ef4444",
                    textDecoration: "none",
                  }}
                >
                  <LogOut style={{ width: "14px", height: "14px" }} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Not signed in */
          <Link
            href="/sign-in"
            className="flex items-center gap-2 p-1.5 rounded-md transition-colors hover:bg-[var(--border-color)]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-primary)",
              textDecoration: "none",
            }}
          >
            <UserAvatar name="Guest" size="sm" />
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}

interface SidebarProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  items: Item[];
  itemTypes: ItemType[];
  collections: CollectionWithDetails[];
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  } | null;
}

export function Sidebar({
  collapsed = false,
  onCollapsedChange,
  items,
  itemTypes,
  collections,
  user,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onCollapsedChange?.(newState);
  };

  if (isCollapsed) {
    return (
      <aside
        className="flex flex-col h-full border-r shrink-0"
        style={{
          width: "var(--sidebar-collapsed-width)",
          backgroundColor: "var(--bg-sidebar)",
          borderColor: "var(--border-color)",
          transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className="h-16 flex items-center justify-center"
          style={{ borderBottom: "1px solid var(--border-color)" }}
        >
          <Tooltip>
            <TooltipTrigger
              className="w-8 h-8 rounded-md flex items-center justify-center transition-all duration-150 hover:opacity-80 cursor-pointer"
              onClick={handleToggle}
              style={{ color: "var(--text-muted)" }}
            >
              <ChevronRight style={{ width: "18px", height: "18px" }} />
            </TooltipTrigger>
            <TooltipContent side="right">Expand sidebar</TooltipContent>
          </Tooltip>
        </div>
        <div className="flex-1 flex flex-col items-center py-3 gap-1">
          {itemTypes.map((type) => {
            const Icon = iconMap[type.icon] || Code;
            return (
              <Tooltip key={type.id}>
                <TooltipTrigger
                  className="w-9 h-9 rounded-md flex items-center justify-center transition-all duration-150 hover:opacity-80"
                  style={{ cursor: "pointer" }}
                >
                  <Link href={`/items/${type.name.toLowerCase()}s`}>
                    <Icon style={{ width: "18px", height: "18px", color: type.color }} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {type.name.charAt(0).toUpperCase() + type.name.slice(1)}s
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </aside>
    );
  }

  return (
    <aside
      className="flex flex-col h-full border-r shrink-0"
      style={{
        width: "var(--sidebar-width)",
        backgroundColor: "var(--bg-sidebar)",
        borderColor: "var(--border-color)",
        transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Sidebar Header with Logo */}
      <div
        className="h-16 px-5 flex items-center justify-between shrink-0"
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="logo-icon w-7 h-7 rounded-md flex items-center justify-center"
            style={{
              background: "var(--accent-gradient)",
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: 800,
                color: "white",
              }}
            >
              D
            </span>
          </div>
          <span
            className="logo-text"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: 700,
              background: "var(--accent-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DevStash
          </span>
        </div>
        <Tooltip>
          <TooltipTrigger
            className="w-8 h-8 rounded-md flex items-center justify-center transition-all duration-150 hover:opacity-80 cursor-pointer"
            onClick={handleToggle}
            style={{ color: "var(--text-muted)" }}
          >
            <ChevronLeft style={{ width: "18px", height: "18px" }} />
          </TooltipTrigger>
          <TooltipContent side="right">Collapse sidebar (Ctrl+B)</TooltipContent>
        </Tooltip>
      </div>

      <SidebarContent
        isCollapsed={isCollapsed}
        items={items}
        itemTypes={itemTypes}
        collections={collections}
        user={user}
      />
    </aside>
  );
}

interface MobileSidebarProps {
  items: Item[];
  itemTypes: ItemType[];
  collections: CollectionWithDetails[];
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  } | null;
}

export function MobileSidebar({
  items,
  itemTypes,
  collections,
  user,
}: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150 hover:opacity-80"
        style={{ color: "var(--text-secondary)" }}
      >
        <Menu style={{ width: "20px", height: "20px" }} />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[260px] p-0"
        style={{ backgroundColor: "var(--bg-sidebar)" }}
      >
        <SidebarContent
          showCloseButton
          items={items}
          itemTypes={itemTypes}
          collections={collections}
          user={user}
        />
      </SheetContent>
    </Sheet>
  );
}

export { SidebarContent };
