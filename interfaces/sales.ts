export interface Sale {
  id: string;
  orderNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  status: SaleStatus;
  total: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  address?: string;
  tracking?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum SaleStatus {
  Preparing = "PREPARING",
  Shipped = "SHIPPED",
  Cancelled = "CANCELLED",
  Completed = "COMPLETED",
}

export enum PaymentStatus {
  Pagado = "Pagado",
  Fallido = "Fallido",
}
