import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFicha } from '../hooks/useFicha';
import { useFichas } from '../hooks/useFichas';
import { useComunidades } from '../hooks/useComunidades';
import { useEventos } from '../hooks/useEventos';
import { useResidencias } from '../hooks/useResidencias';
import { kinDeHoy } from '../lib/kinMaya';
import { calcularSinergiasMultiples, detectIsland } from '../lib/sinergias';
import { SynergyCard } from '../components/sinergias/SynergyCard';
import { ExploreEntityCard } from '../components/dashboard/ExploreEntityCard';
import { PasaporteModal } from '../components/perfil/PasaporteModal';
import { AuthGateModal } from '../components/AuthGateModal';
import { Sparkles, MapPin, Compass, ArrowRight, Users, Loader2, LogIn, Search, X, SlidersHorizontal, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Ficha } from '../lib/services/_types';

type FilterType = 'all' | 'sameIsland' | 'energetic' | 'triad';
type SearchTabMode = 'advanced' | 'browse';
type LookingForType = 'all' | 'people' | 'nodes' | 'events' | 'residencies';

// Perfil de referencia para modo explorador / demo
const DEMO_CURRENT_USER_FICHA: Ficha = {
  userId: 'demo-ines',
  nombre: 'Inés (Exploradora)',
  datosPersona: {
    nombre: 'Inés',
    lugar: 'Las Palmas de Gran Canaria',
    fechaNacimiento: '1990-09-23',
    hora: '10:00',
    genero: 'femenino',
    rol_comunidad: 'Facilitadora de Permacultura',
    saberes: 'Permacultura, Facilitación Sociocrática, Huertos vivos',
    antiguedad_anos: 4,
    tension: 'Impulsando autonomía alimentaria en la red.',
    communityId: 'arteara',
  },
  datosOnboarding: {
    nombre: 'Inés',
    lugar: 'Las Palmas de Gran Canaria',
    fechaNacimiento: '1990-09-23',
    hora: '10:00',
    genero: 'femenino',
    rol_comunidad: 'Facilitadora de Permacultura',
    saberes: 'Permacultura, Facilitación Sociocrática',
    antiguedad_anos: 4,
    tension: 'Impulsando autonomía alimentaria.',
    communityId: 'arteara',
  },
  triada: {
    ofrendas: ['Permacultura', 'Facilitación de círculos'],
    saberes: ['Permacultura', 'Gobernanza'],
    necesidades: ['Bioconstrucción', 'Energía solar'],
  },
  datosBrutos: {
    diseno_humano: {
      tipo: 'Generador',
      autoridad: 'Sacral',
      perfil: '3/5',
    },
  },
};

