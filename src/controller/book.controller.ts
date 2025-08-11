import { hrtime } from "process";
import { Book } from "../interface/book.interface";
import { bookService } from "../services/book.service";
import { Request, Response } from "express";
import { RecordWithTtl } from "dns";
import { userService } from "../services/user.service";
import { User } from "../interface/user.interface";

export const bookController = {
  async createBook(req: Request, res: Response) {
    try {
      const book: Book = await bookService.createBook(req.body);
      res.status(200).json({ data: book, message: "Created successfully" });
    } catch (error) {
      res.status(5000).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },

  async getBookById(req: Request, res: Response) {
    try {
      const book_id = Number(req.params.id);
      const book: Book | null = await bookService.getBookById(book_id);
      if (book) {
        res
          .status(200)
          .json({ data: book, message: "Book data retrievd successfully" });
      } else {
        res.status(200).json({ data: null, message: "No book found" });
      }
    } catch (error) {
      res.status(5000).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },

  async getAllBook(req: Request, res: Response) {
    try {
      const books: Book[] = await bookService.getAllBook();
      if (books.length > 0) {
        res
          .status(200)
          .json({ data: books, message: "Books data fetched successfully" });
      } else {
        res.status(200).json({ data: [], message: "No Book found" });
      }
    } catch (error) {
      res.status(5000).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },

  async updateBook(req: Request, res: Response) {
    try {
      const book_id = Number(req.params.id);
      const is_book: Book | null = await bookService.getBookById(book_id);
      if (is_book) {
        const book: Book = await bookService.updateBook(req.body, book_id);
        res
          .status(200)
          .json({ data: book, message: "Book data updated successfully" });
      } else {
        res
          .status(200)
          .json({ data: null, message: "No book found for updation" });
      }
    } catch (error) {
      res.status(5000).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },

  async deleteBook(req: Request, res: Response) {
    try {
      const book_id = Number(req.params.id);
      const book: Book | null = await bookService.getBookById(book_id);
      if (book) {
        const book = await bookService.deleteBook(book_id);
        res
          .status(200)
          .json({ data: book, message: "Book data deleted successfully" });
      } else {
        res.status(200).json({ data: null, message: "No book found" });
      }
    } catch (error) {
      res.status(5000).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },

  async getBorrowedBooks(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const is_user: User | false = await userService.getUserById(id);
      if (is_user) {
        const userBookData = await bookService.getBorrowedBooks(id);
        res.status(200).json({ data: userBookData, message: "Data found" });
      } else {
        res.status(404).json({ data: null, message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },

  async getReturnedBooks(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const is_user: User | false = await userService.getUserById(id);
      if (is_user) {
        const returnedBooks = await bookService.getReturnedBooks(id);
        res
          .status(200)
          .json({ data: returnedBooks, message: "Data fetched successfully" });
      } else {
        res.status(404).json({ data: null, message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },
};
