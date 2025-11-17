import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await prisma.user.upsert({
        where: { email: "admin@aura.com" },
        update: {},
        create: {
            name: "Admin",
            email: "admin@aura.com",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("✅ Usuário admin criado com sucesso!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
