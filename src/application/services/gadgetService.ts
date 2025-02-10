import { GadgetRepository } from "../../domain/repositories/gadgetRepository";
import { generateUniqueCodename } from "../../shared/utils/codenames";
import {  GadgetStatus } from "@prisma/client";


const VALID_STATUSES = ["Available", "Deployed", "Destroyed", "Decommissioned"];

export class GadgetService {
  private gadgetRepository: GadgetRepository;

  constructor(gadgetRepository: GadgetRepository) {
    this.gadgetRepository = gadgetRepository;
  }

  async getAllGadgets() {
    return this.gadgetRepository.getAllGadgets();
  }
  async getGadgetsByStatus(status: GadgetStatus) {
    return this.gadgetRepository.getGadgetsByStatus(status);
  }

  async createGadget(status: GadgetStatus): Promise<any> {
   if(!VALID_STATUSES.includes(status)) {
      throw new Error("Invalid status. Status should be Available, Deployed, Destroyed or Decommissioned");
    }

    const codename = generateUniqueCodename();
    return this.gadgetRepository.createGadget(codename, status);
  }

  async updateGadget(id: string, data: { name?: string; status?: GadgetStatus}) {
    const { status } = data;

    if(status && !VALID_STATUSES.includes(status)) {
      throw new Error("Invalid status. Status should be Available, Deployed, Destroyed or Decommissioned");
    }
    
    return this.gadgetRepository.updateGadget(id, data);
  }

  async decommissionGadget(id: string) {
    return this.gadgetRepository.decommissionGadget(id);
  }

  async triggerSelfDestruct(id: string) {
    const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();
    return this.gadgetRepository.triggerSelfDestruct(id, confirmationCode);
  }
}
