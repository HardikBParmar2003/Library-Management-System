import { Book, PrismaClient } from "../generated/prisma";
import { CreateUserBook, UserBook } from "../interface/userbook.interface";
const prisma = new PrismaClient();

export const userBookRepository = {
  async createUserBook(data: CreateUserBook) {
    try {
      return await prisma.user_Book.create({ data });
    } catch (error) {
      throw error;
    }
  },

  async updateUserBook(data: UserBook, id: number) {
    try {
      const userBookData = await prisma.user_Book.update({
        where: {
          id,
        },
        data,
      });
      return userBookData;
    } catch (error) {
      throw error;
    }
  },

  async checkBorrowed(book_id: number, user_id: number) {
    try {
      const book_data: UserBook | null = await prisma.user_Book.findFirst({
        orderBy: {
          return_date: "desc",
        },
        where: {
          AND: [{ book_id }, { user_id }],
        },
      });
      if (book_data == null || book_data.return_date) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      throw error;
    }
  },

  async checkReturned(book_id: number, user_id: number) {
    try {
      const book_data: UserBook | null = await prisma.user_Book.findFirst({
        orderBy: {
          return_date: "desc",
        },
        where: {
          AND: [{ book_id }, { user_id }],
        },
      });
      if (book_data == null || book_data.return_date) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },

  async checkPenalty(id: number) {
    try {
      return await prisma.user_Book.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};
