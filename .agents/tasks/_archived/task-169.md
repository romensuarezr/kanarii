# Task T-169 — Internacionalización de Identidad, Perfil y Fichas (`FichaView`, `PerfilView`, `RegistroComunidadView`)

## Metadatos
- **ID**: T-169
- **Título**: Internacionalización de Identidad, Perfil y Fichas (`FichaView`, `PerfilView`, `RegistroComunidadView`)
- **Sprint**: Sprint 34
- **Tipo**: Feature / i18n / Core UX
- **Estado**: 🟢 Completada
- **Fecha inicio**: 2026-11-27
- **Fecha fin**: 2026-11-27

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 34 / 2026-11-27
- **Diseño y arquitectura aprobados por**: Humano
- **Veredicto de diseño macro**: [APROBADO_EN_PLANNING]
- **Decisiones e interfaces selladas**:
  1. `src/pages/FichaView.tsx`, `src/pages/FichaPreview.tsx`, `src/pages/PerfilView.tsx`:
     - Traducir todos los títulos, pestañas de ficha, etiquetas de campos (headline, bio, roles, dones, necesidades), botones de acción y modales (`TelegramLinkModal`).
     - Respetar frontera ADR-027: nombres de usuario, biografía y ofrendas reales del usuario no se traducen.
  2. `src/pages/RegistroComunidadView.tsx` y `src/pages/CruceView.tsx`:
     - Traducir wizard de alta de comunidad (pasos 1 a 4, campos, ayudas) y vista de cruce galáctico.
  3. Actualizar simultáneamente `src/locales/es/passport.json`, `src/locales/en/passport.json`, `src/locales/es/communities.json` y `src/locales/en/communities.json`.
  4. Actualizar `i18n-baseline.json` reduciendo las violaciones resueltas.

## Caja de archivos
- `src/pages/FichaView.tsx`
- `src/pages/FichaPreview.tsx`
- `src/pages/PerfilView.tsx`
- `src/pages/RegistroComunidadView.tsx`
- `src/pages/CruceView.tsx`
- `src/components/perfil/TelegramLinkModal.tsx`
- `src/locales/es/passport.json`
- `src/locales/en/passport.json`
- `src/locales/es/communities.json`
- `src/locales/en/communities.json`
- `i18n-baseline.json`

## Criterios de Aceptación
- [x] `/ficha`, `/perfil`, `/cruce` y `/nueva-comunidad` se muestran 100% en inglés al seleccionar `en`.
- [x] El contenido dinámico de miembros conserva su idioma de origen sin romperse.
- [x] `npm run test:i18n` pasa con el baseline reducido.
