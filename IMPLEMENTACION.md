# Implementación de Gestión de Cuentas Bancarias y Sistema de Storage

## ✅ Funcionalidades Implementadas

### 1. Sistema de Storage (localStorage)

Se ha creado un sistema completo de almacenamiento local que:

- **Almacena datos en el navegador** usando `localStorage`
- **Combina datos locales y del storage** automáticamente
- **Proporciona funciones específicas** para clientes y cuentas bancarias
- **Genera IDs únicos** para nuevos registros

#### Archivos creados:
- `src/util/storage/storage.ts` - Funciones genéricas de storage
- `src/util/storage/dataService.ts` - Funciones de alto nivel que combinan datos
- `src/util/storage/README.md` - Documentación del sistema

#### Funciones disponibles:
```typescript
// Storage de clientes
clientStorage.getAll()
clientStorage.add(client)
clientStorage.update(id, client)
clientStorage.delete(id)
clientStorage.clear()

// Storage de cuentas bancarias
bankAccountStorage.getAll()
bankAccountStorage.add(account)
bankAccountStorage.update(id, account)
bankAccountStorage.delete(id)
bankAccountStorage.clear()

// Funciones de alto nivel
getAllClients()        // Combina clientes locales + storage
getAllBankAccounts()   // Combina cuentas locales + storage
generateId()           // Genera ID único
```

---

### 2. Página de Cuentas Bancarias

Nueva página completa para gestionar cuentas bancarias donde recibir pagos.

#### Archivos creados:
- `src/features/bankAccounts/BankAccounts.tsx` - Página principal
- `src/features/bankAccounts/components/NewBankAccount/NewBankAccount.tsx` - Formulario
- `src/features/bankAccounts/components/NewBankAccount/NewBankAccount.scss` - Estilos

#### Características:
- ✅ Listado de cuentas bancarias (locales + storage)
- ✅ Búsqueda en tiempo real por nombre, titular o IBAN
- ✅ Botón "Añadir Cuenta Bancaria" con modal
- ✅ Formulario de creación con validación
- ✅ Guardado automático en localStorage
- ✅ Diseño consistente con el resto de la aplicación

---

### 3. Dominio de Bank Accounts

Componentes reutilizables para cuentas bancarias.

#### Archivos creados:
- `src/domains/bankAccounts/index.ts` - Exportaciones del dominio
- `src/domains/bankAccounts/components/BankAccountCard/BankAccountCard.tsx` - Tarjeta
- `src/domains/bankAccounts/components/BankAccountCard/BankAccountCard.scss` - Estilos
- `src/domains/bankAccounts/components/BankAccountsGrid/BankAccountsGrid.tsx` - Grid
- `src/domains/bankAccounts/components/BankAccountsGrid/BankAccountsGrid.scss` - Estilos

#### Componentes:
```tsx
<BankAccountCard 
  bankAccount={account}
  onClick={() => handleSelect(account)}
/>

<BankAccountsGrid
  bankAccounts={accounts}
  onAddNew={() => openModal()}
  onSelectAccount={(account) => handleSelect(account)}
/>
```

---

### 4. Actualización de Clientes

La página de clientes ahora usa el sistema de storage.

#### Archivos modificados:
- `src/features/clients/Clients.tsx` - Usa `getAllClients()` y storage
- `src/features/clients/components/NewClient/NewClient.tsx` - Guarda en storage
- `src/features/clients/components/NewClient/NewClient.scss` - Estilos actualizados
- `src/domains/clients/components/ClientsGrid/ClientsGrid.tsx` - Interfaz simplificada

#### Mejoras:
- ✅ Los nuevos clientes se guardan en localStorage
- ✅ Búsqueda en tiempo real
- ✅ Modal para añadir clientes
- ✅ Formulario completo con todos los campos (CP, ciudad, país)
- ✅ Recarga automática de la lista al añadir

---

### 5. Actualización de Generación de Facturas

El formulario de facturas ahora usa datos del storage.

#### Archivos modificados:
- `src/features/invoices/components/PdfForm/PdfForm.tsx`

#### Mejoras:
- ✅ Carga clientes desde storage y locales
- ✅ Carga cuentas bancarias desde storage y locales
- ✅ Recarga la lista al añadir nuevos clientes
- ✅ Validación de cuenta bancaria obligatoria
- ✅ Mensajes de error si falta cliente o cuenta

---

### 6. Navegación Actualizada

Nueva ruta y enlace de navegación.

