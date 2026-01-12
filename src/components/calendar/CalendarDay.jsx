import React from 'react';

const CalendarDay = ({ dia, fechaStr, pedidosDia, esHoy, onClick }) => {
  const getEstadoClase = () => {
    if (pedidosDia.length === 0) return '';
    
    const estados = pedidosDia.map(p => p.estado);
    const tienePendientes = estados.includes('pendiente');
    const tieneLlegados = estados.includes('llego');
    const tieneRegistrados = estados.includes('registrado');
    
    if (tienePendientes && !tieneLlegados && !tieneRegistrados) {
      return 'day-estado-rojo';
    } else if (tieneLlegados && !tieneRegistrados) {
      return 'day-estado-amarillo';
    } else if (!tienePendientes && !tieneLlegados && tieneRegistrados) {
      return 'day-estado-verde';
    } else {
      return 'day-estado-mixto';
    }
  };

  const contarPorEstado = (estado) => {
    return pedidosDia.filter(p => p.estado === estado).length;
  };

  return (
    <div 
      className={`calendar-day-cell ${getEstadoClase()} ${esHoy ? 'calendar-day-today' : ''}`}
      onClick={onClick}
    >
      {pedidosDia.length > 0 && (
        <span className="pedido-count">
          {pedidosDia.length}
        </span>
      )}
      
      <div className="calendar-day-number">
        {dia}
      </div>
      
      {pedidosDia.length > 0 && (
        <div style={{ fontSize: '9px', color: '#666', marginTop: '5px' }}>
          {contarPorEstado('pendiente') > 0 && <span>🔴 {contarPorEstado('pendiente')} </span>}
          {contarPorEstado('llego') > 0 && <span>🟡 {contarPorEstado('llego')} </span>}
          {contarPorEstado('registrado') > 0 && <span>🟢 {contarPorEstado('registrado')}</span>}
        </div>
      )}
    </div>
  );
};

export default CalendarDay;