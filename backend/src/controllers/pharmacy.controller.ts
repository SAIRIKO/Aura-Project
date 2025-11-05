import { prisma } from '../prismaClient';
import { Request, Response } from 'express';

export const pharmacyController = {
    async getAll(req: Request, res: Response) {
        const pharmacies = await prisma.pharmacy.findMany({
            include: { products: true },
        });
        res.json(pharmacies);
    },

    async create(req: Request, res: Response) {
        const { name, cnpj, address, phone } = req.body;

        try {
            const pharmacy = await prisma.pharmacy.create({
                data: { name, cnpj, address, phone },
            });
            res.status(201).json(pharmacy);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao criar farmácia', details: error });
        }
    },
};
