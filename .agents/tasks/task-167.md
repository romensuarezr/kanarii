# Task T-167 — Motor determinista de blindaje i18n con baseline y trinquete (`test:i18n`)

## Metadatos
- **ID**: T-167
- **Título**: Motor determinista de blindaje i18n con baseline y trinquete (`test:i18n`)
- **Sprint**: Sprint 34
- **Tipo**: Tooling / Quality Gate / i18n
- **Estado**: ⬜ Pendiente
- **Fecha inicio**: 2026-11-27

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 34 / 2026-11-27
- **Diseño y arquitectura aprobados por**: Humano
- **Veredicto de diseño macro**: [APROBADO_EN_PLANNING]
- **Decisiones e interfaces selladas**:
  1. `scripts/check-i18n-visible-literals.ts`:
     - Soportar flags `--generate-baseline`, `--check-baseline`, `--ratchet`.
     - Si no se pasan argumentos, escanea `src/pages` y `src/components` por defecto.
     - Guarda y lee `i18n-baseline.json` con conteo e inventario exacto por archivo.
     - En modo `--check-baseline` o `--ratchet`, si se detectan violaciones no listadas en el baseline o si el total supera el baseline, falla con `process.exit(1)`.
  2. `package.json`:
     - Modificar script `check:i18n-literals`: `tsx scripts/check-i18n-visible-literals.ts --check-baseline`.
     - Añadir script `test:i18n`: `tsx scripts/check-i18n-keys.ts && tsx scripts/check-i18n-visible-literals.ts --check-baseline`.
     - Generar el `i18n-baseline.json` inicial con el snapshot congelado actual.

## Caja de archivos
- `scripts/check-i18n-visible-literals.ts`
- `i18n-baseline.json`
- `package.json`

## Criterios de Aceptación
- [ ] `npm run test:i18n` ejecuta paridad de claves y verificación de literales con baseline.
- [ ] Cualquier literal hardcodeado nuevo fuera del baseline hace fallar `npm run test:i18n` con código 1.
- [ ] Al reducir literales de un archivo, `--generate-baseline` actualiza el baseline a la baja.
