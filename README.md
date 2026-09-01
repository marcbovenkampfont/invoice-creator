# Invoice Creator

Aplicación web para la creación y gestión de facturas, clientes y cuentas bancarias.

## 🚀 Características

- ✅ **Gestión de Facturas**: Crea y genera facturas en formato PDF
- ✅ **Gestión de Clientes**: Administra tu base de datos de clientes
- ✅ **Gestión de Cuentas Bancarias**: Gestiona las cuentas donde recibirás los pagos
- ✅ **Almacenamiento Local**: Los datos se guardan automáticamente en el navegador
- ✅ **Datos Híbridos**: Combina datos locales (hardcoded) con datos del storage

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── components/        # Componentes compartidos (Layout, Modal, Input, etc.)
├── domains/          # Lógica de negocio por dominio
│   ├── clients/      # Componentes y tipos de clientes
│   └── bankAccounts/ # Componentes y tipos de cuentas bancarias
├── features/         # Páginas principales de la aplicación
│   ├── clients/      # Página de gestión de clientes
│   ├── bankAccounts/ # Página de gestión de cuentas bancarias
│   ├── invoices/     # Página de generación de facturas
│   ├── home/         # Página de inicio
│   └── settings/     # Configuración
├── util/
│   ├── constants/    # Datos locales (clientes y cuentas predefinidas)
│   ├── storage/      # Sistema de almacenamiento con localStorage
│   └── pdf/          # Generador de PDFs
└── types/            # Tipos TypeScript globales
```

## 🔧 Configuración Inicial

### 1. Configurar datos locales

Los datos locales (clientes y cuentas bancarias) se configuran en la carpeta `src/util/constants/`:

```bash
# Copiar los archivos de ejemplo
cp src/util/constants/clients.example.ts src/util/constants/clients.local.ts
cp src/util/constants/bankAccounts.example.ts src/util/constants/bankAccounts.local.ts

# Editar con tus datos reales
# Los archivos .local.ts NO se suben a GitHub (están en .gitignore)
```

### 2. Añadir nuevos clientes o cuentas

Puedes añadir datos de dos formas:

1. **Vía interfaz**: Usa los botones "➕ Añadir" en las páginas de Clientes o Cuentas Bancarias
2. **Hardcoded**: Edita los archivos `*.local.ts` directamente

Los datos se combinan automáticamente al listar.

## 🎨 Tecnologías

- **React** - Librería de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **SCSS** - Preprocesador de CSS
- **React Router** - Navegación
- **jsPDF / PDFKit** - Generación de PDFs

## 📝 Sistema de Storage

El proyecto incluye un sistema de almacenamiento que combina datos locales con datos guardados en `localStorage`:

- Los datos locales (en archivos `.local.ts`) se usan como base
- Los datos añadidos desde la UI se guardan en `localStorage`
- Al listar, se combinan ambas fuentes automáticamente

Ver más detalles en [src/util/storage/README.md](src/util/storage/README.md)

## 🤝 Contribución

Este proyecto está pensado para uso personal, pero si quieres contribuir:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso personal. Contacta al autor para más información.

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
