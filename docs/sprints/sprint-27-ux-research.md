# Investigación UX — Sprint 27: Perfil, Ficha, Privacidad y Ajustes

> **Fecha**: 2026-11-23
> **Alcance**: T-132, T-133, T-134, T-135
> **Objetivo**: fijar un modelo de navegación y edición probado en productos maduros antes de implementar los selectores de privacidad y el menú de ajustes.

---

## 1. Resumen ejecutivo

La industria separa tres superficies que Kanarii estaba mezclando:

| Superficie | Pregunta que responde | Naturaleza |
|---|---|---|
| **Perfil** | «¿Cómo me ve la comunidad?» | Lectura, vista previa, punto de entrada |
| **Editar ficha** | «¿Qué quiero cambiar?» | Formulario dedicado, prellenado, guardado explícito |
| **Ajustes** | «¿Cómo se comporta mi cuenta?» | Configuración: privacidad, cuenta, notificaciones |

Regla de oro: **el perfil no es un formulario**. El formulario vive en una superficie aparte, accesible con una única CTA primaria («Editar ficha»). Los ajustes tampoco se entierran dentro del perfil: se acceden desde el menú del avatar.

Esta separación es la que ya aplican GitHub (perfil público + `Settings`), LinkedIn (`Edit profile` + `Settings & Privacy`), Instagram (`Edit profile` + ajustes) y Slack (perfil + preferencias). Kanarii debe copiar el patrón, no la estética.

---

## 2. Hallazgos de benchmark

### 2.1 Perfil de lectura con CTA única de edición

- El perfil muestra identidad, rol y una **vista previa de lo que ve la comunidad**.
- La acción primaria es una sola: **«Editar ficha»**, situada en la cabecera, alineada a la derecha en escritorio y a ancho completo en móvil.
- Las acciones secundarias («Ver pasaporte universal», «Compartir») van separadas y con menor peso visual.
- Las acciones destructivas (abandonar comunidad, eliminar cuenta) van al final, nunca junto a «Editar».

**Referencias**: Eleken (2026) documenta los dos modelos —edición inline vs modo edición dedicado— y recomienda modo dedicado para perfiles complejos porque reduce ediciones accidentales y permite una maqueta más limpia. Inoxoft (2025) añade: «una acción clara de Edit profile, edición por secciones, Save y Cancel explícitos».

### 2.2 Edición en superficie dedicada

- El formulario se abre **prellenado** con los datos actuales.
- `Guardar cambios` y `Cancelar` son explícitos y visibles; no se guarda al escribir.
- El botón de guardar se deshabilita si no hay cambios (*dirty state*).
- Si el usuario intenta salir con cambios sin guardar, se avisa.
- El resultado del guardado se comunica siempre: toast de éxito o error accionable. **Nunca fallar en silencio.**

**Referencia**: Inoxoft (2025): «Explicit Save and Cancel actions. Autosave only when its status is clearly communicated. Confirmation for sensitive changes.»

### 2.3 Privacidad por campo con selector de audiencia

El patrón probado no es un toggle binario, sino un **selector de audiencia** por campo sensible:

```
Teléfono
[ Toda la comunidad ▾ ]
Visible para las 34 personas de Arteara.
```

- Tres estados se comunican mejor con radio/select/segmented control que con un interruptor.
- Las opciones se escriben en lenguaje de usuario, no de sistema: «Toda la comunidad», «Solo administradores», «Solo yo». Evitar «Público / Interno / Privado» sin explicar quién entra en cada grupo.
- El estado actual se ve sin abrir el control.
- Se muestra una vista previa o una frase de consecuencia: «Tu teléfono solo lo verás tú».
- Los cambios de privacidad se guardan al instante (son binarios/selectores), con feedback y rollback si falla.

**Referencias**: UX Patterns Guide — Privacy settings (2026): etiquetas de audiencia explícitas, no depender solo de icono/color, exponer alcance y consecuencia. setting.page (2026): los toggles solo funcionan para decisiones binarias; para tres niveles usar radios o select; mostrar defaults y modelo de guardado.

### 2.4 Ajustes desde el menú del avatar

- El menú del avatar es el lugar esperado para «Ajustes» (icono de engranaje), por encima de «Cerrar sesión».
- La página de ajustes tiene navegación propia por secciones; en escritorio, rail lateral; en móvil, lista que lleva a cada sección.
- Cada sección es enlazable directamente (`/ajustes/privacidad`), lo que permite abrir el selector exacto desde una notificación o desde el perfil.
- El perfil y los ajustes no duplican la misma edición: el perfil enlaza a «Editar ficha»; los ajustes enlazan a privacidad, cuenta y comunidad.

**Referencias**: Setproduct (2025): «Settings integration is critical; avoid burying settings under endless scroll». setting.page (2026): separar preferencias personales, protección de cuenta y controles administrativos.

### 2.5 Móvil y baja alfabetización digital

Kanarii se usa en comunidades rurales, con dispositivos básicos y rango de edad amplio. Los estándares que aplican:

- Objetivos táctiles de **44×44 px** como mínimo.
- **Etiquetas de texto** en acciones críticas; nunca solo icono.
- **Una acción primaria por pantalla**; el resto, secundario o progresivo.
- Formularios largos divididos en secciones con encabezados claros.
- Mensajes en español llano, sin jerga técnica («visibilidad» se explica con un ejemplo).
- Confirmación explícita antes de acciones destructivas.

---

## 3. Decisiones para Kanarii

### 3.1 T-132 — Separar `/perfil` y `/ficha`

**Modelo elegido**: perfil de lectura + ficha editable.

