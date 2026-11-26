# Task T-166 — Script reproducible de datos demo con imágenes (`scripts/seed-demo.ts --seed / --clean`)

## Metadatos
- **ID**: T-166
- **Título**: Script reproducible de datos demo con imágenes (`scripts/seed-demo.ts --seed / --clean`)
- **Sprint**: Sprint 33
- **Tipo**: Tooling / DX / Demo Data
- **Estado**: Completada
- **Fecha inicio**: 2026-11-26

## Diseño macro aprobado en planning
- **Sprint / Fecha**: Sprint 33 / 2026-11-26
- **Decisiones e interfaces**:
  1. `scripts/seed-demo.ts`: script idempotente con flags `--seed` y `--clean` (autenticando vía Firebase Admin SDK si hay credenciales o Firestore REST API con `firebase-tools` token).
  2. Todos los documentos demo llevan ID `demo_*` y `isDemo: true`:
     - 4 comunidades/nodos con `bannerUrl` / `logoUrl` reales.
     - 6 personas (`profiles`, `fichas`, `community_members`) con `photoURL`, `headline` ≤ 45 chars y `membershipType` válido.
     - 4 eventos con `imageUrl`.
     - 3 residencias/estancias con `imageUrl`.
  3. `--clean` borra únicamente documentos con `isDemo == true` o ID `demo_*` sin tocar datos reales.
  4. `package.json`: añadir scripts `demo:seed` y `demo:clean`.

## Caja de archivos
- `scripts/seed-demo.ts`
- `package.json`

## Criterios de Aceptación
- [x] `npm run demo:seed` puebla datos demo con imágenes de forma idempotente.
- [x] `npm run demo:clean` elimina los datos demo sin afectar datos reales.
- [x] Verificado visualmente en `/dashboard` con imágenes cargadas.
