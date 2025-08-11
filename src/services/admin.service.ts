import { generateToken } from "../function/jwt_token";
import { CreateAdmin } from "../interface/admin.interface";
import { adminRepository } from "../repositories/admin.repository";
import bcrypt from "bcrypt";

export const adminService = {
  async createAdmin(data: CreateAdmin) {
    try {
      const is_exist = await adminRepository.getAdmin(data.email);
      if (is_exist) {
        return false;
      }
      const email: string = data.email;
      const first_name: string = data.first_name;
      const last_name: string = data.last_name;
      const password: string = await bcrypt.hash(data.password, 10);
      const admin_data = {
        email,
        first_name,
        last_name,
        password,
      };
      const new_data = await adminRepository.createAdmin(
        admin_data as CreateAdmin
      );
      return new_data;
    } catch (error) {
      throw error;
    }
  },

  async getAdmin(email: string, password: string) {
    try {
      const admin_data: CreateAdmin | null = await adminRepository.getAdmin(
        email
      );
      if (admin_data) {
        const is_match = await bcrypt.compare(password, admin_data.password);
        if (is_match) {
          const token: string = generateToken(admin_data);
          return token;
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
};
