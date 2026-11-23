# Task-138: UX de Perfil por Pestañas, Privacidad Efectiva, RRSS Favicon/Iconos, WhatsApp y Selector de Idioma

## Objetivo
Implementar los fixes de UX para Sprint 27 solicitados por el usuario y basados en pautas probadas de la industria:
1. Reestructurar `/perfil` mediante pestañas semánticas (Pasaporte / Ficha / Comunidades) para eliminar el scroll excesivo y mejorar la jerarquía visual.
2. Hacer que la visibilidad de privacidad se respete de forma estricta y transparente en `PasaporteVisual.tsx` y `FichaReadOnly.tsx`.
3. Mostrar solo iconos compactos para RRSS en el pasaporte, incorporando favicon automático para la web con fallback al icono de globo.
4. Robustecer el enlace y botón de WhatsApp en `phone.ts` y `ContactActions.tsx` con fallback resiliente.
5. Integrar el selector de idioma en `UserAvatarMenu.tsx`, aprovechando la persistencia de `i18next-browser-languagedetector` (`localStorage` con fallback a `navigator`).

## Contexto técnico y UX
- **UX Benchmark**: Estándares de Nielsen Norman Group y Baymard Institute recomiendan Segmented Controls / Tabs (máx 3-4) con cabecera de perfil compacta para evitar la fatiga de scroll.
- **Privacidad**: `isContactVisible` forzaba `true` si `connectionStatus === 'self'`, haciendo creer al usuario que los ajustes no se aplicaban.
- **WhatsApp**: `toWhatsAppUrl` fallaba silenciosamente si `isValid()` de `libphonenumber-js` daba false para números no normalizados.

## Caja de archivos
Archivos autorizados:
- `src/components/perfil/PasaporteVisual.tsx`
- `src/lib/phone.ts`
- `src/components/perfil/ContactActions.tsx`
- `src/pages/PerfilView.tsx`
- `src/components/perfil/FichaReadOnly.tsx`
- `src/components/layout/UserAvatarMenu.tsx`
- `.agents/tasks/task-138.md`
- `docs/sprints/sprint-27.md`

## Criterios de done
- [x] Privacidad respetada: `PasaporteVisual` y `FichaReadOnly` ocultan los datos marcados como privados según la configuración del usuario.
- [x] RRSS en Pasaporte: solo iconos limpios sin texto; enlace web muestra favicon con fallback a `Globe`.
- [x] WhatsApp: enlace generado con tolerancia/resiliencia ante números con o sin código de país, botón claramente visible.
- [x] Perfil en pestañas: `PerfilView` estructurado en pestañas (Pasaporte, Ficha, Comunidades) eliminando el scroll vertical masivo.
- [x] Selector de idioma: integrado en `UserAvatarMenu.tsx` respetando detección inicial del navegador y guardado en `localStorage`.
- [x] `npm run lint`, `npx vitest run tests/unit/phone.test.ts` y `npm run build` en verde.
