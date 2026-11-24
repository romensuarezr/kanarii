# Task T-143 — Tarjetas de Miembros Estilo Retribalize con Acciones Rápidas y Conexión

## Metadatos
- **ID**: T-143
- **Título**: Tarjetas de Miembros Estilo Retribalize con Acciones Rápidas y Conexión
- **Sprint**: Sprint 28
- **Tipo**: Feature UI / UX / Component
- **Estado**: Completada
- **Fecha fin**: 2026-11-24

## Contexto y Motivación
1. En Kanarii, la visualización de personas y miembros de la tribu actualmente utiliza tarjetas muy simplistas y heterogéneas entre el panel de bienvenida (`WelcomeHeroSections.tsx`) y la pestaña de miembros de la comunidad (`FichaComunidadView.tsx`).
2. Inspirados en el benchmark de Retribalize y la plataforma comunitaria abierta Hylo:
   - Las tarjetas de miembros deben ser el corazón visual del encuentro y la reciprocidad.
   - Deben estructurar: Avatar de alta calidad (o fallback de inicial), Rol en la comunidad, Ubicación con icono `MapPin`, Bio breve (2 líneas con `line-clamp-2`), y la Tríada de saberes/ofrendas y necesidades con tokens semánticos unificados.
   - Acciones rápidas:
     1. Botón "Conectar" / Contacto directo (Telegram / WhatsApp / modal).
     2. Botón "Ver Pasaporte" / perfil completo (`/p/:uid`).
3. Arquitectura DRY: Crear un componente unificado `MemberCard.tsx` en `src/components/members/MemberCard.tsx` reutilizable en toda la plataforma.
4. i18n First: Todo texto visible localizado simétricamente en español e inglés.

## Caja Autorizada de Archivos
- `src/components/members/MemberCard.tsx`
- `src/components/perfil/PasaporteModal.tsx`
- `src/components/onboarding/WelcomeHeroSections.tsx`
- `src/pages/FichaComunidadView.tsx`
- `src/locales/es/passport.json`
- `src/locales/en/passport.json`
- `src/locales/es/welcome.json`
- `src/locales/en/welcome.json`
- `docs/sprints/sprint-28.md`
- `.agents/tasks/task-143.md`

## Criterios de Aceptación
- [x] Componente `MemberCard` modular y tipado en `src/components/members/MemberCard.tsx` que implementa el diseño Retribalize/Hylo (avatar, rol, bio de 2 líneas, tags de saberes y necesidades, tokens `@theme`).
- [x] Acción de conexión rápida (abre canal de contacto o diálogo de conexión comunitaria) y botón de navegación al Pasaporte (`/p/:uid`).
- [x] Integración en `WelcomeHeroSections.tsx` (miembros destacados) y en `FichaComunidadView.tsx` (pestaña de miembros) reutilizando el mismo componente DRY.
- [x] Integración de `PasaporteModal` in situ para explorar el pasaporte completo sin salir del contexto de navegación.
- [x] Textos internacionalizados en español e inglés sin literales hardcodeados.
- [x] `npm run lint` y `npm run build` pasan sin errores (código 0).
