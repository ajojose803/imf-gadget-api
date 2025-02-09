import { Request, Response, NextFunction } from "express";
import { GadgetService } from "../../application/services/gadgetService";

const allowedStatuses = ['Available', 'Deployed', 'Destroyed', 'Decommissioned'];

export class GadgetController {
  private gadgetService: GadgetService;
  
  constructor(gadgetService: GadgetService) {
    this.gadgetService = gadgetService;
  }
  
  // GET /api/gadgets
  

async getGadgets(req: Request, res: Response, next: NextFunction) {
  try {
    const { status } = req.query;
    let gadgets: any[] = [];

    const sanitizedStatus = status ? (status as string).replace(/\/$/, '').trim() : '';

    if (sanitizedStatus && !allowedStatuses.includes(sanitizedStatus)) {
      return res.status(400).json({ message: `Invalid status value. Allowed values are: ${allowedStatuses.join(', ')}` });
    }

    if (sanitizedStatus) {
      gadgets = await this.gadgetService.getGadgetsByStatus(sanitizedStatus);
    } else {
      gadgets = await this.gadgetService.getAllGadgets();
    }

    if (sanitizedStatus && Array.isArray(gadgets) && gadgets.length === 0) {
      throw new Error("No gadgets found with the specified status");
    }

    const result = gadgets.map((gadget) => ({
      ...gadget,
      missionSuccessProbability: `${Math.floor(Math.random() * 100)}%`,
    }));
    res.json(result);
  } catch (err) {
    next(err);
  }
}


  // POST /api/gadgets
  async createGadget(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.body;
      const newGadget = await this.gadgetService.createGadget(status);
      res.status(201).json(newGadget);
    } catch (err) {
      next(err);
    }
  }

  // PATCH /api/gadgets/:id
  async updateGadget(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, status } = req.body;
      const updatedGadget = await this.gadgetService.updateGadget(id, {
        name,
        status,
      });
      res.json(updatedGadget);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/gadgets/:id
  async decommissionGadget(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const decommissionedGadget = await this.gadgetService.decommissionGadget(
        id
      );
      res.json(decommissionedGadget);
    } catch (err) {
      next(err);
    }
  }

  // POST /api/gadgets/:id/self-destruct
  async selfDestruct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const confirmationCode = await this.gadgetService.triggerSelfDestruct(id);
      res.json({
        message: `Self-destruct sequence initiated.`,
        confirmationCode,
      });
    } catch (err) {
      next(err);
    }
  }
}
