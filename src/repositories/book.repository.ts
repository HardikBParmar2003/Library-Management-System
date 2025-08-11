import { Book, CreateBook } from "../interface/book.interface";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export const bookRepository = {
  async createBook(data: CreateBook) {
    try {
      return await prisma.book.create({ data });
    } catch (error) {
      throw error;
    }
  },

  async getBookById(id: number) {
    try {
      return await prisma.book.findFirst({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  async getAllBook() {
    try {
      return await prisma.book.findMany();
    } catch (error) {
      throw error;
    }
  },

  async updateBook(data: Book, id: number) {
    try {
      return await prisma.book.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw error;
    }
  },

  async deleteBook(id: number) {
    try {
      return await prisma.book.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  async getBorrowedBooks(id: number) {
    try {
      return await prisma.user.findMany({
        where: {
          id,
        },
        include: {
          borrowed_books: {
            where: {
              return_date: null,
            },
            include: {
              book: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  },

  async getReturnedBooks(id: number) {
    try {
      return await prisma.user.findMany({
        where: {
          id,
        },
        include: {
          borrowed_books: {
            where: {
              return_date: {
                not: null,
              },
            },
            include: {
              book: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  },
};
