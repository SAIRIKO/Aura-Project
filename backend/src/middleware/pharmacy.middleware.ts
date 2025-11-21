import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const pharmacyAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Token ausente." });

    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token) return res.status(401).json({ message: "Token inválido." });

    try {
        const payload: any = jwt.verify(token, JWT_SECRET);
        (req as any).userId = payload.sub;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido ou expirado." });
    }
};
