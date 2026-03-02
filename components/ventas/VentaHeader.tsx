"use client";

import { Category } from "@/interfaces/category";
import { useState } from "react";
import { Button } from "../ui/button";
import NewVentaModal from "./NewVentaModal";

interface VentaHeaderProps {
  categories: Category[];
}

export default function VentaHeader({ categories }: VentaHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center m-10">
      <h1 className="font-bold text-xl">Ventas</h1>
      <Button onClick={() => setIsOpen(true)}>+ Nuevo Pedido</Button>
      <NewVentaModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
