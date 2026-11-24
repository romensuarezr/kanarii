# ADR 027: Apertura Pública del Directorio de Comunidades y Fichas de Nodo

**Estado:** Accepted  
**Fecha:** 2026-11-24  
**Contexto:** Kanarii - Descubrimiento y Onboarding Comunitario (Sprint 28 / T-142)  
**Supercede:** [ADR-005](./ADR-005-visibilidad-comunidades-lectura-autenticada.md)

---

## Contexto

El ADR-005 restringió la lectura de la colección `/comunidades` únicamente a peticiones autenticadas (`request.auth != null`) para proteger los UIDs de administradores de raspados automatizados antes del lanzamiento.

Sin embargo, en el diseño de onboarding y navegación pública (patrones observados en Retribalize.io y plataformas sociocráticas de red), los visitantes que llegan a la Home pública necesitan explorar qué comunidades, ecoaldeas y nodos activos existen antes de decidir crear una cuenta.
Tener la ruta `/comunidades` bajo `ProtectedRoute` generaba una experiencia rota para visitantes no autenticados, redirigiéndolos de inmediato a la Home sin explicación.

## Decisión

1. **Ruta `/comunidades` pública**:
   - Se elimina la envoltura `<ProtectedRoute>` de la ruta `/comunidades` en `src/App.tsx`.
   - Cualquier visitante puede acceder al catálogo de comunidades públicas.

2. **Seguridad de Firestore (`firestore.rules`)**:
   - Se permite la lectura anónima de documentos de comunidades siempre que el nodo esté explícitamente configurado como público:
     ```javascript
     match /comunidades/{communityId} {
       // Lectura permitida si el usuario está autenticado O si la comunidad está marcada como pública
       allow read: if request.auth != null || resource.data.esPublica == true;
     ```
   - Las operaciones de mutación (crear, editar, solicitar acceso, canjear invitaciones) continúan exigiendo autenticación estricta (`request.auth != null`).

3. **UX Progresiva (Auth Gate en acciones)**:
   - Los visitantes no autenticados pueden ver la lista de comunidades, sus tarjetas y acceder a la ficha de presentación del nodo (`/c/:slug`).
   - Al intentar realizar acciones interactivas ("Unirse", "Solicitar acceso", "Canjear invitación" o "Crear comunidad"), la UI despliega de forma no intrusiva el modal de autenticación (`AuthGateModal`) para iniciar sesión o registrarse.

---

## Consecuencias

### Positivas
- **Fricción Cero en Descubrimiento**: Visitantes y futuros miembros pueden explorar las comunidades activas antes de crear una cuenta.
- **Coherencia con la Home Pública**: Los enlaces del Navbar público ("Comunidades") funcionan sin rebotes ni bloqueos inexplicables.
- **Preservación de la Seguridad Operativa**: Las comunidades privadas (`esPublica == false`) siguen totalmente protegidas contra lecturas anónimas, y las solicitudes de acceso siguen requiriendo cuenta activa.

### Negativas / Mitigaciones
- *Riesgo*: Los metadatos de comunidades públicas (`adminUids`, `slug`, `descripcion`) son visibles de forma abierta.
- *Mitigación*: Se respeta el consentimiento del nodo; únicamente aquellas comunidades con `esPublica == true` son legibles sin sesión. Las comunidades privadas o cerradas permanecen restringidas.
