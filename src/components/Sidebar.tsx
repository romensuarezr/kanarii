import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User, 
  ChevronDown, 
  MapPin, 
  Compass, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Tent, 
  ArrowLeft, 
  MessageSquare, 
  CheckSquare, 
  Vote, 
  FileText, 
  Briefcase, 
  Handshake, 
  Settings,
  Layers
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useComunidad } from '../contexts/ComunidadContext';
import { listenSolicitudes, listenPropuestasPendientesCount, listenSolicitudesProyectosPendientesCount } from '../lib/appService';
import { useState, useEffect } from 'react';
import { SyncIndicator } from './ui/SyncIndicator';
import { useNotificaciones } from '../hooks/useNotificaciones';
import NotifBadge from './ui/NotifBadge';
import { useAcuerdosBadge } from '../hooks/useAcuerdosBadge';
import { useTranslation } from 'react-i18next';
import { UserAvatarMenu } from './layout/UserAvatarMenu';

export function Sidebar() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const location = useLocation();
  const { appUser } = useAuth();
  const { comunidad, comunidades, setCommunityId, currentCommunityId, exitCommunitySpace } = useComunidad();
  const { unreadCount } = useNotificaciones(comunidad?.id, appUser?.uid);
  const [pendingCount, setPendingCount] = useState(0);
  const { acuerdosPendingCount, acuerdosSolicitanteCount } = useAcuerdosBadge();
  const [propuestasPendingCount, setPropuestasPendingCount] = useState(0);
  const [proyectosPendingCount, setProyectosPendingCount] = useState(0);

  const isAdmin = appUser?.role === 'admin';
  const isCommunityAdmin = !!(isAdmin || (comunidad?.adminUids && Array.isArray(comunidad.adminUids) && comunidad.adminUids.includes(appUser?.uid || '')));
  const isMemberOrAdmin = !!(
    isAdmin || 
    (comunidad?.id && appUser?.communityIds && appUser.communityIds.includes(comunidad.id)) ||
    (comunidad?.adminUids && appUser?.uid && comunidad.adminUids.includes(appUser.uid))
  );

  const isNodeSpace = Boolean(currentCommunityId && comunidad?.id);

  // Escuchas reactivas dentro del espacio del nodo
  useEffect(() => {
    if (!comunidad?.id || !isCommunityAdmin || !appUser?.uid) {
      setPendingCount(0);
      return;
    }

    try {
      const unsubscribe = listenSolicitudes(comunidad.id, (list) => {
        const count = list.filter(s => s.estado === 'pendiente').length;
        setPendingCount(count);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Error suscribiéndose a solicitudes:", error);
      setPendingCount(0);
    }
  }, [comunidad?.id, isCommunityAdmin, appUser?.uid]);

  useEffect(() => {
    if (!comunidad?.id || !appUser?.uid || !isMemberOrAdmin) {
      setPropuestasPendingCount(0);
      return;
    }

    try {
      const unsubscribe = listenPropuestasPendientesCount(
        comunidad.id,
        appUser.uid,
        (count) => {
          setPropuestasPendingCount(count);
        }
      );
      return () => unsubscribe();
    } catch (error) {
      console.error("Error suscribiéndose a propuestas pendientes:", error);
      setPropuestasPendingCount(0);
    }
  }, [comunidad?.id, appUser?.uid, isMemberOrAdmin]);

  useEffect(() => {
    if (!comunidad?.id || !appUser?.uid || !isMemberOrAdmin) {
      setProyectosPendingCount(0);
      return;
    }

    try {
      const unsubscribe = listenSolicitudesProyectosPendientesCount(
        comunidad.id,
        appUser.uid,
        (count) => {
          setProyectosPendingCount(count);
        }
      );
      return () => unsubscribe();
    } catch (error) {
      console.error("Error suscribiéndose a solicitudes de proyectos:", error);
      setProyectosPendingCount(0);
    }
  }, [comunidad?.id, appUser?.uid, isMemberOrAdmin]);

  // Filtrar comunidades a las que pertenece el usuario
  const userComunidades = comunidades.filter(c => {
    if (isAdmin) return true;
    return (appUser?.communityIds || []).includes(c.id) || (comunidad?.id === c.id);
  });

  // Ítems de la Capa 1 (Red Global)
  const networkNavItems = [
    {
      labelKey: 'nav.synergies',
      label: 'Sinergias & Encuentro',
      href: '/dashboard',
      icon: Sparkles,
    },
    {
      labelKey: 'nav.nodes',
      label: 'Directorio de Nodos',
      href: '/comunidades',
      icon: Compass,
    },
    {
      labelKey: 'nav.events',
      label: 'Eventos & Encuentros',
      href: '/eventos',
      icon: Calendar,
    },
    {
      labelKey: 'nav.residencies',
      label: 'Residencias & Coliving',
      href: '/residencias',
      icon: Tent,
    },
    {
      labelKey: 'nav.myPassport',
      label: 'Mi Pasaporte',
      href: '/ficha',
      icon: User,
    },
  ];

  // Ítems de la Capa 2 (Espacio Operativo del Nodo)
  const nodeSpaceNavItems = [
    {
      labelKey: 'nav.board',
      label: 'Tablón',
      href: '/tablon',
      icon: MessageSquare,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      labelKey: 'nav.tasks',
      label: 'Círculos & Tareas',
      href: '/tareas',
      icon: CheckSquare,
    },
    {
      labelKey: 'nav.governance',
      label: 'Gobernanza S3',
      href: '/gobernanza',
      icon: Vote,
      badge: propuestasPendingCount > 0 ? propuestasPendingCount : undefined,
    },
    {
      labelKey: 'nav.minutes',
      label: 'Actas',
      href: '/actas',
      icon: FileText,
    },
    {
      labelKey: 'nav.projects',
      label: 'Proyectos',
      href: '/proyectos',
      icon: Briefcase,
      badge: proyectosPendingCount > 0 ? proyectosPendingCount : undefined,
    },
    {
      labelKey: 'nav.calendar',
      label: 'Calendario',
      href: '/calendario',
      icon: Calendar,
    },
    {
      labelKey: 'nav.marketplace',
      label: 'Soberanía / Almacén',
      href: '/soberania',
      icon: Handshake,
      badge: (acuerdosPendingCount + acuerdosSolicitanteCount) > 0 ? (acuerdosPendingCount + acuerdosSolicitanteCount) : undefined,
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[250px] h-screen sticky top-0 bg-bg-surface border-r border-border overflow-y-auto">
      {/* Header / Logo */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-5">
          <img src="/kanarii-logo.svg" alt="Kanarii" style={{ width: '34px', height: '34px', objectFit: 'contain' }} />
          <div>
            <h1 className="font-serif text-2xl text-forest-deep tracking-tight leading-none">Kanarii</h1>
            <p className="text-[10px] text-stone-400 font-bold tracking-wider uppercase mt-0.5">
              {isNodeSpace ? t('nav.nodeSpace', { defaultValue: 'Espacio de Nodo' }) : t('nav.globalNetwork', { defaultValue: 'Red Canarias' })}
            </p>
          </div>
        </div>

        {/* MODO CAPA 2: Botón persistente "← Volver a la Red" y Tarjeta del Nodo Activo */}
        {isNodeSpace ? (
          <div className="space-y-2 mb-2">
            <button
              onClick={() => {
                exitCommunitySpace();
                navigate('/dashboard');
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-terracotta/10 text-terracotta hover:bg-terracotta/20 text-xs font-bold transition-all border border-terracotta/20 shadow-2xs group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>{t('nav.backToNetwork', { defaultValue: '← Volver a la Red' })}</span>
            </button>

            <div className="bg-sand-light/50 border border-border rounded-2xl p-3 shadow-2xs">
              <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                <MapPin size={10} className="text-terracotta" />
                {t('nav.activeSpace', { defaultValue: 'Espacio Activo' })}
              </p>
              {userComunidades.length > 1 ? (
                <div className="relative flex items-center group/sel">
                  <select
                    value={comunidad?.id || ''}
                    onChange={(e) => setCommunityId(e.target.value)}
                    className="appearance-none bg-transparent border-none p-0 pr-6 text-xs text-forest-deep font-bold focus:ring-0 cursor-pointer w-full truncate"
                  >
                    {userComunidades.map(c => (
                      <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none group-hover/sel:text-stone-600 transition-colors" />
                </div>
              ) : (
                <div className="text-xs font-bold text-forest-deep truncate flex items-center">
                  {comunidad?.nombre || 'General'}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* MODO CAPA 1: Indicador de Red Global */
          <div className="bg-sand-light/40 border border-border rounded-2xl p-3 mb-2">
            <p className="text-[10px] font-bold text-forest-deep flex items-center gap-1.5">
              <Layers size={13} className="text-forest-moss" />
              <span>{t('nav.globalNetwork', { defaultValue: 'Red Viva Canarias' })}</span>
            </p>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {t('events.headerSubtitle', { defaultValue: 'Nodos, personas y sinergias deterministas.' })}
            </p>
          </div>
        )}

        {/* Indicador de Sincronización / Conexión */}
        <div className="mt-2 mb-1">
          <SyncIndicator />
        </div>
      </div>

      {/* Navegación por Capas */}
      <nav className="flex-1 px-4 space-y-1">
        {isNodeSpace ? (
          /* ENLACES DE CAPA 2: Herramientas del Nodo */
          <>
            <div className="px-3 py-1 mb-1">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                {t('nav.nodeTools', { defaultValue: 'Herramientas del Nodo' })}
              </p>
            </div>

            {nodeSpaceNavItems.map((item, idx) => {
              const isActive = location.pathname.startsWith(item.href);
              const navLabel = item.labelKey ? t(item.labelKey as any, { defaultValue: item.label }) : item.label;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (item.labelKey === 'nav.marketplace') {
                      navigate(item.href, { 
                        state: (acuerdosPendingCount > 0 || acuerdosSolicitanteCount > 0)
                          ? { initialTab: 'mis_acuerdos' } 
                          : undefined 
                      });
                    } else {
                      navigate(item.href);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-sand-light text-forest-deep font-bold shadow-2xs border border-border' 
                      : 'text-stone-600 hover:bg-sand-light/50 hover:text-stone-800'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-forest-deep' : 'text-stone-400 group-hover:text-stone-600'}`} />
                  <span className="text-xs sm:text-sm font-medium">{navLabel}</span>
                  {item.badge && !isActive && (
                    <span className="ml-auto bg-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-forest-deep" />}
                </button>
              );
            })}

            {/* Solicitudes de acceso (Solo admins de la comunidad) */}
            {isCommunityAdmin && (
              <button
                onClick={() => navigate('/admin/solicitudes')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all duration-200 group mt-1 ${
                  location.pathname === '/admin/solicitudes'
                    ? 'bg-sand-light text-forest-deep font-bold shadow-2xs border border-border' 
                    : 'text-stone-600 hover:bg-sand-light/50 hover:text-stone-800'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${location.pathname === '/admin/solicitudes' ? 'text-forest-deep' : 'text-stone-400 group-hover:text-stone-600'}`} />
                <span className="text-xs sm:text-sm font-medium">{t('nav.requests', { defaultValue: 'Solicitudes' })}</span>
                {pendingCount > 0 && (
                  <span className="ml-auto bg-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs animate-pulse">
                    {pendingCount}
                  </span>
                )}
              </button>
            )}
          </>
        ) : (
          /* ENLACES DE CAPA 1: Red Global */
          <>
            <div className="px-3 py-1 mb-1">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                {t('nav.globalNetwork', { defaultValue: 'Red Canarias' })}
              </p>
            </div>

            {networkNavItems.map((item, idx) => {
              const isActive = location.pathname === item.href;
              const navLabel = item.labelKey ? t(item.labelKey as any, { defaultValue: item.label }) : item.label;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(item.href)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-sand-light text-forest-deep font-bold shadow-2xs border border-border' 
                      : 'text-stone-600 hover:bg-sand-light/50 hover:text-stone-800'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-forest-deep' : 'text-stone-400 group-hover:text-stone-600'}`} />
                  <span className="text-xs sm:text-sm font-medium">{navLabel}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-forest-deep" />}
                </button>
              );
            })}

            {/* Accesos rápidos a los espacios del usuario si pertenece a alguno */}
            {userComunidades.length > 0 && (
              <div className="pt-4 mt-4 border-t border-border">
                <p className="px-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">
                  {t('nav.activeSpace', { defaultValue: 'Tus Espacios' })}
                </p>
                <div className="space-y-1">
                  {userComunidades.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setCommunityId(c.id);
                        navigate('/tablon');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-forest-deep hover:bg-sand-light transition-colors text-left"
                    >
                      <span className="w-2 h-2 rounded-full bg-forest-moss" />
                      <span className="truncate">{c.nombre}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Panel de Superadministración si aplica */}
        {isAdmin && (
          <div className="pt-4 mt-4 border-t border-border">
            <button
              onClick={() => navigate('/admin')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all duration-200 group ${
                location.pathname === '/admin'
                  ? 'bg-sand-light text-forest-deep font-bold shadow-2xs border border-border' 
                  : 'text-stone-500 hover:bg-sand-light/50 hover:text-stone-700'
              }`}
            >
              <Settings className={`w-4 h-4 ${location.pathname === '/admin' ? 'text-forest-deep' : 'text-stone-400 group-hover:text-stone-600'}`} />
              <span className="text-xs sm:text-sm font-medium">{t('nav.admin', { defaultValue: 'Panel Admin' })}</span>
            </button>
          </div>
        )}
      </nav>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-border bg-bg-surface">
        <UserAvatarMenu placement="sidebar-bottom" />
      </div>
    </aside>
  );
}

export default Sidebar;
