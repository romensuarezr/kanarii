# Task T-148 — Persistencia y Conexión de Convocatorias de Eventos y Residencias Comunitarias

## Metadatos
- **ID**: T-148
- **Título**: Persistencia y Conexión de Convocatorias de Eventos y Residencias Comunitarias
- **Sprint**: Sprint 29
- **Tipo**: Feature / Datos / Reactividad
- **Estado**: Pendiente
- **Fecha inicio**: 2026-11-25

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 29 / 2026-11-25
- **Diseño y arquitectura aprobados por**: Humano / Operador
- **Decisiones e interfaces selladas**:
  1. Extender `src/lib/services/eventos.ts` con query abierta `listenNetworkEventos(callback)` y mutación `inscribirseEnEvento(eventoId, uid)`.
  2. Crear servicio `src/lib/services/residencias.ts` con query abierta `listenNetworkResidencias(callback)` y mutación `solicitarResidencia(residenciaId, solicitud)`.
  3. Crear hooks reactivos o extender `useEventos` y `useResidencias` consumiendo `useFirestoreCollection`.
  4. Conectar `EventosView.tsx` y `ResidenciasView.tsx` a los datos vivos de Firestore con fallback a datos demo si las colecciones están vacías.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Contexto y Motivación
Las vistas `/eventos` y `/residencias` creadas en T-146 necesitan persistir en colecciones de Firestore para que los guardianes de las comunidades puedan convocar actividades y los usuarios de la red puedan registrar su asistencia y solicitudes de estancia.

## Caja de archivos
- `src/lib/services/eventos.ts`
- `src/lib/services/residencias.ts`
- `src/hooks/useEventos.ts`
- `src/hooks/useResidencias.ts`
- `src/pages/EventosView.tsx`
- `src/pages/ResidenciasView.tsx`
- `docs/sprints/sprint-29.md`
- `.agents/tasks/task-148.md`

## Criterios de Aceptación
- [ ] Servicios y hooks de eventos y residencias implementados con reactividad en tiempo real.
- [ ] Conexión en `EventosView.tsx` y `ResidenciasView.tsx` persistiendo inscripciones en Firestore.
- [ ] Design tokens estrictos del `@theme`.
- [ ] `npm run lint` y `npm run build` pasan limpios sin errores.
