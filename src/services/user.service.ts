import { use } from "react";
import { Prisma } from "../generated/prisma";
import { CreateUSer, User } from "../interface/user.interface";
import { userRepository } from "../repositories/user.repository";

export const userService = {
  async createUser(data: CreateUSer) {
    try {
      const is_user: User | null = await userRepository.getUserByEmail(
        data.email
      );
      if (is_user) {
        return false;
      } else {
        const user: User = await userRepository.createUser(data);
        return user;
      }
    } catch (error) {
      throw error;
    }
  },

  async getUserById(id: number) {
    try {
      const user: User | null = await userRepository.getUserById(id);
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },

  async getAllUser() {
    try {
      return await userRepository.getAllUser();
    } catch (error) {
      throw error;
    }
  },

  async updateUser(data: User, id: number) {
    try {
      const is_user: User | null = await userRepository.getUserById(id);
      if (is_user) {
        return await userRepository.updateUser(data, id);
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(id: number) {
    try {
      const is_user: User | null = await userRepository.getUserById(id);
      if (is_user) {
        return await userRepository.deleteUser(id);
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },

  async getBorrowedUser(book_id: number) {
    try {
      return await userRepository.getBorrowedUser(book_id);
    } catch (error) {
      throw error;
    }
  },

  async getReturnedUser(book_id: number) {
    try {
      return await userRepository.getReturnedUser(book_id);
    } catch (error) {
      throw error;
    }
  },
};
