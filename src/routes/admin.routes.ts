import { Router } from "express";
import { adminController } from "../controller/admin.controller";
export const adminRouter = Router();

adminRouter.post("/create", adminController.createAdmin);
adminRouter.post("/login", adminController.loginAdmin);
