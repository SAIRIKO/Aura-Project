import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';

import { supabaseMock } from '../mocks/supabaseMock';
vi.mock('../../src/supabaseClient', () => ({ supabase: supabaseMock }));

import pharmacyRouter from '../../src/routes/pharmacy.routes';

describe('Integration - Pharmacy routes', () => {
  let app: any;

  beforeEach(() => {
    vi.clearAllMocks();
    app = express();
    app.use(express.json());
    app.use('/pharmacies', pharmacyRouter);
  });

  it('GET /pharmacies returns list', async () => {
    const pharmacies = [{ id: 1, pharmacyname: 'Farm A' }];
    supabaseMock.select.mockResolvedValueOnce({ data: pharmacies, error: null });

    const res = await request(app).get('/pharmacies');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(pharmacies);
  });

  it('POST /pharmacies/create creates pharmacy', async () => {
    const body = { pharmacyname: 'Farm B', pharmacyemail: 'b@x.com', password: '123', cnpj: 123, address: 'a', city: 'c', state: 'S', cep: '11111', pharmacyphone: 123 };
    const created = { id: 2, pharmacyname: 'Farm B' };

    // Ensure insert().select().single() resolves
    supabaseMock.single.mockResolvedValueOnce({ data: created, error: null });
    supabaseMock.from.mockReturnThis();

    const res = await request(app).post('/pharmacies/create').send(body);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(created);
  });
});
