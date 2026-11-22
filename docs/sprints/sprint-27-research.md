# Resultados de Búsqueda Soberana: Sprint 27

## Clasificación de Idea-Inbox

### 1. `2026-11-22-infisical-v0.45.14.md`
- **Origen**: Sonda determinista check-tooling-updates.sh
- **Estado**: 💡 REGISTRADA, NO APROBADA
- **Evaluación**: Actualización de Infisical CLI de 0.43.137 a 0.45.14. Riesgo Bajo, complejidad S. No es crítica para los objetivos del Sprint 27 (perfil/passport/RRSS). Clasificar como **backlog** - puede ser abordada en sprint posterior de homologación de tooling.

### 2. `kanarii-design-inspiration-hylo-opencollective.md`
- **Origen**: Inspiración de diseño para gobernanza participativa y transparencia
- **Evaluación**: Contiene ideas útiles para el diseño del menú de configuración y selectores de privacidad (cf. principios de Hylo: gobernanza participativa, transparencia, interoperabilidad). **No es una tarea candidata directa**, pero enriquecerá el diseño de T-134 (selectores de visibilidad) y T-135 (menú de configuración). Clasificar como **recurso de diseño** para la fase de implementation.

## Descubrimientos Scout (por tarea) - Gate T-129

### T-132: Corregir duplicidad de rutas `/perfil` y `/ficha`
- **Hallazgo**: En `src/App.tsx` líneas 96-97, ambas rutas mapean a `FichaView`:
  `/ficha` → `ProtectedRoute><FichaView /></ProtectedRoute>`
  `/perfil` → `ProtectedRoute><FichaView /></ProtectedRoute>`
- **Consecuencia**: `/perfil` y `/ficha` son la misma página; usuario reporta "cosa que no creo que esté bien"
- **Alternative**: Separar en rutas distintas - `/perfil` a perfil de usuario, `/ficha` a vista de ficha comunitaria
- **Recomendación**: Desarrollo a medida Justified (no hay librería madura para enrutamiento de routes separadas por propósito)

### T-133: Corregir persistencia de RRSS en saveFicha y mapping mappedUser
- **Root cause**: En `src/lib/services/fichas.ts`, la construcción de `datosPersona` usa lista blanca que excluye `instagram`, `linkedin`, `website`, `phone`, `email`
- **Adicional**: `mappedUser` en `PasaporteUniversalView.tsx` y `PasaporteComunitarioView.tsx` omite estos campos, por lo que `PasaporteVisual` nunca los recibe
- **Estado actual**: `PasaporteVisual.tsx` ya tiene los campos `instagram`, `linkedin`, `website`, `phone`, `email` en la interfaz `UserPassport`, pero no fluyen datos
- **Recomendación**: 
  1. Extender la lista blanca en `saveFicha` para incluir los 5 campos RRSS
  2. Añadir los campos a `mappedUser` en ambas vistas de pasaporte
- **OSS alternativa**: Ninguna librería madura detectada - desarrollo a medida en fichas.ts y pasaporte views

### T-134: Añadir selectores de visibilidad de privacidad para RRSS y otros datos en el pasaporte comunitario
- **Contexto**: `ConfigPrivacidad` ya existe en `_types.ts` con `disenoHumano`, `arquetipo`, `kinMaya`, `manualCompleto`, `datosAstrologicos`. No incluye RRSS/redes sociales.
- **Hallazgo**: `FichaView.tsx` ya tiene `handleTogglePrivacidad` para los 5 campos de configuración, y `PasaporteVisual.tsx` recibe `privacidad?: ConfigPrivacidad`.
- **Necesidad**: Los campos de RRSS (`instagram`, `linkedin`, `website`, `phone`, `email`) necesitan su propio selector de visibilidad dentro del `ConfigPrivacidad`, distinto del diseño humano/kin/astrología.
- **Recomendación**: Extender `ConfigPrivacidad` con campos `instagram`, `linkedin`, `website`, `phone`, `email` y crear controles UI en tanto `FichaView` (que ya tiene el patrón de toggle) como en el menú de perfil.

### T-135: Crear menú de configuración dedicado accesible desde el avatar de usuario
- **Contexto**: `UserAvatarMenu.tsx` actualmente tiene: MiPerfil, Pasaporte Universal, Vincular Telegram (admin), Panel de Admin, Cerrar Sesión. No hay entrada de "Configuración" o "Ajustes" general.
- **Necesidad**: El volumen de settings justifica un menú propio, accesible desde el menú avatar, con secciones para: privacidad, RRSS, perfil, comunidad, cuenta.
- **Recomendación**: Añadir botón "Ajustes" en `UserAvatarMenu.tsx` que navegue a una nueva ruta `/ajustes` o despliegue un submenú con las opciones de configuración. El componente ya tiene la estructura necesaria (usando `Settings` icon de lucide-react).

## Decisiones Técnicas Clave (Scout-First T-129)

1. **Sin librerías OSS maduras** detectadas para ninguno de los 4 problemas — todas requieren desarrollo a medida sobre el código existente.
2. **Archivos afectados identificados**: `src/App.tsx`, `src/lib/services/fichas.ts`, `src/pages/PasaporteUniversalView.tsx`, `src/pages/PasaporteComunitarioView.tsx`, `src/components/perfil/PasaporteVisual.tsx`, `src/components/layout/UserAvatarMenu.tsx`, `src/lib/services/_types.ts`, `src/pages/FichaView.tsx`.
3. **Patrones reutilizables**: `handleTogglePrivacidad` en `FichaView.tsx` ya existe y sirve de modelo para los nuevos campos RRSS. `UserPassport` interface en `PasaporteVisual.tsx` ya tiene los 5 campos RRSS definidos.
4. **Decisión de diseño**: Extender `ConfigPrivacidad` (no reinventar) y reutilizar patrones UI existentes.
