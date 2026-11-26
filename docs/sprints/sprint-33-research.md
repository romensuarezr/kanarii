# Research Sprint 33 — Arquitectura de Roles, Membresía y Clasificación UX

> **Fecha**: 2026-11-26  
> **Fuente**: Investigación autónoma con **SearXNG Soberano** + Auditoría interna del codebase + Activos internos ([kanarii-design-inspiration-hylo-opencollective.md](file:///home/romen/Proyectos/kanarii/docs/idea-inbox/kanarii-design-inspiration-hylo-opencollective.md))

---

## Descubrimientos Scout (por tarea)

### T-162
- **Scout OSS (`firestore rbac multi-tenant roles`)**: `@medusajs/rbac` (v2.23.1), `@12-apps/entitlements` (v3.14.0). Ninguno aplica directamente a Firebase Client SDK + `firestore.rules` declarativas.
- **Decisión**: **Desarrollo a medida justificado** sobre los tipos y servicios existentes en `src/lib/services/` para alinear exactamente con `firestore.rules` sin añadir dependencias pesadas.

### T-163
- **Scout OSS**: Sin librería externa necesaria; se reutiliza `writeBatch`, `arrayUnion`, `arrayRemove` de `firebase/firestore` ya presentes en `src/lib/services/members.ts`.
- **Decisión**: **Desarrollo a medida justificado** reutilizando `ComunidadSubTab.tsx`.

### T-164
- **Scout OSS**: Componentes UI propios (`PerfilView`, `MemberCard`, `FichaView`) usando Tailwind CSS v4 y tokens `@theme`.
- **Decisión**: **Desarrollo a medida justificado**.

---

## Investigación Técnica y Fuentes

### T-162 — Separación de capas RBAC vs Membresía vs Perfil en Firestore
- **Queries ejecutadas en SearXNG Soberano**:
  - `firebase firestore multi-tenant rbac security rules membership document best practices`
  - `community platform roles permissions membership types hylo opencollective discord architecture`
- **URLs de referencia**:
  - [Secure data access for users and groups | Firestore - Firebase](https://firebase.google.com/docs/firestore/solutions/role-based-access)
  - [Security Rules and Firebase Authentication](https://firebase.google.com/docs/rules/rules-and-auth)
- **Patrón adoptado**:
  1. La **única fuente de verdad de autorización por tenant** debe residir en el documento de membresía (`community_members/{communityId}_{uid}.rol` con valores `'admin' | 'miembro' | 'visitante'`), validado por `firestore.rules`.
  2. Nunca mezclar ni derivar `rol` desde campos editables por el usuario en `profiles`/`fichas`.
  3. Separar `membershipType` (`'custodian' | 'resident' | 'volunteer' | 'collaborator'`, con migración `propietario → custodian` y sin `'miembro'` como vínculo) y `headline` (oficio corto ≤ 45 caracteres, validado en tipos y `firestore.rules`) del texto descriptivo amplio `rol_comunidad`, eliminando la colisión actual en `fichas.ts:492`, `members.ts:218`, `solicitudes.ts:156` e `invitaciones.ts:210`.

### T-163 — Sincronización de permisos y prevención de Over-Provisioning UX
- **Query ejecutada en SearXNG Soberano**:
  - `sociocracy 3.0 roles vs permissions ux design pattern`
- **URLs de referencia**:
  - [The 11 Best Org Chart Software Tools in 2026 - Peerdom](https://peerdom.com/blog/best-org-chart-software)
  - [Hylo](https://hylo.com) & [Open Collective](https://opencollective.com) (documentado en `docs/idea-inbox/kanarii-design-inspiration-hylo-opencollective.md`)
- **Patrón adoptado**:
  1. Mantener `comunidades/{slug}.adminUids` sincronizado atómicamente en `writeBatch` cuando un administrador cambia `community_members.rol`, eliminando desincronizaciones entre la UI (`Sidebar`, `AdminPanel`, `CalendarioView`) y `firestore.rules`.
  2. Exponer controles claros en `ComunidadSubTab.tsx` para ajustar permiso (`Admin` / `Miembro` / `Visitante`) y vínculo (`Propietario` / `Miembro` / `Voluntario`) con salvaguarda para no dejar el nodo huérfano sin administradores.

### T-164 — Claridad UX y Principios de Sociocracia 3.0
- **Patrón adoptado**:
  1. En Sociocracia 3.0, los **permisos de sistema** son independientes de los **roles funcionales/oficios** y de las etiquetas internas de plataforma.
  2. Retirar el badge técnico `USER` (`appUser.role`) de `PerfilView.tsx` y evitar pasarlo como chip comunitario en `PasaporteVisual`.
  3. Añadir campo corto `headline` (≤ 45 chars) en `FichaView`/`FichaPreview` para que `MemberCard` muestre: chip limpio de **Vínculo** + subtítulo corto de **Oficio/Aporte**, sin truncar párrafos largos en badges `uppercase`.
