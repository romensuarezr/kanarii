# Sprint 30 — Research & Descubrimientos Técnicos

## Objetivo del Sprint
Resolver la experiencia móvil y de bienvenida a Kanarii alineándola con el flujo simple de Retribalize:
1. Erradicar la advertencia de claves duplicadas de React mediante deduplicación determinista en `calcularSinergiasMultiples`.
2. Unificar la identidad visual sustituyendo `/icono-palmera.svg` por el logotipo oficial de Kanarii en `TopBar` y `Sidebar`, y reenfocar el copy institucional a la **Red Viva Canarias**.
3. Reestructurar la navegación móvil (`BottomNav.tsx`) con arquitectura de 2 capas coherente con desktop.
4. Simplificar el `DashboardView.tsx` en dos secciones claras con dos CTAs de acción directa para arrancar la interacción.

---

## Descubrimientos Scout (por tarea)

### T-151: Deduplicación Determinista de Sinergias y Fichas (Fix React Unique Key)
- **Diagnóstico**: La advertencia `Encountered two children with the same key, 'Ma5KgZgD7RYWl9jDjzBeGnFzeno2'` se produce porque `calcularSinergiasMultiples` procesa `allFichas` sin verificar unicidad previa del `userId`. Si un usuario tiene múltiples registros de comunidad o aparece en varias listas, se generan dos `SynergyMatch` con idéntico `targetUserId`, colisionando en el `key={match.targetUserId}` de `DashboardView.tsx`.
- **Estrategia técnica**:
  - Implementar un `Set<string>` en `calcularSinergiasMultiples` para descartar perfiles con el mismo `fUserId`.
  - Asegurar un fallback compuesto seguro en la vista: `key={match.targetUserId || match.targetFicha?.id || idx}`.
- **Veredicto Scout**: Desarrollo a medida nativo justificado ($0 dependencias).

### T-152: Unificación de Marca y Enfoque Territorial Canarias (Logo Oficial y Red Viva Canarias)
- **Diagnóstico**: En `src/components/layout/TopBar.tsx` (móvil) y `src/components/Sidebar.tsx` (desktop), la cabecera carga `/icono-palmera.svg` en lugar de `/kanarii-logo.svg`, generando inconsistencia gráfica con el resto de la plataforma. Además, las etiquetas dicen "Red Global", cuando la propuesta comunitaria está orientada específicamente al archipiélago canario.
- **Estrategia técnica**:
  - Reemplazar `/icono-palmera.svg` por `/kanarii-logo.svg` en `TopBar.tsx` y `Sidebar.tsx`.
  - Actualizar `common.json` (es/en) y `Sidebar.tsx`: `"globalNetwork"` pasa a `"Red Canarias"` / `"Canary Network"`.
- **Veredicto Scout**: Ajuste directo de activos y assets vectoriales locales ($0 dependencias).

### T-153: Navegación Móvil de 2 Capas Coherente con Web (`BottomNav.tsx`)
- **Diagnóstico**: La versión móvil en `BottomNav.tsx` no distinguía si el usuario estaba en la Capa 1 (Red territorial) o Capa 2 (interior de un nodo/comunidad), omitiendo los accesos directos a Eventos, Residencias y Nodos.
- **Estrategia técnica**:
  - Detectar reactivamente si `isNodeSpace` está activo (cuando hay `currentCommunityId` y la ruta pertenece a una comunidad).
  - En Capa 1: [Inicio/Sinergias, Nodos, Eventos, Residencias, Más/Perfil].
  - En Capa 2: [Tablón, Ficha Nodo, Tareas/Proyectos, Volver a Red Canarias].
- **Veredicto Scout**: Desarrollo a medida sobre `BottomNav.tsx` y `navigationConfig` existente.

### T-154: Rediseño del Dashboard con Sencillez Retribalize (Encontrar Nuevas Conexiones vs Crear Algo)
- **Diagnóstico**: Contrastada la interfaz en vivo de Retribalize (`https://retribalize.io/dashboard?tab=connect`), se constata que la arquitectura de acción de su dashboard se asienta sobre dos intenciones madre:
  1. **"Find New Connections"** (Encontrar nuevas conexiones): el botón primario que canaliza el descubrimiento de personas, tribus, eventos y residencias según resonancia y afinidad.
  2. **"Create New"** (Crear algo): botón de acción directa que despliega las 3 formas nucleares de convocar en la red:
     - **Tribu / Nodo**: Iniciar una nueva comunidad ("Start a new tribe").
     - **Evento**: Organizar un encuentro online o presencial ("Host a gathering").
     - **Residencia**: Ofrecer o publicar un lugar para estancias/voluntariado ("List a place for people to stay").
     - Borradores integrados: nada se pierde si se cancela a medio proceso.
- **Estrategia técnica para Kanarii**:
  - Reorganizar la cabecera de `DashboardView.tsx` con estas dos acciones nucleares de bienvenida:
    1. **"Encontrar nuevas conexiones"** (botón de acción principal destacado para activar sinergias en Canarias).
    2. **"Crear algo"** (botón que abre `CreateNewModal` con las opciones: *Crear un Nodo*, *Convocar un Encuentro*, *Publicar una Estancia/Residencia*).
  - Incluir el selector rápido de categorías tipo Retribalize: Personas, Nodos, Eventos, Residencias.
  - Mantener la información del Kin del día y el grid determinista de sinergias calculado según isla, Kin Maya y Diseño Humano.
- **Veredicto Scout**: Componente modular `CreateNewModal.tsx`, simplificación en `DashboardView.tsx` y tokens semánticos del `@theme`.
