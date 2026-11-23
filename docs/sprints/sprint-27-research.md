# Investigación consolidada — Sprint 27

> **Fecha**: 2026-11-23
> **Alcance**: T-132, T-133, T-134, T-135 + T-136 (unificar lectura) + T-137 (teléfono/WhatsApp)
> **Estado**: fuente única de investigación del sprint. Sustituye a `sprint-27-ux-research.md`.
> **Método**: prospección determinista con `scripts/agent/scout.sh`, documentación oficial de producto y benchmark de plataformas maduras.

---

## 0. Resumen ejecutivo

Cinco conclusiones que ordenan el resto del sprint:

1. **Tres superficies, no una**: Perfil (lectura), Ficha (edición) y Ajustes (configuración). Kanarii ya separó `/perfil` y `/ficha` en T-132; falta que Perfil muestre toda la ficha y que Ajustes exista.
2. **Una sola vista de lectura**: hoy `PerfilView` y el modo lectura de `FichaView` son dos implementaciones que divergen. Hay que extraer `FichaReadOnly` y reutilizarla. Si no, cada campo nuevo habrá que pintarlo dos veces (el bug de RRSS es el primer síntoma, no el último).
3. **Privacidad por campo, pero con proyección real**: el patrón de industria es un selector de audiencia por campo (LinkedIn, Facebook, Instagram). En Kanarii hoy sería teatro: `profiles/{uid}` es legible por cualquier usuario autenticado y el pasaporte universal lee ese documento en crudo. La colección `pasaportes/{uid}` ya existe como proyección saneada, pero **nadie la lee y `saveFicha` no la actualiza**. T-134 debe arreglar eso, no solo añadir selects.
4. **Teléfono en E.164 y WhatsApp como acción derivada**: se guarda `+34600123456`; se muestra formateado; el botón de WhatsApp se construye con `wa.me/<dígitos>` y **hereda la audiencia del teléfono**. No es un permiso aparte.
5. **El pasaporte universal no muestra RRSS por un problema de datos o de pestaña, no de código**: el código sirve los campos (verificado con `curl` al dev server). Hay que confirmar en una pestaña nueva qué `uid` se está abriendo y si la lectura de `profiles` devuelve la ficha. Se detalla en §5.4.

### Decisiones cerradas

| Decisión | Valor |
|---|---|
| `/perfil` | Lectura + vista previa del pasaporte + CTA «Editar ficha» |
| `/ficha` | Edición dedicada; `?edit=1` abre el formulario |
| Privacidad | Selector de audiencia por campo: `comunidad` / `administradores` / `yo` |
| Teléfono | Guardar E.164; mostrar formateado; WhatsApp derivado |
| Orden de tareas | T-133 → T-136 → T-137 → T-134 → T-135 |

### Decisiones abiertas

| Decisión | Opciones | Recomendación |
|---|---|---|
| Librería de teléfono | `react-phone-number-input` vs `libphonenumber-js` + input propio | `react-phone-number-input` en el chunk lazy de `/ficha` |
| País por defecto | Fijo `ES` vs `navigator.language` + fallback | Selector con detección y fallback `ES` |
| Nivel de privacidad | Solo UI (rápido) vs proyección `pasaportes` (real) | Proyección `pasaportes` |
| WhatsApp en fijos | Mostrar siempre vs ocultar si `getType() === 'FIXED_LINE'` | Mostrar siempre; ocultar solo si adoptamos metadata `max` |
| Enlace público `/p/:uid` | Requiere login vs pasaporte público saneado | Público saneado desde `pasaportes` |

---

## 1. Modelo de navegación y superficies

La industria separa tres preguntas que Kanarii mezclaba:

| Superficie | Pregunta | Naturaleza |
|---|---|---|
| **Perfil** | «¿Cómo me ve la comunidad?» | Lectura, vista previa, punto de entrada |
| **Editar ficha** | «¿Qué quiero cambiar?» | Formulario dedicado, prellenado, guardado explícito |
| **Ajustes** | «¿Cómo se comporta mi cuenta?» | Privacidad, cuenta, comunidad, notificaciones |

