import { useState } from 'react';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarGrid from '../components/calendar/CalendarGrid';
import DayExpanded from '../components/calendar/DayExpanded';
import { usePedidos } from '../hooks/usePedidos';
import{ useApp } from '../context/AppContext';
import{ useNavigate } from "reacto-router-dom"; 

export default function CalendarPage() {
  const { pedidos, actualizarPedido } = usePedidos();

  const hoy = new Date();
  const [mesActual, setMesActual] = useState(hoy.getMonth());
  const [añoActual, setAñoActual] = useState(hoy.getFullYear());
  const [diaExpandido, setDiaExpandido] = useState(null);

  // 🔹 pedidos por día
  const obtenerPedidosDia = (fechaStr) => {
    return pedidos.filter(p => p.fecha === fechaStr);
  };

  // 🔹 abrir / cerrar día
  const toggleExpandDay = (fechaStr) => {
    setDiaExpandido(fechaStr);
  };

  // 🔹 navegación de mes
  const cambiarMes = (delta) => {
    const nuevaFecha = new Date(añoActual, mesActual + delta, 1);
    setMesActual(nuevaFecha.getMonth());
    setAñoActual(nuevaFecha.getFullYear());
  };

  const navigate = useNavigate();

  const irAlMesActual = () => {
    setMesActual(hoy.getMonth());
    setAñoActual(hoy.getFullYear());
  };

  // 🔹 cambiar estado (🔥 ESTO HACE QUE SE PINTE)
  const cambiarEstadoPedido = async (id, estado) => {
    await actualizarPedido(id, { estado });
  };

  return (
    <div className="calendar-page">
      <CalendarHeader
        mesActual={mesActual}
        añoActual={añoActual}
        cambiarMes={cambiarMes}
        irAlMesActual={irAlMesActual}
      />

      <CalendarGrid
        mesActual={mesActual}
        añoActual={añoActual}
        toggleExpandDay={toggleExpandDay}
        obtenerPedidosDia={obtenerPedidosDia}
      />

      {diaExpandido && (
        <DayExpanded
          fechaStr={diaExpandido}
          pedidosDia={obtenerPedidosDia(diaExpandido)}
          onClose={() => setDiaExpandido(null)}
          onCrearPedido={() => {
             navigate("/nuevo-pedido", {
             state: { fecha: diaExpandido }
           });
         }}
  onCambiarEstado={cambiarEstadoPedido}
        />
      )}
    </div>
  );
}
