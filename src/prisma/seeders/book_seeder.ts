import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export async function BookSeeder() {
  await prisma.book.createMany({
    data: [
      {
        book_name: "Gujaratna Itihas",
        author_name: "Ramesh Patel",
        available_quantity: 10,
      },
      {
        book_name: "Gujarati Sahitya Nu Swaroop",
        author_name: "Meena Desai",
        available_quantity: 15,
      },
      {
        book_name: "Bhagavad Gita",
        author_name: "Vedant Trivedi",
        available_quantity: 8,
      },
      {
        book_name: "Gujarati Lok Katha",
        author_name: "Kiran Shah",
        available_quantity: 12,
      },
      {
        book_name: "Sanskrutik Parichay",
        author_name: "Nirav Joshi",
        available_quantity: 9,
      },
      {
        book_name: "Vachan Dwara",
        author_name: "Jigna Mehta",
        available_quantity: 7,
      },
      {
        book_name: "Gujarati Kavita Sangrah",
        author_name: "Chintan Desai",
        available_quantity: 11,
      },
      {
        book_name: "Bharatiya Darshan",
        author_name: "Dipak Solanki",
        available_quantity: 10,
      },
      {
        book_name: "Adhunik Gujarati Sahitya",
        author_name: "Ritu Shah",
        available_quantity: 13,
      },
      {
        book_name: "Lok Nrutya ane Nrutya Shastra",
        author_name: "Manish Vyas",
        available_quantity: 14,
      },
    ],
    skipDuplicates: true,
  });
}

BookSeeder()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
