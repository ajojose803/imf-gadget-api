import { Router } from "express";
import { GadgetController } from "../controllers/gadgetController";
import { GadgetService } from "../../application/services/gadgetService";
import { GadgetRepository } from "../../domain/repositories/gadgetRepository";
import { PrismaClient } from "@prisma/client";
import { authenticateJWT } from "../../shared/middleware/authMiddleware"; // Import authentication middleware

const router = Router();
const prisma = new PrismaClient();
const gadgetRepository = new GadgetRepository(prisma);
const gadgetService = new GadgetService(gadgetRepository);
const gadgetController = new GadgetController(gadgetService);

router.use( authenticateJWT);

router.get("/", (req, res, next) => {
	gadgetController.getGadgets(req, res, next).catch(next);
});
router.post("/", (req, res, next) => gadgetController.createGadget(req, res, next));
router.patch("/:id", (req, res, next) => gadgetController.updateGadget(req, res, next));
router.delete("/:id", (req, res, next) => gadgetController.decommissionGadget(req, res, next));
router.post("/:id/self-destruct", (req, res, next) => gadgetController.selfDestruct(req, res, next));

export { router as gadgetRoutes };
