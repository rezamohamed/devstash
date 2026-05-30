import { prisma } from "../src/lib/prisma";

const DEMO_EMAIL = "demo@devstash.io";

async function main() {
  const demoUser = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
  });

  if (!demoUser) {
    console.log(`❌ User ${DEMO_EMAIL} not found. Nothing deleted.`);
    return;
  }

  console.log(`✅ Found demo user: ${demoUser.id} (${demoUser.email})`);

  // Delete all users except the demo user
  const result = await prisma.user.deleteMany({
    where: {
      email: {
        not: DEMO_EMAIL,
      },
    },
  });

  console.log(`✅ Deleted ${result.count} user(s). Kept ${DEMO_EMAIL}.`);
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
