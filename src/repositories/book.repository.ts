import { Book, CreateBook } from "../interface/book.interface";
import { PrismaClient } from "../generated/prisma";
import { Request } from "express";
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

  async serachBook(req: Request) {
    try {
      const page: number = Number(req.query.page) || 1;
      const orderBy: string = String(req.query.orderBy) || "asc";
      const limit: number = Number(req.query.limit) || 5;
      const searchValue: string = req.query.searchValue as string;
      const skip: number = (page - 1) * limit;
      const [bookData, total] = await Promise.all([
        prisma.book.findMany({
          where: {
            book_name: {
              contains: `${searchValue}`,
              mode: "insensitive",
            },
          },
          skip,
          take: limit,
        }),
        prisma.book.count({
          where: {
            book_name: {
              contains: `${searchValue}`,
              mode: "insensitive",
            },
          },
        }),
      ]);
      return {
        book: bookData,
        totalRecords: total,
      };
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
