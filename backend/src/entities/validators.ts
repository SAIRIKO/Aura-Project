// Simple runtime validators for tests (no external dependency)
export function validateUser(obj: any) {
  if (!obj || typeof obj !== 'object') return false;
  const required = ['id', 'name', 'email', 'password', 'CPF', 'birth', 'gender', 'phone', 'role'];
  for (const key of required) {
    if (!(key in obj)) return false;
  }
  if (typeof obj.id !== 'number') return false;
  if (typeof obj.name !== 'string' || obj.name.length === 0) return false;
  if (typeof obj.email !== 'string' || !obj.email.includes('@')) return false;
  if (typeof obj.password !== 'string' || obj.password.length < 6) return false;
  if (typeof obj.CPF !== 'number') return false;
  if (!(obj.birth instanceof Date)) return false;
  const genders = ['male', 'female', 'other', 'not_informed'];
  if (!genders.includes(obj.gender)) return false;
  if (typeof obj.phone !== 'number') return false;
  const roles = ['CONSUMER', 'PHARMACY', 'ADMIN', 'pharmacyOwner'];
  if (!roles.includes(obj.role)) return false;
  return true;
}

export function validatePharmacy(obj: any) {
  if (!obj || typeof obj !== 'object') return false;
  const required = ['id', 'pharmacyname', 'pharmacyemail', 'cnpj', 'pharmacyphone', 'address', 'city', 'state', 'cep', 'password', 'ownerId', 'approved'];
  for (const key of required) {
    if (!(key in obj)) return false;
  }
  if (typeof obj.id !== 'number') return false;
  if (typeof obj.pharmacyname !== 'string' || obj.pharmacyname.length === 0) return false;
  if (typeof obj.pharmacyemail !== 'string' || !obj.pharmacyemail.includes('@')) return false;
  if (typeof obj.cnpj !== 'number') return false;
  if (typeof obj.pharmacyphone !== 'number') return false;
  if (typeof obj.password !== 'string' || obj.password.length < 6) return false;
  if (typeof obj.ownerId !== 'number') return false;
  if (typeof obj.approved !== 'boolean') return false;
  return true;
}

export default { validateUser, validatePharmacy };
