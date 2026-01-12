import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Estados que estaban en APP_DATA
  const [proveedores, setProveedores] = useState([
    {
      id: 'PROV-001',
      nombre: 'Lácteos S.A.',
      telefono: '987654321',
      contacto: 'Juan Pérez',
      descripcion: 'Proveedor de lácteos y derivados'
    },
    {
      id: 'PROV-002',
      nombre: 'Golosinas OK',
      telefono: '912345678',
      contacto: 'María García',
      descripcion: 'Golosinas, chocolates y snacks'
    },
    {
      id: 'PROV-003',
      nombre: 'Bebidas Pep',
      telefono: '998877665',
      contacto: 'Carlos López',
      descripcion: 'Bebidas gaseosas y jugos'
    }
    
    
  ]);

    
  // Datos de prueba para pedidos
  const hoy = new Date().toISOString().split('T')[0];
  const mañana = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const ayer = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  const [pedidos, setPedidos] = useState([
    {
      id: 'PED-001',
      proveedorId: 'PROV-001',
      fecha: hoy,
      hora: '09:00',
      montoEstimado: 150.50,
      fuentePago: 'CEDIS',
      productos: 'Leche, yogurt, queso',
      notas: 'Pedido regular de lunes',
      estado: 'pendiente',
      fechaCreacion: new Date().toISOString()
    },
    {
      id: 'PED-002',
      proveedorId: 'PROV-002',
      fecha: hoy,
      hora: '11:30',
      montoEstimado: 89.90,
      fuentePago: 'CAJA1',
      productos: 'Chocolates, galletas surtidas',
      notas: 'Pedido especial',
      estado: 'llego',
      fechaCreacion: new Date().toISOString()
    },
    {
      id: 'PED-003',
      proveedorId: 'PROV-003',
      fecha: hoy,
      hora: '14:00',
      montoEstimado: 200.00,
      fuentePago: 'CEDIS',
      productos: 'Refrescos, jugos',
      notas: 'Para promoción',
      estado: 'registrado',
      montoReal: 195.50,
      fechaCreacion: new Date().toISOString(),
      fechaRegistro: new Date().toISOString()
    },
    {
      id: 'PED-004',
      proveedorId: 'PROV-001',
      fecha: mañana,
      hora: '10:00',
      montoEstimado: 180.75,
      fuentePago: 'CAJA2',
      productos: 'Leche deslactosada, queso fresco',
      notas: '',
      estado: 'pendiente',
      fechaCreacion: new Date().toISOString()
    },
    {
      id: 'PED-005',
      proveedorId: 'PROV-002',
      fecha: ayer,
      hora: '15:30',
      montoEstimado: 120.40,
      fuentePago: 'CEDIS',
      productos: 'Caramelos, chicles',
      notas: 'Pedido completado',
      estado: 'registrado',
      montoReal: 118.00,
      fechaCreacion: new Date().toISOString(),
      fechaRegistro: new Date().toISOString()
    }
  ]);
  
  const [fondos, setFondos] = useState({
    CEDIS: { 
      saldo: 1500.00, 
      movimientos: [
        {
          fecha: new Date().toISOString(),
          tipo: 'ingreso',
          monto: 2000.00,
          descripcion: 'Fondo inicial'
        },
        {
          fecha: new Date().toISOString(),
          tipo: 'egreso',
          monto: 500.00,
          descripcion: 'Compra de lácteos'
        }
      ] 
    },
    CAJA1: { 
      saldo: 300.00, 
      movimientos: [
        {
          fecha: new Date().toISOString(),
          tipo: 'ingreso',
          monto: 500.00,
          descripcion: 'Ventas del día'
        }
      ] 
    },
    CAJA2: { 
      saldo: 200.00, 
      movimientos: [] 
    }
  });
  
  const [config, setConfig] = useState({
    porcentajeGanancia: 20,
    incluirIGV: true,
    nombreTienda: "EXA TIENDA",
    direccionTienda: "Av. Principal 123",
    telefonoTienda: "01-2345678",
    rucTienda: "20123456781"
  });

  // Estados que estaban en APP_STATE
  const [seccionActual, setSeccionActual] = useState('pedidos');
  const [mesActual, setMesActual] = useState(new Date().getMonth());
  const [añoActual, setAñoActual] = useState(new Date().getFullYear());
  const [diaExpanded, setDiaExpanded] = useState(null);
  const [fechaPedidoSeleccionada, setFechaPedidoSeleccionada] = useState(null);

  // Cargar datos de Firebase (para cuando conectes)
  useEffect(() => {
    // cargarDatosFirebase();
  }, []);

  const cargarDatosFirebase = async () => {
    try {
      // Aquí cargas los datos desde Firestore cuando esté listo
      // Por ahora usamos datos mock
      console.log("Cargando datos de Firebase...");
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  // ========== FUNCIONES DEL CALENDARIO ==========
  const cambiarMes = (direccion) => {
    let nuevoMes = mesActual + direccion;
    let nuevoAño = añoActual;
    
    if (nuevoMes < 0) {
      nuevoMes = 11;
      nuevoAño--;
    } else if (nuevoMes > 11) {
      nuevoMes = 0;
      nuevoAño++;
    }
    
    setMesActual(nuevoMes);
    setAñoActual(nuevoAño);
    setDiaExpanded(null);
  };
  
  const irAlMesActual = () => {
    const hoy = new Date();
    setMesActual(hoy.getMonth());
    setAñoActual(hoy.getFullYear());
    setDiaExpanded(null);
  };
  
  const crearPedidoParaDia = (fechaStr) => {
    setSeccionActual('nuevo-pedido');
    setFechaPedidoSeleccionada(fechaStr);
  };

  // ========== FUNCIONES DE PEDIDOS ==========
  const agregarPedido = async (nuevoPedido) => {
    try {
      // Generar ID único
      const pedidoConId = {
        ...nuevoPedido,
        id: `PED-${Date.now()}`,
        fechaCreacion: new Date().toISOString(),
        estado: 'pendiente'
      };
      
      // Firebase: await setDoc(doc(db, "pedidos", pedidoConId.id), pedidoConId);
      setPedidos(prev => [...prev, pedidoConId]);
      return { success: true, pedido: pedidoConId };
    } catch (error) {
      console.error("Error agregando pedido:", error);
      return { success: false, error };
    }
  };

  const actualizarEstadoPedido = async (pedidoId, nuevosDatos) => {
    try {
      // Firebase: await updateDoc(doc(db, "pedidos", pedidoId), nuevosDatos);
      setPedidos(prev => prev.map(pedido => 
        pedido.id === pedidoId ? { ...pedido, ...nuevosDatos } : pedido
      ));
      return { success: true };
    } catch (error) {
      console.error("Error actualizando pedido:", error);
      return { success: false, error };
    }
  };

  const eliminarPedido = async (pedidoId) => {
    try {
      // Firebase: await deleteDoc(doc(db, "pedidos", pedidoId));
      setPedidos(prev => prev.filter(pedido => pedido.id !== pedidoId));
      return { success: true };
    } catch (error) {
      console.error("Error eliminando pedido:", error);
      return { success: false, error };
    }
  };

  // Funciones específicas para estados de pedidos
  const marcarComoLlegado = async (pedidoId) => {
    return await actualizarEstadoPedido(pedidoId, { estado: 'llego' });
  };

  const marcarComoNoLlego = async (pedidoId) => {
    return await actualizarEstadoPedido(pedidoId, { estado: 'pendiente' });
  };

  const registrarPagoPedido = async (pedidoId, datosPago) => {
    const datosCompletos = {
      estado: 'registrado',
      montoReal: datosPago.montoReal,
      fuentePagoConfirmada: datosPago.fuenteConfirmada,
      numeroBoleta: datosPago.numeroBoleta,
      observacionesPago: datosPago.observaciones,
      fechaRegistro: new Date().toISOString()
    };
    
    return await actualizarEstadoPedido(pedidoId, datosCompletos);
  };

  // ========== FUNCIONES DE PROVEEDORES ==========
  const agregarProveedor = async (nuevoProveedor) => {
    try {
      const proveedorConId = {
        ...nuevoProveedor,
        id: `PROV-${Date.now()}`
      };
      
      // Firebase: await setDoc(doc(db, "proveedores", proveedorConId.id), proveedorConId);
      setProveedores(prev => [...prev, proveedorConId]);
      return { success: true, proveedor: proveedorConId };
    } catch (error) {
      console.error("Error agregando proveedor:", error);
      return { success: false, error };
    }
  };

  const actualizarProveedor = async (proveedorId, datosActualizados) => {
    try {
      // Firebase: await updateDoc(doc(db, "proveedores", proveedorId), datosActualizados);
      setProveedores(prev => prev.map(proveedor => 
        proveedor.id === proveedorId ? { ...proveedor, ...datosActualizados } : proveedor
      ));
      return { success: true };
    } catch (error) {
      console.error("Error actualizando proveedor:", error);
      return { success: false, error };
    }
  };

  const eliminarProveedor = async (proveedorId) => {
    try {
      // Firebase: await deleteDoc(doc(db, "proveedores", proveedorId));
      setProveedores(prev => prev.filter(proveedor => proveedor.id !== proveedorId));
      return { success: true };
    } catch (error) {
      console.error("Error eliminando proveedor:", error);
      return { success: false, error };
    }
  };

  // ========== FUNCIONES DE FONDOS ==========
  const ingresarFondos = async (fuente, monto, descripcion) => {
    try {
      const movimiento = {
        fecha: new Date().toISOString(),
        tipo: 'ingreso',
        monto: monto,
        descripcion: descripcion || `Ingreso a ${fuente}`
      };
      
      setFondos(prev => ({
        ...prev,
        [fuente]: {
          ...prev[fuente],
          saldo: prev[fuente].saldo + monto,
          movimientos: [...prev[fuente].movimientos, movimiento]
        }
      }));
      
      return { success: true, movimiento };
    } catch (error) {
      console.error("Error ingresando fondos:", error);
      return { success: false, error };
    }
  };

  const retirarFondos = async (fuente, monto, descripcion) => {
    try {
      const movimiento = {
        fecha: new Date().toISOString(),
        tipo: 'egreso',
        monto: monto,
        descripcion: descripcion || `Retiro de ${fuente}`
      };
      
      setFondos(prev => ({
        ...prev,
        [fuente]: {
          ...prev[fuente],
          saldo: prev[fuente].saldo - monto,
          movimientos: [...prev[fuente].movimientos, movimiento]
        }
      }));
      
      return { success: true, movimiento };
    } catch (error) {
      console.error("Error retirando fondos:", error);
      return { success: false, error };
    }
  };

  // ========== FUNCIONES DE CONFIGURACIÓN ==========
  const actualizarConfig = (nuevaConfig) => {
    setConfig(prev => ({ ...prev, ...nuevaConfig }));
    return { success: true };
  };

  // ========== FUNCIONES UTILITARIAS ==========
  const obtenerProveedorPorId = (id) => {
    return proveedores.find(p => p.id === id) || { nombre: 'Proveedor no encontrado' };
  };

  const obtenerPedidosPorFecha = (fechaStr) => {
    return pedidos.filter(p => p.fecha === fechaStr);
  };

  const obtenerPedidosHoy = () => {
    const hoy = new Date().toISOString().split('T')[0];
    return pedidos.filter(p => p.fecha === hoy);
  };

  // ========== VALOR DEL CONTEXTO ==========
  const value = {
    // Estados
    seccionActual,
    setSeccionActual,
    mesActual,
    setMesActual,
    añoActual,
    setAñoActual,
    diaExpanded,
    setDiaExpanded,
    fechaPedidoSeleccionada,
    setFechaPedidoSeleccionada,
    proveedores,
    pedidos,
    fondos,
    config,
    
    // Funciones del calendario
    cambiarMes,
    irAlMesActual,
    crearPedidoParaDia,
    
    // Funciones de pedidos
    agregarPedido,
    actualizarEstadoPedido,
    eliminarPedido,
    marcarComoLlegado,
    marcarComoNoLlego,
    registrarPagoPedido,
    
    // Funciones de proveedores
    agregarProveedor,
    actualizarProveedor,
    eliminarProveedor,
    obtenerProveedorPorId,
    
    // Funciones de fondos
    ingresarFondos,
    retirarFondos,
    
    // Funciones de configuración
    actualizarConfig,
    
    // Funciones utilitarias
    obtenerPedidosPorFecha,
    obtenerPedidosHoy
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};