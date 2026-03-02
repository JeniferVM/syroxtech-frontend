"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/Services/auth";
import { Sale, SaleStatus } from "@/interfaces/sales";
import DetailVentaModal from "./DetailVentaModal";

interface VentaTableProps {
  ventas: Sale[];
}

const columns = [
  "Cliente",
  "Número de Orden",
  "Estado",
  "Total",
  "Pago",
  "Acciones",
];

const statusStyles: Record<SaleStatus, string> = {
  [SaleStatus.Preparing]: "bg-orange-100 text-orange-700 border-orange-700",

  [SaleStatus.Shipped]: "bg-yellow-100 text-yellow-700 border-yellow-700",

  [SaleStatus.Cancelled]: "bg-red-100 text-red-700 border-red-700",

  [SaleStatus.Completed]: "bg-green-100 text-green-700 border-green-700",
};

export default function VentaTable({ ventas }: VentaTableProps) {
  const token = getToken();
  const router = useRouter();

  const [ventaEdit, setVentaEdit] = useState<Sale | null>(null);

  const [ventaSeleccionada, setVentaSeleccionada] = useState<Sale | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  if (!ventas.length) return <p>No hay ventas</p>;

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
          {ventas.map((venta) => (
            <TableRow key={venta.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-sm">
                    {venta.clientName.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex flex-col font-bold">
                    <span>{venta.clientName}</span>
                    <span className="text-sm text-slate-400">
                      {venta.clientEmail}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex flex-col font-bold">
                  <span>{venta.orderNumber}</span>
                  <span className="text-sm text-slate-400">
                    (
                    {new Date(venta.createdAt).toLocaleDateString("es-MX", {
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                    })}
                    )
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <span
                  className={`px-2 py-1 rounded-lg text-sm font-bold border ${
                    statusStyles[venta.status]
                  }`}
                >
                  {venta.status}
                </span>
              </TableCell>

              <TableCell>
                <div className="flex flex-col items-end font-bold">
                  <span>${venta.total.toFixed(2)}</span>
                  <span className="text-sm text-slate-400">
                    {venta.paymentMethod}
                  </span>
                </div>
              </TableCell>

              <TableCell>{venta.paymentStatus}</TableCell>

              <TableCell>
                <div className="flex gap-2">
                  <Eye
                    size={18}
                    className="cursor-pointer text-slate-500"
                    onClick={() => {
                      setVentaSeleccionada(venta);
                      setIsDetailOpen(true);
                    }}
                  />

                  <Pencil
                    size={18}
                    className="cursor-pointer text-slate-500"
                    onClick={() => setVentaEdit(venta)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DetailVentaModal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setVentaSeleccionada(null);
        }}
        venta={ventaSeleccionada || undefined}
      />
    </>
  );
}
