import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mocks must be declared before importing the module under test
import { supabaseMock } from './mocks/supabaseMock';

vi.mock('jsonwebtoken', () => {
  const verify = vi.fn();
  return { default: { verify }, verify };
});

vi.mock('../src/supabaseClient', () => ({
  supabase: supabaseMock,
}));

// Ensure JWT_SECRET exists for the middleware (avoids 500 in tests)
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_jwt_secret';

import { requireAdmin } from '../src/middleware/admin.middleware';
import jwt from 'jsonwebtoken';

describe('requireAdmin middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve bloquear acesso quando usuário não for ADMIN (retornar 403)', async () => {
    // Arrange
    (jwt.verify as any).mockReturnValue({ sub: 1 });

    const user = { id: 1, role: 'CONSUMER' };
    supabaseMock._setResponse(user, null);

    const req: any = { headers: { authorization: 'Bearer validtoken' } };
    const json = vi.fn();
    const status = vi.fn(() => ({ json }));
    const res: any = { status };
    const next = vi.fn();

    // Act
    await requireAdmin(req, res, next);

    // Assert
    expect(status).toHaveBeenCalledWith(403);
    expect(json).toHaveBeenCalledWith({ error: 'Acesso negado: apenas administradores' });
    expect(next).not.toHaveBeenCalled();
  });
});
