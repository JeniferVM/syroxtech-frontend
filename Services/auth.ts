const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function logIn(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
}

export function getToken() {
  if (typeof window === "undefined") return "";
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1] ?? ""
  );
}
