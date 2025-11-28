import { Request, Response } from "express";
import * as service from "../services/product.service";

// validação manual, sem zod :0
function validateCreate(data: any) {
  const errors: string[] = [];

  if (!data.name) errors.push("name é obrigatório");
  if (data.price !== undefined && typeof data.price !== "number")
    errors.push("price deve ser número");
  if (data.stock !== undefined && typeof data.stock !== "number")
    errors.push("stock deve ser número");

  return errors;
}

function validateUpdate(data: any) {
  const errors: string[] = [];

  if (data.name !== undefined && typeof data.name !== "string")
    errors.push("name deve ser string");
  if (data.price !== undefined && typeof data.price !== "number")
    errors.push("price deve ser número");
  if (data.stock !== undefined && typeof data.stock !== "number")
    errors.push("stock deve ser número");

  return errors;
}

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
    const validationErrors = validateCreate(req.body);
    if (validationErrors.length > 0)
      return res.status(400).json({ errors: validationErrors });

    const product = await service.createProduct(req.body);
    return res.status(201).json(product);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

export async function updateHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const validationErrors = validateUpdate(req.body);
    if (validationErrors.length > 0)
      return res.status(400).json({ errors: validationErrors });

    const product = await service.updateProduct(id, req.body);
    if (!product)
      return res.status(404).json({ error: "Produto não encontrado" });

    return res.json(product);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

export async function deleteHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await service.deleteProduct(id);

    if (!deleted)
      return res.status(404).json({ error: "Produto não encontrado" });

    return res.status(204).send();
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
