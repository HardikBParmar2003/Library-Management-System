import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


interface JWTPayload {
  admin_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const adminMiddleware = {
  async isAuthorizedAdmin(req: Request, res: Response, next: NextFunction) {
      try {
        let token: string = req.cookies.jwt_token;
      jwt.verify(
        token,
        process.env.SECRET_KEY as string,
        (
          err: jwt.VerifyErrors | null,
          user: string | jwt.JwtPayload | undefined
        ) => {
          if (err) {
            res.status(400).json({
              data: "null",
              message: "Forbidden: Invalid token or token expired",
            });
            return;
          }
          req.user = user as JWTPayload;
          next();
        }
      );
    } catch (error) {
      res.status(400).json({
        data: "null",
        message: "Forbidden: Invalid token or token expired",
      });
    }
  },
};
