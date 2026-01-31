import React from 'react';
import './pages.scss';

export const Clients: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">👥 Gestión de Clientes</h1>
        <p className="page-description">
          Administra tu base de datos de clientes.
        </p>
      </div>

      <div className="action-bar">
        <button className="primary-button">+ Nuevo Cliente</button>
        <input 
          type="search" 
          placeholder="Buscar clientes..." 
          className="search-input"
        />
      </div>

      <div className="content-section">
        <div className="empty-state">
          <div className="empty-icon">👤</div>
          <h3>No hay clientes registrados</h3>
          <p>Añade tu primer cliente para comenzar</p>
          <button className="secondary-button">Agregar Primer Cliente</button>
        </div>
      </div>
    </div>
  );
};

export default Clients;
