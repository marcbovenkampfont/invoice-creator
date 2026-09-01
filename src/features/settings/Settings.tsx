import React, { useState, useEffect } from 'react';
import { Input } from '../../components/Input/Input';
import { getBusinessInfo, saveBusinessInfo, generateId } from '../../util/storage/dataService';
import type { BusinessInfo } from '@/domains/settings/types/business';

export const Settings: React.FC = () => {
  const [formData, setFormData] = useState<Omit<BusinessInfo, 'id'>>({
    name: '',
    taxId: '',
    address: '',
    email: '',
    phone: ''
  });
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Cargar datos al montar el componente
  useEffect(() => {
    const info = getBusinessInfo();
    if (info) {
      setFormData({
        name: info.name,
        taxId: info.taxId,
        address: info.address,
        email: info.email,
        phone: info.phone || ''
      });
      setBusinessId(info.id);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const businessInfo: BusinessInfo = {
      id: businessId || generateId(),
      ...formData
    };
    
    saveBusinessInfo(businessInfo);
    
    if (!businessId) {
      setBusinessId(businessInfo.id);
    }
    
    setIsSaved(true);
    
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCancel = () => {
    const info = getBusinessInfo();
    if (info) {
      setFormData({
        name: info.name,
        taxId: info.taxId,
        address: info.address,
        email: info.email,
        phone: info.phone || ''
      });
    } else {
      setFormData({
        name: '',
        taxId: '',
        address: '',
        email: '',
        phone: ''
      });
    }
    setIsSaved(false);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">⚙️ Configuración</h1>
        <p className="page-description">
          Personaliza tu experiencia y configura tu negocio.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="settings-grid">
          <div className="settings-card">
            <h3 className="settings-title">Información del Negocio</h3>
            <div className="settings-form">
              <Input 
                label="Nombre del Negocio *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Mi Empresa S.L."
                required
              />
              <Input 
                label="NIF/CIF *"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                placeholder="B12345678"
                required
              />
              <Input 
                label="Dirección *"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Calle Principal, 123"
                required
              />
              <Input 
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contacto@miempresa.com"
                required
              />
              <Input 
                label="Teléfono"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+34 600 000 000"
              />
            </div>
          </div>

          {/* <div className="settings-card">
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
          </div> */}
        </div>

        <div className="action-bar">
          <button type="submit" className="primary-button">
            Guardar Cambios
          </button>
          <button type="button" className="secondary-button" onClick={handleCancel}>
            Cancelar
          </button>
          {isSaved && (
            <span className="success-message">✓ Cambios guardados correctamente</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Settings;
