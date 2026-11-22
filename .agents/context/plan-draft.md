# Plan Draft — T-132: Corregir duplicidad de rutas /perfil y /ficha

## Objetivo
Separar las rutas `/perfil` y `/ficha` en `src/App.tsx` para que apunten a vistas distintas:
- `/perfil` → Perfil de usuario (datos personales, configuración básica)
- `/ficha` → Vista de ficha comunitaria (tríada, ofrendas, saberes, necesidades)

## Rama propuesta
`feat/T-132-separar-routes-perfil-ficha`

## Archivos a modificar
- `src/App.tsx`: Modificar rutas para que `/perfil` apunte a `PerfilView` y `/ficha` a `FichaView`
- `src/config/navigation.ts`: Extender interface `AppRoute` con discriminador `purpose: 'profile' | 'ficha'`

## Archivos nuevos
- `src/pages/PerfilView.tsx`: Nuevo componente para perfil de usuario (reestructuración de FichaView)

## Pasos secuenciales
1. Crear rama `feat/T-132-separar-routes-perfil-ficha`
2. Extender `AppRoute` interface en `src/config/navigation.ts`
3. Crear `src/pages/PerfilView.tsx` con perfil de usuario
4. Modificar `src/App.tsx` rutas: `/perfil` → PerfilView, `/ficha` → FichaView
5. Testear localmente que ambas rutas funcionan correctamente
6. Verificar que el pasaporte universal `/p/:uid` no se ve afectado
7. Commit y merge a main

## Riesgos
- Posible impacto en componentes que dependen de la ruta `/perfil`
- Posible duplicación de código entre PerfilView y FichaView
- Cambios en el flujo de navegación que afecten la experiencia del usuario

## Justificación de skills
- `implementar-feature-dry`: Evitar duplicación de lógica entre PerfilView y FichaView
- `structure-guardian`: Supervisar que la separación de componentes no rompa la arquitectura existente

## Verificación de conformidad con diseño macro
- ✅ Nueva interface `AppRoute` con discriminador `purpose: 'profile' | 'ficha'`
- ✅ `src/App.tsx` rutas modificadas: `/perfil` → PerfilView, `/ficha` → FichaView
- ✅ `src/pages/PerfilView.tsx` creado como separación de `FichaView`
- ✅ Ruta `/p/:uid` permanece sin cambios
