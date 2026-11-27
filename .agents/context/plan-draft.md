# Plan de Implementación — T-169

## Metadatos
- **Tarea**: T-169 — Internacionalización de Identidad, Perfil y Fichas (`FichaView`, `PerfilView`, `RegistroComunidadView`)
- **Sprint**: Sprint 34
- **Playbook**: `plan-big-execute-small`
- **Rama propuesta**: `feat/SPRINT34-T-169-i18n-identity-fichas-profile`

## Objetivo Estratégico
Extraer y traducir al inglés y español la totalidad de los textos fijos en los módulos de identidad comunitaria: `FichaView.tsx`, `FichaPreview.tsx`, `PerfilView.tsx`, `TelegramLinkModal.tsx`, `RegistroComunidadView.tsx` y `CruceView.tsx`. Respetar de forma innegociable la frontera ADR-027: nombres de usuario, notas de biografía personal y ofrendas reales del miembro conservan su idioma de creación. Reducir el baseline de 978 a ~700 violaciones.

## Caja de Archivos
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

## Pasos Secuenciales
1. **Enriquecer `passport.json` (ES y EN)**:
   - Añadir secciones para edición de ficha (`editFicha`: pestañas, campos de rol/vínculo, headline, bio, ofrendas, necesidades, saberes, botones guardar/cancelar).
   - Añadir claves para `FichaPreview`: estado de revisión, vista previa, consejos y avisos.
   - Añadir claves para `PerfilView`: cabecera de perfil, vinculación, tabs y acciones.
   - Añadir claves para `TelegramLinkModal`: pasos de vinculación con el bot de Telegram, códigos y estados.
2. **Enriquecer `communities.json` (ES y EN)**:
   - Añadir claves para el wizard de `RegistroComunidadView`: pasos 1 a 4 (datos básicos, ubicación insular, propósito, confirmación).
   - Añadir claves para `CruceView`: comparador de sinergias, afinidades galácticas y análisis de compatibilidad.
3. **Refactorizar Vistas de Identidad**:
   - Sustituir copy hardcodeado por `t(...)` en `FichaView.tsx`, `FichaPreview.tsx` y `PerfilView.tsx`.
   - Sustituir copy en `TelegramLinkModal.tsx`.
   - Sustituir copy en `RegistroComunidadView.tsx` y `CruceView.tsx`.
4. **Actualizar Baseline**:
   - Ejecutar `npx tsx scripts/check-i18n-visible-literals.ts --generate-baseline`.
   - Comprobar que los archivos de identidad quedan en 0 warnings.
5. **Verificación Determinista**:
   - `npm run lint` (0 errores).
   - `npm run test:i18n` (0 discrepancias de claves y 0 regresiones).

## Conformidad con Diseño Macro
- 100% conforme con las decisiones e interfaces selladas en planning (`.agents/tasks/task-169.md`).
- Respeto riguroso de la frontera ADR-027 (datos de usuario intactos).
