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
