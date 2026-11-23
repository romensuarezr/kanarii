# T-133: Corregir persistencia de RRSS en saveFicha y mapping mappedUser

## Descripción
Extender la funcionalidad de guardado y mapeo para que los campos de redes sociales (instagram, linkedin, website, phone, email) persistan y aparezcan en el Pasaporte Visual.

## Root Cause Identified
1. En `src/lib/services/fichas.ts`: `saveFicha()` construye `datosPersona` con lista blanca que **excluye** `instagram`, `linkedin`, `website`, `phone`, `email`
2. En `src/pages/PasaporteUniversalView.tsx` y `src/pages/PasaporteComunitarioView.tsx`: `mappedUser` omite estos campos, por lo que `PasaporteVisual` nunca los recibe

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 27 — 2026-11-23 a 2026-11-29
- **Diseño y arquitectura aprobados por**: [Humano / Relé]
- **Decisiones e interfaces selladas**:
  - Extender lista blanca en `saveFicha()` de `src/lib/services/fichas.ts` para incluir: `instagram`, `linkedin`, `website`, `phone`, `email` en la construcción de `datosPersona: FichaDatosPersona`
  - Añadir campos `instagram?`, `linkedin?`, `website?`, `phone?`, `email?` al `mappedUser` en `src/pages/PasaporteUniversalView.tsx` (línea ~143-154)
  - Añadir campos `instagram?`, `linkedin?`, `website?`, `phone?`, `email?` al `mappedUser` en `src/pages/PasaporteComunitarioView.tsx` (línea ~143-154)
  - `PasaporteVisual.tsx` ya tiene la interfaz `UserPassport` con estos 5 campos — no requiere cambios de tipo
  - `FichaView.tsx` ya tiene `handleTogglePrivacidad` para estos campos — mantener compatibilidad
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Dependencias
- `src/lib/services/fichas.ts`: actualizar `saveFicha` para incluir campos RRSS en datosPersona
- `src/pages/PasaporteUniversalView.tsx`: actualizar `mappedUser` con campos RRSS
- `src/pages/PasaporteComunitarioView.tsx`: actualizar `mappedUser` con campos RRSS
- Verificar que `PasaporteVisual.tsx` recibe y muestra los campos (ya tiene la estructura)

## Caja de archivos
- `src/lib/services/fichas.ts` (lista blanca de `datosPersona`)
- `src/lib/services/_types.ts` (tipos de `DatosOnboarding`)
- `src/pages/PasaporteUniversalView.tsx` (`mappedUser`)
- `src/pages/PasaporteComunitarioView.tsx` (`mappedUser`)
- `src/pages/PerfilView.tsx` (fallback de datos y tarjeta de contacto)
- `src/components/perfil/PasaporteVisual.tsx` (mostrar RRSS como texto, no solo iconos)
- `src/pages/FichaView.tsx` (sección de lectura de RRSS)
- `.agents/tasks/task-133.md`
- `docs/sprints/sprint-27.md`

## Skills
- `implementar-feature-dry`: reutilizar el mapeo existente sin duplicar lógica.
- `structure-guardian`: mantener los cambios en las capas correctas.

## Criterios de done
- [x] `saveFicha` persiste `instagram`, `linkedin`, `website`, `phone` y `email` en `datosPersona`.
- [x] `mappedUser` de `PasaporteUniversalView` incluye los 5 campos.
- [x] `mappedUser` de `PasaporteComunitarioView` incluye los 5 campos.
- [x] `PasaporteVisual` muestra los campos cuando existen.
- [x] `npm run lint` y `npm run build` en verde.
- [x] Prueba manual: guardar RRSS, recargar y verlos en `/perfil` y en el pasaporte.
- [x] Sesión cerrada correctamente.
