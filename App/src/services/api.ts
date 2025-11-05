const API_URL = "http://10.0.12.29"; // coloque o IP do seu PC na rede

export async function getMensagem() {
  const res = await fetch(`${API_URL}/`);
  const data = await res.text();
  return data;
}
