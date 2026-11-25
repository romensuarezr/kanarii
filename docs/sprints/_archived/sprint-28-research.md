# Investigación Técnica y UX — Sprint 28: Retribalize & Open Source Standards

Fecha: 2026-11-24
Objetivo: Fundamentar las tareas de UI/UX del Sprint 28 (Home pública, Demos pedagógicas, Tarjetas de miembros y Resumen de sinergia) analizando benchmarks reales de Retribalize.io y proyectos open source comunitarios (Hylozoic/hylo, TailGrids y OpenCollective).

---

## 1. Benchmarking: Retribalize.io (Auditoría en vivo con Orca Browser)

Tras navegar e inspeccionar la plataforma en vivo tanto pública como autenticada, se extraen los siguientes patrones de UI/UX a adoptar y adaptar:

### A. Home Pública y Arquitectura de Conversión
- **Cabecera Pública Clara**:
  - Logo a la izquierda con enlace a Home.
  - Navegación simplificada: `About` / `Filosofía`, `Cómo Funciona` (enlace al Tour interactivo) y botón `Iniciar Sesión` / `Entrar`.
- **Hero de Conversión Directo**:
  - Declaración contundente: En lugar de un saludo abstracto, comunicar el propósito real (*"Inteligencia Colectiva y Encuentro para Comunidades Conscientes"*).
  - Dos Call-to-Actions (CTAs) de impacto:
    1. Acción primaria: *"Unirse a la tribu"* → `/contexto` (flujo de acogida y consentimiento).
    2. Acción secundaria: *"Ver cómo funciona"* → `/tour` (animaciones pedagógicas interactivas con `motion/react`).
- **Eliminación del Salto a Ciegas**:
  - Cada tarjeta pedagógica en el panel logueado debe dirigir con parámetro deep-link al módulo animado exacto (`/tour?modulo=cruce`, `/tour?modulo=triada`, etc.), no a la introducción genérica como ocurría previamente.

### B. Directorio y Tarjetas de Miembros (Patrón Retribalize / Hylo)
- **Estructura de la Tarjeta**:
  - Avatar circular u octogonal con borde temático.
  - Nombre completo + Badge de Rol Comunitario (ej. Propietario, Miembro, Voluntario).
  - Ubicación geográfica con icono `MapPin` (ej. *"Valsequillo de Gran Canaria"*).
  - Bio / Presentación de 2 líneas con truncado elegante (`line-clamp-2`).
  - Tríada visual de etiquetas / saberes destacados (`skills` y `offerings`).
- **Acciones Rápidas en Tarjeta**:
  - Retribalize usa `Keep` / `Pass`. En Kanarii adaptamos este patrón al contexto comunitario prosocial:
    - **Conectar / Mensaje**: Abre modal de contacto rápido o vinculación de Telegram / WhatsApp directo.
    - **Ver Ficha / Pasaporte**: Abre el pasaporte público `/p/:uid` o comunitario.

---

## 2. Benchmark Open Source: Hylo (`Hylozoic/hylo`) & Prosocial UI

En la plataforma abierta de comunidades **Hylo**:
- Las tarjetas no aíslan al individuo; siempre reflejan el **espacio o grupo activo** en el que colabora y su contribución concreta (ofertas y necesidades).
- Se evita el "swiping" frívolo de apps de citas; la acción es orientada a la **cooperación y reciprocidad**.
- En Kanarii, integramos la **Tríada Comunitaria** (Ofrendas, Saberes y Necesidades) como pills semánticas que complementan los datos de compatibilidad determinista.

---

## 3. Explicabilidad Determinista vs. Algoritmos Opacos

- **Fallo crítico detectado en Retribalize**: Al mostrar un match, Retribalize solo ofrece un texto estático de IA sin explicar **por qué** hay afinidad ni dar métricas objetivas.
- **Ventaja de Kanarii**: Kanarii dispone de un motor de cálculo puro y determinista basado en fechas (Kin Maya y canales estables de Diseño Humano).
- **Implementación UX**:
  - En lugar de presentar páginas largas con 1.000 líneas de informe de golpe, se incorpora una **Tarjeta Ejecutiva de Sinergia** al inicio del cálculo:
    - Badge de Arquetipo de Conexión (ej. *Espejo Resonante*, *Compañeros de Camino*).
    - Porcentaje de Afinidad / Sinergia (0–100%).
    - 2–3 puntos clave de complementariedad basados en datos verificables.
    - Botones de acción: *"Guardar Cruce"* / *"Probar con otra persona"*.

---

## 4. Matriz de Componentes a Adoptar / Refactorizar en Sprint 28

| Componente | Estado Actual | Objetivo Sprint 28 | Inspiración / Referencia |
|---|---|---|---|
| `TopBar` / Header público | Ausente en Home pública | Cabecera pública limpia con links a Tour y Login | Retribalize Navbar |
| `Welcome.tsx` (Hero público) | Minimalista (logo + 3 botones centrados) | Layout estructurado con propuesta + 2 CTAs + pilares | Retribalize Hero / TailGrids |
| Enlace a Demos (`KanariiTourPage`) | Clic siempre abría intro paso 1 | Deep-link con `?module=` para abrir módulo exacto | Flow UI |
| `MemberCard.tsx` | Tarjetas heterogéneas con layouts dispersos | Tarjeta unificada estilo Retribalize/Hylo con acciones directas | Hylo Member Directory |
| `CruceView.tsx` | Informe largo sin resumen superior | Tarjeta de Sinergia ejecutiva superior antes del desglose | SaaS Dashboard Summary Cards |

---

