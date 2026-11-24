import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFicha } from '../hooks/useFicha';
import { useFichas } from '../hooks/useFichas';
import { kinDeHoy } from '../lib/kinMaya';
import { calcularSinergiasMultiples, detectIsland, SynergyMatch } from '../lib/sinergias';
import { SynergyCard } from '../components/sinergias/SynergyCard';
import { PasaporteModal } from '../components/perfil/PasaporteModal';
import { AuthGateModal } from '../components/AuthGateModal';
import { Sparkles, MapPin, Compass, ArrowRight, Users, Loader2, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Ficha } from '../lib/services/_types';

type FilterType = 'all' | 'sameIsland' | 'energetic' | 'triad';

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

  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
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

  // Filtrado de sinergias
  const filteredMatches = useMemo(() => {
    switch (activeFilter) {
      case 'sameIsland':
        return allMatches.filter((m) => m.isSameIsland);
      case 'energetic':
        return allMatches.filter((m) => m.kinMayaRelation || m.humanDesignRelation?.highlight);
      case 'triad':
        return allMatches.filter(
          (m) =>
            m.triadSynergy &&
            (m.triadSynergy.complementaryOfferings.length > 0 ||
              m.triadSynergy.complementaryNeeds.length > 0)
        );
      default:
        return allMatches;
    }
  }, [allMatches, activeFilter]);

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
                Red de Sinergias Abierta
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-serif">
                Descubre conexiones y afinidades deterministas en Canarias
              </h2>
              <p className="text-xs text-sand-light/90 max-w-xl">
                Mostrando perfiles de ejemplo. Inicia sesión para cruzar tu fecha natal, isla y dones con la comunidad real.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="px-5 py-2.5 bg-sand-light text-forest-deep font-bold rounded-2xl text-xs hover:bg-white transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <LogIn size={14} />
              <span>Iniciar sesión</span>
            </button>
          </div>
        )}

        {/* Cabecera Principal */}
        <div className="bg-bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-forest-light text-forest-deep border border-forest-deep/20">
                <Sparkles size={13} className="text-forest-deep" />
                <span>{t('header.title')}</span>
                {userIsland && (
                  <>
                    <span className="text-border">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {userIsland}
                    </span>
                  </>
                )}
              </div>

              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-text-strong">
                {t('header.greeting', {
                  name: appUser?.displayName || userFicha?.datosPersona?.nombre || 'Tribu',
                })}
              </h1>

              <p className="text-sm text-stone-600 leading-relaxed">
                {t('header.subtitle')}
              </p>
            </div>

            {/* Widget del Kin del Día */}
            <div className="bg-sand-light/60 border border-border/80 rounded-2xl p-4 sm:p-5 shrink-0 flex items-center gap-4 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-forest-deep/10 text-forest-deep flex items-center justify-center text-2xl shrink-0">
                {todayKin.emoji}
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  {t('header.todayKin')}
                </span>
                <p className="text-xs font-bold text-text-strong font-serif">
                  {todayKin.descripcionCorta}
                </p>
                <p className="text-[11px] text-stone-500 line-clamp-1 max-w-[220px]">
                  {todayKin.rolComunitario}
                </p>
              </div>
            </div>
          </div>

          {/* Banner de perfil incompleto (si falta fecha o tríada) */}
          {hasIncompletePassport && (
            <div className="bg-sand-light/50 border border-border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-stone-700">
                <Compass className="w-5 h-5 text-forest-deep shrink-0" />
                <div>
                  <span className="font-bold text-text-strong">
                    {t('empty.incompleteProfileTitle')}.
                  </span>{' '}
                  <span className="text-stone-600">
                    {t('empty.incompleteProfileDesc')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/ficha')}
                className="shrink-0 px-4 py-2 bg-forest-deep hover:bg-forest-deep/90 text-white font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{t('empty.completePassportBtn')}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}
        </div>

        {/* Barra de Filtros */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
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
                className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
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
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
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
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
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
            {t('filters.count', { count: filteredMatches.length })}
          </div>
        </div>

        {/* Feed de Sinergias */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-stone-400">
            <Loader2 className="w-8 h-8 animate-spin text-forest-deep" />
            <p className="text-sm font-medium">Calculando sinergias de la red...</p>
          </div>
        ) : filteredMatches.length === 0 ? (
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
            {activeFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-sand-dark text-stone-800 hover:bg-sand-dark/80 transition-colors cursor-pointer"
              >
                {t('empty.resetFilter')}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <SynergyCard
                key={match.targetUserId}
                match={match}
                onOpenPassport={handleOpenPassport}
              />
            ))}
          </div>
        )}
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
