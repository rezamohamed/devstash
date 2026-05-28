import { Folder, Star, Code, Sparkles, Terminal, Link as LinkIcon, File, StickyNote, Image } from "lucide-react";
import type { CollectionWithDetails } from "@/lib/db/collections";

const CONTENT_TYPE_COLORS: Record<string, string> = {
  snippet: "var(--color-snippet)",
  prompt: "var(--color-prompt)",
  command: "var(--color-command)",
  note: "var(--color-note)",
  link: "var(--color-link)",
  file: "var(--color-file)",
  image: "var(--color-image)",
};

const CONTENT_TYPE_ICONS: Record<string, React.ElementType> = {
  snippet: Code,
  prompt: Sparkles,
  command: Terminal,
  note: StickyNote,
  link: LinkIcon,
  file: File,
  image: Image,
};

interface CollectionCardProps {
  collection: CollectionWithDetails;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const accentColor = CONTENT_TYPE_COLORS[collection.mostUsedContentType] ?? "var(--color-snippet)";

  return (
    <div
      className="collection-card rounded-xl p-4 border cursor-pointer flex flex-col h-full"
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
        <div className="flex items-center gap-2">
          {/* Type icons */}
          <div className="flex items-center gap-1">
            {collection.typeColors.slice(0, 4).map((color, i) => {
              const typeName = Object.entries(CONTENT_TYPE_COLORS).find(
                ([, c]) => c === color
              )?.[0] ?? "snippet";
              const Icon = CONTENT_TYPE_ICONS[typeName] ?? Code;
              return (
                <div
                  key={i}
                  className="w-5 h-5 rounded flex items-center justify-center"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon style={{ width: "10px", height: "10px", color }} />
                </div>
              );
            })}
          </div>
          {collection.isFavorite && (
            <Star style={{ width: "12px", height: "12px", color: "#eab308", fill: "#eab308" }} />
          )}
        </div>
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
        className="flex items-center justify-between mt-auto"
        style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500, fontFamily: "var(--font-sans)" }}
      >
        <span>{collection.itemCount} assets</span>
        <span>Modified {collection.modifiedDaysAgo}d ago</span>
      </div>
    </div>
  );
}
