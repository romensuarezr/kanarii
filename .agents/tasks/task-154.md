# Task T-154 — Rediseño del Dashboard con Sencillez Retribalize (Encontrar Nuevas Conexiones vs Crear Algo)

## Metadatos
- **ID**: T-154
- **Título**: Rediseño del Dashboard con Sencillez Retribalize (Encontrar Nuevas Conexiones vs Crear Algo)
- **Sprint**: Sprint 30
- **Tipo**: UX / Frontend / Dashboard
- **Estado**: Completada
- **Fecha inicio**: 2026-11-25

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 30 / 2026-11-25
- **Diseño y arquitectura aprobados por**: Humano / Operador
- **Decisiones e interfaces selladas**:
  1. En `src/pages/DashboardView.tsx`, alinear la cabecera / bienvenida a las dos intenciones fundamentales observadas en el benchmark de Retribalize:
     - **Acción 1: "Encontrar nuevas conexiones"** (`Find New Connections`):
       Botón de acción primario destacado que activa el descubrimiento y filtrado de sinergias comunitarias en Canarias (afinidad territorial por isla, resonancia energética Kin Maya & Diseño Humano, y complementariedad de dones/necesidades).
     - **Acción 2: "Crear algo"** (`Create New`):
       Botón de acción que abre un menú modal / selector intuitivo con las 3 formas canónicas de sembrar en la red:
       - **Iniciar un Nodo / Tribu**: Crear una nueva comunidad o nodo en una isla de Canarias (`/nueva-comunidad`).
       - **Organizar un Encuentro / Evento**: Convocar una reunión, asamblea o taller en el archipiélago.
       - **Publicar una Residencia / Estancia**: Ofrecer acogida temporal o voluntariado en una finca, ecoaldea o proyecto.
  2. Estructura del Dashboard en dos niveles limpios:
     - Nivel Superior: Hero de orientación con las dos acciones directas ("Encontrar nuevas conexiones" y "Crear algo") y el selector rápido de entidades (Personas, Nodos, Eventos, Residencias).
     - Nivel Inferior: Feed determinista de sinergias calculadas para el usuario con tarjetas estilo Retribalize/Hylo (`MemberCard`), puntos de resonancia y llamada a conectar.
  3. Modal interactivo `CreateNewModal` reutilizable y accesible con persistencia de borradores.
  4. Internacionalización completa en `src/locales/es/dashboard.json` y `src/locales/en/dashboard.json`.
- **Veredicto de diseño macro**: `[APROBADO_EN_PLANNING]`

## Contexto y Motivación
Tras contrastar directamente la interfaz activa de Retribalize.io (`https://retribalize.io/dashboard?tab=connect`), se confirma que la sencillez de su UX radica en concentrar la llamada a la acción en dos únicos caminos esenciales: o bien el usuario entra a **encontrar conexiones afines**, o bien entra a **crear una iniciativa** (nodo, evento, residencia). Toda complejidad administrativa queda subordinada a estas dos intenciones.

## Caja de archivos
- `src/pages/DashboardView.tsx`
- `src/components/dashboard/CreateNewModal.tsx`
- `src/locales/es/dashboard.json`
- `src/locales/en/dashboard.json`
- `docs/sprints/sprint-30.md`
- `.agents/tasks/task-154.md`

## Criterios de Aceptación
- [x] Cabecera de `DashboardView.tsx` rediseñada con los dos botones de acción primarios: "Encontrar nuevas conexiones" y "Crear algo".
- [x] Modal o menú desplegable para "Crear algo" con las 3 opciones de la red: Iniciar un Nodo/Tribu, Organizar un Encuentro y Publicar una Residencia/Estancia.
- [x] Filtro por tipo de conexión (Personas, Nodos, Eventos, Residencias) integrado orgánicamente.
- [x] Estilo visual sobrio, cálido y minimalista basado en tokens semánticos de `@theme`.
- [x] Cadenas traducidas en español e inglés sin valores hardcodeados.
- [x] `npm run lint` y `npm run build` pasan limpios sin errores.
