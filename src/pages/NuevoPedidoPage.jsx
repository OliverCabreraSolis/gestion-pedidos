import { useState, useEffect } from "react";
import { usePedidos } from "../hooks/usePedidos";
import { useProveedores } from "../hooks/useProveedores";
import { useApp } from "../context/AppContext";

export default function NuevoPedidoPage() {
  const { fechaSeleccionada } = useApp();
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
      setForm({
        proveedorId: "",
        fecha: new Date().toISOString().split("T")[0],
        hora: "10:00",
        montoEstimado: "",
        fuentePago: "",
        productos: "",
        notas: "",
      });
    }
  };

  return (
    <div className="form-container">
      <h2 className="section-title">➕ Nuevo Pedido</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Proveedor *</label>
          <select
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

        <button type="submit">💾 Guardar Pedido</button>
      </form>
    </div>
  );
}