```
/perfil  →  PerfilView (lectura)
              └─ [Editar ficha] → /ficha?edit=1
/ficha   →  FichaView (lectura por defecto, edición con ?edit=1)
              └─ [← Mi perfil] → /perfil
```

- `/perfil` muestra: cabecera con nombre, rol y CTA «Editar ficha»; vista previa del pasaporte; resumen de identidad; enlace a ajustes.
- `/ficha?edit=1` abre el formulario directamente, sin pasar por la vista de lectura.
- `/ficha` conserva su modo lectura y su botón «Editar» interno.
- `/p/:uid` no cambia.

**Por qué `?edit=1` y no un modal**: el formulario es largo y tiene secciones; un modal en móvil genera scroll anidado y pérdida de contexto. Una URL es compartible, recargable y accesible.

### 3.2 T-133 — Persistencia de RRSS y guardado fiable

- Extender la lista blanca de `saveFicha` con `instagram`, `linkedin`, `website`, `phone`, `email`.
- Añadirlos a `mappedUser` en `PasaporteUniversalView` y `PasaporteComunitarioView`.
- Envolver `onSubmit` en `try/catch` con toast de error y mantener el formulario abierto si falla.
- Al guardar con éxito: toast «Ficha actualizada» y transición a modo lectura. No recargar toda la página.
- **No** introducir autosave en el formulario: el usuario debe saber cuándo se guarda.

### 3.3 T-134 — Selectores de privacidad

Extender `ConfigPrivacidad` con los cinco campos de contacto, pero la UI no debe ser una fila de toggles. Propuesta:

```
Privacidad del pasaporte
│
├─ Identidad
│   ├─ Diseño humano      [ Toda la comunidad ▾ ]
│   ├─ Arquetipo          [ Toda la comunidad ▾ ]
│   └─ Kin maya           [ Toda la comunidad ▾ ]
│
├─ Contacto
│   ├─ Email              [ Solo administradores ▾ ]
│   ├─ Teléfono           [ Solo yo ▾ ]
│   ├─ Web                [ Toda la comunidad ▾ ]
│   ├─ Instagram          [ Toda la comunidad ▾ ]
│   └─ LinkedIn           [ Solo administradores ▾ ]
│
└─ Manual completo        [ Solo yo ▾ ]
```

- Valores: `comunidad` | `admin` | `privado`.
- Defaults conservadores: identidad visible en la comunidad; contacto privado salvo que el usuario lo abra.
- Cada selector lleva una frase de consecuencia y se guarda al instante.
- En la vista previa del perfil se refleja el resultado real (si un campo está privado, no aparece).
- No usar un toggle global «pasaporte público/privado»: impide el control granular que el usuario espera.

### 3.4 T-135 — Menú de ajustes

- Añadir «Ajustes» al `UserAvatarMenu`, con icono `Settings`, justo encima de «Cerrar sesión».
- Ruta `/ajustes` con secciones: **Cuenta**, **Perfil**, **Privacidad**, **Comunidad**, **Notificaciones**.
- «Perfil» en ajustes no duplica el formulario: enlaza a `/ficha?edit=1`.
- «Privacidad» puede ser un ancla dentro de ajustes o una subruta `/ajustes/privacidad`; recomendado subruta para deep links.
- En móvil: lista de secciones a pantalla completa; en escritorio: rail lateral + contenido.
- «Abandonar comunidad» y «Eliminar cuenta» al final, separados visualmente y con confirmación.

---

## 4. Microcopy recomendado

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

---

## 5. Antipatrones a evitar

1. **Dos rutas a la misma página** (el bug actual de `/perfil` y `/ficha`).
2. **Edición inline sin guardado explícito** en formularios largos.
3. **Toggles para tres estados de privacidad**: no comunican quién ve qué.
4. **Guardado silencioso**: si falla, el usuario cree que guardó.
5. **Ajustes enterrados en el perfil** o duplicados en dos sitios con comportamientos distintos.
6. **Iconos solos** para acciones críticas o para el estado de privacidad.
7. **Acciones destructivas junto a «Editar»**.
8. **Un único interruptor «pasaporte público/privado»** que impide el control por campo.

---

## 6. Checklist de aceptación UX

- [ ] Desde `/perfil` se llega a editar en **un solo clic**.
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

## 7. Fuentes consultadas

- Eleken — *20 profile page design examples with expert UX advice* (2026): modos edición vs lectura, separación de ajustes secundarios. https://www.eleken.co/blog-posts/profile-page-design
- Inoxoft — *User Profile Page Design: Best Practices and Examples* (2025): CTA clara, edición por secciones, Save/Cancel explícitos. https://inoxoft.com/blog/best-practices-on-user-profile-design-with-examples
- Pixso — *Profile Page Design: Key Components and UI Examples* (2026): separar vista del propietario y vista del visitante. https://pixso.net/tips/profile-page-design
- UX Patterns Guide — *Privacy settings UX Pattern* (2026): etiquetas de audiencia, alcance, consecuencia y accesibilidad. https://uxpatternsguide.com/patterns/privacy-settings
- setting.page — *Privacy Settings Page Examples for Better Data Controls* (2026): toggles vs selectores, defaults, modelo de guardado. https://setting.page/privacy-settings-page-examples
- setting.page — *Privacy and Security Settings UX Checklist* (2026): radios/select para audiencias mutuamente excluyentes, feedback tras cada cambio. https://setting.page/privacy-security-settings-ux-guide
- Setproduct — *Building a UX-friendly user profile template* (2025): integración de ajustes y jerarquía móvil. https://www.setproduct.com/blog/user-profile-templates
