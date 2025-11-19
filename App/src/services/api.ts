const API_URL = "https://aura-project-uowq.onrender.com";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login inválido");
  return data.token; // Supondo que o backend retorna { token: ... }
}

export async function register(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Falha ao registrar");
  return data;
}

export async function getPharmacies(token: string) {
  const res = await fetch(`${API_URL}/api/pharmacies`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Não autorizado ou erro ao buscar farmácias");
  return await res.json();
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
  const data = await res.text();
  return data;
}
