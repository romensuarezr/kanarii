# Plan de Ejecución — T-113, T-114, T-115 (Sprint 25)

## Objetivo
Implementar T-113 (PasaporteVisual con redes y contacto rápido), T-114 (Tarjetas de Nodos en ComunidadesView con propósito y cuidadores) y T-115 (Actualización de docs/pages-map.md).

## Caja de archivos autorizada
- `src/components/perfil/PasaporteVisual.tsx`
- `src/pages/FichaView.tsx`
- `src/pages/ComunidadesView.tsx`
- `docs/pages-map.md`

## Pasos secuenciales
1. **T-113**: Extender `UserPassport` en `PasaporteVisual.tsx` con campos de redes sociales y contacto. Añadir renderizado con iconos de `lucide-react` (`Instagram`, `Linkedin`, `Globe`, `Phone`, `Mail`). Añadir inputs correspondientes en el formulario de edición en `FichaView.tsx`.
2. **T-114**: Actualizar `ComunidadesView.tsx` para exponer `purpose`, nombres de cuidadores desde `adminUids`, y necesidades del espacio en las tarjetas de comunidad.
3. **T-115**: Actualizar `docs/pages-map.md` con la nueva secuencia de onboarding y estado de completitud de perfil.
4. **Verificación**: Ejecutar `npx tsc --noEmit` y suite de pruebas.
