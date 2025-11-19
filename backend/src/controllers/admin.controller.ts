import { Request, Response } from "express";
import { supabase } from "../supabaseClient";

export const adminController = {
  // Aprovar farmácia
  async approvePharmacy(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

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
          details: error,
        });
      }

      res.json({
        message: "Farmácia aprovada com sucesso!",
        pharmacy,
      });
    } catch (error) {
      res.status(400).json({
        error: "Erro inesperado ao aprovar farmácia",
        details: error,
      });
    }
  },
};
