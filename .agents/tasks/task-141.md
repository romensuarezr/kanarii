# Task T-141 — Cohesionar Navegación Principal

## Metadatos
- **ID**: T-141
- **Título**: Cohesionar Navegación: Corregir enlaces rotos (Marketplace), separar Tablón de Gobernanza, añadir Calendario y restringir Cruce
- **Sprint**: Sprint 28
- **Tipo**: Refactor / Fix UI / Navigation
- **Estado**: En progreso
- **Fecha inicio**: 2026-11-24

## Contexto y Motivación
1. **Marketplace roto**: En `navigation.ts`, `Marketplace` apunta a `/marketplace`, ruta inexistente en `App.tsx` que rebota en 404 (toast «La ruta que buscabas no existe…»). Debe añadirse la ruta `/marketplace` (o alias/redirect hacia `/soberania`).
2. **Propuestas vs. Tablón vs. Gobernanza**: El ítem en `navigationConfig` se llama "Propuestas" pero apunta a `/tablon` (Tablón de la Tríada comunitaria). La vista de gobernanza vive en `/gobernanza` y no tiene entrada en la navegación, provocando además que el badge de propuestas pendientes de `Sidebar.tsx` nunca se pinte. Se separa limpiamente: Tablón (`/tablon`) y Gobernanza (`/gobernanza`).
3. **Calendario sin entrada**: La vista de eventos `/calendario` existe pero no estaba presente en `navigationConfig`. Se añade con su icono `Calendar`.
4. **Cruce de Perfiles protegido**: El ítem Cruce era visible para cualquier miembro con comunidad pero rebotaba a `/ficha` porque la ruta requiere `admin`. Se marca `adminOnly: true` para que solo aparezca a administradores.

## Caja Autorizada de Archivos
- `src/config/navigation.ts`
- `src/App.tsx`
- `src/components/Sidebar.tsx`
- `src/components/BottomNav.tsx`
- `docs/sprints/sprint-28.md`
- `.agents/tasks/task-141.md`

## Criterios de Aceptación
- [x] Al pulsar Marketplace en la navegación (Sidebar o BottomNav), carga la vista de `MarketplaceView` sin caer en 404.
- [x] La navegación distingue claramente entre **Tablón** (`/tablon`) y **Gobernanza** (`/gobernanza`), con sus iconos y etiquetas traducibles correctos.
- [x] El badge de propuestas pendientes se visualiza correctamente en el ítem de Gobernanza cuando corresponda.
- [x] **Calendario** (`/calendario`) está accesible desde el menú de navegación.
- [x] El ítem **Cruce** solo es visible para usuarios con rol administrador (`adminOnly: true`).
- [x] `npm run lint` y `npm run build` pasan limpios sin errores.
