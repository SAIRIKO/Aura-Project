import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export const productController = {
  // Listar produtos
  async getAll(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany({
        include: { pharmacy: true },
      });
      res.json(products);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao listar produtos", details: error });
    }
  },

  // Criar produto
  async create(req: Request, res: Response) {
    try {
      const {
        name,
        description,
        category,
        activeIngredient,
        price,
        stock,
        imageUrl,
        pharmacyId,
      } = req.body;

      const product = await prisma.product.create({
        data: {
          name,
          description,
          category,
          activeIngredient,
          price,
          stock,
          imageUrl,
          pharmacy: { connect: { id: pharmacyId } },
        },
      });

      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: "Erro ao criar produto", details: error });
    }
  },

  // Atualizar produto
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name, description, category, price, stock, imageUrl } = req.body;

      const updated = await prisma.product.update({
        where: { id },
        data: { name, description, category, price, stock, imageUrl },
      });

      res.json(updated);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Erro ao atualizar produto", details: error });
    }
  },

  // Deletar produto
  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await prisma.product.delete({ where: { id } });
      res.json({ message: "Produto removido com sucesso" });
    } catch (error) {
      res
        .status(400)
        .json({ error: "Erro ao remover produto", details: error });
    }
  },
};
