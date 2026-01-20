import React from 'react';
import CalendarDay from './CalendarDay';

const CalendarGrid = ({ mesActual, añoActual, toggleExpandDay, obtenerPedidosDia }) => {
  const hoy = new Date();
  const fechaStr = `${añoActual}-${String(mesActual + 1).padStart(2,'0')}-${String(dia).padStart(2,'0')}`;
  
  const primerDia = new Date(añoActual, mesActual, 1);
  const ultimoDia = new Date(añoActual, mesActual + 1, 0);
  const primerDiaSemana = primerDia.getDay();
  
  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
  const celdasVacias = [];
  for (let i = 0; i < primerDiaSemana; i++) {
    celdasVacias.push(
      <div key={`empty-${i}`} className="calendar-day-cell" style={{ background: '#f8f8f8', cursor: 'default' }}></div>
    );
  }
  
  const diasDelMes = [];
  for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
    const fecha = new Date(añoActual, mesActual, dia);
    const fechaStr = fecha.toISOString().split('T')[0];
    const pedidosDia = obtenerPedidosDia(fechaStr);
    
    diasDelMes.push(
      <CalendarDay 
        key={dia}
        dia={dia}
        fechaStr={fechaStr}
        pedidosDia={pedidosDia}
        esHoy={fechaStr === hoyStr}
        onClick={() => toggleExpandDay(fechaStr, dia)}
      />
    );
  }
  
  return (
    <div className="calendar-grid-month">
      {diasSemana.map(dia => (
        <div key={dia} className="calendar-day-header">
          {dia}
        </div>
      ))}
      {celdasVacias}
      {diasDelMes}
    </div>
  );
};

export default CalendarGrid;