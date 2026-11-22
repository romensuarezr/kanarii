# Task-115: Actualizar `docs/pages-map.md`

## Objetivo
Actualizar el mapa de páginas (`docs/pages-map.md`) con la nueva secuencia de entrada y estado de completitud del perfil tras el Onboarding Exprés (T-112) para reflejar la estructura actual del producto.

## Contexto técnico
- `docs/pages-map.md` es la fuente de verdad para todas las rutas y vistas de la aplicación.
- Las tareas previas (T-111, T-112) introdujeron nuevas pantallas y flujos de navegación.
- Se deben mapear cambios en: páginas de onboarding, selector de comunidad, y estado de perfil.

## Caja de archivos
Archivos autorizados para modificación:
- `docs/pages-map.md`

## Criterios de done
- [x] `docs/pages-map.md` actualizado con nuevas rutas correspondientes a Onboarding Exprés.
- [x] Estado de completitud del perfil reflejado para nuevos flujos.
- [x] Verificación cruzada: cada entrada en el mapa enlaza con su respectiva vista implementada (`Welcome.tsx`, `ComunidadesView.tsx`, `FichaView.tsx`).

## Estado de aprobación
> Este bloque lo rellena el agente durante /session-start.
> No modificar manualmente.

- [x] Plan presentado al usuario (Fase 3.5)
- [x] APROBADO recibido
- [x] Rama creada: feat/T-115-pages-map-update
- [x] Lock activo: .agent-session.lock
- [x] Sesión cerrada correctamente

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 25 — 2026-08-03 → 2026-08-07
- **Diseño y arquitectura aprobados por**: Humano (operador)
- **Decisiones e interfaces selladas**:
  - Mapa de páginas (`docs/pages-map.md`) sincronizado con el flujo de onboarding actual.
  - Referencias cruzadas actualizadas para `Welcome.tsx`, `ComunidadesView.tsx`, `FichaView.tsx`.
  - Sin cambios estructurales en rutas; solo documentación y metadatos.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`