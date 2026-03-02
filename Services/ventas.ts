import { Sale } from "@/interfaces/sales";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function getSales(token: string) {
  const response = await fetch(`${API_URL}/sales`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function newSale(data: Partial<Sale>, token: string) {
  const response = await fetch(`${API_URL}/sales`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateSale(
  id: string,
  data: Partial<Sale>,
  token: string,
) {
  const response = await fetch(`${API_URL}/sales/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteSale(id: string, token: string) {
  const response = await fetch(`${API_URL}/sales/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
