import { config } from "dotenv";
import { join } from "path";
import { defineConfig, env } from "prisma/config";

// Load the .env file from the DB directory
config({ path: join(__dirname, "../DB/.env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
