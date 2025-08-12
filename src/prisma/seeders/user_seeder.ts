import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export async function UserSeeder() {
  console.log("🌱 Seeding database...");

  await prisma.user.createMany({
    data: [
      {
        first_name: "Himat",
        last_name: "Parmar",
        email: "himat@gmail.com",
        contact_no: "1234567989",
        address: "BHavnagar",
      },
      {
        first_name: "Jigar",
        last_name: "Kanada",
        email: "jigar@gmail.com",
        contact_no: "1234567989",
        address: "BHavnagar",
      },
      {
        first_name: "Umang",
        last_name: "Makwana",
        email: "umang@gmail.com",
        contact_no: "1234567989",
        address: "BHavnagar",
      },
      {
        first_name: "Vaibhav",
        last_name: "Parmar",
        email: "vaibhav@gmail.com",
        contact_no: "1234567989",
        address: "Ahemdabad",
      },
      {
        first_name: "Jayraj",
        last_name: "Parmar",
        email: "jayraj@gmail.com",
        contact_no: "1234567989",
        address: "BHavnagar",
      },
      {
        first_name: "Mann",
        last_name: "Shah",
        email: "mann@gmail.com",
        contact_no: "1234567989",
        address: "Ahemdabad",
      },
      {
        first_name: "Nishit",
        last_name: "Gadhavi",
        email: "nishit@gmail.com",
        contact_no: "1234567989",
        address: "Kutch",
      },
      {
        first_name: "Keval",
        last_name: "Joshi",
        email: "keval@gmail.com",
        contact_no: "1234567989",
        address: "Rajkot",
      },
      {
        first_name: "Darshan",
        last_name: "Chauhan",
        email: "darshan@gmail.com",
        contact_no: "1234567989",
        address: "BHavnagar",
      },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Users seeded successfully!");
}

UserSeeder()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
