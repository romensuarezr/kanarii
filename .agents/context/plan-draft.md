# Plan de Implementación — T-167

## Metadatos
- **Tarea**: T-167 — Motor determinista de blindaje i18n con baseline y trinquete (`test:i18n`)
- **Sprint**: Sprint 34
- **Playbook**: `direct` (Caja de 3 archivos <= 3)
- **Rama propuesta**: `feat/SPRINT34-T-167-i18n-ratchet-baseline`

## Objetivo Estratégico
Transformar la auditoría pasiva de literales i18n en una compuerta determinista estricta (Quality Gate) mediante un mecanismo de trinquete (*ratchet*) y archivo *baseline* (`i18n-baseline.json`). Si cualquier desarrollador o agente introduce nuevos literales visibles en español dentro de JSX o props visibles, `npm run test:i18n` aborta con código de salida 1 (fail-closed). A medida que las tareas T-168 a T-171 traduzcan vistas, el baseline se reduce hasta alcanzar exactamente 0.

## Caja de Archivos
- `scripts/check-i18n-visible-literals.ts` (modificación)
- `i18n-baseline.json` (nuevo)
- `package.json` (modificación)

## Pasos Secuenciales
1. **Extender `scripts/check-i18n-visible-literals.ts`**:
   - Soporte por defecto de directorios objetivo: si no se pasan rutas, escanea automáticamente `src/pages` y `src/components`.
   - Soporte de flags `--generate-baseline`, `--check-baseline`, `--ratchet`.
   - Lógica de comparación de baseline:
     - En `--generate-baseline`: escribe `i18n-baseline.json` con metadatos, total de violaciones y desglose detallado por archivo.
     - En `--check-baseline` o `--ratchet`: lee `i18n-baseline.json`. Compara los warnings detectados:
       - Si un archivo tiene más violaciones que en el baseline $\rightarrow$ FAIL (código 1).
       - Si aparece un archivo nuevo no registrado en el baseline con violaciones $\rightarrow$ FAIL (código 1).
       - Si el total de violaciones supera el baseline $\rightarrow$ FAIL (código 1).
       - Si las violaciones son menores o iguales y no hay archivos nuevos con infracciones $\rightarrow$ PASS (código 0).
       - Si se reducen violaciones en modo `--ratchet`, informa del descenso y sugiere regenerar baseline.
2. **Generar el baseline inicial**:
   - Ejecutar `npx tsx scripts/check-i18n-visible-literals.ts --generate-baseline`.
   - Crear `i18n-baseline.json` congelando el snapshot inicial (~1.010 literales en 82 archivos).
3. **Actualizar `package.json`**:
   - Configurar `"check:i18n-literals": "tsx scripts/check-i18n-visible-literals.ts --check-baseline"`.
   - Añadir `"test:i18n": "tsx scripts/check-i18n-keys.ts && tsx scripts/check-i18n-visible-literals.ts --check-baseline"`.
4. **Verificación y Pruebas Deterministas**:
   - Probar que `npm run test:i18n` pasa con código 0 sobre el baseline generado.
   - Test de regresión negativa: simular un literal nuevo y confirmar que el test falla con código 1.
   - Ejecutar `npm run lint` y verificar que la suite no tiene errores de TypeScript.

## Conformidad con Diseño Macro
- 100% conforme con las decisiones e interfaces selladas en planning (`.agents/tasks/task-167.md`).
- Sin dependencias externas pesadas adicionales (usa el AST de `typescript` ya instalado).
