# Research Sprint 31
> Fecha: 2026-11-26
> Fuentes: Web SearXNG Soberano + Activos Internos de Kanarii (`src/components/Sidebar.tsx`, `src/components/BottomNav.tsx`, `src/pages/DashboardView.tsx`, `src/lib/services/_types.ts`)
> Estado: ✅ Verificado

---

## Descubrimientos Scout (por tarea)

### T-155: Unificar `CreateNewModal` plano + Acción fija `"Crear nuevo"` en `Sidebar` y `BottomNav`
- **Alternativa OSS evaluada**: `@react-navigation/bottom-tabs` (orientado a React Native), librerías externas de drawer/modal.
- **Decisión**: `Desarrollo a medida justificado`. Kanarii ya posee el patrón plano de modales `src/components/Create*.tsx` (`CreateActaModal.tsx`, `CreateEventoModal.tsx`, `CreatePostModal.tsx`, etc.) y navegación Tailwind v4 + Lucide en `Sidebar.tsx` y `BottomNav.tsx`.

### T-156: Simplificación de `DashboardView.tsx` (Find New Connections directo + Kin Chip)
- **Alternativa OSS evaluada**: Librerías de UI dashboard genéricas.
- **Decisión**: `Desarrollo a medida justificado`. Refactorización directa sobre `src/pages/DashboardView.tsx` eliminando el hero redundante y manteniendo la ventaja determinista de `SynergyCard` y `kinDeHoy()` como chip compacto.

### T-157: Modelo de Módulos Progresivos en `Comunidad` (`enabledModules`) y Auto-detección
- **Alternativa OSS evaluada**: Flags SaaS externos (LaunchDarkly, Flagsmith).
- **Decisión**: `Desarrollo a medida justificado`. Persistencia ligera en Firestore (`Comunidad.enabledModules?: NodeModuleId[]`) + hook `useNodeModules` que combina configuración explícita con auto-detección de actividad previa para nodos veteranos (ej. `arteara`).

### T-158: Capa 2 Progresiva en `Sidebar.tsx`, `BottomNav.tsx` y `NodeModulesModal.tsx`
- **Alternativa OSS evaluada**: `@radix-ui/react-tabs` (`v1.2.1`, accesible, para tabs horizontales).
- **Decisión**: `Desarrollo a medida justificado` (y descartar tabs horizontales en Capa 2 por decisión de arquitectura: Opción A — navegación en Sidebar sin doble cabecera para preservar altura útil en vistas densas como Kanban y Gobernanza).

---

## Investigación Técnica y Fuentes

### Progressive Disclosure & Arquitectura por Capas (T-155, T-156, T-157, T-158)
- **Query SearXNG**: `React progressive disclosure navigation modules permissions UX pattern`
- **Resultados relevantes**:
  - [What is Progressive Disclosure? — updated 2026 | IxDF](https://ixdf.org/literature/topics/progressive-disclosure)
  - [Progressive Disclosure in AI-Powered Product Design - UX Planet](https://uxplanet.org/progressive-disclosure-in-ai-powered-product-design-978da0aaeb08)
  - [Dashboard UI Design Trends 2026: Build for Decisions](https://uxmagic.ai/blog/dashboard-ui-trends-2026)
- **Patrón adoptado**:
  - **Capa 1 (Red Canarias)**: Mantener siempre visibles únicamente las dos acciones primarias (`Encontrar nuevas conexiones` y `+ Crear nuevo`) y los 4 objetos de red (`Personas`, `Nodos`, `Eventos`, `Residencias`). Eliminar cajas hero duplicadas para ir directo a búsqueda/filtros y tarjetas.
  - **Capa 2 (Espacio del Nodo — Opción A)**: Mostrar por defecto solo los 3 módulos semilla (`Tablón`, `Agenda/Calendario`, `Miembros`) + botón discreto `+ Activar módulos` que despliega herramientas de `Coordinación` (`Proyectos`, `Tareas`) y `Madurez` (`Gobernanza S3`, `Actas`, `Soberanía`) por activación individual sin abrumar en el alta inicial.

### Activos Internos Inspeccionados
- `src/components/Sidebar.tsx`: ya implementa la bifurcación `isNodeSpace`, botón `← Volver a Red Canarias` y listas `networkNavItems` / `nodeSpaceNavItems`.
- `src/components/BottomNav.tsx`: ya distingue Capa 1 vs Capa 2; requiere ajustar etiquetas cortas en Capa 1 + acceso directo a `+ Crear nuevo`, y filtrar Capa 2 por módulos activos.
- `src/lib/services/_types.ts`: interfaz `Comunidad` lista para recibir `enabledModules?: NodeModuleId[]`.
- `src/components/dashboard/CreateNewModal.tsx`: creado en Sprint 30 en `staging`; debe reubicarse a `src/components/CreateNewModal.tsx` respetando la convención plana del proyecto.
