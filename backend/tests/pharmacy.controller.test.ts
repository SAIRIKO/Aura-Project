import { describe, it, expect, vi, beforeEach } from 'vitest';

import { supabaseMock } from './mocks/supabaseMock';

vi.mock('../src/supabaseClient', () => ({
  supabase: supabaseMock,
}));

import { pharmacyController } from '../src/controllers/pharmacy.controller';

describe('pharmacyController.me', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('farmácia inexistente deve retornar 404', async () => {
    // Arrange: supabase returns no pharmacy
    supabaseMock._setResponse(null, null);

    const req: any = { headers: {}, userId: 999 };
    const json = vi.fn();
    const status = vi.fn(() => ({ json }));
    const res: any = { status };

    // Act
    await pharmacyController.me(req, res);

    // Assert
    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ message: 'Farmácia não encontrada' });
  });
});
