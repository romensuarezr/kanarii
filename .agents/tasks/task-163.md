# Task T-163 — Sincronizar `adminUids` ↔ `community_members.rol` y gestión de roles/vínculos en `ComunidadSubTab`

## Metadatos
- **ID**: T-163
- **Título**: Sincronizar `adminUids` ↔ `community_members.rol` y gestión de roles/vínculos en `ComunidadSubTab`
- **Sprint**: Sprint 33
- **Tipo**: Seguridad / RBAC / Admin UI
- **Estado**: Completada
- **Fecha inicio**: 2026-11-26

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 33 / 2026-11-26
- **Diseño y arquitectura aprobados por**: Humano / Operador (`A, aprobado con cambios`)
- **Decisiones e interfaces selladas**:
  1. `src/lib/services/members.ts`: añadir `updateCommunityMemberAccess(communityId, targetUserId, updates: { rol?: CanonicalMemberRole; membershipType?: MembershipType })` usando `writeBatch`:
     - Actualiza `community_members/{communityId}_{targetUserId}` (`rol`, `membershipType`, `updatedAt`).
     - Si cambia `rol`, sincroniza atómicamente `comunidades/{communityId}.adminUids` con `arrayUnion(targetUserId)` si `rol === 'admin'` o `arrayRemove(targetUserId)` si deja de serlo.
  2. `src/components/AdminPanel/tabs/ComunidadSubTab.tsx` y `src/pages/AdminPanel.tsx`:
     - Actualizar el filtro de vínculo para leer `normalizeMembershipType(m.membershipType || m.rolComunitario || m.rol)` con opciones `'todos' | 'custodian' | 'resident' | 'volunteer' | 'collaborator'`.
     - Añadir selectores inline de **Permiso** (`admin` / `miembro` / `visitante`) y **Vínculo** (`custodian` / `resident` / `volunteer` / `collaborator`) en cada fila, impidiendo que un admin se auto-degrade si es el último admin del nodo.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Caja de archivos
- `src/lib/services/members.ts`
- `src/components/AdminPanel/tabs/ComunidadSubTab.tsx`
- `src/pages/AdminPanel.tsx`

## Criterios de Aceptación
- [x] Un admin de nodo puede promover/degradar permisos (`admin`/`miembro`/`visitante`) y vínculo (`propietario`/`miembro`/`voluntario`) desde `AdminPanel`.
- [x] El cambio actualiza `community_members.rol` y `comunidades.adminUids` en un mismo batch atómico.
- [x] El filtro de `ComunidadSubTab` funciona incluso con fichas editadas.
- [x] `npm run lint` y `npm run build` pasan sin errores.
