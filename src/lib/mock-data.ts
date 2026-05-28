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

export type Collection = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
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

export type User = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  isPro: boolean;
};

// Current logged in user
export const currentUser: User = {
  id: "user_1",
  email: "reza@taprobanelabs.com",
  name: "Reza Mohamed",
  image: null,
  isPro: true,
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

// Collections
export const collections: Collection[] = [
  { id: "col_1", name: "React Patterns", description: "Reusable React component patterns", isFavorite: true },
  { id: "col_2", name: "AI Prompt Engineering", description: "Prompts for GPT, Claude, and Gemini", isFavorite: false },
  { id: "col_3", name: "DevOps Scripts", description: "Deployment and infrastructure scripts", isFavorite: false },
  { id: "col_4", name: "Interview Prep", description: "Coding interview questions and answers", isFavorite: false },
];

// Items
export const items: Item[] = [
  {
    id: "item_1",
    title: "useAuth Hook Implementation",
    description: "Custom React hook for handling authentication state with NextAuth",
    contentType: "TEXT",
    content: "export function useAuth() {\n  const [session, setSession] = useState<Session | null>(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    // Auth logic here\n  }, []);\n\n  return { session, loading };\n}",
    fileUrl: null,
    fileName: null,
    url: null,
    isFavorite: true,
    isPinned: false,
    language: "typescript",
    itemTypeId: "type_snippet",
    tagIds: ["tag_1", "tag_2", "tag_6"],
    collectionIds: ["col_1"],
    createdAt: new Date("2026-05-26T10:00:00"),
    updatedAt: new Date("2026-05-26T10:00:00"),
  },
  {
    id: "item_2",
    title: "Claude Code System Prompt",
    description: "System prompt for Claude Code CLI agent",
    contentType: "TEXT",
    content: "You are Claude Code, an AI assistant that helps developers build software...\n\nWhen writing code:\n- Follow the project's existing patterns\n- Use TypeScript for type safety\n- Write tests for new functionality",
    fileUrl: null,
    fileName: null,
    url: null,
    isFavorite: true,
    isPinned: true,
    language: null,
    itemTypeId: "type_prompt",
    tagIds: ["tag_4"],
    collectionIds: ["col_2"],
    createdAt: new Date("2026-05-25T14:30:00"),
    updatedAt: new Date("2026-05-25T14:30:00"),
  },
  {
    id: "item_3",
    title: "Database Migration Commands",
    description: "Essential Prisma migration commands for production deployments",
    contentType: "TEXT",
    content: "# Always use migrate dev for development\nnpx prisma migrate dev\n\n# Use migrate deploy for production\nnpx prisma migrate deploy\n\n# Never use db push in production",
    fileUrl: null,
    fileName: null,
    url: null,
    isFavorite: false,
    isPinned: false,
    language: "bash",
    itemTypeId: "type_command",
    tagIds: ["tag_3", "tag_8"],
    collectionIds: ["col_3"],
    createdAt: new Date("2026-05-24T09:15:00"),
    updatedAt: new Date("2026-05-24T09:15:00"),
  },
  {
    id: "item_4",
    title: "Prisma Schema Best Practices",
    description: "Notes on designing Prisma schemas for scalability",
    contentType: "TEXT",
    content: "# Schema Design Principles\n\n1. Use meaningful relation names\n2. Index frequently queried fields\n3. Consider data isolation per user\n4. Use enums for fixed sets",
    fileUrl: null,
    fileName: null,
    url: null,
    isFavorite: false,
    isPinned: false,
    language: "markdown",
    itemTypeId: "type_note",
    tagIds: ["tag_3", "tag_4", "tag_8"],
    collectionIds: [],
    createdAt: new Date("2026-05-23T16:45:00"),
    updatedAt: new Date("2026-05-23T16:45:00"),
  },
  {
    id: "item_5",
    title: "Next.js Documentation",
    description: "Official Next.js documentation link",
    contentType: "URL",
    content: null,
    fileUrl: null,
    fileName: null,
    url: "https://nextjs.org/docs",
    isFavorite: false,
    isPinned: false,
    language: null,
    itemTypeId: "type_link",
    tagIds: ["tag_1", "tag_4"],
    collectionIds: [],
    createdAt: new Date("2026-05-22T11:00:00"),
    updatedAt: new Date("2026-05-22T11:00:00"),
  },
  {
    id: "item_6",
    title: "React Component Boilerplate",
    description: "Standard React component template with TypeScript",
    contentType: "TEXT",
    content: "import { useState } from 'react';\n\ninterface Props {\n  title: string;\n}\n\nexport function MyComponent({ title }: Props) {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <h1>{title}</h1>\n      <button onClick={() => setCount(c => c + 1)}>\n        Count: {count}\n      </button>\n    </div>\n  );\n}",
    fileUrl: null,
    fileName: null,
    url: null,
    isFavorite: true,
    isPinned: false,
    language: "typescript",
    itemTypeId: "type_snippet",
    tagIds: ["tag_1", "tag_2", "tag_4", "tag_5"],
    collectionIds: ["col_1"],
    createdAt: new Date("2026-05-21T08:30:00"),
    updatedAt: new Date("2026-05-21T08:30:00"),
  },
  {
    id: "item_7",
    title: "Deployment Checklist",
    description: "Pre-deployment checklist for Next.js apps",
    contentType: "TEXT",
    content: "- [ ] Run `npm run build` successfully\n- [ ] Check environment variables\n- [ ] Verify database migrations\n- [ ] Test API endpoints\n- [ ] Enable rate limiting\n- [ ] Set up monitoring",
    fileUrl: null,
    fileName: null,
    url: null,
    isFavorite: false,
    isPinned: false,
    language: "markdown",
    itemTypeId: "type_note",
    tagIds: ["tag_1", "tag_7"],
    collectionIds: ["col_3"],
    createdAt: new Date("2026-05-20T13:00:00"),
    updatedAt: new Date("2026-05-20T13:00:00"),
  },
  {
    id: "item_8",
    title: "Tailwind Setup Guide",
    description: "Configuring Tailwind CSS v4 with Next.js",
    contentType: "TEXT",
    content: "import type { Config } from 'tailwindcss';\n\nexport default {\n  content: ['./src/**/*.{js,ts,jsx,tsx}'],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n} satisfies Config;",
    fileUrl: null,
    fileName: null,
    url: null,
    isFavorite: false,
    isPinned: false,
    language: "typescript",
    itemTypeId: "type_snippet",
    tagIds: ["tag_4", "tag_5"],
    collectionIds: [],
    createdAt: new Date("2026-05-19T10:00:00"),
    updatedAt: new Date("2026-05-19T10:00:00"),
  },
];
