# Plan T-135: Crear menú de configuración y superficie de ajustes dedicada

## Objetivo
Crear la superficie `/ajustes` con `AjustesView.tsx`, configurada con secciones de privacidad de pasaporte/contacto, gestión de perfil y cuenta, e integrar el botón de acceso en el desplegable `UserAvatarMenu.tsx`.

## Rama propuesta
`feat/T-135-menu-ajustes-usuario`

## Archivos a modificar / crear
- `src/pages/AjustesView.tsx` (nuevo): vista principal de configuración organizada por secciones (Privacidad, Perfil/Ficha, Cuenta y Vinculaciones).
- `src/components/layout/UserAvatarMenu.tsx`: incorporar el botón "Ajustes" hacia `/ajustes`.
- `src/App.tsx`: registrar la ruta protegida `/ajustes`.
- `.agents/tasks/task-135.md`
- `docs/sprints/sprint-27.md`

## Pasos secuenciales
1. Implementar `src/pages/AjustesView.tsx` reutilizando `useAuth`, `useFicha`, `useToast` y `sincronizarPasaporte` para la edición de privacidad y control de cuenta.
2. Añadir la ruta `/ajustes` en `src/App.tsx` bajo `ProtectedRoute`.
3. Integrar la opción "Ajustes" con icono `Settings` en `UserAvatarMenu.tsx`.
4. Validar compilación con `npm run lint` y `npm run build`.

## Riesgos detectados
- Desincronización entre ajustes modificados y el documento de ficha: mitigado utilizando `saveFicha` y `sincronizarPasaporte` idéntico al panel de `FichaView`.

## Justificación de skills
- `implementar-feature-dry`: reutilizar lógica de guardado y modelos de privacidad existentes.
- `structure-guardian`: vista en `src/pages/` y menú en `src/components/layout/`.

## Conformidad con Diseño Macro
- 100% alineado con §1 y §6 de `docs/sprints/sprint-27-research.md`.
