import type { BankAccount } from "@/domains/bankAccounts/types/bankAccount";
import "./BankAccountCard.scss";

export const BankAccountCard: React.FC<{ 
  bankAccount: BankAccount | undefined;
  className?: string;
  onClick?: () => void;
}> = ({ bankAccount, className, onClick }) => {
  if (!bankAccount) {
    return (
      <div className="bank-account-card" onClick={onClick}>
        <div className="bank-account-card-add">
          <span className="bank-account-card-add-icon">➕</span>
          <span className="bank-account-card-add-text">Añadir Cuenta Bancaria</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bank-account-card ${className ?? ""}`} onClick={onClick}>
      <div className="bank-account-card-header">
        <h3 className="bank-account-name">{bankAccount.name}</h3>
        <span className="bank-account-holder">{bankAccount.accountHolder}</span>
      </div>
      <div className="bank-account-details">
        <div className="detail-item">
          <span className="detail-icon">🏦</span>
          <span className="detail-label">IBAN:</span>
          <span className="detail-text">{bankAccount.iban}</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">🌍</span>
          <span className="detail-label">SWIFT:</span>
          <span className="detail-text">{bankAccount.swift}</span>
        </div>
      </div>
    </div>
  );
};
