# Configuración de Datos Sensibles

Este directorio contiene archivos con datos sensibles (clientes y cuentas bancarias) que no deben subirse a GitHub.

## Archivos

- `*.ts` - Archivos base que importan los datos locales
- `*.example.ts` - Plantillas con datos de ejemplo
- `*.local.ts` - **TUS DATOS REALES** (ignorados por git, no se suben a GitHub)

## Configuración Inicial

Si es tu primera vez clonando este repositorio:

1. Copia los archivos de ejemplo:
   ```bash
   cp clients.example.ts clients.local.ts
   cp bankAccounts.example.ts bankAccounts.local.ts
   ```

2. Edita los archivos `.local.ts` con tus datos reales:
   - `clients.local.ts` - Información de tus clientes
   - `bankAccounts.local.ts` - Información de tus cuentas bancarias

## Seguridad

Los archivos `*.local.ts` están en `.gitignore` y **nunca se subirán a GitHub**. Solo los archivos de ejemplo se compartirán en el repositorio.

## Comportamiento en build y produccion

- En produccion se usan los archivos `*.public.ts` (sin datos sensibles).
- En desarrollo, Vite reemplaza automaticamente los modulos publicos por `*.local.ts` si esos archivos existen en tu maquina.
- Resultado: aunque hagas `npm run build` desde tu equipo, los datos de `*.local.ts` no se incluyen en `dist`.
