# Executive Design Digest — T-137

## 🎯 Objetivo
Implementar utilidades de parsing y normalización de teléfonos a E.164 con `libphonenumber-js`, generar enlaces oficiales de WhatsApp (`wa.me`), crear el componente `ContactActions` para llamadas y WhatsApp, e integrarlo en la vista de lectura y el pasaporte visual.

## 🏛️ Decisiones de Arquitectura y Buenas Prácticas
- **Veredicto de Deliberación**: `CONSENSO` (Rondas: 1)
- **Síntesis de Diseño**: El plan técnico T-137 cumple con las directrices arquitectónicas del proyecto y la directiva DRY de 3 capas. Centraliza la lógica de formateo y normalización en una utilidad pura (`src/lib/phone.ts`) y aísla la presentación e interacción en un componente reutilizable (`ContactActions.tsx`), evitando duplicación en `FichaReadOnly` y `PasaporteVisual`.

La estrategia de manejo de riesgos con fallback silencioso ante entradas preexistentes anómalas protege la estabilidad de la persistencia en `FichaView.tsx`. La inclusión de tests unitarios específicos (`tests/unit/phone.test.ts`) junto a la validación de linter y compilación garantiza la solidez del cambio sin introducir dependencias prohibidas ni mutaciones fuera de caja.
- **Prospección Scout**: `OMITIDO (sin research registrado / tarea heredada)`
- **Mensaje de Cierre**: `Merge branch 'feat/T-136-unificar-lectura-perfil-ficha' into main`

## 🛠️ Ajustes y Arbitraje de Deliberación
- Consenso inicial sin objeciones o cerrado en modo directo.

## 📁 Ficheros Modificados y Criterio de Alcance
- `.agents/context/deliberation-T-136.json`
- `.agents/context/deliberation-T-137.json`
- `.agents/context/plan-draft.md`
- `.agents/tasks/_archived/task-136.md`
- `.agents/tasks/_archived/task-137.md`
- `docs/sprints/design-decisions/T-136-digest.md`
- `docs/sprints/design-decisions/T-136-raw.json`
- `docs/sprints/sprint-27.md`
- `package-lock.json`
- `package.json`
- `src/components/perfil/ContactActions.tsx`
- `src/components/perfil/FichaReadOnly.tsx`
- `src/components/perfil/PasaporteVisual.tsx`
- `src/lib/phone.ts`
- `src/pages/FichaView.tsx`
- `src/pages/PerfilView.tsx`
- `tests/unit/phone.test.ts`

## 🧠 Skills Declaradas y Aplicadas
- `implementar-feature-dry`
- `structure-guardian`
