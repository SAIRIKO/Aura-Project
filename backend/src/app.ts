import express from "express";
import pharmacyRouter from "./routes/pharmacy.routes";

const app = express();

app.use(express.json());

app.use("/pharmacies", pharmacyRouter); // Register the pharmacy router

export default app;
