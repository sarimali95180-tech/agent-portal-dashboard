import { main as seedDatabase } from "../lib/db";

(async () => {
  try {
    console.log("Starting database seeding...");
    await seedDatabase();
    console.log("✓ Database seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("✗ Database seeding failed:", err);
    process.exit(1);
  }
})();
