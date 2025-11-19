// by spider
import { Request, Response } from "express";
import { supabase } from "../supabaseClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// ======================= REGISTER =======================
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Preencha todos os campos." });

  // Verificar se usuário já existe
  const { data: existing, error: existingError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // Se já existe, impede cadastro
  if (existing)
    return res.status(409).json({ message: "Email já cadastrado." });

  // Criptografar senha
  const hash = await bcrypt.hash(password, 10);

  // Criar usuário
  const { data: user, error: createError } = await supabase
    .from("users")
    .insert([{ name, email, password: hash }])
    .select()
    .single();

  if (createError)
    return res.status(500).json({ message: "Erro ao criar usuário.", error: createError });

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  });
};

// ======================= LOGIN =======================
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user)
    return res.status(401).json({ message: "Credenciais inválidas." });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).json({ message: "Credenciais inválidas." });

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
};

// ======================= ME =======================
export const me = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const { data: user, error } = await supabase
    .from("users")
    .select("id, name, email")
    .eq("id", userId)
    .single();

  if (!user)
    return res.status(404).json({ message: "Usuário não encontrado" });

  return res.json(user);
};
