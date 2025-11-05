import { PrismaClient } from './generated/prisma';

export const prisma = new PrismaClient();

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
