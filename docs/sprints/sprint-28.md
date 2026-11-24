# Sprint 28 — 2026-11-24 → 2026-11-30

## Estado
🟡 En curso

## Tareas
| ID | Descripción | Tamaño | Estado | Dependencias | Task file |
|---|---|---|---|---|---|
| T-141 | Cohesionar Navegación: Corregir enlaces rotos (Marketplace), separar Tablón de Gobernanza, añadir Calendario y restringir Cruce | S | ✅ Completada | — | .agents/tasks/_archived/task-141.md |
| T-142 | Home Pública Retribalizada y Enlace Directo a Pedagogía/Demos | M | ✅ Completada | T-141 | .agents/tasks/_archived/task-142.md |
| T-143 | Tarjetas de Miembros Estilo Retribalize con Acciones Rápidas y Conexión | M | ✅ Completada | T-141 | .agents/tasks/_archived/task-143.md |
| T-144 | Tarjeta-Resumen de Sinergia y Estados Vacíos en Cruce de Perfiles y Panel | M | ⏳ Pendiente | T-142, T-143 | .agents/tasks/task-144.md |
| T-145 | Tarjetas Enriquecidas de Comunidades y Localización i18n de Explorar Comunidades | M | ⏳ Pendiente | T-142 | .agents/tasks/task-145.md |

## Régimen Operativo del Sprint
- **Régimen**: Desatendida (A) — ramas aisladas `feat/SPRINT28-<tarea>`, verificación con `npm run lint` y `npm run build` antes de merge a `main` con `--no-ff`.
- **Orden de Carriles**: Secuencial [T-141 → T-142 → T-143 → T-144 → T-145].
- **Sellado en**: 2026-11-24

## Notas de planning
- Sprint 27 archivado con 9/9 tareas completadas (v0.8.0).
- Auditoría UI/UX de Retribalize.io y código local completada en vivo mediante el navegador de Orca.
- Prioridad central: elevar la calidad de UI/UX, navegación limpia y coherente, home pública atractiva con acceso a demos interactivas y tarjetas de miembros optimizadas.
- **T-142 Extensión acordada**: Apertura pública de `/comunidades` para permitir navegación exploratoria sin sesión (supercede ADR-005 con ADR-027 y actualiza `firestore.rules`).
