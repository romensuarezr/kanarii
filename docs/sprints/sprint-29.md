# Sprint 29 — 2026-11-25 → 2026-12-02

## Estado
🟡 En curso

## Tareas
| ID | Descripción | Tamaño | Estado | Dependencias | Task file |
|---|---|---|---|---|---|
| T-147 | Blindaje y Sanitización de Roles de Membresía en Ficha y Onboarding | S | ✅ Hecho | — | .agents/tasks/_archived/task-147.md |
| T-148 | Persistencia y Conexión de Convocatorias de Eventos y Residencias Comunitarias | M | ✅ Hecho | T-147 | .agents/tasks/_archived/task-148.md |
| T-149 | Flujo de Solicitud y Conexión de Sinergias entre Miembros de la Red | M | ⬜ Pendiente | T-148 | .agents/tasks/task-149.md |
| T-150 | Homologación de Herramientas de Flota (Hermes, Orca) y Sync Core Agent OS | S | ⬜ Pendiente | — | .agents/tasks/task-150.md |

## Régimen Operativo del Sprint
- **Régimen**: Desatendida
- **Orden de Carriles (DAG de dependencias)**:
  - Carril 1: [T-147 → T-148 → T-149] (secuencial: modelo de miembros, eventos y sinergias)
  - Carril 2: [T-150] (independiente: caja de archivos disjunta en tooling y scripts)
- **Sellado en**: 2026-11-25 18:47 UTC

## Notas de planning
- Sprint 28 archivado con 6/6 tareas completadas (v0.9.0).
- **T-147**: Ataca de raíz el bug crítico documentado en `docs/idea-inbox/2026-11-23-rol-membresia-invalido.md` donde roles de presentación (`propietario`, `voluntario`) bloquean la lectura de Firestore por fallo de permisos RBAC.
- **T-148**: Conecta las nuevas interfaces de `/eventos` y `/residencias` a colecciones reales de Firestore con queries reactivas y mutaciones seguras.
- **T-149**: Habilita la acción interactiva de conectar desde `SynergyCard` y `MemberCard`, generando mensajes con trazabilidad en el tablón/buzón.
- **T-150**: Homologa herramientas de la flota (Hermes v0.23.4, Orca v1.4.274) y sincroniza scripts del core de Agent OS sin tocar código de producto.
