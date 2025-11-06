import { Request, Response } from "express";
import { prisma } from "../prismaClient.js";

export const adminController = {
  // ✅ Aprovar farmácia
  async approvePharmacy(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const pharmacy = await prisma.pharmacy.update({
        where: { id },
        data: { approved: true },
      });

      res.json({
        message: "Farmácia aprovada com sucesso!",
        pharmacy,
      });
    } catch (error) {
      res
        .status(400)
        .json({ error: "Erro ao aprovar farmácia", details: error });
    }
  },
};
