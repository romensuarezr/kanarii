# Task T-158 — Capa 2 progresiva en `Sidebar`/`BottomNav` + `NodeModulesModal` y estado vacío guiado

## Metadatos
- **ID**: T-158
- **Título**: Capa 2 progresiva en `Sidebar`/`BottomNav` + `NodeModulesModal` y estado vacío guiado
- **Sprint**: Sprint 31
- **Tipo**: UX / Capa 2 / Progressive Disclosure
- **Estado**: Pendiente
- **Fecha inicio**: 2026-11-26

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 31 / 2026-11-26
- **Diseño y arquitectura aprobados por**: Humano / Operador (`A, aprobado sobre staging`)
- **Decisiones e interfaces selladas**:
  1. Opción A de navegación en Capa 2: al entrar en un nodo, NO añadir tabs horizontales encima del contenido. `Sidebar.tsx` y `BottomNav.tsx` pasan a modo Nodo con `← Volver a Red Canarias` siempre visible.
  2. Mostrar por defecto únicamente los **3 módulos base Semilla** (`Tablón`, `Agenda / Calendario`, `Miembros` hacia `/c/:slug`) + los módulos activados vía `useNodeModules`.
  3. Añadir botón discreto **`+ Activar módulos`** que abre `src/components/NodeModulesModal.tsx`, permitiendo activar/desactivar herramientas por separado dentro de sus 3 niveles (`Semilla`, `Coordinación`, `Madurez`).
  4. Añadir estado vacío guiado en `src/pages/Tablon.tsx` (cuando no hay posts y el nodo aún está en fase semilla) con botón `+ Añadir herramientas al nodo` que abre el mismo selector.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Caja de archivos
- `src/components/NodeModulesModal.tsx` (nuevo)
- `src/components/Sidebar.tsx`
- `src/components/BottomNav.tsx`
- `src/pages/Tablon.tsx`
- `src/locales/es/common.json`
- `src/locales/en/common.json`

## Criterios de Aceptación
- [ ] Capa 2 muestra solo `Tablón`, `Agenda`, `Miembros` + módulos activos + `+ Activar módulos` (sin tabs horizontales duplicadas).
- [ ] `← Volver a Red Canarias` siempre visible en `Sidebar.tsx` y `BottomNav.tsx`.
- [ ] `NodeModulesModal.tsx` permite activar herramientas de Coordinación y Madurez individualmente.
- [ ] Estado vacío guiado en `Tablon.tsx` incluye `+ Añadir herramientas al nodo`.
- [ ] `npm run lint` y `npm run build` pasan sin errores.
