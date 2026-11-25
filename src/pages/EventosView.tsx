import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Sparkles, Clock, ArrowRight, CheckCircle2, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useComunidad } from '../contexts/ComunidadContext';
import { useToast } from '../hooks/useToast';
import { AuthGateModal } from '../components/AuthGateModal';

interface NetworkEvent {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'workshop' | 'minga' | 'gathering' | 'online';
  fechaTexto: string;
  hora: string;
  nodoSlug: string;
  nodoNombre: string;
  isla: string;
  municipio: string;
  plazas: number;
  inscritos: number;
  esGratuito: boolean;
}

const DEMO_NETWORK_EVENTS: NetworkEvent[] = [
  {
    id: 'evt-1',
    titulo: 'Minga de Cosecha & Riego Ancestral',
    descripcion: 'Jornada comunitaria de siembra de millo, limpieza de acequias y almuerzo compartido al atardecer en el barranco.',
    tipo: 'minga',
    fechaTexto: '28 Nov 2026',
    hora: '09:00 - 15:00',
    nodoSlug: 'arteara',
    nodoNombre: 'Finca Ecológica Arteara',
    isla: 'Gran Canaria',
    municipio: 'San Bartolomé de Tirajana',
    plazas: 20,
    inscritos: 14,
    esGratuito: true,
  },
  {
    id: 'evt-2',
    titulo: 'Taller de Gobernanza Sociocrática S3',
    descripcion: 'Aprende los patrones fundamentales de toma de decisiones por consentimiento, rondas de objeciones y roles sociocráticos.',
    tipo: 'workshop',
    fechaTexto: '05 Dic 2026',
    hora: '17:00 - 20:00',
    nodoSlug: 'arteara',
    nodoNombre: 'Finca Ecológica Arteara',
    isla: 'Gran Canaria',
    municipio: 'Fataga',
    plazas: 15,
    inscritos: 9,
    esGratuito: true,
  },
  {
    id: 'evt-3',
    titulo: 'Encuentro Insular de Custodia del Territorio',
    descripcion: 'Reunión abierta de proyectos agroecológicos, colivings y colectivos rurales para tejer acuerdos de soberanía alimentaria.',
    tipo: 'gathering',
    fechaTexto: '12 Dic 2026',
    hora: '11:00 - 18:00',
    nodoSlug: 'ecoaldea-valle',
    nodoNombre: 'Ecoaldea Valle Verde',
    isla: 'Tenerife',
    municipio: 'La Orotava',
    plazas: 35,
    inscritos: 22,
    esGratuito: true,
  },
  {
    id: 'evt-4',
    titulo: 'Círculo Online: Cruce de Dones & Necesidades',
    descripcion: 'Sesión virtual de sincronización entre nodos y personas de la red Kanarii para intercambiar saberes y recursos.',
    tipo: 'online',
    fechaTexto: '17 Dic 2026',
    hora: '19:00 - 20:30',
    nodoSlug: 'nodo-red-canarias',
    nodoNombre: 'Nodo Red Viva Canarias',
    isla: 'Red Online',
    municipio: 'Virtual',
    plazas: 50,
    inscritos: 31,
    esGratuito: true,
  },
];

