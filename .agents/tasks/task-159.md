# Task T-159 — Erradicar desbordamiento global en `/perfil`, `/ficha` y `Toaster` móvil

## Metadatos
- **ID**: T-159
- **Título**: Erradicar desbordamiento global en `/perfil`, `/ficha` y `Toaster` móvil
- **Sprint**: Sprint 32
- **Tipo**: Bugfix / Responsive / Mobile UI
- **Estado**: Pendiente
- **Fecha inicio**: 2026-11-26

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 32 / 2026-11-26
- **Diseño y arquitectura aprobados por**: Humano / Operador (`A, aprobado`)
- **Decisiones e interfaces selladas**:
  1. `src/pages/PerfilView.tsx`: añadir `w-full max-w-4xl min-w-0 overflow-x-hidden` al contenedor raíz, `flex-wrap gap-2` en cabecera y tabs de navegación sin `overflow-x-auto whitespace-nowrap` (3 tabs adaptables en móvil).
  2. `src/components/perfil/PasaporteVisual.tsx`: asegurar `w-full max-w-full min-w-0` y `break-words` en tarjetas internas (`Firma Galáctica`, `Arquetipo Comunitario`) para que no se recorten en `393px`.
  3. `src/pages/FichaView.tsx`: añadir `flex-wrap gap-3 min-w-0` en cabecera de perfil/acciones para evitar desbordamiento (`462px` en `279px`).
  4. `src/components/Toaster.tsx`: acotar ancho en móvil (`w-[calc(100vw-2rem)] sm:w-full sm:max-w-sm`) evitando desbordamiento en viewport `393px`.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Caja de archivos
- `src/pages/PerfilView.tsx`
- `src/components/perfil/PasaporteVisual.tsx`
- `src/pages/FichaView.tsx`
- `src/components/Toaster.tsx`

## Criterios de Aceptación
- [ ] `/perfil` tiene `scrollWidth <= innerWidth` y cero cortes en `PasaporteVisual` en `393px`.
- [ ] `/ficha` tiene cero desbordamiento en cabecera/acciones.
- [ ] `Toaster` no desborda el viewport en móvil.
- [ ] `npm run lint` y `npm run build` pasan sin errores.
