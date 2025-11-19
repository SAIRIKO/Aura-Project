import { Request, Response } from "express";
import { supabase } from "../supabaseClient";

export const userController = {
  // Listar todos os usuários
  async getAll(req: Request, res: Response) {
    try {
      const { data: users, error } = await supabase
        .from("users")
        .select("*");

      if (error) {
        return res
          .status(500)
          .json({ error: "Erro ao listar usuários", details: error });
      }

      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro inesperado ao listar usuários", details: error });
    }
  },

  // Criar usuário
  async create(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    try {
      const { data: user, error } = await supabase
        .from("users")
        .insert([{ name, email, password, role }])
        .select()
        .single();

      if (error) {
        return res
          .status(400)
          .json({ error: "Erro ao criar usuário", details: error });
      }

      res.status(201).json(user);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Erro inesperado ao criar usuário", details: error });
    }
  },
};
