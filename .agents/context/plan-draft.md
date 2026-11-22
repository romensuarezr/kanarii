# Plan de Ejecución — T-115

## Objetivo
Sincronizar `docs/pages-map.md` con la estructura real de rutas y con el flujo de entrada introducido por T-111 (Panel de Orientación) y T-112 (Onboarding Exprés), incluyendo el estado de completitud progresiva del perfil.

## Caja de archivos autorizada
- `docs/pages-map.md`

## Pasos secuenciales
1. Corregir la tabla de páginas: `Welcome` sirve `/`, `/welcome` y `/orientacion`; añadir `/perfil` como alias de `FichaView`; registrar `PasaporteComunitarioView` (`/c/:slug/miembro/:userId`), `PasaporteUniversalView` (`/p/:uid`) y `KanariiTourPage` (`/tour`).
2. Actualizar los tamaños reales de `Welcome`, `FichaView`, `FichaPreview` y `ComunidadesView`.
3. Añadir la sección "Secuencia de Entrada y Completitud del Perfil" con el flujo `/` → `/contexto` → `/orientacion` → perfil básico o Manual Galáctico, y la tabla de estados basada en `appUser.hasFicha` y `pendingFicha`.
4. Reflejar en `FichaView` las secciones de perfil básico y redes/contacto (T-113), y en `ComunidadesView` las tarjetas con propósito, cuidadores y necesidades (T-114).
5. Actualizar el diagrama de navegación principal y la fecha de última actualización.
6. Verificar que cada entrada del mapa corresponde a una ruta registrada en `src/App.tsx`.

## Notas de arquitectura
- Cambio exclusivamente documental: no se tocan rutas ni componentes.
- Sin nuevas dependencias ni cambios de esquema.
