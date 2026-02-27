/* eslint-disable @typescript-eslint/no-unused-vars */
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

export default function CategoriaTable({ categories }: CategoriaTableProps) {
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
              <TableCell>{category.children?.length ?? 0}</TableCell>
              <TableCell>{category.parentId ?? "—"}</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
