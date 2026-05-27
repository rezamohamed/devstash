
# DevStash — Project Overview

> Version: Draft v0.1  
> Status: Early Architecture & Product Planning  
> Author: Reza / Taprobane Labs  
> Stack Direction: AI-native Developer Productivity SaaS

---

# 🚀 Vision

DevStash is a fast, searchable, AI-enhanced developer knowledge hub that centralizes the fragmented resources developers use every day.

Instead of scattering information across:
- Notion
- VS Code snippets
- GitHub gists
- AI chats
- Terminal history
- Bookmarks
- Markdown files
- Random folders

DevStash becomes the single source of truth for developer workflows.

The product sits somewhere between:
- :contentReference[oaicite:0]{index=0}
- :contentReference[oaicite:1]{index=1}
- :contentReference[oaicite:2]{index=2}
- :contentReference[oaicite:3]{index=3}
- :contentReference[oaicite:4]{index=4}

…but purpose-built specifically for developers and AI-first workflows.

---

# 🧠 Core Problem

Developers lose massive amounts of time to fragmented knowledge management.

Current developer workflows are chaotic:

| Resource      | Usually Stored In |
|---------------|-------------------|
| Snippets      | VS Code / Gists   |
| Prompts       | Chat history      |
| Commands      | Bash history      |
| Docs          | Random folders    |
| Context files | Projects          |
| Links         | Browser bookmarks |
| Notes         | Notion / Obsidian |

This creates:
- Context switching
- Lost knowledge
- Duplicate work
- Inconsistent workflows
- Poor AI prompt reuse
- Difficult onboarding between projects

---

# 🎯 Target Users

## 👨‍💻 Everyday Developer
Needs fast access to:
- snippets
- commands
- links
- notes

## 🤖 AI-First Developer
Stores:
- prompts
- system messages
- context engineering assets
- workflows

## 🎓 Content Creator / Educator
Needs reusable:
- explanations
- examples
- course notes
- tutorials

## 🛠 Full-Stack Builder
Collects:
- architecture patterns
- boilerplates
- API examples
- deployment workflows

---

# 🔥 Product Positioning

DevStash is NOT:
- another notes app
- another bookmark manager
- another docs tool

DevStash is:
> “A developer-native memory system.”

The strongest angle is likely:
- AI-first developer workflows
- speed
- contextual retrieval
- lightweight organization
- reusable knowledge

The AI-prompt-management niche alone may be large enough to build an entire product around.

---

# 🧩 Core Concepts

---

# 📦 Item Types

Items are the atomic unit of DevStash.

System item types (immutable initially):

| Type    | Content Type | Pro? | URL               |
|---------|--------------|------|-------------------|
| snippet | text         | No   | `/items/snippets` |
| prompt  | text         | No   | `/items/prompts`  |
| note    | text         | No   | `/items/notes`    |
| command | text         | No   | `/items/commands` |
| link    | url          | No   | `/items/links`    |
| file    | file         | Yes  | `/items/files`    |
| image   | file         | Yes  | `/items/images`   |

Future:
- custom item types
- schema-based types
- AI-generated types

---

# 🗂 Collections

Collections are flexible groupings of items.

An item may belong to multiple collections.

Examples:
- React Patterns
- AI Prompt Engineering
- Interview Prep
- Python Utilities
- Context Files
- Supabase Snippets

This many-to-many relationship is extremely important architecturally.

---

# 🔎 Search

Search becomes one of the MOST important features.

Must support:
- title
- content
- tags
- type
- language
- collections

Future:
- semantic vector search
- AI retrieval
- embeddings
- “search by intent”

Potential future stack:
- PostgreSQL Full Text Search
- pgvector
- Typesense
- Meilisearch

---

# 🤖 AI Features (Pro)

Initial AI functionality should remain focused and useful.

## Proposed AI Features

### Auto Tagging
Generate suggested tags automatically.

### Summaries
Summarize long notes/snippets.

### Explain This Code
Explain:
- snippets
- commands
- files

