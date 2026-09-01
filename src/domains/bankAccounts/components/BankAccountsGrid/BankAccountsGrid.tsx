import type { BankAccount } from "@/domains/bankAccounts/types/bankAccount";
import { BankAccountCard } from "../BankAccountCard/BankAccountCard";
import "./BankAccountsGrid.scss";

interface BankAccountsGridProps {
  bankAccounts: BankAccount[];
  onAddNew?: () => void;
  onSelectAccount?: (account: BankAccount) => void;
}

export const BankAccountsGrid: React.FC<BankAccountsGridProps> = ({ 
  bankAccounts, 
  onAddNew,
  onSelectAccount 
}) => {
  return (
    <div className="bank-accounts-grid">
      {onAddNew && (
        <BankAccountCard 
          bankAccount={undefined} 
          onClick={onAddNew}
        />
      )}
      {bankAccounts.map(account => (
        <BankAccountCard
          key={account.id}
          bankAccount={account}
          onClick={() => onSelectAccount?.(account)}
        />
      ))}
    </div>
  );
};
