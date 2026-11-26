# Sprint 31 — 2026-11-26 → 2026-12-03

## Estado
🟡 En curso

## Tareas
| ID | Descripción | Tamaño | Estado | Dependencias | Task file |
|---|---|---|---|---|---|
| T-155 | Reubicar `CreateNewModal` plano + Mover `"Crear nuevo"` fijo a `Sidebar` y `BottomNav` | S | 🟢 Completada | — | .agents/tasks/task-155.md |
| T-156 | Limpieza radical de `DashboardView` (Find New Connections directo + Kin chip) | M | 🟢 Completada | T-155 | .agents/tasks/task-156.md |
| T-157 | Modelo `enabledModules` en `Comunidad` + Hook `useNodeModules` con auto-detección | M | 🟢 Completada | — | .agents/tasks/task-157.md |
| T-158 | Capa 2 progresiva en `Sidebar`/`BottomNav` + `NodeModulesModal` y estado vacío guiado | M | ⬜ Pendiente | T-155, T-157 | .agents/tasks/task-158.md |

## Régimen Operativo del Sprint
- **Régimen**: Desatendida
- **Rama base**: `staging` (`eea7735`)
- **Orden de Carriles (DAG de dependencias)**:
  - Carril 1: [T-155 → T-156]
  - Carril 2: [T-157]
  - Convergencia: [T-158] (tras T-155 y T-157)
- **Sellado en**: 2026-11-26 17:40 UTC

## Notas de planning
- Sprint 30 archivado con 4/4 tareas completadas (`v0.11.0`, commit `eea7735`).
- **T-155**: Reubica `src/components/dashboard/CreateNewModal.tsx` a `src/components/CreateNewModal.tsx` (patrón plano `Create*.tsx`), renombra `"Crear algo"` → `"Crear nuevo"` (`Create New`), mueve el CTA protagonista al `Sidebar.tsx` y añade acceso directo limpio en `BottomNav.tsx` con etiquetas de 1 palabra sin truncamientos.
- **T-156**: Simplifica `DashboardView.tsx` al patrón directo *Find New Connections* de Retribalize: elimina el hero gigante y la barra duplicada de entidades; deja filtros + tarjetas directas y conserva el Kin del día como chip compacto.
- **T-157**: Añade `enabledModules?: NodeModuleId[]` a `Comunidad` con 3 niveles (Semilla: Tablón + Agenda + Miembros; Coordinación: Proyectos + Tareas; Madurez: Gobernanza + Actas + Soberanía), activación por herramienta y auto-detección retroactiva para nodos veteranos (ej. `arteara`).
- **T-158**: Implementa Capa 2 progresiva (Opción A sin tabs horizontales) en `Sidebar.tsx` y `BottomNav.tsx`: `← Volver a Red Canarias` siempre visible + 3 módulos base + `+ Activar módulos` (`NodeModulesModal.tsx`) y estado vacío guiado con `+ Añadir herramientas al nodo`.
