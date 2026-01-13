import { useState } from "react";
import { useProveedores } from "../hooks/useProveedores";

export default function ProveedoresPage() {
  const {
    proveedores,
    agregarProveedor,
    eliminarProveedor
  } = useProveedores();

  const [form, setForm] = useState({
    nombre: "",
    contacto: "",
    telefono: "",
    correo: "",
    categoria: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardar = async () => {
    if (!form.nombre) return alert("Nombre requerido");
    await agregarProveedor(form);
    setForm({
      nombre: "",
      contacto: "",
      telefono: "",
      correo: "",
      categoria: ""
    });
  };

  return (
    <div className="card">
      <h2>👥 Proveedores</h2>

      {/* FORM */}
      <div className="form-container mb-20">
        <div className="form-row">
          <input className="form-input" name="nombre" placeholder="Proveedor" value={form.nombre} onChange={handleChange} />
          <input className="form-input" name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input className="form-input" name="contacto" placeholder="Contacto" value={form.contacto} onChange={handleChange} />
          <input className="form-input" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
        </div>

        <input className="form-input mt-20" name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />

        <button className="btn btn-success mt-20" onClick={guardar}>
          ➕ Registrar proveedor
        </button>
      </div>

      {/* LISTA */}
      <div className="card-grid">
        {proveedores.map(p => (
          <div key={p.id} className="card">
            <strong>{p.nombre}</strong>
            <p>📦 {p.categoria}</p>
            <p>👤 {p.contacto}</p>
            <p>📞 {p.telefono}</p>
            <p>✉️ {p.correo}</p>

            <button
              className="btn btn-danger btn-small mt-20"
              onClick={() => eliminarProveedor(p.id)}
            >
              🗑️ Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
