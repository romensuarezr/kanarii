# Task T-145 — Tarjetas Enriquecidas de Comunidades y Localización Completa (i18n) de Explorar Comunidades

## Metadatos
- **ID**: T-145
- **Título**: Tarjetas Enriquecidas de Comunidades y Localización Completa (i18n) de Explorar Comunidades
- **Sprint**: Sprint 28
- **Tipo**: Feature UI / UX / i18n
- **Estado**: Pendiente
- **Fecha inicio**: 2026-11-24

## Contexto y Motivación
1. Tras la apertura pública de `/comunidades` (ADR-027), la vista de catálogo (`ComunidadesView.tsx`) recibe tanto a miembros activos como a visitantes no registrados.
2. Actualmente, las tarjetas de comunidad muestran un diseño plano con campos en bruto, y la página carece de internacionalización completa (textos en español hardcodeados sin soporte de inglés en `src/locales/es/communities.json` y `src/locales/en/communities.json`).
3. Siguiendo el estándar de diseño visual de Kanarii y los aprendizajes de Retribalize:
   - Enriquecer visualmente las tarjetas de comunidades (badges de tipo de comunidad: ecoaldea, finca, nomada, cohousing; métricas de miembros y actividades; indicadores de gobernanza; diseño responsivo con tokens semánticos).
   - Extraer todos los literales a `communities.json` (tanto en `es` como en `en`), cubriendo estados vacíos, cabecera, modales de solicitud de acceso, canje de código y etiquetas de propósito.

## Caja Autorizada de Archivos
- `src/pages/ComunidadesView.tsx`
- `src/components/comunidades/` (si se extraen componentes modulares de tarjetas)
- `src/locales/es/communities.json`
- `src/locales/en/communities.json`
- `docs/sprints/sprint-28.md`
- `.agents/tasks/task-145.md`

## Criterios de Aceptación
- [ ] Tarjetas de comunidad enriquecidas con diseño visual consistente con los design tokens (`bg-bg-surface`, `border-border`, tags estilizados, badges de tipo y acceso).
- [ ] Cero literales hardcodeados en `ComunidadesView`: toda la vista traduce dinámicamente mediante `useTranslation('communities')`.
- [ ] Claves completas y simétricas en `src/locales/es/communities.json` y `src/locales/en/communities.json`.
- [ ] Experiencia de visitante no autenticado pulida (feedback limpio al pulsar solicitar acceso o canjear código mediante `AuthGateModal`).
- [ ] `npm run lint` y `npm run build` pasan limpios sin errores.
