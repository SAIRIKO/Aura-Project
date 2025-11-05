import express from 'express';
import { productController } from '../controllers/product.controller';
import { authenticateToken } from '../middleware/auth.middleware';

export const productRouter = express.Router();

productRouter.get('/', authenticateToken, productController.getAll);
productRouter.post('/', authenticateToken, productController.create);
productRouter.put('/:id', authenticateToken, productController.update);
productRouter.delete('/:id', authenticateToken, productController.remove);
