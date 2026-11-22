# Plan de Ejecución — T-113

## Objetivo
Implementar T-113: Enriquecer `<PasaporteVisual />` con enlaces clickables a redes sociales (Instagram, LinkedIn, Web) y contacto rápido (Teléfono/WhatsApp, Email).

## Caja de archivos autorizada
- `src/components/perfil/PasaporteVisual.tsx`
- `src/pages/FichaView.tsx`

## Pasos secuenciales
1. Extender `UserPassport` en `PasaporteVisual.tsx` y la interfaz de perfil con campos opcionales (`instagram`, `linkedin`, `website`, `phone`, `email`).
2. Renderizar iconos (`Instagram`, `Linkedin`, `Globe`, `Phone`, `Mail` de `lucide-react`) en `PasaporteVisual.tsx`.
3. Añadir campos de entrada en `FichaView.tsx` para persistir estos datos mediante `saveFicha`.
4. Verificar compilación con `npx tsc --noEmit`.
