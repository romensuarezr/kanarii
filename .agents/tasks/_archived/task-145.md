# Task T-145 — Directorio de Nodos (Comunidades, Residencias, Nodos Online), Ficha con Pestañas e i18n Completo

## Metadatos
- **ID**: T-145
- **Título**: Directorio de Nodos (Comunidades, Residencias, Nodos Online), Ficha con Pestañas e i18n Completo
- **Sprint**: Sprint 28
- **Tipo**: Feature UI / UX / i18n
- **Estado**: Completada
- **Fecha inicio**: 2026-11-25
- **Fecha fin**: 2026-11-25

## Contexto y Motivación
1. Tras la apertura pública de `/comunidades` (ADR-027) y el benchmarking detallado de Retribalize.io y Hylo:
   - El catálogo debe evolucionar conceptualmente de "Comunidades" a **Red de Nodos** (Fincas/Ecoaldeas, Residencias/Colivings, Nodos Online).
   - Las tarjetas de nodos deben enriquecerse visualmente con design tokens semánticos `@theme`: portada/logo, badge de tipología, ubicación insular con `MapPin`, número de miembros, tags de propósito y acciones directas.
   - Filtros por tipo de nodo en el catálogo (*Todos*, *Fincas*, *Residencias*, *Online*).
2. En la Ficha del Nodo (`FichaComunidadView.tsx` en `/c/:slug`):
   - Organizar la presentación estilo Retribalize en 3 pestañas: *Presentación (About)*, *Miembros* (con `MemberCard` y `PasaporteModal`), y *Actividades & Convocatorias*.
   - Añadir para miembros activos el botón de acción principal: **"🌿 Entrar al Espacio del Nodo"** (que fija `currentCommunityId = slug`, activa el espacio y navega a `/tablon` para desplegar la Capa 2 operativa).
3. Eliminar todos los literales hardcodeados en español y las clases hexadecimales arbitrarias, completando las claves en `src/locales/es/communities.json` y `src/locales/en/communities.json`.

## Caja Autorizada de Archivos
- `src/pages/ComunidadesView.tsx`
- `src/pages/FichaComunidadView.tsx`
- `src/locales/es/communities.json`
- `src/locales/en/communities.json`
- `docs/sprints/sprint-28.md`
- `.agents/tasks/task-145.md`

## Criterios de Aceptación
- [x] Vista `/comunidades` enriquecida con badges de tipología de nodo, ubicación insular, conteo de miembros y filtros de tipología.
- [x] Cumplimiento estricto de design tokens semánticos `@theme` (cero clases `bg-[#...]`, `text-[#...]`, `border-[#...]`).
- [x] En `/c/:slug`, botón para miembros activos: *"🌿 Entrar al Espacio del Nodo"*, que activa el contexto del nodo y navega a `/tablon`.
- [x] Pestañas *Presentación*, *Miembros* y *Actividades* pulidas e internacionalizadas en su totalidad.
- [x] Cero textos visibles hardcodeados: claves simétricas y completas en `src/locales/es/communities.json` y `src/locales/en/communities.json`.
- [x] `npm run lint` y `npm run build` pasan limpios sin errores.
