import { describe, it, expect } from 'vitest';
import { validateUser } from '../../src/entities/validators';

describe('entities/users-models validation', () => {
  it('validação deve passar para usuário válido', () => {
    const user = {
      id: 1,
      name: 'Teste',
      email: 'teste@example.com',
      password: '123456',
      CPF: 12345678900,
      birth: new Date('1990-01-01'),
      gender: 'male',
      phone: 1234567890,
      role: 'CONSUMER'
    };

    expect(validateUser(user)).toBe(true);
  });

  it('validação deve falhar para usuário inválido', () => {
    const bad = {
      id: 'not-number',
      name: '',
    };
    expect(validateUser(bad)).toBe(false);
  });
});
