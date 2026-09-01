import { useState, useEffect } from 'react';
import { getAllBankAccounts } from '@/util/storage/dataService';
import { BankAccountsGrid } from '@/domains/bankAccounts';
import Modal from '@/components/Modal/Modal';
import { NewBankAccount } from './components/NewBankAccount/NewBankAccount';
import type { BankAccount } from '@/domains/bankAccounts/types/bankAccount';

export const BankAccounts: React.FC = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadBankAccounts = () => {
    const allAccounts = getAllBankAccounts();
    setBankAccounts(allAccounts);
  };

  useEffect(() => {
    loadBankAccounts();
  }, []);

  const handleAddSuccess = () => {
    setIsModalOpen(false);
    loadBankAccounts();
  };

  const filteredAccounts = bankAccounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.accountHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.iban.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🏦 Gestión de Cuentas Bancarias</h1>
        <p className="page-description">
          Administra las cuentas bancarias para recibir pagos de tus facturas.
        </p>
      </div>

      <div className="action-bar">
        <input 
          type="search" 
          placeholder="Buscar cuentas bancarias..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="content-section">
        <BankAccountsGrid 
          bankAccounts={filteredAccounts}
          onAddNew={() => setIsModalOpen(true)}
          onSelectAccount={(account) => console.log('Selected:', account)}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="➕ Nueva Cuenta Bancaria"
      >
        <NewBankAccount onSuccess={handleAddSuccess} />
      </Modal>
    </div>
  );
};

export default BankAccounts;
