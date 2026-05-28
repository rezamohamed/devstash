"use client";

import { Folder, Star } from "lucide-react";
import type { Collection } from "@/features/collections/types/collection";

const COLLECTION_ACCENT_COLORS = [
  "var(--color-snippet)",
  "var(--color-prompt)",
  "var(--color-command)",
  "var(--color-link)",
];

interface CollectionCardProps {
  collection: Collection;
  itemCount: number;
  accentColorIndex: number;
  modifiedDaysAgo?: number;
}

export function CollectionCard({
  collection,
  itemCount,
  accentColorIndex,
  modifiedDaysAgo = 2,
}: CollectionCardProps) {
  const accentColor = COLLECTION_ACCENT_COLORS[accentColorIndex % COLLECTION_ACCENT_COLORS.length];

  return (
    <div
      className="collection-card rounded-xl p-4 border cursor-pointer"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-color)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "4px",
          height: "100%",
          backgroundColor: accentColor,
        }}
      />
      <div className="flex items-center justify-between mb-2" style={{ color: "var(--text-muted)" }}>
        <Folder style={{ width: "14px", height: "14px" }} />
        {collection.isFavorite && (
          <Star style={{ width: "12px", height: "12px", color: "#eab308", fill: "#eab308" }} />
        )}
      </div>
      <h3
        className="mb-1"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "14px",
          fontWeight: 600,
          color: "var(--text-primary)",
        }}
      >
        {collection.name}
      </h3>
      <p
        className="mb-3"
        style={{
          color: "var(--text-secondary)",
          fontFamily: "var(--font-sans)",
          fontSize: "12px",
          lineHeight: 1.4,
        }}
      >
        {collection.description}
      </p>
      <div
        className="flex items-center justify-between"
        style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500, fontFamily: "var(--font-sans)" }}
      >
        <span>{itemCount} assets</span>
        <span>Modified {modifiedDaysAgo}d ago</span>
      </div>
    </div>
  );
}
