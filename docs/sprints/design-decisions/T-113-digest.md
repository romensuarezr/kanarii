# Executive Design Digest — T-113

## 🎯 Objetivo
Enriquecer la ficha y pasaporte comunitario (`PasaporteVisual.tsx` y `FichaView.tsx`) añadiendo enlaces clickables a redes sociales (Instagram, LinkedIn, Sitio Web/Link) y opciones de contacto rápido (Teléfono/WhatsApp y Email) para facilitar la conexión directa entre miembros de la tribu.

## 🏛️ Decisiones de Arquitectura y Buenas Prácticas
- **Veredicto de Deliberación**: `CONSENSO` (Rondas: 1)
- **Síntesis de Diseño**: El plan para T-113 respeta los límites de modificación de páginas (react-page-boundaries) actuando de forma contenida sobre `PasaporteVisual.tsx` y `FichaView.tsx`. La extensión de `UserPassport` con campos opcionales (`instagram`, `linkedin`, `website`, `phone`, `email`) y el uso de iconografía estándar de `lucide-react` aseguran compatibilidad hacia atrás sin acoplamientos innecesarios.

Para la persistencia en `FichaView.tsx`, se recomienda al implementador asegurar que los nuevos campos se incorporen de forma coherente en el esquema de validación (`fichaSchema`) y en los tipos de datos de persona, manteniendo la convención en inglés camelCase para Firestore y evitando clases de colores arbitrarios conforme a design-tokens-enforcement.
- **Prospección Scout**: `CONFORME (sprint-25-research.md)`
  - Prospección Scout OSS:**
  - Librería examinada: `react-share` (v6.1.0, https://www.npmjs.com/package/react-share) — Botones de redes sociales.
  - Librería de parsers: `react-linkify` (https://www.npmjs.com/package/react-linkify) — Detección automática de URLs/emails en texto.
  - Búsqueda Web Soberana (SearXNG):**
- **Mensaje de Cierre**: `docs(plan): update plan-draft for T-113`

## 🛠️ Ajustes y Arbitraje de Deliberación
- Consenso inicial sin objeciones o cerrado en modo directo.

## 📁 Ficheros Modificados y Criterio de Alcance
- `.agents/context/deliberation-T-113.json`
- `.agents/context/plan-draft.md`
- `.agents/tasks/_archived/task-113.md`
- `docs/sprints/sprint-25.md`
- `src/components/perfil/PasaporteVisual.tsx`
- `src/pages/FichaView.tsx`

## 🧠 Skills Declaradas y Aplicadas
- Ninguna skill adicional registrada.