// Perfiles de demostración deterministas para modo explorador o cuando no hay miembros aún
const DEMO_FICHAS: Ficha[] = [
  {
    userId: 'demo-mateo',
    nombre: 'Mateo González',
    datosPersona: {
      nombre: 'Mateo González',
      lugar: 'Las Palmas de Gran Canaria',
      fechaNacimiento: '1992-05-18',
      hora: '14:30',
      genero: 'masculino',
      rol_comunidad: 'Facilitador de Bioconstrucción',
      saberes: 'Bioconstrucción, Energía Solar, Fontanería comunal',
      antiguedad_anos: 3,
      tension: 'Buscando alianzas para levantar un domo geodésico y huerto regenerativo.',
      communityId: 'arteara',
    },
    datosOnboarding: {
      nombre: 'Mateo González',
      lugar: 'Las Palmas de Gran Canaria',
      fechaNacimiento: '1992-05-18',
      hora: '14:30',
      genero: 'masculino',
      rol_comunidad: 'Facilitador de Bioconstrucción',
      saberes: 'Bioconstrucción, Energía Solar',
      antiguedad_anos: 3,
      tension: 'Buscando alianzas para levantar un domo geodésico.',
      communityId: 'arteara',
    },
    triada: {
      ofrendas: ['Bioconstrucción', 'Carpintería de ribera', 'Energía solar'],
      saberes: ['Bioconstrucción', 'Energía solar'],
      necesidades: ['Permacultura', 'Cuidado de semillas'],
    },
    datosBrutos: {
      diseno_humano: {
        tipo: 'Proyector',
        autoridad: 'Emocional',
        perfil: '1/3',
      },
    },
  },
  {
    userId: 'demo-elena',
    nombre: 'Elena Morales',
    datosPersona: {
      nombre: 'Elena Morales',
      lugar: 'La Orotava, Tenerife',
      fechaNacimiento: '1988-11-04',
      hora: '08:15',
      genero: 'femenino',
      rol_comunidad: 'Guardiana de Semillas y Salud',
      saberes: 'Herboristería, Agroecología, Medicina tradicional canaria',
      antiguedad_anos: 5,
      tension: 'Impulsando banco de semillas locales y botiquines comunitarios.',
      communityId: 'anaga',
    },
    datosOnboarding: {
      nombre: 'Elena Morales',
      lugar: 'La Orotava, Tenerife',
      fechaNacimiento: '1988-11-04',
      hora: '08:15',
      genero: 'femenino',
      rol_comunidad: 'Guardiana de Semillas y Salud',
      saberes: 'Herboristería, Agroecología',
      antiguedad_anos: 5,
      tension: 'Impulsando banco de semillas locales.',
      communityId: 'anaga',
    },
    triada: {
      ofrendas: ['Herboristería', 'Semillas locales', 'Facilitación de círculos'],
      saberes: ['Agroecología', 'Herboristería'],
      necesidades: ['Carpintería', 'Apoyo legal cooperativo'],
    },
    datosBrutos: {
      diseno_humano: {
        tipo: 'Generador',
        autoridad: 'Sacral',
        perfil: '2/4',
      },
    },
  },
  {
    userId: 'demo-yeray',
    nombre: 'Yeray Betancort',
    datosPersona: {
      nombre: 'Yeray Betancort',
      lugar: 'Gáldar, Gran Canaria',
      fechaNacimiento: '1995-02-28',
      hora: '19:45',
      genero: 'masculino',
      rol_comunidad: 'Coordinador de Aguas y Riego',
      saberes: 'Sistemas de riego eficiente, Tecnologías libres, Gobernanza S3',
      antiguedad_anos: 2,
      tension: 'Optimización de captación de niebla y agua pluvial.',
      communityId: 'arteara',
    },
    datosOnboarding: {
      nombre: 'Yeray Betancort',
      lugar: 'Gáldar, Gran Canaria',
      fechaNacimiento: '1995-02-28',
      hora: '19:45',
      genero: 'masculino',
      rol_comunidad: 'Coordinador de Aguas y Riego',
      saberes: 'Sistemas de riego, Tecnologías libres',
      antiguedad_anos: 2,
      tension: 'Optimización de captación de agua.',
      communityId: 'arteara',
    },
    triada: {
      ofrendas: ['Captación de agua', 'Automatización de riego', 'Gobernanza S3'],
      saberes: ['Sistemas de riego', 'Tecnologías libres'],
      necesidades: ['Bioconstrucción', 'Cocina comunitaria'],
    },
    datosBrutos: {
      diseno_humano: {
        tipo: 'Generador Manifestante',
        autoridad: 'Sacral',
        perfil: '3/5',
      },
    },
  },
];

