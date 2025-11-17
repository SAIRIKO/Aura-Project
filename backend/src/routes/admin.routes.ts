import express from "express";
import { adminController } from "../controllers/admin.controller";
import { requireAdmin } from "../middleware/admin.middleware";

export const adminRouter = express.Router();

adminRouter.put(
  "/pharmacies/:id/approve",
  requireAdmin,
  adminController.approvePharmacy
);
