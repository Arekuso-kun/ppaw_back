import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UsersAccessor {
  static async getAllUsers() {
    return await prisma.users.findMany({
      where: { deleted: false },
    });
  }

  static async getAllUsersDetailed() {
    return await prisma.users.findMany({
      where: { deleted: false },
      include: { plans: true, usage: true },
    });
  }

  static async getUserById(userId) {
    return await prisma.users.findFirst({
      where: { userid: userId, deleted: false },
      include: { plans: true, usage: true },
    });
  }

  static async getUserByEmail(email) {
    return await prisma.users.findFirst({
      where: { email: email, deleted: false },
    });
  }

  static async createUser(userData) {
    return await prisma.users.create({ data: userData });
  }

  static async updateUser(userId, userData) {
    return await prisma.users.update({
      where: { userid: userId },
      data: userData,
    });
  }

  static async deleteUser(userId) {
    return await prisma.users.update({
      where: { userid: userId },
      data: { deleted: true },
    });
  }
}