#### Archivos modificados:
- `src/App.tsx` - Nueva ruta `/bank-accounts`
- `src/components/Layout/Layout.tsx` - Nuevo enlace en el menú

#### Navegación:
- 🏠 Inicio
- 📄 Facturas
- 👥 Clientes
- 🏦 **Cuentas Bancarias** ← NUEVO
- ⚙️ Configuración

---

### 7. Documentación

README actualizados con información del proyecto.

#### Archivos modificados/creados:
- `README.md` - Actualizado con información completa del proyecto
- `src/util/storage/README.md` - Documentación del sistema de storage

---

## 🎯 Flujo de Uso

### Añadir una cuenta bancaria:
1. Ir a "Cuentas Bancarias" en el menú
2. Hacer clic en "➕ Añadir Cuenta Bancaria"
3. Completar el formulario:
   - Nombre de la cuenta (ej: "Banco Santander - España")
   - Titular de la cuenta
   - IBAN
   - Código SWIFT/BIC
4. Hacer clic en "Guardar Cuenta Bancaria"
5. La cuenta se guarda en localStorage y aparece en el listado

### Añadir un cliente:
1. Ir a "Clientes" en el menú
2. Hacer clic en "➕ Añadir Cliente"
3. Completar el formulario con los datos del cliente
4. Hacer clic en "Guardar Cliente"
5. El cliente se guarda en localStorage y aparece en el listado

### Crear una factura:
1. Ir a "Facturas" en el menú
2. Seleccionar un cliente (o añadir uno nuevo)
3. Seleccionar una cuenta bancaria
4. Completar los datos de la factura (número, items, etc.)
5. Hacer clic en "Generar PDF"

---

## 📊 Almacenamiento de Datos

Los datos se almacenan en tres ubicaciones:

### 1. Archivos locales (hardcoded)
- `src/util/constants/clients.local.ts`
- `src/util/constants/bankAccounts.local.ts`
- NO se suben a GitHub (están en .gitignore)

### 2. localStorage del navegador
- Clientes añadidos desde la UI: `invoice_creator_clients`
- Cuentas añadidas desde la UI: `invoice_creator_bank_accounts`
- Persisten entre sesiones

### 3. Combinación automática
- Al listar datos, se combinan automáticamente ambas fuentes
- Los datos del storage pueden sobrescribir datos locales si tienen el mismo ID

---

## 🔧 Configuración para Nuevos Usuarios

1. **Copiar archivos de ejemplo:**
   ```bash
   cp src/util/constants/clients.example.ts src/util/constants/clients.local.ts
   cp src/util/constants/bankAccounts.example.ts src/util/constants/bankAccounts.local.ts
   ```

2. **Editar con datos reales:**
   - Abrir `*.local.ts` y añadir tus datos
   - Los archivos `.local.ts` no se suben a GitHub

3. **O usar solo la UI:**
   - Puedes dejar los archivos locales vacíos
   - Añadir todos los datos desde la interfaz
   - Se guardarán automáticamente en localStorage

---

## ✨ Ventajas del Sistema

### Para usuarios finales:
- ✅ No necesitan tocar código para añadir datos
- ✅ Interfaz visual intuitiva
- ✅ Datos persistentes en el navegador
- ✅ Búsqueda rápida y eficiente

### Para desarrolladores:
- ✅ Pueden tener datos hardcoded que no se suben a GitHub
- ✅ Sistema extensible y fácil de mantener
- ✅ Separación clara entre dominio y features
- ✅ Componentes reutilizables

---

## 🚀 Próximas Mejoras Sugeridas

1. **Edición de datos existentes:** Añadir funcionalidad para editar clientes y cuentas
2. **Eliminación de datos:** Botón para eliminar registros del storage
3. **Exportar/Importar:** Función para exportar e importar datos en JSON
4. **Validación de IBAN:** Validar formato de IBAN al añadir cuentas
5. **Historial de facturas:** Guardar facturas generadas en localStorage
6. **Respaldo en la nube:** Opción para sincronizar datos con servidor

---

## 📝 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build
npm run build

# Preview del build
npm run preview
```

---

## 🐛 Solución de Problemas

### Los datos no aparecen:
- Verificar que los archivos `.local.ts` existen
- Verificar la consola del navegador para errores
- Limpiar localStorage: `localStorage.clear()` en la consola

### Error de compilación:
- Ejecutar `npm install` nuevamente
- Verificar versión de Node.js (recomendado: v18+)
- Limpiar cache: `rm -rf node_modules dist && npm install`

---

**Fecha de implementación:** 2026-09-01  
**Versión:** 1.0.0
