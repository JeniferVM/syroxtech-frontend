"use client";

import { ModalProps } from "@/interfaces/modal";
import Modal from "../ui/Modal";
import { Button } from "../ui/button";
import { useState } from "react";
import { newSale } from "@/Services/ventas";
import { useRouter } from "next/navigation";
import { getToken } from "@/Services/auth";
import { Product } from "@/interfaces/product";
import { SaleStatus } from "@/interfaces/sales";

interface SaleModalProps extends ModalProps {
  productos?: Product[];
}

export default function NewVentaModal({
  isOpen,
  onClose,
  productos,
}: SaleModalProps) {
  const token = getToken();
  const router = useRouter();

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Tarjeta");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await newSale(
      {
        clientName,
        clientEmail,
        clientPhone,
        total,
        address,
        paymentMethod,
        status: SaleStatus.Preparing,
      },
      token,
    );
    onClose();
    router.refresh();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="font-bold text-lg mb-4">Nuevo Pedido</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium">Nombre del Cliente *</label>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mt-1"
            placeholder="Nombre completo"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email *</label>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mt-1"
            placeholder="correo@email.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Teléfono</label>
          <input
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mt-1"
            placeholder="55 1234 5678"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Dirección</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mt-1"
            placeholder="Dirección de envío"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Método de Pago</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mt-1"
          >
            <option value="Tarjeta">Tarjeta</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Modal>
  );
}
