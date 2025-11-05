import { Router } from 'express';
import { pharmacyController } from '../controllers/pharmacy.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const pharmacyRouter = Router();

// Rotas protegidas — só acessíveis com token JWT
pharmacyRouter.get('/', authenticateToken, pharmacyController.getAll);
pharmacyRouter.post('/', authenticateToken, pharmacyController.create);

export default pharmacyRouter;
