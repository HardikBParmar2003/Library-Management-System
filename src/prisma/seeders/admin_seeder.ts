import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export async function AdminSeeder() {
  await prisma.admin.createMany({
    data: [
      {
        first_name: "Hardik",
        last_name: "Parmar",
        email: "hardik@gmail.com",
        password:
          "$2a$10$6PUyxvsKtsTAEvTyNB.Z.es9MW05Z.i7meIUWlLdQ3XofYRxra9YK",
      },
    ],
    skipDuplicates: true,
  });
}

AdminSeeder()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
