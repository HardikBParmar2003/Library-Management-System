import {  PrismaClient } from "../../generated/prisma";
import { AdminSeeder } from "./admin_seeder";
import { BookSeeder } from "./book_seeder";
import { UserSeeder } from "./user_seeder";
const prisma = new PrismaClient();

async function main() {
  await AdminSeeder();
  await UserSeeder();
  await BookSeeder();
}

main()
  .then(async () => {
    console.log("🌱 All seeders completed");
  })
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  });
