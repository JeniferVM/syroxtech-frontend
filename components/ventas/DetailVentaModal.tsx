"use client";

import { ModalProps } from "@/interfaces/modal";
import { Sale, SaleStatus } from "@/interfaces/sales";
import Modal from "../ui/Modal";

interface SaleModalProps extends ModalProps {
  venta?: Sale;
}

const statusStyles: Record<SaleStatus, string> = {
  [SaleStatus.Preparing]: "bg-orange-100 text-orange-700 border-orange-700",

  [SaleStatus.Shipped]: "bg-yellow-100 text-yellow-700 border-yellow-700",

  [SaleStatus.Cancelled]: "bg-red-100 text-red-700 border-red-700",

  [SaleStatus.Completed]: "bg-green-100 text-green-700 border-green-700",
};

export default function DetailVentaModal({
  isOpen,
  onClose,
  venta,
}: SaleModalProps) {
  if (!venta) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-2 justify-between">
        <h1 className="text-xl font-bold mb-6">Gestionar Orden</h1>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xl font-bold"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="border rounded-xl p-4 flex justify-between items-center">
          <div>
            <p className="font-semibold">Estado Actual</p>
            <p className="mt-1 font-bold">Orden #{venta.orderNumber}</p>
          </div>

          <span
            className={`px-3 py-1 rounded-lg text-sm font-bold border ${
              statusStyles[venta.status]
            }`}
          >
            {venta.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-xl p-4">
            <p className="font-semibold mb-3">Información del Cliente</p>

            <p className="font-medium">{venta.clientName}</p>
            <p className="text-sm text-slate-500">{venta.clientEmail}</p>
            {venta.clientPhone && (
              <p className="text-sm">{venta.clientPhone}</p>
            )}
          </div>

          <div className="border rounded-xl p-4">
            <p className="font-semibold mb-3">Información de Pago</p>

            <p>Método: {venta.paymentMethod}</p>
            <p>Estado: {venta.paymentStatus}</p>

            <p className="font-bold text-lg mt-3">${venta.total.toFixed(2)}</p>
          </div>
        </div>

        <div className="border rounded-xl p-4">
          <p className="font-semibold mb-3">Información de Envío</p>

          <p>{venta.address || "Sin dirección registrada"}</p>

          {venta.tracking && (
            <p className="text-sm mt-2">Tracking: {venta.tracking}</p>
          )}
        </div>

        <div className="border rounded-xl p-4">
          <p className="font-semibold mb-2">Fecha de creación</p>

          <p>
            {new Date(venta.createdAt).toLocaleDateString("es-MX", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            })}
          </p>
        </div>
      </div>
    </Modal>
  );
}
