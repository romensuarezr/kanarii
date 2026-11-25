# Research Sprint 29
> Fecha: 2026-11-25
> Fuentes: SearXNG Soberano (`http://searxng-...`) + Activos Internos de Kanarii (`src/lib/services/`, `firestore.rules`)
> Estado: ✅ Verificado

---

## Descubrimientos Scout (por tarea)

### T-147: Blindaje y Sanitización de Roles de Membresía
- **Alternativa OSS evaluada**: Librerías de RBAC genéricas.
- **Decisión**: Desarrollo a medida justificado. La arquitectura de Kanarii ya tiene un modelo RBAC canónico en `firestore.rules` (`admin | miembro | visitante`) y funciones de ayuda (`hasMinRole`, `hasRole`). El problema es una fuga de datos en la capa TypeScript donde strings de presentación del onboarding (`propietario`, `voluntario`) sobreescribían el rol de autorización. Se requiere un mapper determinista `normalizeMemberRole()` en `src/lib/services/members.ts` y script de saneamiento de base de datos.

### T-148: Persistencia y Conexión de Convocatorias de Eventos y Residencias
- **Alternativa OSS evaluada**: FullCalendar, React-Big-Calendar (ya instalado).
- **Decisión**: Reutilización de `useFirestoreCollection` y los modelos `Evento` y `Residencia` en `src/lib/services/`. Se extiende el servicio `eventos.ts` y se crea `residencias.ts` para persistencia real con filtrado por `communityId` e índices en Firestore.

### T-149: Flujo de Conexión y Mensajería de Sinergias entre Miembros
- **Alternativa OSS evaluada**: Chat SDKs externos (Stream, SendBird).
- **Decisión**: Rechazado para MVP. Desarrollar flujo nativo sobre las colecciones existentes `/conversaciones` o `/posts` en Firestore para mantener soberanía de datos y cero dependencias SaaS de pago.

### T-150: Homologación de Herramientas de la Flota (Hermes v0.23.4, Orca v1.4.274)
- **Alternativa OSS evaluada**: Actualización upstream determinista detectada por la sonda CLI.
- **Decisión**: Aplicar actualización de configuración del core (`generate-homepage-config.sh`) y registrar las nuevas capacidades de la flota.

---

## Investigación Técnica y Fuentes

### T-147 — Separación entre Roles de Autorización y Arquetipos de Presentación
- **Query SearXNG**: `firestore security rules role mapping best practices`
- **Resultados**: [Secure data access for users and groups | Firestore | Firebase](https://firebase.google.com/docs/firestore/solutions/role-based-access)
- **Patrón adoptado**:
  - `community_members.rol` se restringe estrictamente al enum canónico de autorización: `'admin' | 'miembro' | 'visitante'`.
  - El rol de presentación o título comunitario (`"propietario"`, `"voluntario"`, `"facilitadora"`, etc.) vive exclusivamente en `datosPersona.rol_comunidad` o `arquetipo_s3`.
  - En `src/lib/services/fichas.ts:486`, la asignación de rol debe invocar `normalizeMemberRole(base.rol)`: si es `'propietario'` o `'admin'`, mapea a `'admin'`; si es `'voluntario'` o `'miembro'`, mapea a `'miembro'`; si ya es admin, preserva el rango para no degradar permisos al guardar la ficha.

### T-148 — Persistencia Reactiva de Eventos y Residencias
- **Activo interno inspeccionado**: `src/lib/services/eventos.ts` y `src/hooks/useEventos.ts`.
- **Adaptación requerida**:
  - Crear queries abiertas para la red global (`getNetworkEventosQuery()`, `getNetworkResidenciasQuery()`) que obtengan convocatorias marcadas como públicas entre todos los nodos de Canarias.
  - Implementar mutaciones `inscribirseEnEvento(eventoId, uid)` y `solicitarResidencia(residenciaId, solicitud)`.

### T-149 — Conexión de Sinergias y Reciprocidad
- **Activo interno inspeccionado**: `src/lib/sinergias.ts` y `src/components/sinergias/SynergyCard.tsx`.
- **Adaptación requerida**:
  - Modal `ConnectModal.tsx` con propuesta pre-redactada según la coincidencia de dones y necesidades (Kin Maya, Diseño Humano e Isla).
  - Emisión de notificación al miembro o guardián del nodo receptor.

### T-150 — Sincronización del Core y Tooling
- **Activo interno inspeccionado**: `scripts/agent/sync.sh` y `scripts/agent/check-tooling-updates.sh`.
- **Adaptación requerida**: Sincronización limpia de `generate-homepage-config.sh` desde el repositorio upstream de Agent OS.
