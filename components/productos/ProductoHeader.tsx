"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Product } from "@/interfaces/product";
import { Category } from "@/interfaces/category";
import { useRouter } from "next/navigation";

interface ProductHeaderProps {
  products: Product[];
  categories: Category[];
}

export default function ProductsTable({
  products,
  categories,
}: ProductHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mx-30 my-10">
      <h1 className="font-bold text-xl">Productos</h1>
      <Button onClick={() => router.push("/productos/new")}>
        + Nuevo Producto
      </Button>
    </div>
  );
}
