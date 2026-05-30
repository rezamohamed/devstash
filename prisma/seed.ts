import { prisma } from "../src/lib/prisma";
import { auth } from "../src/lib/auth";

// ============================================
// Seed Data
// ============================================

const DEMO_USER_PASSWORD = "password123";

const SYSTEM_ITEM_TYPES = [
  { name: "snippet", icon: "Code", color: "#3b82f6", isSystem: true },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6", isSystem: true },
  { name: "command", icon: "Terminal", color: "#f97316", isSystem: true },
  { name: "note", icon: "StickyNote", color: "#fde047", isSystem: true },
  { name: "file", icon: "File", color: "#6b7280", isSystem: true },
  { name: "image", icon: "Image", color: "#ec4899", isSystem: true },
  { name: "link", icon: "Link", color: "#10b981", isSystem: true },
];

const DEMO_USER = {
  email: "demo@devstash.io",
  name: "Demo User",
  isPro: false,
};

const COLLECTIONS = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    items: [
      {
        title: "useDebounce Hook",
        contentType: "TEXT" as const,
        content: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
        language: "TypeScript",
        itemType: "snippet",
        isFavorite: true,
      },
      {
        title: "useLocalStorage Hook",
        contentType: "TEXT" as const,
        content: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}`,
        language: "TypeScript",
        itemType: "snippet",
        isFavorite: false,
      },
      {
        title: "Context Provider Pattern",
        contentType: "TEXT" as const,
        content: `import { createContext, useContext, useReducer, ReactNode } from 'react';

interface State {
  count: number;
}

type Action = { type: 'increment' } | { type: 'decrement' };

const CounterContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function CounterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
}

function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}`,
        language: "TypeScript",
        itemType: "snippet",
        isFavorite: true,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    items: [
      {
        title: "Code Review Prompt",
        contentType: "TEXT" as const,
        content: `You are a senior software engineer conducting a thorough code review. Analyze the following code for:

1. **Correctness** - Are there any逻辑错误 or edge cases?
2. **Performance** - Any efficiency concerns or N+1 queries?
3. **Security** - Vulnerabilities, injection risks, or data exposure?
4. **Readability** - Clear naming, appropriate comments, clean structure?
5. **Best Practices** - Does it follow the language/framework conventions?

