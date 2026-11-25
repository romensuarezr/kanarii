import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Home, MapPin, Users, Sparkles, Clock, ArrowRight, CheckCircle2, BedDouble, Gift, HeartHandshake } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';
import { AuthGateModal } from '../components/AuthGateModal';

interface ResidencyProgram {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'volunteer' | 'coliving' | 'stewardship';
  duracion: string;
  nodoSlug: string;
  nodoNombre: string;
  isla: string;
  municipio: string;
  plazas: number;
  ofrece: string[];
  busca: string[];
}

const DEMO_RESIDENCIES: ResidencyProgram[] = [
  {
    id: 'res-1',
    titulo: 'Inmersión en Permacultura & Riego Tradicional',
    descripcion: 'Estancia práctica para aprender bio-construcción, regeneración de suelos volcánicos y mantenimiento de huertos en bancales.',
    tipo: 'volunteer',
    duracion: '1 a 3 meses (Flexible)',
    nodoSlug: 'arteara',
    nodoNombre: 'Finca Ecológica Arteara',
    isla: 'Gran Canaria',
    municipio: 'San Bartolomé de Tirajana',
    plazas: 3,
    ofrece: ['Alojamiento en cabaña bio-climática', 'Cosecha fresca diaria de la huerta', 'Mentoría en permacultura'],
    busca: ['20h semanales de apoyo en campo', 'Entusiasmo por la vida rural comunitaria'],
  },
  {
    id: 'res-2',
    titulo: 'Coliving Rural para Creadores & Nómadas Regenerativos',
    descripcion: 'Espacio de trabajo remoto rodeado de naturaleza con alta conectividad fibra óptica, círculos semanales de sincronización y cocina comunitaria.',
    tipo: 'coliving',
    duracion: 'Estancias mensuales',
    nodoSlug: 'ecoaldea-valle',
    nodoNombre: 'Ecoaldea Valle Verde',
    isla: 'Tenerife',
    municipio: 'La Orotava',
    plazas: 4,
    ofrece: ['Habitación privada + coworking con fibra', 'Acceso a zonas comunes y cocina', 'Integración en asambleas S3'],
    busca: ['Aporte cooperativo de gastos de casa', 'Compartir saberes en talleres internos'],
  },
  {
    id: 'res-3',
    titulo: 'Custodia del Territorio & Conservación de Flora Macaronésica',
    descripcion: 'Programa enfocado en biólogos, naturalistas o personas interesadas en restauración paisajística y recuperación de la laurisilva.',
    tipo: 'stewardship',
    duracion: '2 meses (Primavera / Verano)',
    nodoSlug: 'refugio-cumbre',
    nodoNombre: 'Refugio de la Cumbre',
    isla: 'La Palma',
    municipio: 'El Paso',
    plazas: 2,
    ofrece: ['Alojamiento en refugio de montaña', 'Alimentación orgánica completa', 'Acceso a banco de semillas locales'],
    busca: ['Monitoreo botánico y apoyo en vivero', 'Mantenimiento de senderos y agua'],
  },
];

