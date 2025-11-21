import { vi } from 'vitest';

export const supabaseMock = {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    single: vi.fn(),

    // controle dos retornos
    _setResponse(data: any, error: any = null) {
        // For chains that end with .single()
        this.single.mockResolvedValue({ data, error });
    }
};
