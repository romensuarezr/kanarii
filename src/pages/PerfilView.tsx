import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFicha } from '../hooks/useFicha';
import { useComunidad } from '../contexts/ComunidadContext';
import { User, Loader2, Sparkles, Edit2, FileText, Settings, Users, Globe, ArrowRight, ExternalLink } from 'lucide-react';
import PasaporteVisual from '../components/perfil/PasaporteVisual';
import { FichaReadOnly, getMergedDatosPersona } from '../components/perfil/FichaReadOnly';
import { getTriadaFromFicha } from '../lib/appService';
import { calcularKin } from '../lib/kinMaya';

export function PerfilView() {
  const { appUser } = useAuth();
  const { ficha, loading: loadingFicha } = useFicha();
  const { comunidades } = useComunidad();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'pasaporte' | 'ficha' | 'comunidades'>('pasaporte');

  if (loadingFicha || !appUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#8A817C]">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-sm font-medium">Cargando tu perfil...</p>
      </div>
    );
  }

  const triada = getTriadaFromFicha(ficha);
  const datos = getMergedDatosPersona(ficha);
  const kinMaya = datos?.fechaNacimiento
    ? calcularKin(datos.fechaNacimiento)
    : undefined;

  const mappedUser = {
    name: appUser.displayName || 'Miembro',
    avatarUrl: appUser.photoURL || undefined,
    roles: [appUser.role || 'user'],
    offerings: triada.ofrendas || [],
    knowledges: triada.saberes || [],
    needs: triada.necesidades || [],
    kinMaya,
    arquetipo: ficha?.perfilVisual?.arquetipo,
    descripcionArquetipo: ficha?.perfilVisual?.descripcion_arquetipo,
    communityIds: appUser.communityIds || [],
    instagram: datos.instagram,
    linkedin: datos.linkedin,
    website: datos.website,
    phone: datos.phone,
    email: datos.email,
  };

  const userComunidades = (appUser.communityIds || [])
    .map(id => comunidades.find(c => c.slug === id || c.id === id))
    .filter(Boolean);

  const avatarUrl = appUser.photoURL;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 pb-20">
      {/* Header Compacto del Perfil */}
      <header className="bg-white rounded-3xl p-6 md:p-8 border border-[#EAE2D6] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={appUser.displayName || ''}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#EAE2D6] shadow-xs"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-[#EAE2D6] flex items-center justify-center text-[#6B705C] border-2 border-[#EAE2D6]">
              <User className="w-8 h-8" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-[#4A4E4D]">
                {appUser.displayName || 'Miembro Kanarii'}
              </h1>
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#6B705C] bg-[#EAE2D6] rounded-full">
                {appUser.role || 'miembro'}
              </span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm mt-0.5">{appUser.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/ficha?edit=1"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#6B705C] hover:bg-[#5A5A40] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Editar ficha
          </Link>
          <Link
            to="/ajustes"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#F9F7F1] hover:bg-[#EAE2D6]/70 text-[#4A4E4D] border border-[#EAE2D6] rounded-xl text-xs font-semibold transition-all"
            title="Ajustes y privacidad"
          >
            <Settings className="w-3.5 h-3.5 text-[#6B705C]" />
            Ajustes
          </Link>
        </div>
      </header>

      {/* Navegación por Tabs (Segmented Controls) */}
      <div className="flex border-b border-[#EAE2D6] gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('pasaporte')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'pasaporte'
              ? 'border-[#6B705C] text-[#6B705C]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Pasaporte Cósmico
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ficha')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'ficha'
              ? 'border-[#6B705C] text-[#6B705C]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          Ficha Comunitaria
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('comunidades')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'comunidades'
              ? 'border-[#6B705C] text-[#6B705C]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Mis Comunidades ({userComunidades.length})
        </button>
      </div>

      {/* Tab 1: Pasaporte */}
      {activeTab === 'pasaporte' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <span className="text-xs text-stone-500">
              Vista interactiva de tu identidad cósmica y aportes a la tribu.
            </span>
            {appUser.uid && (
              <Link
                to={`/p/${appUser.uid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B705C] hover:text-[#4A4E4D] hover:underline"
              >
                <Globe className="w-3.5 h-3.5" />
                Ver mi pasaporte público universal
                <ExternalLink className="w-3 h-3" />
              </Link>
            )}
          </div>

          <PasaporteVisual
            user={mappedUser as any}
            privacidad={ficha?.privacidad}
            connectionStatus="self"
          />
        </div>
      )}

      {/* Tab 2: Ficha Comunitaria */}
      {activeTab === 'ficha' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-stone-500">
              Detalle completo de tu ficha de convivencia, ofrendas, saberes y necesidades.
            </span>
            <Link
              to="/ficha?edit=1"
              className="text-xs font-semibold text-[#6B705C] hover:text-[#4A4E4D] flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Editar datos
            </Link>
          </div>

          <FichaReadOnly
            ficha={ficha}
            onEdit={() => navigate('/ficha?edit=1')}
            showEditButton={false}
          />
        </div>
      )}

      {/* Tab 3: Mis Comunidades */}
      {activeTab === 'comunidades' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {userComunidades.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userComunidades.map(com => (
                <div
                  key={com?.id || com?.slug}
                  className="bg-white p-5 rounded-2xl border border-[#EAE2D6] shadow-2xs hover:border-[#6B705C]/40 transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-[#4A4E4D] text-base">{com?.nombre}</h3>
                    <p className="text-xs text-stone-500 line-clamp-2">{com?.descripcion || 'Comunidad en Kanarii'}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <span className="text-[11px] font-medium text-stone-400">
                      {typeof com?.ubicacion === 'string'
                        ? com.ubicacion
                        : (com?.ubicacion?.municipio || com?.ubicacion?.region || 'Canarias')}
                    </span>
                    <Link
                      to={`/c/${com?.slug || com?.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#6B705C] hover:text-[#4A4E4D]"
                    >
                      Entrar
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-[#EAE2D6] text-center space-y-4">
              <Users className="w-10 h-10 text-stone-300 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base text-[#4A4E4D]">Aún no perteneces a ninguna comunidad</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Explora las comunidades activas en Kanarii y solicita unirte para colaborar con tus saberes y ofrendas.
                </p>
              </div>
              <Link
                to="/comunidades"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B705C] hover:bg-[#5A5A40] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                Explorar Comunidades
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PerfilView;
