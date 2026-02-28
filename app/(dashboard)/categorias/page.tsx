import CategoriaHeader from "@/components/categorias/CategoriaHeader";
import CategoriaTable from "@/components/categorias/CategoriaTable";
import { getCategorias } from "@/Services/categorias";

export default async function CategoriasPage() {
  const categories = await getCategorias();

  return (
    <>
      <CategoriaHeader categories={categories} />
      <div className="mx-30 border rounded-lg">
        <div className="m-5  border rounded-lg">
          <CategoriaTable categories={categories} />
        </div>
      </div>
    </>
  );
}
