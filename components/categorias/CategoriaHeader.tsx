"use client";

import { Category } from "@/interfaces/category";
import { useState } from "react";
import { Button } from "../ui/button";
import CategoriaModal from "./CategoriaModal";

interface CategoriaHeaderProps {
  categories: Category[];
}

export default function CategoriaHeader({ categories }: CategoriaHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mx-30 my-10">
      <h1 className="font-bold text-xl">Categorías</h1>
      <Button onClick={() => setIsOpen(true)}>+ Nueva Categoría</Button>
      <CategoriaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        categories={categories}
      />
    </div>
  );
}
