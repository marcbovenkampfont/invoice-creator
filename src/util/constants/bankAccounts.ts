import type { BankAccount } from '../../types/bankAccount';

export const bankAccounts: BankAccount[] = [
  {
    id: '1',
    name: 'Revolut - Malta',
    accountHolder: 'Marc van de Bovenkamp Font',
    iban: 'LT163250094694033525',
    swift: 'REVOLT21'
  },
  {
    id: '2',
    name: 'Banco Santander - España',
    accountHolder: 'Marc van de Bovenkamp Font',
    iban: 'ES2700492852912114083263',
    swift: 'BSCHESMM'
  },
  {
    id: '3',
    name: 'ImaginBank - España',
    accountHolder: 'Marc van de Bovenkamp Font',
    iban: 'ES2221009166711300217028',
    swift: 'CAIXESBBXXX'
  }
  // Añade más cuentas bancarias aquí
];
