# Task T-160 — Eliminar scroll lateral en barras de filtros y pestañas (`flex-wrap`)

## Metadatos
- **ID**: T-160
- **Título**: Eliminar scroll lateral en barras de filtros y pestañas (`flex-wrap`)
- **Sprint**: Sprint 32
- **Tipo**: UX / Responsive / Mobile UI
- **Estado**: Pendiente
- **Fecha inicio**: 2026-11-26

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 32 / 2026-11-26
- **Diseño y arquitectura aprobados por**: Humano / Operador (`A, aprobado`)
- **Decisiones e interfaces selladas**:
  1. Sustituir `overflow-x-auto` + `whitespace-nowrap` por `flex flex-wrap gap-2` en todas las barras de filtros y pestañas de navegación secundarias:
     - `src/pages/DashboardView.tsx`
     - `src/pages/ComunidadesView.tsx`
     - `src/pages/EventosView.tsx`
     - `src/pages/ResidenciasView.tsx`
     - `src/pages/MarketplaceView.tsx`
     - `src/pages/AjustesView.tsx`
     - `src/pages/AdminPanel.tsx`
  2. Ajustar padding compacto en móvil (`px-3 py-1.5 text-xs`) manteniendo diseño consistente con `@theme`.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Caja de archivos
- `src/pages/DashboardView.tsx`
- `src/pages/ComunidadesView.tsx`
- `src/pages/EventosView.tsx`
- `src/pages/ResidenciasView.tsx`
- `src/pages/MarketplaceView.tsx`
- `src/pages/AjustesView.tsx`
- `src/pages/AdminPanel.tsx`

## Criterios de Aceptación
- [ ] Cero scroll horizontal en barras de filtros y pestañas de las 7 vistas.
- [ ] Todas las opciones de filtro visibles sin cortar ni en móvil ni en desktop estrecho.
- [ ] `npm run lint` y `npm run build` pasan sin errores.
