import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user.routes';
import { pharmacyRouter } from './routes/pharmacy.routes';

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/users', userRouter);
app.use('/pharmacies', pharmacyRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
