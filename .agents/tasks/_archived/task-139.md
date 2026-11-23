# Task-139: Centralización de BrandIcons, ContactActions icon-only, soporte de contacto Telegram, PasaporteShareModal (estilo Leaderboard) y OG rewrite para /p/*

## Objetivo
1. Centralizar los iconos vectoriales oficiales de marcas (WhatsApp, Telegram, Instagram, LinkedIn, X) en `BrandIcons.tsx` eliminando SVGs inline duplicados.
2. Homogeneizar `ContactActions.tsx` con una variante `iconOnly` (botones circulares de 32x32px) para que Llamar y WhatsApp se integren sin texto en la cuadrícula de `PasaporteVisual.tsx`.
3. Incorporar Telegram como canal de contacto entre miembros en la ficha de datos personales (`FichaDatosPersona`), persistencia (`fichas.ts`), formulario (`FichaView.tsx`), privacidad (`AjustesView.tsx`) y pasaporte (`PasaporteVisual.tsx`).
4. Implementar `PasaporteShareModal.tsx` inspirado en `ShareSheet.tsx` de Leaderboard: botón de compartir universal con Web Share API nativa (L2), WhatsApp, Telegram, copiar enlace y descarga de imagen.
5. Habilitar en `firebase.json` el rewrite de `ogPassaporte` para la ruta `/p/*` para que los enlaces del Pasaporte Universal generen previsualizaciones Open Graph dinámicas en WhatsApp y Telegram.

## Contexto técnico y UX
- **Leaderboard benchmark**: Patrón `ShareSheet` con Web Share API + fallback a canales de mensajería y portapapeles.
- **DRY Architecture**: Eliminación de SVGs repetidos y unificación de identidades visuales.

## Caja de archivos
Archivos autorizados:
- `src/components/ui/BrandIcons.tsx`
- `src/components/perfil/ContactActions.tsx`
- `src/components/perfil/PasaporteVisual.tsx`
- `src/components/perfil/PasaporteShareModal.tsx`
- `src/pages/PasaporteUniversalView.tsx`
- `src/pages/PasaporteComunitarioView.tsx`
- `src/lib/services/_types.ts`
- `src/lib/services/fichas.ts`
- `src/pages/FichaView.tsx`
- `src/pages/AjustesView.tsx`
- `src/components/perfil/FichaReadOnly.tsx`
- `src/pages/PerfilView.tsx`
- `firebase.json`
- `.agents/tasks/task-139.md`
- `docs/sprints/sprint-27.md`

## Criterios de done
- [x] `BrandIcons.tsx` creado y consumido en `ContactActions`, `PasaporteVisual`, `PasaporteShareModal`, etc.
- [x] `ContactActions` soporta `iconOnly={true}` para alinearse como círculos de 32x32px sin texto en `PasaporteVisual`.
- [x] Telegram soportado como campo de contacto en Ficha, validado en `fichas.ts`, editable en `FichaView`, configurable en `AjustesView` y visible en `PasaporteVisual`.
- [x] `PasaporteShareModal` implementado en `PasaporteUniversalView` sustituyendo la sección estática anterior.
- [x] Metatags dinámicos y share intents universales operativos para WhatsApp y Telegram.
- [x] `npm run lint`, `npx vitest run tests/unit/phone.test.ts` y `npm run build` en verde.
