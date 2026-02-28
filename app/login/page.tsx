"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logIn } from "@/Services/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = await logIn(email, password);
    document.cookie = `token=${data.token}; path=/`;
    router.push("/");
    router.refresh();
  }
  return (
    <>
      <div className="fixed inset-0" />
      <div className="flex fixed inset-0 items-center justify-center">
        <div className="flex flex-col gap-3 border rounded-lg px-8 py-24 w-96">
          <div>
            <Image
              src="/logo.png"
              alt="Tennis Star"
              width={120}
              height={60}
              className="mx-auto mb-4"
            />
            <h1 className="font-bold text-5xl mb-2 text-center">
              Iniciar Sesión
            </h1>
            <h3 className="text-sm justify-center mb-6 text-center">
              Ingresa a tu cuenta para continuar
            </h3>
          </div>
          <div>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 mt-1"
                  placeholder="ejemplo@mail.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 mt-1"
                />
              </div>
              <Button type="submit" className="w-full mt-6">
                Entrar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
