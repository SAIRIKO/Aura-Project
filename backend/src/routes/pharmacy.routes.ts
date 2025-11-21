// pharmacy.routes.ts
import { Router } from "express";
import { pharmacyController } from "../controllers/pharmacy.controller";

const pharmacyRouter = Router();

// Rotas públicas
pharmacyRouter.get("/", pharmacyController.getAll);
pharmacyRouter.post("/", pharmacyController.create);
pharmacyRouter.post("/login", pharmacyController.login);

export default pharmacyRouter;
