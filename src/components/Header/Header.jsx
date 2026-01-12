import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

const Header = () => {
  const { seccionActual } = useApp();
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const ahora = new Date();
      setCurrentDate(
        ahora.toLocaleDateString('es-PE', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      );
      setCurrentTime(
        ahora.toLocaleTimeString('es-PE', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const titulos = {
    'pedidos': '📅 Calendario de Pedidos',
    'nuevo-pedido': '➕ Nuevo Pedido',
    'calculadora': '🧮 Calculadora de Precios',
    'proveedores': '👥 Proveedores',
    'cedis': '🏦 Control CEDIS',
    'reportes': '📊 Reportes & Impresión'
  };

  return (
    <div className="header-bar">
      <h2>{titulos[seccionActual] || 'EXA Sistema'}</h2>
      <div className="date-time">
        <div>{currentDate}</div>
        <div>{currentTime}</div>
      </div>
    </div>
  );
};

export default Header;