import { PrismaClient, GadgetStatus } from "@prisma/client";

export class GadgetRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllGadgets() {
    return this.prisma.gadget.findMany();
  }

  async getGadgetsByStatus(status: GadgetStatus) {
    return this.prisma.gadget.findMany({
      where: { status },
    });
  }

  async createGadget(name: string, status: GadgetStatus) {
    return this.prisma.gadget.create({
      data: { name, status },
    });
  }

  async updateGadget(id: string, data: { name?: string; status?: GadgetStatus }) {
    return this.prisma.gadget.update({
      where: { id },
      data,
    });
  }

  async decommissionGadget(id: string) {
    return this.prisma.gadget.update({
      where: { id },
      data: {
        status: "Decommissioned",
        decommissionedAt: new Date(),
      },
    });
  }

  async triggerSelfDestruct(id: string, confirmationCode: string) {
    await this.prisma.gadget.update({
      where: { id },
      data: { status: "Destroyed" },
    });
    return confirmationCode;
  }
}
