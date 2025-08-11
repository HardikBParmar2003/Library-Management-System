import { CreateAdmin } from "../interface/admin.interface";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export const adminRepository = {
  async createAdmin(data: CreateAdmin) {
    try {
      const admin_data = await prisma.admin.create({ data });
      return admin_data;
    } catch (error) {
      throw error;
    }
  },

  async getAdmin(email: string) {
    try {
      const admin_data = await prisma.admin.findUnique({
        where: {
          email,
        },
      });
      return admin_data;
    } catch (error) {
      throw error;
    }
  },
};
