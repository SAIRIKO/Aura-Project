import { prisma } from '../prismaClient';
import { Request, Response } from 'express';

export const userController = {
    async getAll(req: Request, res: Response) {
        const users = await prisma.user.findMany();
        res.json(users);
    },

    async create(req: Request, res: Response) {
        const { name, email, password, role } = req.body;

        try {
            const user = await prisma.user.create({
                data: { name, email, password, role },
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao criar usuário', details: error });
        }
    },
};
