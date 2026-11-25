# Task T-151 — Deduplicación Determinista de Sinergias y Fichas (Fix React Unique Key)

## Metadatos
- **ID**: T-151
- **Título**: Deduplicación Determinista de Sinergias y Fichas (Fix React Unique Key)
- **Sprint**: Sprint 30
- **Tipo**: Bugfix / DX / Robustez
- **Estado**: Pendiente
- **Fecha inicio**: 2026-11-25

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 30 / 2026-11-25
- **Diseño y arquitectura aprobados por**: Humano / Operador
- **Decisiones e interfaces selladas**:
  1. En `src/lib/sinergias.ts`, `calcularSinergiasMultiples` debe filtrar elementos duplicados por `userId` usando un `Set<string>` antes de evaluar afinidades.
  2. En `src/pages/DashboardView.tsx`, verificar que las claves en `.map((match) => ...)` sean deterministas y únicas (`key={match.targetUserId || match.targetFicha?.id}`).
  3. En `src/pages/FichaComunidadView.tsx`, asegurar que la lista de miembros no genere claves colisionadas en React.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Contexto y Motivación
La consola del navegador reporta warnings de React (`Encountered two children with the same key, 'Ma5KgZgD7RYWl9jDjzBeGnFzeno2'`), provocados por duplicidad de fichas de un mismo usuario en los pools de sinergias.

## Caja de archivos
- `src/lib/sinergias.ts`
- `src/pages/DashboardView.tsx`
- `src/pages/FichaComunidadView.tsx`
- `docs/sprints/sprint-30.md`
- `.agents/tasks/task-151.md`

## Criterios de Aceptación
- [ ] `calcularSinergiasMultiples` deduplica de forma estricta por `userId`.
- [ ] Claves únicas garantizadas en las tarjetas de sinergia y miembros.
- [ ] Cero warnings de React de claves duplicadas en consola.
- [ ] `npm run lint` y `npm run build` pasan sin errores.
