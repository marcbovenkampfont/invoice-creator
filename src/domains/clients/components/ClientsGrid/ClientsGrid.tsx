import { ClientCard } from "@/domains/clients/components/ClientCard/ClientCard";
import type { Client } from "@/domains/clients/types/client";
import './ClientsGrid.scss';

interface ClientsGridProps {
  clients: Client[];
  selectedClient?: Client | null;
  onAddNew?: () => void;
  onSelectClient?: (client: Client) => void;
}

export const ClientsGrid: React.FC<ClientsGridProps> = ({ 
  clients,
  selectedClient,
  onAddNew,
  onSelectClient 
}) => {
  return (
    <div className="clients-grid">
      {onAddNew && (
        <ClientCard 
          client={undefined} 
          onClick={onAddNew}
        />
      )}
      {clients.map((client) => (
        <ClientCard 
          key={client.id} 
          client={client}
          className={selectedClient?.id === client.id ? "selected" : ""}
          onClick={() => onSelectClient?.(client)}
        />
      ))}
    </div>
  );
};