Regla de oro: **el perfil no es un formulario**. El formulario vive en una superficie aparte, con una única CTA primaria. Los ajustes no se entierran en el perfil: se acceden desde el menú del avatar.

### 1.1 Benchmark

- **GitHub**: perfil público + `Settings` separado. Los enlaces sociales son públicos; el email se controla aparte.
- **LinkedIn**: `Edit profile` + `Settings & Privacy`. El contacto tiene visibilidad propia y el email se configura por separado.
- **Instagram**: `Edit profile` + ajustes. El botón de contacto solo existe en cuentas profesionales y el dueño decide si se muestra.
- **Slack**: perfil + preferencias; los ajustes no viven dentro del perfil.
- **Hylo** (referencia directa para Kanarii): perfil y directorio de miembros; los perfiles son visibles para los co-miembros, la precisión de ubicación es configurable y las afiliaciones a grupos respetan la privacidad del grupo.
- **Discourse**: campos de perfil definidos por el admin, con `show on public profile`, `show on user card` y `searchable`. La privacidad granular por usuario es una petición histórica, no nativa.
- **Mastodon**: los metadatos del perfil son públicos; la privacidad es por post, no por campo. Lección: no prometer privacidad granular si el dato vive en una superficie pública.

**Referencias UX**: Eleken (2026) documenta edición inline vs modo dedicado y recomienda modo dedicado para perfiles complejos. Inoxoft (2025) añade CTA clara, edición por secciones y Save/Cancel explícitos.

### 1.2 Decisiones T-132 (ya implementadas)

```
/perfil  →  PerfilView (lectura)
              └─ [Editar ficha] → /ficha?edit=1
/ficha   →  FichaView (lectura por defecto, edición con ?edit=1)
              └─ [← Mi perfil] → /perfil
/p/:uid  →  PasaporteUniversalView (sin cambios de ruta)
```

`?edit=1` y no un modal: el formulario es largo, en móvil un modal genera scroll anidado y pierde contexto; una URL es compartible, recargable y accesible.

### 1.3 Microcopy

| Contexto | Texto |
|---|---|
| CTA perfil | **Editar ficha** |
| Volver desde ficha | **← Mi perfil** |
| Guardar | **Guardar cambios** |
| Cancelar | **Cancelar** |
| Cambios sin guardar | **Tienes cambios sin guardar. ¿Salir igualmente?** |
| Éxito | **Ficha actualizada** |
| Error | **No hemos podido guardar los cambios. Revisa tu conexión e inténtalo de nuevo.** |
| Privacidad, campo privado | **Solo tú puedes ver este dato.** |
| Privacidad, campo comunidad | **Visible para las personas de tu comunidad.** |
| Privacidad, campo admin | **Visible solo para administradores.** |
| Ajustes en avatar | **Ajustes** |
| Sección de privacidad | **Privacidad del pasaporte** |

### 1.4 Antipatrones

1. Dos rutas a la misma página (bug original de `/perfil` y `/ficha`).
2. Edición inline sin guardado explícito en formularios largos.
3. Toggles para tres estados de privacidad.
4. Guardado silencioso.
5. Ajustes enterrados en el perfil o duplicados con comportamientos distintos.
6. Iconos solos para acciones críticas o para el estado de privacidad.
7. Acciones destructivas junto a «Editar».
8. Un único interruptor «pasaporte público/privado».
9. Filtrar privacidad solo en el cliente y llamarlo privacidad.

### 1.5 Checklist UX

- [ ] Desde `/perfil` se llega a editar en un solo clic.
- [ ] Desde `/ficha` se vuelve a `/perfil` sin usar el menú global.
- [ ] Guardar muestra éxito o error; nunca falla en silencio.
- [ ] Cancelar no guarda y no pierde el estado de lectura.
- [ ] Cada campo sensible tiene un selector de audiencia con etiqueta textual.
- [ ] El estado de privacidad se entiende sin abrir el selector.
- [ ] La vista previa refleja la privacidad real.
- [ ] «Ajustes» está en el menú del avatar, encima de «Cerrar sesión».
- [ ] Todas las acciones críticas tienen objetivos táctiles ≥ 44 px.
- [ ] En móvil, una sola acción primaria por pantalla.

