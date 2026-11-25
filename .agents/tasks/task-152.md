# Task T-152 — Unificación de Marca y Enfoque Territorial Canarias (Logo Oficial y Red Viva Canarias)

## Metadatos
- **ID**: T-152
- **Título**: Unificación de Marca y Enfoque Territorial Canarias (Logo Oficial y Red Viva Canarias)
- **Sprint**: Sprint 30
- **Tipo**: Branding / UX / i18n
- **Estado**: Completada
- **Fecha inicio**: 2026-11-25

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 30 / 2026-11-25
- **Diseño y arquitectura aprobados por**: Humano / Operador
- **Decisiones e interfaces selladas**:
  1. Sustituir `/icono-palmera.svg` por `/kanarii-logo.svg` en `src/components/layout/TopBar.tsx` y `src/components/Sidebar.tsx`.
  2. Sustituir todas las referencias de "Red Global" por "Red Canarias" / "Red Viva Canarias" en `src/components/Sidebar.tsx`, `src/locales/es/common.json`, `src/locales/en/common.json` y contextos asociados.
  3. Mantener proporciones semánticas y tokens del `@theme`.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Contexto y Motivación
Homogeneizar el branding visual de Kanarii con su logotipo oficial y clarificar ante el usuario que la plataforma está concebida primordialmente para tejer y fortalecer la red en las Islas Canarias.

## Caja de archivos
- `src/components/layout/TopBar.tsx`
- `src/components/Sidebar.tsx`
- `src/locales/es/common.json`
- `src/locales/en/common.json`
- `docs/sprints/sprint-30.md`
- `.agents/tasks/task-152.md`

## Criterios de Aceptación
- [x] Logo oficial de Kanarii renderizado en `TopBar` y `Sidebar`.
- [x] Sustitución completa de "Red Global" por "Red Canarias" / "Red Viva Canarias".
- [x] Paridad en español e inglés en `common.json`.
- [x] `npm run lint` y `npm run build` pasan sin errores.
