"use client";

import { deleteProduct } from "@/Services/productos";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/Services/auth";
import { Product } from "@/interfaces/product";
import Image from "next/image";
import { Category } from "@/interfaces/category";

interface ProductTableProps {
  products: Product[];
  categories: Category[];
}

const columns = [
  "Foto",
  "Nombre",
  "Categoría",
  "Marca",
  "Stock Total",
  "Estado",
  "Acciones",
];

export default function ProductsTable({
  products,
  categories,
}: ProductTableProps) {
  const token = getToken();

  const router = useRouter();

  const [productEdit, setProductEdit] = useState<Product | null>(null);

  if (!products.length) return <p>No hay productos</p>;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.photo ? (
                  <Image
                    src={product.photo}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-slate-100 rounded-md" />
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{product.name}</span>
                  <span className="text-sm text-slate-400">
                    {product.description}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {categories.find((c) => c.id === product.categoryId)?.name ??
                  "—"}
              </TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-lg text-sm font-bold border ${
                    product.stock > 10
                      ? "bg-green-100 text-green-700 border-green-700"
                      : product.stock > 0
                        ? "bg-yellow-100 text-yellow-700 border-yellow-700"
                        : "bg-red-100 text-red-700 border-red-700"
                  }`}
                >
                  {product.stock} unidades
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-lg text-sm font-bold border ${
                    product.status === "Active"
                      ? "bg-green-100 text-green-700 border-green-700"
                      : "bg-red-100 text-red-700 border-red-700"
                  }`}
                >
                  {product.status === "Active" ? "Activo" : "Inactivo"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Pencil
                    size={18}
                    className="cursor-pointer text-slate-500"
                    onClick={() => setProductEdit(product)}
                  />
                  <Trash2
                    size={18}
                    className="cursor-pointer text-red-500"
                    onClick={async () => {
                      await deleteProduct(product.id, token);
                      router.refresh();
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
