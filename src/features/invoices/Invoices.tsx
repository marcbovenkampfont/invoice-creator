import React from 'react';
import PdfForm from './components/PdfForm/PdfForm';

export const Invoices: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">📄 Gestión de Facturas</h1>
        <p className="page-description">
          Crea, edita y gestiona todas tus facturas desde aquí.
        </p>
      </div>

      <PdfForm />
    </div>
  );
};

export default Invoices;
