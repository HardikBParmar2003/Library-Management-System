import { NextFunction, Request, Response } from "express";
import {
  crateUserValidation,
  updateUserValidation,
} from "../validators/user.validation";
import {
  bookValidation,
  createBookValidation,
  updateBookValidation,
} from "../validators/book.validation";
import { truncateSync } from "fs";

export const validationMiddleware = {
  async validateCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        address: req.body.address,
        contact_no: req.body.contact_no,
      };

      const { error, value } = crateUserValidation.validate(userData);

      if (error) {
        res
          .status(401)
          .json({ data: null, message: error.details[0]!.message });
      } else {
        next();
      }
    } catch (error: any) {
      res.status(500).json({ data: null, message: error[0].message });
    }
  },
  async validateUpdateUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body) {
        const userData = {
          first_name: req.body.first_name! as string,
          last_name: req.body.last_name! as string,
          email: req.body.email! as string,
          address: req.body.address! as string,
          contact_no: req.body.contact_no! as string,
        };

        const { error, value } = updateUserValidation.validate(userData);

        if (error) {
          res
            .status(401)
            .json({ data: null, message: error.details[0]!.message });
        } else {
          next();
        }
      } else {
        res
          .status(400)
          .json({ data: null, message: "No data provided for update" });
      }
    } catch (error: any) {
      res.status(500).json({ data: null, message: error[0].message });
    }
  },

  async validateCreateBook(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body) {
        const bookData = {
          book_name: req.body.book_name,
          author_name: req.body.author_name,
          available_quantity: req.body.available_quantity,
        };

        const { error, value } = createBookValidation.validate(bookData);

        if (error) {
          res
            .status(401)
            .json({ data: null, message: error.details[0]!.message });
        } else {
          next();
        }
      } else {
        res
          .status(400)
          .json({ data: null, message: "No data provided for create" });
      }
    } catch (error: any) {
      res.status(500).json({ data: null, message: error[0].message });
    }
  },

  async validateUpdateBook(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body) {
        const bookData = {
          book_name: req.body.book_name! as string,
          author_name: req.body.author_name! as string,
          available_quantity: req.body.available_quantity! as number,
        };

        const { error, value } = updateBookValidation.validate(bookData);

        if (error) {
          res
            .status(401)
            .json({ data: null, message: error.details[0]!.message });
        } else {
          next();
        }
      } else {
        res
          .status(400)
          .json({ data: null, message: "No data provided for update" });
      }
    } catch (error: any) {
      res.status(500).json({ data: null, message: error[0].message });
    }
  },

  async bookValidation(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body) {
        const bookData = {
          book_id: req.body.book_id,
          user_id: req.body.user_id,
        };

        const { error, value } = bookValidation.validate(bookData);

        if (error) {
          res
            .status(401)
            .json({ data: null, message: error.details[0]!.message });
        } else {
          next();
        }
      } else {
        res.status(400).json({ data: null, message: "No data provided" });
      }
    } catch (error: any) {
      res.status(500).json({ data: null, message: error[0].message });
    }
  },
};
