"use client";

import { Bell, Moon, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const routeNames: Record<string, string> = {
    "/": "Inicio",
    "/ventas": "Ventas",
    "/categorias": "Categorías",
    "/productos": "Productos",
  };

  return (
    <nav className="flex items-center justify-between h-14 px-6 border-b">
      <h1 className="mx-5 text-xl font-bold">Admin Panel</h1>
      <h2 className="flex-1 ml-20">{routeNames[pathname] ?? pathname}</h2>
      <div className="flex items-center gap-4">
        <Bell size={20} className="text-slate-500 cursor-pointer" />
        <Moon size={20} className="text-slate-500 cursor-pointer" />
        <User size={20} className="text-slate-500 cursor-pointer" />
      </div>
    </nav>
  );
}
