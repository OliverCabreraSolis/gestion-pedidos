import { useApp } from "../context/AppContext";
import { useState } from "react";

export default function ReportesPage() {
  const { pedidos, obtenerProveedorPorId } = useApp();
  const [tipo, setTipo] = useState("diario");

  const hoy = new Date();

  const esMismoDia = (fecha) =>
    new Date(fecha).toDateString() === hoy.toDateString();

  const esMismaSemana = (fecha) => {
    const f = new Date(fecha);
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay());
    return f >= inicioSemana;
  };

  const esMismoMes = (fecha) =>
    new Date(fecha).getMonth() === hoy.getMonth();

  const pedidosFiltrados = pedidos.filter(p => {
    if (tipo === "diario") return esMismoDia(p.fecha);
    if (tipo === "semanal") return esMismaSemana(p.fecha);
    if (tipo === "mensual") return esMismoMes(p.fecha);
    return false;
  });

  const imprimir = () => window.print();

  return (
    <div className="card">
      <h2>📊 Reportes</h2>

      {/* BOTONES */}
      <div className="reportes-botones">
        <button onClick={() => setTipo("diario")} className="btn btn-primary">
          📅 Diario
        </button>
        <button onClick={() => setTipo("semanal")} className="btn btn-secondary">
          📆 Semanal
        </button>
        <button onClick={() => setTipo("mensual")} className="btn btn-info">
          🗓 Mensual
        </button>
        <button onClick={imprimir} className="btn btn-success">
          🖨 Imprimir
        </button>
      </div>

      {/* ZONA IMPRIMIBLE */}
      <div className="reporte-ticket">
        <h3 className="center">EXA – REPORTE {tipo.toUpperCase()}</h3>
        <p className="center">{hoy.toLocaleDateString()}</p>

        <div className="reporte-lista">
          <div className="reporte-header">
            <span>Proveedor</span>
            <span>Importe</span>
          </div>

          {pedidosFiltrados.map(p => {
            const prov = obtenerProveedorPorId(p.proveedorId);
            return (
              <div key={p.id} className="reporte-row">
                <span>{prov?.nombre || "Proveedor"}</span>
                <span>S/ {Number(p.montoEstimado).toFixed(2)}</span>
              </div>
            );
          })}
        </div>

        {/* FIRMA */}
        <div className="firma">
          <p>__________________________</p>
          <p>Encargado</p>
        </div>
      </div>
    </div>
  );
}
