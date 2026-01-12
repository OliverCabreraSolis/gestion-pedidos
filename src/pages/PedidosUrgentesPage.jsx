import { useState } from "react";
import { usePedidosUrgentes } from "../hooks/usePedidosUrgentes";

export default function PedidosUrgentesPage() {
  const [vista, setVista] = useState(null);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [comentario, setComentario] = useState("");
  const [productos, setProductos] = useState([]);

  // 🔥 FIRESTORE
  const { listas, guardarLista, loading } = usePedidosUrgentes();

  const agregarProducto = () => {
    setProductos([...productos, { nombre: "", stock: 0 }]);
  };

  const colorStock = (stock) => {
    if (stock <= 6) return "#ffcccc";      // rojo
    if (stock < 15) return "#fff3cd";      // amarillo
    return "#d4edda";                      // verde
  };

  const handleGuardarLista = async () => {
    if (productos.length === 0) return;

    await guardarLista({
      fecha,
      tipo: vista,
      comentario,
      productos
    });

    // reset
    setProductos([]);
    setComentario("");
    setVista(null);
  };

  return (
    <div className="card">
      <h2>🧮 Pedidos Urgentes</h2>

      {/* BOTONES PRINCIPALES */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button className="btn btn-primary" onClick={() => setVista("stock")}>
          📦 Stock urgente
        </button>
        <button className="btn btn-secondary" onClick={() => setVista("variado")}>
          🚚 Pedido variado
        </button>
        <button className="btn btn-info" onClick={() => setVista("ver")}>
          📋 Ver listas
        </button>
      </div>

      {/* CREAR LISTA */}
      {(vista === "stock" || vista === "variado") && (
        <>
          <div className="form-group">
            <label>Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={e => setFecha(e.target.value)}
            />
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p, i) => (
                <tr key={i}>
                  <td>
                    <input
                      value={p.nombre}
                      onChange={e => {
                        const copia = [...productos];
                        copia[i].nombre = e.target.value;
                        setProductos(copia);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={p.stock}
                      style={{ background: colorStock(p.stock) }}
                      onChange={e => {
                        const copia = [...productos];
                        copia[i].stock = Number(e.target.value);
                        setProductos(copia);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-info" onClick={agregarProducto}>
            ➕ Agregar producto
          </button>

          <div className="form-group mt-20">
            <label>Comentario general</label>
            <textarea
              value={comentario}
              onChange={e => setComentario(e.target.value)}
            />
          </div>

          <button className="btn btn-success" onClick={handleGuardarLista}>
            💾 Guardar lista urgente
          </button>
        </>
      )}

      {/* VER LISTAS */}
      {vista === "ver" && (
        <>
          {loading && <p>Cargando...</p>}

          <div className="card-grid">
            {listas.map(lista => (
              <div key={lista.id} className="card">
                <strong>📅 {lista.fecha}</strong>
                <p>
                  {lista.tipo === "stock"
                    ? "📦 Stock urgente"
                    : "🚚 Pedido variado"}
                </p>

                {lista.comentario && <p>📝 {lista.comentario}</p>}

                <ul>
                  {lista.productos.map((p, i) => (
                    <li key={i}>
                      {p.nombre} — {p.stock}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
