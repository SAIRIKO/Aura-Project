import { describe, it, expect, vi, beforeEach } from 'vitest';

import { supabaseMock } from './mocks/supabaseMock';

vi.mock('../src/supabaseClient', () => ({ supabase: supabaseMock }));

import { pharmacyController } from '../src/controllers/pharmacy.controller';

describe('pharmacyController.getAll', () => {
  beforeEach(() => vi.clearAllMocks());

  it('deve listar farmácias', async () => {
    const pharmacies = [{ id: 1, pharmacyname: 'Farm A' }];

    // override select to resolve once
    supabaseMock.select.mockImplementationOnce(() => Promise.resolve({ data: pharmacies, error: null }));

    const json = vi.fn();
    const res: any = { json };
    const req: any = {};

    await pharmacyController.getAll(req, res);

    expect(json).toHaveBeenCalledWith(pharmacies);
  });
});
