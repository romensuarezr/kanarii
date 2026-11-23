# Task-137: Normalización de teléfono E.164 y acción directa de WhatsApp (ContactActions)

## Objetivo
Implementar utilidades de parsing y normalización de teléfonos a E.164 con `libphonenumber-js`, generar enlaces oficiales de WhatsApp (`wa.me`), crear el componente `ContactActions` para llamadas y WhatsApp, e integrarlo en la vista de lectura y el pasaporte visual.

## Contexto técnico
- El campo `phone` se guardaba como texto libre no estructurado (ej. `600123456`, `0034...`, etc.).
- Para enlaces telefónicos nativos (`tel:`) y WhatsApp (`https://wa.me/<dígitos>`), el estándar de industria requiere E.164 (+34600123456) y dígitos internacionales sin `+` ni caracteres especiales.
- Documentado y acordado en §3 de `docs/sprints/sprint-27-research.md`.

## Diseño macro aprobado en planning
- **Sprint**: Sprint 27 — 2026-11-23 a 2026-11-29
- **Decisiones e interfaces selladas**:
  - `src/lib/phone.ts`: funciones `normalizePhone(raw, defaultCountry?)`, `formatPhoneDisplay(raw, defaultCountry?)`, `toWhatsAppUrl(raw, defaultCountry?, message?)`, `isValidPhone(raw, defaultCountry?)`.
  - `src/components/perfil/ContactActions.tsx`: botones accesibles de llamada directa (`tel:`) y WhatsApp (`wa.me`).
  - Integrar `ContactActions` en `FichaReadOnly.tsx` y `PasaporteVisual.tsx`.
  - En `FichaView.tsx`, normalizar el teléfono en onBlur o antes de guardar.
- **Veredicto**: `[APROBADO_EN_PLANNING]`

## Caja de archivos
Archivos autorizados para modificación / creación:
- `package.json`
- `package-lock.json`
- `src/lib/phone.ts` (nuevo)
- `src/components/perfil/ContactActions.tsx` (nuevo)
- `src/components/perfil/FichaReadOnly.tsx`
- `src/components/perfil/PasaporteVisual.tsx`
- `src/pages/FichaView.tsx`
- `tests/unit/phone.test.ts` (nuevo)
- `.agents/tasks/task-137.md`
- `docs/sprints/sprint-27.md`

## Skills
- `implementar-feature-dry`: centralizar toda la lógica de teléfono y WhatsApp en `src/lib/phone.ts` y el componente de contacto en `ContactActions.tsx`.
- `structure-guardian`: colocar utils en `src/lib/` y componentes en `src/components/perfil/`.

## Criterios de done
- [x] `src/lib/phone.ts` implementa normalización E.164, formateo legible y generación de URL `wa.me`.
- [x] Tests unitarios en `tests/unit/phone.test.ts` validan números españoles, prefijos internacionales, limpieza y generación de WhatsApp.
- [x] `ContactActions.tsx` creado y renderiza botones de Llamar y WhatsApp cuando el teléfono es válido.
- [x] `FichaReadOnly.tsx` y `PasaporteVisual.tsx` integran `ContactActions`.
- [x] `FichaView.tsx` normaliza el teléfono al formato E.164 al guardar.
- [x] `npm run lint` y `npm run build` en verde.
- [x] Sesión cerrada correctamente.

## Estado de aprobación
- [x] Plan presentado al usuario (Fase 3.5)
- [x] APROBADO recibido (Deliberación CONSENSO autónoma)
- [x] Rama creada: feat/T-137-telefono-e164-whatsapp
- [x] Lock activo: T-137
- [x] Sesión cerrada correctamente
