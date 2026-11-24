# Task T-142 — Home Pública Retribalizada y Enlace Directo a Pedagogía/Demos

## Metadatos
- **ID**: T-142
- **Título**: Home Pública Retribalizada y Enlace Directo a Pedagogía/Demos (con i18n estricto)
- **Sprint**: Sprint 28
- **Tipo**: Feature UI / UX / i18n
- **Estado**: Completada
- **Fecha fin**: 2026-11-24

## Contexto y Motivación
1. **Home Pública Actual**: En `Welcome.tsx`, los visitantes no autenticados solo ven un hero minimalista centrado con 3 botones sueltos, sin cabecera clara, sin propuesta de valor estructurada ni navegación visible hacia la filosofía/demos.
2. **Estándar Retribalize / Prosocial**:
   - Cabecera pública con logo, enlaces a *Cómo funciona* (Tour) y botón de *Iniciar sesión* / *Unirse*.
   - Hero moderno con propuesta contundente ("Inteligencia colectiva y encuentro para comunidades conscientes") y 2 CTAs principales: "Unirse a la tribu" (`/contexto`) y "Ver cómo funciona" (`/tour`).
   - Pilares de valor claros inspirados en la vida comunitaria real (Gobernanza sociocrática, Tríada de saberes/necesidades, Economía soberana).
3. **Corrección Pedagógica**: En las tarjetas pedagógicas del panel de orientación (`WelcomeHeroSections.tsx`), el botón "Abrir Animación" siempre dirigía a la intro del tour ignorando el ID específico de la animación. Debe aceptar y pasar `?module=` o `?step=` para que `KanariiTourPage.tsx` abra directamente el módulo animado correspondiente (ej. a2 Cruce de ofrendas, a4 Gobernanza, etc.).
4. **i18n First**: Toda la interfaz y literales añadidos o modificados deben estar estrictamente localizados tanto en español (`src/locales/es/welcome.json`) como en inglés (`src/locales/en/welcome.json`), cumpliendo la regla de no generar deuda técnica de internacionalización.

## Caja Autorizada de Archivos
- `src/pages/Welcome.tsx`
- `src/components/welcome/`
- `src/pages/KanariiTourPage.tsx`
- `src/pages/ComunidadesView.tsx`
- `src/App.tsx`
- `firestore.rules`
- `docs/adrs/ADR-005-visibilidad-comunidades-lectura-autenticada.md`
- `docs/adrs/ADR-027-apertura-publica-directorio-comunidades.md`
- `src/locales/es/welcome.json`
- `src/locales/en/welcome.json`
- `docs/sprints/sprint-28.md`
- `.agents/tasks/task-142.md`

## Criterios de Aceptación
- [x] En la home pública (`/` sin sesión), el visitante ve una cabecera con navegación limpia (Logo, "Cómo funciona", selector de idioma, "Iniciar sesión").
- [x] El Hero público ofrece propuesta clara y 2 CTAs ("Unirse a la tribu" → `/contexto` y "Ver cómo funciona" → `/tour`).
- [x] Se presentan 3 pilares o bloques de valor comunitario accesibles sin login.
- [x] Al pulsar "Abrir Animación" en cualquier tarjeta pedagógica del panel logueado, `KanariiTourPage` carga directamente el módulo interactivo seleccionado (`?module=<id>`).
- [x] Todo el texto nuevo en la Home y componentes de Welcome cuenta con sus claves correspondientes en `welcome.json` en español e inglés.
- [x] Directorio de comunidades `/comunidades` accesible públicamente sin requerir login para visualización (ADR-027 supercede ADR-005).
- [x] Reglas de Firestore permiten lectura anónima de comunidades marcadas como `esPublica == true`.
- [x] Si un visitante no autenticado intenta solicitar acceso o canjear código en `/comunidades`, se activa `AuthGateModal` para invitar al registro/login.
- [x] `npm run lint` y `npm run build` pasan limpios sin errores.
