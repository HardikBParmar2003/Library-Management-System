import { Router } from "express";
import { userController } from "../controller/user.controller";
import cookieParser from "cookie-parser";
import { adminMiddleware } from "../middleware/admin.middleware";
import { validationMiddleware } from "../middleware/validation.middleware";

export const userRouter = Router();
userRouter.use(cookieParser());

userRouter.post(
  "/createUser",
  adminMiddleware.isAuthorizedAdmin,
  validationMiddleware.validateCreateUser,
  userController.createUser
);
userRouter.get(
  "/getUserById/:id",
  adminMiddleware.isAuthorizedAdmin,
  userController.getUserById
);
userRouter.get(
  "/getAllUser",
  adminMiddleware.isAuthorizedAdmin,
  userController.getAllUser
);
userRouter.put(
  "/updateUser/:id",
  adminMiddleware.isAuthorizedAdmin,
  validationMiddleware.validateUpdateUser,
  userController.updateUser
);
userRouter.delete(
  "/deleteUser/:id",
  adminMiddleware.isAuthorizedAdmin,
  userController.deleteUser
);
userRouter.get(
  "/getBorrowedUser/:book_id",
  adminMiddleware.isAuthorizedAdmin,
  userController.getBorrowedUser
);
userRouter.get(
  "/getReturnedUser/:book_id",
  adminMiddleware.isAuthorizedAdmin,
  userController.getReturnedUser
);
