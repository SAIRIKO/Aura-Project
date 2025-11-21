import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('jsonwebtoken', () => {
  const verify = vi.fn();
  return { default: { verify }, verify };
});

import { pharmacyAuthMiddleware } from '../../src/middleware/pharmacy.middleware';
import jwt from 'jsonwebtoken';

describe('pharmacyAuthMiddleware', () => {
  beforeEach(() => vi.clearAllMocks());

  it('token ausente deve retornar 401', () => {
    const req: any = { headers: {} };
    const json = vi.fn();
    const status = vi.fn(() => ({ json }));
    const res: any = { status };
    const next = vi.fn();

    pharmacyAuthMiddleware(req, res, next);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ message: 'Token ausente.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('token inválido deve retornar 401', () => {
    (jwt.verify as any).mockImplementation(() => { throw new Error('invalid'); });
    const req: any = { headers: { authorization: 'Bearer invalidtoken' } };
    const json = vi.fn();
    const status = vi.fn(() => ({ json }));
    const res: any = { status };
    const next = vi.fn();

    pharmacyAuthMiddleware(req, res, next);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ message: 'Token inválido ou expirado.' });
    expect(next).not.toHaveBeenCalled();
  });
});
