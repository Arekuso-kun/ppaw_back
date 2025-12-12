export class UserAccessor {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getAllUsers() {
    return await this.prisma.users.findMany({
      where: { deleted: false },
      orderBy: { userid: "asc" },
    });
  }

  async getAllUsersDetailed() {
    return await this.prisma.users.findMany({
      where: { deleted: false },
      include: { plans: true, usage: true },
      orderBy: { userid: "asc" },
    });
  }

  async getUserById(userId) {
    return await this.prisma.users.findFirst({
      where: { userid: userId, deleted: false },
      include: { plans: true, usage: true },
    });
  }

  async getUserByEmail(email) {
    return await this.prisma.users.findFirst({
      where: { email: email, deleted: false },
    });
  }

  async createUser(userData) {
    return await this.prisma.users.create({ data: userData });
  }

  async updateUser(userId, userData) {
    return await this.prisma.users.update({
      where: { userid: userId },
      data: userData,
    });
  }

  async deleteUser(userId) {
    return await this.prisma.users.update({
      where: { userid: userId },
      data: { deleted: true },
    });
  }
}
