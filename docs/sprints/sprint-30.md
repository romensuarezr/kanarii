# Sprint 30 — 2026-11-25 → 2026-12-02

## Estado
🟡 En curso

## Tareas
| ID | Descripción | Tamaño | Estado | Dependencias | Task file |
|---|---|---|---|---|---|
| T-151 | Deduplicación Determinista de Sinergias y Fichas (Fix React Unique Key) | S | 🟢 Completada | — | .agents/tasks/task-151.md |
| T-152 | Unificación de Marca y Enfoque Territorial Canarias (Logo Oficial y Red Viva Canarias) | S | ⬜ Pendiente | — | .agents/tasks/task-152.md |
| T-153 | Navegación Móvil de 2 Capas Coherente con Web (`BottomNav.tsx`) | M | ⬜ Pendiente | T-152 | .agents/tasks/task-153.md |
| T-154 | Rediseño del Dashboard con Sencillez Retribalize (Encontrar Nuevas Conexiones vs Crear Algo) | M | ⬜ Pendiente | T-151 | .agents/tasks/task-154.md |

## Régimen Operativo del Sprint
- **Régimen**: Desatendida
- **Orden de Carriles (DAG de dependencias)**:
  - Carril 1: [T-151 → T-154] (secuencial: deduplicación de sinergias y rediseño de dashboard)
  - Carril 2: [T-152] (independiente: branding, logo oficial y copy territorial en Sidebar/TopBar)
  - Carril 3: [T-153] (secuencial tras branding: navegación móvil de 2 capas en BottomNav)
- **Sellado en**: 2026-11-25 19:45 UTC

## Notas de planning
- Sprint 29 archivado con 4/4 tareas completadas (v0.10.0).
- **T-151**: Erradica el warning de React `Encountered two children with the same key` en el dashboard y vistas de comunidad deduplicando las colecciones por `userId` en `calcularSinergiasMultiples` y asegurando claves compuestas seguras.
- **T-152**: Resuelve la discrepancia visual reemplazando el icono genérico `/icono-palmera.svg` por el logo oficial `kanarii-logo.svg` en `TopBar.tsx` y `Sidebar.tsx`. Además actualiza el posicionamiento textual de "Red Global" a "Red Viva Canarias" / "Red Canarias".
- **T-153**: Adapta la navegación móvil en `BottomNav.tsx` a la arquitectura de 2 capas: navegación clara en Capa 1 (Red Canarias: Sinergias, Nodos, Eventos, Residencias) y Capa 2 (Espacio interno del Nodo con retorno a la red).
- **T-154**: Implementa la simplicidad visual de Retribalize en `DashboardView.tsx`, articulando la experiencia de bienvenida en dos acciones claras: **"Encontrar nuevas conexiones"** (activar sinergias y afinidad en Canarias) y **"Crear algo"** (selector directo para iniciar un Nodo/Tribu, organizar un Encuentro, o publicar una Residencia/Estancia).
