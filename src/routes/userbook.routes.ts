import { Router } from "express";
import { userBookController } from "../controller/userbook.controller";
import { adminMiddleware } from "../middleware/admin.middleware";
import cookieParser from "cookie-parser";
import { validationMiddleware } from "../middleware/validation.middleware";

export const userBookRouter = Router();
userBookRouter.use(cookieParser());

userBookRouter.post(
  "/borrowBook",
  adminMiddleware.isAuthorizedAdmin,
  validationMiddleware.bookValidation,
  userBookController.borrowBook
);
userBookRouter.post(
  "/returnBook/:id",
  adminMiddleware.isAuthorizedAdmin,
  validationMiddleware.bookValidation,
  userBookController.returnBook
);
userBookRouter.post(
  "/updateUserBook/:id",
  adminMiddleware.isAuthorizedAdmin,
  validationMiddleware.bookValidation,
  userBookController.updateUserBook
);
userBookRouter.post(
  "/payPenalty/:id",
  adminMiddleware.isAuthorizedAdmin,
  userBookController.payPenalty
);