---

## 2. Privacidad por campo

### 2.1 Qué hace la industria

| Producto | Patrón | Lección |
|---|---|---|
| **LinkedIn** | El contacto se limita a conexiones de 1.er grado; el email tiene su propia visibilidad (`Solo yo`, `1.er grado`, `1.º y 2.º`, `Cualquiera`); la descubribilidad por email y por teléfono son ajustes separados | Un dato, un control. No mezclar «quién ve mi email» con «quién me encuentra por email» |
| **Facebook** | Selector de audiencia `Público` / `Amigos` / `Solo yo` / `Personalizado` por contenido y por campos del perfil | El selector de audiencia es un patrón entendible; el estado actual debe verse sin abrirlo |
| **Instagram** | El botón de contacto solo existe en cuentas profesionales; el dueño activa «Mostrar información de contacto» y quien pulsa lo ve | Si el dato es público, no hay privacidad granular: o se muestra o no se muestra |
| **Mastodon** | Metadatos del perfil públicos; visibilidad por post; `discoverable` e `indexable` a nivel de cuenta | No fingir privacidad por campo si el documento es público |
| **Hylo** | Perfiles visibles para co-miembros; precisión de ubicación configurable; afiliaciones respetan la privacidad del grupo | La privacidad contextual por comunidad es el modelo correcto para Kanarii |
| **Discourse** | Campos definidos por el admin con `show on public profile`, `show on user card`, `searchable`; la privacidad por usuario es una petición, no una feature | La granularidad total es cara; empieza por los campos sensibles |

### 2.2 Modelo para Kanarii

**Audiencias**:

```ts
export type Audiencia = 'comunidad' | 'administradores' | 'yo';
```

**Defaults propuestos**:

| Campo | Default | Razón |
|---|---|---|
| Instagram | `comunidad` | Dato público por naturaleza; se publica para conectar |
| LinkedIn | `comunidad` | Ídem |
| Web | `comunidad` | Ídem |
| Teléfono | `administradores` | Dato sensible; WhatsApp expone el número |
| Email | `administradores` | Dato sensible; evitar spam |
| Arquetipo / Kin | `comunidad` | Identidad comunitaria (coincide con `PRIVACIDAD_DEFAULT`) |
| Diseño humano | `yo` | Dato personal |
| Astrología | `yo` | Dato personal |
| Manual completo | `yo` | Contenido íntimo |

**Tipo** (compatible con lo existente):

```ts
export interface PrivacidadContacto {
  instagram: Audiencia;
  linkedin: Audiencia;
  website: Audiencia;
  phone: Audiencia;
  email: Audiencia;
}

export interface ConfigPrivacidad {
  disenoHumano: boolean;
  arquetipo: boolean;
  kinMaya: boolean;
  manualCompleto: boolean;
  datosAstrologicos: boolean;
  contacto?: Partial<PrivacidadContacto>;
}

export const PRIVACIDAD_CONTACTO_DEFAULT: PrivacidadContacto = {
  instagram: 'comunidad',
  linkedin: 'comunidad',
  website: 'comunidad',
  phone: 'administradores',
  email: 'administradores',
};
```

`contacto` es opcional para no romper fichas antiguas. Al leer: `{ ...PRIVACIDAD_CONTACTO_DEFAULT, ...ficha.privacidad?.contacto }`.

**UI**:

