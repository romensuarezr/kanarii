# Task T-156 — Limpieza radical de `DashboardView` (Find New Connections directo + Kin chip)

## Metadatos
- **ID**: T-156
- **Título**: Limpieza radical de `DashboardView` (Find New Connections directo + Kin chip)
- **Sprint**: Sprint 31
- **Tipo**: UX / Frontend / Dashboard
- **Estado**: Completada
- **Fecha inicio**: 2026-11-26

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 31 / 2026-11-26
- **Diseño y arquitectura aprobados por**: Humano / Operador (`A, aprobado sobre staging`)
- **Decisiones e interfaces selladas**:
  1. Eliminar de `src/pages/DashboardView.tsx` la caja hero gigante (`Hola, ...` + tarjeta grande `Kin del día`) y la barra duplicada `EXPLORAR EN CANARIAS` + los botones redundantes (`Encontrar nuevas conexiones` y `+ Crear algo`), ya que el acceso principal y `+ Crear nuevo` viven en `Sidebar`/`BottomNav`.
  2. Al entrar a `/dashboard`, mostrar directamente:
     - Línea compacta de cabecera: título `Encuentro y Sinergias` + ubicación insular + **chip pequeño del Kin del día** (no hero).
     - Buscador rápido por texto/dones/nombre + filtros deterministas (`Todas las sinergias | En mi isla | Resonancia energética | Complementarios de tríada`).
     - Grid directo de `SynergyCard` con explicabilidad determinista.
  3. Actualizar imports para quitar `CreateNewModal` de `DashboardView.tsx` (o enlazar limpio sin duplicar).
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Caja de archivos
- `src/pages/DashboardView.tsx`
- `src/locales/es/dashboard.json`
- `src/locales/en/dashboard.json`

## Criterios de Aceptación
- [x] Caja hero gigante y barra duplicada de entidades eliminadas de `DashboardView.tsx`.
- [x] Kin del día conservado únicamente como chip compacto.
- [x] Buscador/filtros y tarjetas `SynergyCard` visibles de inmediato al entrar.
- [x] `npm run lint` y `npm run build` pasan sin errores.
