import React from 'react';
import '../styles/variables.css';

const TestPage = () => {
  return (
    <div style={{ 
      padding: '40px',
      background: 'var(--gris)',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: 'var(--rosa)' }}>✅ ¡EXA Sistema funcionando!</h1>
      <p>Si ves esto, React está funcionando correctamente.</p>
      
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        marginTop: '20px',
        border: '2px solid var(--amarillo)'
      }}>
        <h2>Prueba de estilos:</h2>
        <button className="btn btn-primary">Botón Primario</button>
        <button className="btn btn-secondary" style={{ marginLeft: '10px' }}>Botón Secundario</button>
        <button className="btn btn-success" style={{ marginLeft: '10px' }}>Botón Success</button>
      </div>
    </div>
  );
};

export default TestPage;