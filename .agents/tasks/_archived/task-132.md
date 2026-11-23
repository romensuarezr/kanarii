# T-132: Corregir duplicidad de rutas `/perfil` y `/ficha`

## Descripción
Separar las rutas `/perfil` y `/ficha` en `src/App.tsx` para que apunten a vistas distintas:
- `/perfil` → Perfil de usuario (datos personales, configuración básica)
- `/ficha` → Vista de ficha comunitaria (tríada, ofrendas, saberes, necesidades)

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 27 — 2026-11-23 a 2026-11-29
- **Diseño y arquitectura aprobados por**: [Humano / Relé]
- **Decisiones e interfaces selladas**:
  - Nueva interface `AppRoute` en `src/config/navigation.ts` con discriminador `purpose: 'profile' | 'ficha'`
  - `src/App.tsx`: `/perfil` mapea a `PerfilView` (nuevo o reenfocado), `/ficha` mapea a `FichaView`
  - Se crea `src/pages/PerfilView.tsx` como separación de `FichaView`, compartiendo componentes base pero con routes distintas
  - Ruta `/p/:uid` (pasaporte universal) permanece sin cambios
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Dependencias
- Modificación de `src/App.tsx` rutas
- Nueva o reestructuración de `src/pages/PerfilView.tsx`
- Actualización de `src/config/navigation.ts` con interface `AppRoute`

## Caja de archivos
- `src/App.tsx` (modificar rutas)
- `src/config/navigation.ts` (extender interface AppRoute)
- `src/pages/PerfilView.tsx` (nuevo componente)
- `src/pages/FichaView.tsx` (reestructurar si necesario)

## Skills
- `implementar-feature-dry`: Para evitar duplicación de lógica en routes y componentes
- `structure-guardian`: Para supervisar la higiene del sistema de archivos

## Criterios de done
- [x] `/perfil` renderiza `PerfilView` y `/ficha` renderiza `FichaView`.
- [x] `/perfil` ofrece «Editar ficha» y abre `/ficha` directamente en modo edición.
- [x] `/ficha` ofrece «← Mi perfil» para volver.
- [x] `/p/:uid` sigue apuntando a `PasaporteUniversalView`.
- [x] `npm run lint` y `npm run build` en verde.
- [x] Prueba manual de navegación perfil ↔ ficha.
- [x] Sesión cerrada correctamente.

## Notas de sesión
- Guardia de emergencia fuera de caja: `src/lib/services/fichas.ts` — el guardado de la ficha ya no sobrescribe `rol` en `community_members` (evitaba el bloqueo por permisos al guardar). El fix completo de roles queda para T-133/T-136.
- Fix fuera de caja: `src/pages/Welcome.tsx` — `useLocation()` se llamaba después de un `return` temprano y rompía el orden de hooks. Detectado durante la prueba local.
- Investigación UX del sprint: `docs/sprints/sprint-27-ux-research.md`.