### Prompt Optimizer
Improve prompts for:
- GPT
- Claude
- Gemini
- local models

---

# ⚠️ Important Product Advice

## Do NOT overbuild AI initially.

The real value is:
- organization
- retrieval
- speed
- UX

AI should enhance the workflow — not become the workflow.

Most AI SaaS products fail because they add AI before solving the base usability problem.

---

# 🏗 Suggested MVP Scope

## Phase 1 (MVP)

ONLY build:

✅ Auth  
✅ CRUD items  
✅ Collections  
✅ Tags  
✅ Search  
✅ Favorites  
✅ Drawer UI  
✅ Markdown editor  
✅ Dark mode  
✅ File upload foundations

Avoid:
- vectors
- embeddings
- agents
- workflows
- collaboration
- browser extensions

Those can become roadmap items later.

---

# 🧱 Suggested Architecture

```text
┌─────────────────────┐
│     Next.js App     │
│  (SSR + App Router) │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│    API Routes /     │
│   Server Actions    │
└─────────┬───────────┘
          │
 ┌────────┴────────┐
 ▼                 ▼
PostgreSQL       Cloudflare R2
(Neon)           (files/images)

          ▼
       Prisma ORM

          ▼
       OpenAI APIs
````

---

# 🧬 Rough Prisma Schema Draft

> NOTE: This is intentionally a rough draft and WILL evolve.

```prisma
model User {
  id                     String   @id @default(cuid())
  email                  String   @unique
  name                   String?
  image                  String?

  isPro                  Boolean  @default(false)

  stripeCustomerId       String?
  stripeSubscriptionId   String?

  items                  Item[]
  collections            Collection[]
  itemTypes              ItemType[]

  createdAt              DateTime @default(now())
  updatedAt              DateTime @updatedAt
}

