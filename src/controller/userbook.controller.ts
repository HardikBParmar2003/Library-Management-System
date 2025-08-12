import { Request, Response } from "express";
import { UserBook } from "../interface/userbook.interface";
import { userBookService } from "../services/userbook.service";
import { bookService } from "../services/book.service";
import { Book } from "../interface/book.interface";
import { userService } from "../services/user.service";
import { User } from "../interface/user.interface";
import { sendEmail } from "../function/send_email";
import { checkPenalty } from "../function/check_penalty";
import { number } from "joi";

export const userBookController = {
  async borrowBook(req: Request, res: Response) {
    try {
      const book_id = Number(req.body.book_id);
      const user_id = Number(req.body.user_id);
      const is_book: Book | null = await bookService.getBookById(book_id);
      if (is_book) {
        const is_user: User | false = await userService.getUserById(user_id);
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
            const book: UserBook | false = await userBookService.borrowBook(
              req.body
            );
            if (book) {
              await sendEmail.sendBorrowBook(is_user, is_book, book);
              res
                .status(201)
                .json({ data: is_book, message: "Book successfully borrowed" });
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
              await sendEmail.sendBorrowBook(is_user, is_book, book_data);
              res.status(200).json({
                data: book_data,
                message: "Book returned successfully",
              });
            } else {
              res.status(200).json({
                data: book_data,
                message: "You have pending penalty first settle that",
              });
            }
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

  async payPenalty(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const amount = Number(req.body.amount);
      const data: boolean | UserBook = await userBookService.payPenalty(
        id,
        amount
      );
      if (data === true) {
        res.status(200).json({ data: null, message: "No Penalty found" });
      } else if (data === false) {
        res
          .status(404)
          .json({ data: null, message: "No records found with this id" });
      } else {
        const bookData: Book | null = await bookService.getBookById(
          data.book_id
        );
        const userData: User | false = await userService.getUserById(
          data.user_id
        );
        sendEmail.sendBorrowBook(userData as User, bookData!, data);
        res.status(200).json({
          data: data,
          message:
            "Penalty Paid successfullly You can return this book now !!!",
        });
      }
    } catch (error) {
      res.status(500).json({
        data: null,
        message: `Something went wrong error is: ${error}`,
      });
    }
  },
};
