# Task T-147 — Blindaje y Sanitización de Roles de Membresía en Ficha y Onboarding

## Metadatos
- **ID**: T-147
- **Título**: Blindaje y Sanitización de Roles de Membresía en Ficha y Onboarding
- **Sprint**: Sprint 29
- **Tipo**: Bugfix / Seguridad / Backend
- **Estado**: En curso
- **Fecha inicio**: 2026-11-25

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 29 / 2026-11-25
- **Diseño y arquitectura aprobados por**: Humano / Operador
- **Decisiones e interfaces selladas**:
  1. `community_members.rol` se restringe estrictamente a `'admin' | 'miembro' | 'visitante'`, alineado con `firestore.rules`.
  2. Implementar función pura `normalizeMemberRole(rol?: string): 'admin' | 'miembro' | 'visitante'` en `src/lib/services/members.ts`.
  3. En `src/lib/services/fichas.ts:486`, sanitizar con `normalizeMemberRole` y preservar el rol `'admin'` si el usuario ya es administrador de la comunidad para evitar degradación involuntaria de permisos al guardar su ficha.
  4. Los títulos de presentación como `"propietario"` o `"voluntario"` se almacenan exclusivamente en `datosPersona.rol_comunidad`.
  5. Crear script determinista `scripts/fix-member-roles.ts` para sanear documentos corruptos en Firestore.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Contexto y Motivación
Documentado en `docs/idea-inbox/2026-11-23-rol-membresia-invalido.md`:
Al completar el onboarding o editar la ficha, valores de presentación (`propietario`, `voluntario`) se escribían directamente en el campo `rol` del documento en `/community_members/{id}`. Como `firestore.rules` exige `request.auth.uid in getRole()` evaluando `admin`, `miembro` o `visitante`, cualquier usuario afectado recibía errores `Missing or insufficient permissions` bloqueando todas las lecturas de su comunidad.

## Caja de archivos
- `src/lib/services/members.ts`
- `src/lib/services/fichas.ts`
- `scripts/fix-member-roles.ts`
- `docs/sprints/sprint-29.md`
- `.agents/tasks/task-147.md`

## Criterios de Aceptación
- [ ] `normalizeMemberRole()` implementado y testeado para mapear strings arbitrarios a `'admin' | 'miembro' | 'visitante'`.
- [ ] `saveFicha()` en `fichas.ts` nunca sobrescribe un rol de administrador existente ni escribe roles inválidos en `community_members`.
- [ ] Script `scripts/fix-member-roles.ts` creado para inspeccionar y corregir documentos con roles no canónicos en Firestore.
- [ ] `npm run lint` y `npm run build` pasan limpios sin errores.
