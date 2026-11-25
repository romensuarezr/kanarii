# Task T-146 — Navegación de 2 Capas en Sidebar (Red Global vs. Espacio de Nodo) y Convocatorias de Eventos y Residencias

## Metadatos
- **ID**: T-146
- **Título**: Navegación de 2 Capas en Sidebar (Red Global vs. Espacio de Nodo con 'Volver a la Red') y Convocatorias de Eventos y Residencias
- **Sprint**: Sprint 28
- **Tipo**: Arquitectura UI / Navegación / Feature
- **Estado**: Completada
- **Fecha inicio**: 2026-11-25
- **Fecha fin**: 2026-11-25

## Contexto y Motivación
1. **Arquitectura en 2 Capas**:
   - Siguiendo la visión y benchmarking con Retribalize.io y el ADR-027:
     - **Capa 1: Red Global**: Conexión entre personas, nodos, sinergias y convocatorias abiertas. El usuario navega `/dashboard` (Sinergias), `/comunidades` (Nodos), `/eventos` (Encuentros y Talleres), `/residencias` (Colivings y Voluntariado) y `/ficha` (Mi Pasaporte).
     - **Capa 2: Espacio Operativo del Nodo**: Al pulsar *"🌿 Entrar al Espacio del Nodo"*, se activa el slug del nodo en `ComunidadContext`. El `Sidebar` conmuta a la vista operativa del nodo, mostrando el nombre del nodo activo y un botón persistente superior **"← Volver a la Red"** (que resetea el contexto del nodo y redirige al Dashboard global).
     - Las herramientas operativas del nodo (Tablón, Círculos/Tareas, Gobernanza S3, Actas, Calendario interno, Proyectos, Soberanía/Almacén) pertenecen a la Capa 2.
2. **Convocatorias de Eventos y Residencias**:
   - Crear `/eventos` (`EventosView.tsx`) y `/residencias` (`ResidenciasView.tsx`) para listar convocatorias abiertas en los nodos de la red con diseño armónico (cards con fechas, anfitrión, isla/ubicación y botón de acción/inscripción).
3. **i18n & Design Tokens**:
   - Utilizar exclusivamente tokens semánticos `@theme` (`bg-bg-page`, `bg-bg-surface`, `border-border`, etc.).
   - Textos completamente internacionalizados en `src/locales/es/` y `src/locales/en/`.

## Caja Autorizada de Archivos
- `src/components/Sidebar.tsx`
- `src/contexts/ComunidadContext.tsx`
- `src/config/navigation.ts`
- `src/App.tsx`
- `src/pages/EventosView.tsx`
- `src/pages/ResidenciasView.tsx`
- `src/locales/es/common.json`
- `src/locales/en/common.json`
- `docs/sprints/sprint-28.md`
- `.agents/tasks/task-146.md`

## Criterios de Aceptación
- [x] `ComunidadContext` soporta de manera limpia la salida a la Red Global (`exitCommunitySpace()`), permitiendo `currentCommunityId = undefined` sin forzar la primera comunidad si el usuario ha salido intencionalmente.
- [x] `Sidebar.tsx` implementa visualmente la navegación en 2 Capas:
  - En **Capa 1 (Red Global)**: navegación hacia `/dashboard` (Sinergias), `/comunidades` (Nodos), `/eventos` (Eventos), `/residencias` (Residencias) y `/ficha` (Mi Pasaporte).
  - En **Capa 2 (Espacio del Nodo)**: badge con nombre del nodo activo + botón persistente **"← Volver a la Red"** (`exitCommunitySpace()`) + accesos a Tablón, Gobernanza, Tareas, Actas, Calendario, Proyectos y Soberanía.
- [x] Rutas `/eventos` y `/residencias` operativas en `App.tsx` con vistas atractivas y datos reales/mockeados de los nodos.
- [x] Cumplimiento estricto de design tokens semánticos `@theme`.
- [x] Internacionalización completa y simétrica en español e inglés.
- [x] `npm run lint` y `npm run build` pasan limpios sin errores.
