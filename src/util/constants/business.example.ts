import type { BusinessInfo } from '../../domains/settings/types/business';

// Este es un archivo de ejemplo. Para usar tus datos reales:
// 1. Copia este archivo como business.local.ts
// 2. Reemplaza los datos de ejemplo con tus datos reales
// business.local.ts está en .gitignore y no se subirá a GitHub

export const businessInfo: BusinessInfo[] = [
    {
        id: '1',
        name: 'Ejemplo Cliente SL',
        email: 'ejemplo@cliente.com',
        address: 'Calle Ejemplo 123',
        taxId: 'ESB12345678',
        phone: '+34 123 456 789',
    },
];
