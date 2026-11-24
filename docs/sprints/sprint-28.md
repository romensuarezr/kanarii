# Sprint 28 — 2026-11-24 → 2026-11-30

## Estado
🟡 En curso

## Tareas
| ID | Descripción | Tamaño | Estado | Dependencias | Task file |
|---|---|---|---|---|---|
| T-141 | Cohesionar Navegación: Corregir enlaces rotos (Marketplace), separar Tablón de Gobernanza, añadir Calendario y restringir Cruce | S | ✅ Completada | — | .agents/tasks/_archived/task-141.md |
| T-142 | Home Pública Retribalizada y Enlace Directo a Pedagogía/Demos | M | ✅ Completada | T-141 | .agents/tasks/_archived/task-142.md |
| T-143 | Tarjetas de Miembros Estilo Retribalize con Acciones Rápidas y Conexión | M | ✅ Completada | T-141 | .agents/tasks/_archived/task-143.md |
| T-144 | Dashboard de Encuentro (/dashboard) y Tarjeta de Sinergia Determinista (Isla + Kin/HD + Tríada) | L | ✅ Completada | T-142, T-143 | .agents/tasks/_archived/task-144.md |
| T-145 | Directorio de Nodos (Comunidades, Residencias, Nodos Online) y Ficha con Pestañas e i18n | M | ⏳ Pendiente | T-142 | .agents/tasks/task-145.md |
| T-146 | Navegación de 2 Capas en Sidebar (Red Global vs. Espacio de Nodo con 'Volver a la Red') | M | ⏳ Pendiente | T-144, T-145 | .agents/tasks/task-146.md |

## Régimen Operativo del Sprint
- **Régimen**: Desatendida (A) — ramas aisladas `feat/SPRINT28-<tarea>`, verificación con `npm run lint` y `npm run build` antes de merge a `main` con `--no-ff`.
- **Orden de Carriles**: Secuencial [T-141 → T-142 → T-143 → T-144 → T-145 → T-146].
- **Sellado en**: 2026-11-24

## Notas de planning
- Sprint 27 archivado con 9/9 tareas completadas (v0.8.0).
- Auditoría UI/UX de Retribalize.io y código local completada en vivo mediante el navegador de Orca.
- **Evolución conceptual**: Nodos (físicos, residencias/colivings y online) en lugar de solo comunidades. Incorporación de Eventos y Residencias como palancas de encuentro temprano.
- **Motor de Match**: Determinista y transparente combinando proximidad insular + API astrológica (Kin Maya / Diseño Humano) + Tríada de reciprocidad (Dones ⇄ Necesidades).
- **Arquitectura de 2 Capas**: Capa 1 (Red Global con `/dashboard`, `/nodos`, `/eventos`, `/residencias`, `/personas`, `/ficha`) y Capa 2 (Espacio Operativo del Nodo con herramientas sociocráticas y botón "← Volver a la Red").
