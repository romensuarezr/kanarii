# Sprint 34 — 2026-11-27 → 2026-12-04

## Estado
🟡 En curso

## Tareas
| ID | Descripción | Tamaño | Estado | Dependencias | Task file |
|---|---|---|---|---|---|
| T-167 | Motor determinista de blindaje i18n con baseline y trinquete (`test:i18n`) | M | ⬜ Pendiente | — | .agents/tasks/task-167.md |
| T-168 | Internacionalización de Dashboard, Buscador ReTribalize y Navegación Global | M | ⬜ Pendiente | T-167 | .agents/tasks/task-168.md |
| T-169 | Internacionalización de Identidad, Perfil y Fichas (`FichaView`, `PerfilView`, `RegistroComunidadView`) | L | ⬜ Pendiente | T-167 | .agents/tasks/task-169.md |
| T-170 | Internacionalización de Gobernanza, Actas, Proyectos, Tareas y Soberanía (`governance`, `projects`, `marketplace`) | L | ⬜ Pendiente | T-167 | .agents/tasks/task-170.md |
| T-171 | Internacionalización de AdminPanel y Ajustes + Sellado de Baseline a 0 | M | ⬜ Pendiente | T-168, T-169, T-170 | .agents/tasks/task-171.md |

## Régimen Operativo del Sprint
- **Régimen**: Desatendida
- **Orden de Carriles (DAG de dependencias)**:
  - Carril 1: T-167 (Fundación determinista del validador y script `npm run test:i18n`)
  - Carril 2: T-168 (Dashboard + Buscador ReTribalize + UI global)
  - Carril 3: T-169 (Identidad, Fichas, Perfiles)
  - Carril 4: T-170 (Gobernanza, Proyectos, Soberanía / Marketplace)
  - Carril 5: T-171 (Admin, Ajustes y sellado final con Baseline = 0)
- **Sellado en**: 2026-11-27 (Aprobado por el operador en planning)

## Notas de planning
- Sprint mono-foco de erradicación total de deuda de idioma (i18n) a petición explícita del usuario.
- Cierre obligado con `i18n-baseline.json` igual a 0 violaciones.
- Se preserva estrictamente la frontera ADR-027: nombres propios de personas, nodos comunitarios y contenido libre generado por usuarios se mantienen en su idioma de origen sin tocar.
