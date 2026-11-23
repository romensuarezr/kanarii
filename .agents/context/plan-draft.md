# Plan T-136: Unificar lectura de perfil y ficha (FichaReadOnly)

## Objetivo
Extraer la vista de lectura de ficha a un componente reutilizable `FichaReadOnly.tsx`, consumirlo en `PerfilView.tsx` y en el modo lectura de `FichaView.tsx`, y corregir el merge de `getDatosPersona`.

## Rama propuesta
`feat/T-136-unificar-lectura-perfil-ficha`

## Archivos a modificar / crear
- `src/components/perfil/FichaReadOnly.tsx` (nuevo): componente de lectura que agrupa identidad, redes/contacto, tríada, rol/convivencia, tensión, kin/arquetipo y manual de la ficha.
- `src/pages/PerfilView.tsx`: renderizar `FichaReadOnly` manteniendo el PasaporteVisual y el botón «Editar ficha».
- `src/pages/FichaView.tsx`: reemplazar el bloque de lectura inline por `FichaReadOnly` cuando `!isEditing` y aplicar merge robusto de `datosPersona` con `datosOnboarding`.
- `.agents/tasks/task-136.md`
- `docs/sprints/sprint-27.md`

## Pasos secuenciales
1. Crear `src/components/perfil/FichaReadOnly.tsx` extrayendo las secciones de lectura completas de `FichaView.tsx` (redes, tríada, convivencia, tensión, manual, etc.).
2. En `FichaView.tsx`, integrar `FichaReadOnly` para el modo de solo lectura y refactorizar `getDatosPersona` para que haga fallback campo a campo a `datosOnboarding`.
3. En `PerfilView.tsx`, incorporar `FichaReadOnly` bajo la sección principal para ofrecer la visualización unificada completa.
4. Validar compilación con `npm run lint` y `npm run build`.

## Riesgos detectados
- Divergencia de props o tipos entre `PerfilView` y `FichaView`: mitigado usando los tipos `Ficha` y `AppUser` existentes.
- Estilos visuales: asegurar que `FichaReadOnly` mantenga los tokens de diseño unificados (`@theme`).

## Justificación de skills
- `implementar-feature-dry`: unificación directa de dos vistas divergentes en un único componente compartido.
- `structure-guardian`: ubicación estándar en `src/components/perfil/`.

## Conformidad con Diseño Macro
- Alineado 100% con la sección 4 de `docs/sprints/sprint-27-research.md`.
