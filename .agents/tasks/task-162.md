# Task T-162 — Separar capas de rol (`rol` RBAC, `membershipType`, `headline`) y corregir colisión `rolComunitario`

## Metadatos
- **ID**: T-162
- **Título**: Separar capas de rol (`rol` RBAC, `membershipType`, `headline`) y corregir colisión `rolComunitario`
- **Sprint**: Sprint 33
- **Tipo**: Arquitectura / Modelo de Datos / Bugfix
- **Estado**: Pendiente
- **Fecha inicio**: 2026-11-26

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 33 / 2026-11-26
- **Diseño y arquitectura aprobados por**: Humano / Operador (`A, aprobado con cambios`)
- **Decisiones e interfaces selladas**:
  1. `src/lib/services/_types.ts`: definir `MembershipType = 'custodian' | 'resident' | 'volunteer' | 'collaborator'` (sin `'miembro'` como valor de vínculo) y `headline?: string` (≤ 45 chars, con helper `normalizeHeadline`) en `DatosOnboarding`, `FichaDatosPersona` y `CommunityMember` (`membershipType?: MembershipType`).
  2. `src/lib/services/members.ts`: implementar `normalizeMembershipType(raw)` con migración explícita (`propietario|owner|fundador|custodio → 'custodian'`, `miembro|residente|member → 'resident'`, `voluntario|volunteer → 'volunteer'`, `colaborador|visitante|collaborator → 'collaborator'`).
  3. `src/lib/services/users.ts`: unificar el fallback de `role` a `'user'` en `getAppUser` y `listenAppUser`.
  4. `src/lib/services/fichas.ts`, `members.ts`, `solicitudes.ts`, `invitaciones.ts`: dejar de sobrescribir `rolComunitario` con `base.rol_comunidad`; escribir `membershipType: normalizeMembershipType(...)` y `headline` acotado a ≤ 45 chars; nunca derivar `rol` (`'admin' | 'miembro' | 'visitante'`) desde ficha.
  5. `firestore.rules` + tests de reglas: validar enum `membershipType in ['custodian', 'resident', 'volunteer', 'collaborator']` y `headline.size() <= 45` cuando estén presentes.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Caja de archivos
- `src/lib/services/_types.ts`
- `src/lib/services/users.ts`
- `src/lib/services/fichas.ts`
- `src/lib/services/members.ts`
- `src/lib/services/solicitudes.ts`
- `src/lib/services/invitaciones.ts`
- `firestore.rules`
- Tests de `firestore.rules`

## Criterios de Aceptación
- [ ] `MembershipType` es `'custodian' | 'resident' | 'volunteer' | 'collaborator'` con migración `propietario → custodian`.
- [ ] Editar ficha no sobrescribe `membershipType` ni `rol` con `rol_comunidad`.
- [ ] `firestore.rules` valida el enum `membershipType` y `headline.size() <= 45` con tests pasando.
- [ ] `npm run lint` y `npm run build` pasan sin errores.
