export const formatearMoneda = (monto) => {
  return `S/ ${parseFloat(monto || 0).toFixed(2)}`;
};

export const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export const obtenerHoraActual = () => {
  return new Date().toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit'
  });
};