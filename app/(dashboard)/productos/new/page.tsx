"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createProduct } from "@/Services/productos";
import { getToken } from "@/Services/auth";
import { Gender, Marca, State } from "@/interfaces/product";
import ProductoOpciones from "@/components/productos/ProductoOpciones";
import { Category } from "@/interfaces/category";
import { getCategorias } from "@/Services/categorias";

export default function NewProductPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [genero, setGenero] = useState("");
  const [marca, setMarca] = useState("");
  const [estado, setEstado] = useState("Active");
  const [categorias, setCategorias] = useState<Category[]>([]);
  const [categoriaId, setCategoriaId] = useState("");

  useEffect(() => {
    getCategorias().then(setCategorias);
  }, []);

  const [opciones, setOpciones] = useState<
    { name: string; values: string[] }[]
  >([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = getToken();
    await createProduct(
      {
        name: nombre,
        description: descripcion,
        price: precio,
        categoryId: categoriaId || undefined,

        stock: stock,
        gender: genero as Gender,
        brand: marca as Marca,
        status: estado as State,
      },
      token,
    );
    router.push("/productos");
  }

  return (
    <div className="mx-30 my-10">
      <h1 className="font-bold text-xl mb-6">Crear Producto</h1>
      <div className="border rounded-lg p-8">
        <h2 className="font-bold text-lg mb-4">
          Información Básica del Producto
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Nombre del Producto *</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mt-1"
              placeholder="Nombre del producto"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mt-1 h-24"
              placeholder="Descripción detallada del producto"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Precio *</label>
            <div className="flex items-center border rounded-md mt-1">
              <span className="px-3 py-2 text-slate-500 border-r">$</span>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Stock *</label>
            <div className="flex items-center border rounded-md mt-1">
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Categoría</label>
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mt-1"
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Género *</label>
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mt-1"
            >
              <option value="">Selecciona un género</option>
              {Object.values(Gender).map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Marca *</label>
            <select
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mt-1"
            >
              <option value="">Selecciona una marca</option>
              {Object.values(Marca).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <ProductoOpciones onChange={setOpciones} />
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/productos")}
            >
              Cancelar
            </Button>
            <Button type="submit">Crear Producto</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
