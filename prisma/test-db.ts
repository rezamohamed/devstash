import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Testing database connection...\n");

  // Test 1: ItemTypes
  console.log("1. Fetching item types...");
  const itemTypes = await prisma.itemType.findMany();
  console.log(`   Found ${itemTypes.length} item types:`);
  itemTypes.forEach((type) => {
    console.log(`   - ${type.name} (${type.color})`);
  });

  // Test 2: Users
  console.log("\n2. Checking users table...");
  const userCount = await prisma.user.count();
  console.log(`   User count: ${userCount}`);

  // Test 3: Items
  console.log("\n3. Checking items table...");
  const itemCount = await prisma.item.count();
  console.log(`   Item count: ${itemCount}`);

  // Test 4: Collections
  console.log("\n4. Checking collections table...");
  const collectionCount = await prisma.collection.count();
  console.log(`   Collection count: ${collectionCount}`);

  console.log("\n✅ All database tests passed!");
}

main()
  .catch((e) => {
    console.error("❌ Database test failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
