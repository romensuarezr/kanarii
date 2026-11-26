# Task T-164 — Limpieza UX de clasificación en `PerfilView`, `FichaView`, `FichaComunidadView` y `MemberCard`

## Metadatos
- **ID**: T-164
- **Título**: Limpieza UX de clasificación en `PerfilView`, `FichaView`, `FichaComunidadView` y `MemberCard`
- **Sprint**: Sprint 33
- **Tipo**: UX / UI / Claridad de Roles
- **Estado**: Completada
- **Fecha inicio**: 2026-11-26

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 33 / 2026-11-26
- **Diseño y arquitectura aprobados por**: Humano / Operador (`A, aprobado con cambios`)
- **Decisiones e interfaces selladas**:
  1. `src/pages/PerfilView.tsx`: eliminar el badge técnico `USER` (`appUser.role`) junto al nombre y sustituirlo por `headline` (si existe); dejar de pasar `appUser.role` en `mappedUser.roles`.
  2. `src/pages/FichaView.tsx` y `src/pages/FichaPreview.tsx`: añadir campo corto opcional `headline` ("Tu rol u oficio en una frase corta", `maxLength={45}`) encima de la descripción de participación (`rol_comunidad`), manteniendo compatibilidad con fichas existentes.
  3. `src/pages/FichaComunidadView.tsx` y `src/components/members/MemberCard.tsx`: separar visualmente el chip de **Vínculo** (`Custodio` / `Residente` / `Voluntario` / `Colaborador` desde `membershipType`) del subtítulo de oficio (`headline`), evitando párrafos largos dentro de badges `uppercase`.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Caja de archivos
- `src/pages/PerfilView.tsx`
- `src/pages/FichaView.tsx`
- `src/pages/FichaPreview.tsx`
- `src/pages/FichaComunidadView.tsx`
- `src/components/members/MemberCard.tsx`

## Criterios de Aceptación
- [x] `/perfil` no muestra el badge técnico `USER`.
- [x] `MemberCard` muestra vínculo corto + oficio/headline legible sin cortar párrafos.
- [x] `FichaView` permite definir `headline` corto sin romper fichas previas.
- [x] `npm run lint` y `npm run build` pasan sin errores.
