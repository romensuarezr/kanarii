import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertTriangle, Sparkles, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useComunidad } from '../contexts/ComunidadContext';
import { useToast } from '../hooks/useToast';
import { getUserFicha, getTriadaFromFicha, Ficha, getAppUserDoc } from '../lib/appService';
import PasaporteVisual from '../components/perfil/PasaporteVisual';
import { PasaporteShareModal } from '../components/perfil/PasaporteShareModal';
import { calcularKin } from '../lib/kinMaya';
import { useTranslation } from 'react-i18next';

export function PasaporteUniversalView() {
  const { t } = useTranslation('passport');
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();
  const { appUser: currentUser } = useAuth();
  const { setCommunityId } = useComunidad();
  const toast = useToast();

  const [ficha, setFicha] = useState<Ficha | null>(null);
  const [userDoc, setUserDoc] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!uid) {
        setError('ID de usuario no proporcionado.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [fichaData, userData] = await Promise.all([
          getUserFicha(uid),
          getAppUserDoc(uid)
        ]);

        setFicha(fichaData);
        setUserDoc(userData);

        if (!fichaData && !userData) {
          setError('El pasaporte solicitado no está disponible.');
        }
      } catch (err) {
        console.error('Error al cargar pasaporte universal:', err);
        setError('Ocurrió un error al consultar la información.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [uid]);

  // Construir mappedUser
  const triada = ficha ? getTriadaFromFicha(ficha) : { ofrendas: [], saberes: [], necesidades: [] };
  
  let rolesArray: string[] = [];
  if (ficha?.datosOnboarding?.rol_comunidad) {
    rolesArray.push(ficha.datosOnboarding.rol_comunidad);
  }

  const birthDate = ficha?.datosPersona?.fechaNacimiento || ficha?.datosOnboarding?.fechaNacimiento || userDoc?.fechaNacimiento;
  const kinMaya = birthDate ? calcularKin(birthDate) : undefined;

  const mappedUser = {
    name: userDoc?.nombre || userDoc?.displayName || ficha?.datosOnboarding?.nombre || 'Miembro',
    avatarUrl: userDoc?.photoURL || ficha?.datosOnboarding?.plataformaOrigen || undefined,
    roles: rolesArray,
    offerings: triada.ofrendas || [],
    knowledges: triada.saberes || [],
    needs: triada.necesidades || [],
    kinMaya,
    arquetipo: ficha?.perfilVisual?.arquetipo,
    descripcionArquetipo: ficha?.perfilVisual?.descripcion_arquetipo,
    communityIds: userDoc?.communityIds || [],
    instagram: ficha?.datosPersona?.instagram || ficha?.datosOnboarding?.instagram,
    linkedin: ficha?.datosPersona?.linkedin || ficha?.datosOnboarding?.linkedin,
    website: ficha?.datosPersona?.website || ficha?.datosOnboarding?.website,
    phone: ficha?.datosPersona?.phone || ficha?.datosOnboarding?.phone,
    email: ficha?.datosPersona?.email || ficha?.datosOnboarding?.email,
    telegram: ficha?.datosPersona?.telegram || ficha?.datosOnboarding?.telegram,
  };

  // Dinámica de Metatags OG
  useEffect(() => {
    if (!mappedUser.name || loading || error) return;

    const setMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const prevTitle = document.title;
    document.title = `${mappedUser.name} | Kanarii`;

    setMetaTag('og:title', `${mappedUser.name} en Kanarii`);
    setMetaTag('og:description', `Perfil de ${mappedUser.name}, miembro de comunidades en Kanarii.`);
    setMetaTag('og:url', window.location.href);
    setMetaTag('og:type', 'profile');
    if (mappedUser.avatarUrl) {
      setMetaTag('og:image', mappedUser.avatarUrl);
    }

    return () => {
      document.title = prevTitle;
      ['og:title', 'og:description', 'og:url', 'og:type', 'og:image'].forEach(prop => {
        const element = document.querySelector(`meta[property="${prop}"]`);
        if (element) {
          element.remove();
        }
      });
    };
  }, [mappedUser.name, mappedUser.avatarUrl, loading, error]);

  const isSelf = currentUser?.uid === uid;
  const connectionStatus = isSelf ? 'self' : 'none';

  const handleConnect = () => {
    if (!currentUser) {
      toast.info('Inicia sesión para conectar con este miembro.');
      navigate('/');
      return;
    }

    // Buscar una comunidad común
    const viewerCommunityIds = currentUser.communityIds || [];
    const memberCommunityIds = mappedUser.communityIds || [];
    const commonCommunityId = viewerCommunityIds.find((id: string) => memberCommunityIds.includes(id));

    if (commonCommunityId) {
      setCommunityId(commonCommunityId);
      navigate('/tablon', {
        state: { openNewPostWithMention: mappedUser.name }
      });
    } else {
      toast.info(`Para conectar con ${mappedUser.name}, debes compartir alguna comunidad.`);
      navigate('/comunidades');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFBF7] text-[#8A817C] p-4">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#A5A58D]" />
        <p className="font-medium font-serif">{t('universalTitle')}</p>
      </div>
    );
  }

  if (error || (!ficha && !userDoc)) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-stone-800">
        <div className="max-w-md w-full text-center space-y-6 bg-white border border-[#D2B48C]/15 rounded-[2.5rem] p-8 shadow-sm">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto text-rose-500 border border-rose-100 shadow-inner">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#3E2723]">{t('notFoundTitle')}</h1>
          <p className="text-stone-600 text-sm">
            {error || t('notFoundDesc')}
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 bg-[#5A5A40] hover:bg-[#4A4A35] text-white py-3.5 px-8 rounded-2xl font-bold text-sm transition-all shadow-md active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToHome')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/p/${uid}`;
  const shareText = `Conoce a ${mappedUser.name} en Kanarii: ${shareUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Conoce a ${mappedUser.name} en Kanarii`)}`;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 md:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl mb-6 flex justify-between items-center px-2">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B705C] hover:text-[#5A5A40] transition-colors"
        >
          <ArrowLeft size={14} />
          {t('backToMembers')}
        </button>
        <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#A5A58D]">
          <Sparkles size={12} />
          {t('universalTitle')}
        </div>
      </div>

      <PasaporteVisual 
        user={mappedUser} 
        privacidad={ficha?.privacidad}
        onConnect={handleConnect} 
        connectionStatus={connectionStatus}
      />

      {/* Compartir Pasaporte Section */}
      <div className="w-full max-w-xl mt-6 bg-white border border-[#D2B48C]/15 rounded-[24px] p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h4 className="text-sm font-serif font-bold text-[#3E2723]">{t('shareTitle')}</h4>
          <p className="text-xs text-[#5D4037]/60 mt-1">{t('shareDesc')}</p>
        </div>
        <button
          type="button"
          onClick={() => setIsShareModalOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#6B705C] hover:bg-[#5A5A40] text-white py-2.5 px-6 rounded-xl font-bold text-xs transition-all active:scale-95 shadow-xs"
        >
          <Share2 size={16} />
          <span>Compartir Pasaporte</span>
        </button>
      </div>

      <PasaporteShareModal
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        userName={mappedUser.name}
        url={shareUrl}
        role={rolesArray[0] || 'Miembro'}
        kinDesc={kinMaya?.descripcionCorta}
        photoUrl={mappedUser.avatarUrl}
      />
    </div>
  );
}
