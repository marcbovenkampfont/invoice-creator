import type { Client } from "../../types/client";
import "./ClientCard.scss";

export const ClientCard: React.FC<{ client: Client | undefined, className?: string, onClick?: () => void }> = ({ client, className, onClick }) => {
    if (!client) {
        return <div className="client-card" onClick={onClick}>
            <div className="client-card-add">
                <span className="client-card-add-icon">➕</span>
                <span className="client-card-add-text">Añadir Cliente</span>
            </div>
        </div>;
    }
    
    return (
        <div key={client?.id} className={`client-card ${className ?? ""}`} onClick={onClick}>
            <div className="client-card-header">
                <h3 className="client-name">{client?.name}</h3>
                {client?.taxId && (
                <span className="client-tax-id">{client.taxId}</span>
                )}
            </div>
            <div className="client-details">
                {client?.email && (
                <div className="detail-item">
                    <span className="detail-icon">📧</span>
                    <span className="detail-text">{client.email}</span>
                </div>
                )}
                <div className="detail-item">
                <span className="detail-icon">📍</span>
                <span className="detail-text">
                    {client?.address}, {client?.cp} {client?.city}
                </span>
                </div>
            </div>
        </div>
    );
};