import { usePedidosUrgentes } from "../hooks/usePedidosUrgentes";
import { useProveedores } from "../hooks/useProveedores";

export default function ReportesPage() {
  const { listas } = usePedidosUrgentes();
  const { proveedores } = useProveedores();

  const imprimir = () => {
    window.print();
  };

  return (
    <div className="card">
      <h2>📊 Reportes & Impresión</h2>

      <div className="flex gap-10 mt-20">
        <button className="btn btn-primary" onClick={imprimir}>
          🖨 Imprimir reporte
        </button>
      </div>

      {/* ZONA IMPRIMIBLE */}
      <div className="ticket">
        <h3>EXA - Gestión de Pedidos</h3>
        <p>Reporte generado</p>
        <hr />

        {/* PEDIDOS URGENTES */}
        <h4>🧮 Pedidos urgentes</h4>
        {listas.map(lista => (
          <div key={lista.id} className="ticket-section">
            <strong>📅 {lista.fecha}</strong>
            <p>{lista.tipo}</p>
            <ul>
              {lista.productos.map((p, i) => (
                <li key={i}>
                  {p.nombre} — {p.stock}
                </li>
              ))}
            </ul>
            {lista.comentario && <p>📝 {lista.comentario}</p>}
            <hr />
          </div>
        ))}

        {/* PROVEEDORES */}
        <h4>👥 Proveedores</h4>
        {proveedores.map(p => (
          <div key={p.id} className="ticket-section">
            <strong>{p.nombre}</strong>
            <p>RUC: {p.ruc}</p>
            <p>📞 {p.telefono}</p>
            <p>📦 {p.productos}</p>
            <hr />
          </div>
        ))}

        <p className="center">Gracias por su preferencia</p>
      </div>
    </div>
  );
}
