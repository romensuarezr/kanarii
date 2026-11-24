# Executive Design Digest — T-139

## 🎯 Objetivo
1. Centralizar los iconos vectoriales oficiales de marcas (WhatsApp, Telegram, Instagram, LinkedIn, X) en `BrandIcons.tsx` eliminando SVGs inline duplicados. 2. Homogeneizar `ContactActions.tsx` con una variante `iconOnly` (botones circulares de 32x32px) para que Llamar y WhatsApp se integren sin texto en la cuadrícula de `PasaporteVisual.tsx`. 3. Incorporar Telegram como canal de contacto entre miembros en la ficha de datos personales (`FichaDatosPersona`), persistencia (`fichas.ts`), formulario (`FichaView.tsx`), privacidad (`AjustesView.tsx`) y pasaporte (`PasaporteVisual.tsx`). 4. Implementar `PasaporteShareModal.tsx` inspirado en `ShareSheet.tsx` de Leaderboard: botón de compartir universal con Web Share API nativa (L2), WhatsApp, Telegram, copiar enlace y descarga de imagen. 5. Habilitar en `firebase.json` el rewrite de `ogPassaporte` para la ruta `/p/*` para que los enlaces del Pasaporte Universal generen previsualizaciones Open Graph dinámicas en WhatsApp y Telegram.

## 🏛️ Decisiones de Arquitectura y Buenas Prácticas
- **Veredicto de Deliberación**: `N/A` (Rondas: 1)
- **Síntesis de Diseño**: Cierre de tarea sin deliberacion interactiva.
- **Prospección Scout**: `OMITIDO (sin research registrado / tarea heredada)`
- **Mensaje de Cierre**: `Merge branch 'feat/T-138-ux-perfil-privacidad-idioma' into main`

## 🛠️ Ajustes y Arbitraje de Deliberación
- Consenso inicial sin objeciones o cerrado en modo directo.

## 📁 Ficheros Modificados y Criterio de Alcance
- `.agents/tasks/_archived/task-138.md`
- `.agents/tasks/_archived/task-139.md`
- `docs/sprints/design-decisions/T-138-digest.md`
- `docs/sprints/sprint-27.md`
- `src/components/layout/UserAvatarMenu.tsx`
- `src/components/perfil/ContactActions.tsx`
- `src/components/perfil/FichaReadOnly.tsx`
- `src/components/perfil/PasaporteShareModal.tsx`
- `src/components/perfil/PasaporteVisual.tsx`
- `src/components/ui/BrandIcons.tsx`
- `src/lib/phone.ts`
- `src/lib/services/_types.ts`
- `src/lib/services/fichas.ts`
- `src/pages/AjustesView.tsx`
- `src/pages/FichaView.tsx`
- `src/pages/PasaporteComunitarioView.tsx`
- `src/pages/PasaporteUniversalView.tsx`
- `src/pages/PerfilView.tsx`
- `tests/unit/phone.test.ts`

## 🧠 Skills Declaradas y Aplicadas
- Ninguna skill adicional registrada.
