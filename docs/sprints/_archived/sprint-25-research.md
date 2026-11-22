# Research Sprint 25
> Fuente: Prospección Automática (Scout OSS) / SearXNG / Auditoría Local — 2026-11-21
> Tarea principal: Completar tareas pendientes de Sprint 25 (T-113, T-114, T-115).

## Descubrimientos Scout y Búsqueda Web Soberana (por tarea)

### T-113: Enriquecer `<PasaporteVisual />` (Enlaces sociales y contacto rápido)
- **Prospección Scout OSS:**
  - Librería examinada: `react-share` (v6.1.0, https://www.npmjs.com/package/react-share) — Botones de redes sociales.
  - Librería de parsers: `react-linkify` (https://www.npmjs.com/package/react-linkify) — Detección automática de URLs/emails en texto.
- **Búsqueda Web Soberana (SearXNG):**
  - Patrón de UI: *Social Links Profile Card* (https://21st.dev/@isaiahbjork/components/profile-card) — Tarjetas de perfil animadas con Lucide React & Framer Motion.
  - Componente de referencia: *Contact Profile Card* (Lucide + Tailwind, https://ui.watermelon.sh/components/card).
- **Decisión y Enfoque técnico:**
  - No añadir librerías pesadas. Reutilizar `lucide-react` (ya en el proyecto) para renderizar iconos (`Instagram`, `Linkedin`, `Globe`, `Phone`, `Mail`).
  - Extender la interfaz de usuario en `PasaporteVisual.tsx` añadiendo un bloque clickeable de redes sociales y botones de contacto rápido (`tel:` y `mailto:`).

### T-114: Enriquecer Tarjetas de Nodos en `ComunidadesView.tsx`
- **Búsqueda Web Soberana (SearXNG):**
  - Patrón de UI: *Card Component Variants in Tailwind* (https://empire-ui.com/blog/tailwind-card-variants) — Estructura modular de tarjetas con secciones compuestas.
  - Referencia de diseño: *Material Tailwind / Flowbite Cards* (https://www.material-tailwind.com/docs/react/card).
- **Decisión y Enfoque técnico:**
  - Extender el layout de tarjetas de comunidad en `ComunidadesView.tsx`.
  - Exponer `propósito` (resumen), `cuidadores` (`adminUids` resueltos a nombres) y `necesidades del espacio`.
  - Usar un subcomponente o badge visual con iconos de `lucide-react` para mantener coherencia con `FichaView`.

### T-115: Actualizar `docs/pages-map.md`
- **Investigación técnica:**
  - Tarea interna de sincronización de la mapa de páginas y flujo de navegación.
  - Actualizar `docs/pages-map.md` con las nuevas rutas y el estado de completitud de los perfiles tras Onboarding Exprés (T-112).

## Decisiones tomadas
- **Cero dependencias externas adicionales:** Reutilizar `lucide-react`, `motion/react` y Tailwind CSS ya existentes en el stack.
- **Formato de Enlaces:** Usar esquemas `mailto:` y `tel:` estándar para el contacto rápido.
