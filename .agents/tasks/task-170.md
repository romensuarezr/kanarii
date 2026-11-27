# Task T-170 — Internacionalización de Gobernanza, Actas, Proyectos, Tareas y Soberanía (`governance`, `projects`, `marketplace`)

## Metadatos
- **ID**: T-170
- **Título**: Internacionalización de Gobernanza, Actas, Proyectos, Tareas y Soberanía (`governance`, `projects`, `marketplace`)
- **Sprint**: Sprint 34
- **Tipo**: Feature / i18n / Core Modules
- **Estado**: ⬜ Pendiente
- **Fecha inicio**: 2026-11-27

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 34 / 2026-11-27
- **Diseño y arquitectura aprobados por**: Humano
- **Veredicto de diseño macro**: [APROBADO_EN_PLANNING]
- **Decisiones e interfaces selladas**:
  1. Crear y registrar 3 nuevos namespaces en `src/i18n/index.ts` y `src/types/i18next.d.ts`:
     - `governance` (`src/locales/{es,en}/governance.json`)
     - `projects` (`src/locales/{es,en}/projects.json`)
     - `marketplace` (`src/locales/{es,en}/marketplace.json`)
  2. Extraer y traducir:
     - Gobernanza y Actas: `src/pages/PropuestasView.tsx`, `src/pages/ActasPanel.tsx`, `src/components/CreateProposalWizard.tsx`, `src/components/PropuestaDetail.tsx`, `src/components/CreateActaModal.tsx`, `src/components/ActaDetailOverlay.tsx`.
     - Proyectos y Tareas: `src/pages/ProyectosView.tsx`, `src/pages/TareasPanel.tsx`, `src/components/ui/KanbanColumn.tsx`, `src/components/CreateTareaModal.tsx`, `src/components/ProjectDetailOverlay.tsx`.
     - Soberanía y Marketplace: `src/pages/MarketplaceView.tsx`, `src/pages/Tablon.tsx`, `src/components/CreateServicioModal.tsx`, `src/components/CreatePostModal.tsx`, `src/components/ContraofertaModal.tsx`, `src/components/acuerdos/AcuerdoDetailModal.tsx`.
  3. Actualizar `i18n-baseline.json` reduciendo las violaciones resueltas.

## Caja de archivos
- `src/i18n/index.ts`
- `src/types/i18next.d.ts`
- `src/locales/es/governance.json`
- `src/locales/en/governance.json`
- `src/locales/es/projects.json`
- `src/locales/en/projects.json`
- `src/locales/es/marketplace.json`
- `src/locales/en/marketplace.json`
- `src/pages/PropuestasView.tsx`
- `src/pages/ActasPanel.tsx`
- `src/pages/ProyectosView.tsx`
- `src/pages/TareasPanel.tsx`
- `src/pages/MarketplaceView.tsx`
- `src/pages/Tablon.tsx`
- `i18n-baseline.json`

## Criterios de Aceptación
- [ ] `/gobernanza`, `/actas`, `/proyectos`, `/tareas` y `/soberania` se muestran 100% en inglés al seleccionar `en`.
- [ ] Títulos de propuestas/proyectos creados por usuarios conservan su texto original.
- [ ] `npm run test:i18n` pasa con el baseline reducido.
