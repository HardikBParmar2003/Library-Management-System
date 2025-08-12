import { Router } from "express";
import { bookController } from "../controller/book.controller";
import cookieParser from "cookie-parser";
import { adminMiddleware } from "../middleware/admin.middleware";
import { validationMiddleware } from "../middleware/validation.middleware";

export const bookRouter = Router();

bookRouter.use(cookieParser());

bookRouter.post(
  "/createBook",
  adminMiddleware.isAuthorizedAdmin,
  validationMiddleware.validateCreateBook,
  bookController.createBook
);

bookRouter.get(
  "/getBookById/:id",
  adminMiddleware.isAuthorizedAdmin,
  bookController.getBookById
);

bookRouter.get(
  "/getAllBook",
  adminMiddleware.isAuthorizedAdmin,
  bookController.getAllBook
);

bookRouter.put(
  "/updateBook/:id",
  adminMiddleware.isAuthorizedAdmin,
  validationMiddleware.validateUpdateBook,
  bookController.updateBook
);

bookRouter.delete(
  "/deleteBook/:id",
  adminMiddleware.isAuthorizedAdmin,
  bookController.deleteBook
);

bookRouter.post(
  "/searchBook",
  adminMiddleware.isAuthorizedAdmin,
  bookController.searchBook
);

bookRouter.get(
  "/borrowedBooks/:id",
  adminMiddleware.isAuthorizedAdmin,
  bookController.getBorrowedBooks
);
bookRouter.get(
  "/returnedBooks/:id",
  adminMiddleware.isAuthorizedAdmin,
  bookController.getReturnedBooks
);
