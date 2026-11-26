import { useState, useEffect, useMemo, useCallback } from 'react';
import { Comunidad, NodeModuleId } from '../lib/services/_types';
import { detectComunidadExistingModules } from '../lib/appService';
import { useComunidadActions } from './useComunidadActions';

export type NodeModuleTier = 'semilla' | 'coordinacion' | 'madurez';

export interface NodeModuleDefinition {
  id: NodeModuleId;
  tier: NodeModuleTier;
  alwaysActive?: boolean;
  labelKey: string;
  defaultLabel: string;
  descKey: string;
  defaultDesc: string;
  href: string;
}

export const SEED_MODULES: NodeModuleId[] = ['tablon', 'calendario', 'miembros'];

export const NODE_MODULE_CATALOG: NodeModuleDefinition[] = [
  // Nivel 1: Semilla (siempre activos)
  {
    id: 'tablon',
    tier: 'semilla',
    alwaysActive: true,
    labelKey: 'nav.board',
    defaultLabel: 'Tablón',
    descKey: 'modules.tablonDesc',
    defaultDesc: 'Conversación asíncrona, necesidades y ofertas locales del nodo.',
    href: '/tablon',
  },
  {
    id: 'calendario',
    tier: 'semilla',
    alwaysActive: true,
    labelKey: 'nav.agenda',
    defaultLabel: 'Agenda',
    descKey: 'modules.calendarioDesc',
    defaultDesc: 'Encuentros, mingas y fechas compartidas de la comunidad.',
    href: '/calendario',
  },
  {
    id: 'miembros',
    tier: 'semilla',
    alwaysActive: true,
    labelKey: 'nav.members',
    defaultLabel: 'Miembros',
    descKey: 'modules.miembrosDesc',
    defaultDesc: 'Ficha pública del nodo, integrantes y solicitudes de acogida.',
    href: '/c',
  },
  // Nivel 2: Coordinación (activación por herramienta)
  {
    id: 'proyectos',
    tier: 'coordinacion',
    labelKey: 'nav.projects',
    defaultLabel: 'Proyectos',
    descKey: 'modules.proyectosDesc',
    defaultDesc: 'Iniciativas de equipo con roles y avance compartido.',
    href: '/proyectos',
  },
  {
    id: 'tareas',
    tier: 'coordinacion',
    labelKey: 'nav.tasks',
    defaultLabel: 'Tareas',
    descKey: 'modules.tareasDesc',
    defaultDesc: 'Tablero Kanban y círculos para coordinar trabajo diario.',
    href: '/tareas',
  },
  // Nivel 3: Madurez (activación por herramienta)
  {
    id: 'gobernanza',
    tier: 'madurez',
    labelKey: 'nav.governance',
    defaultLabel: 'Gobernanza S3',
    descKey: 'modules.gobernanzaDesc',
    defaultDesc: 'Propuestas sociocráticas, tensiones y toma de decisiones por consentimiento.',
    href: '/gobernanza',
  },
  {
    id: 'actas',
    tier: 'madurez',
    labelKey: 'nav.minutes',
    defaultLabel: 'Actas',
    descKey: 'modules.actasDesc',
    defaultDesc: 'Registro de asambleas, acuerdos y memoria viva del nodo.',
    href: '/actas',
  },
  {
    id: 'soberania',
    tier: 'madurez',
    labelKey: 'nav.marketplace',
    defaultLabel: 'Soberanía',
    descKey: 'modules.soberaniaDesc',
    defaultDesc: 'Intercambios internos, balances de reciprocidad y acuerdos.',
    href: '/soberania',
  },
];

// Cache por sesión para evitar re-escaneos innecesarios al navegar entre vistas del mismo nodo
const detectedModulesCache: Record<string, string[]> = {};

/**
 * Resuelve los módulos activos de un nodo combinando:
 * 1) Módulos Semilla siempre activos
 * 2) Configuración explícita `comunidad.enabledModules`
 * 3) Auto-detección de colecciones con datos previos en Firestore (para nodos veteranos)
 */
export function useNodeModules(comunidad: Comunidad | null | undefined) {
  const { actualizarModulosComunidad, isExecuting } = useComunidadActions();
  const [detectedModules, setDetectedModules] = useState<string[]>([]);
  const [localOverride, setLocalOverride] = useState<string[] | null>(null);

  const communitySlug = comunidad?.slug || comunidad?.id;

  useEffect(() => {
    setLocalOverride(null);
    if (!communitySlug) {
      setDetectedModules([]);
      return;
    }

    if (detectedModulesCache[communitySlug]) {
      setDetectedModules(detectedModulesCache[communitySlug]);
      return;
    }

    let cancelled = false;
    detectComunidadExistingModules(communitySlug).then((found) => {
      if (!cancelled) {
        detectedModulesCache[communitySlug] = found;
        setDetectedModules(found);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [communitySlug]);

  const activeModulesSet = useMemo(() => {
    const set = new Set<NodeModuleId>(SEED_MODULES);
    const configured = localOverride ?? comunidad?.enabledModules ?? [];
    for (const id of configured) {
      set.add(id as NodeModuleId);
    }
    // Si no hay override manual explícito que desactive, respetamos datos detectados para no ocultar nada
    if (localOverride === null) {
      for (const id of detectedModules) {
        if (!comunidad?.enabledModules || comunidad.enabledModules.includes(id) || detectedModules.includes(id)) {
          set.add(id as NodeModuleId);
        }
      }
    }
    return set;
  }, [comunidad?.enabledModules, detectedModules, localOverride]);

  const isModuleEnabled = useCallback(
    (id: NodeModuleId) => activeModulesSet.has(id),
    [activeModulesSet]
  );

  const toggleModule = useCallback(
    async (id: NodeModuleId) => {
      if (!communitySlug) return;
      if (SEED_MODULES.includes(id)) return; // Los módulos semilla no se desactivan

      const current = new Set<string>(activeModulesSet);
      if (current.has(id)) {
        current.delete(id);
      } else {
        current.add(id);
      }

      const nextList = Array.from(current);
      setLocalOverride(nextList);
      await actualizarModulosComunidad(communitySlug, nextList);
    },
    [communitySlug, activeModulesSet, actualizarModulosComunidad]
  );

  const hasOnlySeedModules = useMemo(() => {
    for (const id of activeModulesSet) {
      if (!SEED_MODULES.includes(id)) return false;
    }
    return true;
  }, [activeModulesSet]);

  return {
    activeModules: activeModulesSet,
    isModuleEnabled,
    toggleModule,
    hasOnlySeedModules,
    isUpdating: isExecuting,
    catalog: NODE_MODULE_CATALOG,
  };
}
