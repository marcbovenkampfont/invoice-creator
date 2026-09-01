# Sistema de Storage

Este módulo proporciona funcionalidades para gestionar el almacenamiento local de datos en el navegador usando `localStorage`.

## Características

- ✅ Almacenamiento persistente en el navegador
- ✅ Combinación automática de datos locales y datos del storage
- ✅ Funciones específicas para clientes y cuentas bancarias
- ✅ Generación automática de IDs únicos

## Archivos

### `storage.ts`
Funciones genéricas de bajo nivel para interactuar con localStorage:
- `storageService.getData<T>(key)` - Obtener datos
- `storageService.setData<T>(key, data)` - Guardar datos
- `storageService.addItem<T>(key, item)` - Añadir un item
- `storageService.updateItem<T>(key, id, item)` - Actualizar un item
- `storageService.deleteItem<T>(key, id)` - Eliminar un item
- `storageService.clearData(key)` - Limpiar todos los datos

También exporta funciones específicas:
- `clientStorage` - Para gestionar clientes
- `bankAccountStorage` - Para gestionar cuentas bancarias

### `dataService.ts`
Funciones de alto nivel que combinan datos locales (hardcoded) con datos del storage:
- `getAllClients()` - Obtiene todos los clientes (locales + storage)
- `getAllBankAccounts()` - Obtiene todas las cuentas bancarias (locales + storage)
- `generateId()` - Genera un ID único para nuevos registros

## Uso

### Guardar un nuevo cliente

```typescript
import { clientStorage } from '@/util/storage/storage';
import { generateId } from '@/util/storage/dataService';

const newClient = {
  id: generateId(),
  name: 'Cliente Ejemplo',
  taxId: 'B12345678',
  email: 'cliente@ejemplo.com',
  address: 'Calle Principal 123',
  cp: '28001',
  city: 'Madrid',
  country: 'España'
};

clientStorage.add(newClient);
```

### Obtener todos los clientes (locales + storage)

```typescript
import { getAllClients } from '@/util/storage/dataService';

const allClients = getAllClients();
```

### Guardar una cuenta bancaria

```typescript
import { bankAccountStorage } from '@/util/storage/storage';
import { generateId } from '@/util/storage/dataService';

const newAccount = {
  id: generateId(),
  name: 'Banco Ejemplo',
  accountHolder: 'Nombre Titular',
  iban: 'ES0000000000000000000000',
  swift: 'XXXXXXXXXX'
};

bankAccountStorage.add(newAccount);
```

## Estructura de datos

### Cliente
```typescript
interface Client {
  id: string;
  name: string;
  email?: string;
  address: string;
  cp: string;
  city: string;
  country: string;
  taxId: string;
}
```

### Cuenta Bancaria
```typescript
interface BankAccount {
  id: string;
  name: string;
  accountHolder: string;
  iban: string;
  swift: string;
}
```

## Notas importantes

- Los datos se guardan en `localStorage` del navegador
- Los datos locales (hardcoded en los archivos `.local.ts`) se combinan con los del storage
- Si hay un conflicto de ID, los datos del storage tienen prioridad
- Los datos persisten entre sesiones del navegador
- Los datos son específicos del dominio/origen del sitio web
