# Executive Design Digest — T-138

## 🎯 Objetivo
Implementar los fixes de UX para Sprint 27 solicitados por el usuario y basados en pautas probadas de la industria: 1. Reestructurar `/perfil` mediante pestañas semánticas (Pasaporte / Ficha / Comunidades) para eliminar el scroll excesivo y mejorar la jerarquía visual. 2. Hacer que la visibilidad de privacidad se respete de forma estricta y transparente en `PasaporteVisual.tsx` y `FichaReadOnly.tsx`. 3. Mostrar solo iconos compactos para RRSS en el pasaporte, incorporando favicon automático para la web con fallback al icono de globo. 4. Robustecer el enlace y botón de WhatsApp en `phone.ts` y `ContactActions.tsx` con fallback resiliente. 5. Integrar el selector de idioma en `UserAvatarMenu.tsx`, aprovechando la persistencia de `i18next-browser-languagedetector` (`localStorage` con fallback a `navigator`).

## 🏛️ Decisiones de Arquitectura y Buenas Prácticas
- **Veredicto de Deliberación**: `N/A` (Rondas: 1)
- **Síntesis de Diseño**: Cierre de tarea sin deliberacion interactiva.
- **Prospección Scout**: `OMITIDO (sin research registrado / tarea heredada)`
- **Mensaje de Cierre**: `docs(sprint-27): marcar sprint 27 como completado`

## 🛠️ Ajustes y Arbitraje de Deliberación
- Consenso inicial sin objeciones o cerrado en modo directo.

## 📁 Ficheros Modificados y Criterio de Alcance
- `.agents/tasks/_archived/task-138.md`
- `docs/sprints/sprint-27.md`
- `src/components/layout/UserAvatarMenu.tsx`
- `src/components/perfil/ContactActions.tsx`
- `src/components/perfil/FichaReadOnly.tsx`
- `src/components/perfil/PasaporteVisual.tsx`
- `src/lib/phone.ts`
- `src/pages/PerfilView.tsx`
- `tests/unit/phone.test.ts`

## 🧠 Skills Declaradas y Aplicadas
- Ninguna skill adicional registrada.
