import { Book, Prisma } from "../generated/prisma";
import { CreateUserBook, UserBook } from "../interface/userbook.interface";
import { bookRepository } from "../repositories/book.repository";
import { userBookRepository } from "../repositories/userbook.repositories";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export const userBookService = {
  async borrowBook(data: CreateUserBook) {
    try {
      const is_book: Book | null = await bookRepository.getBookById(
        data.book_id
      );
      if (is_book) {
        if (is_book.available_quantity > 0) {
          const userBookData: UserBook =
            await userBookRepository.createUserBook(data);
          const bookData = {
            available_quantity: is_book.available_quantity - 1,
          };
          const book: Book = await bookRepository.updateBook(
            bookData as Book,
            data.book_id
          );

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
      if (is_book) {
        const data = {
          return_date: new Date(),
        };
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




};
