import { Router } from "express";
import { pharmacyController } from "../controllers/pharmacy.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const pharmacyRouter = Router();

// Rotas protegidas — só acessíveis com token JWT
pharmacyRouter.get("/", authMiddleware, pharmacyController.getAll);
pharmacyRouter.post("/", authMiddleware, pharmacyController.create);

export default pharmacyRouter;
