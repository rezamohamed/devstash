"use client";

import { type ReactElement } from "react";
import { Pin, Star, Link as LinkIcon } from "lucide-react";
import type { Item, Tag } from "@/features/items/types/item";

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

interface ItemCardProps {
  item: Item;
  tags: Tag[];
  iconComponent: React.ElementType;
  iconColor: string;
  onToggleFavorite?: (id: string) => void;
  onTogglePin?: (id: string) => void;
}

export function ItemCard({
  item,
  tags,
  iconComponent: Icon,
  iconColor: color,
  onToggleFavorite,
  onTogglePin,
}: ItemCardProps) {
  const isSnippet = item.contentType === "TEXT" && item.content;
  const isCommand = item.itemTypeId === "type_command";
  const isLink = item.contentType === "URL";

  const itemTags = item.tagIds
    .slice(0, 2)
    .map(tagId => tags.find(t => t.id === tagId))
    .filter((t): t is Tag => t !== undefined);

  return (
    <div
      className="item-card rounded-xl p-5 border cursor-pointer flex flex-col h-full relative"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-color)",
        transition: "border-color 0.15s, transform 0.15s",
      }}
    >
      <div
        className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
        style={{ backgroundColor: color }}
      />
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon style={{ width: "12px", height: "12px", color }} />
          </div>
          <h4
            className="truncate"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {item.title}
          </h4>
          {item.isPinned && (
            <Pin
              style={{ width: "12px", height: "12px", color: "var(--accent-color)", cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin?.(item.id);
              }}
            />
          )}
        </div>
        <button
          className="w-7 h-7 rounded flex items-center justify-center shrink-0 transition-colors"
          style={{ color: item.isFavorite ? "#eab308" : "var(--text-muted)" }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(item.id);
          }}
        >
          <Star style={{ width: "14px", height: "14px", fill: item.isFavorite ? "#eab308" : "none" }} />
        </button>
      </div>

      {/* Description */}
      {item.description && (
        <p
          className="mb-3"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            lineHeight: 1.4,
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
            backgroundColor: "var(--bg-sidebar)",
            border: "1px solid var(--border-color)",
            color: "#60a5fa",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            lineHeight: 1.5,
            maxHeight: "80px",
            whiteSpace: "pre",
          }}
        >
          {item.content.slice(0, 150)}
        </div>
      )}

      {isCommand && item.content && (
        <div
          className="rounded-md p-2.5 mb-3 flex items-center gap-2"
          style={{
            backgroundColor: "var(--bg-sidebar)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
          }}
        >
          <span style={{ color: "var(--color-command)", fontWeight: 600 }}>$</span>
          <span className="truncate">{item.content.split("\n")[0]}</span>
        </div>
      )}

      {isLink && item.url && (
        <div
          className="rounded-md p-3 mb-3 flex items-center gap-2"
          style={{
            backgroundColor: "var(--bg-sidebar)",
            border: "1px solid var(--border-color)",
            color: "var(--color-link)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
          }}
        >
          <LinkIcon style={{ width: "14px", height: "14px" }} />
          <span className="truncate">{item.url}</span>
        </div>
      )}

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-2 mt-auto"
        style={{ borderTop: "1px solid var(--border-color)" }}
      >
        <div className="flex items-center gap-1.5">
          {itemTags.map(tag => (
            <span
              key={tag.id}
              className="rounded"
              style={{
                backgroundColor: "var(--bg-sidebar)",
                border: "1px solid var(--border-color)",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 500,
                padding: "2px 6px",
              }}
            >
              #{tag.name}
            </span>
          ))}
        </div>
        <span
          style={{
            color: "var(--text-muted)",
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: 500,
          }}
        >
          {formatDate(item.updatedAt)}
        </span>
      </div>
    </div>
  );
}
