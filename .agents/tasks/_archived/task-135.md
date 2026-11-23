# Task-135: Crear menú de configuración y superficie de ajustes dedicada

## Objetivo
Implementar la página dedicada de configuración `/ajustes` (`AjustesView.tsx`) e integrar el acceso directo "Ajustes" en `UserAvatarMenu.tsx` con navegación a las secciones de privacidad, redes/contacto, cuenta y perfil.

## Contexto técnico
- La arquitectura de 3 superficies consolidada en el benchmark de Sprint 27 (§1 de `sprint-27-research.md`) define: Perfil (lectura), Ficha (edición) y Ajustes (configuración).
- `UserAvatarMenu.tsx` no contaba con enlace a configuración global.
- La configuración de privacidad y cuenta debe vivir en una superficie propia accesible desde el avatar.

## Diseño macro aprobado en planning
- **Sprint**: Sprint 27 — 2026-11-23 a 2026-11-29
- **Decisiones e interfaces selladas**:
  - Crear `src/pages/AjustesView.tsx` protegida por `ProtectedRoute` en `/ajustes`.
  - Secciones en `AjustesView`:
    1. **Privacidad del Pasaporte**: visibilidad comunitaria para dimensiones astrales y canales de contacto/redes.
    2. **Identidad y Perfil**: enlaces rápidos para editar ficha y ver pasaporte.
    3. **Cuenta y Conexiones**: información de sesión y vinculación de Telegram.
  - En `UserAvatarMenu.tsx`, añadir botón «Ajustes» con icono `Settings` antes o después de la vinculación de Telegram.
  - En `src/App.tsx`, registrar la ruta `/ajustes`.
- **Veredicto**: `[APROBADO_EN_PLANNING]`

## Caja de archivos
Archivos autorizados para modificación / creación:
- `src/pages/AjustesView.tsx` (nuevo)
- `src/components/layout/UserAvatarMenu.tsx`
- `src/App.tsx`
- `.agents/tasks/task-135.md`
- `docs/sprints/sprint-27.md`

## Skills
- `implementar-feature-dry`: reutilizar contextos de autenticación y servicios de ficha/pasaporte existentes sin duplicación.
- `structure-guardian`: colocar la vista en `src/pages/`.

## Criterios de done
- [x] `AjustesView.tsx` creada con pestañas/secciones para Privacidad, Identidad/Perfil y Cuenta.
- [x] Ruta `/ajustes` registrada en `src/App.tsx` dentro de `ProtectedRoute`.
- [x] Botón "Ajustes" añadido a `UserAvatarMenu.tsx` con navegación correcta.
- [x] Los ajustes de privacidad en `AjustesView` actualizan y sincronizan el pasaporte en tiempo real.
- [x] `npm run lint` y `npm run build` en verde.
- [x] Sesión cerrada correctamente.

## Estado de aprobación
- [x] Plan presentado al usuario (Fase 3.5)
- [x] APROBADO recibido
- [x] Rama creada: feat/T-135-menu-ajustes-usuario
- [x] Lock activo: T-135
- [x] Sesión cerrada correctamente
