# Plan de Ejecución — T-114

## Objetivo
Implementar T-114: Enriquecer las tarjetas de comunidad en `ComunidadesView.tsx` exponiendo el Propósito, los Cuidadores (`adminUids` resueltos a nombres) y las Necesidades del Espacio.

## Caja de archivos autorizada
- `src/pages/ComunidadesView.tsx`

## Pasos secuenciales
1. Importar el hook de servicio `useCommunityMembers` y los iconos `Users`, `Target` y `Sparkles` de `lucide-react`.
2. Crear un subcomponente local `CommunityCaretakers` (dentro del mismo archivo) que use `useCommunityMembers(communityId)` para resolver `adminUids` a nombres mediante `getMemberName`, respetando las reglas de hooks.
3. Etiquetar la descripción existente de la comunidad como `Propósito` y añadir la sección de `Necesidades del espacio` a partir de `comunidad.tags`.
4. Insertar `CommunityCaretakers` en la tarjeta de cada comunidad.
5. Verificar compilación con `npx tsc --noEmit`.
