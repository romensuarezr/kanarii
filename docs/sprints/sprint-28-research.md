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
*Documento aprobado para la ejecución de T-142 a T-144 en Sprint 28.*
