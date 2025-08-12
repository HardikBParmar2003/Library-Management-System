import { Request } from "express";
import { PrismaClient, User } from "../generated/prisma";
import { CreateUSer } from "../interface/user.interface";
const prisma = new PrismaClient();

export const userRepository = {
  async createUser(data: CreateUSer) {
    try {
      const user: User = await prisma.user.create({ data });
      return user;
    } catch (error) {
      throw error;
    }
  },

  async getUserById(id: number) {
    try {
      return await prisma.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email: string) {
    try {
      return await prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  async getAllUser() {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      throw error;
    }
  },

  async updateUser(data: User, id: number) {
    try {
      return await prisma.user.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(id: number) {
    try {
      return await prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  async searchUser(req: Request) {
    try {
      const page: number = Number(req.query.page) || 1;
      const orderBy: string = String(req.query.orderBy) || "asc";
      const limit: number = Number(req.query.limit) || 5;
      const searchValue: string = req.query.searchValue as string;
      const skip: number = (page - 1) * limit;
      const [userData, total] = await Promise.all([
        prisma.user.findMany({
          where: {
            first_name: {
              contains: `${searchValue}`,
              mode: "insensitive",
            },
          },
          skip,
          take: limit,
        }),
        prisma.user.count({
          where: {
            first_name: {
              contains: `${searchValue}`,
              mode: "insensitive",
            },
          },
        }),
      ]);
      return {
        user: userData,
        totalRecords: total,
      };
    } catch (error) {
      throw error;
    }
  },

  async getBorrowedUser(book_id: number) {
    try {
      return await prisma.book.findMany({
        where: {
          id: book_id,
        },
        include: {
          borrowed_by: {
            where: {
              return_date: null,
            },
            include: {
              user: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  },

  async getReturnedUser(book_id: number) {
    try {
      return await prisma.book.findMany({
        where: {
          id: book_id,
        },
        include: {
          borrowed_by: {
            where: {
              return_date: {
                not: null,
              },
            },
            include: {
              user: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  },
};
