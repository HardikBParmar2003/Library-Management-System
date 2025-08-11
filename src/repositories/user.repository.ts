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
