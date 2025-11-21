import { Request, Response } from "express";
import { supabase } from "../supabaseClient";

export const adminController = {
  // Aprovar farmácia
  async approvePharmacy(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (!id) {
        return res.status(400).json({ error: "ID inválido." });
      }

      // Atualiza o campo "approved" para true
      const { data: pharmacy, error } = await supabase
        .from("pharmacies")
        .update({ approved: true })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return res.status(400).json({
          error: "Erro ao aprovar farmácia",
          details: error.message,
        });
      }

      return res.json({
        message: "Farmácia aprovada com sucesso!",
        pharmacy,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro inesperado ao aprovar farmácia",
        details: (error as any).message,
      });
    }
  },
};
