# Sprint 33 — 2026-11-26 → 2026-12-03

## Estado
✅ Completado

## Tareas
| ID | Descripción | Tamaño | Estado | Dependencias | Task file |
|---|---|---|---|---|---|
| T-162 | Separar capas de rol (`rol` RBAC, `membershipType`, `headline`) y corregir colisión `rolComunitario` | M | 🟢 Completada | — | .agents/tasks/task-162.md |
| T-163 | Sincronizar `adminUids` ↔ `community_members.rol` y gestión de roles/vínculos en `ComunidadSubTab` | M | 🟢 Completada | T-162 | .agents/tasks/task-163.md |
| T-164 | Limpieza UX de clasificación en `PerfilView`, `FichaView`, `FichaComunidadView` y `MemberCard` | M | 🟢 Completada | T-162 | .agents/tasks/task-164.md |
| T-165 | Buscador avanzado estilo ReTribalize (`DashboardView` multi-entidad con imágenes) | M | 🟢 Completada | — | .agents/tasks/task-165.md |
| T-166 | Script reproducible de datos demo con imágenes (`scripts/seed-demo.ts --seed / --clean`) | M | 🟢 Completada | T-165 | .agents/tasks/task-166.md |

## Régimen Operativo del Sprint
- **Régimen**: Desatendida
- **Rama base**: `staging` (`b8d02e0`)
- **Orden de Carriles (DAG de dependencias)**:
  - Carril 1: [T-162 → T-163]
  - Carril 2 (tras T-162): [T-164]
- **Sellado en**: 2026-11-26 19:39 UTC

## Notas de planning
- Sprint 32 archivado con 3/3 tareas completadas (`v0.13.0`, commit `b8d02e0`).
- **Enmiendas aprobadas (`A, aprobado con cambios`)**:
  - `membershipType`: enum estricto `'custodian' | 'resident' | 'volunteer' | 'collaborator'` (migración `propietario → custodian`; `'miembro'` NO es valor de vínculo).
  - Validación de `membershipType` y `headline` (≤ 45 chars) en `firestore.rules` + suite de tests de reglas.
  - `T-162` es compuerta bloqueante: si falla, se aborta de inmediato.
