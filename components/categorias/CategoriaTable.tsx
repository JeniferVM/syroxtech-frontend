"use client";

import { Category } from "@/interfaces/category";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { deleteCategoria } from "@/Services/categorias";
import { useState } from "react";
import CategoriaModal from "./CategoriaModal";
import { useRouter } from "next/navigation";

interface CategoriaTableProps {
  categories: Category[];
}

const columns = [
  "Posición",
  "Nombre",
  "Subcategorías",
  "Categoría Padre",
  "Acciones",
];

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjMDAzZGUxLWM2ZGEtNDNlMS1iNjU3LWFlYzU4YmM5OWQwNyIsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJpYXQiOjE3NzIyNTc5NTgsImV4cCI6MTc3MjI1OTc1OH0.-rEBQOy6ACpNbN2vi4pbUhhnxOcm_OWANXZI8gCPKR4";

export default function CategoriaTable({ categories }: CategoriaTableProps) {
  const router = useRouter();

  const [categoriaEdit, setCategoriaEdit] = useState<Category | null>(null);

  if (!categories.length) return <p>No hay categorías</p>;

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
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.position}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                {category.children?.length ?? 0} subcategorías
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    category.parentId
                      ? "bg-blue-100 font-bold text-blue-700 border border-blue-700 rounded-lg"
                      : "bg-green-100 font-bold text-green-700 border border-green-700 rounded-lg"
                  }`}
                >
                  {category.parentId
                    ? (categories.find((c) => c.id === category.parentId)
                        ?.name ?? "—")
                    : "Principal"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Eye size={18} className="cursor-pointer text-slate-500" />
                  <Pencil
                    size={18}
                    className="cursor-pointer text-slate-500"
                    onClick={() => setCategoriaEdit(category)}
                  />{" "}
                  <Trash2
                    size={18}
                    className="cursor-pointer text-red-500"
                    onClick={async () => {
                      await deleteCategoria(category.id, token);
                      router.refresh();
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {categoriaEdit && (
        <CategoriaModal
          isOpen={!!categoriaEdit}
          onClose={() => setCategoriaEdit(null)}
          categories={categories}
          categoria={categoriaEdit}
        />
      )}
    </>
  );
}
