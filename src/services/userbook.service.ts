import { Book, Prisma } from "../generated/prisma";
import { CreateUserBook, UserBook } from "../interface/userbook.interface";
import { bookRepository } from "../repositories/book.repository";
import { userBookRepository } from "../repositories/userbook.repositories";
import { PrismaClient } from "../generated/prisma";
import { checkPenalty } from "../function/check_penalty";
const prisma = new PrismaClient();

export const userBookService = {
  async borrowBook(data: CreateUserBook) {
    try {
      const is_book: Book | null = await bookRepository.getBookById(
        data.book_id
      );
      if (is_book) {
        if (is_book.available_quantity > 0) {
          const today = new Date();
          const sevenDaysLater = new Date(today);
          sevenDaysLater.setDate(today.getDate() + 15);
          const createBookData = {
            book_id: data.book_id,
            user_id: data.user_id,
            due_date: sevenDaysLater,
          };
          const userBookData: UserBook =
            await userBookRepository.createUserBook(createBookData);
          const bookData = {
            available_quantity: is_book.available_quantity - 1,
          };
          const book: Book = await bookRepository.updateBook(
            bookData as Book,
            data.book_id
          );
          return userBookData;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },

  async checkBorrowed(book_id: number, user_id: number) {
    try {
      const is_borrowed: boolean = await userBookRepository.checkBorrowed(
        book_id,
        user_id
      );
      return is_borrowed;
    } catch (error) {
      throw error;
    }
  },

  async checkReturned(book_id: number, user_id: number) {
    try {
      const is_borrowed: boolean = await userBookRepository.checkReturned(
        book_id,
        user_id
      );
      return is_borrowed;
    } catch (error) {
      throw error;
    }
  },

  async returnBook(book_id: number, user_id: number, id: number) {
    try {
      const is_book: Book | null = await bookRepository.getBookById(book_id);
      const return_date: Date = new Date();
      if (is_book) {
        const data = {
          return_date,
        };
        const is_continue: boolean = await checkPenalty(id);
        if (is_continue) {
          const book: UserBook = await userBookRepository.updateUserBook(
            data as UserBook,
            id
          );
          const bookData = {
            available_quantity: is_book.available_quantity + 1,
          };
          await bookRepository.updateBook(bookData as Book, book_id);

          return book;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },

  async updateUserBook(data: UserBook, id: number) {
    try {
      return await userBookRepository.updateUserBook(data, id);
    } catch (error) {
      throw error;
    }
  },

  async payPenalty(id: number, amount: number) {
    try {
      const data: UserBook | null = await userBookRepository.checkPenalty(id);
      if (data) {
        if (data.penalty_amount > 0) {
          const updateData = {
            penalty_amount: data.penalty_amount,
            penalty_status: "PAID",
          };

          return await userBookRepository.updateUserBook(
            updateData as UserBook,
            id
          );
        } else {
          return true;
        }
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },
};
