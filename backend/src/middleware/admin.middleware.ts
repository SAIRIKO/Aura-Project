import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { supabase } from "../supabaseClient";
import dotenv from "dotenv";

dotenv.config();

export const requireAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ error: "Token não fornecido" });

    const token = authHeader.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
        console.error("❌ JWT_SECRET não encontrado no .env");
        return res.status(500).json({ error: "Configuração do servidor inválida" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
            sub: number;
            role?: string;
        };

        // 🔥 BUSCA CORRETA NO SUPABASE
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", decoded.sub)
            .single();

        if (error || !user)
            return res.status(404).json({ error: "Usuário não encontrado" });

        if (user.role !== "ADMIN") {
            return res
                .status(403)
                .json({ error: "Acesso negado: apenas administradores" });
        }

        (req as any).userId = user.id;
        next();
    } catch (err) {
        console.error("❌ Erro ao validar token:", err);
        return res.status(401).json({ error: "Token inválido" });
    }
};