export function EventosView() {
  const { t } = useTranslation(['events', 'common']);
  const navigate = useNavigate();
  const { appUser } = useAuth();
  const { setCommunityId } = useComunidad();
  const { success } = useToast();

  const [activeFilter, setActiveFilter] = useState<'all' | 'workshop' | 'minga' | 'gathering' | 'online'>('all');
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [inscribedIds, setInscribedIds] = useState<Record<string, boolean>>({});

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return DEMO_NETWORK_EVENTS;
    return DEMO_NETWORK_EVENTS.filter(evt => evt.tipo === activeFilter);
  }, [activeFilter]);

  const handleJoin = (evt: NetworkEvent) => {
    if (!appUser) {
      setShowAuthGate(true);
      return;
    }
    setInscribedIds(prev => ({ ...prev, [evt.id]: true }));
    success(`¡Inscripción confirmada para "${evt.titulo}"! 🌿`);
  };

  const handleVisitNode = (slug: string) => {
    navigate(`/c/${slug}`);
  };

  return (
    <div className="min-h-screen bg-bg-page pb-24 text-text-strong font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* Cabecera Hero */}
        <div className="bg-bg-surface border border-border rounded-3xl p-6 sm:p-10 shadow-sm mb-8 relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-terracotta/10 text-terracotta border border-terracotta/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {t('events.networkEvent', { defaultValue: 'Encuentros de la Red' })}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-forest-deep mb-3 tracking-tight">
              {t('events.headerTitle', { defaultValue: 'Eventos & Encuentros de la Red' })}
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {t('events.headerSubtitle', { defaultValue: 'Talleres, mingas, celebraciones y asambleas abiertas para tejer comunidad entre los nodos de las Islas Canarias.' })}
            </p>
          </div>
        </div>

        {/* Barra de Filtros */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {[
            { id: 'all', label: t('events.filterAll', { defaultValue: 'Todos los eventos' }) },
            { id: 'workshop', label: t('events.filterWorkshop', { defaultValue: 'Talleres & Aprendizaje' }) },
            { id: 'minga', label: t('events.filterMinga', { defaultValue: 'Mingas & Siembra' }) },
            { id: 'gathering', label: t('events.filterGathering', { defaultValue: 'Celebraciones & Festivales' }) },
            { id: 'online', label: t('events.filterOnline', { defaultValue: 'Círculos Online' }) },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
                activeFilter === f.id
                  ? 'bg-forest-deep text-white border-forest-deep shadow-xs'
                  : 'bg-bg-surface text-stone-600 border-border hover:bg-sand-light hover:text-stone-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid de Eventos */}
        {filteredEvents.length === 0 ? (
          <div className="bg-bg-surface border border-border rounded-3xl p-12 text-center text-stone-500">
            <Calendar className="w-10 h-10 mx-auto text-stone-400 mb-3" />
            <p className="text-sm font-medium">{t('events.noEvents', { defaultValue: 'No hay eventos próximos en esta categoría' })}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map(evt => {
              const isInscribed = inscribedIds[evt.id];
              return (
                <div
                  key={evt.id}
                  className="bg-bg-surface border border-border rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Top metadata */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-sand-light text-stone-700 border border-border">
                        <Clock className="w-3 h-3 text-terracotta" />
                        {evt.fechaTexto} • {evt.hora}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-status-success-bg text-status-success-text border border-status-success-text/20">
                        {t('events.freeAccess', { defaultValue: 'Acceso Libre' })}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-forest-deep font-bold mb-2.5">
                      {evt.titulo}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-5">
                      {evt.descripcion}
                    </p>

                    {/* Nodo Anfitrión & Ubicación */}
                    <div className="bg-sand-light/40 border border-border rounded-2xl p-3.5 mb-5 space-y-1.5">
                      <button
                        onClick={() => handleVisitNode(evt.nodoSlug)}
                        className="text-xs font-bold text-forest-deep hover:text-terracotta transition-colors flex items-center gap-1.5 text-left"
                      >
                        <span className="text-stone-400 font-normal">{t('events.hostedBy', { defaultValue: 'Convocado por' })}:</span>
                        <span>{evt.nodoNombre}</span>
                        <ArrowRight className="w-3 h-3 opacity-60" />
                      </button>
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                        <MapPin className="w-3.5 h-3.5 text-terracotta" />
                        <span>{evt.municipio}, {evt.isla}</span>
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                      <Users className="w-4 h-4 text-stone-400" />
                      <span>{evt.inscritos}/{evt.plazas} {t('events.spots', { defaultValue: 'plazas' })}</span>
                    </div>

                    <button
                      onClick={() => handleJoin(evt)}
                      disabled={isInscribed}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                        isInscribed
                          ? 'bg-status-success-bg text-status-success-text border border-status-success-text/20 cursor-default'
                          : 'bg-forest-deep text-white hover:bg-forest-deep/90 shadow-xs'
                      }`}
                    >
                      {isInscribed ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-status-success-text" />
                          <span>Inscrito</span>
                        </>
                      ) : (
                        <span>{t('events.joinEvent', { defaultValue: 'Inscribirme / Asistir' })}</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Modal de Acceso para usuarios no logueados */}
      <AuthGateModal
        isOpen={showAuthGate}
        onClose={() => setShowAuthGate(false)}
        title="Únete a la Red para Participar"
        subtitle="Para inscribirte en eventos comunitarios y conectar con los guardianes del nodo, crea tu pasaporte o inicia sesión."
      />
    </div>
  );
}

export default EventosView;
