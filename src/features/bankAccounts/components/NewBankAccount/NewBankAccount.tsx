import React, { useState } from 'react';
import type { BankAccount } from '@/domains/bankAccounts/types/bankAccount';
import { bankAccountStorage } from '@/util/storage/storage';
import { generateId } from '@/util/storage/dataService';
import './NewBankAccount.scss';

type FormData = Omit<BankAccount, 'id'>;

interface NewBankAccountProps {
  onSuccess?: () => void;
}

const NewBankAccount: React.FC<NewBankAccountProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    accountHolder: '',
    iban: '',
    swift: ''
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
    if (!formData.accountHolder.trim()) newErrors.accountHolder = 'El titular de la cuenta es obligatorio';
    if (!formData.iban.trim()) newErrors.iban = 'El IBAN es obligatorio';
    if (!formData.swift.trim()) newErrors.swift = 'El código SWIFT es obligatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newBankAccount: BankAccount = {
        id: generateId(),
        ...formData
      };
      
      bankAccountStorage.add(newBankAccount);
      console.log('Cuenta bancaria guardada:', newBankAccount);
      
      // Reset form
      setFormData({
        name: '',
        accountHolder: '',
        iban: '',
        swift: ''
      });
      
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  return (
    <div className="new-bank-account-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre de la Cuenta *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Banco Santander - España"
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="accountHolder">Titular de la Cuenta *</label>
          <input
            type="text"
            id="accountHolder"
            name="accountHolder"
            value={formData.accountHolder}
            onChange={handleChange}
            placeholder="Nombre completo del titular"
            required
          />
          {errors.accountHolder && <span className="error">{errors.accountHolder}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="iban">IBAN *</label>
          <input
            type="text"
            id="iban"
            name="iban"
            value={formData.iban}
            onChange={handleChange}
            placeholder="ES0000000000000000000000"
            required
          />
          {errors.iban && <span className="error">{errors.iban}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="swift">Código SWIFT/BIC *</label>
          <input
            type="text"
            id="swift"
            name="swift"
            value={formData.swift}
            onChange={handleChange}
            placeholder="XXXXXXXXXX"
            required
          />
          {errors.swift && <span className="error">{errors.swift}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Guardar Cuenta Bancaria
          </button>
        </div>
      </form>
    </div>
  );
};

export { NewBankAccount };
