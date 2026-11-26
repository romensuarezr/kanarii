# Research Sprint 32
> Fecha: 2026-11-26
> Fuentes: Web SearXNG Soberano + Auditoría UI Móvil en vivo (`393×852`, iPhone 15) + Activos Internos de Kanarii
> Estado: ✅ Verificado

---

## Descubrimientos Scout (por tarea)

### T-159: Erradicar desbordamiento global en `/perfil`, `/ficha` y `Toaster` móvil
- **Alternativa OSS evaluada**: `@atlaskit/primitives` (`v22.9.0`), wrappers externos.
- **Decisión**: `Desarrollo a medida justificado`. El problema reside en contenedores flex/grid sin `w-full max-w-full min-w-0` (`PerfilView.tsx` llegaba a `607px` en viewport `393px`), cabeceras sin `flex-wrap` (`FichaView.tsx` a `462px`) y notificaciones `Toaster` sin acotar ancho máximo en móvil (`max-w-[calc(100vw-2rem)]`).

### T-160: Eliminar scroll lateral en barras de filtros y pestañas (`flex-wrap`)
- **Alternativa OSS evaluada**: `react-responsive-carousel` (descartado: añade scroll/swipe innecesario cuando lo que se busca es visibilidad directa).
- **Decisión**: `Desarrollo a medida justificado`. Sustituir `overflow-x-auto whitespace-nowrap` por `flex-wrap gap-2` con pills compactas en `DashboardView.tsx`, `ComunidadesView.tsx`, `EventosView.tsx`, `ResidenciasView.tsx`, `MarketplaceView.tsx`, `AjustesView.tsx`, `AdminPanel.tsx` y `PerfilView.tsx`.

### T-161: Tableros Kanban responsivos sin scroll lateral en móvil (`KanbanBoard` / `KanbanColumn`)
- **Alternativa OSS evaluada**: `react-kanban-kit` (`v0.0.2-beta.7`, inmaduro para producción).
- **Decisión**: `Desarrollo a medida justificado`. Reutilizar `src/components/ui/KanbanBoard.tsx` y `src/components/ui/KanbanColumn.tsx` apilando columnas verticalmente en `< md` (`flex-col md:flex-row`) y acotando `TareasPanel.tsx` / `ProyectosView.tsx` / `PropuestasView.tsx` para eliminar el scroll horizontal de `1280px–1604px` en móvil.

---

## Investigación Técnica y Fuentes

### Responsive Kanban & Zero Horizontal Overflow (T-159, T-160, T-161)
- **Query SearXNG**: `Tailwind CSS responsive mobile kanban board stack vertical without horizontal scroll`
- **Resultados relevantes**:
  - [Tailwind CSS Dashboard Sidebars Blocks - Preline UI](https://preline.co/blocks/navigation-layout/dashboard-sidebars/)
  - [Tutorials for HTML, Tailwind, Astro, Alpine & JavaScript](https://lexingtonthemes.com/tutorials)
- **Patrón adoptado**:
  - **Vertical stacking en móvil (`flex-col md:flex-row`)**: En `KanbanBoard.tsx` y `KanbanColumn.tsx`, reemplazar el scroll horizontal forzado (`min-w-[300px]` en `flex`) por `w-full md:min-w-[300px] md:max-w-[350px]` y `flex-col md:flex-row`, eliminando `overflow-x-auto` en `< md`.
  - **Wrapping natural en filtros y pestañas**: `flex flex-wrap gap-2` en lugar de `overflow-x-auto whitespace-nowrap`, manteniendo todas las opciones visibles sin barras de scroll horizontales ni en móvil ni en desktop estrecho.
  - **Contención estricta de ancho (`w-full max-w-full min-w-0`)**: Garantiza `document.documentElement.scrollWidth <= window.innerWidth` en las 13 rutas principales.