export function DashboardView() {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const { appUser } = useAuth();
  const { ficha: userFicha, loading: userFichaLoading } = useFicha();
  const { fichas: allFichas, loading: allFichasLoading } = useFichas(appUser ? undefined : 'none');
  const { items: comunidades } = useComunidades();
  const { eventos } = useEventos(appUser ? 'network' : undefined);
  const { residencias } = useResidencias();

  const [searchMode, setSearchMode] = useState<SearchTabMode>('advanced');
  const [lookingFor, setLookingFor] = useState<LookingForType>('all');
  const [memberOf, setMemberOf] = useState<string>('all');
  const [nearOnly, setNearOnly] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const todayKin = useMemo(() => kinDeHoy(), []);

  const referenceFicha = useMemo(() => {
    return userFicha || (!appUser ? DEMO_CURRENT_USER_FICHA : null);
  }, [userFicha, appUser]);

  const userIsland = useMemo(() => {
    const loc = referenceFicha?.datosPersona?.lugar || referenceFicha?.datosOnboarding?.lugar;
    return detectIsland(loc);
  }, [referenceFicha]);

  // Selección de fichas activas: si hay datos reales se usan, sino los demo
  const activeFichasPool = useMemo(() => {
    if (appUser && allFichas && allFichas.length > 0) {
      return allFichas;
    }
    return DEMO_FICHAS;
  }, [appUser, allFichas]);

  // Cálculo determinista de sinergias para todos los miembros
  const allMatches = useMemo(() => {
    return calcularSinergiasMultiples(referenceFicha, activeFichasPool, referenceFicha?.userId);
  }, [referenceFicha, activeFichasPool]);

  // Filtrado de sinergias (categoría + filtros ReTribalize + búsqueda multi-término)
  const searchTerms = useMemo(
    () => searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean),
    [searchQuery]
  );

  const matchesTerms = (parts: Array<string | undefined | null>) => {
    if (searchTerms.length === 0) return true;
    const haystack = parts.filter(Boolean).join(' ').toLowerCase();
    return searchTerms.every((term) => haystack.includes(term));
  };

  const filteredMatches = useMemo(() => {
    if (lookingFor !== 'all' && lookingFor !== 'people') return [];
    let base = allMatches;
    switch (activeFilter) {
      case 'sameIsland':
        base = allMatches.filter((m) => m.isSameIsland);
        break;
      case 'energetic':
        base = allMatches.filter((m) => m.kinMayaRelation || m.humanDesignRelation?.highlight);
        break;
      case 'triad':
        base = allMatches.filter(
          (m) =>
            m.triadSynergy &&
            (m.triadSynergy.complementaryOfferings.length > 0 ||
              m.triadSynergy.complementaryNeeds.length > 0)
        );
        break;
      default:
        base = allMatches;
    }

    if (nearOnly) {
      base = base.filter((m) => m.isSameIsland);
    }

    if (memberOf !== 'all') {
      base = base.filter((m) => {
        const comm = m.targetFicha.communityId || m.targetFicha.datosPersona?.communityId || m.targetFicha.datosOnboarding?.communityId;
        return comm === memberOf;
      });
    }

    return base.filter((m) =>
      matchesTerms([
        m.targetName,
        m.targetRole,
        m.targetBio,
        m.targetLocation,
        m.targetIsland,
        ...(m.triadSynergy?.complementaryOfferings || []),
        ...(m.triadSynergy?.complementaryNeeds || []),
        ...(m.triadSynergy?.sharedSaberes || []),
      ])
    );
  }, [allMatches, activeFilter, lookingFor, nearOnly, memberOf, searchTerms]);

  const filteredNodes = useMemo(() => {
    if (lookingFor !== 'all' && lookingFor !== 'nodes') return [];
    return (comunidades || []).filter((c) => {
      if (memberOf !== 'all' && c.slug !== memberOf && c.id !== memberOf) return false;
      if (nearOnly && userIsland) {
        const loc = `${c.ubicacion?.municipio || ''} ${c.ubicacion?.region || ''}`.toLowerCase();
        if (!loc.includes(userIsland.toLowerCase())) return false;
      }
      return matchesTerms([c.nombre, c.descripcion, c.tipo, c.ubicacion?.municipio, c.ubicacion?.region, ...(c.tags || [])]);
    });
  }, [comunidades, lookingFor, memberOf, nearOnly, userIsland, searchTerms]);

  const filteredEvents = useMemo(() => {
    if (lookingFor !== 'all' && lookingFor !== 'events') return [];
    return (eventos || []).filter((ev) => {
      if (memberOf !== 'all' && ev.communityId !== memberOf) return false;
      return matchesTerms([ev.titulo, ev.descripcion, ev.tipo, ev.communityId]);
    });
  }, [eventos, lookingFor, memberOf, searchTerms]);

  const filteredResidencies = useMemo(() => {
    if (lookingFor !== 'all' && lookingFor !== 'residencies') return [];
    return (residencias || []).filter((res) => {
      if (memberOf !== 'all' && res.nodoSlug !== memberOf) return false;
      if (nearOnly && userIsland && res.isla.toLowerCase() !== userIsland.toLowerCase()) return false;
      return matchesTerms([res.titulo, res.descripcion, res.tipo, res.isla, res.municipio, res.nodoNombre, ...(res.ofrece || []), ...(res.busca || [])]);
    });
  }, [residencias, lookingFor, memberOf, nearOnly, userIsland, searchTerms]);

  const totalResultsCount =
    filteredMatches.length + filteredNodes.length + filteredEvents.length + filteredResidencies.length;

  const handleOpenPassport = (userId: string) => {
    if (userId.startsWith('demo-')) {
      // Si es un demo user, podemos abrir el modal con el ID o avisar
      setSelectedUserId(userId);
      setIsPassportOpen(true);
      return;
    }
    setSelectedUserId(userId);
    setIsPassportOpen(true);
  };

  const hasIncompletePassport = useMemo(() => {
    if (!appUser) return false;
    if (!userFicha) return true;
    const hasBirth = !!(
      userFicha.datosPersona?.fechaNacimiento || userFicha.datosOnboarding?.fechaNacimiento
    );
    const hasTriada = !!(
      userFicha.triada &&
      (userFicha.triada.ofrendas?.length || userFicha.triada.necesidades?.length)
    );
    return !hasBirth || !hasTriada;
  }, [appUser, userFicha]);

  const loading = appUser ? userFichaLoading || allFichasLoading : false;

  return (
    <div className="min-h-screen bg-bg-page py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Banner para visitantes no autenticados */}
        {!appUser && (
          <div className="bg-forest-deep text-white rounded-3xl p-6 sm:p-7 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-sand-light/80">
                {t('banner.badge')}
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-serif">
                {t('banner.title')}
              </h2>
              <p className="text-xs text-sand-light/90 max-w-xl">
                {t('banner.subtitle')}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="px-5 py-2.5 bg-sand-light text-forest-deep font-bold rounded-2xl text-xs hover:bg-white transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <LogIn size={14} />
              <span>{t('banner.login')}</span>
            </button>
          </div>
        )}

        {/* Cabecera ligera + Chip compacto del Kin del día */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-text-strong flex items-center gap-2">
              <Sparkles size={18} className="text-forest-deep shrink-0" />
              <span>{t('header.title')}</span>
            </h1>
            {userIsland && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sand-light text-stone-700 border border-border">
                <MapPin size={11} className="text-terracotta-deep" />
                {userIsland}
              </span>
            )}
          </div>

          {/* Chip compacto del Kin del Día */}
          <div
            title={todayKin.rolComunitario}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-surface border border-border text-xs shadow-2xs self-start sm:self-auto"
          >
            <span className="text-base leading-none">{todayKin.emoji}</span>
            <span className="font-semibold text-text-strong">{todayKin.descripcionCorta}</span>
          </div>
        </div>

        {/* Banner discreto si el pasaporte está incompleto */}
        {hasIncompletePassport && (
          <div className="bg-sand-light/60 border border-border rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-stone-700">
              <Compass className="w-4 h-4 text-forest-deep shrink-0" />
              <span>
                <strong className="text-text-strong">{t('empty.incompleteProfileTitle')}.</strong>{' '}
                {t('empty.incompleteProfileDesc')}
              </span>
            </div>

            <button
              type="button"
              onClick={() => navigate('/ficha')}
              className="shrink-0 px-3.5 py-1.5 bg-forest-deep hover:bg-forest-deep/90 text-white font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{t('empty.completePassportBtn')}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        )}

        {/* Buscador Avanzado estilo ReTribalize */}
        <section className="space-y-4">
          {/* Tabs superiores de modo */}
          <div className="flex flex-wrap items-center gap-4 border-b border-border pb-2.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSearchMode('advanced')}
              className={`inline-flex items-center gap-1.5 pb-1.5 -mb-[11px] border-b-2 transition-colors cursor-pointer ${
                searchMode === 'advanced'
                  ? 'border-forest-deep text-forest-deep'
                  : 'border-transparent text-stone-500 hover:text-text-strong'
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>{t('search.tabs.advanced')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchMode('browse');
                setSearchQuery('');
                setLookingFor('all');
                setMemberOf('all');
                setNearOnly(false);
              }}
              className={`inline-flex items-center gap-1.5 pb-1.5 -mb-[11px] border-b-2 transition-colors cursor-pointer ${
                searchMode === 'browse'
                  ? 'border-forest-deep text-forest-deep'
                  : 'border-transparent text-stone-500 hover:text-text-strong'
              }`}
            >
              <LayoutGrid size={14} />
              <span>{t('search.tabs.browseAll')}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/ficha?edit=1')}
              className="inline-flex items-center gap-1.5 pb-1.5 -mb-[11px] border-b-2 border-transparent text-stone-500 hover:text-forest-deep transition-colors cursor-pointer"
            >
              <Sparkles size={14} />
              <span>{t('search.tabs.improveSynergies')}</span>
            </button>
          </div>

          {searchMode === 'advanced' && (
            <div className="bg-bg-surface border border-border rounded-3xl p-4 sm:p-5 shadow-2xs space-y-4">
              <div className="relative">
                <textarea
                  rows={2}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="w-full resize-none rounded-2xl bg-bg-page border border-border px-4 py-3 pr-10 text-sm text-text-strong placeholder:text-stone-400 focus:outline-none focus:border-forest-deep transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                    aria-label={t('search.clear')}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Barra inline de filtros estilo ReTribalize */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-stone-600">
                  <label className="inline-flex items-center gap-1.5">
                    <span className="text-stone-400">{t('search.lookingForLabel')}</span>
                    <select
                      value={lookingFor}
                      onChange={(e) => setLookingFor(e.target.value as LookingForType)}
                      className="font-semibold text-text-strong bg-transparent border-b border-dashed border-stone-400 pb-0.5 focus:outline-none focus:border-forest-deep cursor-pointer"
                    >
                      <option value="all">{t('search.options.all')}</option>
                      <option value="people">{t('search.options.people')}</option>
                      <option value="nodes">{t('search.options.nodes')}</option>
                      <option value="events">{t('search.options.events')}</option>
                      <option value="residencies">{t('search.options.residencies')}</option>
                    </select>
                  </label>

                  <label className="inline-flex items-center gap-1.5">
                    <span className="text-stone-400">{t('search.nodeLabel')}</span>
                    <select
                      value={memberOf}
                      onChange={(e) => setMemberOf(e.target.value)}
                      className="font-semibold text-text-strong bg-transparent border-b border-dashed border-stone-400 pb-0.5 max-w-[160px] focus:outline-none focus:border-forest-deep cursor-pointer"
                    >
                      <option value="all">{t('search.anyNode')}</option>
                      {comunidades.map((c) => (
                        <option key={c.id || c.slug} value={c.slug || c.id}>
                          {c.nombre}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={nearOnly}
                    onClick={() => setNearOnly((prev) => !prev)}
                    className="inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span className="text-stone-400">{t('search.nearLabel')}</span>
                    <span
                      className={`w-8 h-4.5 rounded-full transition-colors p-0.5 flex items-center ${
                        nearOnly ? 'bg-forest-deep justify-end' : 'bg-stone-300 justify-start'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-white shadow-2xs" />
                    </span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => document.getElementById('sinergias-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-deep hover:bg-forest-deep/90 text-white font-semibold transition-all shadow-xs cursor-pointer"
                >
                  <span>{t('search.submitBtn')}</span>
                  <Search size={13} />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Barra de Filtros y Cuadrícula de Sinergias */}
        <div id="sinergias-section" className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs font-semibold transition-all border cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-forest-deep text-white border-forest-deep shadow-xs'
                  : 'bg-bg-surface text-stone-600 border-border hover:bg-sand-light'
              }`}
            >
              {t('filters.all')} ({allMatches.length})
            </button>

            {(userIsland || !appUser) && (
              <button
                type="button"
                onClick={() => setActiveFilter('sameIsland')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs font-semibold transition-all border cursor-pointer ${
                  activeFilter === 'sameIsland'
                    ? 'bg-forest-deep text-white border-forest-deep shadow-xs'
                    : 'bg-bg-surface text-stone-600 border-border hover:bg-sand-light'
                }`}
              >
                🌴 {t('filters.sameIsland')} ({allMatches.filter((m) => m.isSameIsland || m.targetIsland === 'Gran Canaria').length})
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveFilter('energetic')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs font-semibold transition-all border cursor-pointer ${
                activeFilter === 'energetic'
                  ? 'bg-forest-deep text-white border-forest-deep shadow-xs'
                  : 'bg-bg-surface text-stone-600 border-border hover:bg-sand-light'
              }`}
            >
              ⚡ {t('filters.energetic')} (
              {allMatches.filter((m) => m.kinMayaRelation || m.humanDesignRelation?.highlight).length}
              )
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('triad')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs font-semibold transition-all border cursor-pointer ${
                activeFilter === 'triad'
                  ? 'bg-forest-deep text-white border-forest-deep shadow-xs'
                  : 'bg-bg-surface text-stone-600 border-border hover:bg-sand-light'
              }`}
            >
              🤝 {t('filters.triad')} (
              {
                allMatches.filter(
                  (m) =>
                    m.triadSynergy &&
                    (m.triadSynergy.complementaryOfferings.length > 0 ||
                      m.triadSynergy.complementaryNeeds.length > 0)
                ).length
              }
              )
            </button>
          </div>

          <div className="text-xs text-stone-500 font-medium shrink-0">
            {t('search.resultsCount', { count: totalResultsCount })}
          </div>
        </div>

        {/* Feed Unificado (Personas + Nodos + Eventos + Estancias) */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-stone-400">
            <Loader2 className="w-8 h-8 animate-spin text-forest-deep" />
            <p className="text-sm font-medium">{t('search.calculating')}</p>
          </div>
        ) : totalResultsCount === 0 ? (
          <div className="bg-bg-surface border border-border rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-sand-light border border-border flex items-center justify-center mx-auto text-stone-500">
              <Users size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-text-strong">
                {t('empty.noMatchesTitle')}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t('empty.noMatchesDesc')}
              </p>
            </div>
            {(activeFilter !== 'all' || lookingFor !== 'all' || memberOf !== 'all' || nearOnly || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('all');
                  setLookingFor('all');
                  setMemberOf('all');
                  setNearOnly(false);
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-sand-dark text-stone-800 hover:bg-sand-dark/80 transition-colors cursor-pointer"
              >
                {t('empty.resetFilter')}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match, idx) => (
              <SynergyCard
                key={match.targetUserId || `match-${idx}`}
                match={match}
                onOpenPassport={handleOpenPassport}
              />
            ))}

            {filteredNodes.map((nodo) => (
              <ExploreEntityCard
                key={`node-${nodo.id || nodo.slug}`}
                kind="node"
                id={nodo.id || nodo.slug}
                title={nodo.nombre}
                subtitle={nodo.tipo ? `Espacio ${nodo.tipo}` : 'Comunidad Kanarii'}
                description={nodo.descripcion}
                location={[nodo.ubicacion?.municipio, nodo.ubicacion?.region].filter(Boolean).join(', ')}
                imageUrl={nodo.bannerUrl || nodo.logoUrl}
                metaPrimary={nodo.ubicacion?.region || undefined}
                metaSecondary={nodo.capacidad ? `Cap. ${nodo.capacidad}` : undefined}
                tags={nodo.tags || []}
                href={`/c/${nodo.slug || nodo.id}`}
              />
            ))}

            {filteredEvents.map((ev) => (
              <ExploreEntityCard
                key={`event-${ev.id}`}
                kind="event"
                id={ev.id || ev.titulo}
                title={ev.titulo}
                subtitle={ev.communityId ? `Nodo ${ev.communityId}` : 'Evento comunitario'}
                description={ev.descripcion}
                imageUrl={ev.imageUrl}
                metaPrimary={ev.inicio instanceof Date ? ev.inicio.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) : undefined}
                metaSecondary={ev.tipo}
                href="/eventos"
              />
            ))}

            {filteredResidencies.map((res) => (
              <ExploreEntityCard
                key={`res-${res.id}`}
                kind="residency"
                id={res.id || res.titulo}
                title={res.titulo}
                subtitle={res.nodoNombre}
                description={res.descripcion}
                location={[res.municipio, res.isla].filter(Boolean).join(', ')}
                imageUrl={res.imageUrl}
                metaPrimary={res.duracion}
                metaSecondary={`${res.plazas} plazas`}
                tags={res.ofrece || []}
                href="/residencias"
              />
            ))}
          </div>
        )}
        </div>
      </div>

      {/* Modal in situ del Pasaporte Comunitario */}
      <PasaporteModal
        userId={selectedUserId}
        isOpen={isPassportOpen}
        onClose={() => {
          setIsPassportOpen(false);
          setSelectedUserId(null);
        }}
      />

      {/* Modal de Autenticación para Visitantes */}
      <AuthGateModal
        isOpen={isAuthModalOpen}
        mode="login"
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default DashboardView;
