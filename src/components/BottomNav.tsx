import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MoreHorizontal,
  Compass,
  ShieldCheck,
  ChevronDown,
  MapPin,
  Calendar,
  Tent,
  ArrowLeft,
  Sparkles,
  User,
  MessageSquare,
  CheckSquare,
  Vote,
  FileText,
  Briefcase,
  Handshake,
  Layers,
  Plus,
} from 'lucide-react';
import { CreateNewModal } from './CreateNewModal';
import { NodeModulesModal } from './NodeModulesModal';
import { useNodeModules } from '../hooks/useNodeModules';
import { NodeModuleId } from '../lib/services/_types';
import { useAuth } from '../contexts/AuthContext';
import { useComunidad } from '../contexts/ComunidadContext';
import { SyncIndicator } from './ui/SyncIndicator';
import { useAcuerdosBadge } from '../hooks/useAcuerdosBadge';
import { useNotificaciones } from '../hooks/useNotificaciones';
import { useTranslation } from 'react-i18next';

interface BottomNavItem {
  label: string;
  labelKey?: string;
  href: string;
  icon: any;
  badge?: number;
  adminOnly?: boolean;
  action?: 'createNew';
}

export function BottomNav() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const location = useLocation();
  const { appUser } = useAuth();
  const { comunidad, comunidades, setCommunityId, currentCommunityId, exitCommunitySpace } = useComunidad();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isCreateNewOpen, setIsCreateNewOpen] = useState(false);
  const [isModulesModalOpen, setIsModulesModalOpen] = useState(false);
  const { isModuleEnabled } = useNodeModules(comunidad);
  const { acuerdosPendingCount, acuerdosSolicitanteCount } = useAcuerdosBadge();
  const { unreadCount } = useNotificaciones(comunidad?.id, appUser?.uid);

  const isAdmin = appUser?.role === 'admin';
  const isCommunityAdmin = !!(isAdmin || (comunidad?.adminUids && Array.isArray(comunidad.adminUids) && comunidad.adminUids.includes(appUser?.uid || '')));

  // Capa 2 activa cuando existe un espacio de nodo seleccionado
  const isNodeSpace = Boolean(currentCommunityId);

  // Pertenencia a comunidades
  const hasCommunities = (appUser?.communityIds && appUser.communityIds.length > 0) || isAdmin || !!comunidad?.id;

  // Filtrar comunidades para el selector
  const userComunidades = comunidades.filter(c => {
    if (isAdmin) return true;
    return (appUser?.communityIds || []).includes(c.id) || (comunidad?.id === c.id);
  });

  // --- NAVEGACIÓN CAPA 1: RED CANARIAS (etiquetas cortas de 1 palabra + acceso directo + Nuevo) ---
  const networkMainItems: BottomNavItem[] = [
    {
      label: 'Explorar',
      labelKey: 'nav.exploreShort',
      href: '/dashboard',
      icon: Sparkles,
    },
    {
      label: 'Nodos',
      labelKey: 'nav.nodesShort',
      href: '/comunidades',
      icon: Compass,
    },
    {
      label: 'Nuevo',
      labelKey: 'nav.createNewShort',
      href: '#create-new',
      icon: Plus,
      action: 'createNew',
    },
    {
      label: 'Eventos',
      labelKey: 'nav.eventsShort',
      href: '/eventos',
      icon: Calendar,
    },
  ];

  const networkMoreItems: BottomNavItem[] = [
    {
      label: 'Residencias & Estancias',
      labelKey: 'nav.residencies',
      href: '/residencias',
      icon: Tent,
    },
    {
      label: 'Mi Pasaporte',
      labelKey: 'nav.myPassport',
      href: '/ficha',
      icon: User,
    },
    ...(isAdmin ? [{
      label: 'Panel Admin',
      labelKey: 'nav.admin',
      href: '/admin',
      icon: ShieldCheck,
      adminOnly: true,
    }] : []),
  ];

  // --- NAVEGACIÓN CAPA 2: ESPACIO OPERATIVO DEL NODO (progresiva por módulos activos) ---
  const allNodeSpaceItems: (BottomNavItem & { moduleId?: NodeModuleId })[] = [
    {
      moduleId: 'tablon',
      label: 'Tablón',
      labelKey: 'nav.board',
      href: '/tablon',
      icon: MessageSquare,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      moduleId: 'calendario',
      label: 'Agenda',
      labelKey: 'nav.agenda',
      href: '/calendario',
      icon: Calendar,
    },
    ...(comunidad?.slug ? [{
      moduleId: 'miembros' as NodeModuleId,
      label: 'Miembros',
      labelKey: 'nav.members',
      href: `/c/${comunidad.slug}`,
      icon: User,
    }] : []),
    {
      moduleId: 'proyectos',
      label: 'Proyectos',
      labelKey: 'nav.projects',
      href: '/proyectos',
      icon: Briefcase,
    },
    {
      moduleId: 'tareas',
      label: 'Tareas',
      labelKey: 'nav.tasks',
      href: '/tareas',
      icon: CheckSquare,
    },
    {
      moduleId: 'gobernanza',
      label: 'Gobernanza',
      labelKey: 'nav.governance',
      href: '/gobernanza',
      icon: Vote,
    },
    {
      moduleId: 'actas',
      label: 'Actas',
      labelKey: 'nav.minutes',
      href: '/actas',
      icon: FileText,
    },
    {
      moduleId: 'soberania',
      label: 'Soberanía',
      labelKey: 'nav.marketplace',
      href: '/soberania',
      icon: Handshake,
      badge: (acuerdosPendingCount + acuerdosSolicitanteCount) > 0 ? (acuerdosPendingCount + acuerdosSolicitanteCount) : undefined,
    },
  ];

  const enabledNodeItems = allNodeSpaceItems.filter(
    (item) => !item.moduleId || isModuleEnabled(item.moduleId)
  );

  const nodeSpaceMainItems: BottomNavItem[] = enabledNodeItems.slice(0, 4);
  const nodeSpaceMoreItems: BottomNavItem[] = [
    ...enabledNodeItems.slice(4),
    ...(isCommunityAdmin ? [{
      label: 'Solicitudes',
      labelKey: 'nav.requests',
      href: '/admin/solicitudes',
      icon: ShieldCheck,
    }] : []),
  ];

  // Selección activa de items según la capa
  const activeMainItems = isNodeSpace ? nodeSpaceMainItems : networkMainItems;
  const activeMoreItems = isNodeSpace ? nodeSpaceMoreItems : networkMoreItems;

  const handleNav = (href: string, label?: string) => {
    setIsMoreMenuOpen(false);
    if (label === 'Soberanía / Almacén' || href === '/soberania') {
      navigate(href, {
        state: (acuerdosPendingCount > 0 || acuerdosSolicitanteCount > 0)
          ? { initialTab: 'mis_acuerdos' }
          : undefined,
      });
    } else {
      navigate(href);
    }
  };

  const hasAnyBadgeInMore = activeMoreItems.some(item => (item.badge && item.badge > 0));

  return (
    <>
      {/* Barra de Retorno y Contexto de Capa 2 (Espacio de Nodo) */}
      {isNodeSpace && (
        <div
          className="md:hidden fixed bottom-[56px] left-0 right-0 z-30 bg-bg-surface/95 backdrop-blur-md border-t border-border px-3 py-1.5 flex items-center justify-between shadow-2xs"
          style={{ paddingBottom: '2px' }}
        >
          <div className="flex items-center gap-1.5 min-w-0 pr-2">
            <MapPin size={12} className="text-terracotta shrink-0" />
            <span className="text-xs font-bold text-forest-deep truncate">
              {comunidad?.nombre || t('nav.nodeSpace', { defaultValue: 'Espacio de Nodo' })}
            </span>
          </div>
          <button
            onClick={() => {
              exitCommunitySpace();
              navigate('/dashboard');
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-terracotta/10 text-terracotta hover:bg-terracotta/20 text-[11px] font-bold transition-all border border-terracotta/20 shrink-0 cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>{t('nav.backToNetwork', { defaultValue: 'Volver a Red Canarias' })}</span>
          </button>
        </div>
      )}

      {/* Barra Principal Inferior */}
      <nav
        aria-label="Navegación móvil"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-surface border-t border-border flex items-center justify-around shadow-xs"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)', minHeight: '56px' }}
      >
        {activeMainItems.map((item, idx) => {
          if (item.action === 'createNew') {
            const navLabel = item.labelKey ? t(item.labelKey as any, { defaultValue: item.label }) : item.label;
            return (
              <button
                key={idx}
                onClick={() => setIsCreateNewOpen(true)}
                className="flex flex-col items-center justify-center flex-1 h-full min-h-[56px] space-y-1 relative text-terracotta-deep font-bold cursor-pointer"
              >
                <div className="w-7 h-7 rounded-xl bg-terracotta/15 border border-terracotta/30 flex items-center justify-center">
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] uppercase tracking-wide">{navLabel}</span>
              </button>
            );
          }

          const isReallyActive = item.href === '/dashboard' || item.href === '/'
            ? (location.pathname === '/' || location.pathname === '/dashboard')
            : location.pathname.startsWith(item.href);
          const navLabel = item.labelKey ? t(item.labelKey as any, { defaultValue: item.label }) : item.label;

          return (
            <button
              key={idx}
              onClick={() => handleNav(item.href, item.label)}
              className={`flex flex-col items-center justify-center flex-1 h-full min-h-[56px] space-y-1 relative transition-colors cursor-pointer ${
                isReallyActive ? 'text-forest-deep font-bold' : 'text-stone-400'
              }`}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {item.badge && item.badge > 0 && !isReallyActive && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-terracotta rounded-full" />
                )}
              </div>
              <span className="text-[10px] uppercase tracking-wide truncate max-w-[68px] text-center">
                {navLabel}
              </span>
              {isReallyActive && <div className="w-1 h-1 rounded-full bg-forest-deep absolute bottom-1" />}
            </button>
          );
        })}

        {/* Botón "Más" */}
        <button
          onClick={() => setIsMoreMenuOpen(true)}
          className={`flex flex-col items-center justify-center flex-1 h-full min-h-[56px] space-y-1 relative transition-colors cursor-pointer ${
            isMoreMenuOpen ? 'text-forest-deep font-bold' : 'text-stone-400'
          }`}
        >
          <div className="relative">
            <MoreHorizontal className="w-5 h-5" />
            {hasAnyBadgeInMore && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-terracotta rounded-full" />
            )}
          </div>
          <span className="text-[10px] uppercase tracking-wide">{t('actions.more' as any, { defaultValue: 'Más' })}</span>
        </button>
      </nav>

      {/* Sheet Modal Desplegable ("Más") */}
      {isMoreMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            onClick={() => setIsMoreMenuOpen(false)}
          />
          <div
            className="relative bg-bg-surface rounded-t-3xl pt-2 pb-6 px-4 shadow-xl z-10 border-t border-border max-h-[85vh] overflow-y-auto"
            style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
          >
            <div className="w-8 h-1 bg-stone-300 rounded-full mx-auto mb-5" />

            {/* Cabecera del Sheet indicando la Capa activa */}
            <div className="mb-4">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-xs font-bold text-forest-deep uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={13} className="text-forest-moss" />
                  {isNodeSpace
                    ? t('nav.nodeSpace', { defaultValue: 'Herramientas del Nodo' })
                    : t('nav.globalNetwork', { defaultValue: 'Red Viva Canarias' })}
                </span>
                <span className="text-[11px] text-stone-400">Kanarii</span>
              </div>
            </div>

            {/* Si está en el espacio del nodo: botón prioritario Volver a Red Canarias */}
            {isNodeSpace && (
              <button
                onClick={() => {
                  exitCommunitySpace();
                  setIsMoreMenuOpen(false);
                  navigate('/dashboard');
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-terracotta/10 text-terracotta text-xs font-bold border border-terracotta/20 mb-4 shadow-2xs hover:bg-terracotta/20 transition-colors cursor-pointer"
              >
                <ArrowLeft size={15} />
                <span>{t('nav.backToNetwork', { defaultValue: 'Volver a Red Canarias' })}</span>
              </button>
            )}

            {/* Selector de Comunidad en Móvil */}
            {hasCommunities && (
              <div className="bg-sand-light/50 border border-border rounded-2xl p-3 shadow-2xs mb-4">
                <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                  <MapPin size={10} className="text-terracotta" />
                  {t('nav.activeSpace', { defaultValue: 'Espacio de Nodo' })}
                </p>
                {userComunidades.length > 1 ? (
                  <div className="relative flex items-center group/sel">
                    <select
                      value={comunidad?.id || ''}
                      onChange={(e) => {
                        setCommunityId(e.target.value);
                        setIsMoreMenuOpen(false);
                      }}
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
            )}

            {/* Indicador de Sincronización en Móvil */}
            <div className="mb-4">
              <SyncIndicator />
            </div>

            {/* Lista de enlaces complementarios del menú Más */}
            <div className="flex flex-col space-y-1.5">
              {activeMoreItems.map((item, idx) => {
                const navLabel = item.labelKey ? t(item.labelKey as any, { defaultValue: item.label }) : item.label;
                const isItemActive = location.pathname.startsWith(item.href);

                return (
                  <button
                    key={idx}
                    onClick={() => handleNav(item.href, item.label)}
                    className={`w-full text-left px-4 py-3 rounded-2xl font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      isItemActive ? 'bg-forest-deep/10 text-forest-deep font-bold' : 'text-stone-700 hover:bg-sand-light'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-forest-moss" />
                      <span className="text-sm">{navLabel}</span>
                    </div>
                    {item.badge && item.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-terracotta text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {isNodeSpace && (
                <button
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    setIsModulesModalOpen(true);
                  }}
                  className="w-full text-left px-4 py-3 rounded-2xl font-semibold text-forest-deep hover:bg-sand-light transition-colors flex items-center gap-3 border border-dashed border-border cursor-pointer"
                >
                  <Plus className="w-5 h-5 text-terracotta" />
                  <span className="text-sm">{t('nav.activateModules', { defaultValue: 'Activar módulos' })}</span>
                </button>
              )}

              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="w-full text-center mt-3 px-4 py-3 rounded-2xl font-medium text-stone-500 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                {t('actions.cancel', { defaultValue: 'Cerrar' })}
              </button>
            </div>
          </div>
        </div>
      )}
      <CreateNewModal
        isOpen={isCreateNewOpen}
        onClose={() => setIsCreateNewOpen(false)}
      />

      <NodeModulesModal
        isOpen={isModulesModalOpen}
        onClose={() => setIsModulesModalOpen(false)}
        comunidad={comunidad}
      />
    </>
  );
}
