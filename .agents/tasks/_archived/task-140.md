# Task T-140 — Limpieza Selector Idioma TopBar, Compartir Top-Right y Unificación de Nomenclatura Pasaporte

## Metadatos
- **ID**: T-140
- **Título**: Limpiar selector idioma en topbar, mover botón compartir arriba a la derecha y unificar nomenclatura pasaporte
- **Sprint**: Sprint 27
- **Tipo**: Refactor / Fix UI / i18n
- **Estado**: En progreso
- **Fecha inicio**: 2026-11-23

## Contexto y Motivación
1. El selector de idioma ya se integró exitosamente dentro de `UserAvatarMenu.tsx`. Al permanecer también en `TopBar.tsx`, aparecía duplicado en el header principal. Debe eliminarse de `TopBar.tsx`.
2. En `PasaporteUniversalView.tsx`, el botón de compartir estaba en una tarjeta al final de la página debajo de todo el pasaporte (requiriendo scroll excesivo). Siguiendo las directrices estándar de UX móvil y desktop, se reubica como acción destacada en la cabecera superior derecha (`top-right action`), visible desde el primer momento.
3. Al final de `PasaporteVisual.tsx`, cuando el usuario ve su propio pasaporte (`connectionStatus === 'self'`), una barra estática e inerte mostraba "Tu Pasaporte Comunitario", lo cual confundía al usuario respecto a si era universal o comunitario, y ocupaba espacio sin ser accionable. Se unifica la nomenclatura en las traducciones (`es` y `en`) a "Tu Pasaporte" y se transforma opcionalmente en botón accionable si se pasa `onShare`.

## Caja Autorizada de Archivos
- `src/components/layout/TopBar.tsx`
- `src/components/layout/UserAvatarMenu.tsx`
- `src/components/Sidebar.tsx`
- `src/components/ui/PageHeader.tsx`
- `src/pages/PasaporteUniversalView.tsx`
- `src/components/perfil/PasaporteVisual.tsx`
- `src/locales/es/passport.json`
- `src/locales/en/passport.json`
- `docs/sprints/sprint-27.md`
- `.agents/tasks/task-140.md`

## Criterios de Aceptación
- [x] `TopBar.tsx` ya no renderiza `LanguageSelector` (se gestiona limpiamente desde `UserAvatarMenu`).
- [x] En desktop (`md:`), la `TopBar` queda oculta (`md:hidden`), eliminando la duplicidad con la barra lateral.
- [x] En desktop (`md:`), `Sidebar.tsx` integra el menú del usuario (`UserAvatarMenu`) al pie con despliegue superior (`slide-in-from-bottom-2`), siguiendo el estándar de Notion/Linear/Slack.
- [x] En móvil (`< md`), la `TopBar` permanece visible con avatar y acciones de página.
- [x] `PasaporteUniversalView.tsx` ubica el botón "Compartir" en la cabecera superior derecha, accesible inmediatamente sin scroll.
- [x] La caja inferior redundante de compartir en `PasaporteUniversalView.tsx` se elimina para no duplicar elementos.
- [x] En `passport.json` (`es` y `en`), `"myPassport"` pasa a ser `"Tu Pasaporte"` / `"Your Passport"`.
- [x] `PasaporteVisual.tsx` admite `onShare?: () => void` y, si está presente y `connectionStatus === 'self'`, renderiza un botón accionable de compartir con icono `Share2`. Si no se pasa, muestra la píldora unificada y limpia con `Share2`.
- [x] `npm run lint` y `npm run build` pasan sin errores.
