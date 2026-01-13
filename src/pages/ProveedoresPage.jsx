import { useState } from "react";
import { useProveedores } from "../hooks/useProveedores";

export default function ProveedoresPage() {
  const { proveedores, agregarProveedor } = useProveedores();

  const [form, setForm] = useState({
    nombre: "",
    ruc: "",
    telefono: "",
    productos: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardar = async () => {
    if (!form.nombre || !form.ruc) {
      alert("Nombre y RUC son obligatorios");
      return;
    }

    await agregarProveedor(form);
    setForm({ nombre: "", ruc: "", telefono: "", productos: "" });
  };

  return (
    <div className="card">
      <h2>👥 Proveedores</h2>

      {/* FORM */}
      <div className="form-container mt-20">
        <div className="form-group">
          <label>Nombre del proveedor</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>RUC</label>
          <input name="ruc" value={form.ruc} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Productos que vende</label>
          <textarea
            name="productos"
            value={form.productos}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-success" onClick={guardar}>
          💾 Guardar proveedor
        </button>
      </div>

      {/* LISTA */}
      <div className="card-grid mt-20">
        {proveedores.map(p => (
          <div key={p.id} className="card">
            <strong>{p.nombre}</strong>
            <p>RUC: {p.ruc}</p>
            <p>📞 {p.telefono}</p>
            <p>📦 {p.productos}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
