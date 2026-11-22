# Task-113: Enriquecer PasaporteVisual con Redes Sociales y Contacto Rápido

## Objetivo
Enriquecer la ficha y pasaporte comunitario (`PasaporteVisual.tsx` y `FichaView.tsx`) añadiendo enlaces clickables a redes sociales (Instagram, LinkedIn, Sitio Web/Link) y opciones de contacto rápido (Teléfono/WhatsApp y Email) para facilitar la conexión directa entre miembros de la tribu.

## Contexto técnico
- `src/components/perfil/PasaporteVisual.tsx` renderiza el pasaporte visual del miembro.
- `src/pages/FichaView.tsx` gestiona el formulario de edición de la ficha comunitaria.
- Se reutilizan los campos existentes en la interfaz de Firestore (`redesSociales`, `contacto`, `telefono`, `instagram`, `linkedin`, `website`) sin modificar backend ni esquemas de base de datos.

## Caja de archivos
Archivos autorizados para modificación:
- `src/components/perfil/PasaporteVisual.tsx`
- `src/pages/FichaView.tsx`

## Criterios de done
- [x] Añadir campos de edición para Redes Sociales (Instagram, LinkedIn, Sitio Web) y Teléfono/WhatsApp en `FichaView.tsx`.
- [x] Renderizar iconos y enlaces clickables a Redes Sociales (Instagram, LinkedIn, Web) en `PasaporteVisual.tsx`.
- [x] Renderizar botón/enlace de contacto rápido (WhatsApp/Teléfono e Email) respetando los ajustes de privacidad del miembro en `PasaporteVisual.tsx`.
- [x] Compilación sin errores TypeScript (`npx tsc --noEmit`).

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 25 — 2026-08-03 → 2026-08-07
- **Diseño y arquitectura aprobados por**: Humano (operador)
- **Decisiones e interfaces selladas**: 
  - Componente `PasaporteVisual.tsx` modificado para incluir sección `SocialLinks` con iconos `lucide-react` (`Instagram`, `LinkedIn`, `Globe`, `Phone`, `Mail`).
  - Interfaz `UserPassport` extendida con campo `socialLinks` opcional.
  - `FichaView.tsx` actualizado para capturar campos de redes sociales y contacto rápido.
  - Uso de esquemas `mailto:` y `tel:` para contacto respetando privacidad.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Estado de aprobación
> Este bloque lo rellena el agente durante /session-start.
> No modificar manualmente.

- [ ] Plan presentado al usuario (Fase 3.5)
- [x] APROBADO recibido
- [ ] Rama creada: feat/T-113-pasaporte-redes-contacto
- [ ] Lock activo: .agent-session.lock
- [x] Sesión cerrada correctamente
