import { useState, useEffect } from "react";
import { usePedidos } from "../hooks/usePedidos";
import { useProveedores } from "../hooks/useProveedores";
import { useApp } from "../context/AppContext";

export default function NuevoPedidoPage() {
  const { fechaSeleccionada, cambiarSeccion } = useApp();
  const { proveedores } = useProveedores();
  const { agregarPedido } = usePedidos();

  const [form, setForm] = useState({
    proveedorId: "",
    fecha: new Date().toISOString().split("T")[0],
    hora: "10:00",
    montoEstimado: "",
    fuentePago: "",
    productos: "",
    notas: "",
  });

  // 📌 Si vienes desde el calendario
  useEffect(() => {
    if (fechaSeleccionada) {
      setForm(prev => ({
        ...prev,
        fecha: fechaSeleccionada
      }));
    }
  }, [fechaSeleccionada]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.proveedorId || !form.fecha || !form.montoEstimado || !form.fuentePago) {
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
      cambiarSeccion("pedidos");
    } else {
      alert("❌ Error al guardar pedido");
    }
  };

  return (
    <div className="form-container">
      <h2 className="section-title">➕ Nuevo Pedido</h2>

      <form onSubmit={handleSubmit}>

        {/* PROVEEDOR */}
        <div className="form-group">
          <label className="form-label">Proveedor *</label>
          <select
            className="form-select"
            name="proveedorId"
            value={form.proveedorId}
            onChange={handleChange}
          >
            <option value="">Seleccionar proveedor</option>
            {proveedores.map(p => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* FECHA Y HORA */}
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

        {/* FUENTE DE PAGO */}
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

        {/* MONTO */}
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

        {/* PRODUCTOS */}
        <div className="form-group">
          <label className="form-label">Productos</label>
          <textarea
            className="form-textarea"
            name="productos"
            value={form.productos}
            onChange={handleChange}
          />
        </div>

        {/* NOTAS */}
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
