import VentaHeader from "@/components/ventas/VentaHeader";
import VentaTable from "@/components/ventas/VentaTable";
import { getCategorias } from "@/Services/categorias";
import { getSales } from "@/Services/ventas";
import { cookies } from "next/headers";

export default async function VentasPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value ?? "";

  const sales = await getSales(token);
  const categories = await getCategorias();

  return (
    <>
      <VentaHeader categories={categories} />
      <div className="border rounded-lg">
        <div className="m-5 border rounded-lg">
          <VentaTable ventas={sales ?? []} />
        </div>
      </div>
    </>
  );
}
