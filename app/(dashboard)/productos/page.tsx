import ProductHeader from "@/components/productos/ProductoHeader";
import ProductsTable from "@/components/productos/ProductoTable";
import { getCategorias } from "@/Services/categorias";
import { getProducts } from "@/Services/productos";

export default async function ProductosPage() {
  const products = await getProducts();
  const categories = await getCategorias();

  return (
    <>
      <ProductHeader products={products} categories={categories} />
      <div className="mx-30 border rounded-lg">
        <div className="m-5 border rounded-lg">
          <ProductsTable products={products} categories={categories} />
        </div>
      </div>
    </>
  );
}
