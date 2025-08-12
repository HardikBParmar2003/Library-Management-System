import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { User } from "../generated/prisma";
import { Book } from "../interface/book.interface";
import { bookService } from "../services/book.service";

export const userController = {
  async createUser(req: Request, res: Response) {
    try {
      const user: User | false = await userService.createUser(req.body);
      if (user) {
        res
          .status(200)
          .json({ data: user, message: "User created successfully" });
      } else {
        res.status(200).json({ data: null, message: "Email already exist" });
      }
    } catch (error) {
      res.status(5000).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const user_id: number = Number(req.params.id);
      const is_user: false | User = await userService.getUserById(user_id);
      if (is_user) {
        res.status(200).json({
          data: is_user,
          message: "User details fetched successfully",
        });
      } else {
        res.status(200).json({ data: null, message: "User not found" });
      }
    } catch (error) {
      res.status(5000).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },

  async getAllUser(req: Request, res: Response) {
    try {
      const user: User[] = await userService.getAllUser();
      if (user.length > 0) {
        res
          .status(200)
          .json({ data: user, message: "All user fetched successfully" });
      } else {
        res.status(200).json({ data: [], message: "No users found" });
      }
    } catch (error) {
      res.status(5000).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const user_id: number = Number(req.params.id);
      const is_user = userService.updateUser(req.body, user_id);
      if (is_user) {
        res.status(200).json({
          data: is_user,
          message: "User details updated successfully",
        });
      } else {
        res.status(200).json({ data: null, message: "User not found" });
      }
    } catch (error) {
      res.status(5000).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const user_id = Number(req.params.id);
      const is_user: User | false = await userService.deleteUser(user_id);
      if (is_user) {
        res.status(200).json({
          data: is_user,
          message: "User deleted successfully",
        });
      } else {
        res.status(200).json({ data: null, message: "User not found" });
      }
    } catch (error) {
      res.status(5000).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },

  async searchUser(req: Request, res: Response) {
    try {
      const userData: {
        user: User[];
        totalRecords: number;
      } = await userService.searchUser(req);
      res
        .status(200)
        .json({ data: userData, message: "Data retrieved successfully" });
    } catch (error) {
      res.status(5000).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },

  async getBorrowedUser(req: Request, res: Response) {
    try {
      const book_id = Number(req.params.book_id);
      const book: Book | null = await bookService.getBookById(book_id);
      if (book) {
        const borrowedUser = await userService.getBorrowedUser(book_id);
        res
          .status(200)
          .json({ data: borrowedUser, message: "Data fetched successfully" });
      } else {
        res.status(404).json({ data: null, message: "No books found" });
      }
    } catch (error) {
      res.status(500).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },

  async getReturnedUser(req: Request, res: Response) {
    try {
      const book_id = Number(req.params.book_id);
      const book: Book | null = await bookService.getBookById(book_id);
      if (book) {
        const borrowedUser = await userService.getReturnedUser(book_id);
        res
          .status(200)
          .json({ data: borrowedUser, message: "Data fetched successfully" });
      } else {
        res.status(404).json({ data: null, message: "No books found" });
      }
    } catch (error) {
      res.status(500).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },
};
