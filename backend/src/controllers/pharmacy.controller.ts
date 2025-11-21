import { Request, Response } from "express";
import { supabase } from "../supabaseClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

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
    const { pharmacyname, pharmacyemail, cnpj, address, city, state, cep, pharmacyphone, owner_id, responsiblename, responsiblecrf, responsibleemail, responsiblephone, password, imageurl, approval } = req.body;

    try {

      const { data: existing } = await supabase
        .from("pharmacies")
        .select("*")
        .eq("email", pharmacyemail)
        .limit(1);

      if (existing && existing.length > 0) {
        return res.status(409).json({ error: "Usuário já cadastrado." });
      }

      // Criptografar senha
      const hash = await bcrypt.hash(password, 10);

      // Inserir farmácia
      const { data: newPharmacy, error } = await supabase
        .from("pharmacies")
        .insert([
          {
            pharmacyname,
            cnpj,
            pharmacyphone,
            pharmacyemail,
            address,
            city,
            state,
            cep,
            responsiblename,
            responsiblecrf,
            responsibleemail,
            responsiblephone,
            password: hash,
            imageurl: imageurl ?? null,
            approval,
            owner_id: owner_id ?? null,
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

  // ======================= LOGIN =======================
  async login(req: Request, res: Response) {
    const { pharmacyemail, password } = req.body;

    if (!pharmacyemail || !password)
      return res.status(400).json({ message: "Informe e-mail e senha." });

    const { data: pharmacy, error } = await supabase
      .from("pharmacies")
      .select("*")
      .eq("pharmacyemail", pharmacyemail)
      .single();

    if (!pharmacy) return res.status(401).json({ message: "Credenciais inválidas." });

    const match = await bcrypt.compare(password, pharmacy.password);
    if (!match) return res.status(401).json({ message: "Credenciais inválidas." });

    const token = jwt.sign({ sub: pharmacy.id }, JWT_SECRET, { expiresIn: "7d" });

    return res.json({
      id: pharmacy.id,
      pharmacyname: pharmacy.pharmacyname,
      email: pharmacy.pharmacyemail,
      token,
    });
  },


  // ======================= ME =======================
  async me(req: Request, res: Response) {
    const pharmacyId = (req as any).userId;

    const { data: pharmacy, error } = await supabase
      .from("pharmacies")
      .select("id, pharmacyName, email, cnpj, address, city, state, cep, phone, imageUrl, approval")
      .eq("id", pharmacyId)
      .single();

    if (!pharmacy)
      return res.status(404).json({ message: "Farmácia não encontrada" });

    return res.json(pharmacy);
  },
};