model Item {
  id              String   @id @default(cuid())

  title           String
  description     String?

  contentType     ContentType
  content         String?

  fileUrl         String?
  fileName        String?
  fileSize        Int?

  url             String?

  isFavorite      Boolean @default(false)
  isPinned        Boolean @default(false)

  language        String?

  userId          String
  user            User @relation(fields: [userId], references: [id])

  itemTypeId      String
  itemType        ItemType @relation(fields: [itemTypeId], references: [id])

  tags            ItemTag[]
  collections     ItemCollection[]

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model ItemType {
  id          String @id @default(cuid())

  name        String
  icon        String
  color       String

  isSystem    Boolean @default(false)

  userId      String?
  user        User? @relation(fields: [userId], references: [id])

  items       Item[]
}

model Collection {
  id              String @id @default(cuid())

  name            String
  description     String?

  isFavorite      Boolean @default(false)

  userId          String
  user            User @relation(fields: [userId], references: [id])

  items           ItemCollection[]

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model ItemCollection {
  itemId          String
  collectionId    String

  item            Item @relation(fields: [itemId], references: [id])
  collection      Collection @relation(fields: [collectionId], references: [id])

  addedAt         DateTime @default(now())

  @@id([itemId, collectionId])
}

model Tag {
  id          String @id @default(cuid())
  name        String @unique

  items       ItemTag[]
}

model ItemTag {
  itemId      String
  tagId       String

  item        Item @relation(fields: [itemId], references: [id])
  tag         Tag @relation(fields: [tagId], references: [id])

  @@id([itemId, tagId])
}

enum ContentType {
  TEXT
  FILE
  URL
}
```

---

# ⚠️ Database Strategy

## VERY IMPORTANT

Never use:

```bash
prisma db push
```

Use proper migrations ONLY:

```bash
prisma migrate dev
prisma migrate deploy
```

This matters enormously once production data exists.

---

# 💳 Monetization

## Free Tier

* 50 items
* 3 collections
* basic search
* text-only types
* no uploads
* no AI

## Pro Tier ($8/mo or $72/year)

* unlimited items
* unlimited collections
* file uploads
* image uploads
* AI features
* exports
* priority support

---

# 💡 Monetization Advice

$8/month may actually be too low if:

* AI costs grow
* storage grows
* embeddings arrive later

Potential future pricing:

* Free
* Pro ($10–15)
* Teams ($25–40/user)

---

# 🎨 UI / UX Direction

## Design Language

Inspired by:

* [Linear](https://linear.app?utm_source=chatgpt.com)
* [Raycast](https://www.raycast.com?utm_source=chatgpt.com)
* [Notion](https://www.notion.so?utm_source=chatgpt.com)

## Visual Priorities

* minimal
* fast
* keyboard-centric
* low cognitive load
* dev-native aesthetics

---

# 🎨 Type Colors & Icons

| Type    | Color     | Icon       |
|---------|-----------|------------|
| Snippet | `#3b82f6` | Code       |
| Prompt  | `#8b5cf6` | Sparkles   |
| Command | `#f97316` | Terminal   |
| Note    | `#fde047` | StickyNote |
| File    | `#6b7280` | File       |
| Image   | `#ec4899` | Image      |
| Link    | `#10b981` | Link       |

Suggested icon set:

* [Lucide Icons](https://lucide.dev?utm_source=chatgpt.com)

---

# 🖥 Layout Draft

```text
┌────────────────────────────────────┐
│ Sidebar │ Main Content             │
│          │                         │
│ Types    │ Collection Cards        │
│ Tags     │                         │
│ Recent   │ Item Grid               │
│ Favorites│                         │
│          │ Drawer Opens Item       │
└────────────────────────────────────┘
```

---

# ⚡ Key UX Philosophy

The product should feel:

* instant
* keyboard-first
* frictionless

If adding an item takes longer than ~3–5 seconds:
the UX is failing.

---

# 📁 Suggested Folder Structure

```text
/apps/web
  /app
  /components
  /features
  /lib
  /server
  /styles

/prisma

/packages
```

Potential future monorepo:

* web app
* browser extension
* desktop app
* CLI

---

# 🔐 Authentication

Recommended:

* [Auth.js (NextAuth v5)](https://authjs.dev?utm_source=chatgpt.com)

Providers:

* Email/password
* GitHub OAuth

Future:

* Google OAuth
* Magic links

---

# ☁️ Infrastructure

| Concern  | Recommendation                                                                            |
|----------|-------------------------------------------------------------------------------------------|
| Hosting  | [Vercel](https://vercel.com?utm_source=chatgpt.com)                                       |
| Database | [Neon](https://neon.tech?utm_source=chatgpt.com)                                          |
| Storage  | [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/?utm_source=chatgpt.com) |
| ORM      | [Prisma](https://www.prisma.io?utm_source=chatgpt.com)                                    |
| AI       | [OpenAI](https://openai.com?utm_source=chatgpt.com)                                       |
| UI       | [shadcn/ui](https://ui.shadcn.com?utm_source=chatgpt.com)                                 |

---

# 🧠 Long-Term Vision

Potential future expansions:

## Browser Extension

Save snippets/prompts instantly.

## Desktop App

Raycast-like launcher.

## VS Code Extension

Quick save + retrieve snippets.

## AI Workspace Memory

Persistent project memory for AI coding workflows.

## Team Workspaces

Shared organizational knowledge.

## AI Semantic Retrieval

Natural language search across everything.

---

# 🚨 Biggest Product Risks

## 1. Becoming “just another notes app”

You must aggressively focus on:

* speed
* developer workflows
* AI workflows
* retrieval

## 2. Overbuilding too early

Do not build:

* agents
* workflows
* collaboration
* semantic memory
  before the core UX is excellent.

## 3. Weak retention loop

The product needs:

* daily utility
* instant retrieval
* low-friction capture

Without that, retention dies.

---

# ✅ Recommended Initial Build Order

## Phase 1

* auth
* item CRUD
* collections
* tags
* search
* drawer UI

## Phase 2

* markdown editor
* uploads
* favorites/pinning
* keyboard shortcuts

## Phase 3

* AI features
* exports
* semantic search

## Phase 4

* browser extension
* desktop app
* VS Code extension

---
