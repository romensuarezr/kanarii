# Changelog 🌿

Todos los cambios notables en este proyecto serán documentados en este archivo. El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.14.0] — sprint-33 — 2026-11-27

### ✨ Features

- feat(demo): script reproducible de seed y clean para datos demo con imagenes (T-166)
- feat(search): buscador avanzado estilo ReTribalize en DashboardView (T-165)
- feat(T-163): sincronizar adminUids con community_members.rol y gestión de roles/vínculos en ComunidadSubTab
- feat(ux): T-164 limpieza de clasificación de roles y vínculo en PerfilView, FichaView y MemberCard
- feat(roles): separa capas rol/membershipType/headline y valida en firestore.rules (T-162)
- feat(capa2): progressive module disclosure in Sidebar, BottomNav and Tablon empty state (T-158)
- feat(nodes): add enabledModules progressive model, hook and legacy auto-detection (T-157)
- feat(dashboard): remove redundant hero/entity bar and add direct search + Kin chip (T-156)
- feat(nav): move CreateNewModal flat and add Crear nuevo action to Sidebar and BottomNav (T-155)
- feat(dashboard): implement Retribalize 2-action welcome header and CreateNewModal (T-154)
- feat(mobile): implement 2-layer adaptive navigation in BottomNav (T-153)
- feat(branding): replace palmera icon with kanarii logo and enforce Canary Network territorial copy (T-152)
- feat(synergies): implement ConnectModal and connection flow for members (#T-149)
- feat(events-residencies): connect firestore reactivity for events and residencies (#T-148)
- feat(navigation): 2-layer sidebar navigation, events and residencies views (T-146)
- feat(nodos): enhance node directory, node presentation tabs and i18n (T-145)
- feat(dashboard): implement deterministic synergy matching feed and dashboard view (T-144)
- feat(members): tarjetas de miembros estilo retribalize con pasaporte modal y conexion rapida (T-143)
- feat(welcome): home publica retribalizada, enlaces directos a demos y apertura de comunidades (T-142, ADR-027)
- feat(nav): cohesionar navegacion principal, arreglar marketplace 404, separar tablon de gobernanza y anadir calendario (T-141)
- feat(ui): limpiar selector idioma, compartir top-right, integrar avatar en sidebar y unificar pasaporte (T-140)
- feat(share): brand icons centralizados, share modal leaderboard, telegram y contact actions icon-only (T-139)

### 🐛 Bug Fixes

- fix(mobile): tableros Kanban responsivos en vertical para < md (T-161)
- fix(mobile): elimina scroll lateral en filtros y tabs con flex-wrap (T-160)
- fix(mobile): erradica desbordamiento global en /perfil, /ficha y Toaster (T-159)
- fix(sinergias): deduplicate user matches and enforce unique React keys (T-151)
- fix(security): sanitize and normalize membership roles in community_members (T-147)

### 📚 Documentación

- docs(sprint-33): marca Sprint 33 completado (T-162, T-163, T-164)
- docs(sprint-33): seal sprint 33 planning, research and task contracts
- docs(sprint-32): seal sprint 32 mobile responsive planning, research and task contracts
- docs(sprint-31): seal sprint 31 planning, research and task contracts
- docs(sprint-30): mark all sprint 30 tasks completed (T-151, T-152, T-153, T-154)
- docs(sprint-30): align T-154 with Retribalize Find Connections and Create New core actions
- docs(sprint-30): formalize sprint 30 planning, research and task files
- docs(sprint-29): formalize sprint 29 planning, sealed regime and task contracts
- docs(sprint-28): update operating regime to use staging branch for UI/UX consolidation
- docs(research): document 2-layer architecture, node network and deterministic synergy engine for sprint 28
- docs: archive sprint 27 design decisions and ux research
- docs(research): formalizar research de UI/UX de Retribalize y Hylo para Sprint 28
- docs(tasks): archivar task-141 completada
- docs(sprint): actualizar rutas de tareas archivadas en sprint-27
- docs(tasks): archivar task-140 de Sprint 27

### 🔧 Mantenimiento

- chore: archive sprint-32 [v0.13.0]
- chore: archive sprint-31 [v0.12.0]
- chore: archive sprint-30 [v0.11.0]
- chore: archive sprint-29 [v0.10.0]
- chore(tooling): sync core Agent OS assets and upgrade hermes to v0.23.4 (#T-150)
- chore: archive sprint-28 [v0.9.0]
- chore: archive sprint-27 [v0.8.0]
- chore(agent-os): sync core assets to v1.40.0

## [0.13.0] — sprint-32 — 2026-11-26

### ✨ Features

- feat(capa2): progressive module disclosure in Sidebar, BottomNav and Tablon empty state (T-158)
- feat(nodes): add enabledModules progressive model, hook and legacy auto-detection (T-157)
- feat(dashboard): remove redundant hero/entity bar and add direct search + Kin chip (T-156)
- feat(nav): move CreateNewModal flat and add Crear nuevo action to Sidebar and BottomNav (T-155)
- feat(dashboard): implement Retribalize 2-action welcome header and CreateNewModal (T-154)
- feat(mobile): implement 2-layer adaptive navigation in BottomNav (T-153)
- feat(branding): replace palmera icon with kanarii logo and enforce Canary Network territorial copy (T-152)
- feat(synergies): implement ConnectModal and connection flow for members (#T-149)
- feat(events-residencies): connect firestore reactivity for events and residencies (#T-148)
- feat(navigation): 2-layer sidebar navigation, events and residencies views (T-146)
- feat(nodos): enhance node directory, node presentation tabs and i18n (T-145)
- feat(dashboard): implement deterministic synergy matching feed and dashboard view (T-144)
- feat(members): tarjetas de miembros estilo retribalize con pasaporte modal y conexion rapida (T-143)
- feat(welcome): home publica retribalizada, enlaces directos a demos y apertura de comunidades (T-142, ADR-027)
- feat(nav): cohesionar navegacion principal, arreglar marketplace 404, separar tablon de gobernanza y anadir calendario (T-141)
- feat(ui): limpiar selector idioma, compartir top-right, integrar avatar en sidebar y unificar pasaporte (T-140)
- feat(share): brand icons centralizados, share modal leaderboard, telegram y contact actions icon-only (T-139)
- feat(perfil): ux en pestanas, privacidad efectiva, favicon web, whatsapp y selector idioma (T-138)
- feat(ajustes): crear superficie dedicada y enlace en menu de usuario (T-135)
- feat(privacidad): selectores de visibilidad para redes sociales y contacto (T-134)
- feat(contacto): normalizar telefono E.164 y anadir accion directa de WhatsApp (T-137)
- feat(fichas): persistir y mostrar campos de redes sociales en ficha y pasaporte (T-133)

### 🐛 Bug Fixes

- fix(mobile): tableros Kanban responsivos en vertical para < md (T-161)
- fix(mobile): elimina scroll lateral en filtros y tabs con flex-wrap (T-160)
- fix(mobile): erradica desbordamiento global en /perfil, /ficha y Toaster (T-159)
- fix(sinergias): deduplicate user matches and enforce unique React keys (T-151)
- fix(security): sanitize and normalize membership roles in community_members (T-147)

### ♻️ Refactoring

- refactor(perfil): extraer FichaReadOnly para unificar lectura entre perfil y ficha (T-136)

### 📚 Documentación

- docs(sprint-32): seal sprint 32 mobile responsive planning, research and task contracts
- docs(sprint-31): seal sprint 31 planning, research and task contracts
- docs(sprint-30): mark all sprint 30 tasks completed (T-151, T-152, T-153, T-154)
- docs(sprint-30): align T-154 with Retribalize Find Connections and Create New core actions
- docs(sprint-30): formalize sprint 30 planning, research and task files
- docs(sprint-29): formalize sprint 29 planning, sealed regime and task contracts
- docs(sprint-28): update operating regime to use staging branch for UI/UX consolidation
- docs(research): document 2-layer architecture, node network and deterministic synergy engine for sprint 28
- docs: archive sprint 27 design decisions and ux research
- docs(research): formalizar research de UI/UX de Retribalize y Hylo para Sprint 28
- docs(tasks): archivar task-141 completada
- docs(sprint): actualizar rutas de tareas archivadas en sprint-27
- docs(tasks): archivar task-140 de Sprint 27
- docs(sprint-27): marcar sprint 27 como completado
- docs(sprint-27): consolidar research UX + scout de industria (T-136/T-137)

### 🔧 Mantenimiento

- chore: archive sprint-31 [v0.12.0]
- chore: archive sprint-30 [v0.11.0]
- chore: archive sprint-29 [v0.10.0]
- chore(tooling): sync core Agent OS assets and upgrade hermes to v0.23.4 (#T-150)
- chore: archive sprint-28 [v0.9.0]
- chore: archive sprint-27 [v0.8.0]
- chore(agent-os): sync core assets to v1.40.0

## [0.12.0] — sprint-31 — 2026-11-26

### ✨ Features

- feat(capa2): progressive module disclosure in Sidebar, BottomNav and Tablon empty state (T-158)
- feat(nodes): add enabledModules progressive model, hook and legacy auto-detection (T-157)
- feat(dashboard): remove redundant hero/entity bar and add direct search + Kin chip (T-156)
- feat(nav): move CreateNewModal flat and add Crear nuevo action to Sidebar and BottomNav (T-155)
- feat(dashboard): implement Retribalize 2-action welcome header and CreateNewModal (T-154)
- feat(mobile): implement 2-layer adaptive navigation in BottomNav (T-153)
- feat(branding): replace palmera icon with kanarii logo and enforce Canary Network territorial copy (T-152)
- feat(synergies): implement ConnectModal and connection flow for members (#T-149)
- feat(events-residencies): connect firestore reactivity for events and residencies (#T-148)
- feat(navigation): 2-layer sidebar navigation, events and residencies views (T-146)
- feat(nodos): enhance node directory, node presentation tabs and i18n (T-145)
- feat(dashboard): implement deterministic synergy matching feed and dashboard view (T-144)
- feat(members): tarjetas de miembros estilo retribalize con pasaporte modal y conexion rapida (T-143)
- feat(welcome): home publica retribalizada, enlaces directos a demos y apertura de comunidades (T-142, ADR-027)
- feat(nav): cohesionar navegacion principal, arreglar marketplace 404, separar tablon de gobernanza y anadir calendario (T-141)
- feat(ui): limpiar selector idioma, compartir top-right, integrar avatar en sidebar y unificar pasaporte (T-140)
- feat(share): brand icons centralizados, share modal leaderboard, telegram y contact actions icon-only (T-139)
- feat(perfil): ux en pestanas, privacidad efectiva, favicon web, whatsapp y selector idioma (T-138)
- feat(ajustes): crear superficie dedicada y enlace en menu de usuario (T-135)
- feat(privacidad): selectores de visibilidad para redes sociales y contacto (T-134)
- feat(contacto): normalizar telefono E.164 y anadir accion directa de WhatsApp (T-137)
- feat(fichas): persistir y mostrar campos de redes sociales en ficha y pasaporte (T-133)
- feat(T-132): separar rutas perfil y ficha + guardia de rol y fix de hooks

### 🐛 Bug Fixes

- fix(sinergias): deduplicate user matches and enforce unique React keys (T-151)
- fix(security): sanitize and normalize membership roles in community_members (T-147)

### ♻️ Refactoring

- refactor(perfil): extraer FichaReadOnly para unificar lectura entre perfil y ficha (T-136)

### 📚 Documentación

- docs(sprint-31): seal sprint 31 planning, research and task contracts
- docs(sprint-30): mark all sprint 30 tasks completed (T-151, T-152, T-153, T-154)
- docs(sprint-30): align T-154 with Retribalize Find Connections and Create New core actions
- docs(sprint-30): formalize sprint 30 planning, research and task files
- docs(sprint-29): formalize sprint 29 planning, sealed regime and task contracts
- docs(sprint-28): update operating regime to use staging branch for UI/UX consolidation
- docs(research): document 2-layer architecture, node network and deterministic synergy engine for sprint 28
- docs: archive sprint 27 design decisions and ux research
- docs(research): formalizar research de UI/UX de Retribalize y Hylo para Sprint 28
- docs(tasks): archivar task-141 completada
- docs(sprint): actualizar rutas de tareas archivadas en sprint-27
- docs(tasks): archivar task-140 de Sprint 27
- docs(sprint-27): marcar sprint 27 como completado
- docs(sprint-27): consolidar research UX + scout de industria (T-136/T-137)
- docs(pages-map): sincronizar rutas y completitud del perfil (T-115)

### 🔧 Mantenimiento

- chore: archive sprint-30 [v0.11.0]
- chore: archive sprint-29 [v0.10.0]
- chore(tooling): sync core Agent OS assets and upgrade hermes to v0.23.4 (#T-150)
- chore: archive sprint-28 [v0.9.0]
- chore: archive sprint-27 [v0.8.0]
- chore(agent-os): sync core assets to v1.40.0
- chore: sprint-27 planning and task files created
- chore: archive sprint-24 (closed with pending tasks)
- chore: archive sprint-25 [v0.7.0]

## [0.11.0] — sprint-30 — 2026-11-26

### ✨ Features

- feat(dashboard): implement Retribalize 2-action welcome header and CreateNewModal (T-154)
- feat(mobile): implement 2-layer adaptive navigation in BottomNav (T-153)
- feat(branding): replace palmera icon with kanarii logo and enforce Canary Network territorial copy (T-152)
- feat(synergies): implement ConnectModal and connection flow for members (#T-149)
- feat(events-residencies): connect firestore reactivity for events and residencies (#T-148)
- feat(navigation): 2-layer sidebar navigation, events and residencies views (T-146)
- feat(nodos): enhance node directory, node presentation tabs and i18n (T-145)
- feat(dashboard): implement deterministic synergy matching feed and dashboard view (T-144)
- feat(members): tarjetas de miembros estilo retribalize con pasaporte modal y conexion rapida (T-143)
- feat(welcome): home publica retribalizada, enlaces directos a demos y apertura de comunidades (T-142, ADR-027)
- feat(nav): cohesionar navegacion principal, arreglar marketplace 404, separar tablon de gobernanza y anadir calendario (T-141)
- feat(ui): limpiar selector idioma, compartir top-right, integrar avatar en sidebar y unificar pasaporte (T-140)
- feat(share): brand icons centralizados, share modal leaderboard, telegram y contact actions icon-only (T-139)
- feat(perfil): ux en pestanas, privacidad efectiva, favicon web, whatsapp y selector idioma (T-138)
- feat(ajustes): crear superficie dedicada y enlace en menu de usuario (T-135)
- feat(privacidad): selectores de visibilidad para redes sociales y contacto (T-134)
- feat(contacto): normalizar telefono E.164 y anadir accion directa de WhatsApp (T-137)
- feat(fichas): persistir y mostrar campos de redes sociales en ficha y pasaporte (T-133)
- feat(T-132): separar rutas perfil y ficha + guardia de rol y fix de hooks
- feat(communities): propósito, cuidadores y necesidades en tarjetas de comunidad (T-114)
- feat(passport): enlaces sociales y contacto rápido en pasaporte y ficha (T-113)

### 🐛 Bug Fixes

- fix(sinergias): deduplicate user matches and enforce unique React keys (T-151)
- fix(security): sanitize and normalize membership roles in community_members (T-147)

### ♻️ Refactoring

- refactor(perfil): extraer FichaReadOnly para unificar lectura entre perfil y ficha (T-136)

### 📚 Documentación

- docs(sprint-30): mark all sprint 30 tasks completed (T-151, T-152, T-153, T-154)
- docs(sprint-30): align T-154 with Retribalize Find Connections and Create New core actions
- docs(sprint-30): formalize sprint 30 planning, research and task files
- docs(sprint-29): formalize sprint 29 planning, sealed regime and task contracts
- docs(sprint-28): update operating regime to use staging branch for UI/UX consolidation
- docs(research): document 2-layer architecture, node network and deterministic synergy engine for sprint 28
- docs: archive sprint 27 design decisions and ux research
- docs(research): formalizar research de UI/UX de Retribalize y Hylo para Sprint 28
- docs(tasks): archivar task-141 completada
- docs(sprint): actualizar rutas de tareas archivadas en sprint-27
- docs(tasks): archivar task-140 de Sprint 27
- docs(sprint-27): marcar sprint 27 como completado
- docs(sprint-27): consolidar research UX + scout de industria (T-136/T-137)
- docs(pages-map): sincronizar rutas y completitud del perfil (T-115)
- docs(plan): update plan-draft for T-115
- docs(plan): update plan-draft for T-114
- docs(plan): update plan-draft for T-113

### 🔧 Mantenimiento

- chore: archive sprint-29 [v0.10.0]
- chore(tooling): sync core Agent OS assets and upgrade hermes to v0.23.4 (#T-150)
- chore: archive sprint-28 [v0.9.0]
- chore: archive sprint-27 [v0.8.0]
- chore(agent-os): sync core assets to v1.40.0
- chore: sprint-27 planning and task files created
- chore: archive sprint-24 (closed with pending tasks)
- chore: archive sprint-25 [v0.7.0]
- chore(planning): prepare sprint 25 task files and research

## [0.10.0] — sprint-29 — 2026-11-25

### ✨ Features

- feat(synergies): implement ConnectModal and connection flow for members (#T-149)
- feat(events-residencies): connect firestore reactivity for events and residencies (#T-148)
- feat(navigation): 2-layer sidebar navigation, events and residencies views (T-146)
- feat(nodos): enhance node directory, node presentation tabs and i18n (T-145)
- feat(dashboard): implement deterministic synergy matching feed and dashboard view (T-144)
- feat(members): tarjetas de miembros estilo retribalize con pasaporte modal y conexion rapida (T-143)
- feat(welcome): home publica retribalizada, enlaces directos a demos y apertura de comunidades (T-142, ADR-027)
- feat(nav): cohesionar navegacion principal, arreglar marketplace 404, separar tablon de gobernanza y anadir calendario (T-141)
- feat(ui): limpiar selector idioma, compartir top-right, integrar avatar en sidebar y unificar pasaporte (T-140)
- feat(share): brand icons centralizados, share modal leaderboard, telegram y contact actions icon-only (T-139)
- feat(perfil): ux en pestanas, privacidad efectiva, favicon web, whatsapp y selector idioma (T-138)
- feat(ajustes): crear superficie dedicada y enlace en menu de usuario (T-135)
- feat(privacidad): selectores de visibilidad para redes sociales y contacto (T-134)
- feat(contacto): normalizar telefono E.164 y anadir accion directa de WhatsApp (T-137)
- feat(fichas): persistir y mostrar campos de redes sociales en ficha y pasaporte (T-133)
- feat(T-132): separar rutas perfil y ficha + guardia de rol y fix de hooks
- feat(communities): propósito, cuidadores y necesidades en tarjetas de comunidad (T-114)
- feat(passport): enlaces sociales y contacto rápido en pasaporte y ficha (T-113)

### 🐛 Bug Fixes

- fix(security): sanitize and normalize membership roles in community_members (T-147)
- fix(close-task): resolución dinámica de sprint y soporte amplio de tokens (60160da)

### ♻️ Refactoring

- refactor(perfil): extraer FichaReadOnly para unificar lectura entre perfil y ficha (T-136)

### 📚 Documentación

- docs(sprint-29): formalize sprint 29 planning, sealed regime and task contracts
- docs(sprint-28): update operating regime to use staging branch for UI/UX consolidation
- docs(research): document 2-layer architecture, node network and deterministic synergy engine for sprint 28
- docs: archive sprint 27 design decisions and ux research
- docs(research): formalizar research de UI/UX de Retribalize y Hylo para Sprint 28
- docs(tasks): archivar task-141 completada
- docs(sprint): actualizar rutas de tareas archivadas en sprint-27
- docs(tasks): archivar task-140 de Sprint 27
- docs(sprint-27): marcar sprint 27 como completado
- docs(sprint-27): consolidar research UX + scout de industria (T-136/T-137)
- docs(pages-map): sincronizar rutas y completitud del perfil (T-115)
- docs(plan): update plan-draft for T-115
- docs(plan): update plan-draft for T-114
- docs(plan): update plan-draft for T-113
- docs(tasks): confirmar eliminacion de rutas antiguas tras mover a _archived
- docs(sprint): archivar sprint-26.md y sprint-26-research.md en _archived

### 🔧 Mantenimiento

- chore(tooling): sync core Agent OS assets and upgrade hermes to v0.23.4 (#T-150)
- chore: archive sprint-28 [v0.9.0]
- chore: archive sprint-27 [v0.8.0]
- chore(agent-os): sync core assets to v1.40.0
- chore: sprint-27 planning and task files created
- chore: archive sprint-24 (closed with pending tasks)
- chore: archive sprint-25 [v0.7.0]
- chore(planning): prepare sprint 25 task files and research
- chore(agent-os): sync core assets (e98d423df39f9b925d183452ad84175448cf6513)
- chore(agent-os): sync core assets (e091219dba7dd1658c623b3fcc4dd704c706745e)
- chore(agent-os): sync --remote support in sync.sh and check-session (738e7ef)
- chore(agent-os): sync close-task.sh (859cb16)
- chore(agent-os): sync core assets (3ed8470)

## [0.9.0] — sprint-28 — 2026-11-25

### ✨ Features

- feat(navigation): 2-layer sidebar navigation, events and residencies views (T-146)
- feat(nodos): enhance node directory, node presentation tabs and i18n (T-145)
- feat(dashboard): implement deterministic synergy matching feed and dashboard view (T-144)
- feat(members): tarjetas de miembros estilo retribalize con pasaporte modal y conexion rapida (T-143)
- feat(welcome): home publica retribalizada, enlaces directos a demos y apertura de comunidades (T-142, ADR-027)
- feat(nav): cohesionar navegacion principal, arreglar marketplace 404, separar tablon de gobernanza y anadir calendario (T-141)
- feat(ui): limpiar selector idioma, compartir top-right, integrar avatar en sidebar y unificar pasaporte (T-140)
- feat(share): brand icons centralizados, share modal leaderboard, telegram y contact actions icon-only (T-139)
- feat(perfil): ux en pestanas, privacidad efectiva, favicon web, whatsapp y selector idioma (T-138)
- feat(ajustes): crear superficie dedicada y enlace en menu de usuario (T-135)
- feat(privacidad): selectores de visibilidad para redes sociales y contacto (T-134)
- feat(contacto): normalizar telefono E.164 y anadir accion directa de WhatsApp (T-137)
- feat(fichas): persistir y mostrar campos de redes sociales en ficha y pasaporte (T-133)
- feat(T-132): separar rutas perfil y ficha + guardia de rol y fix de hooks
- feat(communities): propósito, cuidadores y necesidades en tarjetas de comunidad (T-114)
- feat(passport): enlaces sociales y contacto rápido en pasaporte y ficha (T-113)
- feat(i18n): internacionalizar UserAvatarMenu y agregar claves userMenu en common.json
- feat(i18n): internacionalizar UI fija de FichaView y claves passport (T-131)
- feat(kin): exportar tonoIndex, selloIndex y colorIndex en KinData para i18n (T-131)

### 🐛 Bug Fixes

- fix(close-task): resolución dinámica de sprint y soporte amplio de tokens (60160da)

### ♻️ Refactoring

- refactor(perfil): extraer FichaReadOnly para unificar lectura entre perfil y ficha (T-136)

### 📚 Documentación

- docs(sprint-28): update operating regime to use staging branch for UI/UX consolidation
- docs(research): document 2-layer architecture, node network and deterministic synergy engine for sprint 28
- docs: archive sprint 27 design decisions and ux research
- docs(research): formalizar research de UI/UX de Retribalize y Hylo para Sprint 28
- docs(tasks): archivar task-141 completada
- docs(sprint): actualizar rutas de tareas archivadas en sprint-27
- docs(tasks): archivar task-140 de Sprint 27
- docs(sprint-27): marcar sprint 27 como completado
- docs(sprint-27): consolidar research UX + scout de industria (T-136/T-137)
- docs(pages-map): sincronizar rutas y completitud del perfil (T-115)
- docs(plan): update plan-draft for T-115
- docs(plan): update plan-draft for T-114
- docs(plan): update plan-draft for T-113
- docs(tasks): confirmar eliminacion de rutas antiguas tras mover a _archived
- docs(sprint): archivar sprint-26.md y sprint-26-research.md en _archived
- docs(sprint): cerrar y archivar T-130, T-131 y Sprint 26
- docs(sprint): actualizar trazabilidad de tareas T-130 y T-131 en sprint-26.md
- docs(ideas): capturar propuesta de centralización de formato de fechas civiles e instantes

### 🔧 Mantenimiento

- chore: archive sprint-27 [v0.8.0]
- chore(agent-os): sync core assets to v1.40.0
- chore: sprint-27 planning and task files created
- chore: archive sprint-24 (closed with pending tasks)
- chore: archive sprint-25 [v0.7.0]
- chore(planning): prepare sprint 25 task files and research
- chore(agent-os): sync core assets (e98d423df39f9b925d183452ad84175448cf6513)
- chore(agent-os): sync core assets (e091219dba7dd1658c623b3fcc4dd704c706745e)
- chore(agent-os): sync --remote support in sync.sh and check-session (738e7ef)
- chore(agent-os): sync close-task.sh (859cb16)
- chore(agent-os): sync core assets (3ed8470)

## [0.8.0] — sprint-27 — 2026-11-23

### ✨ Features

- feat(ui): limpiar selector idioma, compartir top-right, integrar avatar en sidebar y unificar pasaporte (T-140)
- feat(share): brand icons centralizados, share modal leaderboard, telegram y contact actions icon-only (T-139)
- feat(perfil): ux en pestanas, privacidad efectiva, favicon web, whatsapp y selector idioma (T-138)
- feat(ajustes): crear superficie dedicada y enlace en menu de usuario (T-135)
- feat(privacidad): selectores de visibilidad para redes sociales y contacto (T-134)
- feat(contacto): normalizar telefono E.164 y anadir accion directa de WhatsApp (T-137)
- feat(fichas): persistir y mostrar campos de redes sociales en ficha y pasaporte (T-133)
- feat(T-132): separar rutas perfil y ficha + guardia de rol y fix de hooks
- feat(communities): propósito, cuidadores y necesidades en tarjetas de comunidad (T-114)
- feat(passport): enlaces sociales y contacto rápido en pasaporte y ficha (T-113)
- feat(i18n): internacionalizar UserAvatarMenu y agregar claves userMenu en common.json
- feat(i18n): internacionalizar UI fija de FichaView y claves passport (T-131)
- feat(kin): exportar tonoIndex, selloIndex y colorIndex en KinData para i18n (T-131)
- feat(i18n): internacionalización de componentes de animación pedagógica del tour (T-130)
- feat(tour): T-129 internacionalizacion completa de la pagina del tour y selector de idioma
- feat(i18n): T-127 script auxiliar CLI de deteccion de copy hardcodeado en JSX (Fase 2)

### 🐛 Bug Fixes

- fix(close-task): resolución dinámica de sprint y soporte amplio de tokens (60160da)
- fix(welcome): T-128 pluralizacion i18n del contador de miembros en nodos de Welcome
- fix(i18n): internacionalizar indicador de sincronizacion SyncIndicator
- fix(welcome): corregir cobertura i18n residual en miembros y pantalla de carga de Welcome

### ♻️ Refactoring

- refactor(perfil): extraer FichaReadOnly para unificar lectura entre perfil y ficha (T-136)

### 📚 Documentación

- docs(sprint): actualizar rutas de tareas archivadas en sprint-27
- docs(tasks): archivar task-140 de Sprint 27
- docs(sprint-27): marcar sprint 27 como completado
- docs(sprint-27): consolidar research UX + scout de industria (T-136/T-137)
- docs(pages-map): sincronizar rutas y completitud del perfil (T-115)
- docs(plan): update plan-draft for T-115
- docs(plan): update plan-draft for T-114
- docs(plan): update plan-draft for T-113
- docs(tasks): confirmar eliminacion de rutas antiguas tras mover a _archived
- docs(sprint): archivar sprint-26.md y sprint-26-research.md en _archived
- docs(sprint): cerrar y archivar T-130, T-131 y Sprint 26
- docs(sprint): actualizar trazabilidad de tareas T-130 y T-131 en sprint-26.md
- docs(ideas): capturar propuesta de centralización de formato de fechas civiles e instantes
- docs(i18n): actualizar reporte de paridad i18n tras T-129
- docs(i18n): actualizar i18n-parity-report.md tras T-128
- docs(sprint-26): añadir T-126 (Completada) y T-127 (Fase 2 diferida)
- docs(tasks): archivar task-126
- docs(i18n): T-126 formalizar guardrails de i18n para agentes en Kanarii
- docs(sprint-26): cerrar Sprint 26 y archivar tareas pendientes de .agents/tasks

### 🔧 Mantenimiento

- chore(agent-os): sync core assets to v1.40.0
- chore: sprint-27 planning and task files created
- chore: archive sprint-24 (closed with pending tasks)
- chore: archive sprint-25 [v0.7.0]
- chore(planning): prepare sprint 25 task files and research
- chore(agent-os): sync core assets (e98d423df39f9b925d183452ad84175448cf6513)
- chore(agent-os): sync core assets (e091219dba7dd1658c623b3fcc4dd704c706745e)
- chore(agent-os): sync --remote support in sync.sh and check-session (738e7ef)
- chore(agent-os): sync close-task.sh (859cb16)
- chore(agent-os): sync core assets (3ed8470)

## [0.7.0] — sprint-25 — 2026-11-22

### ✨ Features

- feat(communities): propósito, cuidadores y necesidades en tarjetas de comunidad (T-114)
- feat(passport): enlaces sociales y contacto rápido en pasaporte y ficha (T-113)
- feat(i18n): internacionalizar UserAvatarMenu y agregar claves userMenu en common.json
- feat(i18n): internacionalizar UI fija de FichaView y claves passport (T-131)
- feat(kin): exportar tonoIndex, selloIndex y colorIndex en KinData para i18n (T-131)
- feat(i18n): internacionalización de componentes de animación pedagógica del tour (T-130)
- feat(tour): T-129 internacionalizacion completa de la pagina del tour y selector de idioma
- feat(i18n): T-127 script auxiliar CLI de deteccion de copy hardcodeado en JSX (Fase 2)
- feat: fix/T 125 welcome i18n activity fix(T-125)
- feat: gemini multilingual profiles(T-124)
- feat: i18n astrology hd(T-123)
- feat: docs/T 122 update pages map i18n(T-122)
- feat: i18n tests fallback(T-121)
- feat(i18n): i18n determinista para Firma Galáctica Kin Maya (sellos, tonos, colores, roles) en pasaporte
- feat(i18n): T-119 internacionalizar Welcome, Auth, Sidebar y BottomNav
- feat: language selector html lang(T-118)
- feat: i18n setup provider(T-117)
- feat: audit i18n json base(T-116)
- feat: registro expres perfil(T-112)

### 🐛 Bug Fixes

- fix(close-task): resolución dinámica de sprint y soporte amplio de tokens (60160da)
- fix(welcome): T-128 pluralizacion i18n del contador de miembros en nodos de Welcome
- fix(i18n): internacionalizar indicador de sincronizacion SyncIndicator
- fix(welcome): corregir cobertura i18n residual en miembros y pantalla de carga de Welcome
- fix(i18n): traducir cabecera de comunidades en el pasaporte a Communities / Comunidades
- fix(i18n): traducir textos fijos de UI en el pasaporte público en namespace passport
- fix(i18n): corregir navegabilidad de miembros en Welcome y eliminar claves tabs
- fix(i18n): conectar i18n en WelcomeHeroSections y status de orientacion

### 📚 Documentación

- docs(pages-map): sincronizar rutas y completitud del perfil (T-115)
- docs(plan): update plan-draft for T-115
- docs(plan): update plan-draft for T-114
- docs(plan): update plan-draft for T-113
- docs(tasks): confirmar eliminacion de rutas antiguas tras mover a _archived
- docs(sprint): archivar sprint-26.md y sprint-26-research.md en _archived
- docs(sprint): cerrar y archivar T-130, T-131 y Sprint 26
- docs(sprint): actualizar trazabilidad de tareas T-130 y T-131 en sprint-26.md
- docs(ideas): capturar propuesta de centralización de formato de fechas civiles e instantes
- docs(i18n): actualizar reporte de paridad i18n tras T-129
- docs(i18n): actualizar i18n-parity-report.md tras T-128
- docs(sprint-26): añadir T-126 (Completada) y T-127 (Fase 2 diferida)
- docs(tasks): archivar task-126
- docs(i18n): T-126 formalizar guardrails de i18n para agentes en Kanarii
- docs(sprint-26): cerrar Sprint 26 y archivar tareas pendientes de .agents/tasks
- docs(task-124): documentar tarea de backlog T-124 para perfil multilingüe estructurado de Gemini
- docs: registrar observaciones de cierre T-119 para T-120/T-121

### 🔧 Mantenimiento

- chore(planning): prepare sprint 25 task files and research
- chore(agent-os): sync core assets (e98d423df39f9b925d183452ad84175448cf6513)
- chore(agent-os): sync core assets (e091219dba7dd1658c623b3fcc4dd704c706745e)
- chore(agent-os): sync --remote support in sync.sh and check-session (738e7ef)
- chore(agent-os): sync close-task.sh (859cb16)
- chore(agent-os): sync core assets (3ed8470)

## [0.6.0] — sprint-18 — 2026-07-30

### ✨ Features

- feat: docs/T 080 adr 024 arquitectura agentes(T-080)
- feat: api router http(T-079)
- feat: mcp adapter server(T-078)
- feat: telegram bot adapter(T-077)
- feat: servicio acciones pendientes(T-075)
- feat: servicio auditoria inmutable(T-074)
- feat: servicio identidad telegram(T-073)
- feat: contracts identidad auditoria(T-072)

### 🐛 Bug Fixes

- fix(telegram): fix AgentType literal to 'telegram-bot' in middleware.ts

### 📚 Documentación

- docs(sprint-planning): sprint-18 planning — conversational integration (Telegram bot + MCP server + HTTP API + ADR-024)
- docs(sprint-17): sync ROADMAP.md and archived sprint-17.md status to 4/4 completed
- docs(sprint-17): finalize foundational sprint-17 plan based on src/lib/services/ and defer Telegram/MCP to sprint-18
- docs(sprint-17): finalize full sprint plan with identity resolution, audit middleware and pending action contracts
- docs(sprint-17): add channel taxonomy ('web'|'telegram'|'mcp'|'api'), sourceAction audit granularity, and Telegram identity status lifecycle ('pending'|'linked'|'revoked')
- docs(sprint-17): refine sprint planning focus on UX, linked Telegram identity, and multi-channel auditability
- docs(sprint-planning): sprint-17 planning — agent integration, MCP server & Telegram bot architecture

### 🔧 Mantenimiento

- chore: archive sprint-17 [v0.5.0]
- chore(sprint-16): update archived sprint status to 4/4 completed
- chore: archive sprint-16 [v0.4.1]
- chore(gitignore): add agent-os generated files and session lock exclusions
- chore(agent-os): sync latest core modifications including detect-stack.sh
- chore(agents): sync global rules and skills from agent-os core

## [0.5.0] — sprint-17 — 2026-07-30

### ✨ Features

- feat: servicio acciones pendientes(T-075)
- feat: servicio auditoria inmutable(T-074)
- feat: servicio identidad telegram(T-073)
- feat: contracts identidad auditoria(T-072)

### 📚 Documentación

- docs(sprint-17): finalize foundational sprint-17 plan based on src/lib/services/ and defer Telegram/MCP to sprint-18
- docs(sprint-17): finalize full sprint plan with identity resolution, audit middleware and pending action contracts
- docs(sprint-17): add channel taxonomy ('web'|'telegram'|'mcp'|'api'), sourceAction audit granularity, and Telegram identity status lifecycle ('pending'|'linked'|'revoked')
- docs(sprint-17): refine sprint planning focus on UX, linked Telegram identity, and multi-channel auditability
- docs(sprint-planning): sprint-17 planning — agent integration, MCP server & Telegram bot architecture

### 🔧 Mantenimiento

- chore(sprint-16): update archived sprint status to 4/4 completed
- chore: archive sprint-16 [v0.4.1]
- chore(gitignore): add agent-os generated files and session lock exclusions
- chore(agent-os): sync latest core modifications including detect-stack.sh
- chore(agents): sync global rules and skills from agent-os core

## [0.4.1] — sprint-16 — 2026-07-30

### 🔧 Mantenimiento

- chore(gitignore): add agent-os generated files and session lock exclusions
- chore(agent-os): sync latest core modifications including detect-stack.sh
- chore(agents): sync global rules and skills from agent-os core

## [0.4.0] — sprint-15 — 2026-06-11

### ✨ Features

- feat: estandarizar purpose(T-065)
- feat: ADR-021 contrato de completitud + checklist en session-start
- feat: add update-mvp-tracker.sh
- feat(T-063): rediseño de pasaporte comunitario con soporte multi-comunidad, privacidad y compartir
- feat: unificacion manual perfil(T-062)
- feat(T-062): unificacion de manuales, control de privacidad y sincronizacion de pasaportes
- feat: pdf manual(T-061)
- feat(manual): implementar exportacion de PDF mediante print-HTML nativo en T-061
- feat: refactor manual(T-060)
- feat(T-060): refactorizar manual en capas con carga lazy por pestañas e invalidación por hash
- feat: cruce capas(T-059)
- feat(fichas): crear getFichaHash()
- feat(T-058): sistema base de notificaciones — tipos, hook, badge Sidebar
- feat(T-055): crear script migrate-saberes.ts y actualizar task-055.md
- feat: kin maya cruce(T-056)
- feat: conectar tablon mencion(T-054)
- feat(T-052): implementar pasaporte comunitario completo y funciones para og tags
- feat(tareas): enable cancel button in CreateTareaModal during submitting (T-053)
- feat(pwa): migrate to vite-plugin-pwa (T-051) and setup sprint 12
- feat: field error(T-045)
- feat(ui): migrar CreateProposalWizard, AuthGateModal y ResponseModal a FieldError
- feat(ui): migrar FichaPreview y RegistroComunidadView a FieldError
- feat(ui): implementar component FieldError y migrar FichaView y CreateProjectModal
- feat: tipado interfaces core(T-044)
- feat: fix calendario kin(T-043)
- feat: show Kin Maya (Firma Galactica) in FichaView identity section
- feat: inject Kin Maya into generarPerfilVisual and generarManual prompts
- feat: add kinMaya utility — Dreamspell/Tzolkin 260-day cycle calculation
- feat: despliegue firebase(T-042)
- feat(bundle): split vendors with manualChunks and apply lazy loading to routes
- feat(deploy): config firebase hosting & github actions pipeline
- feat: add IMPLEMENTED.md registry + auto-update in close-task.sh + sprint-planning step 2c guard
- feat: standardize headers(T-041)
- feat(ui): estandarizar cabeceras y layout responsivos (T-041)
- feat: sync indicator offline(T-040)
- feat(T-040): implementar indicador de red online/offline y escrituras pendientes
- feat: bug triada persistencia(T-038)
- feat(T-038): corregir persistencia de triada comunitaria y unificar lectura de fichas en profiles
- feat: pasaporte ayudas(T-036)
- feat: welcome hero sections(T-035)
- feat: persistencia offline(T-037)
- feat: close-sprint.sh includes CHANGELOG.md in archive commit
- feat: add update-changelog.sh and integrate into session-close workflow
- feat(scripts): add generate-digest.sh + complexity threshold in inventory-check
- feat(agents): add inventory-check.sh + update sprint-planning and session-start with anti-duplication firewall
- feat: modal respuesta s3(T-034)
- feat: sala deliberacion s3(T-033)
- feat: migracion triada comunitaria(T-023)
- feat: fix fallback comunidad(T-032)
- feat: maquina estados s3(T-031)
- feat(governance): S3 status transition improvements for integrando and en_objeciones
- feat: generalizar validation communityid(T-029)
- feat: logout cleanup(T-028)
- feat(workflow): close-task.sh y session-close.md sin argumentos, mensaje derivado de rama
- feat(marketplace): vista de detalle de acuerdo, historial y enmiendas
- feat(proyectos): contador de solicitudes de proyectos pendientes en sidebar
- feat(agents): lazy-planning rule en caveman.md + cerrar hueco Searched-for en session-start.md
- feat(agents): close-task.sh + simplificar session-close con protocolo atómico
- feat(calendario): control de permisos en eventos y sanitizacion de payload antes de guardar en Firestore
- feat(deliberacion): T-027 directorio de decisiones con filtros de estado y badge de atencion requerida
- feat(agents): check-sprint.sh + actualizar sprint-planning y caveman con contrato de contexto
- feat(T-020): ClarificationThread para hilos de aclaración de dudas
- feat(T-019): CTA aclaración dudas + fixes compilación S3
- feat(T-018): backfill members profile script & ADRs 009-011
- feat(T-017): fix de sobreescritura de ficha y registro de ADR-008
- feat(T-017): corregir displayName vacio al re-entrar por invitacion y solicitudes
- feat(T-016): modularizar appService.ts por dominio en src/lib/services/
- feat(T-015): diferenciar causas de error al canjear invitaciones
- feat(T-014): aplicar DEFAULT_LIST_LIMIT = 50 a todas las listas de Firestore y actualizar sprint-04
- feat(T-013): abstraer imports de Firebase en hooks y validar communityId
- feat(T-011): move community switcher to sidebar header on desktop and bottom sheet on mobile
- feat: implementar reglas de seguridad en firestore.rules para evitar bypass de membresía (T-010)
- feat(T-009): sync user profile with community memberships and optimize listenAppUser
- feat(security): T-008 restringir lectura/escritura en subcolecciones de propuestas y posts por comunidad
- feat(security): implement firestore security rules for community_exits, profiles and fichas onboarding
- feat(invitaciones): redirigir a comunidad despues de unirse y registrar miembro en batch
- feat: asegurar reglas de seguridad Firestore para actas y fichas (T-005)
- feat(T-002): eliminar email de admin hardcoded y alinear reglas de seguridad en espanol
- feat(T-001): implementar firestore rules y corregir reactividad de auth
- feat(workflow): añadir punto de entrada de investigación en Fase 2 de session-start
- feat(workflow): añadir paso 6 de pausa y handoff a /session-start en sprint-planning
- feat(.agents): add git-gardener skill with Phase 0 sync + gone branches + divergence detection
- feat: sistema antisabotaje — núcleo completo
- feat(.agents): token optimization - caveman, DOE framework, skill-manager, tasks template
- feat: add database audit and cleanup scripts
- feat: integración onboarding pedagógico con tour S3, escape hatch y progress tracker estático
- feat(.agents): add inbox-integrator skill and inbox template manifest
- feat(ficha-comunidad): landing v2 + arquetipos S3 + fix context crash al borrar comunidad + fix duplicate toast keys
- feat(.agents): add agent-onboarding skill
- feat(.agents): add chrome-devtools-first, agent-ready-web-contract skills and snapshot-over-screenshot rule
- feat(comunidades): settings CRUD + auto-switch + ficha pública /c/:slug + configuración inline para admin
- feat(comunidades): wizard de registro con geocodificación y banner corregido
- feat(admin): add community health dashboard with metrics, chart and activity feed
- feat(admin): restructure panel with tab navigation, URL persistence + fix TS bugs
- feat(acuerdos): add counterproposal flow, negotiation turns, undo cancel + badge for contraoferta
- feat(badge): notify solicitante when acuerdo status changes via localStorage timestamp
- feat(ux): clean debug logs, update roadmap, fix redirects and modals
- feat(nav): navigate to mis_acuerdos tab when badge clicked + cleanup logs
- feat(acuerdos): chip fecha vencida + badge nav incluye en_curso expirado
- feat(nav): badge acuerdos pendientes en Sidebar y BottomNav
- feat(solicitudes): rejection flow with modal, reason display for admin and applicant
- feat(hooks): add useFichaActions.ts
- feat(community): member lifecycle - expulsion, voluntary exit, compound key community_members
- feat(hooks): create useServicioActions and migrate MarketplaceView
- feat(hooks): create useComunidadActions and migrate ComunidadesView and AdminSolicitudesView
- feat(hooks): create useProyectoActions and migrate ProyectosView
- feat(hooks): extend usePropuestaActions and migrate Gobernanza components (Wizard, PropuestaDetail, ResponseModal)
- feat(hooks): migrate PostDetailModal to usePostActions, fix missing toast on addRespuesta, fix useActaActions to use saveActa
- feat(hooks): create useEventoActions and migrate CalendarioView to action hook pattern
- feat(hooks): create usePropuestaActions and migrate PropuestasView to action hook pattern
- feat(hooks): create useActaActions and migrate ActasPanel to action hook pattern
- feat(hooks): create usePostActions and migrate Tablon to action hook pattern
- feat: display text positions (objections, doubts, concerns) in PropuestaDetail
- feat: enforce mandatory text field for 'duda' response type in ResponseModal
- feat: professionalize data architecture and member management system
- feat(gobernanza): motor de quórum S3 completo
- feat(infra): instalar agent-skills de Firebase y añadir skill personalizada firebase-kanarii
- feat(propuestas): S3Timeline + ConsentGrid con privacidad por diseño
- feat(propuestas): ResponseModal con jerarquía visual S3 y validación de objeciones
- feat(propuestas): PropuestaDetail con diferenciación de roles y estado acordada
- feat(propuestas): PropuestaCard + PropuestasView con Kanban de gobernanza
- feat: complete marketplace sovereignty MVP level 1 with owner actions and undoable delete
- feat: unified auth modal with login mode, fix magic link return flow for existing users
- feat: unificación de persistencia de onboarding y fix de limbo arquitectónico (Abián)
- feat: magic link cross-device persistence, membership guards, and admin ficha integration
- feat: magic link auth + google on ficha save — unauthenticated onboarding with auth gate before persist
- feat: invitation code generator and management in admin panel — mobile nav parity for communities and admin links
- feat: community admin panel and navigation visibility fixes
- feat: community model v2 — invitations, manifesto, multi-membership and discovery services
- feat: update visual identity with palm icon in sidebar and logo in welcome screen
- feat: replace placeholder icons with kanarii-logo.svg in sidebar
- feat: inline editing for community board posts
- feat: community board with needs/offers, async responses and state management
- feat: community calendar with real-time sync and premium UI
- feat: structured cruce analysis with CNV, shadows, rank map and enriched channels
- feat: reactividad total en panel de detalle y modal de edición de actas
- feat: refactor ProyectosView a arquitectura DRY con useProyectos y useEntityActions
- feat: complete architectural refactor Phase 2 - dumb views and service centralization
- feat: complete architecture refactor phase 1 - foundation hooks
- feat: standard architecture rules, visual redesign of EntityCard and audit skill

### 🐛 Bug Fixes

- fix: nombre provider en Marketplace + getMemberName con fallback reactivo a /profiles
- fix: doble guarda isGlobalAdmin en todas las colecciones de gestión + ADR-022
- fix: isGlobalAdmin en reglas solicitudes + error handler onSnapshot
- fix: vite dev — COOP allow-popups y deshabilitar SW en dev
- fix: optimizar logo SVG y actualizar config PWA + Node 24 en CI
- fix(PWA): habilitar devOptions para servir manifest en desarrollo
- fix(PWA): corregir la ruta del manifest en index.html
- fix(tareas): allow canceling CreateTareaModal during submit (T-053)
- fix(kinMaya): anchor correcto 23-jun-1987 y excluir 29-feb (Hunab Ku)
- fix(types): corregir firma de addFicha en useFichaActions
- fix(kinMaya): corregir anchor date Dreamspell — Kin 1 = 3 jul 1987
- fix(protocol): cerrar grieta task files cruzados y Listed directory en .agents/tasks/
- fix(protocol): ampliar checkpoint lazy-planning, tabla de violaciones y script fusionado
- fix(workflow): checkpoint lazy-planning (Fase 2.5), auditoría vinculada, mecanismo en caveman, verificación en session-close y script check-lazy-planning.sh
- fix(workflow): añadir campo audit trail en bloque de aprobación Fase 3.5
- fix(workflow): eliminar lock antes del git add -A en close-task.sh
- fix(gobernanza): usar currentCommunityId de ComunidadContext para validar acceso a propuestas
- fix(T-017): añadir guardia de datos de perfil al sincronizar fichas
- fix(T-017): forzar refresh de auth y leer profiles directamente para displayName en reingreso con sesión activa
- fix(T-017): evitar sobreescribir displayName vacio en getAppUser needsUpdate
- fix(T-017): refinar fallback de displayName y nombre en invitaciones
- fix(T-017): fix displayName backfill y getMemberName fallback
- fix(agents): detectar tareas En curso en FASE 1 y alertar antes de continuar
- fix(agents): marcar sesión cerrada en task file ANTES de archivar (C4)
- fix: mover firebase-crashlytics y firebase-data-connect a _archived/ con contenido completo
- fix: auditoría QwenCoder + renombrar inbox/ → external-inbox/
- fix: restaurar accesibilidad-comunitaria al activo + actualizar inventario
- fix: defensive fallback for deleted servicioId in acuerdos
- fix(dashboard): robust date parsing for acuerdos chart
- fix(members): improve getMemberName fallback resolution
- fix(marketplace): add stopPropagation to acuerdo modal trigger
- fix(members): resolve rolComunitario field mapping
- fix: remove arquetipo selector from FichaModal
- fix: remove arquetipo selector from FichaModal
- fix: rolComunitario field mapping in ComunidadSubTab
- fix: AcuerdoDetailModal conditional in AdminPanelModals
- fix(admin-panel): roles, gráfico dashboard y key prop en TareasPanel
- fix(admin): fallback for invalid dates and deleted services in Marketplace tab
- fix(members): getMemberName returns Miembro for unknown UIDs after load
- fix(marketplace): use getMemberName from useCommunityMembers hook (DRY)
- fix(nav): hoist isAdmin declaration in BottomNav
- fix(acuerdos): replace undefined with null for fechaPropuesta + type safety
- fix(solicitudes): create community_members doc on request approval
- fix(ficha): show leave button using appUser.communityIds instead of stale ficha.communityId
- fix(admin): show correct nombreUsuario in bajas recientes
- fix(admin): member lifecycle bugs - nombre en bajas, Abián invisible en lista
- fix(ficha): move displayFicha declaration before useEffect to resolve TDZ ReferenceError
- fix(invitations): reactive appUser listener, duplicate membership guard, input sanitization, silent error toast control
- fix: define closeModal in ActasPanel, fix EntityCard props, add useTareaActions and migrate TareasPanel and CreateActaModal
- fix(hooks): add missing useCallback import in usePropuestaDetail
- fix(hooks): normalize reload and error contract in useCommunityMembers, useActas, useFicha, usePropuestaDetail, usePropuestas, useTareas
- fix(hooks): normalize reload and error contract in useAcuerdos, useEventos, usePosts, useServicios
- fix(AdminPanel): consolidate imports and use correct getUserFicha export
- fix: implement lazy TTL cleanup for pending fichas (Spark Plan optimization)
- fix: ensure communityId persistence in community_members index
- fix(appService): permitir respuesta del autor y corrección de tipos TS
- fix(onboarding): propagar communityId a fichas/profiles al usar invitación
- fix: communities view — mobile layout, input visibility and submission spinner reset
- fix: AdminPanel crashes, data backfill and multi-community scoping
- fix: resolver lectura de datos de Diseño Humano y cálculo de canales
- fix: mejorar reactividad del panel de actas y limpieza de logs
- fix: añadir import de saveActa y corregir uso de useToast
- fix: corregir argumentos de saveActa en CreateActaModal
- fix: restaurar funcionalidad de guardado en CreateActaModal
- fix: sincronizar props de KanbanBoard y añadir loader visual
- fix: añadir seguridad ante nulos en mapeo de habilidades de proyectos
- fix: restaurar renderizado de ProyectosView añadiendo iconos faltantes
- fix: startDelete config en renderProjectCard + import EntityVariant

### ♻️ Refactoring

- refactor(types): tipar campos core de Ficha y corregir compatibilidades en FichaView
- refactor: T-021 migrate all realtime firestore hooks to useFirestoreCollection & fix selected project reactivity bug
- refactor(agents): compactar session-start.md bajo límite 12000 chars
- refactor(admin-panel): SRP completo — AdminPanel.tsx de 1468 a 240 líneas
- refactor(admin): extract useDashboardStats hook
- refactor(admin): extract badge utilities and consolidate useCommunityMembers
- refactor(pages): extract AdminSolicitudesView logic to hooks
- refactor(hooks): fix useActas return signature to match project standard { items, loading, error, reload }
- refactor: AuthContext delegates Firestore to appService, adds communityId to user context
- refactor: extraer modales de Proyectos y Actas a componentes independientes
- refactor: CruceView delega lógica a appService y usa useToast
- refactor: ActasPanel usa EntityCard y acciones unificadas
- refactor: TareasPanel delega lógica a hooks y unifica UI con KanbanBoard
- refactor: crear useProyectos hook e integrarlo en ProyectosView

### 📚 Documentación

- docs(workflows): refactor honesto workflow
- docs(workflows): refactor sprint-planning workflow
- docs(scripts): add --auto flag to close-sprint.sh
- docs(workflows): refactor session-start workflow
- docs(workflows): refactor changelog workflow
- docs(skills): add workflow-designer skill + update inventory
- docs: añadir critical-flows.md con 5 flujos críticos iniciales
- docs: hook audit-mvp into session-close workflow
- docs: seed MVP tracker with Kanarii history (sprints 00-15)
- docs: add MVP-TRACKER.md skeleton
- docs: actualizar sprint-15.md y registrar task-063.md
- docs(adr): registrar decision ADR-019 y actualizar tarea T-061
- docs: ADR persistencia narrativas manual — decisión aplazada a masa crítica
- docs: resolver colisión ADR-013 → ADR-017
- docs: marcar sesión T-055 como cerrada en task-055.md
- docs: add ADR-014 generación IA en capas y ADR-015 persistencia selectiva outputs Gemini
- docs(idea-inbox): añadir idea de branding tagline Kanarii
- docs: registrar T-046 Kin Maya en sprint-11, IMPLEMENTED.md y ROADMAP
- docs: backfill IMPLEMENTED.md con historial completo sprints 00-10
- docs: actualización y captura de ideas
- docs(roadmap): update roadmap after implementation audit
- docs: sprints archivados
- docs: update session-close to include sprint archiving step
- docs(sprint): archivar tarea T-025 y actualizar sprint-06.md
- docs: remove active task-021 file after archiving
- docs: close task-021, update sprint-05 and clean session lock
- docs(rules): formalizar convención idioma componentes React y textos UI
- docs(sprint-05): archivar task-020 y actualizar sprint con el cierre de sesión
- docs: update sprint-05 task status for T-019
- docs: remove deprecated idea-inbox.md in favor of structured date-based docs
- docs(inbox): añadir ideas Pasaporte Comunitario y ADRs S3 para Sprint 06
- docs(adr): add ADR-007 modularizacion appservice por dominio
- docs(workflows): add check-inbox.sh and refactor sprint-planning step 3 to consolidate inbox processing
- docs(workflows): update session-close and close task-011 correctly
- docs(sprint): T-008 completar tarea en sprint-02 y archivar task-008
- docs(idea): capture firestore rules testing emulator idea in inbox
- docs(agents): auditoría II — cerrar gaps Fase 2, verificación _archived y lectura de código pre-aprobación
- docs(agents): auditoría de protocolo — cerrar gap estado liminal post-ejecución
- docs(T-006): archivar tarea 006 y registrar sintomas en idea-inbox
- docs(sprint-02): guardar investigación Perplexity — reglas Firestore subcolecciones multi-tenant
- docs: mejorar flujos — research por sprint, caso sprint completo en session-start, archivado de research en session-close
- docs: actualizar roadmap y vaciar idea-inbox
- docs: archivar task-005 y actualizar sprint-02
- docs: actualizar ROADMAP.md verificado + crear idea-inbox con bugs detectados 23/05/2026
- docs: move archived skills out of agent workspace Move .agents/skills/_archived/ → docs/archive/skills/
- docs(inbox): añadir AUDIT-05, 06, 07 — recomendaciones de refactor QwenCoder
- docs(workflow): añadir paso 2b — decisión sobre tareas incompletas al cambiar de sprint
- docs(inbox): añadir auditoría QwenCoder mayo 2026 (AUDIT-01 a AUDIT-04)
- docs(workflow): añadir protocolo de ingestión de auditorías externas
- docs(T-002): registrar ADRs de gobernanza y documentar auditoria de datos de Firebase
- docs: añadir documento de referencia del flujo de trabajo completo
- docs(roadmap): merge análisis Qwen — añadir 15 items faltantes, corregir prioridades y consolidar estructura
- docs: add code audit and improvement plan
- docs: add technical audit - architecture, data model, flows, pages, hooks
- docs(onboarding): add educational animations specification and update roadmap
- docs(readme): link to kanairos context documentation
- docs: add kanairos-context explaining kanarii's role in the ecosystem
- docs(readme): link kanarii as first kanairos node
- docs(roadmap): marcar tareas de comunidades como completadas
- docs: add tech debt and comunidad auto-switch to roadmap
- docs(roadmap): add global marketplace and community onboarding features
- docs: add visual design system and agent identity rules as a skill
- docs(roadmap): add marketplace interaction audit and architectural decision on HD modules
- docs(roadmap): add invitation validation audit and membership removal backlog
- docs(roadmap): add visual coherence session and login reactivity bug
- docs: explicar infraestructura de agentes y flujo de verificación visual
- docs(agent): prohibir diálogos nativos en principios core
- docs(agent): blindar reglas de nomenclatura y modelo de datos
- docs(agent): rewrite GEMINI.md and DEFINITION_OF_DONE.md for Kanarii context
- docs: add open source infrastructure (CONTRIBUTING, CODE_OF_CONDUCT, CHANGELOG)
- docs: add implementar-feature-dry skill
- docs: setup agent skills and rules for Kanarii ecosystem
- docs: update roadmap and readme to reflect current project state

### 🔧 Mantenimiento

- chore(agents): flow-bug-traceability rule + testing-flows skill + session-start patch
- chore: add --digest mode to audit-mvp-tracker.sh
- chore: add audit-mvp-tracker.sh with fast grep mode
- chore: wire MVP tracker update into sprint-planning workflow
- chore: archive sprint-14 [v0.3.0]
- chore: archive sprint-13
- chore: archive sprint-12
- chore: abrir sprint-14
- chore(sprint-12): añadir T-054 notificaciones de conexiones pendientes
- chore: ignorar carpeta temporal dev-dist/ de VitePWA
- chore(sprint-12): restore correct status for T-053 in sprint-12.md
- chore(sprint-12): create task-052.md and link it in sprint-12.md
- chore(sprint-12): mark T-053 done and archive task-053
- chore: remove session lock for T-053
- chore(sprint-12): create task-053.md and link it in sprint-12.md
- chore(pwa): update name to Kanarii, mark T-051 done in sprint-12, and archive task-051
- chore: remove session lock for T-051
- chore(ci): use lts/* instead of hardcoded Node 20
- chore: archive sprint-11 [v0.2.0]
- chore: sprint-11 planning + fix check-sprint.sh recursivo + roadmap cleanup
- chore: update roadmap to reflect sprint-10 completions
- chore: archive task-039
- chore: archive sprint-10
- chore: archive sprint-09 [v0.1.0]
- chore: add sprint completion guard to close-task.sh
- chore: add close-sprint.sh — archive completed sprint to docs/sprints/_archived/
- chore: eliminar lock de sesion
- chore: remove lock from git tracking
- chore(roadmap): marcar T-027 como completada en ROADMAP.md
- chore(sprints): marcar T-027 como completada en sprint-06.md
- chore(tasks): archivar task-027.md
- chore(tasks): marcar sesion cerrada en task-027.md
- chore: sprint 06 planning, archive ideas & update roadmap
- chore(T-019): archive completed task file
- chore(T-019): mark session as closed in task file
- chore: archivar research de sprint-04 y remover lock de sesion
- chore(sprint): marcar T-013 como completado en sprint-04
- chore(T-013): archivar archivo de tarea T-013
- chore: archivar task-010 y limpiar lock de sesión
- chore: archive task-009
- chore(sprint): mark T-007 as completed in sprint-02.md
- chore: archive task-007 after completion
- chore: cierre de sesión sprint-01 [T-002/T-003]
- chore(workflow): añadir verificación de código pre-sprint en sprint-planning
- chore(workflow): reforzar freno de aprobación en session-start y template
- chore(workflow): añadir checklist de aprobación al template de tareas
- chore(workflow): reforzar freno de aprobación en session-start
- chore(T-002): actualizar sprint-01 y archivar documentacion de la tarea
- chore(T-001): cierre administrativo de rescate task-001
- chore: eliminar stubs vacíos de skills duplicadas en activo
- chore: eliminar stubs de archivado del directorio activo
- chore: vaciar skills archivadas de la carpeta activa
- chore: archivar accesibilidad-comunitaria
- chore: inventario de skills + archivar 12 skills inactivas
- chore: expose _archived/ folders to git tracking
- chore: track _archived README files (force-add past .gitignore)
- chore: track useProfiles hook (previously untracked)
- chore(agents): enforce hard stop protocol in strict-workflow
- chore(agents): add audit-before-refactor rule
- chore(agents): limpieza de skills irrelevantes y nuevas rules/skill de guardia
- chore: rename .agent to .agents (official Antigravity naming convention)
- chore(infra): unificar .agents/ en .agent/ para evitar duplicidad
- chore: añadir favicon y actualizar título de la app

### 📦 Otros

- style: restaurar logo original kanarii-logo.svg
- perf: reducir kanarii-logo.svg eliminando bitmaps embebidos
- copy(T-057): tagline oficial + actualizar copy bienvenida
- quitado el lazy point de session start
- doc actualizada
- cambios en check-inbox.sh para que detecte subcarpetas dentro de external-inbox y /session-start para que recomiende cambio de modelo para el /sprint-planning
- test(T-012): configurar Firebase Emulator con JDK 21 local y tests locales de firestore rules
- borrados flujos obsoletos
- restaurada fase 3.5 a estado anterior
- ROADMAP.md actualizado
- añadido flujo session-close
- test(T-002): agregar suite de validacion de reglas y configurar exclusion de temporales
- Sprint 00 — Histórico
- cambios en la documentación
- external-inbox incluido
- añadido en .agents/cli_onboarding.md
- añadido inbox/
- gitignore reparado
- Title: Implement community member lifecycle management hooks and services
- perf: limit node memory and optimize vite cache
- Create LICENSE
- iconos e imágenes añadidas a public
- style: EntityCard alineada con paleta y botones de TareaCard
- style: EntityCard replica TareaCard aesthetic con variables semánticas
- design: semantic EntityCard with premium styling and dark mode support

## [0.3.0] — sprint-14 — 2026-06-08

### ✨ Features

- feat: pdf manual(T-061)
- feat(manual): implementar exportacion de PDF mediante print-HTML nativo en T-061
- feat: refactor manual(T-060)
- feat(T-060): refactorizar manual en capas con carga lazy por pestañas e invalidación por hash
- feat: cruce capas(T-059)
- feat(fichas): crear getFichaHash()
- feat(T-058): sistema base de notificaciones — tipos, hook, badge Sidebar
- feat(T-055): crear script migrate-saberes.ts y actualizar task-055.md
- feat: kin maya cruce(T-056)
- feat: conectar tablon mencion(T-054)
- feat(T-052): implementar pasaporte comunitario completo y funciones para og tags
- feat(tareas): enable cancel button in CreateTareaModal during submitting (T-053)
- feat(pwa): migrate to vite-plugin-pwa (T-051) and setup sprint 12
- feat: field error(T-045)
- feat(ui): migrar CreateProposalWizard, AuthGateModal y ResponseModal a FieldError
- feat(ui): migrar FichaPreview y RegistroComunidadView a FieldError
- feat(ui): implementar component FieldError y migrar FichaView y CreateProjectModal
- feat: tipado interfaces core(T-044)
- feat: fix calendario kin(T-043)
- feat: show Kin Maya (Firma Galactica) in FichaView identity section
- feat: inject Kin Maya into generarPerfilVisual and generarManual prompts
- feat: add kinMaya utility — Dreamspell/Tzolkin 260-day cycle calculation
- feat: despliegue firebase(T-042)
- feat(bundle): split vendors with manualChunks and apply lazy loading to routes
- feat(deploy): config firebase hosting & github actions pipeline
- feat: add IMPLEMENTED.md registry + auto-update in close-task.sh + sprint-planning step 2c guard
- feat: standardize headers(T-041)
- feat(ui): estandarizar cabeceras y layout responsivos (T-041)
- feat: sync indicator offline(T-040)
- feat(T-040): implementar indicador de red online/offline y escrituras pendientes
- feat: bug triada persistencia(T-038)
- feat(T-038): corregir persistencia de triada comunitaria y unificar lectura de fichas en profiles
- feat: pasaporte ayudas(T-036)
- feat: welcome hero sections(T-035)
- feat: persistencia offline(T-037)
- feat: close-sprint.sh includes CHANGELOG.md in archive commit
- feat: add update-changelog.sh and integrate into session-close workflow
- feat(scripts): add generate-digest.sh + complexity threshold in inventory-check
- feat(agents): add inventory-check.sh + update sprint-planning and session-start with anti-duplication firewall
- feat: modal respuesta s3(T-034)
- feat: sala deliberacion s3(T-033)
- feat: migracion triada comunitaria(T-023)
- feat: fix fallback comunidad(T-032)
- feat: maquina estados s3(T-031)
- feat(governance): S3 status transition improvements for integrando and en_objeciones
- feat: generalizar validation communityid(T-029)
- feat: logout cleanup(T-028)
- feat(workflow): close-task.sh y session-close.md sin argumentos, mensaje derivado de rama
- feat(marketplace): vista de detalle de acuerdo, historial y enmiendas
- feat(proyectos): contador de solicitudes de proyectos pendientes en sidebar
- feat(agents): lazy-planning rule en caveman.md + cerrar hueco Searched-for en session-start.md
- feat(agents): close-task.sh + simplificar session-close con protocolo atómico
- feat(calendario): control de permisos en eventos y sanitizacion de payload antes de guardar en Firestore
- feat(deliberacion): T-027 directorio de decisiones con filtros de estado y badge de atencion requerida
- feat(agents): check-sprint.sh + actualizar sprint-planning y caveman con contrato de contexto
- feat(T-020): ClarificationThread para hilos de aclaración de dudas
- feat(T-019): CTA aclaración dudas + fixes compilación S3
- feat(T-018): backfill members profile script & ADRs 009-011
- feat(T-017): fix de sobreescritura de ficha y registro de ADR-008
- feat(T-017): corregir displayName vacio al re-entrar por invitacion y solicitudes
- feat(T-016): modularizar appService.ts por dominio en src/lib/services/
- feat(T-015): diferenciar causas de error al canjear invitaciones
- feat(T-014): aplicar DEFAULT_LIST_LIMIT = 50 a todas las listas de Firestore y actualizar sprint-04
- feat(T-013): abstraer imports de Firebase en hooks y validar communityId
- feat(T-011): move community switcher to sidebar header on desktop and bottom sheet on mobile
- feat: implementar reglas de seguridad en firestore.rules para evitar bypass de membresía (T-010)
- feat(T-009): sync user profile with community memberships and optimize listenAppUser
- feat(security): T-008 restringir lectura/escritura en subcolecciones de propuestas y posts por comunidad
- feat(security): implement firestore security rules for community_exits, profiles and fichas onboarding
- feat(invitaciones): redirigir a comunidad despues de unirse y registrar miembro en batch
- feat: asegurar reglas de seguridad Firestore para actas y fichas (T-005)
- feat(T-002): eliminar email de admin hardcoded y alinear reglas de seguridad en espanol
- feat(T-001): implementar firestore rules y corregir reactividad de auth
- feat(workflow): añadir punto de entrada de investigación en Fase 2 de session-start
- feat(workflow): añadir paso 6 de pausa y handoff a /session-start en sprint-planning
- feat(.agents): add git-gardener skill with Phase 0 sync + gone branches + divergence detection
- feat: sistema antisabotaje — núcleo completo
- feat(.agents): token optimization - caveman, DOE framework, skill-manager, tasks template
- feat: add database audit and cleanup scripts
- feat: integración onboarding pedagógico con tour S3, escape hatch y progress tracker estático
- feat(.agents): add inbox-integrator skill and inbox template manifest
- feat(ficha-comunidad): landing v2 + arquetipos S3 + fix context crash al borrar comunidad + fix duplicate toast keys
- feat(.agents): add agent-onboarding skill
- feat(.agents): add chrome-devtools-first, agent-ready-web-contract skills and snapshot-over-screenshot rule
- feat(comunidades): settings CRUD + auto-switch + ficha pública /c/:slug + configuración inline para admin
- feat(comunidades): wizard de registro con geocodificación y banner corregido
- feat(admin): add community health dashboard with metrics, chart and activity feed
- feat(admin): restructure panel with tab navigation, URL persistence + fix TS bugs
- feat(acuerdos): add counterproposal flow, negotiation turns, undo cancel + badge for contraoferta
- feat(badge): notify solicitante when acuerdo status changes via localStorage timestamp
- feat(ux): clean debug logs, update roadmap, fix redirects and modals
- feat(nav): navigate to mis_acuerdos tab when badge clicked + cleanup logs
- feat(acuerdos): chip fecha vencida + badge nav incluye en_curso expirado
- feat(nav): badge acuerdos pendientes en Sidebar y BottomNav
- feat(solicitudes): rejection flow with modal, reason display for admin and applicant
- feat(hooks): add useFichaActions.ts
- feat(community): member lifecycle - expulsion, voluntary exit, compound key community_members
- feat(hooks): create useServicioActions and migrate MarketplaceView
- feat(hooks): create useComunidadActions and migrate ComunidadesView and AdminSolicitudesView
- feat(hooks): create useProyectoActions and migrate ProyectosView
- feat(hooks): extend usePropuestaActions and migrate Gobernanza components (Wizard, PropuestaDetail, ResponseModal)
- feat(hooks): migrate PostDetailModal to usePostActions, fix missing toast on addRespuesta, fix useActaActions to use saveActa
- feat(hooks): create useEventoActions and migrate CalendarioView to action hook pattern
- feat(hooks): create usePropuestaActions and migrate PropuestasView to action hook pattern
- feat(hooks): create useActaActions and migrate ActasPanel to action hook pattern
- feat(hooks): create usePostActions and migrate Tablon to action hook pattern
- feat: display text positions (objections, doubts, concerns) in PropuestaDetail
- feat: enforce mandatory text field for 'duda' response type in ResponseModal
- feat: professionalize data architecture and member management system
- feat(gobernanza): motor de quórum S3 completo
- feat(infra): instalar agent-skills de Firebase y añadir skill personalizada firebase-kanarii
- feat(propuestas): S3Timeline + ConsentGrid con privacidad por diseño
- feat(propuestas): ResponseModal con jerarquía visual S3 y validación de objeciones
- feat(propuestas): PropuestaDetail con diferenciación de roles y estado acordada
- feat(propuestas): PropuestaCard + PropuestasView con Kanban de gobernanza
- feat: complete marketplace sovereignty MVP level 1 with owner actions and undoable delete
- feat: unified auth modal with login mode, fix magic link return flow for existing users
- feat: unificación de persistencia de onboarding y fix de limbo arquitectónico (Abián)
- feat: magic link cross-device persistence, membership guards, and admin ficha integration
- feat: magic link auth + google on ficha save — unauthenticated onboarding with auth gate before persist
- feat: invitation code generator and management in admin panel — mobile nav parity for communities and admin links
- feat: community admin panel and navigation visibility fixes
- feat: community model v2 — invitations, manifesto, multi-membership and discovery services
- feat: update visual identity with palm icon in sidebar and logo in welcome screen
- feat: replace placeholder icons with kanarii-logo.svg in sidebar
- feat: inline editing for community board posts
- feat: community board with needs/offers, async responses and state management
- feat: community calendar with real-time sync and premium UI
- feat: structured cruce analysis with CNV, shadows, rank map and enriched channels
- feat: reactividad total en panel de detalle y modal de edición de actas
- feat: refactor ProyectosView a arquitectura DRY con useProyectos y useEntityActions
- feat: complete architectural refactor Phase 2 - dumb views and service centralization
- feat: complete architecture refactor phase 1 - foundation hooks
- feat: standard architecture rules, visual redesign of EntityCard and audit skill

### 🐛 Bug Fixes

- fix: optimizar logo SVG y actualizar config PWA + Node 24 en CI
- fix(PWA): habilitar devOptions para servir manifest en desarrollo
- fix(PWA): corregir la ruta del manifest en index.html
- fix(tareas): allow canceling CreateTareaModal during submit (T-053)
- fix(kinMaya): anchor correcto 23-jun-1987 y excluir 29-feb (Hunab Ku)
- fix(types): corregir firma de addFicha en useFichaActions
- fix(kinMaya): corregir anchor date Dreamspell — Kin 1 = 3 jul 1987
- fix(protocol): cerrar grieta task files cruzados y Listed directory en .agents/tasks/
- fix(protocol): ampliar checkpoint lazy-planning, tabla de violaciones y script fusionado
- fix(workflow): checkpoint lazy-planning (Fase 2.5), auditoría vinculada, mecanismo en caveman, verificación en session-close y script check-lazy-planning.sh
- fix(workflow): añadir campo audit trail en bloque de aprobación Fase 3.5
- fix(workflow): eliminar lock antes del git add -A en close-task.sh
- fix(gobernanza): usar currentCommunityId de ComunidadContext para validar acceso a propuestas
- fix(T-017): añadir guardia de datos de perfil al sincronizar fichas
- fix(T-017): forzar refresh de auth y leer profiles directamente para displayName en reingreso con sesión activa
- fix(T-017): evitar sobreescribir displayName vacio en getAppUser needsUpdate
- fix(T-017): refinar fallback de displayName y nombre en invitaciones
- fix(T-017): fix displayName backfill y getMemberName fallback
- fix(agents): detectar tareas En curso en FASE 1 y alertar antes de continuar
- fix(agents): marcar sesión cerrada en task file ANTES de archivar (C4)
- fix: mover firebase-crashlytics y firebase-data-connect a _archived/ con contenido completo
- fix: auditoría QwenCoder + renombrar inbox/ → external-inbox/
- fix: restaurar accesibilidad-comunitaria al activo + actualizar inventario
- fix: defensive fallback for deleted servicioId in acuerdos
- fix(dashboard): robust date parsing for acuerdos chart
- fix(members): improve getMemberName fallback resolution
- fix(marketplace): add stopPropagation to acuerdo modal trigger
- fix(members): resolve rolComunitario field mapping
- fix: remove arquetipo selector from FichaModal
- fix: remove arquetipo selector from FichaModal
- fix: rolComunitario field mapping in ComunidadSubTab
- fix: AcuerdoDetailModal conditional in AdminPanelModals
- fix(admin-panel): roles, gráfico dashboard y key prop en TareasPanel
- fix(admin): fallback for invalid dates and deleted services in Marketplace tab
- fix(members): getMemberName returns Miembro for unknown UIDs after load
- fix(marketplace): use getMemberName from useCommunityMembers hook (DRY)
- fix(nav): hoist isAdmin declaration in BottomNav
- fix(acuerdos): replace undefined with null for fechaPropuesta + type safety
- fix(solicitudes): create community_members doc on request approval
- fix(ficha): show leave button using appUser.communityIds instead of stale ficha.communityId
- fix(admin): show correct nombreUsuario in bajas recientes
- fix(admin): member lifecycle bugs - nombre en bajas, Abián invisible en lista
- fix(ficha): move displayFicha declaration before useEffect to resolve TDZ ReferenceError
- fix(invitations): reactive appUser listener, duplicate membership guard, input sanitization, silent error toast control
- fix: define closeModal in ActasPanel, fix EntityCard props, add useTareaActions and migrate TareasPanel and CreateActaModal
- fix(hooks): add missing useCallback import in usePropuestaDetail
- fix(hooks): normalize reload and error contract in useCommunityMembers, useActas, useFicha, usePropuestaDetail, usePropuestas, useTareas
- fix(hooks): normalize reload and error contract in useAcuerdos, useEventos, usePosts, useServicios
- fix(AdminPanel): consolidate imports and use correct getUserFicha export
- fix: implement lazy TTL cleanup for pending fichas (Spark Plan optimization)
- fix: ensure communityId persistence in community_members index
- fix(appService): permitir respuesta del autor y corrección de tipos TS
- fix(onboarding): propagar communityId a fichas/profiles al usar invitación
- fix: communities view — mobile layout, input visibility and submission spinner reset
- fix: AdminPanel crashes, data backfill and multi-community scoping
- fix: resolver lectura de datos de Diseño Humano y cálculo de canales
- fix: mejorar reactividad del panel de actas y limpieza de logs
- fix: añadir import de saveActa y corregir uso de useToast
- fix: corregir argumentos de saveActa en CreateActaModal
- fix: restaurar funcionalidad de guardado en CreateActaModal
- fix: sincronizar props de KanbanBoard y añadir loader visual
- fix: añadir seguridad ante nulos en mapeo de habilidades de proyectos
- fix: restaurar renderizado de ProyectosView añadiendo iconos faltantes
- fix: startDelete config en renderProjectCard + import EntityVariant

### ♻️ Refactoring

- refactor(types): tipar campos core de Ficha y corregir compatibilidades en FichaView
- refactor: T-021 migrate all realtime firestore hooks to useFirestoreCollection & fix selected project reactivity bug
- refactor(agents): compactar session-start.md bajo límite 12000 chars
- refactor(admin-panel): SRP completo — AdminPanel.tsx de 1468 a 240 líneas
- refactor(admin): extract useDashboardStats hook
- refactor(admin): extract badge utilities and consolidate useCommunityMembers
- refactor(pages): extract AdminSolicitudesView logic to hooks
- refactor(hooks): fix useActas return signature to match project standard { items, loading, error, reload }
- refactor: AuthContext delegates Firestore to appService, adds communityId to user context
- refactor: extraer modales de Proyectos y Actas a componentes independientes
- refactor: CruceView delega lógica a appService y usa useToast
- refactor: ActasPanel usa EntityCard y acciones unificadas
- refactor: TareasPanel delega lógica a hooks y unifica UI con KanbanBoard
- refactor: crear useProyectos hook e integrarlo en ProyectosView

### 📚 Documentación

- docs(adr): registrar decision ADR-019 y actualizar tarea T-061
- docs: ADR persistencia narrativas manual — decisión aplazada a masa crítica
- docs: resolver colisión ADR-013 → ADR-017
- docs: marcar sesión T-055 como cerrada en task-055.md
- docs: add ADR-014 generación IA en capas y ADR-015 persistencia selectiva outputs Gemini
- docs(idea-inbox): añadir idea de branding tagline Kanarii
- docs: registrar T-046 Kin Maya en sprint-11, IMPLEMENTED.md y ROADMAP
- docs: backfill IMPLEMENTED.md con historial completo sprints 00-10
- docs: actualización y captura de ideas
- docs(roadmap): update roadmap after implementation audit
- docs: sprints archivados
- docs: update session-close to include sprint archiving step
- docs(sprint): archivar tarea T-025 y actualizar sprint-06.md
- docs: remove active task-021 file after archiving
- docs: close task-021, update sprint-05 and clean session lock
- docs(rules): formalizar convención idioma componentes React y textos UI
- docs(sprint-05): archivar task-020 y actualizar sprint con el cierre de sesión
- docs: update sprint-05 task status for T-019
- docs: remove deprecated idea-inbox.md in favor of structured date-based docs
- docs(inbox): añadir ideas Pasaporte Comunitario y ADRs S3 para Sprint 06
- docs(adr): add ADR-007 modularizacion appservice por dominio
- docs(workflows): add check-inbox.sh and refactor sprint-planning step 3 to consolidate inbox processing
- docs(workflows): update session-close and close task-011 correctly
- docs(sprint): T-008 completar tarea en sprint-02 y archivar task-008
- docs(idea): capture firestore rules testing emulator idea in inbox
- docs(agents): auditoría II — cerrar gaps Fase 2, verificación _archived y lectura de código pre-aprobación
- docs(agents): auditoría de protocolo — cerrar gap estado liminal post-ejecución
- docs(T-006): archivar tarea 006 y registrar sintomas en idea-inbox
- docs(sprint-02): guardar investigación Perplexity — reglas Firestore subcolecciones multi-tenant
- docs: mejorar flujos — research por sprint, caso sprint completo en session-start, archivado de research en session-close
- docs: actualizar roadmap y vaciar idea-inbox
- docs: archivar task-005 y actualizar sprint-02
- docs: actualizar ROADMAP.md verificado + crear idea-inbox con bugs detectados 23/05/2026
- docs: move archived skills out of agent workspace Move .agents/skills/_archived/ → docs/archive/skills/
- docs(inbox): añadir AUDIT-05, 06, 07 — recomendaciones de refactor QwenCoder
- docs(workflow): añadir paso 2b — decisión sobre tareas incompletas al cambiar de sprint
- docs(inbox): añadir auditoría QwenCoder mayo 2026 (AUDIT-01 a AUDIT-04)
- docs(workflow): añadir protocolo de ingestión de auditorías externas
- docs(T-002): registrar ADRs de gobernanza y documentar auditoria de datos de Firebase
- docs: añadir documento de referencia del flujo de trabajo completo
- docs(roadmap): merge análisis Qwen — añadir 15 items faltantes, corregir prioridades y consolidar estructura
- docs: add code audit and improvement plan
- docs: add technical audit - architecture, data model, flows, pages, hooks
- docs(onboarding): add educational animations specification and update roadmap
- docs(readme): link to kanairos context documentation
- docs: add kanairos-context explaining kanarii's role in the ecosystem
- docs(readme): link kanarii as first kanairos node
- docs(roadmap): marcar tareas de comunidades como completadas
- docs: add tech debt and comunidad auto-switch to roadmap
- docs(roadmap): add global marketplace and community onboarding features
- docs: add visual design system and agent identity rules as a skill
- docs(roadmap): add marketplace interaction audit and architectural decision on HD modules
- docs(roadmap): add invitation validation audit and membership removal backlog
- docs(roadmap): add visual coherence session and login reactivity bug
- docs: explicar infraestructura de agentes y flujo de verificación visual
- docs(agent): prohibir diálogos nativos en principios core
- docs(agent): blindar reglas de nomenclatura y modelo de datos
- docs(agent): rewrite GEMINI.md and DEFINITION_OF_DONE.md for Kanarii context
- docs: add open source infrastructure (CONTRIBUTING, CODE_OF_CONDUCT, CHANGELOG)
- docs: add implementar-feature-dry skill
- docs: setup agent skills and rules for Kanarii ecosystem
- docs: update roadmap and readme to reflect current project state

### 🔧 Mantenimiento

- chore: archive sprint-13
- chore: archive sprint-12
- chore: abrir sprint-14
- chore(sprint-12): añadir T-054 notificaciones de conexiones pendientes
- chore: ignorar carpeta temporal dev-dist/ de VitePWA
- chore(sprint-12): restore correct status for T-053 in sprint-12.md
- chore(sprint-12): create task-052.md and link it in sprint-12.md
- chore(sprint-12): mark T-053 done and archive task-053
- chore: remove session lock for T-053
- chore(sprint-12): create task-053.md and link it in sprint-12.md
- chore(pwa): update name to Kanarii, mark T-051 done in sprint-12, and archive task-051
- chore: remove session lock for T-051
- chore(ci): use lts/* instead of hardcoded Node 20
- chore: archive sprint-11 [v0.2.0]
- chore: sprint-11 planning + fix check-sprint.sh recursivo + roadmap cleanup
- chore: update roadmap to reflect sprint-10 completions
- chore: archive task-039
- chore: archive sprint-10
- chore: archive sprint-09 [v0.1.0]
- chore: add sprint completion guard to close-task.sh
- chore: add close-sprint.sh — archive completed sprint to docs/sprints/_archived/
- chore: eliminar lock de sesion
- chore: remove lock from git tracking
- chore(roadmap): marcar T-027 como completada en ROADMAP.md
- chore(sprints): marcar T-027 como completada en sprint-06.md
- chore(tasks): archivar task-027.md
- chore(tasks): marcar sesion cerrada en task-027.md
- chore: sprint 06 planning, archive ideas & update roadmap
- chore(T-019): archive completed task file
- chore(T-019): mark session as closed in task file
- chore: archivar research de sprint-04 y remover lock de sesion
- chore(sprint): marcar T-013 como completado en sprint-04
- chore(T-013): archivar archivo de tarea T-013
- chore: archivar task-010 y limpiar lock de sesión
- chore: archive task-009
- chore(sprint): mark T-007 as completed in sprint-02.md
- chore: archive task-007 after completion
- chore: cierre de sesión sprint-01 [T-002/T-003]
- chore(workflow): añadir verificación de código pre-sprint en sprint-planning
- chore(workflow): reforzar freno de aprobación en session-start y template
- chore(workflow): añadir checklist de aprobación al template de tareas
- chore(workflow): reforzar freno de aprobación en session-start
- chore(T-002): actualizar sprint-01 y archivar documentacion de la tarea
- chore(T-001): cierre administrativo de rescate task-001
- chore: eliminar stubs vacíos de skills duplicadas en activo
- chore: eliminar stubs de archivado del directorio activo
- chore: vaciar skills archivadas de la carpeta activa
- chore: archivar accesibilidad-comunitaria
- chore: inventario de skills + archivar 12 skills inactivas
- chore: expose _archived/ folders to git tracking
- chore: track _archived README files (force-add past .gitignore)
- chore: track useProfiles hook (previously untracked)
- chore(agents): enforce hard stop protocol in strict-workflow
- chore(agents): add audit-before-refactor rule
- chore(agents): limpieza de skills irrelevantes y nuevas rules/skill de guardia
- chore: rename .agent to .agents (official Antigravity naming convention)
- chore(infra): unificar .agents/ en .agent/ para evitar duplicidad
- chore: añadir favicon y actualizar título de la app

### 📦 Otros

- style: restaurar logo original kanarii-logo.svg
- perf: reducir kanarii-logo.svg eliminando bitmaps embebidos
- copy(T-057): tagline oficial + actualizar copy bienvenida
- quitado el lazy point de session start
- doc actualizada
- cambios en check-inbox.sh para que detecte subcarpetas dentro de external-inbox y /session-start para que recomiende cambio de modelo para el /sprint-planning
- test(T-012): configurar Firebase Emulator con JDK 21 local y tests locales de firestore rules
- borrados flujos obsoletos
- restaurada fase 3.5 a estado anterior
- ROADMAP.md actualizado
- añadido flujo session-close
- test(T-002): agregar suite de validacion de reglas y configurar exclusion de temporales
- Sprint 00 — Histórico
- cambios en la documentación
- external-inbox incluido
- añadido en .agents/cli_onboarding.md
- añadido inbox/
- gitignore reparado
- Title: Implement community member lifecycle management hooks and services
- perf: limit node memory and optimize vite cache
- Create LICENSE
- iconos e imágenes añadidas a public
- style: EntityCard alineada con paleta y botones de TareaCard
- style: EntityCard replica TareaCard aesthetic con variables semánticas
- design: semantic EntityCard with premium styling and dark mode support

## [0.2.0] — sprint-11 — 2026-06-04

### ✨ Features

- feat: field error(T-045)
- feat(ui): migrar CreateProposalWizard, AuthGateModal y ResponseModal a FieldError
- feat(ui): migrar FichaPreview y RegistroComunidadView a FieldError
- feat(ui): implementar component FieldError y migrar FichaView y CreateProjectModal
- feat: tipado interfaces core(T-044)
- feat: fix calendario kin(T-043)
- feat: show Kin Maya (Firma Galactica) in FichaView identity section
- feat: inject Kin Maya into generarPerfilVisual and generarManual prompts
- feat: add kinMaya utility — Dreamspell/Tzolkin 260-day cycle calculation
- feat: despliegue firebase(T-042)
- feat(bundle): split vendors with manualChunks and apply lazy loading to routes
- feat(deploy): config firebase hosting & github actions pipeline
- feat: add IMPLEMENTED.md registry + auto-update in close-task.sh + sprint-planning step 2c guard
- feat: standardize headers(T-041)
- feat(ui): estandarizar cabeceras y layout responsivos (T-041)
- feat: sync indicator offline(T-040)
- feat(T-040): implementar indicador de red online/offline y escrituras pendientes
- feat: bug triada persistencia(T-038)
- feat(T-038): corregir persistencia de triada comunitaria y unificar lectura de fichas en profiles
- feat: pasaporte ayudas(T-036)
- feat: welcome hero sections(T-035)
- feat: persistencia offline(T-037)
- feat: close-sprint.sh includes CHANGELOG.md in archive commit
- feat: add update-changelog.sh and integrate into session-close workflow
- feat(scripts): add generate-digest.sh + complexity threshold in inventory-check
- feat(agents): add inventory-check.sh + update sprint-planning and session-start with anti-duplication firewall
- feat: modal respuesta s3(T-034)
- feat: sala deliberacion s3(T-033)
- feat: migracion triada comunitaria(T-023)
- feat: fix fallback comunidad(T-032)
- feat: maquina estados s3(T-031)
- feat(governance): S3 status transition improvements for integrando and en_objeciones
- feat: generalizar validation communityid(T-029)
- feat: logout cleanup(T-028)
- feat(workflow): close-task.sh y session-close.md sin argumentos, mensaje derivado de rama
- feat(marketplace): vista de detalle de acuerdo, historial y enmiendas
- feat(proyectos): contador de solicitudes de proyectos pendientes en sidebar
- feat(agents): lazy-planning rule en caveman.md + cerrar hueco Searched-for en session-start.md
- feat(agents): close-task.sh + simplificar session-close con protocolo atómico
- feat(calendario): control de permisos en eventos y sanitizacion de payload antes de guardar en Firestore
- feat(deliberacion): T-027 directorio de decisiones con filtros de estado y badge de atencion requerida
- feat(agents): check-sprint.sh + actualizar sprint-planning y caveman con contrato de contexto
- feat(T-020): ClarificationThread para hilos de aclaración de dudas
- feat(T-019): CTA aclaración dudas + fixes compilación S3
- feat(T-018): backfill members profile script & ADRs 009-011
- feat(T-017): fix de sobreescritura de ficha y registro de ADR-008
- feat(T-017): corregir displayName vacio al re-entrar por invitacion y solicitudes
- feat(T-016): modularizar appService.ts por dominio en src/lib/services/
- feat(T-015): diferenciar causas de error al canjear invitaciones
- feat(T-014): aplicar DEFAULT_LIST_LIMIT = 50 a todas las listas de Firestore y actualizar sprint-04
- feat(T-013): abstraer imports de Firebase en hooks y validar communityId
- feat(T-011): move community switcher to sidebar header on desktop and bottom sheet on mobile
- feat: implementar reglas de seguridad en firestore.rules para evitar bypass de membresía (T-010)
- feat(T-009): sync user profile with community memberships and optimize listenAppUser
- feat(security): T-008 restringir lectura/escritura en subcolecciones de propuestas y posts por comunidad
- feat(security): implement firestore security rules for community_exits, profiles and fichas onboarding
- feat(invitaciones): redirigir a comunidad despues de unirse y registrar miembro en batch
- feat: asegurar reglas de seguridad Firestore para actas y fichas (T-005)
- feat(T-002): eliminar email de admin hardcoded y alinear reglas de seguridad en espanol
- feat(T-001): implementar firestore rules y corregir reactividad de auth
- feat(workflow): añadir punto de entrada de investigación en Fase 2 de session-start
- feat(workflow): añadir paso 6 de pausa y handoff a /session-start en sprint-planning
- feat(.agents): add git-gardener skill with Phase 0 sync + gone branches + divergence detection
- feat: sistema antisabotaje — núcleo completo
- feat(.agents): token optimization - caveman, DOE framework, skill-manager, tasks template
- feat: add database audit and cleanup scripts
- feat: integración onboarding pedagógico con tour S3, escape hatch y progress tracker estático
- feat(.agents): add inbox-integrator skill and inbox template manifest
- feat(ficha-comunidad): landing v2 + arquetipos S3 + fix context crash al borrar comunidad + fix duplicate toast keys
- feat(.agents): add agent-onboarding skill
- feat(.agents): add chrome-devtools-first, agent-ready-web-contract skills and snapshot-over-screenshot rule
- feat(comunidades): settings CRUD + auto-switch + ficha pública /c/:slug + configuración inline para admin
- feat(comunidades): wizard de registro con geocodificación y banner corregido
- feat(admin): add community health dashboard with metrics, chart and activity feed
- feat(admin): restructure panel with tab navigation, URL persistence + fix TS bugs
- feat(acuerdos): add counterproposal flow, negotiation turns, undo cancel + badge for contraoferta
- feat(badge): notify solicitante when acuerdo status changes via localStorage timestamp
- feat(ux): clean debug logs, update roadmap, fix redirects and modals
- feat(nav): navigate to mis_acuerdos tab when badge clicked + cleanup logs
- feat(acuerdos): chip fecha vencida + badge nav incluye en_curso expirado
- feat(nav): badge acuerdos pendientes en Sidebar y BottomNav
- feat(solicitudes): rejection flow with modal, reason display for admin and applicant
- feat(hooks): add useFichaActions.ts
- feat(community): member lifecycle - expulsion, voluntary exit, compound key community_members
- feat(hooks): create useServicioActions and migrate MarketplaceView
- feat(hooks): create useComunidadActions and migrate ComunidadesView and AdminSolicitudesView
- feat(hooks): create useProyectoActions and migrate ProyectosView
- feat(hooks): extend usePropuestaActions and migrate Gobernanza components (Wizard, PropuestaDetail, ResponseModal)
- feat(hooks): migrate PostDetailModal to usePostActions, fix missing toast on addRespuesta, fix useActaActions to use saveActa
- feat(hooks): create useEventoActions and migrate CalendarioView to action hook pattern
- feat(hooks): create usePropuestaActions and migrate PropuestasView to action hook pattern
- feat(hooks): create useActaActions and migrate ActasPanel to action hook pattern
- feat(hooks): create usePostActions and migrate Tablon to action hook pattern
- feat: display text positions (objections, doubts, concerns) in PropuestaDetail
- feat: enforce mandatory text field for 'duda' response type in ResponseModal
- feat: professionalize data architecture and member management system
- feat(gobernanza): motor de quórum S3 completo
- feat(infra): instalar agent-skills de Firebase y añadir skill personalizada firebase-kanarii
- feat(propuestas): S3Timeline + ConsentGrid con privacidad por diseño
- feat(propuestas): ResponseModal con jerarquía visual S3 y validación de objeciones
- feat(propuestas): PropuestaDetail con diferenciación de roles y estado acordada
- feat(propuestas): PropuestaCard + PropuestasView con Kanban de gobernanza
- feat: complete marketplace sovereignty MVP level 1 with owner actions and undoable delete
- feat: unified auth modal with login mode, fix magic link return flow for existing users
- feat: unificación de persistencia de onboarding y fix de limbo arquitectónico (Abián)
- feat: magic link cross-device persistence, membership guards, and admin ficha integration
- feat: magic link auth + google on ficha save — unauthenticated onboarding with auth gate before persist
- feat: invitation code generator and management in admin panel — mobile nav parity for communities and admin links
- feat: community admin panel and navigation visibility fixes
- feat: community model v2 — invitations, manifesto, multi-membership and discovery services
- feat: update visual identity with palm icon in sidebar and logo in welcome screen
- feat: replace placeholder icons with kanarii-logo.svg in sidebar
- feat: inline editing for community board posts
- feat: community board with needs/offers, async responses and state management
- feat: community calendar with real-time sync and premium UI
- feat: structured cruce analysis with CNV, shadows, rank map and enriched channels
- feat: reactividad total en panel de detalle y modal de edición de actas
- feat: refactor ProyectosView a arquitectura DRY con useProyectos y useEntityActions
- feat: complete architectural refactor Phase 2 - dumb views and service centralization
- feat: complete architecture refactor phase 1 - foundation hooks
- feat: standard architecture rules, visual redesign of EntityCard and audit skill

### 🐛 Bug Fixes

- fix(types): corregir firma de addFicha en useFichaActions
- fix(kinMaya): corregir anchor date Dreamspell — Kin 1 = 3 jul 1987
- fix(protocol): cerrar grieta task files cruzados y Listed directory en .agents/tasks/
- fix(protocol): ampliar checkpoint lazy-planning, tabla de violaciones y script fusionado
- fix(workflow): checkpoint lazy-planning (Fase 2.5), auditoría vinculada, mecanismo en caveman, verificación en session-close y script check-lazy-planning.sh
- fix(workflow): añadir campo audit trail en bloque de aprobación Fase 3.5
- fix(workflow): eliminar lock antes del git add -A en close-task.sh
- fix(gobernanza): usar currentCommunityId de ComunidadContext para validar acceso a propuestas
- fix(T-017): añadir guardia de datos de perfil al sincronizar fichas
- fix(T-017): forzar refresh de auth y leer profiles directamente para displayName en reingreso con sesión activa
- fix(T-017): evitar sobreescribir displayName vacio en getAppUser needsUpdate
- fix(T-017): refinar fallback de displayName y nombre en invitaciones
- fix(T-017): fix displayName backfill y getMemberName fallback
- fix(agents): detectar tareas En curso en FASE 1 y alertar antes de continuar
- fix(agents): marcar sesión cerrada en task file ANTES de archivar (C4)
- fix: mover firebase-crashlytics y firebase-data-connect a _archived/ con contenido completo
- fix: auditoría QwenCoder + renombrar inbox/ → external-inbox/
- fix: restaurar accesibilidad-comunitaria al activo + actualizar inventario
- fix: defensive fallback for deleted servicioId in acuerdos
- fix(dashboard): robust date parsing for acuerdos chart
- fix(members): improve getMemberName fallback resolution
- fix(marketplace): add stopPropagation to acuerdo modal trigger
- fix(members): resolve rolComunitario field mapping
- fix: remove arquetipo selector from FichaModal
- fix: remove arquetipo selector from FichaModal
- fix: rolComunitario field mapping in ComunidadSubTab
- fix: AcuerdoDetailModal conditional in AdminPanelModals
- fix(admin-panel): roles, gráfico dashboard y key prop en TareasPanel
- fix(admin): fallback for invalid dates and deleted services in Marketplace tab
- fix(members): getMemberName returns Miembro for unknown UIDs after load
- fix(marketplace): use getMemberName from useCommunityMembers hook (DRY)
- fix(nav): hoist isAdmin declaration in BottomNav
- fix(acuerdos): replace undefined with null for fechaPropuesta + type safety
- fix(solicitudes): create community_members doc on request approval
- fix(ficha): show leave button using appUser.communityIds instead of stale ficha.communityId
- fix(admin): show correct nombreUsuario in bajas recientes
- fix(admin): member lifecycle bugs - nombre en bajas, Abián invisible en lista
- fix(ficha): move displayFicha declaration before useEffect to resolve TDZ ReferenceError
- fix(invitations): reactive appUser listener, duplicate membership guard, input sanitization, silent error toast control
- fix: define closeModal in ActasPanel, fix EntityCard props, add useTareaActions and migrate TareasPanel and CreateActaModal
- fix(hooks): add missing useCallback import in usePropuestaDetail
- fix(hooks): normalize reload and error contract in useCommunityMembers, useActas, useFicha, usePropuestaDetail, usePropuestas, useTareas
- fix(hooks): normalize reload and error contract in useAcuerdos, useEventos, usePosts, useServicios
- fix(AdminPanel): consolidate imports and use correct getUserFicha export
- fix: implement lazy TTL cleanup for pending fichas (Spark Plan optimization)
- fix: ensure communityId persistence in community_members index
- fix(appService): permitir respuesta del autor y corrección de tipos TS
- fix(onboarding): propagar communityId a fichas/profiles al usar invitación
- fix: communities view — mobile layout, input visibility and submission spinner reset
- fix: AdminPanel crashes, data backfill and multi-community scoping
- fix: resolver lectura de datos de Diseño Humano y cálculo de canales
- fix: mejorar reactividad del panel de actas y limpieza de logs
- fix: añadir import de saveActa y corregir uso de useToast
- fix: corregir argumentos de saveActa en CreateActaModal
- fix: restaurar funcionalidad de guardado en CreateActaModal
- fix: sincronizar props de KanbanBoard y añadir loader visual
- fix: añadir seguridad ante nulos en mapeo de habilidades de proyectos
- fix: restaurar renderizado de ProyectosView añadiendo iconos faltantes
- fix: startDelete config en renderProjectCard + import EntityVariant

### ♻️ Refactoring

- refactor(types): tipar campos core de Ficha y corregir compatibilidades en FichaView
- refactor: T-021 migrate all realtime firestore hooks to useFirestoreCollection & fix selected project reactivity bug
- refactor(agents): compactar session-start.md bajo límite 12000 chars
- refactor(admin-panel): SRP completo — AdminPanel.tsx de 1468 a 240 líneas
- refactor(admin): extract useDashboardStats hook
- refactor(admin): extract badge utilities and consolidate useCommunityMembers
- refactor(pages): extract AdminSolicitudesView logic to hooks
- refactor(hooks): fix useActas return signature to match project standard { items, loading, error, reload }
- refactor: AuthContext delegates Firestore to appService, adds communityId to user context
- refactor: extraer modales de Proyectos y Actas a componentes independientes
- refactor: CruceView delega lógica a appService y usa useToast
- refactor: ActasPanel usa EntityCard y acciones unificadas
- refactor: TareasPanel delega lógica a hooks y unifica UI con KanbanBoard
- refactor: crear useProyectos hook e integrarlo en ProyectosView

### 📚 Documentación

- docs: registrar T-046 Kin Maya en sprint-11, IMPLEMENTED.md y ROADMAP
- docs: backfill IMPLEMENTED.md con historial completo sprints 00-10
- docs: actualización y captura de ideas
- docs(roadmap): update roadmap after implementation audit
- docs: sprints archivados
- docs: update session-close to include sprint archiving step
- docs(sprint): archivar tarea T-025 y actualizar sprint-06.md
- docs: remove active task-021 file after archiving
- docs: close task-021, update sprint-05 and clean session lock
- docs(rules): formalizar convención idioma componentes React y textos UI
- docs(sprint-05): archivar task-020 y actualizar sprint con el cierre de sesión
- docs: update sprint-05 task status for T-019
- docs: remove deprecated idea-inbox.md in favor of structured date-based docs
- docs(inbox): añadir ideas Pasaporte Comunitario y ADRs S3 para Sprint 06
- docs(adr): add ADR-007 modularizacion appservice por dominio
- docs(workflows): add check-inbox.sh and refactor sprint-planning step 3 to consolidate inbox processing
- docs(workflows): update session-close and close task-011 correctly
- docs(sprint): T-008 completar tarea en sprint-02 y archivar task-008
- docs(idea): capture firestore rules testing emulator idea in inbox
- docs(agents): auditoría II — cerrar gaps Fase 2, verificación _archived y lectura de código pre-aprobación
- docs(agents): auditoría de protocolo — cerrar gap estado liminal post-ejecución
- docs(T-006): archivar tarea 006 y registrar sintomas en idea-inbox
- docs(sprint-02): guardar investigación Perplexity — reglas Firestore subcolecciones multi-tenant
- docs: mejorar flujos — research por sprint, caso sprint completo en session-start, archivado de research en session-close
- docs: actualizar roadmap y vaciar idea-inbox
- docs: archivar task-005 y actualizar sprint-02
- docs: actualizar ROADMAP.md verificado + crear idea-inbox con bugs detectados 23/05/2026
- docs: move archived skills out of agent workspace Move .agents/skills/_archived/ → docs/archive/skills/
- docs(inbox): añadir AUDIT-05, 06, 07 — recomendaciones de refactor QwenCoder
- docs(workflow): añadir paso 2b — decisión sobre tareas incompletas al cambiar de sprint
- docs(inbox): añadir auditoría QwenCoder mayo 2026 (AUDIT-01 a AUDIT-04)
- docs(workflow): añadir protocolo de ingestión de auditorías externas
- docs(T-002): registrar ADRs de gobernanza y documentar auditoria de datos de Firebase
- docs: añadir documento de referencia del flujo de trabajo completo
- docs(roadmap): merge análisis Qwen — añadir 15 items faltantes, corregir prioridades y consolidar estructura
- docs: add code audit and improvement plan
- docs: add technical audit - architecture, data model, flows, pages, hooks
- docs(onboarding): add educational animations specification and update roadmap
- docs(readme): link to kanairos context documentation
- docs: add kanairos-context explaining kanarii's role in the ecosystem
- docs(readme): link kanarii as first kanairos node
- docs(roadmap): marcar tareas de comunidades como completadas
- docs: add tech debt and comunidad auto-switch to roadmap
- docs(roadmap): add global marketplace and community onboarding features
- docs: add visual design system and agent identity rules as a skill
- docs(roadmap): add marketplace interaction audit and architectural decision on HD modules
- docs(roadmap): add invitation validation audit and membership removal backlog
- docs(roadmap): add visual coherence session and login reactivity bug
- docs: explicar infraestructura de agentes y flujo de verificación visual
- docs(agent): prohibir diálogos nativos en principios core
- docs(agent): blindar reglas de nomenclatura y modelo de datos
- docs(agent): rewrite GEMINI.md and DEFINITION_OF_DONE.md for Kanarii context
- docs: add open source infrastructure (CONTRIBUTING, CODE_OF_CONDUCT, CHANGELOG)
- docs: add implementar-feature-dry skill
- docs: setup agent skills and rules for Kanarii ecosystem
- docs: update roadmap and readme to reflect current project state

### 🔧 Mantenimiento

- chore: sprint-11 planning + fix check-sprint.sh recursivo + roadmap cleanup
- chore: update roadmap to reflect sprint-10 completions
- chore: archive task-039
- chore: archive sprint-10
- chore: archive sprint-09 [v0.1.0]
- chore: add sprint completion guard to close-task.sh
- chore: add close-sprint.sh — archive completed sprint to docs/sprints/_archived/
- chore: eliminar lock de sesion
- chore: remove lock from git tracking
- chore(roadmap): marcar T-027 como completada en ROADMAP.md
- chore(sprints): marcar T-027 como completada en sprint-06.md
- chore(tasks): archivar task-027.md
- chore(tasks): marcar sesion cerrada en task-027.md
- chore: sprint 06 planning, archive ideas & update roadmap
- chore(T-019): archive completed task file
- chore(T-019): mark session as closed in task file
- chore: archivar research de sprint-04 y remover lock de sesion
- chore(sprint): marcar T-013 como completado en sprint-04
- chore(T-013): archivar archivo de tarea T-013
- chore: archivar task-010 y limpiar lock de sesión
- chore: archive task-009
- chore(sprint): mark T-007 as completed in sprint-02.md
- chore: archive task-007 after completion
- chore: cierre de sesión sprint-01 [T-002/T-003]
- chore(workflow): añadir verificación de código pre-sprint en sprint-planning
- chore(workflow): reforzar freno de aprobación en session-start y template
- chore(workflow): añadir checklist de aprobación al template de tareas
- chore(workflow): reforzar freno de aprobación en session-start
- chore(T-002): actualizar sprint-01 y archivar documentacion de la tarea
- chore(T-001): cierre administrativo de rescate task-001
- chore: eliminar stubs vacíos de skills duplicadas en activo
- chore: eliminar stubs de archivado del directorio activo
- chore: vaciar skills archivadas de la carpeta activa
- chore: archivar accesibilidad-comunitaria
- chore: inventario de skills + archivar 12 skills inactivas
- chore: expose _archived/ folders to git tracking
- chore: track _archived README files (force-add past .gitignore)
- chore: track useProfiles hook (previously untracked)
- chore(agents): enforce hard stop protocol in strict-workflow
- chore(agents): add audit-before-refactor rule
- chore(agents): limpieza de skills irrelevantes y nuevas rules/skill de guardia
- chore: rename .agent to .agents (official Antigravity naming convention)
- chore(infra): unificar .agents/ en .agent/ para evitar duplicidad
- chore: añadir favicon y actualizar título de la app

### 📦 Otros

- quitado el lazy point de session start
- doc actualizada
- cambios en check-inbox.sh para que detecte subcarpetas dentro de external-inbox y /session-start para que recomiende cambio de modelo para el /sprint-planning
- test(T-012): configurar Firebase Emulator con JDK 21 local y tests locales de firestore rules
- borrados flujos obsoletos
- restaurada fase 3.5 a estado anterior
- ROADMAP.md actualizado
- añadido flujo session-close
- test(T-002): agregar suite de validacion de reglas y configurar exclusion de temporales
- Sprint 00 — Histórico
- cambios en la documentación
- external-inbox incluido
- añadido en .agents/cli_onboarding.md
- añadido inbox/
- gitignore reparado
- Title: Implement community member lifecycle management hooks and services
- perf: limit node memory and optimize vite cache
- Create LICENSE
- iconos e imágenes añadidas a public
- style: EntityCard alineada con paleta y botones de TareaCard
- style: EntityCard replica TareaCard aesthetic con variables semánticas
- design: semantic EntityCard with premium styling and dark mode support

## [0.1.0] — sprint-09 — 2026-05-29

### ✨ Features

- feat: pasaporte ayudas(T-036)
- feat: welcome hero sections(T-035)
- feat: persistencia offline(T-037)
- feat: close-sprint.sh includes CHANGELOG.md in archive commit
- feat: add update-changelog.sh and integrate into session-close workflow
- feat(scripts): add generate-digest.sh + complexity threshold in inventory-check
- feat(agents): add inventory-check.sh + update sprint-planning and session-start with anti-duplication firewall
- feat: modal respuesta s3(T-034)
- feat: sala deliberacion s3(T-033)
- feat: migracion triada comunitaria(T-023)
- feat: fix fallback comunidad(T-032)
- feat: maquina estados s3(T-031)
- feat(governance): S3 status transition improvements for integrando and en_objeciones
- feat: generalizar validation communityid(T-029)
- feat: logout cleanup(T-028)
- feat(workflow): close-task.sh y session-close.md sin argumentos, mensaje derivado de rama
- feat(marketplace): vista de detalle de acuerdo, historial y enmiendas
- feat(proyectos): contador de solicitudes de proyectos pendientes en sidebar
- feat(agents): lazy-planning rule en caveman.md + cerrar hueco Searched-for en session-start.md
- feat(agents): close-task.sh + simplificar session-close con protocolo atómico
- feat(calendario): control de permisos en eventos y sanitizacion de payload antes de guardar en Firestore
- feat(deliberacion): T-027 directorio de decisiones con filtros de estado y badge de atencion requerida
- feat(agents): check-sprint.sh + actualizar sprint-planning y caveman con contrato de contexto
- feat(T-020): ClarificationThread para hilos de aclaración de dudas
- feat(T-019): CTA aclaración dudas + fixes compilación S3
- feat(T-018): backfill members profile script & ADRs 009-011
- feat(T-017): fix de sobreescritura de ficha y registro de ADR-008
- feat(T-017): corregir displayName vacio al re-entrar por invitacion y solicitudes
- feat(T-016): modularizar appService.ts por dominio en src/lib/services/
- feat(T-015): diferenciar causas de error al canjear invitaciones
- feat(T-014): aplicar DEFAULT_LIST_LIMIT = 50 a todas las listas de Firestore y actualizar sprint-04
- feat(T-013): abstraer imports de Firebase en hooks y validar communityId
- feat(T-011): move community switcher to sidebar header on desktop and bottom sheet on mobile
- feat: implementar reglas de seguridad en firestore.rules para evitar bypass de membresía (T-010)
- feat(T-009): sync user profile with community memberships and optimize listenAppUser
- feat(security): T-008 restringir lectura/escritura en subcolecciones de propuestas y posts por comunidad
- feat(security): implement firestore security rules for community_exits, profiles and fichas onboarding
- feat(invitaciones): redirigir a comunidad despues de unirse y registrar miembro en batch
- feat: asegurar reglas de seguridad Firestore para actas y fichas (T-005)
- feat(T-002): eliminar email de admin hardcoded y alinear reglas de seguridad en espanol
- feat(T-001): implementar firestore rules y corregir reactividad de auth
- feat(workflow): añadir punto de entrada de investigación en Fase 2 de session-start
- feat(workflow): añadir paso 6 de pausa y handoff a /session-start en sprint-planning
- feat(.agents): add git-gardener skill with Phase 0 sync + gone branches + divergence detection
- feat: sistema antisabotaje — núcleo completo
- feat(.agents): token optimization - caveman, DOE framework, skill-manager, tasks template
- feat: add database audit and cleanup scripts
- feat: integración onboarding pedagógico con tour S3, escape hatch y progress tracker estático
- feat(.agents): add inbox-integrator skill and inbox template manifest
- feat(ficha-comunidad): landing v2 + arquetipos S3 + fix context crash al borrar comunidad + fix duplicate toast keys
- feat(.agents): add agent-onboarding skill
- feat(.agents): add chrome-devtools-first, agent-ready-web-contract skills and snapshot-over-screenshot rule
- feat(comunidades): settings CRUD + auto-switch + ficha pública /c/:slug + configuración inline para admin
- feat(comunidades): wizard de registro con geocodificación y banner corregido
- feat(admin): add community health dashboard with metrics, chart and activity feed
- feat(admin): restructure panel with tab navigation, URL persistence + fix TS bugs
- feat(acuerdos): add counterproposal flow, negotiation turns, undo cancel + badge for contraoferta
- feat(badge): notify solicitante when acuerdo status changes via localStorage timestamp
- feat(ux): clean debug logs, update roadmap, fix redirects and modals
- feat(nav): navigate to mis_acuerdos tab when badge clicked + cleanup logs
- feat(acuerdos): chip fecha vencida + badge nav incluye en_curso expirado
- feat(nav): badge acuerdos pendientes en Sidebar y BottomNav
- feat(solicitudes): rejection flow with modal, reason display for admin and applicant
- feat(hooks): add useFichaActions.ts
- feat(community): member lifecycle - expulsion, voluntary exit, compound key community_members
- feat(hooks): create useServicioActions and migrate MarketplaceView
- feat(hooks): create useComunidadActions and migrate ComunidadesView and AdminSolicitudesView
- feat(hooks): create useProyectoActions and migrate ProyectosView
- feat(hooks): extend usePropuestaActions and migrate Gobernanza components (Wizard, PropuestaDetail, ResponseModal)
- feat(hooks): migrate PostDetailModal to usePostActions, fix missing toast on addRespuesta, fix useActaActions to use saveActa
- feat(hooks): create useEventoActions and migrate CalendarioView to action hook pattern
- feat(hooks): create usePropuestaActions and migrate PropuestasView to action hook pattern
- feat(hooks): create useActaActions and migrate ActasPanel to action hook pattern
- feat(hooks): create usePostActions and migrate Tablon to action hook pattern
- feat: display text positions (objections, doubts, concerns) in PropuestaDetail
- feat: enforce mandatory text field for 'duda' response type in ResponseModal
- feat: professionalize data architecture and member management system
- feat(gobernanza): motor de quórum S3 completo
- feat(infra): instalar agent-skills de Firebase y añadir skill personalizada firebase-kanarii
- feat(propuestas): S3Timeline + ConsentGrid con privacidad por diseño
- feat(propuestas): ResponseModal con jerarquía visual S3 y validación de objeciones
- feat(propuestas): PropuestaDetail con diferenciación de roles y estado acordada
- feat(propuestas): PropuestaCard + PropuestasView con Kanban de gobernanza
- feat: complete marketplace sovereignty MVP level 1 with owner actions and undoable delete
- feat: unified auth modal with login mode, fix magic link return flow for existing users
- feat: unificación de persistencia de onboarding y fix de limbo arquitectónico (Abián)
- feat: magic link cross-device persistence, membership guards, and admin ficha integration
- feat: magic link auth + google on ficha save — unauthenticated onboarding with auth gate before persist
- feat: invitation code generator and management in admin panel — mobile nav parity for communities and admin links
- feat: community admin panel and navigation visibility fixes
- feat: community model v2 — invitations, manifesto, multi-membership and discovery services
- feat: update visual identity with palm icon in sidebar and logo in welcome screen
- feat: replace placeholder icons with kanarii-logo.svg in sidebar
- feat: inline editing for community board posts
- feat: community board with needs/offers, async responses and state management
- feat: community calendar with real-time sync and premium UI
- feat: structured cruce analysis with CNV, shadows, rank map and enriched channels
- feat: reactividad total en panel de detalle y modal de edición de actas
- feat: refactor ProyectosView a arquitectura DRY con useProyectos y useEntityActions
- feat: complete architectural refactor Phase 2 - dumb views and service centralization
- feat: complete architecture refactor phase 1 - foundation hooks
- feat: standard architecture rules, visual redesign of EntityCard and audit skill

### 🐛 Bug Fixes

- fix(protocol): cerrar grieta task files cruzados y Listed directory en .agents/tasks/
- fix(protocol): ampliar checkpoint lazy-planning, tabla de violaciones y script fusionado
- fix(workflow): checkpoint lazy-planning (Fase 2.5), auditoría vinculada, mecanismo en caveman, verificación en session-close y script check-lazy-planning.sh
- fix(workflow): añadir campo audit trail en bloque de aprobación Fase 3.5
- fix(workflow): eliminar lock antes del git add -A en close-task.sh
- fix(gobernanza): usar currentCommunityId de ComunidadContext para validar acceso a propuestas
- fix(T-017): añadir guardia de datos de perfil al sincronizar fichas
- fix(T-017): forzar refresh de auth y leer profiles directamente para displayName en reingreso con sesión activa
- fix(T-017): evitar sobreescribir displayName vacio en getAppUser needsUpdate
- fix(T-017): refinar fallback de displayName y nombre en invitaciones
- fix(T-017): fix displayName backfill y getMemberName fallback
- fix(agents): detectar tareas En curso en FASE 1 y alertar antes de continuar
- fix(agents): marcar sesión cerrada en task file ANTES de archivar (C4)
- fix: mover firebase-crashlytics y firebase-data-connect a _archived/ con contenido completo
- fix: auditoría QwenCoder + renombrar inbox/ → external-inbox/
- fix: restaurar accesibilidad-comunitaria al activo + actualizar inventario
- fix: defensive fallback for deleted servicioId in acuerdos
- fix(dashboard): robust date parsing for acuerdos chart
- fix(members): improve getMemberName fallback resolution
- fix(marketplace): add stopPropagation to acuerdo modal trigger
- fix(members): resolve rolComunitario field mapping
- fix: remove arquetipo selector from FichaModal
- fix: remove arquetipo selector from FichaModal
- fix: rolComunitario field mapping in ComunidadSubTab
- fix: AcuerdoDetailModal conditional in AdminPanelModals
- fix(admin-panel): roles, gráfico dashboard y key prop en TareasPanel
- fix(admin): fallback for invalid dates and deleted services in Marketplace tab
- fix(members): getMemberName returns Miembro for unknown UIDs after load
- fix(marketplace): use getMemberName from useCommunityMembers hook (DRY)
- fix(nav): hoist isAdmin declaration in BottomNav
- fix(acuerdos): replace undefined with null for fechaPropuesta + type safety
- fix(solicitudes): create community_members doc on request approval
- fix(ficha): show leave button using appUser.communityIds instead of stale ficha.communityId
- fix(admin): show correct nombreUsuario in bajas recientes
- fix(admin): member lifecycle bugs - nombre en bajas, Abián invisible en lista
- fix(ficha): move displayFicha declaration before useEffect to resolve TDZ ReferenceError
- fix(invitations): reactive appUser listener, duplicate membership guard, input sanitization, silent error toast control
- fix: define closeModal in ActasPanel, fix EntityCard props, add useTareaActions and migrate TareasPanel and CreateActaModal
- fix(hooks): add missing useCallback import in usePropuestaDetail
- fix(hooks): normalize reload and error contract in useCommunityMembers, useActas, useFicha, usePropuestaDetail, usePropuestas, useTareas
- fix(hooks): normalize reload and error contract in useAcuerdos, useEventos, usePosts, useServicios
- fix(AdminPanel): consolidate imports and use correct getUserFicha export
- fix: implement lazy TTL cleanup for pending fichas (Spark Plan optimization)
- fix: ensure communityId persistence in community_members index
- fix(appService): permitir respuesta del autor y corrección de tipos TS
- fix(onboarding): propagar communityId a fichas/profiles al usar invitación
- fix: communities view — mobile layout, input visibility and submission spinner reset
- fix: AdminPanel crashes, data backfill and multi-community scoping
- fix: resolver lectura de datos de Diseño Humano y cálculo de canales
- fix: mejorar reactividad del panel de actas y limpieza de logs
- fix: añadir import de saveActa y corregir uso de useToast
- fix: corregir argumentos de saveActa en CreateActaModal
- fix: restaurar funcionalidad de guardado en CreateActaModal
- fix: sincronizar props de KanbanBoard y añadir loader visual
- fix: añadir seguridad ante nulos en mapeo de habilidades de proyectos
- fix: restaurar renderizado de ProyectosView añadiendo iconos faltantes
- fix: startDelete config en renderProjectCard + import EntityVariant

### ♻️ Refactoring

- refactor: T-021 migrate all realtime firestore hooks to useFirestoreCollection & fix selected project reactivity bug
- refactor(agents): compactar session-start.md bajo límite 12000 chars
- refactor(admin-panel): SRP completo — AdminPanel.tsx de 1468 a 240 líneas
- refactor(admin): extract useDashboardStats hook
- refactor(admin): extract badge utilities and consolidate useCommunityMembers
- refactor(pages): extract AdminSolicitudesView logic to hooks
- refactor(hooks): fix useActas return signature to match project standard { items, loading, error, reload }
- refactor: AuthContext delegates Firestore to appService, adds communityId to user context
- refactor: extraer modales de Proyectos y Actas a componentes independientes
- refactor: CruceView delega lógica a appService y usa useToast
- refactor: ActasPanel usa EntityCard y acciones unificadas
- refactor: TareasPanel delega lógica a hooks y unifica UI con KanbanBoard
- refactor: crear useProyectos hook e integrarlo en ProyectosView

### 📚 Documentación

- docs(roadmap): update roadmap after implementation audit
- docs: sprints archivados
- docs: update session-close to include sprint archiving step
- docs(sprint): archivar tarea T-025 y actualizar sprint-06.md
- docs: remove active task-021 file after archiving
- docs: close task-021, update sprint-05 and clean session lock
- docs(rules): formalizar convención idioma componentes React y textos UI
- docs(sprint-05): archivar task-020 y actualizar sprint con el cierre de sesión
- docs: update sprint-05 task status for T-019
- docs: remove deprecated idea-inbox.md in favor of structured date-based docs
- docs(inbox): añadir ideas Pasaporte Comunitario y ADRs S3 para Sprint 06
- docs(adr): add ADR-007 modularizacion appservice por dominio
- docs(workflows): add check-inbox.sh and refactor sprint-planning step 3 to consolidate inbox processing
- docs(workflows): update session-close and close task-011 correctly
- docs(sprint): T-008 completar tarea en sprint-02 y archivar task-008
- docs(idea): capture firestore rules testing emulator idea in inbox
- docs(agents): auditoría II — cerrar gaps Fase 2, verificación _archived y lectura de código pre-aprobación
- docs(agents): auditoría de protocolo — cerrar gap estado liminal post-ejecución
- docs(T-006): archivar tarea 006 y registrar sintomas en idea-inbox
- docs(sprint-02): guardar investigación Perplexity — reglas Firestore subcolecciones multi-tenant
- docs: mejorar flujos — research por sprint, caso sprint completo en session-start, archivado de research en session-close
- docs: actualizar roadmap y vaciar idea-inbox
- docs: archivar task-005 y actualizar sprint-02
- docs: actualizar ROADMAP.md verificado + crear idea-inbox con bugs detectados 23/05/2026
- docs: move archived skills out of agent workspace Move .agents/skills/_archived/ → docs/archive/skills/
- docs(inbox): añadir AUDIT-05, 06, 07 — recomendaciones de refactor QwenCoder
- docs(workflow): añadir paso 2b — decisión sobre tareas incompletas al cambiar de sprint
- docs(inbox): añadir auditoría QwenCoder mayo 2026 (AUDIT-01 a AUDIT-04)
- docs(workflow): añadir protocolo de ingestión de auditorías externas
- docs(T-002): registrar ADRs de gobernanza y documentar auditoria de datos de Firebase
- docs: añadir documento de referencia del flujo de trabajo completo
- docs(roadmap): merge análisis Qwen — añadir 15 items faltantes, corregir prioridades y consolidar estructura
- docs: add code audit and improvement plan
- docs: add technical audit - architecture, data model, flows, pages, hooks
- docs(onboarding): add educational animations specification and update roadmap
- docs(readme): link to kanairos context documentation
- docs: add kanairos-context explaining kanarii's role in the ecosystem
- docs(readme): link kanarii as first kanairos node
- docs(roadmap): marcar tareas de comunidades como completadas
- docs: add tech debt and comunidad auto-switch to roadmap
- docs(roadmap): add global marketplace and community onboarding features
- docs: add visual design system and agent identity rules as a skill
- docs(roadmap): add marketplace interaction audit and architectural decision on HD modules
- docs(roadmap): add invitation validation audit and membership removal backlog
- docs(roadmap): add visual coherence session and login reactivity bug
- docs: explicar infraestructura de agentes y flujo de verificación visual
- docs(agent): prohibir diálogos nativos en principios core
- docs(agent): blindar reglas de nomenclatura y modelo de datos
- docs(agent): rewrite GEMINI.md and DEFINITION_OF_DONE.md for Kanarii context
- docs: add open source infrastructure (CONTRIBUTING, CODE_OF_CONDUCT, CHANGELOG)
- docs: add implementar-feature-dry skill
- docs: setup agent skills and rules for Kanarii ecosystem
- docs: update roadmap and readme to reflect current project state

### 🔧 Mantenimiento

- chore: add sprint completion guard to close-task.sh
- chore: add close-sprint.sh — archive completed sprint to docs/sprints/_archived/
- chore: eliminar lock de sesion
- chore: remove lock from git tracking
- chore(roadmap): marcar T-027 como completada en ROADMAP.md
- chore(sprints): marcar T-027 como completada en sprint-06.md
- chore(tasks): archivar task-027.md
- chore(tasks): marcar sesion cerrada en task-027.md
- chore: sprint 06 planning, archive ideas & update roadmap
- chore(T-019): archive completed task file
- chore(T-019): mark session as closed in task file
- chore: archivar research de sprint-04 y remover lock de sesion
- chore(sprint): marcar T-013 como completado en sprint-04
- chore(T-013): archivar archivo de tarea T-013
- chore: archivar task-010 y limpiar lock de sesión
- chore: archive task-009
- chore(sprint): mark T-007 as completed in sprint-02.md
- chore: archive task-007 after completion
- chore: cierre de sesión sprint-01 [T-002/T-003]
- chore(workflow): añadir verificación de código pre-sprint en sprint-planning
- chore(workflow): reforzar freno de aprobación en session-start y template
- chore(workflow): añadir checklist de aprobación al template de tareas
- chore(workflow): reforzar freno de aprobación en session-start
- chore(T-002): actualizar sprint-01 y archivar documentacion de la tarea
- chore(T-001): cierre administrativo de rescate task-001
- chore: eliminar stubs vacíos de skills duplicadas en activo
- chore: eliminar stubs de archivado del directorio activo
- chore: vaciar skills archivadas de la carpeta activa
- chore: archivar accesibilidad-comunitaria
- chore: inventario de skills + archivar 12 skills inactivas
- chore: expose _archived/ folders to git tracking
- chore: track _archived README files (force-add past .gitignore)
- chore: track useProfiles hook (previously untracked)
- chore(agents): enforce hard stop protocol in strict-workflow
- chore(agents): add audit-before-refactor rule
- chore(agents): limpieza de skills irrelevantes y nuevas rules/skill de guardia
- chore: rename .agent to .agents (official Antigravity naming convention)
- chore(infra): unificar .agents/ en .agent/ para evitar duplicidad
- chore: añadir favicon y actualizar título de la app

### 📦 Otros

- quitado el lazy point de session start
- doc actualizada
- cambios en check-inbox.sh para que detecte subcarpetas dentro de external-inbox y /session-start para que recomiende cambio de modelo para el /sprint-planning
- test(T-012): configurar Firebase Emulator con JDK 21 local y tests locales de firestore rules
- borrados flujos obsoletos
- restaurada fase 3.5 a estado anterior
- ROADMAP.md actualizado
- añadido flujo session-close
- test(T-002): agregar suite de validacion de reglas y configurar exclusion de temporales
- Sprint 00 — Histórico
- cambios en la documentación
- external-inbox incluido
- añadido en .agents/cli_onboarding.md
- añadido inbox/
- gitignore reparado
- Title: Implement community member lifecycle management hooks and services
- perf: limit node memory and optimize vite cache
- Create LICENSE
- iconos e imágenes añadidas a public
- style: EntityCard alineada con paleta y botones de TareaCard
- style: EntityCard replica TareaCard aesthetic con variables semánticas
- design: semantic EntityCard with premium styling and dark mode support

## [Unreleased]

### Añadido
- **Sistema de Comunidades v2**: Soporte para multi-membership (`communityIds[]`), manifiestos y privacidad.
- **Onboarding y Seguridad**: Nuevo flujo de registro con Magic Link y AuthGateModal reutilizable.
- **Persistencia Cross-Device**: Guardado de datos del onboarding antes de la autenticación.
- **Infraestructura Open Source**: Adición de AGPL-3.0 LICENSE, CONTRIBUTING.md y CODE_OF_CONDUCT.md.
- **Pipeline de Análisis IA**: Generación de informes estructurados con Gemini (Mapa de Rangos, Sombras Relacionales).
- **Calendario Comunitario**: Integración con Firestore y vista de eventos real-time.
- **Tablón de Necesidades/Ofertas**: Sistema de posts con respuestas y gestión de estados.

### Cambiado
- Refactorización de `appService.ts` para soportar acceso dinámico por comunidad.
- Mejora de la UI de navegación móvil para paridad con escritorio.

---
*Última actualización: 15 May 2026*
