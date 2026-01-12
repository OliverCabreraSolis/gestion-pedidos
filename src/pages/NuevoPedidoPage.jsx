import { useState } from "react";
import { usePedidos } from "../hooks/usePedidos";

export default function NuevoPedidoPage() {
  const { agregarPedido } = usePedidos();

  const [form, setForm] = useState({
    proveedor: "",
    fecha: new Date().toISOString().split("T")[0],
    hora: "10:00",
    montoEstimado: "",
    fuentePago: "",
    productos: "",
    notas: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.proveedor || !form.fecha || !form.montoEstimado || !form.fuentePago) {
      alert("❌ Completa los campos obligatorios");
      return;
    }

    const nuevoPedido = {
      ...form,
      montoEstimado: parseFloat(form.montoEstimado),
      estado: "pendiente"
    };

    const res = await agregarPedido(nuevoPedido);

    if (res.success) {
      alert("✅ Pedido registrado");
      setForm({
        proveedor: "",
        fecha: new Date().toISOString().split("T")[0],
        hora: "10:00",
        montoEstimado: "",
        fuentePago: "",
        productos: "",
        notas: "",
      });
    } else {
      alert("❌ Error al guardar pedido");
    }
  };

  return (
    <div className="form-container">
      <h2 className="section-title">➕ Nuevo Pedido</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Proveedor *</label>
          <input
            className="form-input"
            name="proveedor"
            value={form.proveedor}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Fecha *</label>
            <input
              type="date"
              className="form-input"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hora</label>
            <input
              type="time"
              className="form-input"
              name="hora"
              value={form.hora}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Fuente de pago *</label>
          <select
            className="form-select"
            name="fuentePago"
            value={form.fuentePago}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="CEDIS">CEDIS</option>
            <option value="CAJA1">Caja 1</option>
            <option value="CAJA2">Caja 2</option>
            <option value="credito">Crédito</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Monto estimado *</label>
          <input
            type="number"
            className="form-input"
            name="montoEstimado"
            value={form.montoEstimado}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Productos</label>
          <textarea
            className="form-textarea"
            name="productos"
            value={form.productos}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Notas</label>
          <textarea
            className="form-textarea"
            name="notas"
            value={form.notas}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary btn-block" type="submit">
          💾 Guardar Pedido
        </button>
      </form>
    </div>
  );
}
