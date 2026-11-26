# Sprint 32 — 2026-11-26 → 2026-12-03

## Estado
🟡 En curso

## Tareas
| ID | Descripción | Tamaño | Estado | Dependencias | Task file |
|---|---|---|---|---|---|
| T-159 | Erradicar desbordamiento global en `/perfil`, `/ficha` y `Toaster` móvil | M | ⬜ Pendiente | — | .agents/tasks/task-159.md |
| T-160 | Eliminar scroll lateral en barras de filtros y pestañas (`flex-wrap`) | M | ⬜ Pendiente | — | .agents/tasks/task-160.md |
| T-161 | Tableros Kanban responsivos sin scroll lateral en móvil | M | ⬜ Pendiente | — | .agents/tasks/task-161.md |

## Régimen Operativo del Sprint
- **Régimen**: Desatendida
- **Rama base**: `staging` (`744c9bd`)
- **Orden de Carriles (DAG de dependencias)**:
  - Carril 1: [T-159]
  - Carril 2: [T-160]
  - Carril 3: [T-161]
- **Sellado en**: 2026-11-26 18:44 UTC

## Notas de planning
- Sprint 31 archivado con 4/4 tareas completadas (`v0.12.0`, commit `744c9bd`).
- **T-159**: Resuelve el desbordamiento horizontal global de `/perfil` (`607px` en viewport `393px`), la cabecera desbordada de `/ficha` (`462px` en `279px`) y acota el ancho de `Toaster` en pantallas estrechas.
- **T-160**: Elimina todo scroll lateral en barras de filtros y tabs mediante `flex-wrap gap-2` en `DashboardView`, `ComunidadesView`, `EventosView`, `ResidenciasView`, `MarketplaceView`, `AjustesView` y `AdminPanel`.
- **T-161**: Adapta `KanbanBoard`, `KanbanColumn`, `TareasPanel`, `ProyectosView` y `PropuestasView` a apilado vertical (`flex-col md:flex-row`) en `< md`, erradicando el scroll horizontal de `1280px–1604px` en móvil.
