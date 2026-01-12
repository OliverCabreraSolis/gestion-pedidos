import React from 'react';
import { useApp } from '../../context/AppContext';

const Sidebar = () => {
  const { seccionActual, setSeccionActual, pedidos } = useApp();
  
  const hoy = new Date().toISOString().split('T')[0];
  const pedidosHoy = pedidos.filter(p => p.fecha === hoy);
  const pendientes = pedidosHoy.filter(p => p.estado === 'pendiente').length;
  
  const menuItems = [
    { id: 'pedidos', icon: '📅', label: 'Calendario Pedidos' },
    { id: 'nuevo-pedido', icon: '➕', label: 'Nuevo Pedido' },
    { id: 'urgentes', icon: '🧮', label: 'Pedidos urgentes' },
    { id: 'proveedores', icon: '👥', label: 'Proveedores' },
    { id: 'cedis', icon: '🏦', label: 'Control CEDIS' },
    { id: 'reportes', icon: '📊', label: 'Reportes & Impresión' }
  ];

  return (
    <div className="sidebar">
      <div className="logo-section">
        <img 
          src="/assets/ExaLogo.jpg" 
          alt="EXA Logo" 
          className="logo-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="%23ffeb00" rx="10"/><text x="40" y="45" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle" fill="%23000000">EXA</text></svg>';
          }}
        />
        <div className="logo-text">
          <h1>EXA MÁS QUE SOLO UNA TIENDA</h1>
          <p>Gestión de Pedidos</p>
        </div>
      </div>

      <div className="nav-menu">
        {menuItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${seccionActual === item.id ? 'active' : ''}`}
            onClick={() => setSeccionActual(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="stats-box">
        <p>PEDIDOS HOY</p>
        <div className="stats-number">{pedidosHoy.length}</div>
        <p>{pendientes > 0 ? `${pendientes} pendientes` : 'Todos completados'}</p>
      </div>
    </div>
  );
};

export default Sidebar;