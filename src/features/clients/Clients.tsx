import { useState, useEffect } from 'react';
import { getAllClients } from '@/util/storage/dataService';
import { ClientsGrid } from '@/domains/clients/components/ClientsGrid/ClientsGrid';
import Modal from '@/components/Modal/Modal';
import { NewClient } from './components/NewClient/NewClient';
import type { Client } from '@/domains/clients/types/client';

export const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadClients = () => {
    const allClients = getAllClients();
    setClients(allClients);
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleAddSuccess = () => {
    setIsModalOpen(false);
    loadClients();
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.taxId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">👥 Gestión de Clientes</h1>
        <p className="page-description">
          Administra tu base de datos de clientes.
        </p>
      </div>

      <div className="action-bar">
        <input 
          type="search" 
          placeholder="Buscar clientes..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="content-section">
        <ClientsGrid 
          clients={filteredClients}
          onAddNew={() => setIsModalOpen(true)}
          onSelectClient={(client) => console.log('Selected:', client)}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="➕ Nuevo Cliente"
      >
        <NewClient onSuccess={handleAddSuccess} />
      </Modal>
    </div>
  );
};

export default Clients;
