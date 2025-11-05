import { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'aura_secret_key';

export const authController = {
    async register(req: Request, res: Response) {
        try {
            const { name, email, password, role } = req.body;

            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) return res.status(400).json({ error: 'Email já registrado' });

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.user.create({
                data: { name, email, password: hashedPassword, role },
            });

            res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao registrar usuário', details: error });
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) return res.status(401).json({ error: 'Senha incorreta' });

            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                SECRET_KEY,
                { expiresIn: '2h' }
            );

            res.json({ message: 'Login bem-sucedido', token });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao realizar login', details: error });
        }
    },
};