export function ResidenciasView() {
  const { t } = useTranslation(['events', 'common']);
  const navigate = useNavigate();
  const { appUser } = useAuth();
  const { success } = useToast();

  const [activeFilter, setActiveFilter] = useState<'all' | 'volunteer' | 'coliving' | 'stewardship'>('all');
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [appliedIds, setAppliedIds] = useState<Record<string, boolean>>({});

  const filteredResidencies = useMemo(() => {
    if (activeFilter === 'all') return DEMO_RESIDENCIES;
    return DEMO_RESIDENCIES.filter(res => res.tipo === activeFilter);
  }, [activeFilter]);

  const handleApply = (res: ResidencyProgram) => {
    if (!appUser) {
      setShowAuthGate(true);
      return;
    }
    setAppliedIds(prev => ({ ...prev, [res.id]: true }));
    success(t('residencies.applySuccess', { defaultValue: '¡Solicitud de estancia enviada con éxito!' }));
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-forest-deep/10 text-forest-deep border border-forest-deep/20 mb-3">
              <BedDouble className="w-3.5 h-3.5" />
              {t('residencies.exchange', { defaultValue: 'Intercambio de Dones & Reciprocidad' })}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-forest-deep mb-3 tracking-tight">
              {t('residencies.headerTitle', { defaultValue: 'Residencias & Estancias en Nodos' })}
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {t('residencies.headerSubtitle', { defaultValue: 'Inmersiones comunitarias, coliving rural, voluntariado agrícola e intercambio de dones en la red viva de Canarias.' })}
            </p>
          </div>
        </div>

        {/* Barra de Filtros */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {[
            { id: 'all', label: t('residencies.filterAll', { defaultValue: 'Todas las estancias' }) },
            { id: 'volunteer', label: t('residencies.filterVolunteer', { defaultValue: 'Voluntariado & Permacultura' }) },
            { id: 'coliving', label: t('residencies.filterColiving', { defaultValue: 'Coliving & Trabajo Remoto' }) },
            { id: 'stewardship', label: t('residencies.filterStewardship', { defaultValue: 'Custodia & Bio-construcción' }) },
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

        {/* Grid de Residencias */}
        {filteredResidencies.length === 0 ? (
          <div className="bg-bg-surface border border-border rounded-3xl p-12 text-center text-stone-500">
            <Home className="w-10 h-10 mx-auto text-stone-400 mb-3" />
            <p className="text-sm font-medium">{t('residencies.noResidencies', { defaultValue: 'No hay convocatorias abiertas en esta categoría' })}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResidencies.map(res => {
              const hasApplied = appliedIds[res.id];
              return (
                <div
                  key={res.id}
                  className="bg-bg-surface border border-border rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Header Card */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sand-light text-stone-700 border border-border">
                        {res.duracion}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-terracotta/10 text-terracotta border border-terracotta/20">
                        {res.plazas} {t('residencies.spotsAvailable', { defaultValue: 'plazas disponibles' })}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl text-forest-deep font-bold mb-2">
                      {res.titulo}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {res.descripcion}
                    </p>

                    {/* Nodo Anfitrión & Ubicación */}
                    <div className="bg-sand-light/40 border border-border rounded-2xl p-3 mb-4 space-y-1">
                      <button
                        onClick={() => handleVisitNode(res.nodoSlug)}
                        className="text-xs font-bold text-forest-deep hover:text-terracotta transition-colors flex items-center gap-1.5 text-left"
                      >
                        <span className="text-stone-400 font-normal">{t('events.hostedBy', { defaultValue: 'Nodo' })}:</span>
                        <span>{res.nodoNombre}</span>
                        <ArrowRight className="w-3 h-3 opacity-60" />
                      </button>
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                        <MapPin className="w-3.5 h-3.5 text-terracotta" />
                        <span>{res.municipio}, {res.isla}</span>
                      </div>
                    </div>

                    {/* Bloque Reciprocidad: Ofrece y Busca */}
                    <div className="space-y-3 mb-5 text-xs">
                      <div className="bg-bg-page/60 border border-border rounded-xl p-3">
                        <p className="font-bold text-forest-deep mb-1.5 flex items-center gap-1.5">
                          <Gift className="w-3.5 h-3.5 text-forest-moss" />
                          <span>{t('residencies.weOffer', { defaultValue: 'El nodo ofrece' })}:</span>
                        </p>
                        <ul className="space-y-1 text-stone-600 text-[11px] pl-5 list-disc">
                          {res.ofrece.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-bg-page/60 border border-border rounded-xl p-3">
                        <p className="font-bold text-forest-deep mb-1.5 flex items-center gap-1.5">
                          <HeartHandshake className="w-3.5 h-3.5 text-terracotta" />
                          <span>{t('residencies.weSeek', { defaultValue: 'Aporte esperado' })}:</span>
                        </p>
                        <ul className="space-y-1 text-stone-600 text-[11px] pl-5 list-disc">
                          {res.busca.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Botón de Acción */}
                  <div className="pt-3 border-t border-border">
                    <button
                      onClick={() => handleApply(res)}
                      disabled={hasApplied}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                        hasApplied
                          ? 'bg-status-success-bg text-status-success-text border border-status-success-text/20 cursor-default'
                          : 'bg-forest-deep text-white hover:bg-forest-deep/90 shadow-xs'
                      }`}
                    >
                      {hasApplied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-status-success-text" />
                          <span>Solicitud Enviada</span>
                        </>
                      ) : (
                        <span>{t('residencies.applyResidency', { defaultValue: 'Solicitar Estancia' })}</span>
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
        title="Inicia Sesión para Solicitar Estancia"
        subtitle="Para conectar con las residencias y estancias de los nodos, tu pasaporte universal y datos de reciprocidad serán compartidos con los guardianes."
      />
    </div>
  );
}

export default ResidenciasView;
