const API_URL = "https://aura-project-uowq.onrender.com";

export async function login(identifier: string, password: string) {
  // identifier = email OU CPF
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login inválido");
  return data.token;
}

export async function register(
  name: string,
  CPF: string,
  email: string,
  password: string,
  birth: string,
  gender: string,
  phone: string,
  role: string
) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      CPF,
      email,
      password,
      birth,
      gender,
      phone,
      role,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    const message =
      typeof data.error === "object" && data.error?.message
        ? data.error.message
        : data.error || "Falha ao registrar";
    throw new Error(message);
  }

  return data;
}


export async function getPharmacies(token: string) {
  const res = await fetch(`${API_URL}/api/pharmacies`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Não autorizado ou erro ao buscar farmácias");
  return await res.json();
}

export async function registerPharmacy(payload: {
  pharmacyname: string;
  pharmacyemail: string;
  cnpj: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  pharmacyphone: string;
  owner_id?: number | null;
  responsiblename: string;
  responsiblecrf: string;
  responsibleemail: string;
  responsiblephone: string;
  password: string;
  imageurl?: string | null;
  approval: "pending";
}) {
  const res = await fetch(`${API_URL}/api/pharmacies/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Erro ao criar farmácia");
  }

  return data;
}

// ==========================================
//  FARMÁCIA - LOGIN
// ==========================================
export async function pharmacyLogin(pharmacyemail: string, password: string) {
  const res = await fetch(`${API_URL}/api/pharmacies/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pharmacyemail, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Falha no login da farmácia");
  }

  return {
    id: data.id,
    pharmacyname: data.pharmacyname,
    email: data.email,
    token: data.token,
  };
}
// ==========================================
//  FARMÁCIA - PERFIL
// ==========================================
export async function getAllPharmacies(token: string) {
  const res = await fetch(`${API_URL}/api/pharmacies`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Erro ao buscar farmácias");
  }

  return data;
}
// ==========================================
//  FARMÁCIA - PERFIL
// ==========================================
export async function getPharmacyProfile(token: string) {
  const res = await fetch(`${API_URL}/api/pharmacies/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erro ao buscar dados da farmácia");
  }

  return data;
}

export async function getProducts(token: string) {
  const res = await fetch(`${API_URL}/api/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Não autorizado ou erro ao buscar produtos");
  return await res.json();
}

export async function getMensagem() {
  const res = await fetch(`${API_URL}/`);
  return await res.text();
}
