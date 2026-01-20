import React from 'react';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import CalendarPage from './pages/CalendarPage';
import NuevoPedidoPage from './pages/NuevoPedidoPage';
import PedidosUrgentesPage from './pages/PedidosUrgentesPage';
import ProveedoresPage from './pages/ProveedoresPage';
import CedisPage from './pages/CedisPage';
import ReportesPage from './pages/ReportesPage';
import { useApp } from './context/AppContext';
import './styles/app.css';
import './styles/print.css';

const AppContent = () => {
  const { seccionActual } = useApp();

  const renderPage = () => {
    switch(seccionActual) {
      case 'pedidos':
        return <CalendarPage />;
      case 'nuevo-pedido':
        return <NuevoPedidoPage />;
      case 'urgentes':
        return <PedidosUrgentesPage/>;
      case 'proveedores':
        return <ProveedoresPage />;
      case 'cedis':
        return <CedisPage />;
      case 'reportes':
        return <ReportesPage />;
      default:
        return <CalendarPage />;
    }
  };

  return <Layout>{renderPage()}</Layout>;
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;