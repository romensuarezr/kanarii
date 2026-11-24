# Task T-144 — Dashboard de Encuentro (/dashboard) y Tarjeta de Sinergia Determinista (Isla + Kin/HD + Tríada)

## Metadatos
- **ID**: T-144
- **Título**: Dashboard de Encuentro (/dashboard) y Tarjeta de Sinergia Determinista (Isla + Kin/HD + Tríada)
- **Sprint**: Sprint 28
- **Tipo**: Feature UI / UX / Engine
- **Estado**: Completada
- **Fecha fin**: 2026-11-24

## Contexto y Motivación
1. Tras el análisis e ingeniería inversa de Retribalize.io (`tab=connect`, `Browse All`), la experiencia central de un usuario autenticado al ingresar a la plataforma debe ser el **Encuentro Humano y la Generación de Sinergias**.
2. A diferencia de Retribalize (que usa textos genéricos opacos generados por LLM), en Kanarii el match es **determinista, transparente y multifactorial**:
   - **Proximidad Insular / Geográfica**: Detección de misma isla o red global canaria.
   - **Resonancia Astrológica / Energética**: Kin Maya (Sellos, Tonos, Oráculo de relaciones: análogo, antípoda, oculto) y Diseño Humano (interacción entre tipos, autoridades y canales electromagnéticos calculados por `cruzarMiembros`).
   - **Tríada de Reciprocidad**: Cruce entre los dones/ofrendas que uno aporta y las necesidades/búsquedas del otro.
3. El destino por defecto de un usuario autenticado debe ser `/dashboard`, dejando `/` exclusivamente para la Landing pública abierta de visitantes.

## Caja Autorizada de Archivos
- `src/pages/DashboardView.tsx`
- `src/components/sinergias/SynergyCard.tsx`
- `src/lib/sinergias.ts` (función determinista de cálculo de match unificado)
- `src/App.tsx`
- `src/locales/es/dashboard.json`
- `src/locales/en/dashboard.json`
- `src/i18n/index.ts`
- `src/components/perfil/PasaporteModal.tsx`
- `src/config/navigation.ts`
- `docs/sprints/sprint-28.md`
- `.agents/tasks/task-144.md`

## Criterios de Aceptación
- [x] Motor determinista `calcularSinergia(userFicha, targetFicha)` en `src/lib/sinergias.ts` que combina ubicación insular, resonancia energética (Kin Maya + Diseño Humano) y complementariedad de la tríada (ofrece ⇄ busca).
- [x] Componente `SynergyCard.tsx` visualmente enriquecido con badges semánticos (`@theme`), puntuación de sinergia, razones explicativas del match, botón "Ver Pasaporte" (abre `PasaporteModal` in situ) y botón de contacto directo.
- [x] Vista `DashboardView.tsx` (`/dashboard`) con cabecera personalizada (saludo, Kin del día de `kinDeHoy()`, isla del usuario), barra de filtros ("Todas", "En mi isla", "Resonancia energética", "Complementarios de tríada") y feed de afinidades.
- [x] Enrutamiento en `App.tsx`: visita a `/` redirige a `/dashboard` si `appUser !== null`. Ruta `/dashboard` accesible y con navegación disponible.
- [x] Textos internacionalizados en español e inglés sin literales hardcodeados.
- [x] `npm run lint` y `npm run build` pasan limpios sin errores.
