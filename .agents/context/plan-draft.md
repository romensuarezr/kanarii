# Plan T-137: Normalización de teléfono E.164 y acción directa de WhatsApp (ContactActions)

## Objetivo
Crear las utilidades de formateo y normalización telefónica con `libphonenumber-js`, generar enlaces oficiales a WhatsApp (`wa.me`) y llamadas nativas (`tel:`), proveer el componente reutilizable `ContactActions`, e integrarlo en la lectura de ficha y pasaporte.

## Rama propuesta
`feat/T-137-telefono-e164-whatsapp`

## Archivos a modificar / crear
- `src/lib/phone.ts` (nuevo): normalización E.164, validación, formateo de visualización y generación de URL de WhatsApp.
- `src/components/perfil/ContactActions.tsx` (nuevo): componente reutilizable con botones de Llamar y WhatsApp con estilos Tailwind acordes al diseño.
- `src/components/perfil/FichaReadOnly.tsx`: reemplazar el renderizado crudo de teléfono por `ContactActions`.
- `src/components/perfil/PasaporteVisual.tsx`: integrar el botón de WhatsApp junto al de llamada.
- `src/pages/FichaView.tsx`: normalizar el teléfono a E.164 antes de persistir en `saveFicha`.
- `tests/unit/phone.test.ts` (nuevo): cobertura de tests unitarios para formateo y normalización.
- `package.json` y `package-lock.json`: dependencia `libphonenumber-js`.
- `.agents/tasks/task-137.md`
- `docs/sprints/sprint-27.md`

## Pasos secuenciales
1. Implementar `src/lib/phone.ts` con funciones puras `normalizePhone`, `formatPhoneDisplay`, `toWhatsAppUrl` y `isValidPhone`.
2. Crear suite unitaria `tests/unit/phone.test.ts` para verificar casos estándar (`600123456`, `+34...`, `0034...`, números no válidos, etc.).
3. Crear `src/components/perfil/ContactActions.tsx` renderizando los botones de Llamar y WhatsApp con iconos y tooltip accesibles.
4. Conectar `ContactActions` en `FichaReadOnly.tsx` y `PasaporteVisual.tsx`.
5. En `FichaView.tsx`, asegurar que al guardar se normalice a E.164.
6. Validar con tests, `npm run lint` y `npm run build`.

## Riesgos detectados
- Números antiguos en formatos arbitrarios: `normalizePhone` debe actuar como fallback graceful (devolver el valor original si no es parseable sin lanzar excepciones).

## Justificación de skills
- `implementar-feature-dry`: utilidades centralizadas en `src/lib/phone.ts` y componente único `ContactActions.tsx`.
- `testing-flows`: pruebas unitarias en `tests/unit/phone.test.ts`.

## Conformidad con Diseño Macro
- 100% alineado con §3 de `docs/sprints/sprint-27-research.md`.
