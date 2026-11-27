# Research Sprint 34 — Blindaje Determinista de Internacionalización y Baseline Cero

> **Fecha**: 2026-11-27  
> **Fuente**: Investigación autónoma con **SearXNG Soberano** + Auditoría AST interna del codebase (`scripts/check-i18n-visible-literals.ts`, `src/types/i18next.d.ts`)  
> **Meta del Sprint**: Erradicar el copy hardcodeado en toda la aplicación, instalar el motor de trinquete determinista y cerrar el sprint con `i18n-baseline = 0`.

---

## Descubrimientos Scout (por tarea)

### T-167 — Motor de blindaje determinista con baseline y trinquete
- **Alternativas exploradas**:
  - `i18next-cli lint`: Herramienta upstream para reporte de strings no envueltos en `t()`.
  - `ts-morph` / `typescript compiler API`: Motor ya integrado en `scripts/check-i18n-visible-literals.ts`.
- **Decisión**: Desarrollo a medida optimizado sobre el script TypeScript existente (`scripts/check-i18n-visible-literals.ts`). Se extiende con `--generate-baseline`, `--check-baseline`, y `--ratchet` para evaluar el delta de violaciones. Añadir script npm `npm run test:i18n` que combine `check-i18n-keys.ts` (paridad de diccionarios) y `check-i18n-visible-literals.ts` (AST scan con fallo determinista exit 1).

### T-168 — Internacionalización de Dashboard, Buscador ReTribalize y Navegación Global
- **Alternativas exploradas**: Creación de namespaces ad-hoc vs consolidar en `dashboard.json` y `common.json`.
- **Decisión**: Ampliar `src/locales/es/dashboard.json` y `src/locales/en/dashboard.json` para el buscador ReTribalize (pestañas, selectores, contadores y tarjetas `ExploreEntityCard`). Traducir empty states y textos globales en `common.json`.

### T-169 — Internacionalización de Identidad, Perfil y Fichas
- **Alternativas exploradas**: Conservar lógica de pasaporte/fichas separada.
- **Decisión**: Extraer literales de `FichaView.tsx`, `FichaPreview.tsx`, `PerfilView.tsx`, `RegistroComunidadView.tsx`, `CruceView.tsx` y `TelegramLinkModal.tsx` mapeándolos en `passport.json` y `communities.json`. Respetar frontera ADR-027: datos generados por usuarios (bio, dones, notas) conservan su idioma de origen; solo se traducen etiquetas, títulos, botones y placeholders.

### T-170 — Internacionalización de Gobernanza, Actas, Proyectos, Tareas y Soberanía
- **Alternativas exploradas**: Unificar todo en un archivo gigante vs namespaces modulares.
- **Decisión**: Crear 3 nuevos namespaces modulares:
  - `src/locales/{es,en}/governance.json` (Propuestas, wizards, actas, votaciones).
  - `src/locales/{es,en}/projects.json` (Iniciativas, proyectos, columnas Kanban, tareas).
  - `src/locales/{es,en}/marketplace.json` (Tablón soberano, trueque, ofertas, contraofertas).
  Registrarlos en `src/i18n/index.ts` y tiparlos en `src/types/i18next.d.ts`.

### T-171 — Internacionalización de AdminPanel y Ajustes + Sellado de Baseline a 0
- **Alternativas exploradas**: Mantener baseline tolerante a warnings residuales.
- **Decisión**: Crear `src/locales/{es,en}/admin.json` y `settings.json`. Traducir `AdminPanel.tsx`, `AdminSolicitudesView.tsx`, `ConfiguracionComunidadPanel.tsx`, `AjustesView.tsx` y `KanariiTourPage.tsx`. Congelar y validar el trinquete con `i18n-baseline.json` en exactamente **0** literales.

---

## Investigación Técnica y Fuentes

### T-167
- **Query SearXNG**: `react i18next missing translation lint ast ratchet baseline`
- **Resultados analizados**:
  - [Missing Translations in i18next: Fallbacks, Detection & Fixes](http:///go/v1/AS1gCGs_uzDtawmKxAHRtfnuQ0mcAMuy0I8uSI93gb-tzbvoFfj-RE4KiI5dwP-G1vqCK4US3i4P4_kBHdKJnTt5Iw_VFzoW_vhflKbjiNBuH6NHpwJ_20cWyb1w9onb9yw0QU4AqTsPhISF2qTun-gUqJSTHrl0Yb_3HgCA8Pb-Nb8kMOYVKzsKuvUTV9ZqS5NJMLlSTuaN_1Ta-BzAuUuWDg)
  - [Contentful Field Editors Lint Suppression](https://github.com/contentful/field-editors)
- **Patrón Adoptado**: Mecanismo ratchet (trinquete): el validador compara las ocurrencias contra una instantánea `i18n-baseline.json`. Si el número de literales no permitidos supera el baseline o si se introducen en archivos no registrados, el proceso falla con código de salida 1.

### T-168 / T-169 / T-170 / T-171
- **Activos Internos**: Regla `.agents/rules/i18n-enforcement.md`.
- **Frontera de traducción**:
  - UI fija (acciones, labels, headings, helpers, placeholders) $\rightarrow$ `t(...)` con claves semánticas e interpolación nombrada.
  - Contenido dinámico (nombre de proyecto real, título de propuesta introducido por usuario, descripciones libres) $\rightarrow$ directo en su estado original sin forzar traducción.
