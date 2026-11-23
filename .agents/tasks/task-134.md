# T-134: Añadir selectores de visibilidad de privacidad para RRSS y otros datos

## Descripción
Extender `ConfigPrivacidad` para incluir campos de RRSS y crear controles UI en FichaView y PasaporteVisual para que los usuarios puedan elegir qué información es pública o privada.

## Contexto
- `ConfigPrivacidad` ya existe en `src/lib/services/_types.ts` con campos: `disenoHumano`, `arquetipo`, `kinMaya`, `manualCompleto`, `datosAstrologicos`
- `FichaView.tsx` ya tiene `handleTogglePrivacidad(key: string)` para toggle de campos individuales
- `PasaporteVisual.tsx` ya recibe `privacidad?: ConfigPrivacidad` y muestra enlaces RRSS cuando están presentes

## Decisiones e interfaces selladas
- Extender `ConfigPrivacidad` en `src/lib/services/_types.ts` con campos: `instagram`, `linkedin`, `website`, `phone`, `email` (booleanos de visibilidad pública/privada)
- Mantener compatibilidad hacia atrás: los nuevos campos defaults a `false` (privado por defecto)
- En `FichaView.tsx`: reutilizar `handleTogglePrivacidad` para los 5 nuevos campos RRSS (mismo patrón que los existentes)
- En `PasaporteVisual.tsx`: mostrar/ocultar enlaces RRSS según el valor de `privacidad.instagram`, etc. en el componente visual
- Los 5 campos RRSS son **independientes** de los campos de diseño humano/kin/astrología — cada uno tiene su propio selector

## Dependencias
- `src/lib/services/_types.ts`: extender `ConfigPrivacidad`
- `src/components/perfil/PasaporteVisual.tsx`: actualizar renderizado condicional según `privacidad` fields
- `src/pages/FichaView.tsx`: extender `handleTogglePrivacidad` para los 5 nuevos campos (misma función, nuevos keys)
