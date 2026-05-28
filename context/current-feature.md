# Current Feature

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Feature: Seed Demo Data

### Requirements (from @context/features/seed-spec.md)
- Create demo user with email/password
- Create system item types (7 types: snippet, prompt, command, note, file, image, link)
- Create 5 collections with items:
  - React Patterns (3 snippets)
  - AI Workflows (3 prompts)
  - DevOps (1 snippet, 1 command, 2 links)
  - Terminal Commands (4 commands)
  - Design Resources (4 links)

### Steps
1. Update prisma/seed.ts with full demo data
2. Run seed script
3. Verify data in database

## Feature: Neon Postgres + Prisma Setup

### Requirements (from @context/features/database-spec.md)
- Use Neon PostgreSQL (serverless)
- Create initial schema based on data models in project-overview.md
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Use Prisma 7 (has breaking changes - follow upgrade guide)
- Use migrations only (never use `prisma db push`)
- Development branch for DATABASE_URL and production branch separate

### Steps
1. Create a new branch `feature/database-setup`
2. Install Prisma and configure for Neon PostgreSQL
3. Create initial schema with NextAuth models and data models from project-overview.md
4. Create and run initial migration
5. Test connection
6. Verify build passes
7. Merge to main and delete branch

## History

- **2026-05-28** — Dashboard UI Phase 3 completed — Stats cards, Recent Collections, Pinned Items, Recent Items list
- **2026-05-27** — Dashboard UI Phase 2 completed — Collapsible sidebar, items/types navigation, favorites, pinned, collections, user avatar
- **2026-05-27** — Dashboard UI Phase 2 started
- **2026-05-27** — Dashboard UI Phase 1 completed
- **2026-05-27** — Dashboard UI Phase 1 started
- **2026-05-27** — Initial Next.js and Tailwind CSS setup, added project documentation, configured context files, pushed to GitHub

## History

- **2026-05-27** — Dashboard UI Phase 2 completed — Collapsible sidebar, items/types navigation, favorites, pinned, collections, user avatar
- **2026-05-27** — Dashboard UI Phase 2 started
- **2026-05-27** — Dashboard UI Phase 1 completed
- **2026-05-27** — Dashboard UI Phase 1 started
- **2026-05-27** — Initial Next.js and Tailwind CSS setup, added project documentation, configured context files, pushed to GitHub
