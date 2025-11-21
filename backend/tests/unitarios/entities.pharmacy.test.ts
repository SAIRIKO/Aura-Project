import { describe, it, expect } from 'vitest';
import { validatePharmacy } from '../../src/entities/validators';

describe('entities/pharmacy validation', () => {
  it('validação deve passar para farmácia válida', () => {
    const pharmacy = {
      id: 1,
      pharmacyname: 'Farmacia X',
      pharmacyemail: 'farmacia@example.com',
      cnpj: 12345678901234,
      pharmacyphone: 1234567890,
      address: 'Rua A, 123',
      city: 'Cidade',
      state: 'ST',
      cep: '12345-678',
      password: 'abcdef',
      ownerId: 2,
      approved: false
    };

    expect(validatePharmacy(pharmacy)).toBe(true);
  });

  it('validação deve falhar para farmácia inválida', () => {
    const bad = { pharmacyname: '', pharmacyemail: 'no-at-symbol' };
    expect(validatePharmacy(bad)).toBe(false);
  });
});
