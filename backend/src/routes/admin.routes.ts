import express from "express";
import { adminController } from "../controllers/admin.controller.js";
import { requireAdmin } from "../middleware/admin.middleware.js";

export const adminRouter = express.Router();

adminRouter.put(
  "/pharmacies/:id/approve",
  requireAdmin,
  adminController.approvePharmacy
);
