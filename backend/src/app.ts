import express from "express";
import pharmacyRouter from "./routes/pharmacy.routes";
import { adminRouter } from "./routes/admin.routes";
import { userRouter } from "./routes/user.routes";
import productRouter from "./routes/product.routes"; // <-- IMPORTANTE
import dotenv from "dotenv";
import { supabase } from "./supabaseClient";

dotenv.config();

const app = express();
app.use(express.json());

// Rotas
app.use("/pharmacies", pharmacyRouter);
app.use("/admins", adminRouter);
app.use("/users", userRouter);
app.use("/products", productRouter); // <-- REGISTRA A NOVA API

// Função para iniciar o servidor
async function startServer() {
  try {
    const { data, error } = await supabase
      .from("pharmacies")
      .select("id")
      .limit(1);

    if (error) {
      console.error("❌ Erro ao conectar ao Supabase:", error);
      process.exit(1);
    }

    console.log("✅ Conexão com Supabase estabelecida com sucesso!");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("❌ Erro inesperado:", e);
    process.exit(1);
  }
}

startServer();

export default app;
