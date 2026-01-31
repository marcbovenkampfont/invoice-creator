import React from 'react';
import './pages.scss';

export const Home: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🏠 Bienvenido a Invoice Creator</h1>
        <p className="page-description">
          Gestiona tus facturas, clientes y configuraciones de manera fácil y divertida.
        </p>
      </div>

      <div className="cards-grid">
        <div className="info-card">
          <div className="card-icon">📊</div>
          <h3>Estadísticas</h3>
          <p>Visualiza tus métricas y progreso</p>
        </div>

        <div className="info-card">
          <div className="card-icon">⚡</div>
          <h3>Rápido y Fácil</h3>
          <p>Crea facturas en segundos</p>
        </div>

        <div className="info-card">
          <div className="card-icon">🎨</div>
          <h3>Personalizable</h3>
          <p>Diseña tus facturas a tu gusto</p>
        </div>

        <div className="info-card">
          <div className="card-icon">💾</div>
          <h3>Guarda Todo</h3>
          <p>Accede a tu historial completo</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
