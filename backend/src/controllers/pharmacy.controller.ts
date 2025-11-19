import { Request, Response } from "express";
import { supabase } from "../supabaseClient";

export const pharmacyController = {
  // ============================
  // LISTAR TODAS AS FARMÁCIAS
  // ============================
  async getAll(req: Request, res: Response) {
    try {
      // Puxa farmácias
      const { data: pharmacies, error } = await supabase
        .from("pharmacies")
        .select(`
          *,
          owner: users!ownerId ( id, name, email ),
          products (*)
        `);

      if (error) {
        return res.status(500).json({
          error: "Erro ao listar farmácias",
          details: error,
        });
      }

      res.json(pharmacies);
    } catch (error) {
      res.status(500).json({ error: "Erro inesperado", details: error });
    }
  },

  // ============================
  // CRIAR UMA FARMÁCIA
  // ============================
  async create(req: Request, res: Response) {
    try {
      const { name, cnpj, address, phone, ownerId } = req.body;

      // Inserir farmácia
      const { data: newPharmacy, error } = await supabase
        .from("pharmacies")
        .insert([
          {
            name,
            cnpj,
            address,
            phone,
            ownerId: ownerId ?? null,
          },
        ])
        .select()
        .single();

      if (error) {
        return res.status(400).json({
          error: "Erro ao criar farmácia",
          details: error,
        });
      }

      res.status(201).json(newPharmacy);
    } catch (error) {
      res.status(400).json({ error: "Erro inesperado", details: error });
    }
  },
};
