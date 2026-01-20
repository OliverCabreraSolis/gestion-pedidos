import React from 'react';
import { useApp } from '../../context/AppContext';

const DayExpanded = ({ fechaStr, pedidosDia, onClose, onCrearPedido, onCambiarEstado }) => {
  const { obtenerProveedorPorId } = useApp();
  const [y, m, d] = fechaStr.split('-');
  const fecha = new Date(y, m - 1, d);
  
  const getEstadoBadge = (estado) => {
    switch(estado) {
      case 'pendiente':
        return 'badge badge-rojo';
      case 'llego':
        return 'badge badge-amarillo';
      case 'registrado':
        return 'badge badge-verde';
      default:
        return 'badge';
    }
  };

  const getEstadoTexto = (estado) => {
    switch(estado) {
      case 'pendiente':
        return 'NO LLEGÓ';
      case 'llego':
        return 'LLEGÓ';
      case 'registrado':
        return 'REGISTRADO';
      default:
        return estado;
    }
  };

  const formatearMoneda = (monto) => {
    return `S/ ${parseFloat(monto || 0).toFixed(2)}`;
  };

  return (
    <div className="day-expanded active">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h4 style={{ color: 'var(--rosa)' }}>
          📅 {fecha.toLocaleDateString('es-PE', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
          })}
        </h4>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-primary btn-small" onClick={onCrearPedido}>
            ➕ Agregar
          </button>
          <button className="btn btn-success btn-small" onClick={() => window.print()}>
            🖨️ Imprimir
          </button>
          <button className="btn btn-secondary btn-small" onClick={onClose}>
            ✕ Cerrar
          </button>
        </div>
      </div>
      
      {pedidosDia.length > 0 ? (
        <div className="day-pedidos-list">
          {pedidosDia.map(pedido => {
            const proveedor = obtenerProveedorPorId(pedido.proveedorId);
            
            return (
              <div key={pedido.id} className="day-pedido-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <div>
                    <strong>{proveedor?.nombre || 'Proveedor'}</strong>
                    <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>
                      ⏰ {pedido.hora}
                    </span>
                  </div>
                  <span className={getEstadoBadge(pedido.estado)}>
                    {getEstadoTexto(pedido.estado)}
                  </span>
                </div>
                
                <div style={{ fontSize: '14px' }}>
                  <p><strong>Monto:</strong> {formatearMoneda(pedido.montoEstimado)}</p>
                  <p><strong>Fuente:</strong> {pedido.fuentePago}</p>
                  {pedido.productos && <p><strong>Productos:</strong> {pedido.productos}</p>}
                </div>
                
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  {pedido.estado === 'pendiente' ? (
                    <button className="btn btn-primary btn-small" onClick={() => onCambiarEstado( pedido.id, 'llego')}>
                      ✅ Llegó
                    </button>
                  ) : pedido.estado === 'llego' ? (
                    <>
                      <button className="btn btn-primary btn-small" onClick={() => onCambiarEstado(pedido.id, 'registrado')}>
                        💰 Registrar
                      </button>
                      <button className="btn btn-secondary btn-small" onClick={() => onCambiarEstado(pedido.id, 'pendiente')}>
                        ❌ No Llegó
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-secondary btn-small" onClick={() => console.log('Ver detalles:', pedido.id)}>
                      👁️ Ver
                    </button>
                  )}
                  <button className="btn btn-danger btn-small" onClick={() => console.log('Eliminar:', pedido.id)}>
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '30px 20px', color: '#666' }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>📅</div>
          <h4>No hay pedidos programados</h4>
          <p>Agrega un pedido para este día</p>
          <button className="btn btn-primary" onClick={onCrearPedido} style={{ marginTop: '15px' }}>
            ➕ Crear Primer Pedido
          </button>
        </div>
      )}
    </div>
  );
};

export default DayExpanded;