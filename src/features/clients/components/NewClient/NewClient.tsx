import React, { useState } from 'react';
import type { Client } from '@/domains/clients/types/client';
import { clientStorage } from '@/util/storage/storage';
import { generateId } from '@/util/storage/dataService';
import './NewClient.scss';

type FormData = Omit<Client, 'id'>;

interface NewClientProps {
  onSuccess?: () => void;
}

const NewClient: React.FC<NewClientProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    taxId: '',
    email: '',
    address: '',
    cp: '',
    city: '',
    country: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.taxId.trim()) newErrors.taxId = 'El NIF es obligatorio';
    if (!formData.address.trim()) newErrors.address = 'La dirección es obligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newClient: Client = {
        id: generateId(),
        ...formData
      };
      
      clientStorage.add(newClient);
      console.log('Cliente guardado:', newClient);
      
      // Reset form
      setFormData({
        name: '',
        taxId: '',
        email: '',
        address: '',
        cp: '',
        city: '',
        country: ''
      });
      
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  return (
    <div className="new-client-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre del cliente"
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="taxId">NIF *</label>
          <input
            type="text"
            id="taxId"
            name="taxId"
            value={formData.taxId}
            onChange={handleChange}
            placeholder="NIF del cliente"
            required
          />
          {errors.taxId && <span className="error">{errors.taxId}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email del cliente"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Dirección *</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Dirección del cliente"
            required
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cp">Código Postal</label>
            <input
              type="text"
              id="cp"
              name="cp"
              value={formData.cp}
              onChange={handleChange}
              placeholder="28001"
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">Ciudad</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Madrid"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="country">País</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="España"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Guardar Cliente
          </button>
        </div>
      </form>
    </div>
  );
};

export { NewClient };
export default NewClient;
