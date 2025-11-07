import express from "express";
import { productController } from "../controllers/product.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const productRouter = express.Router();

productRouter.get("/", authMiddleware, productController.getAll);
productRouter.post("/", authMiddleware, productController.create);
productRouter.put("/:id", authMiddleware, productController.update);
productRouter.delete("/:id", authMiddleware, productController.remove);
