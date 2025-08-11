import { Request, Response } from "express";
import { adminService } from "../services/admin.service";
import { CreateAdmin } from "../interface/admin.interface";

export const adminController = {
  async createAdmin(req: Request, res: Response) {
    try {
      const data: CreateAdmin | false = await adminService.createAdmin(
        req.body
      );
      if (!data) {
        res.status(400).json({ data: null, message: "Admin already present" });
      } else {
        res.status(200).json({ data: data, message: "Created" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: "Error" });
    }
  },

  async loginAdmin(req: Request, res: Response) {
    try {
      const admin_email: string = req.body.email;
      const admin_password: string = req.body.password;
      const is_exist: string | false = await adminService.getAdmin(
        admin_email,
        admin_password
      );

      if (is_exist) {
        res.cookie("jwt_token", is_exist, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });

        res.status(200).json({ data: is_exist, message: "Login successfully" });
      } else {
        res.status(200).json({
          data: null,
          message: "AdminNot found or invalid credentials !!!",
        });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },
};
