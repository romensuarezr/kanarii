# Task T-150 — Homologación de Herramientas de Flota (Hermes, Orca) y Sync Core Agent OS

## Metadatos
- **ID**: T-150
- **Título**: Homologación de Herramientas de Flota (Hermes, Orca) y Sync Core Agent OS
- **Sprint**: Sprint 29
- **Tipo**: DX / Tooling / Mantenimiento
- **Estado**: Completada
- **Fecha inicio**: 2026-11-25
- **Fecha fin**: 2026-11-25

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 29 / 2026-11-25
- **Diseño y arquitectura aprobados por**: Humano / Operador
- **Decisiones e interfaces selladas**:
  1. Ejecutar sincronización de Agent OS para actualizar `scripts/agent/generate-homepage-config.sh` desde el upstream.
  2. Homologar las versiones upstream detectadas por la sonda (Hermes `v0.23.4`, Orca `v1.4.274`) actualizando runbooks y skills activas en `.agents/skills/`.
  3. Cero modificaciones en código de producto en `src/`.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Contexto y Motivación
Mantener la flota de herramientas y el control plane de Agent OS al día según las directivas del paso 1c de sprint-planning.

## Caja de archivos
- `scripts/agent/generate-homepage-config.sh`
- `.agents/skills/orca-cli/SKILL.md`
- `docs/sprints/sprint-29.md`
- `.agents/tasks/task-150.md`

## Criterios de Aceptación
- [x] `scripts/agent/sync.sh .` ejecutado limpiamente.
- [x] Habilidades y runbooks de tooling actualizados.
- [x] `bash scripts/agent/check-tooling-updates.sh` verifica herramientas al día.