```
Privacidad del pasaporte
│
├─ Identidad
│   ├─ Arquetipo          [ Toda la comunidad ▾ ]
│   ├─ Kin maya           [ Toda la comunidad ▾ ]
│   └─ Diseño humano      [ Solo yo ▾ ]
│
├─ Contacto
│   ├─ Instagram          [ Toda la comunidad ▾ ]
│   ├─ LinkedIn           [ Toda la comunidad ▾ ]
│   ├─ Web                [ Toda la comunidad ▾ ]
│   ├─ Teléfono           [ Solo administradores ▾ ]
│   └─ Email              [ Solo administradores ▾ ]
│
└─ Manual completo        [ Solo yo ▾ ]
```

- Select, no toggle: tres estados no caben en un interruptor.
- Cada selector lleva una frase de consecuencia: «Tu teléfono solo lo verán los administradores».
- Se guarda al instante, con feedback y rollback si falla.
- La vista previa del perfil refleja el resultado real.

### 2.3 Privacidad real: el problema de `profiles`

Hoy:

```txt
profiles/{uid}   → allow read: if request.auth != null   (cualquier usuario autenticado)
pasaportes/{uid} → allow read: if request.auth != null   (proyección saneada)
```

Pero:

- `PasaporteUniversalView` lee `profiles/{uid}` y `users/{uid}`, **no** `pasaportes/{uid}`.
- `PasaporteComunitarioView` también lee `profiles/{uid}`.
- `saveFicha` **no** llama a `sincronizarPasaporte`; solo lo hace el toggle de privacidad de `FichaView`.
- `PasaporteVisual` solo aplica privacidad a `kinMaya` y `arquetipo`; el resto se pinta siempre.

Consecuencia: cualquier usuario autenticado puede leer el teléfono y el email de cualquier ficha desde el cliente, aunque la UI diga «Solo yo». **Filtrar en el cliente no es privacidad.**

**Arquitectura recomendada**:

```txt
profiles/{uid}      → fuente de verdad. Lectura: dueño + admins de su comunidad.
pasaportes/{uid}    → proyección comunitaria. Solo campos con audiencia 'comunidad'.
                      Lectura: autenticados (o pública si se quieren enlaces compartibles).
users/{uid}         → datos de cuenta: displayName, photoURL, communityIds.
                      Lectura: autenticados.
```

- `/perfil` y `/ficha` leen `profiles` (dueño).
- `/p/:uid` y `/c/:slug/miembro/:uid` leen `pasaportes` + `users`.
- El panel de admin lee `profiles` (ya tiene permiso).
- `sincronizarPasaporte` se llama **después de cada `saveFicha`** y en cada cambio de privacidad. Incluye solo los campos `comunidad`.
- Los campos `administradores` y `yo` no se copian a `pasaportes`; viven en `profiles`.

**Ventajas**:

- Privacidad real, no cosmética.
- `pasaportes` ya existe; no hay que inventar colección.
- Los enlaces `/p/:uid` pueden ser públicos sin exponer `profiles`.

**Coste**:

- Auditar todas las lecturas de `profiles` antes de cerrar las reglas: `useCommunityMembers` (fallback de nombres), `Welcome` (miembros destacados), `PasaporteComunitarioView`, `AdminPanel`, `CruceView`.
- Migrar datos existentes: generar `pasaportes` para todas las fichas.
- Mantener la sincronización en `saveFicha` y en el toggle de privacidad.

**Alternativa MVP** (si se quiere reducir riesgo): mantener `profiles` legible por autenticados y aplicar la privacidad solo en la UI, documentando explícitamente que no es una garantía de seguridad. No recomendado para teléfono/email.

### 2.4 Migración de `ConfigPrivacidad`

1. Añadir `contacto?: Partial<PrivacidadContacto>` a `ConfigPrivacidad`.
2. Mantener los booleanos existentes; no reinterpretarlos.
3. `PRIVACIDAD_CONTACTO_DEFAULT` para fichas sin `contacto`.
4. `sincronizarPasaporte` lee `ficha.privacidad?.contacto` con fallback.
5. Tests unitarios de `puedeVer(audiencia, contexto)` y de la proyección.

---

## 3. Teléfono + WhatsApp

### 3.1 Formato: E.164

