export type ContentType = "TEXT" | "FILE" | "URL";

export type ItemType = {
  id: string;
  name: string;
  icon: string;
  color: string;
  isSystem: boolean;
};

export type Tag = {
  id: string;
  name: string;
};

export type Item = {
  id: string;
  title: string;
  description: string | null;
  contentType: ContentType;
  content: string | null;
  fileUrl: string | null;
  fileName: string | null;
  url: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  language: string | null;
  itemTypeId: string;
  tagIds: string[];
  collectionIds: string[];
  createdAt: Date;
  updatedAt: Date;
};

// System item types from project-overview.md
export const itemTypes: ItemType[] = [
  { id: "type_snippet", name: "Snippet", icon: "Code", color: "#3b82f6", isSystem: true },
  { id: "type_prompt", name: "Prompt", icon: "Sparkles", color: "#8b5cf6", isSystem: true },
  { id: "type_note", name: "Note", icon: "StickyNote", color: "#fde047", isSystem: true },
  { id: "type_command", name: "Command", icon: "Terminal", color: "#f97316", isSystem: true },
  { id: "type_link", name: "Link", icon: "Link", color: "#10b981", isSystem: true },
  { id: "type_file", name: "File", icon: "File", color: "#6b7280", isSystem: true },
  { id: "type_image", name: "Image", icon: "Image", color: "#ec4899", isSystem: true },
];

// Tags
export const tags: Tag[] = [
  { id: "tag_1", name: "nextjs" },
  { id: "tag_2", name: "react" },
  { id: "tag_3", name: "prisma" },
  { id: "tag_4", name: "typescript" },
  { id: "tag_5", name: "tailwind" },
  { id: "tag_6", name: "auth" },
  { id: "tag_7", name: "api" },
  { id: "tag_8", name: "database" },
];
