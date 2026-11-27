# Task T-171 — Internacionalización de AdminPanel y Ajustes + Sellado de Baseline a 0

## Metadatos
- **ID**: T-171
- **Título**: Internacionalización de AdminPanel y Ajustes + Sellado de Baseline a 0
- **Sprint**: Sprint 34
- **Tipo**: Quality Gate / i18n / Final Polish
- **Estado**: 🟢 Completada
- **Fecha inicio**: 2026-11-27
- **Fecha fin**: 2026-11-27

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 34 / 2026-11-27
- **Diseño y arquitectura aprobados por**: Humano
- **Veredicto de diseño macro**: [APROBADO_EN_PLANNING]
- **Decisiones e interfaces selladas**:
  1. Crear y registrar 2 nuevos namespaces:
     - `admin` (`src/locales/{es,en}/admin.json`)
     - `settings` (`src/locales/{es,en}/settings.json`)
  2. Extraer y traducir:
     - `src/pages/AdminPanel.tsx` y subtabs (`DashboardTab.tsx`, `ComunidadSubTab.tsx`, `MarketplaceTab.tsx`, `AdminPanelModals.tsx`).
     - `src/pages/AdminSolicitudesView.tsx` y `src/components/ConfiguracionComunidadPanel.tsx`.
     - `src/pages/AjustesView.tsx` y `src/pages/KanariiTourPage.tsx`.
     - Componentes compartidos residuales en `src/components/ui/` (`EntityCard.tsx`, `TagArrayEditor.tsx`, `KanbanBoard.tsx`).
  3. Ejecución final del escáner determinista:
     - `i18n-baseline.json` queda fijado en exactamente **0** literales.
     - Ningún archivo de `src/pages` ni `src/components` genera warnings o errores en `scripts/check-i18n-visible-literals.ts`.
     - `npm run test:i18n` pasa con código de salida 0 con baseline = 0.

## Caja de archivos
- `src/locales/es/admin.json`
- `src/locales/en/admin.json`
- `src/locales/es/settings.json`
- `src/locales/en/settings.json`
- `src/pages/AdminPanel.tsx`
- `src/pages/AdminSolicitudesView.tsx`
- `src/components/ConfiguracionComunidadPanel.tsx`
- `src/pages/AjustesView.tsx`
- `src/pages/KanariiTourPage.tsx`
- `i18n-baseline.json`

## Criterios de Aceptación
- [x] `/admin`, `/admin/solicitudes`, `/ajustes` y `/tour` se muestran 100% en inglés al seleccionar `en`.
- [x] `i18n-baseline.json` contiene exactamente 0 literales pendientes.
- [x] `npm run test:i18n` pasa con código de salida 0 garantizando 0 copy hardcodeado en toda la aplicación.
