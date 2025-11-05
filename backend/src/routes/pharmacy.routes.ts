import express from 'express';
import { pharmacyController } from '../controllers/pharmacy.controller';

export const pharmacyRouter = express.Router();

pharmacyRouter.get('/', pharmacyController.getAll);
pharmacyRouter.post('/', pharmacyController.create);
