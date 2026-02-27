"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CategoriaHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mx-30 my-10">
      <h1 className="font-bold text-xl">Categorías</h1>
      <Button onClick={() => setIsOpen(true)}>+ Nueva Categoría</Button>
    </div>
  );
}
