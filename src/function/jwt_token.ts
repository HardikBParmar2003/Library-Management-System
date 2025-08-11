import { CreateAdmin } from "../interface/admin.interface";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const generateToken = (data: CreateAdmin) => {
  const jwt_token = jwt.sign(
    {
      admin_id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "1h",
    }
  );
  return jwt_token
};
