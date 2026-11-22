# Task-114: Enriquecer Tarjetas de Nodos en `ComunidadesView.tsx`

## Objetivo
Enriquecer la tarjeta de comunidad (`ComunidadesView.tsx`) exponiendo el propósito, cuidadores (`adminUids`) y necesidades del espacio para mejorar la visibilidad y gestión colectiva.

## Contexto técnico
- `src/pages/ComunidadesView.tsx` gestiona la vista de comunidades y solicitudes.
- Los datos de comunidad incluyen `purpose`, `adminUids`, y campos de necesidades almacenados en Firestore.
- Se reutiliza el hook `useComunidadMembers` para resolver `adminUids` a nombres de usuario.

## Caja de archivos
Archivos autorizados para modificación:
- `src/pages/ComunidadesView.tsx`

## Criterios de done
- [x] Componente `ComunidadesView.tsx` modificado para mostrar sección `Propósito` en la tarjeta de comunidad.
- [x] Renderizado de `adminUids` resueltos a nombres de usuarios mediante `useComunidadMembers`.
- [x] Nueva sección `Necesidades del Espacio` mostrada como lista no numerada.
- [x] Compilación sin errores TypeScript (`npx tsc --noEmit`).

## Estado de aprobación
> Este bloque lo rellena el agente durante /session-start.
> No modificar manualmente.

- [ ] Plan presentado al usuario (Fase 3.5)
- [ ] APROBADO recibido
- [ ] Rama creada: feat/T-114-comunidades-tarjeta-detalle
- [ ] Lock activo: .agent-session.lock
- [x] Sesión cerrada correctamente

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 25 — 2026-08-03 → 2026-08-07
- **Diseño y arquitectura aprobados por**: Humano (operador)
- **Decisiones e interfaces selladas**:
  - Componente `ComunidadesView.tsx` modificado para incluir sección `Propósito` en la tarjeta.
  - Subcomponente `useComunidadMembers` usado para mapear `adminUids` → nombres.
  - `lucide-react` icon `User` añadido al side de cada tarjeta.
  - Interfaz consistente con `PasaporteVisual` y `FichaView`.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`