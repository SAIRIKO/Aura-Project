import { Request, Response } from "express";
import { prisma } from "../prismaClient.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const pharmacyController = {
  // Lista todas as farmácias
  async getAll(req: Request, res: Response) {
    try {
      const pharmacies = await prisma.pharmacy.findMany({
        include: {
          owner: true, // Mostra o dono (User) vinculado, se houver
          products: true,
        },
      });
      res.json(pharmacies);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao listar farmácias", details: error });
    }
  },

  // Cria uma nova farmácia
  async create(req: Request, res: Response) {
    try {
      const { name, cnpj, address, phone, ownerId } = req.body;

      const newPharmacy = await prisma.pharmacy.create({
        data: {
          name,
          cnpj,
          address,
          phone,
          owner: ownerId ? { connect: { id: ownerId } } : undefined,
        },
      });

      res.status(201).json(newPharmacy);
    } catch (error) {
      res.status(400).json({ error: "Erro ao criar farmácia", details: error });
    }
  },
};
