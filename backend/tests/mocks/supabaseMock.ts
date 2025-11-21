export const supabaseMock = {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),

    // controle dos retornos
    _setResponse(data: any, error: any = null) {
        this.select.mockResolvedValue({ data, error });
        this.insert.mockResolvedValue({ data, error });
        this.update.mockResolvedValue({ data, error });
        this.delete.mockResolvedValue({ data, error });
    }
};
