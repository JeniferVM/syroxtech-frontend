"use client";

import { ModalProps } from "@/interfaces/modal";
import Modal from "../ui/Modal";
import { Button } from "../ui/button";
import { useState } from "react";
import { createCategoria, updateCategoria } from "@/Services/categorias";
import { Category } from "@/interfaces/category";
import { useRouter } from "next/navigation";
import { getToken } from "@/Services/auth";

interface CategoriaModalProps extends ModalProps {
  categories: Category[];
  categoria?: Category;
}

export default function CategoriaModal({
  isOpen,
  onClose,
  categories,
  categoria,
}: CategoriaModalProps) {
  const token = getToken();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (categoria) {
      await updateCategoria(
        categoria.id,
        { name: nombre, position: posicion, parentId: parentId || undefined },
        token,
      );
    } else {
      await createCategoria(
        { name: nombre, position: posicion, parentId: parentId || undefined },
        token,
      );
    }
    onClose();
    router.refresh();
  }

  const [nombre, setNombre] = useState(categoria?.name ?? "");
  const [posicion, setPosicion] = useState(categoria?.position ?? 0);
  const [parentId, setParentId] = useState(categoria?.parentId ?? "");
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h1 className="font-bold text-lg mb-4">
          {categoria ? "Editar Categoría" : "Nueva Categoría"}
        </h1>{" "}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Nombre</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mt-1"
              placeholder="Nombre de la categoría"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Posición</label>
            <input
              value={posicion}
              onChange={(e) => setPosicion(Number(e.target.value))}
              className="w-full border rounded-md px-3 py-2 mt-1"
              placeholder="Posición"
            />
          </div>
          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mt-1"
          >
            <option value="">Sin categoría padre</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end content-around">
            <Button
              className="mx-2"
              variant="outline"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
