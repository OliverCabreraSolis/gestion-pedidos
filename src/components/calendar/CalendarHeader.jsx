import React from 'react';

const CalendarHeader = ({ mesActual, añoActual, cambiarMes, irAlMesActual }) => {
  const nombreMes = new Date(añoActual, mesActual, 1).toLocaleDateString('es-PE', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="calendar-full-header">
      <h3 className="section-title">
        📅 {nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)}
      </h3>
      <div className="calendar-nav">
        <button 
          className="btn btn-secondary btn-small"
          onClick={() => cambiarMes(-1)}
        >
          ◀️ Mes Anterior
        </button>
        <button 
          className="btn btn-primary btn-small"
          onClick={irAlMesActual}
        >
          Hoy
        </button>
        <button 
          className="btn btn-secondary btn-small"
          onClick={() => cambiarMes(1)}
        >
          Mes Siguiente ▶️
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;