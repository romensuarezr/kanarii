# Bug: `rol` de membresía inválido bloquea el acceso a la comunidad

> **Fecha**: 2026-11-23
> **Origen**: Bloqueo detectado durante la prueba local de T-132 (Sprint 27)
> **Estado**: 🐛 REGISTRADO, NO APROBADO
> **Severidad**: Alta (pérdida total de lectura de la comunidad para el afectado)

## Síntoma

Al cargar la app, Firestore devuelve `Missing or insufficient permissions` en:

- `tareas` (query por `communityId`)
- `proyectos` (query por `communityId`)
- `community_members` (query por `communityId`)

## Causa raíz

Las reglas de Firestore solo reconocen tres valores de `community_members.rol`:

```
admin | miembro | visitante
```

Pero el onboarding escribe `datosOnboarding.rol` con valores de presentación:

```
propietario | miembro | voluntario
```

y `src/lib/services/fichas.ts:486` los propaga tal cual a `community_members`:

```ts
rol: base.rol || 'miembro',
```

Con `rol: "propietario"` o `"voluntario"`, `hasRole()` y `hasMinRole()` devuelven
`false`, por lo que todas las lecturas gated por membresía se deniegan.

El creador de una comunidad nace con `rol: "admin"` (`comunidades.ts:179`), pero
la primera vez que guarda su ficha ese valor se sobrescribe con `"propietario"`.

## Evidencia

- UID afectado: `CAF2NiDiLpWDwN4AbOwI2OpvoAf2` → `community_members/arteara_...`
  tenía `rol: "propietario"`.
- Otro documento afectado en producción: `community_members/la-alpispa_...`
  con `rol: "voluntario"`.
- Tras corregir el rol a `admin`, las tres queries dejan de fallar.

## Propuesta de corrección

1. **Separar rol de permisos de rol de presentación**:
   - `rol` (permisos): `admin | miembro | visitante` — no debe escribirse desde
     `datosOnboarding.rol`.
   - `rolComunitario` (presentación): `propietario | miembro | voluntario` — ya existe.
2. En `fichas.ts`, omitir `rol` del `batch.set(..., { merge: true })` para no
   pisar el rol existente, o normalizar explícitamente:
   - `propietario → admin`
   - `voluntario → visitante`
   - `miembro → miembro`
3. Aplicar la misma normalización en `solicitudes.ts`, `invitaciones.ts` y `members.ts`.
4. Migración única de documentos con `rol` fuera del enum permitido.

## Archivos implicados

- `src/lib/services/fichas.ts` (propagación)
- `src/lib/services/solicitudes.ts`
- `src/lib/services/invitaciones.ts`
- `src/lib/services/members.ts`
- `src/pages/OnboardingChat.tsx` (origen de los valores)
- `firestore.rules` (contrato de roles)

## Nota de alcance

Detectado fuera de la Caja de T-132.

**Aplicado como guardia de emergencia (2026-11-23)**: se eliminó la escritura de
`rol` desde `fichas.ts` en el batch de `community_members`. Así el guardado de
la ficha ya no sobrescribe el rol real de la membresía. Es un parche mínimo para
desbloquear las pruebas, no la corrección completa.

**Pendiente**:
- Normalizar el rol al crear membresías en `solicitudes.ts`, `invitaciones.ts`
  y `members.ts` (hoy copian `base.rol` tal cual).
- Migrar los documentos existentes con `rol` fuera de `admin | miembro | visitante`.
- Decidir si `voluntario` debe mapear a `visitante` o a `miembro` según permisos
  de lectura esperados.
