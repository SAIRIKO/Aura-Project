import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";
import pharmacyRouter from "./routes/pharmacy.routes";
import { productRouter } from "./routes/product.routes";
import { adminRouter } from "./routes/admin.routes";

dotenv.config();

const app = express();

// === Middlewares globais ===
app.use(cors());
app.use(express.json());

// === Rotas ===
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/pharmacies", pharmacyRouter);
app.use("/api/products", productRouter);
app.use("/api/admin", adminRouter);

// === Rota base (teste rápido) ===
app.get("/", (_req, res) => {
  res.json({ message: "🚀 API Aura Project online with Supabase!" });
});

// === Inicialização do servidor ===
const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    console.log(" Conectando ao Supabase...");

    console.log(" Conectado ao Supabase.");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Erro ao conectar ao Supabase:", error);
    process.exit(1);
  }
}

startServer();
