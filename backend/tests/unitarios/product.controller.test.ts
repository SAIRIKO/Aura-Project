import { describe, it, expect, vi, beforeEach } from 'vitest';

import { supabaseMock } from '../mocks/supabaseMock';

vi.mock('../../src/supabaseClient', () => ({ supabase: supabaseMock }));

import { productController } from '../../src/controllers/product.controller';

describe('productController.create', () => {
  beforeEach(() => vi.clearAllMocks());

  it('deve adicionar produto', async () => {
    const req: any = { body: { name: 'Produto X', price: 10, stock: 5, pharmacyId: 1 } };

    const created = { id: 1, name: 'Produto X' };
    supabaseMock.single.mockResolvedValueOnce({ data: created, error: null });

    const json = vi.fn();
    const status = vi.fn(() => ({ json }));
    const res: any = { status };

    await productController.create(req, res);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith(created);
  });

  it('deve falhar ao adicionar produto sem nome (erro do supabase)', async () => {
    const req: any = { body: { price: 10 } };

    supabaseMock.single.mockResolvedValueOnce({ data: null, error: { message: 'name required' } });

    const json = vi.fn();
    const status = vi.fn(() => ({ json }));
    const res: any = { status };

    await productController.create(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalled();
  });
});
