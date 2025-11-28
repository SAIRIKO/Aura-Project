import { Request, Response } from "express";
import * as service from "../services/product.service";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema";

export async function listHandler(req: Request, res: Response) {
  try {
    const products = await service.listProducts();
    return res.json(products);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

export async function getHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await service.getProductById(id);
    if (!product)
      return res.status(404).json({ error: "Produto não encontrado" });
    return res.json(product);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

export async function createHandler(req: Request, res: Response) {
  try {
    const parsed = createProductSchema.parse(req.body);
    const product = await service.createProduct(parsed);
    return res.status(201).json(product);
  } catch (err: any) {
    console.error(err);
    if (err.name === "ZodError")
      return res.status(400).json({ error: err.errors });
    return res.status(500).json({ error: err.message });
  }
}

export async function updateHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const parsed = updateProductSchema.parse(req.body);
    const product = await service.updateProduct(id, parsed);
    return res.json(product);
  } catch (err: any) {
    console.error(err);
    if (err.name === "ZodError")
      return res.status(400).json({ error: err.errors });
    return res.status(500).json({ error: err.message });
  }
}

export async function deleteHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await service.deleteProduct(id);
    return res.status(204).send();
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
