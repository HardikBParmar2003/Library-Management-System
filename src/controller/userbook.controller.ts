import { Request, Response } from "express";
import { UserBook } from "../interface/userbook.interface";
import { userBookService } from "../services/userbook.service";
import { bookService } from "../services/book.service";
import { Book } from "../interface/book.interface";
import { userService } from "../services/user.service";
import { userController } from "./user.controller";
import { User } from "../interface/user.interface";

export const userBookController = {
  async borrowBook(req: Request, res: Response) {
    try {
      const book_id = Number(req.body.book_id);
      const user_id = Number(req.body.user_id);
      const is_book: Book | null = await bookService.getBookById(book_id);
      if (is_book) {
        const is_user = await userService.getUserById(user_id);
        if (is_user) {
          const is_borrowed: boolean = await userBookService.checkBorrowed(
            book_id,
            user_id
          );
          if (is_borrowed) {
            res
              .status(409)
              .json({ data: null, message: "User already borrowed this book" });
          } else {
            const book: Book | false = await userBookService.borrowBook(
              req.body
            );
            if (book) {
              res
                .status(201)
                .json({ data: book, message: "Book successfully borrowed" });
            } else {
              res.status(409).json({
                data: null,
                message: "Book copy not available as of now !!!",
              });
            }
          }
        } else {
          res.status(404).json({ data: null, message: "No User found" });
        }
      } else {
        res.status(404).json({ data: null, message: "No Books found" });
      }
    } catch (error) {
      res.status(500).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },

  async returnBook(req: Request, res: Response) {
    try {
      const book_id = Number(req.body.book_id);
      const user_id = Number(req.body.user_id);
      const userBookId = Number(req.params.id);
      const is_book: Book | null = await bookService.getBookById(book_id);
      if (is_book) {
        const is_user = await userService.getUserById(user_id);
        if (is_user) {
          const is_returned: boolean = await userBookService.checkReturned(
            book_id,
            user_id
          );
          if (!is_returned) {
            const book_data: UserBook | false =
              await userBookService.returnBook(book_id, user_id, userBookId);
            if (book_data) {
              res.status(200).json({
                data: book_data,
                message: "Book returned successfully",
              });
            } else {
              res.status(404).json({ data: null, message: "No Books found" });
            }
            // } else {
            //   res.status(404).json({
            //     data: null,
            //     message: "User or already returned !!",
            //   });
            // }
          } else {
            res
              .status(200)
              .json({ data: null, message: "First Borrow book !!" });
          }
        } else {
          res.status(404).json({ data: null, message: "No User found" });
        }
      } else {
        res.status(404).json({ data: null, message: "No Books found" });
      }
    } catch (error) {
      res.status(500).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },

  async updateUserBook(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await userBookService.updateUserBook(req.body, id);
      res.status(200).json({ data: data, message: "Updated successfully" });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },


};
