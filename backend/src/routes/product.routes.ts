import { Router } from "express";
import * as controller from "../controllers/product.controller";

const router = Router();

router.get("/", controller.listHandler);
router.get("/:id", controller.getHandler);
router.post("/", controller.createHandler);
router.put("/:id", controller.updateHandler);
router.delete("/:id", controller.deleteHandler);

export default router;
