import type { Client } from '../../domains/clients/types/client';

// Este es un archivo de ejemplo. Para usar tus datos reales:
// 1. Copia este archivo como clients.local.ts
// 2. Reemplaza los datos de ejemplo con tus datos reales
// clients.local.ts está en .gitignore y no se subirá a GitHub

export const clients: Client[] = [
  {
    id: '1',
    name: 'Ejemplo Cliente SL',
    email: 'ejemplo@cliente.com',
    address: 'Calle Ejemplo 123',
    taxId: 'ESB12345678',
    cp: '28001',
    city: 'Madrid',
    country: 'Spain'
  },
];
