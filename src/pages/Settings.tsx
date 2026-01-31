import React from 'react';
import { Input } from '../components/Input/Input';
import './pages.scss';

export const Settings: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">⚙️ Configuración</h1>
        <p className="page-description">
          Personaliza tu experiencia y configura tu negocio.
        </p>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <h3 className="settings-title">Información del Negocio</h3>
          <div className="settings-form">
            <Input 
              label="Nombre del Negocio"
              placeholder="Ej: Mi Empresa S.L."
            />
            <Input 
              label="NIF/CIF"
              placeholder="B12345678"
            />
            <Input 
              label="Dirección"
              placeholder="Calle Principal, 123"
            />
            <Input 
              label="Email"
              type="email"
              placeholder="contacto@miempresa.com"
            />
            <Input 
              label="Teléfono"
              type="tel"
              placeholder="+34 600 000 000"
            />
          </div>
        </div>

        <div className="settings-card">
          <h3 className="settings-title">Preferencias</h3>
          <div className="settings-form">
            <div className="setting-item">
              <label className="setting-label">
                <input type="checkbox" />
                <span>Modo oscuro</span>
              </label>
            </div>
            <div className="setting-item">
              <label className="setting-label">
                <input type="checkbox" defaultChecked />
                <span>Notificaciones por email</span>
              </label>
            </div>
            <div className="setting-item">
              <label className="setting-label">
                <input type="checkbox" defaultChecked />
                <span>Auto-guardar</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="action-bar">
        <button className="primary-button">Guardar Cambios</button>
        <button className="secondary-button">Cancelar</button>
      </div>
    </div>
  );
};

export default Settings;
