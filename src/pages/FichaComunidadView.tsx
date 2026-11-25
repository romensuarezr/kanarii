import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Users, CheckCircle2, Lock, Globe, BookOpen, ArrowLeft, Loader2, MessageSquare, AlertTriangle, Settings, Eye, ChevronRight, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../contexts/AuthContext';
import { useComunidad } from '../contexts/ComunidadContext';
import { Comunidad, getComunidad, getUltimaSolicitud, SolicitudAcceso } from '../lib/appService';
import { useComunidadActions } from '../hooks/useComunidadActions';
import { useToast } from '../components/Toaster';
import { AuthGateModal } from '../components/AuthGateModal';
import { ConfiguracionComunidadPanel } from '../components/ConfiguracionComunidadPanel';
import { useCommunityMembers } from '../hooks/useCommunityMembers';
import { useTareas } from '../hooks/useTareas';
import { useProyectos } from '../hooks/useProyectos';
import { useTranslation } from 'react-i18next';
import { MemberCard } from '../components/members/MemberCard';
import { PasaporteModal } from '../components/perfil/PasaporteModal';

export function FichaComunidadView() {
  const { t } = useTranslation('communities');
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { appUser } = useAuth();
  const { setCommunityId } = useComunidad();
  const { solicitarAcceso, unirseComunidad, isExecuting } = useComunidadActions();
  const toast = useToast();

  const [comunidad, setComunidad] = useState<Comunidad | null>(null);
  const [loading, setLoading] = useState(true);
  const [latestRequest, setLatestRequest] = useState<SolicitudAcceso | null>(null);
  const [solicitudMsg, setSolicitudMsg] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginMode, setLoginMode] = useState<'login' | 'onboarding'>('login');
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'presentacion' | 'miembros' | 'actividad'>('presentacion');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);

  const isAdmin = appUser?.role === 'admin';
  const isCommunityAdmin = !!(isAdmin || (comunidad?.adminUids && Array.isArray(comunidad.adminUids) && comunidad.adminUids.includes(appUser?.uid || '')));
  const isMember = appUser?.communityIds?.includes(comunidad?.slug || '') || false;

  const { members, loading: loadingMembers } = useCommunityMembers(comunidad?.slug);
  const { items: tareas, loading: loadingTareas } = useTareas(comunidad?.slug);
  const { items: proyectos, loading: loadingProyectos } = useProyectos(comunidad?.slug);

  const handleToggleEdit = () => {
    if (!isEditingMode && comunidad) {
      setCommunityId(comunidad.slug);
    }
    setIsEditingMode(!isEditingMode);
  };

  useEffect(() => {
    async function loadComunidad() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await getComunidad(slug);
        setComunidad(data);

        if (data && appUser) {
          const req = await getUltimaSolicitud(data.slug, appUser.uid);
          setLatestRequest(req);
        }
      } catch (err) {
        console.error('Error al cargar el nodo:', err);
      } finally {
        setLoading(false);
      }
    }
    loadComunidad();
  }, [slug, appUser]);

  const handleJoinDirect = async () => {
    if (!comunidad || !appUser) return;
    try {
      await unirseComunidad(comunidad.slug, appUser.uid, {
        onSuccess: () => {
          toast.success(t('accessState.alreadyMember') + ' 🎉');
          setCommunityId(comunidad.slug);
          navigate('/tablon');
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendRequest = async () => {
    if (!comunidad || !appUser || solicitudMsg.trim().length < 20) return;
    try {
      await solicitarAcceso(comunidad.slug, appUser.uid, solicitudMsg, {
        onSuccess: async () => {
          toast.success('Tu solicitud de acceso ha sido enviada con éxito.');
          const req = await getUltimaSolicitud(comunidad.slug, appUser.uid);
          setLatestRequest(req);
          setSolicitudMsg('');
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnterSpace = () => {
    if (comunidad) {
      setCommunityId(comunidad.slug);
      toast.success(t('card.enterSpace') + ` · ${comunidad.nombre}`);
      navigate('/tablon');
    }
  };

  const openLoginModal = (mode: 'login' | 'onboarding') => {
    setLoginMode(mode);
    setIsLoginModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-page text-stone-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-forest-deep" />
        <p className="font-medium font-serif">{t('loadingDetails')}</p>
      </div>
    );
  }

  if (!comunidad) {
    return (
      <div className="min-h-screen bg-bg-page flex flex-col items-center justify-center p-6 text-text-strong">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500 border border-rose-100 shadow-inner">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-serif text-text-strong">{t('notFoundTitle')}</h1>
          <p className="text-stone-600">
            {t('notFoundDesc', { slug })}
          </p>
          <div className="pt-4">
            <Link
              to="/comunidades"
              className="inline-flex items-center gap-2 bg-forest-deep hover:bg-forest-deep/90 text-white py-3 px-6 rounded-2xl font-bold transition-all shadow-md"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('backToCommunities')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isPrivate = comunidad.esPublica === false;

  if (isPrivate && !isMember) {
    return (
      <div className="min-h-screen bg-bg-page flex flex-col items-center justify-center p-6 text-text-strong">
        <div className="max-w-md w-full text-center space-y-6 bg-bg-surface border border-border rounded-[2rem] p-8 shadow-lg">
          <div className="w-20 h-20 bg-sand-light rounded-full flex items-center justify-center mx-auto text-forest-deep border border-border">
            <Lock className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-serif text-text-strong">{t('privateTitle')}</h1>
          <p className="text-stone-600 leading-relaxed">
            {t('privateDesc')}
          </p>
          <div className="pt-4 flex flex-col gap-3">
            <Link
              to="/comunidades"
              className="inline-flex items-center justify-center gap-2 bg-forest-deep hover:bg-forest-deep/90 text-white py-3 px-6 rounded-2xl font-bold transition-all shadow-md"
            >
              {t('exploreOtherCommunities')}
            </Link>
            <Link
              to="/"
              className="text-terracotta-deep hover:underline font-bold text-sm"
            >
              {t('goToWelcome')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const hasPending = latestRequest?.estado === 'pendiente';
  const hasRejected = latestRequest?.estado === 'rechazada';

  const tipoLabel = comunidad.tipo && t(`types.${comunidad.tipo}`, { defaultValue: comunidad.tipo });

  return (
    <div className="min-h-screen bg-bg-page p-4 md:p-6 pb-24 text-text-strong font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Cabecera y Botón de Volver */}
        <div className="flex items-center justify-between">
          <Link
            to={appUser ? '/comunidades' : '/'}
            className="inline-flex items-center gap-2 text-stone-500 hover:text-text-strong transition-colors font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {appUser ? t('backToCommunities') : t('backToHome')}
          </Link>
        </div>

        {/* Ficha Principal de la Comunidad */}
        <div className="bg-bg-surface border border-border rounded-[2.5rem] shadow-sm overflow-hidden relative">
          
          {/* Portada / Banner */}
          {comunidad.bannerUrl ? (
            <div 
              className="h-48 md:h-64 bg-cover bg-center w-full" 
              style={{ backgroundImage: `url(${comunidad.bannerUrl})` }} 
            />
          ) : (
            <div 
              className="h-48 md:h-64 w-full bg-linear-to-br from-forest-light to-forest-deep/20" 
            />
          )}

          {/* Botón de configuración/edición visible solo para admins */}
          {isCommunityAdmin && (
            <button
              onClick={handleToggleEdit}
              className="absolute top-4 right-4 bg-bg-surface/90 hover:bg-bg-surface backdrop-blur-xs border border-border p-2.5 rounded-2xl text-text-strong shadow-xs hover:shadow-md transition-all z-10 flex items-center gap-1.5 font-semibold text-xs uppercase tracking-wider px-4 cursor-pointer"
            >
              {isEditingMode ? (
                <>
                  <Eye className="w-4 h-4 text-stone-500" />
                  {t('viewPublicCard')}
                </>
              ) : (
                <>
                  <Settings className="w-4 h-4 text-terracotta-deep" />
                  {t('settings')}
                </>
              )}
            </button>
          )}

          {isEditingMode ? (
            <div className="p-6 md:p-8">
              <ConfiguracionComunidadPanel
                onUpdated={async () => {
                  setIsEditingMode(false);
                  if (slug) {
                    try {
                      const data = await getComunidad(slug);
                      setComunidad(data);
                    } catch (err) {
                      console.error('Error al recargar el nodo:', err);
                    }
                  }
                }}
                onCancel={() => setIsEditingMode(false)}
              />
            </div>
          ) : (
            <div className="p-6 md:p-8 space-y-8">
              
              {/* Bloque A: Info Básica y Logo Superpuesto */}
              <div className="relative border-b border-border pb-6">
                <div className="absolute -top-16 md:-top-20 left-0 w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-bg-surface border-2 border-border shadow-md flex items-center justify-center overflow-hidden z-10">
                  {comunidad.logoUrl ? (
                    <img
                      src={comunidad.logoUrl}
                      alt={comunidad.nombre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl md:text-5xl font-serif text-forest-deep font-bold">
                      {comunidad.nombre.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="pt-10 md:pt-0 md:pl-40 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-2xl md:text-4xl font-serif text-text-strong font-bold">
                        {comunidad.nombre}
                      </h1>
                      {tipoLabel && (
                        <span className="px-3 py-1 bg-forest-light text-forest-deep text-xs font-bold rounded-full border border-forest-deep/20 uppercase tracking-wider">
                          {tipoLabel}
                        </span>
                      )}
                    </div>

                    {comunidad.ubicacion && (
                      <div className="flex items-center gap-1.5 text-stone-500 text-sm font-medium">
                        <MapPin className="w-4 h-4 text-terracotta-deep" />
                        <span>
                          {comunidad.ubicacion.municipio}, {comunidad.ubicacion.region}, {comunidad.ubicacion.pais}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Ocupación / Capacidad */}
                  <div className="w-full md:w-auto min-w-[240px] bg-sand-light/50 border border-border rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-forest-deep" />
                        {members.length} {t(members.length === 1 ? 'member_one' : 'member_other')}
                      </span>
                      {comunidad.capacidad && comunidad.capacidad > 0 ? (
                        <span>{t('occupationLimit', { limit: comunidad.capacidad })}</span>
                      ) : null}
                    </div>
                    
                    {comunidad.capacidad && comunidad.capacidad > 0 && (
                      <div className="space-y-1">
                        <div className="w-full bg-sand-dark h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-forest-deep h-full rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, Math.round((members.length / comunidad.capacidad) * 100))}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-right text-stone-500 font-medium">
                          {t('occupationPercent', { percent: Math.round((members.length / comunidad.capacidad) * 100) })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bloque B: Grid de 2 Columnas (Contenido Principal vs Barra Lateral) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Columna Izquierda (2/3): Pestañas de Contenido */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Selector de Pestañas estilo Retribalize */}
                  <div className="flex items-center gap-2 border-b border-border pb-3">
                    <button
                      onClick={() => setActiveTab('presentacion')}
                      className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        activeTab === 'presentacion'
                          ? 'bg-forest-deep text-white shadow-xs'
                          : 'text-stone-500 hover:text-text-strong bg-sand-light/60'
                      }`}
                    >
                      {t('tabs.presentation')}
                    </button>
                    <button
                      onClick={() => setActiveTab('miembros')}
                      className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        activeTab === 'miembros'
                          ? 'bg-forest-deep text-white shadow-xs'
                          : 'text-stone-500 hover:text-text-strong bg-sand-light/60'
                      }`}
                    >
                      {t('tabs.members')} ({members.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('actividad')}
                      className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        activeTab === 'actividad'
                          ? 'bg-forest-deep text-white shadow-xs'
                          : 'text-stone-500 hover:text-text-strong bg-sand-light/60'
                      }`}
                    >
                      {t('tabs.activity')}
                    </button>
                  </div>

                  <div className="relative">
                    
                    {/* Tab: Presentación */}
                    {activeTab === 'presentacion' && (
                      <div className="space-y-6 transition-all duration-200 ease-out opacity-100 translate-y-0">
                        <p className="text-stone-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
                          {comunidad.descripcion}
                        </p>

                        {/* Etiquetas */}
                        {comunidad.tags && comunidad.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {comunidad.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1.5 bg-sand-light border border-border text-stone-700 text-xs font-semibold rounded-xl"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Manifiesto */}
                        {comunidad.manifiesto && (
                          <div className="space-y-3 pt-6 border-t border-border">
                            <h3 className="text-lg md:text-xl font-serif text-text-strong font-bold flex items-center gap-2">
                              <BookOpen className="w-5 h-5 text-forest-deep" />
                              {t('manifesto')}
                            </h3>
                            <div className="bg-bg-page border border-border rounded-3xl p-6 md:p-8 text-stone-700 prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-text-strong">
                              <ReactMarkdown>{comunidad.manifiesto}</ReactMarkdown>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tab: Miembros */}
                    {activeTab === 'miembros' && (
                      <div className="space-y-6 transition-all duration-200 ease-out opacity-100 translate-y-0">
                        {loadingMembers ? (
                          <div className="flex justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-forest-deep" />
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {members.map((member) => {
                                const memberId = member.userId || member.id || '';
                                const displayName = member.nombre && member.nombre !== 'Sin Nombre'
                                  ? member.nombre
                                  : member.displayName || (member.email ? member.email.split('@')[0] : 'Miembro');

                                return (
                                  <MemberCard
                                    key={member.id}
                                    id={memberId}
                                    name={displayName}
                                    photoUrl={member.photoURL}
                                    role={member.rol_comunidad || member.rolComunitario || member.rol}
                                    bio={member.arquetipo_s3 ? `Arquetipo: ${member.arquetipo_s3}` : undefined}
                                    saberes={member.tipo_hd ? [member.tipo_hd] : undefined}
                                    onOpenPassport={(uid) => {
                                      setSelectedMemberId(uid);
                                      setIsPassportModalOpen(true);
                                    }}
                                  />
                                );
                              })}
                            </div>

                            {!isMember && (
                              <div className="bg-sand-light/50 border border-border rounded-3xl p-6 text-center space-y-4 shadow-2xs">
                                <Users className="w-10 h-10 text-terracotta-deep mx-auto" />
                                <div className="space-y-1">
                                  <h4 className="text-base font-bold text-text-strong">{t('membersSection.promptTitle')}</h4>
                                  <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                                    {t('membersSection.promptDesc')}
                                  </p>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {/* Tab: Actividad */}
                    {activeTab === 'actividad' && (
                      <div className="space-y-6 transition-all duration-200 ease-out opacity-100 translate-y-0">
                        {loadingTareas || loadingProyectos ? (
                          <div className="flex justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-forest-deep" />
                          </div>
                        ) : (
                          <>
                            {/* Tareas */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest">{t('activitySection.recentTasks')}</h4>
                              {tareas.length === 0 ? (
                                <div className="bg-sand-light/30 border border-border rounded-2xl p-6 text-center text-xs text-stone-500">
                                  {t('activitySection.noTasks')}
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {tareas.slice(0, 5).map((tarea) => (
                                    <div key={tarea.id} className="bg-bg-surface border border-border rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs">
                                      <div className="min-w-0 flex-1">
                                        <p className="font-bold text-text-strong text-sm truncate">{tarea.titulo}</p>
                                        {isMember && tarea.descripcion && (
                                          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{tarea.descripcion}</p>
                                        )}
                                      </div>
                                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                                        tarea.estado === 'completada' 
                                          ? 'bg-status-success-bg text-status-success-text border-status-success-text/20' 
                                          : 'bg-sand-light text-stone-700 border-border'
                                      }`}>
                                        {tarea.estado === 'completada' ? 'Completada' : 'Pendiente'}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Proyectos */}
                            <div className="space-y-3 pt-4 border-t border-border">
                              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest">{t('activitySection.activeProjects')}</h4>
                              {proyectos.length === 0 ? (
                                <div className="bg-sand-light/30 border border-border rounded-2xl p-6 text-center text-xs text-stone-500">
                                  {t('activitySection.noProjects')}
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {proyectos.slice(0, 5).map((proyecto) => (
                                    <div key={proyecto.id} className="bg-bg-surface border border-border rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs">
                                      <div className="min-w-0 flex-1">
                                        <p className="font-bold text-text-strong text-sm truncate">{proyecto.titulo}</p>
                                        {isMember && proyecto.descripcion && (
                                          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{proyecto.descripcion}</p>
                                        )}
                                      </div>
                                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sand-light text-stone-700 border border-border">
                                        {proyecto.estado || 'planificado'}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {!isMember && (
                              <div className="bg-sand-light/40 border border-border rounded-2xl p-4 text-xs text-stone-600 leading-relaxed text-center">
                                ℹ️ {t('activitySection.internalNotice')}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}

                  </div>
                </div>

                {/* Columna Derecha (1/3): CTAs de Acceso y Participación */}
                <div className="space-y-6">
                  <div className="bg-sand-light/50 border border-border rounded-3xl p-6 shadow-xs space-y-6 sticky top-6">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-text-strong mb-1">{t('join')}</h3>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        {comunidad.esPublica
                          ? t('accessState.requestDirect')
                          : t('privateDesc')}
                      </p>
                    </div>

                    <div className="border-t border-border pt-6">
                      {isMember ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-status-success-text font-bold text-xs bg-status-success-bg border border-status-success-text/20 rounded-2xl p-3.5">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>{t('accessState.alreadyMember')}</span>
                          </div>

                          {/* Botón principal para miembros: Entrar al espacio del nodo */}
                          <button
                            onClick={handleEnterSpace}
                            className="w-full bg-forest-deep hover:bg-forest-deep/90 text-white py-3.5 px-6 rounded-2xl font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
                          >
                            <span>{t('accessState.enterSpace')}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          {isCommunityAdmin && (
                            <button
                              onClick={() => navigate('/admin')}
                              className="w-full bg-bg-surface hover:bg-sand-light text-stone-700 py-2.5 px-4 rounded-xl font-semibold transition-all border border-border flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                            >
                              <span>{t('accessState.goToAdmin')}</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ) : !appUser ? (
                        <div className="space-y-3">
                          <button
                            onClick={() => openLoginModal('login')}
                            className="w-full bg-forest-deep hover:bg-forest-deep/90 text-white py-3 px-5 rounded-2xl font-bold transition-all shadow-xs text-center text-xs cursor-pointer"
                          >
                            {t('accessState.loginToJoin')}
                          </button>
                          <button
                            onClick={() => openLoginModal('onboarding')}
                            className="w-full border border-border bg-bg-surface hover:bg-sand-light text-text-strong py-3 px-5 rounded-2xl font-bold transition-all text-center text-xs cursor-pointer"
                          >
                            {t('accessState.registerToJoin')}
                          </button>
                        </div>
                      ) : comunidad.requiereAprobacion ? (
                        <div className="space-y-4">
                          {hasPending ? (
                            <div className="bg-sand-light border border-border rounded-2xl p-4 flex flex-col gap-2 text-stone-700">
                              <div className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 text-forest-deep animate-spin shrink-0" />
                                <span className="font-bold text-xs">{t('accessState.pending')}</span>
                              </div>
                              {latestRequest?.mensaje && (
                                <div className="bg-bg-surface border border-border rounded-xl p-2.5 text-stone-600 text-xs italic">
                                  "{latestRequest.mensaje}"
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {hasRejected && (
                                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3 text-rose-900 text-xs">
                                  <p className="font-bold mb-1">{t('accessState.rejected')}</p>
                                </div>
                              )}

                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                                  {t('accessState.charCount', { count: solicitudMsg.trim().length })}
                                </label>
                                <textarea
                                  rows={4}
                                  value={solicitudMsg}
                                  onChange={(e) => setSolicitudMsg(e.target.value)}
                                  placeholder={t('accessState.placeholderMessage')}
                                  className="w-full bg-bg-page border border-border rounded-2xl p-3 text-text-strong placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-forest-deep transition-all text-xs"
                                />
                              </div>

                              <button
                                onClick={handleSendRequest}
                                disabled={isExecuting || solicitudMsg.trim().length < 20}
                                className="w-full bg-forest-deep hover:bg-forest-deep/90 text-white py-3 px-5 rounded-2xl font-bold transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs cursor-pointer"
                              >
                                <MessageSquare className="w-4 h-4" />
                                <span>{t('accessState.sendRequest')}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={handleJoinDirect}
                          disabled={isExecuting}
                          className="w-full bg-forest-deep hover:bg-forest-deep/90 text-white py-3 px-5 rounded-2xl font-bold transition-all shadow-xs flex items-center justify-center gap-2 text-xs cursor-pointer"
                        >
                          {t('accessState.joinDirect')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>

      {/* Modal de login/onboarding */}
      <AuthGateModal
        isOpen={isLoginModalOpen}
        mode={loginMode}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Modal de Pasaporte rápido */}
      <PasaporteModal
        userId={selectedMemberId}
        isOpen={isPassportModalOpen}
        onClose={() => {
          setIsPassportModalOpen(false);
          setSelectedMemberId(null);
        }}
      />
    </div>
  );
}

export default FichaComunidadView;
