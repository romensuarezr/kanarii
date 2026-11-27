import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Key, Info, MessageSquare, ArrowRight, Loader2, X, CheckCircle2, Plus, Users, Target, Sparkles, LogIn, ArrowLeft, MapPin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../contexts/AuthContext';
import { useComunidad } from '../contexts/ComunidadContext';
import { AuthGateModal } from '../components/AuthGateModal';
import { LanguageSelector } from '../components/language/LanguageSelector';
import { 
  Comunidad, 
  getComunidadesPublicas, 
  getSolicitudPendiente,
  getUltimaSolicitud,
  SolicitudAcceso,
  InvitacionError
} from '../lib/appService';
import { useComunidadActions } from '../hooks/useComunidadActions';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useToast } from '../components/Toaster';
import { PageHeader } from '../components/ui/PageHeader';
import { PageContainer } from '../components/ui/PageContainer';
import { useTopBarActions } from '../hooks/useTopBarActions';
import { useCommunityMembers } from '../hooks/useCommunityMembers';
import { useTranslation } from 'react-i18next';

type NodeFilterType = 'all' | 'finca' | 'residencia' | 'online';

// --- COMPONENTES AUXILIARES ---

interface CommunityCaretakersProps {
  communityId: string;
  adminUids?: string[];
}

