import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserFicha, getTriadaFromFicha, Ficha, getAppUserDoc } from '../../lib/appService';
import PasaporteVisual from './PasaporteVisual';
import { calcularKin } from '../../lib/kinMaya';
import { useTranslation } from 'react-i18next';

export interface PasaporteModalProps {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const DEMO_PASAPORTES: Record<string, { ficha: Ficha; user: any }> = {
  'demo-mateo': {
    user: { displayName: 'Mateo González', email: 'mateo@ejemplo.com' },
    ficha: {
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
      perfilVisual: {
        arquetipo: 'Constructor y Alquimista',
      },
      datosBrutos: {
        diseno_humano: {
          tipo: 'Proyector',
          autoridad: 'Emocional',
          perfil: '1/3',
        },
      },
    },
  },
  'demo-elena': {
    user: { displayName: 'Elena Morales', email: 'elena@ejemplo.com' },
    ficha: {
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
      perfilVisual: {
        arquetipo: 'Guardiana y Sanadora',
      },
      datosBrutos: {
        diseno_humano: {
          tipo: 'Generador',
          autoridad: 'Sacral',
          perfil: '2/4',
        },
      },
    },
  },
  'demo-yeray': {
    user: { displayName: 'Yeray Betancort', email: 'yeray@ejemplo.com' },
    ficha: {
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
      perfilVisual: {
        arquetipo: 'Estratega y Tejedor Tecnológico',
      },
      datosBrutos: {
        diseno_humano: {
          tipo: 'Generador Manifestante',
          autoridad: 'Sacral',
          perfil: '3/5',
        },
      },
    },
  },
};

export function PasaporteModal({ userId, isOpen, onClose }: PasaporteModalProps) {
  const { t } = useTranslation('passport');
  const navigate = useNavigate();

  const [ficha, setFicha] = useState<Ficha | null>(null);
  const [userDoc, setUserDoc] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !userId) {
      setFicha(null);
      setUserDoc(null);
      setError(null);
      return;
    }

    if (userId.startsWith('demo-') && DEMO_PASAPORTES[userId]) {
      setFicha(DEMO_PASAPORTES[userId].ficha);
      setUserDoc(DEMO_PASAPORTES[userId].user);
      setError(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    Promise.all([
      getUserFicha(userId),
      getAppUserDoc(userId)
    ])
      .then(([fichaData, userData]) => {
        if (!isMounted) return;
        setFicha(fichaData);
        setUserDoc(userData);
        if (!fichaData && !userData) {
          setError('El pasaporte solicitado no está disponible.');
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error('Error al cargar pasaporte para modal:', err);
        setError('Ocurrió un error al consultar el pasaporte.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, userId]);

  if (!isOpen) return null;

  const triada = ficha ? getTriadaFromFicha(ficha) : { ofrendas: [], saberes: [], necesidades: [] };
  const rolesArray: string[] = [];
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative bg-bg-page border border-border rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Header Barra Superior */}
          <div className="px-6 py-4 border-b border-border bg-bg-surface flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-mid">
                {t('card.quickView')}
              </span>
              <span className="text-stone-300">•</span>
              <span className="font-serif font-bold text-text-strong text-sm truncate max-w-[200px] sm:max-w-xs">
                {mappedUser.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {userId && (
                <button
                  onClick={() => {
                    onClose();
                    navigate(`/p/${userId}`);
                  }}
                  className="flex items-center gap-1.5 text-xs font-medium text-forest-deep hover:text-forest-mid bg-bg-page border border-border px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  title={t('card.openFullPage')}
                >
                  <ExternalLink size={13} />
                  <span className="hidden sm:inline">{t('card.openFullPage')}</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-1.5 text-text-ink/60 hover:text-text-strong hover:bg-bg-page rounded-xl transition-colors cursor-pointer"
                aria-label={t('card.close')}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Body / Scrollable Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-forest-mid space-y-3">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="text-sm font-medium">{t('card.quickView')}...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-brand-terracota" />
                <p className="text-sm font-medium text-text-strong">{error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <PasaporteVisual
                  user={mappedUser}
                  privacidad={ficha?.privacidad}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
