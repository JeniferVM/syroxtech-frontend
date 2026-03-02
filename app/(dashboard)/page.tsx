export default function Home() {
  return (
    <div className="m-10">
      <div className="flex gap-6">
        <div className="border rounded-lg p-6 w-80 h-full">
          <h2 className="text-sm font-medium text-slate-500">
            Inventario de Productos
          </h2>
          <h3 className="text-4xl font-bold mt-4">128</h3>
          <p className="text-sm text-slate-500 mt-1">Productos en inventario</p>
          <p className="text-sm font-medium mt-2">Valor: $190,192.00</p>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span>Tenis Adidas VL Court Base</span>
              <span className="text-slate-500">2 uds.</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Nike Air Max</span>
              <span className="text-slate-500">8 uds.</span>
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-6 flex-1">
          <h2 className="text-lg font-bold mb-4">Ventas Recientes</h2>
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">Santiago Perez Baglivo</p>
                  <p className="text-sm text-slate-500">
                    Order #ab1850e7 - Status: SHIPPED
                  </p>
                  <p className="text-sm text-slate-500">
                    2025-08-18T23:08:03.774Z
                  </p>
                </div>
                <span className="text-green-600 font-bold">$589.00</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border rounded-lg p-6 w-80">
          <h2 className="text-lg font-bold mb-4">Productos Más Vendidos</h2>
          <p className="text-sm text-slate-400 text-center mt-10">
            No hay productos top para mostrar.
          </p>
        </div>
      </div>
    </div>
  );
}