const CommunityCaretakers: React.FC<CommunityCaretakersProps> = ({ communityId, adminUids }) => {
  const { t } = useTranslation('communities');
  const { appUser } = useAuth();
  const { getMemberName } = useCommunityMembers(communityId);

  if (!adminUids || adminUids.length === 0) return null;

  // Visitantes anónimos ven el conteo de cuidadores sin intentar resolver UIDs privados
  if (!appUser) {
    const count = adminUids.length;
    return (
      <div className="flex items-start gap-1.5 text-xs text-stone-500">
        <Users size={12} className="mt-0.5 shrink-0 text-forest-deep" />
        <span>{count === 1 ? t('facilitators_one', { count }) : t('facilitators_other', { count })}</span>
      </div>
    );
  }

  const names = adminUids.map(uid => getMemberName(uid)).filter(name => name && name !== 'Cargando...');
  if (names.length === 0) return null;

  return (
    <div className="flex items-start gap-1.5 text-xs text-stone-500">
      <Users size={12} className="mt-0.5 shrink-0 text-forest-deep" />
      <span className="line-clamp-1">{names.join(' · ')}</span>
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs"
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="relative bg-bg-surface border border-border rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-border flex justify-between items-center bg-sand-light/50">
              <h2 className="text-xl font-serif text-text-strong font-bold">{title}</h2>
              <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- COMPONENTE PRINCIPAL ---

export function ComunidadesView() {
  const { t } = useTranslation(['communities', 'common']);
  const navigate = useNavigate();
  const location = useLocation();
  const { appUser } = useAuth();
  const { setCommunityId } = useComunidad();
  const { redeemInvitacion, solicitarAcceso, isExecuting } = useComunidadActions();
  const { success: toastSuccess, error: toastError } = useToast();

  const [comunidades, setComunidades] = useState<Comunidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteCode, setInviteCode] = useState('');
  const [selectedComunidad, setSelectedComunidad] = useState<Comunidad | null>(null);
  const [showSolicitud, setShowSolicitud] = useState(false);
  const [solicitudMsg, setSolicitudMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userRequests, setUserRequests] = useState<Record<string, SolicitudAcceso>>({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<NodeFilterType>('all');

  // Carga de comunidades y solicitudes del usuario
  useEffect(() => {
    loadData();
  }, [appUser]);

  // Si viene con un código en la URL (?codigo=xxx), rellenarlo o intentar canje
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('codigo');
    if (code) {
      setInviteCode(code);
      if (appUser) {
        handleJoinByCode(code);
      }
    }
  }, [location.search, appUser]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getComunidadesPublicas();
      setComunidades(data);

      if (appUser) {
        const requests: Record<string, SolicitudAcceso> = {};
        await Promise.all(
          data.map(async (c) => {
            const req = await getUltimaSolicitud(c.slug, appUser.uid);
            if (req) requests[c.slug] = req;
          })
        );
        setUserRequests(requests);
      }
    } catch (error) {
      console.warn('No se pudieron cargar comunidades públicas (posible falta de sesión o reglas de seguridad):', error);
      setComunidades([]);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinByCode = async (codeOverride?: string) => {
    if (!appUser) {
      setIsLoginModalOpen(true);
      return;
    }
    const rawCode = codeOverride || inviteCode;
    const code = rawCode.replace(/\s+/g, '').toLowerCase();
    if (!code) return;

    await redeemInvitacion(code, appUser.uid, {
      successMessage: '¡Bienvenido al nodo! ✨',
      errorMessage: null,
      onSuccess: (communityId: string) => {
        if (communityId) {
          setCommunityId(communityId);
          navigate(`/c/${communityId}`);
        } else {
          navigate('/dashboard');
        }
      },
      onError: (err: any) => {
        if (err?.message === 'YA_ES_MIEMBRO') {
          toastSuccess('Ya eres miembro de este nodo. ¡Te redirigimos! 🚀');
          const communityId = err.communityId;
          if (communityId) {
            setCommunityId(communityId);
            navigate(`/c/${communityId}`);
          } else {
            navigate('/dashboard');
          }
        } else if (err?.message === InvitacionError.INEXISTENTE) {
          toastError('El código de invitación no existe.');
        } else if (err?.message === InvitacionError.INACTIVA) {
          toastError('Esta invitación ya no está activa.');
        } else if (err?.message === InvitacionError.CADUCADA) {
          toastError('El código de invitación ha caducado.');
        } else if (err?.message === InvitacionError.AGOTADA) {
          toastError('La invitación ha agotado su número máximo de usos.');
        } else {
          toastError('Código inválido o error al canjear la invitación.');
        }
      }
    });
  };

  const handleSendSolicitud = async () => {
    if (!selectedComunidad || solicitudMsg.trim().length < 20 || !appUser) return;

    setIsSubmitting(true);
    try {
      await solicitarAcceso(selectedComunidad.slug, appUser.uid, solicitudMsg, {
        successMessage: 'Tu solicitud ha sido enviada. Los facilitadores la revisarán pronto.',
        onSuccess: () => {
          setUserRequests(prev => ({
            ...prev,
            [selectedComunidad.slug]: {
              estado: 'pendiente',
              mensaje: solicitudMsg,
              creadoEn: { toDate: () => new Date() }
            } as any
          }));
          setShowSolicitud(false);
          setSolicitudMsg('');
        }
      });
    } catch (error) {
      // Error manejado en perform
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnterNodeSpace = (comunidad: Comunidad) => {
    setCommunityId(comunidad.slug);
    toastSuccess(t('card.enterSpace') + ` · ${comunidad.nombre}`);
    navigate('/tablon');
  };

  // --- Botón de TopBar ---
  const goToNuevaComunidad = useCallback(() => navigate('/nueva-comunidad'), [navigate]);

  const topBarActionBtn = useMemo(() => (
    appUser ? (
      <button
        onClick={goToNuevaComunidad}
        className="bg-forest-deep hover:bg-forest-deep/90 text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
        title={t('communities:createNodeAria', { defaultValue: 'Crear nodo o comunidad' })}
      >
        <Plus className="w-4 h-4 text-emerald-300" />
        <span className="hidden sm:inline">{t('communities:newNode', { defaultValue: 'Nuevo Nodo' })}</span>
        <span className="sm:hidden">{t('communities:newShort', { defaultValue: 'Nuevo' })}</span>
      </button>
    ) : null
  ), [appUser, goToNuevaComunidad, t]);

  useTopBarActions(topBarActionBtn, [topBarActionBtn]);

  // Filtrado de nodos por tipología
  const filteredComunidades = useMemo(() => {
    if (activeFilter === 'all') return comunidades;
    if (activeFilter === 'finca') {
      return comunidades.filter(c => c.tipo === 'finca' || c.tipo === 'ecoaldea');
    }
    if (activeFilter === 'residencia') {
      return comunidades.filter(c => c.tipo === 'cohousing');
    }
    if (activeFilter === 'online') {
      return comunidades.filter(c => c.tipo === 'nomada' || c.tipo === 'urbano' || c.tipo === 'otro' || !c.tipo);
    }
    return comunidades;
  }, [comunidades, activeFilter]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-page text-stone-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-forest-deep" />
        <p className="font-medium">{t('loadingDetails')}</p>
      </div>
    );
  }

  return (
    <PageContainer>
      {!appUser && (
        <div className="bg-sand-light/60 border-b border-border px-6 py-3 flex items-center justify-between text-xs sm:text-sm">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-forest-deep hover:text-text-strong font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('backToHome')}</span>
          </button>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-1.5 bg-forest-deep hover:bg-forest-deep/90 text-white px-3 py-1.5 rounded-xl font-medium transition-colors shadow-2xs cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t('common:actions.login', { defaultValue: 'Iniciar sesión' })}</span>
            </button>
          </div>
        </div>
      )}

      <PageHeader
        title={t('title')}
        subtitle={t('subtitle')}
        icon={Compass}
        hideRightActions={true}
      />

      <div className="p-6 space-y-10">

        {/* Sección 1: Código de Invitación */}
        <section className="bg-bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-sand-light rounded-2xl text-terracotta-deep">
              <Key className="w-8 h-8" />
            </div>
            <div className="flex-1 space-y-1 text-center md:text-left">
              <h3 className="text-xl font-bold font-serif text-text-strong">{t('codeSection.title')}</h3>
              <p className="text-stone-500 text-sm">{t('codeSection.subtitle')}</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <input 
                type="text" 
                value={inviteCode}
                onChange={e => setInviteCode(e.target.value)}
                placeholder={t('codeSection.placeholder')}
                className="w-full sm:w-48 rounded-xl border border-border bg-bg-page focus:border-forest-deep focus:ring-forest-deep transition-all px-3 py-2 text-sm text-text-strong placeholder:text-stone-400"
              />
              <button 
                onClick={() => handleJoinByCode()}
                disabled={isExecuting || !inviteCode.trim()}
                className="w-full sm:w-auto bg-forest-deep hover:bg-forest-deep/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 shadow-xs shrink-0 flex items-center justify-center text-sm cursor-pointer"
              >
                {isExecuting ? <Loader2 className="w-4 h-4 animate-spin" /> : t('codeSection.joinBtn')}
              </button>
            </div>
          </div>
        </section>

        {/* Sección 2: Filtros por tipología de nodo */}
        <section className="space-y-6">
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
                {t('filters.all')} ({comunidades.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('finca')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs font-semibold transition-all border cursor-pointer ${
                  activeFilter === 'finca'
                    ? 'bg-forest-deep text-white border-forest-deep shadow-xs'
                    : 'bg-bg-surface text-stone-600 border-border hover:bg-sand-light'
                }`}
              >
                {t('filters.finca')}
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('residencia')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs font-semibold transition-all border cursor-pointer ${
                  activeFilter === 'residencia'
                    ? 'bg-forest-deep text-white border-forest-deep shadow-xs'
                    : 'bg-bg-surface text-stone-600 border-border hover:bg-sand-light'
                }`}
              >
                {t('filters.residencia')}
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('online')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs font-semibold transition-all border cursor-pointer ${
                  activeFilter === 'online'
                    ? 'bg-forest-deep text-white border-forest-deep shadow-xs'
                    : 'bg-bg-surface text-stone-600 border-border hover:bg-sand-light'
                }`}
              >
                {t('filters.online')}
              </button>
            </div>

            <span className="text-xs font-medium text-stone-500 bg-sand-light border border-border px-3 py-1 rounded-full shrink-0">
              {t('filters.spacesCount', { count: filteredComunidades.length })}
            </span>
          </div>

          {/* Grid de Tarjetas de Nodos */}
          {filteredComunidades.length === 0 ? (
            <div className="text-center py-16 bg-bg-surface rounded-3xl border border-dashed border-border space-y-3">
              <Info className="w-10 h-10 text-stone-400 mx-auto" />
              <p className="text-text-strong font-serif font-bold text-base">{t('card.emptyTitle')}</p>
              <p className="text-stone-500 text-xs max-w-sm mx-auto">{t('card.emptyDesc')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredComunidades.map(comunidad => {
                const isMember = appUser?.communityIds?.includes(comunidad.slug);
                const latestRequest = userRequests[comunidad.slug];
                const hasPending = latestRequest?.estado === 'pendiente';
                const hasRejected = latestRequest?.estado === 'rechazada';

                const tipoLabel = comunidad.tipo && t(`types.${comunidad.tipo}`, { defaultValue: comunidad.tipo });

                return (
                  <motion.div 
                    key={comunidad.id}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="bg-bg-surface border border-border hover:border-border-hover rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      {/* Cabecera de la tarjeta: Logo + Tipología + Estado */}
                      <div className="flex justify-between items-start gap-3">
                        <Link to={`/c/${comunidad.slug}`} className="block shrink-0">
                          <div className="w-14 h-14 bg-sand-light rounded-2xl flex items-center justify-center overflow-hidden border border-border hover:border-forest-deep transition-colors shadow-2xs">
                            {comunidad.logoUrl ? (
                              <img src={comunidad.logoUrl} alt={comunidad.nombre} className="w-full h-full object-cover" />
                            ) : (
                              <Compass className="w-7 h-7 text-forest-deep" />
                            )}
                          </div>
                        </Link>
                        
                        <div className="flex flex-wrap items-center justify-end gap-1.5">
                          {tipoLabel && (
                            <span className="text-[11px] font-semibold bg-forest-light text-forest-deep px-2.5 py-0.5 rounded-full border border-forest-deep/20">
                              {tipoLabel}
                            </span>
                          )}
                          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                            comunidad.requiereAprobacion 
                              ? 'bg-sand-light text-stone-700 border-border' 
                              : 'bg-status-success-bg text-status-success-text border-status-success-text/20'
                          }`}>
                            {comunidad.requiereAprobacion ? t('card.requestRequired') : t('card.openAccess')}
                          </span>
                        </div>
                      </div>

                      {/* Información central */}
                      <div className="space-y-2">
                        <Link to={`/c/${comunidad.slug}`} className="inline-block hover:text-forest-deep transition-colors">
                          <h3 className="text-xl font-bold font-serif text-text-strong">{comunidad.nombre}</h3>
                        </Link>

                        {comunidad.ubicacion && (
                          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                            <MapPin size={13} className="shrink-0 text-terracotta-deep" />
                            <span>
                              {comunidad.ubicacion.municipio}, {comunidad.ubicacion.region}
                            </span>
                          </div>
                        )}

                        <p className="text-stone-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                          {comunidad.descripcion}
                        </p>

                        <div className="pt-1">
                          <CommunityCaretakers communityId={comunidad.id} adminUids={comunidad.adminUids} />
                        </div>

                        {comunidad.tags && comunidad.tags.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1 pt-1 text-[11px] text-stone-500">
                            <Sparkles size={11} className="shrink-0 text-amber-500" />
                            <span className="line-clamp-1">{comunidad.tags.slice(0, 3).join(' · ')}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Acciones del pie */}
                    <div className="pt-6 mt-4 border-t border-border flex flex-col gap-2.5">
                      {isMember ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleEnterNodeSpace(comunidad)}
                            className="w-full flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white bg-forest-deep hover:bg-forest-deep/90 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
                          >
                            <span>{t('card.enterSpace')}</span>
                            <ArrowRight size={14} />
                          </button>
                          <Link 
                            to={`/c/${comunidad.slug}`}
                            className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-text-strong bg-sand-light/60 py-2 rounded-xl transition-colors"
                          >
                            <Compass className="w-3.5 h-3.5 text-forest-deep" />
                            <span>{t('card.viewNode')}</span>
                          </Link>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Link 
                            to={`/c/${comunidad.slug}`}
                            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-stone-700 hover:text-forest-deep bg-sand-light py-2.5 rounded-xl transition-colors border border-border"
                          >
                            <Compass className="w-3.5 h-3.5 text-forest-deep" />
                            <span>{t('card.viewNode')}</span>
                          </Link>

                          {hasPending ? (
                            <span className="px-3 py-2 text-xs font-bold text-stone-500 bg-sand-light rounded-xl border border-border cursor-default">
                              {t('card.pendingBadge')}
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                if (!appUser) {
                                  setIsLoginModalOpen(true);
                                  return;
                                }
                                setSelectedComunidad(comunidad);
                                setShowSolicitud(true);
                              }}
                              className="px-4 py-2.5 bg-forest-deep hover:bg-forest-deep/90 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <MessageSquare size={13} />
                              <span>{t('join')}</span>
                            </button>
                          )}
                        </div>
                      )}

                      {hasRejected && (latestRequest?.motivoRechazo || latestRequest?.detalleRechazo) && (
                        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3 text-left">
                          <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider mb-0.5">
                            {t('card.rejectedTitle')}
                          </div>
                          {latestRequest.motivoRechazo && (
                            <p className="text-xs font-medium text-stone-700">
                              {latestRequest.motivoRechazo}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Modal de Solicitud de Acceso */}
      <Modal
        isOpen={showSolicitud}
        onClose={() => setShowSolicitud(false)}
        title={t('accessState.sendRequest')}
      >
        <div className="space-y-4">
          <p className="text-sm text-stone-600 leading-relaxed">
            {t('accessState.requestIntro')}
          </p>
          <textarea
            value={solicitudMsg}
            onChange={(e) => setSolicitudMsg(e.target.value)}
            placeholder={t('accessState.placeholderMessage')}
            rows={4}
            className="w-full rounded-2xl border border-border bg-bg-page focus:border-forest-deep focus:ring-forest-deep transition-all p-3 text-sm text-text-strong"
          />
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>{t('accessState.charCount', { count: solicitudMsg.trim().length })}</span>
            <button
              onClick={handleSendSolicitud}
              disabled={isSubmitting || solicitudMsg.trim().length < 20}
              className="px-5 py-2.5 bg-forest-deep hover:bg-forest-deep/90 text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-xs flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : t('accessState.sendRequest')}
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de Autenticación para Visitantes */}
      <AuthGateModal
        isOpen={isLoginModalOpen}
        mode="login"
        onClose={() => setIsLoginModalOpen(false)}
      />
    </PageContainer>
  );
}

export default ComunidadesView;
