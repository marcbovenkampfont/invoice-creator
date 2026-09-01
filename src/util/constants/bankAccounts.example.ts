import type { BankAccount } from '../../domains/bankAccounts/types/bankAccount';

// Este es un archivo de ejemplo. Para usar tus datos reales:
// 1. Copia este archivo como bankAccounts.local.ts
// 2. Reemplaza los datos de ejemplo con tus datos reales
// bankAccounts.local.ts está en .gitignore y no se subirá a GitHub

export const bankAccounts: BankAccount[] = [
  {
    id: '1',
    name: 'Banco Ejemplo',
    accountHolder: 'Nombre Ejemplo',
    iban: 'ES0000000000000000000000',
    swift: 'EXAMPLEXX'
  },
];
