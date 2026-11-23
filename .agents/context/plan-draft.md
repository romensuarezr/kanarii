# Plan T-134: Selectores de visibilidad de privacidad para RRSS y contacto

## Objetivo
Extender `ConfigPrivacidad` en `_types.ts` con opciones de audiencia/visibilidad para `instagram`, `linkedin`, `website`, `phone` y `email`, evaluar la visibilidad en `PasaporteVisual.tsx` según el tipo de visitante, y añadir los controles de configuración en el panel de privacidad de `FichaView.tsx`.

## Rama propuesta
`feat/T-134-privacidad-selectores-rrss`

## Archivos a modificar / crear
- `src/lib/services/_types.ts`: añadir `AudienciaPrivacidad`, `PrivacidadContacto`, extender `ConfigPrivacidad` y definir defaults.
- `src/components/perfil/PasaporteVisual.tsx`: función de visibilidad para cada red/contacto respetando la audiencia (`comunidad`, `administradores`, `yo`) y `connectionStatus`.
- `src/pages/FichaView.tsx`: incorporar la sección de "Contacto y Redes Sociales" en el panel de privacidad.
- `.agents/tasks/task-134.md`
- `docs/sprints/sprint-27.md`

## Pasos secuenciales
1. Extender `ConfigPrivacidad` en `src/lib/services/_types.ts` manteniendo compatibilidad hacia atrás.
2. Actualizar `PasaporteVisual.tsx` para filtrar los enlaces RRSS según la privacidad configurada y el rol/estado del visitante.
3. Ampliar el panel de privacidad de `FichaView.tsx` con los controles para los 5 campos de contacto y enlazar con `handleTogglePrivacidad`.
4. Verificar con `npm run lint` y `npm run build`.

## Riesgos detectados
- Compatibilidad de documentos de ficha existentes sin `contacto` en `privacidad`: mitigado mediante defaults automáticos cuando el campo no está definido.

## Justificación de skills
- `implementar-feature-dry`: integración fluida en el panel existente y reutilización de la sincronización de pasaporte.

## Conformidad con Diseño Macro
- 100% alineado con §2 de `docs/sprints/sprint-27-research.md`.
