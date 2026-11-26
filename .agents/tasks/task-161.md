# Task T-161 — Tableros Kanban responsivos sin scroll lateral en móvil

## Metadatos
- **ID**: T-161
- **Título**: Tableros Kanban responsivos sin scroll lateral en móvil
- **Sprint**: Sprint 32
- **Tipo**: UX / Responsive / Mobile UI
- **Estado**: Pendiente
- **Fecha inicio**: 2026-11-26

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 32 / 2026-11-26
- **Diseño y arquitectura aprobados por**: Humano / Operador (`A, aprobado`)
- **Decisiones e interfaces selladas**:
  1. `src/components/ui/KanbanBoard.tsx`: pasar de `overflow-x-auto` permanente a `md:overflow-x-auto` y contenedor interno `flex-col md:flex-row gap-4 md:gap-6` (apilado vertical en móvil, columnas horizontales en desktop).
  2. `src/components/ui/KanbanColumn.tsx`: pasar de `min-w-[300px]` fijo a `w-full md:min-w-[300px] md:max-w-[350px]`.
  3. `src/pages/TareasPanel.tsx`, `src/pages/ProyectosView.tsx` y `src/pages/PropuestasView.tsx`: asegurar que skeletons y selectores superiores usen `w-full max-w-full flex-wrap` (sin `w-fit overflow-x-auto` ni `min-w-[300px]` en móvil).
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Caja de archivos
- `src/components/ui/KanbanBoard.tsx`
- `src/components/ui/KanbanColumn.tsx`
- `src/pages/TareasPanel.tsx`
- `src/pages/ProyectosView.tsx`
- `src/pages/PropuestasView.tsx`

## Criterios de Aceptación
- [ ] `/proyectos`, `/tareas` y `/gobernanza` apilan columnas verticalmente en `< md` con cero scroll horizontal (`scrollWidth <= innerWidth`).
- [ ] En desktop (`md:`), mantienen la vista Kanban en columnas intacta.
- [ ] `npm run lint` y `npm run build` pasan sin errores.
