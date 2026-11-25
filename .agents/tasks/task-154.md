# Task T-154 — Rediseño del Dashboard con Sencillez Retribalize (2 Secciones y Acciones Claras de Arranque)

## Metadatos
- **ID**: T-154
- **Título**: Rediseño del Dashboard con Sencillez Retribalize (2 Secciones y Acciones Claras de Arranque)
- **Sprint**: Sprint 30
- **Tipo**: UX / Frontend / Dashboard
- **Estado**: Pendiente
- **Fecha inicio**: 2026-11-25

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 30 / 2026-11-25
- **Diseño y arquitectura aprobados por**: Humano / Operador
- **Decisiones e interfaces selladas**:
  1. En `src/pages/DashboardView.tsx`, estructurar la cabecera / bienvenida en dos secciones primarias y minimalistas:
     - Bloque 1: **"Nodos & Tribus en Canarias"** con CTA directo hacia `/comunidades`.
     - Bloque 2: **"Resonancia & Sinergias"** con CTA directo hacia los filtros de afinidad determinista y encuentros.
  2. Dos botones con acciones de arranque claras para que nuevos usuarios o miembros activos comiencen su interacción sin fricción.
  3. Preservar la cuadrícula de sinergias calculadas y la información astrológica/energética (Kin Maya, Diseño Humano) debajo de estas secciones.
  4. Internacionalización completa en `src/locales/es/dashboard.json` y `src/locales/en/dashboard.json`.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Contexto y Motivación
Inspirado en la simplicidad y claridad de interfaz de Retribalize, el dashboard de Kanarii debe guiar de forma inmediata al usuario en sus dos intenciones primarias: descubrir comunidades/nodos físicos y virtuales, y sincronizar afinidades energéticas y territoriales con otros miembros.

## Caja de archivos
- `src/pages/DashboardView.tsx`
- `src/locales/es/dashboard.json`
- `src/locales/en/dashboard.json`
- `docs/sprints/sprint-30.md`
- `.agents/tasks/task-154.md`

## Criterios de Aceptación
- [ ] Dos secciones estructurales principales y dos botones de acción de arranque implementados en `DashboardView.tsx`.
- [ ] Estilo visual sobrio, cálido y minimalista basado en tokens semánticos de `@theme`.
- [ ] Cadenas traducidas en español e inglés sin valores hardcodeados.
- [ ] `npm run lint` y `npm run build` pasan limpios sin errores.
