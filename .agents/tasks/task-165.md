# Task T-165 — Buscador avanzado estilo ReTribalize (`DashboardView` multi-entidad con imágenes)

## Metadatos
- **ID**: T-165
- **Título**: Buscador avanzado estilo ReTribalize (`DashboardView` multi-entidad con imágenes)
- **Sprint**: Sprint 33
- **Tipo**: Feature / UX / Search
- **Estado**: Completada
- **Fecha inicio**: 2026-11-26

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 33 / 2026-11-26
- **Decisiones e interfaces**:
  1. `src/lib/services/_types.ts` y `src/lib/services/residencias.ts`: añadir `imageUrl?: string` opcional en `Evento` y `ConvocatoriaResidencia`.
  2. `src/components/dashboard/ExploreEntityCard.tsx`: tarjeta unificada con imagen de portada (`bannerUrl`/`logoUrl`/`imageUrl`), badge de tipo (`NODO`, `EVENTO`, `ESTANCIA`), ubicación/fecha y acción directa.
  3. `src/pages/DashboardView.tsx`:
     - Cabecera de modos estilo ReTribalize: `Búsqueda Avanzada`, `Explorar Todo`, `Mejorar Sinergias` (`/ficha?edit=1`).
     - Caja `<textarea>` para búsqueda libre multi-entidad + barra de filtros en línea (`Buscando`: Todo/Personas/Nodos/Eventos/Estancias, `Miembro de`: Cualquier nodo / selector real, `Cerca`: toggle de isla, botón `Buscar`).
     - Cuadrícula unificada mostrando `SynergyCard` para personas y `ExploreEntityCard` para nodos, eventos y estancias.

## Caja de archivos
- `src/lib/services/_types.ts`
- `src/lib/services/residencias.ts`
- `src/components/dashboard/ExploreEntityCard.tsx`
- `src/pages/DashboardView.tsx`

## Criterios de Aceptación
- [x] El buscador en `/dashboard` permite filtrar por texto y por `Buscando` (Todo/Personas/Nodos/Eventos/Estancias), `Miembro de` y `Cerca` sin scroll horizontal.
- [x] Las tarjetas de Nodos, Eventos y Estancias muestran imagen de portada cuando existe.
- [x] `npm run lint` y `npm run build` pasan sin errores.
