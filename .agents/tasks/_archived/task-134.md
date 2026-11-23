# Task-134: Añadir selectores de visibilidad de privacidad para RRSS y otros datos

## Objetivo
Extender `ConfigPrivacidad` para incluir controles de visibilidad para los campos de redes y contacto (`instagram`, `linkedin`, `website`, `phone`, `email`), implementar la verificación de audiencia en `PasaporteVisual` y ofrecer controles intuitivos en `FichaView`.

## Contexto técnico
- `ConfigPrivacidad` en `src/lib/services/_types.ts` contenía solo campos astrológicos/kin/manual.
- En `PasaporteVisual.tsx`, los enlaces de contacto se mostraban sin evaluar la privacidad configurada por el usuario.
- En `FichaView.tsx`, el panel de privacidad permitía togglear solo las dimensiones galácticas/astrales.
- Diseño sellado en §2 de `docs/sprints/sprint-27-research.md`.

## Diseño macro aprobado en planning
- **Sprint**: Sprint 27 — 2026-11-23 a 2026-11-29
- **Decisiones e interfaces selladas**:
  - Extender `ConfigPrivacidad` con `AudienciaPrivacidad = 'comunidad' | 'administradores' | 'yo'`, interfaz `PrivacidadContacto`, y soporte retrocompatible tanto booleano como por audiencia.
  - Defaults: `instagram`, `linkedin`, `website` visibles para `comunidad`; `phone`, `email` restringidos a `administradores`.
  - En `PasaporteVisual.tsx`: calcular visibilidad de cada campo de contacto respetando la privacidad, permitiendo al dueño (`connectionStatus === 'self'`) ver siempre todos sus campos con indicador de privacidad.
  - En `FichaView.tsx`: añadir controles en el panel de privacidad para los 5 campos de contacto, sincronizando con `saveFicha`.
- **Veredicto**: `[APROBADO_EN_PLANNING]`

## Caja de archivos
Archivos autorizados para modificación / creación:
- `src/lib/services/_types.ts`
- `src/components/perfil/PasaporteVisual.tsx`
- `src/pages/FichaView.tsx`
- `.agents/tasks/task-134.md`
- `docs/sprints/sprint-27.md`

## Skills
- `implementar-feature-dry`: reutilizar el modelo de `ConfigPrivacidad` y sincronización con pasaporte.
- `structure-guardian`: modificaciones en tipos de servicios y componentes UI correspondientes.

## Criterios de done
- [x] `src/lib/services/_types.ts` define `AudienciaPrivacidad`, `PrivacidadContacto` y extiende `ConfigPrivacidad`.
- [x] `PasaporteVisual.tsx` oculta campos de contacto cuando la privacidad configurada los restringe para el observador.
- [x] `FichaView.tsx` incluye selectores/toggles para los 5 campos de contacto en el panel de privacidad.
- [x] `npm run lint` y `npm run build` en verde.
- [x] Sesión cerrada correctamente.

## Estado de aprobación
- [x] Plan presentado al usuario (Fase 3.5)
- [x] APROBADO recibido (Deliberación CONSENSO autónoma)
- [x] Rama creada: feat/T-134-privacidad-selectores-rrss
- [x] Lock activo: T-134
- [x] Sesión cerrada correctamente