Code to review:
\`\`\`
{{CODE}}
\`\`\`

Provide a structured review with:
- Summary of findings
- Issues grouped by severity (Critical/Major/Minor)
- Specific recommendations with code examples where helpful`,
        itemType: "prompt",
        isFavorite: true,
      },
      {
        title: "Documentation Generator",
        contentType: "TEXT" as const,
        content: `You are a technical documentation writer. Generate comprehensive documentation for the following code.

Generate output in Markdown format with these sections:
1. Overview - What the code does and its purpose
2. Installation/Setup - Any prerequisites or configuration needed
3. Usage - Code examples with explanations
4. API Reference - All exported functions/types with JSDoc
5. Examples - Real-world usage scenarios
6. Troubleshooting - Common issues and solutions

Code to document:
\`\`\`
{{CODE}}
\`\`\``,
        itemType: "prompt",
        isFavorite: false,
      },
      {
        title: "Refactoring Assistant",
        contentType: "TEXT" as const,
        content: `You are an expert refactoring specialist. Analyze the following code and suggest improvements.

Focus areas:
1. **Abstraction** - Can repeated logic be extracted?
2. **SOLID principles** - Single responsibility, open/closed, etc.
3. **Design patterns** - Any applicable patterns that would improve design?
4. **Testability** - How easy is it to unit test?
5. **Type safety** - Are types properly defined?

Current code:
\`\`\`
{{CODE}}
\`\`\`

Provide:
- Current issues with explanations
- Refactored version
- Key changes and rationale
- Estimated impact on maintainability`,
        itemType: "prompt",
        isFavorite: false,
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    items: [
      {
        title: "Docker Compose - Node.js App",
        contentType: "TEXT" as const,
        content: `version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - DATABASE_URL=\${DATABASE_URL}
    restart: unless-stopped
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - '80:80'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - app`,
        language: "YAML",
        itemType: "snippet",
        isFavorite: false,
      },
      {
        title: "GitHub Actions Deploy",
        contentType: "TEXT" as const,
        content: `#!/bin/bash
set -euo pipefail

# Deploy to production
echo "Deploying to production..."

# Pull latest changes
git pull origin main

# Install dependencies
npm ci --production

# Run database migrations
npx prisma migrate deploy

# Build application
npm run build

# Restart PM2
pm2 restart devstash --update-env

# Health check
sleep 5
curl -f https://devstash.io/health || exit 1

echo "Deployment successful!"`,
        language: "Bash",
        itemType: "command",
        isFavorite: false,
      },
      {
        title: "Docker Documentation",
        contentType: "URL" as const,
        url: "https://docs.docker.com/compose/",
        itemType: "link",
        isFavorite: false,
      },
      {
        title: "GitHub Actions Docs",
        contentType: "URL" as const,
        url: "https://docs.github.com/en/actions",
        itemType: "link",
        isFavorite: false,
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell skills for everyday development",
    items: [
      {
        title: "Git Undo Last Commit",
        contentType: "TEXT" as const,
        content: `# Undo last commit, keep changes staged
git reset --soft HEAD~1

# Undo last commit, keep changes unstaged
git reset HEAD~1

# Undo last commit, discard changes (dangerous!)
git reset --hard HEAD~1`,
        language: "Bash",
        itemType: "command",
        isFavorite: true,
      },
      {
        title: "Docker Cleanup",
        contentType: "TEXT" as const,
        content: `# Remove all stopped containers
docker container prune -f

# Remove all unused images
docker image prune -f

# Remove all unused volumes
docker volume prune -f

# Remove all build cache
docker builder prune -f

# Full cleanup (everything above)
docker system prune -af`,
        language: "Bash",
        itemType: "command",
        isFavorite: false,
      },
      {
        title: "Find & Kill Process",
        contentType: "TEXT" as const,
        content: `# Find process by port
lsof -i :3000

# Find process by name
pgrep -f "next dev"

# Kill by port
kill $(lsof -t -i :3000)

# Force kill
kill -9 $(lsof -t -i :3000)`,
        language: "Bash",
        itemType: "command",
        isFavorite: false,
      },
      {
        title: "Package Manager Shortcuts",
        contentType: "TEXT" as const,
        content: `# npm - clean install
rm -rf node_modules package-lock.json && npm install

# npm - update all packages
npm update

# npm - check outdated
npm outdated

# bun - add package
bun add <package>

# bun - dev dependency
bun add -d <package>

# yarn - upgrade
yarn upgrade-interactive --latest`,
        language: "Bash",
        itemType: "command",
        isFavorite: false,
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    items: [
      {
        title: "Tailwind CSS Docs",
        contentType: "URL" as const,
        url: "https://tailwindcss.com/docs",
        itemType: "link",
        isFavorite: true,
      },
      {
        title: "shadcn/ui Components",
        contentType: "URL" as const,
        url: "https://ui.shadcn.com/docs",
        itemType: "link",
        isFavorite: true,
      },
      {
        title: "Radix UI Primitives",
        contentType: "URL" as const,
        url: "https://www.radix-ui.com/",
        itemType: "link",
        isFavorite: false,
      },
      {
        title: "Lucide Icons",
        contentType: "URL" as const,
        url: "https://lucide.dev/icons",
        itemType: "link",
        isFavorite: false,
      },
    ],
  },
];

// ============================================
// Seed Function
// ============================================

async function main() {
  console.log("🌱 Starting database seed...\n");

  // 1. Create demo user with account (uses BetterAuth's createUser which handles hashing)
  console.log("Creating demo user...");
  let demoUser = await prisma.user.findUnique({ where: { email: DEMO_USER.email } });
  if (!demoUser) {
    await auth.api.createUser({
      body: {
        name: DEMO_USER.name,
        email: DEMO_USER.email,
        password: DEMO_USER_PASSWORD,
      },
    });
    demoUser = await prisma.user.findUnique({ where: { email: DEMO_USER.email } });
    console.log(`   ✓ Created user: ${DEMO_USER.email}`);
  } else {
    console.log(`   ✓ User already exists: ${DEMO_USER.email}`);
  }

  // 2. Create system item types
  console.log("Creating system item types...");
  const itemTypeMap = new Map<string, string>();
  for (const itemType of SYSTEM_ITEM_TYPES) {
    const created = await prisma.itemType.upsert({
      where: { name: itemType.name },
      update: {},
      create: itemType,
    });
    itemTypeMap.set(itemType.name, created.id);
    console.log(`   ✓ ${itemType.name}`);
  }
  console.log();

  // 3. Create collections with items
  for (const collection of COLLECTIONS) {
    console.log(`Creating collection: ${collection.name}...`);

    const createdCollection = await prisma.collection.upsert({
      where: { id: collection.name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: {
        id: collection.name.toLowerCase().replace(/\s+/g, "-"),
        name: collection.name,
        description: collection.description,
        userId: demoUser!.id,
      },
    });

    for (const item of collection.items) {
      const itemTypeId = itemTypeMap.get(item.itemType);
      if (!itemTypeId) continue;

      const createdItem = await prisma.item.create({
        data: {
          title: item.title,
          contentType: item.contentType,
          content: item.content,
          url: (item as { url?: string }).url,
          language: (item as { language?: string }).language,
          isFavorite: item.isFavorite,
          isPinned: false,
          userId: demoUser!.id,
          itemTypeId,
        },
      });

      await prisma.itemCollection.create({
        data: {
          itemId: createdItem.id,
          collectionId: createdCollection.id,
        },
      });

      console.log(`   ✓ ${item.title}`);
    }
    console.log();
  }

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
