# Task T-168 — Internacionalización de Dashboard, Buscador ReTribalize y Navegación Global

## Metadatos
- **ID**: T-168
- **Título**: Internacionalización de Dashboard, Buscador ReTribalize y Navegación Global
- **Sprint**: Sprint 34
- **Tipo**: Feature / i18n / UI
- **Estado**: ⬜ Pendiente
- **Fecha inicio**: 2026-11-27

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 34 / 2026-11-27
- **Diseño y arquitectura aprobados por**: Humano
- **Veredicto de diseño macro**: [APROBADO_EN_PLANNING]
- **Decisiones e interfaces selladas**:
  1. `src/pages/DashboardView.tsx`:
     - Reemplazar textos estáticos del buscador ReTribalize (`Búsqueda avanzada`, `Explorar todo`, `Mejorar sinergias`, `Buscando`, `Nodo`, `Cerca`, `Buscar`, contadores de resultados) por llamadas `t(...)`.
     - Claves organizadas bajo el namespace `dashboard` (ej. `dashboard:search.advanced`, `dashboard:search.browseAll`, `dashboard:search.filters.lookingFor`, etc.).
  2. `src/components/dashboard/ExploreEntityCard.tsx`:
     - Traducir badges de tipo (`NODO`, `EVENTO`, `ESTANCIA`), metadata de capacidad y acción (`Explorar nodo`, `Ver evento`, `Ver estancia`).
  3. `src/components/layout/` y `src/components/ui/`:
     - Traducir `Sidebar.tsx`, `BottomNav.tsx`, `TopBar.tsx`, `KanariiEmptyStates.tsx` y `ContextualEmptyState.tsx` bajo namespace `common`.
  4. Actualizar simultáneamente `src/locales/es/dashboard.json`, `src/locales/en/dashboard.json`, `src/locales/es/common.json` y `src/locales/en/common.json`.
  5. Actualizar `i18n-baseline.json` reduciendo las violaciones resueltas.

## Caja de archivos
- `src/pages/DashboardView.tsx`
- `src/components/dashboard/ExploreEntityCard.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/TopBar.tsx`
- `src/components/ui/KanariiEmptyStates.tsx`
- `src/components/ui/ContextualEmptyState.tsx`
- `src/locales/es/dashboard.json`
- `src/locales/en/dashboard.json`
- `src/locales/es/common.json`
- `src/locales/en/common.json`
- `i18n-baseline.json`

## Criterios de Aceptación
- [ ] `/dashboard` y la navegación global se muestran 100% en inglés al seleccionar `en`.
- [ ] Cero literales hardcodeados en los archivos de la caja.
- [ ] `npm run test:i18n` pasa con el baseline reducido.
