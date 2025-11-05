import { PrismaClient } from '../src/generated/prisma';
const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            name: 'Admin',
            email: 'admin@aura.com',
            password: '123456',
            role: 'ADMIN',
        },
    });
}

main()
    .then(() => {
        console.log('✅ Seed completed');
    })
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
