# Task-136: Unificar lectura de perfil y ficha (FichaReadOnly)

## Objetivo
Extraer la vista de lectura de ficha a un componente compartido `FichaReadOnly`, usarlo tanto en `/perfil` como en el modo lectura de `/ficha`, y resolver el merge de fallback entre `datosPersona` y `datosOnboarding`.

## Contexto técnico
- `PerfilView.tsx` solo mostraba identidad y PasaporteVisual, omitiendo tríada, rol, tensiones, arquetipo y manual de convivencia.
- `FichaView.tsx` contenía su propia vista de lectura acoplada al formulario.
- En `FichaView.tsx:getDatosPersona`, si existe `datosPersona` se ignora `datosOnboarding`, lo que provoca que campos previos del onboarding desaparezcan si no se rellenaron en `datosPersona`.
- Referencia arquitectónica sellada en §4 de `docs/sprints/sprint-27-research.md`.

## Diseño macro aprobado en planning
- **Sprint**: Sprint 27 — 2026-11-23 a 2026-11-29
- **Decisiones e interfaces selladas**:
  - Crear `src/components/perfil/FichaReadOnly.tsx` como componente reutilizable que recibe `ficha: Ficha` y `appUser: AppUser`.
  - Integrar `FichaReadOnly` en `PerfilView.tsx` bajo el bloque principal y PasaporteVisual, unificando la experiencia completa de perfil.
  - Usar `FichaReadOnly` en `FichaView.tsx` cuando `!isEditing`.
  - Corregir el merge de datos en `getDatosPersona` combinando `datosPersona` con fallback campo a campo a `datosOnboarding`.
- **Veredicto**: `[APROBADO_EN_PLANNING]`

## Caja de archivos
Archivos autorizados para modificación / creación:
- `src/components/perfil/FichaReadOnly.tsx` (nuevo)
- `src/pages/PerfilView.tsx`
- `src/pages/FichaView.tsx`
- `.agents/tasks/task-136.md`
- `docs/sprints/sprint-27.md`

## Skills
- `implementar-feature-dry`: extraer componente compartido sin duplicar JSX ni lógica de renderizado.
- `structure-guardian`: colocar el componente en `src/components/perfil/`.

## Criterios de done
- [x] `FichaReadOnly.tsx` creado y renderiza identidad, tríada, rol, tensión, kin/arquetipo y manual.
- [x] `/perfil` renderiza `FichaReadOnly` y botón «Editar ficha» que navega a `/ficha?edit=1`.
- [x] `/ficha` en modo no-edición utiliza `FichaReadOnly` con botón «Editar».
- [x] `getDatosPersona` combina `datosPersona` y `datosOnboarding` sin perder campos.
- [x] `npm run lint` (`tsc --noEmit`) y `npm run build` en verde.
- [x] Sesión cerrada correctamente.

## Estado de aprobación
- [x] Plan presentado al usuario (Fase 3.5)
- [x] APROBADO recibido (Deliberación CONSENSO autónoma)
- [x] Rama creada: feat/T-136-unificar-lectura-perfil-ficha
- [x] Lock activo: T-136
- [x] Sesión cerrada correctamente
