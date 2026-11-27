# Plan de Implementación — T-168

## Metadatos
- **Tarea**: T-168 — Internacionalización de Dashboard, Buscador ReTribalize y Navegación Global
- **Sprint**: Sprint 34
- **Playbook**: `scout-then-build`
- **Rama propuesta**: `feat/SPRINT34-T-168-i18n-dashboard-retribalize`

## Objetivo Estratégico
Extraer e internacionalizar (ES y EN) todos los literales visibles en `DashboardView.tsx`, `ExploreEntityCard.tsx`, `KanariiEmptyStates.tsx` y `ContextualEmptyState.tsx`. Garantizar que el buscador ReTribalize, los filtros por entidad, los selectores y las tarjetas multientidad se muestren en inglés al activar `en`, respetando la frontera ADR-027 (contenido de usuario conserva su idioma original). Reducir el baseline inicial de 1.010 violaciones a ~981.

## Caja de Archivos
- `src/pages/DashboardView.tsx`
- `src/components/dashboard/ExploreEntityCard.tsx`
- `src/components/ui/KanariiEmptyStates.tsx`
- `src/components/ui/ContextualEmptyState.tsx`
- `src/locales/es/dashboard.json`
- `src/locales/en/dashboard.json`
- `src/locales/es/common.json`
- `src/locales/en/common.json`
- `i18n-baseline.json`

## Pasos Secuenciales
1. **Actualizar Diccionarios `dashboard.json` (ES y EN)**:
   - Añadir claves para banner público (`publicBanner.tag`, `publicBanner.title`, `publicBanner.description`, `publicBanner.loginCta`).
   - Añadir claves del buscador ReTribalize: pestañas (`search.tabs.advanced`, `search.tabs.browseAll`, `search.tabs.improveSynergies`), prompt placeholder (`search.promptPlaceholder`), botón limpiar (`search.clear`), selector buscando (`search.lookingFor.label`, `options.all`, `options.people`, `options.nodes`, `options.events`, `options.residencies`), selector nodo (`search.nodeFilter.label`, `options.anyNode`), toggle cerca (`search.nearFilter.label`), botón buscar (`search.submitBtn`), estado de cálculo (`calculatingSynergies`).
2. **Actualizar Diccionarios `common.json` (ES y EN)**:
   - Añadir claves para badges y acciones de `ExploreEntityCard` (`entities.node`, `entities.event`, `entities.residency`, `entities.exploreNode`, `entities.viewEvent`, `entities.viewResidency`).
   - Añadir títulos y descripciones de empty states (`emptyStates.marketplaceTitle`, `emptyStates.historyTitle`, `emptyStates.ideasTitle`, `emptyStates.tasksTitle`, `emptyStates.startSomething`).
3. **Refactorizar Componentes**:
   - Consumir las nuevas claves en `src/pages/DashboardView.tsx` con `useTranslation(['dashboard', 'common'])`.
   - Consumir claves en `src/components/dashboard/ExploreEntityCard.tsx`.
   - Consumir claves en `src/components/ui/KanariiEmptyStates.tsx` y `ContextualEmptyState.tsx`.
4. **Actualizar Baseline**:
   - Ejecutar `npx tsx scripts/check-i18n-visible-literals.ts --generate-baseline`.
   - Verificar que el total de violaciones disminuye y que los archivos tocados quedan en 0 warnings.
5. **Verificación Determinista**:
   - `npm run lint` (0 errores de tipos).
   - `npm run test:i18n` (0 discrepancias de claves y 0 regresiones de baseline).

## Conformidad con Diseño Macro
- 100% conforme con las decisiones e interfaces selladas en planning (`.agents/tasks/task-168.md`).
- Claves semánticas completas con paridad exacta en `es` y `en`.