## 5. Decisión de Arquitectura: Modelo en 2 Capas, Red de Nodos y Sinergias Deterministas

Tras la ingeniería inversa detallada de Retribalize.io y las sesiones de diseño de producto, se formaliza la arquitectura del encuentro y la convivencia comunitaria en Kanarii:

### A. Diagnóstico y Cambio de Enfoque
- **Situación previa**: El panel de bienvenida/orientación desplegaba directamente todo el menú operativo de la plataforma (Gobernanza, Actas, Tareas, Balances). Esto resultaba confuso y abrumador para un usuario que acaba de registrarse o que aún no pertenece a ninguna comunidad concreta.
- **Aprendizaje de Retribalize**: La interacción y el encuentro humano deben ocurrir antes que la gestión burocrática. Las herramientas operativas solo tienen sentido **dentro del contexto de un nodo específico**. Fuera de él, la experiencia debe ser un dashboard ligero enfocado en descubrir personas afines, nodos y oportunidades de colaboración.

### B. Arquitectura de Navegación en 2 Capas
```
┌────────────────────────────────────────────────────────────────────────┐
│                        CAPA 1: RED GLOBAL                             │
│       (Menú siempre visible al iniciar sesión → va a /dashboard)       │
├────────────────────────────────────────────────────────────────────────┤
│  ⚡ Encuentro & Sinergias (/dashboard)                                  │
│  🌐 Nodos (/comunidades o /nodos)                                      │
│  📅 Eventos (/eventos)                                                 │
│  🏡 Residencias (/residencias)                                         │
│  👥 Directorio de Personas (/personas)                                 │
│  🪪 Mi Pasaporte (/ficha)                                              │
└─────────────────────────────────┬──────────────────────────────────────┘
                                  │ Clic en un nodo → Ficha de Presentación
                                  │ (Tabs: About · Miembros · Actividades)
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   CAPA 2: ESPACIO OPERATIVO DEL NODO                   │
│          (Se activa al pulsar "🌿 Entrar al Espacio del Nodo")          │
├────────────────────────────────────────────────────────────────────────┤
│  ← Volver a la Red (sale del nodo y regresa a /dashboard)              │
│  📢 Tablón Local del Nodo                                              │
│  ⚖️ Gobernanza Sociocrática S3 (Propuestas y Consentimiento)           │
│  📝 Actas y Acuerdos Vivos                                             │
│  ✅ Círculos y Tareas Comunitarias                                     │
│  📆 Calendario Comunal                                                 │
│  💎 Soberanía y Balances                                               │
└────────────────────────────────────────────────────────────────────────┘
```

### C. De "Comunidad" a "Red de Nodos"
El término "comunidad" suele evocar únicamente una ecoaldea física constituida con terreno. Cambiar el paradigma a **Nodos** permite acoger la diversidad real del archipiélago y la red:
1. 🏡 **Nodos Físicos / Ecoaldeas / Fincas**: Espacios con tierra, producción agrícola y convivencia fija.
2. 🛏️ **Nodos de Residencia / Coliving**: Espacios habitacionales que ofrecen estancias temporales, voluntariado o incubadoras comunitarias.
3. 🌐 **Nodos Online / Círculos de Afinidad**: Grupos sin territorio físico compartido (ej. soberanía energética, crianza respetuosa, semillas libres) que se organizan sociocráticamente por asambleas o proyectos.

### D. Eventos y Residencias como Palancas de Interacción Temprana
- La barrera de entrada para mudarse a una comunidad es muy alta.
- **Eventos** (talleres, círculos de palabra, siembras comunitarias, encuentros insulares) y **Residencias** (convocatorias de 1 semana a varios meses) actúan como el puente natural: permiten a las personas conocerse en el mundo real, compartir trabajo y validar afinidades antes de dar un paso definitivo.

### E. Motor de Sinergias Determinista vs. Algoritmos Opacos
- Retribalize delega sus matches en textos genéricos redactados por un LLM ("Writing the why...").
- En Kanarii el motor es **transparente, determinista y no depende de cajas negras**:
  1. 📍 **Proximidad Insular**: Gran Canaria, Tenerife, La Palma, Lanzarote, Fuerteventura, La Gomera, El Hierro o Red Global.
  2. ⚡ **Afinidad Energética (Nuestra API de Astrología)**:
     - **Kin Maya**: Sellos, tonos galácticos y oráculo de relaciones (aliados naturales/análogos, poder oculto, antípodas/tensión creativa, misma onda encantada).
     - **Diseño Humano**: Interacción complementaria entre tipos (Guía del Proyector + Energía del Generador; Manifestadores iniciando + informando), autoridades y canales electromagnéticos activos.
  3. 🤝 **Tríada de Reciprocidad**: Cruce exacto entre lo que una persona ofrece y lo que la otra (o el nodo) necesita.

### F. Hoja de Ruta de Implementación en Sprint 28
- **T-144 (✅ Completada)**: Dashboard de Encuentro (`/dashboard`), tarjeta `SynergyCard` y motor determinista `calcularSinergia`.
- **T-145 (⏳ Siguiente)**: Directorio enriquecido de Nodos (Fincas, Residencias, Nodos Online), Ficha de presentación con pestañas (*About*, *Miembros*, *Actividades*) y botón *"🌿 Entrar al Espacio del Nodo"*.
- **T-146 (⏳ Cierre de Sprint)**: Sidebar de 2 Capas (menú de Red Global vs. Toolset Operativo de Nodo con botón *"← Volver a la Red"*), y secciones de Eventos y Residencias.

---
*Documento aprobado y actualizado para la ejecución de T-144 a T-146 en Sprint 28.*
