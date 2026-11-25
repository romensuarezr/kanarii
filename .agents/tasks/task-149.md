# Task T-149 — Flujo de Solicitud y Conexión de Sinergias entre Miembros de la Red

## Metadatos
- **ID**: T-149
- **Título**: Flujo de Solicitud y Conexión de Sinergias entre Miembros de la Red
- **Sprint**: Sprint 29
- **Tipo**: Feature / Interacción / Mensajería
- **Estado**: Pendiente
- **Fecha inicio**: 2026-11-25

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 29 / 2026-11-25
- **Diseño y arquitectura aprobados por**: Humano / Operador
- **Decisiones e interfaces selladas**:
  1. Componente modal `ConnectModal.tsx` que se abre al pulsar "Conectar" en `MemberCard`, `SynergyCard` o `ResidenciasView`.
  2. Pre-rellenado automático de propuesta de reciprocidad basado en la coincidencia de dones y necesidades (Kin Maya, Diseño Humano e Isla).
  3. Creación de mensaje/hilo en el buzón o tablón comunitario con notificación al destinatario.
  4. Internacionalización simétrica en `src/locales/es/` y `src/locales/en/`.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Contexto y Motivación
Habilita la acción interactiva de conectar entre personas que arrojan alta compatibilidad energética y territorial en el Dashboard de Sinergias, cerrando el bucle de reciprocidad de Kanarii.

## Caja de archivos
- `src/components/sinergias/ConnectModal.tsx`
- `src/components/sinergias/SynergyCard.tsx`
- `src/components/perfil/MemberCard.tsx`
- `src/lib/services/tablon.ts`
- `src/locales/es/dashboard.json`
- `src/locales/en/dashboard.json`
- `docs/sprints/sprint-29.md`
- `.agents/tasks/task-149.md`

## Criterios de Aceptación
- [ ] `ConnectModal.tsx` integrado en `SynergyCard` y `MemberCard`.
- [ ] Envío de mensaje de intención con notificación al miembro destinatario.
- [ ] Textos internacionalizados en español e inglés.
- [ ] `npm run lint` y `npm run build` pasan limpios sin errores.
