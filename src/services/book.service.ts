import { Request } from "express";
import { Book, CreateBook } from "../interface/book.interface";
import { bookRepository } from "../repositories/book.repository";

export const bookService = {
  async createBook(data: CreateBook) {
    try {
      return await bookRepository.createBook(data);
    } catch (error) {
      throw error;
    }
  },

  async getBookById(id: number) {
    ``;
    try {
      return await bookRepository.getBookById(id);
    } catch (error) {
      throw error;
    }
  },

  async getAllBook() {
    try {
      return await bookRepository.getAllBook();
    } catch (error) {
      throw error;
    }
  },

  async updateBook(data: Book, id: number) {
    try {
      return await bookRepository.updateBook(data, id);
    } catch (error) {
      throw error;
    }
  },

  async deleteBook(id: number) {
    try {
      return await bookRepository.deleteBook(id);
    } catch (error) {
      throw error;
    }
  },

  async searchBook(req: Request) {
    try {
      return await bookRepository.serachBook(req);
    } catch (error) {
      throw error;
    }
  },

  async getBorrowedBooks(id: number) {
    try {
      return await bookRepository.getBorrowedBooks(id);
    } catch (error) {
      throw error;
    }
  },

  async getReturnedBooks(id: number) {
    try {
      return await bookRepository.getReturnedBooks(id);
    } catch (error) {
      throw error;
    }
  },
};
