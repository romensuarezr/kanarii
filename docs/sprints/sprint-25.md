# Sprint 25 — 2026-08-03 → 2026-08-07

## Estado
🟡 En curso

## Tareas
| ID | Descripción | Tamaño | Estado | Task file |
|---|---|---|---|---|
| T-111 | Rediseñar la pantalla de entrada (`Welcome.tsx`) como Panel de Orientación ("Quién soy, quién está y qué nodos existen") | M | ✅ Completada | `.agents/tasks/task-111.md` |
| T-112 | Dividir Onboarding: Paso 1 Exprés (Nombre, 1 Saber, 1 Necesidad) vs Ampliación Opcional de Perfil (Formulario largo de `FichaView.tsx`) | M | ✅ Completada | `.agents/tasks/task-112.md` |
| T-113 | Enriquecer `<PasaporteVisual />` con Enlaces Clickables a Redes Sociales (Instagram/LinkedIn/Web) y Contacto Rápido (Teléfono/Email) | S | ⬜ Pendiente | `.agents/tasks/task-113.md` |
| T-114 | Enriquecer Tarjetas de Nodos en `ComunidadesView.tsx` exponiendo Propósito, Cuidadores (`adminUids`) y Necesidades del Espacio | S | ⬜ Pendiente | `.agents/tasks/task-114.md` |
| T-115 | Actualizar `docs/pages-map.md` con la nueva secuencia de entrada y estado de completitud de perfil | S | ⬜ Pendiente | `.agents/tasks/task-115.md` |

## Régimen Operativo del Sprint
- **Régimen**: Desatendida
- **Orden de Carriles (DAG de dependencias)**:
  - Carril 1: [T-113 → T-114]
  - Carril 2: [T-115]
- **Sellado en**: 2026-11-22

## Notas de planning
- Este sprint se centra en maximizar la utilidad real e inmediata para nuevos miembros reduciendo la fricción de entrada.
- Reutiliza 100% de la infraestructura y componentes existentes (`Welcome.tsx`, `ComunidadesView.tsx`, `PasaporteVisual.tsx`, `FichaView.tsx`).
- No introduce llamadas a Telegram en la landing de entrada (permanece accesible en el menú del Avatar).
- Research completado en `docs/sprints/sprint-25-research.md` (Gate Scout-First T-129 verificado).
