import { describe, it, expect, vi, beforeEach } from 'vitest';

// mock jsonwebtoken before importing the middleware
vi.mock('jsonwebtoken', () => {
  const verify = vi.fn();
  return { default: { verify }, verify };
});

import { authMiddleware } from '../src/middleware/auth.middleware';
import jwt from 'jsonwebtoken';

describe('authMiddleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('token inválido deve retornar 401', () => {
    (jwt.verify as any).mockImplementation(() => { throw new Error('invalid'); });

    const req: any = { headers: { authorization: 'Bearer invalidtoken' } };
    const json = vi.fn();
    const status = vi.fn(() => ({ json }));
    const res: any = { status };
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ message: 'Token inválido.' });
    expect(next).not.toHaveBeenCalled();
  });
});
