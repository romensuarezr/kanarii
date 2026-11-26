# Task T-155 — Reubicar `CreateNewModal` plano + Mover `"Crear nuevo"` fijo a `Sidebar` y `BottomNav`

## Metadatos
- **ID**: T-155
- **Título**: Reubicar `CreateNewModal` plano + Mover `"Crear nuevo"` fijo a `Sidebar` y `BottomNav`
- **Sprint**: Sprint 31
- **Tipo**: UX / Navigation / Refactor
- **Estado**: Pendiente
- **Fecha inicio**: 2026-11-26

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 31 / 2026-11-26
- **Diseño y arquitectura aprobados por**: Humano / Operador (`A, aprobado sobre staging`)
- **Decisiones e interfaces selladas**:
  1. Mover `src/components/dashboard/CreateNewModal.tsx` al patrón plano `src/components/CreateNewModal.tsx` y eliminar el directorio `src/components/dashboard/`.
  2. Renombrar todo copy `"Crear algo"` / `"Crear algo nuevo"` a `"Crear nuevo"` (`"Create New"` en EN).
  3. Añadir el botón protagonista fijo **`+ Crear nuevo`** en `src/components/Sidebar.tsx` (Capa 1), abriendo `CreateNewModal`.
  4. Adaptar `src/components/BottomNav.tsx` en Capa 1 con 5 acciones de 1 palabra sin truncamientos (`Explorar`, `Nodos`, `+ Nuevo`, `Eventos`, `Más`) con acceso directo al mismo `CreateNewModal` desde `+ Nuevo` y `Residencias` / `Mi Pasaporte` accesibles en el sheet `Más`.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Caja de archivos
- `src/components/CreateNewModal.tsx` (nuevo, reemplazando `src/components/dashboard/CreateNewModal.tsx`)
- `src/components/Sidebar.tsx`
- `src/components/BottomNav.tsx`
- `src/locales/es/common.json`
- `src/locales/en/common.json`
- `src/locales/es/dashboard.json`
- `src/locales/en/dashboard.json`

## Criterios de Aceptación
- [ ] `src/components/CreateNewModal.tsx` creado en plano y `src/components/dashboard/` eliminado.
- [ ] Copy actualizado a `"Crear nuevo"` / `"Create New"`.
- [ ] Botón `+ Crear nuevo` fijo en `Sidebar.tsx` (Capa 1) y acceso directo `+ Nuevo` en `BottomNav.tsx` sin textos truncados.
- [ ] `npm run lint` y `npm run build` pasan sin errores.
