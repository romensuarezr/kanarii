# Executive Design Digest — T-167

## 🎯 Objetivo
Objetivo no especificado.

## 🏛️ Decisiones de Arquitectura y Buenas Prácticas
- **Veredicto de Deliberación**: `CONSENSO` (Rondas: 1)
- **Síntesis de Diseño**: El plan para T-167 implementa una compuerta de calidad estricta (Quality Gate) mediante el patrón ratchet/baseline, asegurando un comportamiento fail-closed ante cualquier nuevo literal en JSX/props visibles sin bloquear el desarrollo existente. La delimitación de la caja de archivos (3 archivos) respeta el playbook direct y la regla de no mutación fuera de scope.

La estrategia de validación en dos niveles (detección de aumento de infracciones por archivo o global y verificación negativa determinista) garantiza que el baseline decrezca progresivamente en tareas posteriores (T-168 a T-171) sin añadir dependencias runtime superfluas.
- **Prospección Scout**: `CONFORME (sprint-34-research.md)`
  - Alternativas exploradas**:
  - `i18next-cli lint`: Herramienta upstream para reporte de strings no envueltos en `t()`.
  - `ts-morph` / `typescript compiler API`: Motor ya integrado en `scripts/check-i18n-visible-literals.ts`.
  - Decisión**: Desarrollo a medida optimizado sobre el script TypeScript existente (`scripts/check-i18n-visible-literals.ts`). Se extiende con `--generate-baseline`, `--check-baseline`, y `--ratchet` para evaluar el delta de violaciones. Añadir script npm `npm run test:i18n` que combine `check-i18n-keys.ts` (paridad de diccionarios) y `check-i18n-visible-literals.ts` (AST scan con fallo determinista exit 1).
- **Mensaje de Cierre**: `docs(plan): borrador de plan T-167`

## 🛠️ Ajustes y Arbitraje de Deliberación
- Consenso inicial sin objeciones o cerrado en modo directo.

## 📁 Ficheros Modificados y Criterio de Alcance
- `.agents/context/deliberation-T-167.json`
- `.agents/context/plan-draft.md`
- `.agents/tasks/_archived/task-167.md`
- `docs/i18n-parity-report.md`
- `docs/sprints/sprint-34.md`
- `i18n-baseline.json`
- `package.json`
- `scripts/check-i18n-visible-literals.ts`

## 🧠 Skills Declaradas y Aplicadas
- Ninguna skill adicional registrada.
