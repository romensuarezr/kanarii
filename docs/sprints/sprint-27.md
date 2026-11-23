# Sprint 27 — 2026-11-23 → 2026-11-29

## Estado
🟡 En curso

## Tareas
| ID | Descripción | Tamaño | Estado | Dependencias | Task file |
|---|---|---|---|---|---|
| T-132 | Corregir duplicidad de rutas `/perfil` y `/ficha`: separar en rutas distintas — `/perfil` a perfil de usuario, `/ficha` a vista de ficha comunitaria | S | ✅ Completada | — | .agents/tasks/task-132.md |
| T-133 | Corregir persistencia de RRSS en saveFicha y mapping mappedUser: extender lista blanca en fichas.ts y añadir campos a mappedUser en PasaporteUniversalView y PasaporteComunitarioView | M | ✅ Completada | — | .agents/tasks/task-133.md |
| T-136 | Unificar lectura de perfil y ficha: extraer FichaReadOnly, renderizar en /perfil con toda la info y mergear getDatosPersona con datosOnboarding | M | ✅ Completada | T-133 | .agents/tasks/task-136.md |
| T-137 | Normalización de teléfono E.164 y acción de WhatsApp: añadir ContactActions (Llamar/WhatsApp), validador y selector de país | M | ⬜ Pendiente | T-136 | .agents/tasks/task-137.md |
| T-134 | Añadir selectores de visibilidad de privacidad para RRSS y otros datos: extender ConfigPrivacidad con campos instagram/linkedin/website/phone/email y crear controles UI en FichaView y PasaporteVisual | M | ⬜ Pendiente | T-137 | .agents/tasks/task-134.md |
| T-135 | Crear menú de configuración dedicado accesible desde el avatar de usuario: añadir botón "Ajustes" en UserAvatarMenu.tsx con submenú de privacidad, RRSS, perfil, comunidad, cuenta | L | ⬜ Pendiente | T-134 | .agents/tasks/task-135.md |

## Régimen Operativo del Sprint
- **Régimen**: Desatendida (A) — pero trabajando en rama feature/SPRINT27-<tarea>; test local previo antes de merge a main. Secuencia: branch → implementar tarea → test manual/automático → merge a main → siguiente tarea carril 1.
- **Orden de Carriles (DAG de dependencias)**:
  - Carril 1: [T-132 → T-133 → T-136 → T-137 → T-134 → T-135] (secuencial: dependencias acumuladas)
- **Sellado en**: 2026-11-23

## Notas de planning
- Sprint 24 archivado con tareas pendientes (0/5); returned to roadmap.
- Investigación OSS y SearXNG completada en docs/sprints/sprint-27-research.md (Gate T-129 verificado).
- 4 tareas propuestas cubren: separación de routes, persistencia RRSS, selectores de privacidad, menú de configuración.
- Régimen Desatendida con flujo de worktrees/branches: agente ejecuta tareas secuencialmente en ramas aisladas, testing local previo antes merge a main. Ante cualquier fallo de relé o verificación, aborta a humano (fail-closed).
- T-132 es independente de T-133 en terms de código (routes vs data), pero se mantiene carril secuencial por política de release gates.
