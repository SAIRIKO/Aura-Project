import { Request, Response } from "express";
import { supabase } from "../supabaseClient";
import bcrypt from "bcryptjs";

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

  // Criar usuário (ADM criando)
  async create(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    try {
      // Verificar e-mail duplicado
      const { data: existing } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .limit(1);

      if (existing && existing.length > 0) {
        return res.status(409).json({ error: "Email já cadastrado." });
      }

      // Criptografar senha
      const hash = await bcrypt.hash(password, 10);

      // Inserir usuário
      const { data: user, error } = await supabase
        .from("users")
        .insert([{ name, email, password: hash, role }])
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
