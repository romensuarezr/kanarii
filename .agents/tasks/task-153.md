# Task T-153 — Navegación Móvil de 2 Capas Coherente con Web (`BottomNav.tsx`)

## Metadatos
- **ID**: T-153
- **Título**: Navegación Móvil de 2 Capas Coherente con Web (`BottomNav.tsx`)
- **Sprint**: Sprint 30
- **Tipo**: UX / Mobile / Responsive
- **Estado**: Completada
- **Fecha inicio**: 2026-11-25

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 30 / 2026-11-25
- **Diseño y arquitectura aprobados por**: Humano / Operador
- **Decisiones e interfaces selladas**:
  1. En `src/components/BottomNav.tsx`, detectar si el usuario se encuentra en Capa 1 (Red Canarias) o en Capa 2 (Espacio del Nodo específico).
  2. En Capa 1: barra con acceso directo a [Sinergias/Inicio, Nodos, Eventos, Residencias, Mi Ficha/Más].
  3. En Capa 2: barra con las secciones del nodo activo [Tablón, Ficha/Presentación, Tareas/Proyectos] y un botón prominente para "Volver a Red Canarias".
  4. Sincronizar badges y rutas móviles con los tokens semánticos de `@theme`.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Contexto y Motivación
La navegación web evolucionó a una separación nítida en dos capas (Red viva vs. interior del nodo). La versión móvil en `BottomNav.tsx` requería esta misma coherencia para que la experiencia de usuario sea idéntica y natural en smartphones.

## Caja de archivos
- `src/components/BottomNav.tsx`
- `src/config/navigation.ts`
- `docs/sprints/sprint-30.md`
- `.agents/tasks/task-153.md`

## Criterios de Aceptación
- [x] `BottomNav` refleja de forma interactiva la Capa 1 o Capa 2 según el espacio activo.
- [x] Botón de retorno rápido a la Red Canarias visible desde el espacio de cualquier nodo en móvil.
- [x] Enlaces directos a Nodos, Eventos y Residencias disponibles en la barra móvil.
- [x] `npm run lint` y `npm run build` pasan limpios sin errores.
