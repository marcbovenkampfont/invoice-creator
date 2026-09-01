# Guía de Importaciones con Alias @

Este proyecto está configurado para usar el alias `@` que apunta a la carpeta `src/`. Esto facilita las importaciones y evita rutas relativas complicadas.

## Configuración

### Vite (vite.config.ts)
```typescript
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
```

### TypeScript (tsconfig.app.json)
```json
{
  "compilerOptions": {
    "ignoreDeprecations": "5.0",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## Estructura de Exportaciones

Cada dominio/módulo principal tiene un archivo `index.ts` que exporta todo lo necesario:

### Dominios

```typescript
// @/domains/clients
export * from './types/client';
export { ClientCard } from './components/ClientCard/ClientCard';
export { ClientsGrid } from './components/ClientsGrid/ClientsGrid';

// @/domains/bankAccounts
export * from './types/bankAccount';
export * from './components/BankAccountCard/BankAccountCard';
export * from './components/BankAccountsGrid/BankAccountsGrid';

// @/domains/settings
export * from './types/business';

// @/domains/invoices
export * from './types/items';
```

### Utilidades

```typescript
// @/util/storage
export * from './storage';
export * from './dataService';

// @/util/pdf
export * from './pdfGenerator';
```

### Componentes

```typescript
// @/components
export { default as Input } from './Input/Input';
export { default as Modal } from './Modal/Modal';
```

### Tipos

```typescript
// @/types
export * from './pdf';
```

## Ejemplos de Uso

### Importar tipos
```typescript
import type { Client } from '@/domains/clients';
import type { BankAccount } from '@/domains/bankAccounts';
import type { BusinessInfo } from '@/domains/settings';
import type { PdfData } from '@/types';
```

### Importar componentes
```typescript
import { ClientCard, ClientsGrid } from '@/domains/clients';
import { BankAccountCard, BankAccountsGrid } from '@/domains/bankAccounts';
import { Input, Modal } from '@/components';
```

### Importar utilidades
```typescript
import { getAllClients, generateId } from '@/util/storage';
import { generatePdf } from '@/util/pdf';
```

### Importar rutas específicas
```typescript
// También puedes importar archivos específicos si es necesario
import { generatePdf } from '@/util/pdf/pdfGenerator';
import Input from '@/components/Input/Input';
```

## Ventajas

1. **Rutas más limpias**: `@/domains/clients` en lugar de `../../../domains/clients`
2. **Más fácil de refactorizar**: Si mueves un archivo, no necesitas cambiar las rutas de importación
3. **Mejor autocompletado**: Los IDEs pueden ofrecer mejor autocompletado
4. **Más legible**: Es más fácil ver de dónde viene cada importación

## Notas Importantes

- El alias `@` solo funciona dentro del proyecto TypeScript/JavaScript
- En archivos SCSS, debes usar rutas relativas normales
- Los archivos `index.ts` se cargan automáticamente cuando importas la carpeta