Guardar siempre en **E.164**: `+` + código de país + número, sin espacios ni guiones, máximo 15 dígitos. Ejemplo: `+34600123456`.

- `tel:` acepta E.164.
- `wa.me` quiere los dígitos **sin** `+`.
- Exportaciones y búsquedas funcionan.
- La visualización se formatea aparte; nunca se guarda el texto formateado como fuente de verdad.

Referencia: ITU-T E.164 / Twilio.

### 3.2 WhatsApp: reglas oficiales

De la ayuda de WhatsApp:

- `wa.me/<número>` con el número completo en formato internacional.
- **Sin** `+`, sin ceros iniciales, sin paréntesis, sin guiones ni espacios.
- Mensaje precargado: `wa.me/<número>?text=<texto urlencoded>`.
- Argentina: `+54 9 ...` y quitar el `15`.
- México: `+52 1 ...`.
- WhatsApp está pensado para móviles; un fijo solo se registra en WhatsApp Business.

Construcción:

```ts
const digits = phone.replace(/\D/g, ''); // E.164 sin '+'
const url = `https://wa.me/${digits}?text=${encodeURIComponent('Hola, te escribo desde Kanarii')}`;
```

Nunca construir la URL con el valor tal cual lo escribió el usuario. Si el número no es válido, no renderizar el botón.

### 3.3 Comparativa de librerías

| Opción | Peso | Pros | Contras | Veredicto |
|---|---|---|---|---|
| `react-phone-number-input` | `libphonenumber-js/min` + componente; medir en el chunk de `/ficha` | Selector de país, formateo as-you-type, accesible, MIT, ~1.5 M descargas/semana | Peso; estilos a adaptar; 5 dependencias | ✅ Recomendado |
| `libphonenumber-js` solo | 181.8 kB min / 44.3 kB gzip (Bundlephobia) | Ligero, sin UI, control total | Hay que construir selector, formateo y estados | ⚠️ Si el peso es crítico |
| Regex propio | ~0 | Sin dependencias | No valida internacional; rompe con prefijos; mantenimiento | ❌ Descartado |

`react-phone-number-input` usa `libphonenumber-js/min` por defecto (metadata ~80 kB). La metadata `max` (~145 kB) permite `isValid()` estricto y `getType()` (móvil/fijo). Para Kanarii: `min` + `isPossiblePhoneNumber` es suficiente; no bloquear el guardado por un falso negativo.

### 3.4 UX del campo

- Selector de país con **texto** además de bandera; default `navigator.language` y fallback `VITE_DEFAULT_PHONE_COUNTRY` (`ES`).
- `type="tel"`, `inputmode="tel"`, `autocomplete="tel"`.
- Aceptar pegado de `+34 600 12 34 56`, `0034...`, `600123456`.
- Formatear al salir del campo, no en cada tecla (evita saltos de cursor).
- Validación inline: «Ese número no parece válido. Revisa el prefijo o el país».
- Mostrar el número nacional en el formulario (`600 12 34 56`) y el internacional en el pasaporte (`+34 600 12 34 56`).
- Permitir vacío: el teléfono es opcional.
- Objetivo táctil ≥ 44 px; no depender solo del color para el error.

### 3.5 Acciones de contacto

Componente compartido `ContactActions`:

```
[📞 Llamar]  [🟢 WhatsApp]
```

- `Llamar` → `tel:+34600123456`.
- `WhatsApp` → `wa.me/34600123456?text=...`.
- Se renderizan en `/perfil`, `/ficha` (lectura) y `PasaporteVisual`.
- Si el teléfono no es válido, no se renderiza WhatsApp.
- Si la audiencia del teléfono es `yo` o `administradores`, el botón **no** se renderiza para quien no corresponda. El botón hereda la audiencia; no se crea un permiso aparte.
- El mensaje precargado no incluye datos del visitante por defecto; si se quiere personalizar, usar el nombre del visitante solo si está autenticado y es visible.

### 3.6 Migración de datos existentes

- No hace falta migración para leer: `normalizePhone(value)` parsea el valor guardado y, si es válido, construye el enlace.
- Al siguiente guardado, se persiste E.164.
- Script opcional de backfill: recorrer `profiles`, normalizar `datosPersona.phone` y `datosOnboarding.phone`, reportar los no parseables. No bloquear el sprint por esto.

### 3.7 Casos límite

| Caso | Comportamiento |
|---|---|
| Vacío | Permitido; no se muestran acciones |
| `600123456` con país `ES` | `+34600123456` |
| `0034600123456` | `+34600123456` |
| `+34 600-123-456` | `+34600123456` |
| Número de otro país sin prefijo | Se interpreta con el país seleccionado; si no es válido, error |
| Fijo | `Llamar` visible; `WhatsApp` visible salvo que se adopte `max` y se detecte `FIXED_LINE` |
| Número inválido | No se guarda como E.164; error inline; no se renderiza WhatsApp |
| Valor antiguo no parseable | Se muestra tal cual en lectura; se pide corregirlo al editar |

---

## 4. T-136 — Unificar la lectura de perfil y ficha

### 4.1 Estado actual

| Contenido | `/perfil` | `/ficha` (lectura) |
|---|---|---|
| Pasaporte | ✅ | ❌ |
| Identidad | ✅ | ✅ |
| RRSS | ✅ | ✅ |
| Tríada | ❌ | ✅ |
| Rol y convivencia | ❌ | ✅ |
| Tensión | ❌ | ✅ |
| Kin / arquetipo | ❌ | ✅ |
| Manual | ❌ | ✅ |

`/perfil` se quedó corto. Mantener dos lecturas garantiza que el próximo campo vuelva a divergir.

### 4.2 Bug adicional: `getDatosPersona`

```ts
function getDatosPersona(ficha) {
  if (!ficha) return {};
  if (ficha.datosPersona) return ficha.datosPersona; // ignora datosOnboarding
  if (ficha.datosOnboarding) return { ...ficha.datosOnboarding, ... };
  return {};
}
```

En fichas antiguas, `datosPersona` existe pero no contiene todos los campos; los que solo están en `datosOnboarding` desaparecen de la lectura. Solución: merge con prioridad a `datosPersona` **solo si el valor no está vacío**:

```ts
const base = ficha.datosOnboarding ?? {};
const persona = ficha.datosPersona ?? {};
const merged = { ...base };
for (const [key, value] of Object.entries(persona)) {
  if (value !== undefined && value !== null && value !== '') merged[key] = value;
}
```

### 4.3 Propuesta

Extraer `src/components/perfil/FichaReadOnly.tsx`:

- Props: `ficha`, `datos`, `triada`, `showActions?`, `onEdit?`.
- Secciones: identidad, RRSS + contacto, tríada, rol/convivencia, tensión, kin/arquetipo, enlace al manual.
- `PerfilView` lo renderiza completo + vista previa del pasaporte + CTA «Editar ficha».
- `FichaView` lo usa en modo lectura; las acciones (PDF, abandonar comunidad, privacidad) se quedan en `FichaView`.
- `ContactActions` compartido para llamar/WhatsApp.

### 4.4 Criterios de done

- [ ] `/perfil` muestra todas las secciones de la ficha, no solo identidad y RRSS.
- [ ] `/ficha` en lectura usa el mismo componente que `/perfil`.
- [ ] `getDatosPersona` mergea onboarding + persona sin perder campos.
- [ ] No hay duplicación de JSX de lectura entre ambas vistas.
- [ ] `npm run lint` y `npm run build` en verde.
- [ ] Prueba manual: ficha antigua (solo onboarding) y ficha nueva (persona) muestran lo mismo.

---

## 5. Pasaporte universal y proyección pública

### 5.1 Estado actual

- `PasaporteUniversalView` lee `profiles/{uid}` y `users/{uid}`.
- `PasaporteComunitarioView` lee `profiles/{uid}`, `community_members`, `users/{uid}` y `comunidades`.
- `pasaportes/{uid}` se escribe en `sincronizarPasaporte` (solo desde el toggle de privacidad) y **no se lee en ninguna vista**.
- `saveFicha` no sincroniza el pasaporte.
- `PasaporteVisual` aplica `privacidad.kinMaya` y `privacidad.arquetipo`; el resto no.

### 5.2 Consecuencias

1. La privacidad de contacto sería solo visual.
2. El pasaporte universal puede mostrar datos que el usuario creía privados.
3. `/p/:uid` requiere autenticación (`profiles` y `users` exigen `request.auth != null`), así que un enlace compartido con alguien sin cuenta no funciona.
4. `pasaportes` se queda obsoleto y no refleja los cambios de ficha.

### 5.3 Arquitectura propuesta

Ver §2.3. Resumen:

- `profiles` = fuente de verdad privada.
- `pasaportes` = proyección comunitaria saneada.
- `users` = datos básicos de cuenta.
- `sincronizarPasaporte` después de cada guardado.
- `/p/:uid` lee `pasaportes`; si se quiere enlace público, `allow read: if true` en `pasaportes` (solo datos saneados).

### 5.4 Diagnóstico del caso reportado: RRSS no se ven en `/p/:uid`

El código sí sirve los campos. Verificado con el dev server:

```bash
curl -s http://localhost:3000/src/pages/PasaporteUniversalView.tsx | grep instagram
# instagram: ficha?.datosPersona?.instagram || ficha?.datosOnboarding?.instagram
```

Pasos de verificación:

1. Abrir `/p/<uid>` en una **pestaña nueva** (no reutilizar una abierta antes del cambio).
2. Confirmar que el `<uid>` de la URL es el UID de Firebase Auth (`CAF2...`), no el id del documento de `community_members` (`arteara_CAF2...`).
3. DevTools → Network → filtrar `profiles` → comprobar que la lectura devuelve el documento y que `datosPersona.instagram` tiene valor.
4. Si la pestaña se abrió antes del deploy, hacer `Ctrl+Shift+R` o cerrar y reabrir.
5. Si se abre sin sesión, `profiles` y `users` están denegados por reglas; la página muestra error. Es el problema de §5.3, no el de RRSS.

Causas probables, en orden: pestaña cacheada, estar viendo el pasaporte de otro miembro sin RRSS, o un `uid` incorrecto en el enlace.

### 5.5 Criterios de done (T-134)

- [ ] `sincronizarPasaporte` se llama después de `saveFicha`.
- [ ] `pasaportes` incluye solo campos con audiencia `comunidad`.
- [ ] `/p/:uid` y `/c/:slug/miembro/:uid` leen `pasaportes`, no `profiles`.
- [ ] `/perfil` y `/ficha` siguen leyendo `profiles` (dueño).
- [ ] Reglas de `profiles` revisadas y auditadas.
- [ ] Tests de proyección: un campo `yo` no aparece en `pasaportes`.
- [ ] Enlace `/p/:uid` funciona sin sesión (si se aprueba pasaporte público).

---

## 6. Mapa de tareas y orden

| Orden | Tarea | Alcance | Depende | Tamaño |
|---|---|---|---|---|
| 1 | **T-133** | Persistencia y render de RRSS (en curso) | — | M |
| 2 | **T-136** | `FichaReadOnly` + merge `getDatosPersona` + `/perfil` completo | T-133 | M |
| 3 | **T-137** | Teléfono E.164 + `ContactActions` + WhatsApp | T-136 | M |
| 4 | **T-134** | Privacidad por campo + proyección `pasaportes` + reglas | T-137 | L |
| 5 | **T-135** | Ajustes desde avatar + `/ajustes/privacidad` | T-134 | L |

**Por qué este orden**:

- T-136 antes de T-137: el campo de teléfono y los botones de contacto se pintan una sola vez en `FichaReadOnly`/`ContactActions`.
- T-137 antes de T-134: la privacidad necesita el teléfono y el botón de WhatsApp para heredar su audiencia.
- T-134 antes de T-135: el menú de ajustes enlaza a la sección de privacidad; conviene que exista.

---

## 7. Fuentes

### Documentación oficial

- WhatsApp Help Center — *About international phone number format*: https://faq.whatsapp.com/1294841057948784
- WhatsApp Help Center — *How to use click to chat*: https://faq.whatsapp.com/en/general/26000030
- Twilio — *What is E.164?*: https://www.twilio.com/docs/glossary/what-e164
- LinkedIn Help — *Manage your profile's visibility*: https://www.linkedin.com/help/linkedin/answer/a548106
- LinkedIn Help — *Who can see or download your email address*: https://www.linkedin.com/help/linkedin/answer/261
- Facebook Help — *Select your audience*: https://www.facebook.com/help/211513702214269
- Instagram Help — *About professional accounts*: https://help.instagram.com/138925576505882
- Mastodon Docs — *Profile*: https://docs.joinmastodon.org/entities/Profile
- Mastodon Docs — *Posting to your profile*: https://docs.joinmastodon.org/user/posting
- Hylo — *Features*: https://www.hylo.com/features
- Hylo — *User Guide*: https://hylozoic.gitbook.io/hylo/guides/hylo-user-guide
- Discourse Meta — *Creating and configuring custom user fields*: https://meta.discourse.org/t/creating-and-configuring-custom-user-fields/113192
- Discourse Meta — *More & granular privacy for user profiles and fields*: https://meta.discourse.org/t/more-granular-privacy-for-user-profiles-and-fields/86249

### Librerías

- `libphonenumber-js` — npm: https://www.npmjs.com/package/libphonenumber-js
- `libphonenumber-js` — Bundlephobia (181.8 kB min / 44.3 kB gzip): https://bundlephobia.com/package/libphonenumber-js
- `react-phone-number-input` — npm: https://www.npmjs.com/package/react-phone-number-input

### UX

- Eleken — *20 profile page design examples with expert UX advice* (2026): https://www.eleken.co/blog-posts/profile-page-design
- Inoxoft — *User Profile Page Design: Best Practices and Examples* (2025): https://inoxoft.com/blog/best-practices-on-user-profile-design-with-examples
- Pixso — *Profile Page Design: Key Components and UI Examples* (2026): https://pixso.net/tips/profile-page-design
- UX Patterns Guide — *Privacy settings UX Pattern* (2026): https://uxpatternsguide.com/patterns/privacy-settings
- setting.page — *Privacy Settings Page Examples for Better Data Controls* (2026): https://setting.page/privacy-settings-page-examples
- setting.page — *Privacy and Security Settings UX Checklist* (2026): https://setting.page/privacy-security-settings-ux-guide
- Setproduct — *Building a UX-friendly user profile template* (2025): https://www.setproduct.com/blog/user-profile-templates

### Prospección interna

- `scripts/agent/scout.sh "whatsapp phone number input react"`: `react-phone-number-input`, `libphonenumber-js`, `react-phone-input-2`.
- `scripts/agent/scout.sh "profile privacy settings per field"`: sin repositorios OSS consolidados; el patrón se resuelve a medida.

---

## 8. Estado de verificación

| Punto | Estado |
|---|---|
| T-132 rutas separadas | ✅ Implementado y mergeado |
| T-133 persistencia RRSS | ✅ Implementado; pendiente confirmar pasaporte universal |
| `/perfil` muestra tarjeta RRSS | ✅ Confirmado por el usuario |
| `/p/:uid` muestra RRSS | ⚠️ Pendiente de verificación en pestaña nueva |
| `pasaportes` como proyección | ❌ No implementado; propuesto para T-134 |
| Privacidad real de contacto | ❌ No implementada; propuesto para T-134 |
| Teléfono E.164 / WhatsApp | ❌ No implementado; propuesto para T-137 |

---

*Última actualización: 23 Nov 2026*
