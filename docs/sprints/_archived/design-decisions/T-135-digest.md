# Executive Design Digest — T-135

## 🎯 Objetivo
Implementar la página dedicada de configuración `/ajustes` (`AjustesView.tsx`) e integrar el acceso directo "Ajustes" en `UserAvatarMenu.tsx` con navegación a las secciones de privacidad, redes/contacto, cuenta y perfil.

## 🏛️ Decisiones de Arquitectura y Buenas Prácticas
- **Veredicto de Deliberación**: `CONSENSO` (Rondas: 1)
- **Síntesis de Diseño**: El plan T-135 respeta estrictamente la arquitectura de 3 capas y las fronteras de sustitución de Kanarii. Reutiliza los hooks existentes ('useAuth', 'useFicha', 'useToast') y delega la persistencia en las funciones de servicio consolidadas ('saveFicha', 'sincronizarPasaporte'), evitando duplicación de lógica y accesos directos a Firestore desde la UI. La organización de archivos en 'src/pages/' y 'src/components/layout/' cumple las normas de estructura y el registro en 'App.tsx' asegura la protección de ruta.
- **Prospección Scout**: `OMITIDO (sin research registrado / tarea heredada)`
- **Mensaje de Cierre**: `Merge branch 'feat/T-134-privacidad-selectores-rrss' into main`

## 🛠️ Ajustes y Arbitraje de Deliberación
- Consenso inicial sin objeciones o cerrado en modo directo.

## 📁 Ficheros Modificados y Criterio de Alcance
- `.agents/context/deliberation-T-134.json`
- `.agents/context/deliberation-T-135.json`
- `.agents/context/plan-draft.md`
- `.agents/tasks/_archived/task-134.md`
- `.agents/tasks/_archived/task-135.md`
- `.agents/tasks/task-134.md`
- `.agents/tasks/task-135.md`
- `docs/sprints/design-decisions/T-134-digest.md`
- `docs/sprints/design-decisions/T-134-raw.json`
- `docs/sprints/sprint-27.md`
- `src/App.tsx`
- `src/components/layout/UserAvatarMenu.tsx`
- `src/components/perfil/PasaporteVisual.tsx`
- `src/lib/services/_types.ts`
- `src/pages/AjustesView.tsx`
- `src/pages/FichaView.tsx`

## 🧠 Skills Declaradas y Aplicadas
- `implementar-feature-dry`
- `structure-guardian`
