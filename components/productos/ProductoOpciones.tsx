"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface ProductoOpcionesProps {
  onChange: (opciones: { name: string; values: string[] }[]) => void;
}

export default function ProductoOpciones({ onChange }: ProductoOpcionesProps) {
  const [opciones, setOpciones] = useState<
    { name: string; values: string[] }[]
  >([]);

  function actualizar(nuevas: { name: string; values: string[] }[]) {
    setOpciones(nuevas);
    onChange(nuevas);
  }

  function agregarOpcion() {
    actualizar([...opciones, { name: "", values: [] }]);
  }

  function eliminarOpcion(index: number) {
    actualizar(opciones.filter((_, i) => i !== index));
  }

  function agregarValor(index: number) {
    const nuevas = [...opciones];
    nuevas[index].values.push("");
    actualizar(nuevas);
  }

  function actualizarNombreOpcion(index: number, value: string) {
    const nuevas = [...opciones];
    nuevas[index].name = value;
    actualizar(nuevas);
  }

  function actualizarValor(
    opcionIndex: number,
    valorIndex: number,
    value: string,
  ) {
    const nuevas = [...opciones];
    nuevas[opcionIndex].values[valorIndex] = value;
    actualizar(nuevas);
  }

  return (
    <div className="border rounded-lg p-8 mt-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-lg">Opciones del Producto</h2>
          <p className="text-sm text-slate-400">
            Define las características que tendrán variaciones (ej: Color,
            Talla, Material)
          </p>
        </div>
        <Button type="button" variant="outline" onClick={agregarOpcion}>
          + Agregar Opción
        </Button>
      </div>
      {opciones.map((opcion, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium">Nombre de la Opción</label>
            <Trash2
              size={18}
              className="cursor-pointer text-red-500"
              onClick={() => eliminarOpcion(i)}
            />
          </div>
          <input
            value={opcion.name}
            onChange={(e) => actualizarNombreOpcion(i, e.target.value)}
            className="w-full border rounded-md px-3 py-2 mb-3"
            placeholder="ej: Color, Talla"
          />
          <p className="text-sm font-medium mb-2">Valores disponibles</p>
          {opcion.values.map((valor, j) => (
            <input
              key={j}
              value={valor}
              onChange={(e) => actualizarValor(i, j, e.target.value)}
              className="w-full border rounded-md px-3 py-2 mb-2"
              placeholder="ej: Rojo, Azul"
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => agregarValor(i)}
          >
            + Agregar Valor
          </Button>
        </div>
      ))}
    </div>
  );
}
