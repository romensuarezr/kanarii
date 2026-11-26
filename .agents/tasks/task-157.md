# Task T-157 — Modelo `enabledModules` en `Comunidad` + Hook `useNodeModules` con auto-detección

## Metadatos
- **ID**: T-157
- **Título**: Modelo `enabledModules` en `Comunidad` + Hook `useNodeModules` con auto-detección
- **Sprint**: Sprint 31
- **Tipo**: Arquitectura / Datos / Hooks
- **Estado**: Completada
- **Fecha inicio**: 2026-11-26

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 31 / 2026-11-26
- **Diseño y arquitectura aprobados por**: Humano / Operador (`A, aprobado sobre staging`)
- **Decisiones e interfaces selladas**:
  1. Definir `NodeModuleId = 'tablon' | 'calendario' | 'miembros' | 'proyectos' | 'tareas' | 'gobernanza' | 'actas' | 'soberania'` y `enabledModules?: NodeModuleId[]` (aceptando `string[]` compatible) en `Comunidad` (`src/lib/services/_types.ts`).
  2. Agrupación en 3 niveles (solo catálogo, activación individual por herramienta):
     - **Semilla** (siempre activos por defecto): `tablon`, `calendario`, `miembros`.
     - **Coordinación** (activables): `proyectos`, `tareas`.
     - **Madurez** (activables): `gobernanza`, `actas`, `soberania`.
  3. Añadir método de servicio en `src/lib/services/comunidades.ts` y acción en `src/hooks/useComunidadActions.ts` para activar/desactivar módulos (`updateComunidadModules`).
  4. Crear `src/hooks/useNodeModules.ts` que resuelva los módulos activos de la comunidad actual y realice **auto-detección retroactiva** (si `proyectos`, `tareas`, `propuestas`, `actas` o `acuerdos` ya tienen documentos en Firestore para nodos veteranos como `arteara`, se consideran activos automáticamente para no ocultar datos previos).
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Caja de archivos
- `src/lib/services/_types.ts`
- `src/lib/services/comunidades.ts`
- `src/hooks/useComunidadActions.ts`
- `src/hooks/useNodeModules.ts` (nuevo)

## Criterios de Aceptación
- [x] `enabledModules?: NodeModuleId[]` tipado en `Comunidad`.
- [x] Agrupación Semilla / Coordinación / Madurez definida con activación granular por herramienta.
- [x] Auto-detección en nodos veteranos verifica datos existentes en Firestore sin ocultar ningún dato previo.
- [x] `npm run lint` y `npm run build` pasan sin errores.
