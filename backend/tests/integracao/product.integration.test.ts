import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';

import { supabaseMock } from '../mocks/supabaseMock';
vi.mock('../../src/supabaseClient', () => ({ supabase: supabaseMock }));

import { productController } from '../../src/controllers/product.controller';

describe('Integration - Product routes', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();
    app = express();
    app.use(express.json());
    // mount a simple route that calls controller.create directly (bypass auth)
    app.post('/products', (req, res) => productController.create(req as any, res as any));
  });

  it('POST /products should create product', async () => {
    const body = { name: 'Produto X', price: 10, stock: 5, pharmacyId: 1 };
    const created = { id: 1, name: 'Produto X' };

    // make single() resolve the created product
    supabaseMock.single.mockResolvedValueOnce({ data: created, error: null });

    const res = await request(app).post('/products').send(body);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(created);
  });

  //atualizar produto
  it('PUT /products/:id should update product', async () => {
    const productId = 1;
    const body = { name: 'Produto Y', price: 15, stock: 10 };
    const updated = { id: productId, name: 'Produto Y', price: 15, stock: 10 };
  });
});
