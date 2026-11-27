import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useComunidad } from '../contexts/ComunidadContext';
import { useFicha } from '../hooks/useFicha';
import { User, Edit2, Check, X, Fingerprint, Sparkles, Users, HeartPulse, History, RefreshCw, Loader2, MapPin, LogOut, Eye, Copy, Download, ArrowLeft, Globe } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { saveFicha, saveManual, saveResumenManual, DatosOnboarding, getComunidades, Comunidad, getTriadaFromFicha, Ficha, FichaDatosPersona, PRIVACIDAD_DEFAULT } from '../lib/appService';
import Markdown from 'react-markdown';
import { ManualSeccionesViewer } from '../components/ManualSeccionesViewer';
import { FichaReadOnly, getMergedDatosPersona } from '../components/perfil/FichaReadOnly';
import { normalizePhone } from '../lib/phone';
import { geocodeLugar } from '../lib/geocoding';
import { useComunidadActions } from '../hooks/useComunidadActions';
import { useTagArray } from '../hooks/useTagArray';
import { TagArrayEditor } from '../components/ui/TagArrayEditor';
import { FieldError } from '../components/ui/FieldError';
import { calcularKin } from '../lib/kinMaya';
import { useToast } from '../hooks/useToast';
import { generateManualPdf, convertMarkdownToHtml, PdfSection } from '../lib/utils/generatePdf';
import { useTranslation } from 'react-i18next';

const SECCIONES_MANUAL = [
  { id: 'adn_astral', label: 'ADN Astral', icon: '✨' },
  { id: 'anatomia_poder', label: 'Anatomía del Poder', icon: '👑' },
  { id: 'espejo_tribu', label: 'Espejo de la Tribu', icon: '👥' },
  { id: 'sintonia_cnv', label: 'Sintonía (CNV)', icon: '💬' },
  { id: 'mantenimiento_crisis', label: 'Mantenimiento y Crisis', icon: '🚨' }
] as const;

const fichaSchema = z.object({
  nombre: z.string().min(1, 'Requerido'),
  fechaNacimiento: z.string().min(1, 'Requerido'),
  hora: z.string().min(1, 'Requerido'),
  lugar: z.string().min(1, 'Requerido'),
  genero: z.string().min(1, 'Requerido'),
  saberes: z.string().min(1, 'Requerido'),
  headline: z.string().max(45, 'Máximo 45 caracteres').optional(),
  rol_comunidad: z.string().min(1, 'Requerido'),
  antiguedad_anos: z.preprocess((val) => Number(val), z.number()),
  tension: z.string().min(1, 'Requerido'),
  latitud: z.preprocess((val) => val === undefined ? undefined : Number(val), z.number().optional()),
  longitud: z.preprocess((val) => val === undefined ? undefined : Number(val), z.number().optional()),
  timezone: z.string().optional(),
  rol: z.string().optional(),
  fechaLlegada: z.string().optional(),
  fechaSalida: z.string().optional(),
  habilidadesVoluntario: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  telegram: z.string().optional()
});

type FichaFormData = z.infer<typeof fichaSchema>;

export function FichaView() {
  const { appUser, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation('passport');
  const currentLocale = i18n.language === 'en' ? 'en' : 'es';
  const { 
    ficha, 
    loadingFicha, 
    reload,
    manualSecciones,
    seccionesLoading,
    isGeneratingResumen,
    generarSeccionLazy
  } = useFicha();
  const [editing, setEditing] = useState(false);
  const [localFicha, setLocalFicha] = useState(ficha);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fichaEditadaDesdeGeneracion, setFichaEditadaDesdeGeneracion] = useState(false);
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [geoMessage, setGeoMessage] = useState('');
  const { comunidad, currentCommunityId } = useComunidad();
  const [copied, setCopied] = useState(false);
  const [activeManualTab, setActiveManualTab] = useState<'adn_astral' | 'anatomia_poder' | 'espejo_tribu' | 'sintonia_cnv' | 'mantenimiento_crisis'>('adn_astral');

  const toast = useToast();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const hasShownToastRef = useRef<boolean>(false);

  const { abandonarComunidad } = useComunidadActions();

  const handleCopyPasaporteUrl = () => {
    if (!comunidad?.slug || !appUser?.uid) return;
    const url = `${window.location.origin}/c/${comunidad.slug}/miembro/${appUser.uid}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleTogglePrivacidad = async (key: string) => {
    if (!appUser || !displayFicha) return;
    const currentPrivacidad = displayFicha.privacidad || PRIVACIDAD_DEFAULT;
    const nuevaPrivacidad = {
      ...currentPrivacidad,
      [key]: !currentPrivacidad[key as keyof typeof currentPrivacidad]
    };
    const updatedFicha = {
      ...displayFicha,
      privacidad: nuevaPrivacidad
    };

    setLocalFicha(updatedFicha);

    try {
      const triadaObj = {
        ofrendas: ofrendasState.tags,
        saberes: saberesState.tags,
        necesidades: necesidadesState.tags
      };
      await saveFicha(appUser.uid, datos as any, displayFicha.id || appUser.uid, true, triadaObj, nuevaPrivacidad);

      const { sincronizarPasaporte } = await import('../lib/pasaporte');
      await sincronizarPasaporte(updatedFicha, appUser.uid, appUser.displayName || undefined, appUser.photoURL || undefined);
      toast.success("Ajustes de privacidad sincronizados con tu Pasaporte");
    } catch (e) {
      console.error("Error al guardar privacidad:", e);
      toast.error("Error al guardar los ajustes de privacidad");
    }
  };
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveStep, setLeaveStep] = useState<1 | 2 | 3>(1);
  const [leaveCommunityId, setLeaveCommunityId] = useState('');
  const [leaveMotivo, setLeaveMotivo] = useState('');
  const [leaveComentario, setLeaveComentario] = useState('');
  const [userCommunities, setUserCommunities] = useState<Comunidad[]>([]);
  const [loadingCommunities, setLoadingCommunities] = useState(false);

  const { register, handleSubmit, getValues, setValue, watch, formState: { errors, isSubmitting }, reset } = useForm<FichaFormData>({
    // @ts-ignore
    resolver: zodResolver(fichaSchema),
    defaultValues: getMergedDatosPersona(ficha) as FichaFormData
  });

  const watchRol = watch("rol");

  const displayFicha = localFicha || ficha;
  const datos = getMergedDatosPersona(displayFicha);
  const triada = getTriadaFromFicha(displayFicha);

  const resumen = displayFicha?.resumenManual as any;
  const secciones = resumen?.secciones || {};
  const todasGeneradas = SECCIONES_MANUAL.every(sec => {
    const uid = appUser?.uid || displayFicha?.userId || displayFicha?.id || '';
    const enFirestore = !!secciones[sec.id]?.narrativa;
    const enMemoria = !!manualSecciones[sec.id];
    const enCache = uid ? !!sessionStorage.getItem(`manual_${uid}_${sec.id}`) : false;
    return enFirestore || enMemoria || enCache;
  });

  useEffect(() => {
    if (loadingFicha || !displayFicha?.resumenManual || hasShownToastRef.current) return;

    if (!todasGeneradas) {
      toast.info("Visita cada pestaña para generar tu manual. Podrás descargarlo en PDF cuando estén todas listas.");
      hasShownToastRef.current = true;
    }
  }, [loadingFicha, displayFicha, todasGeneradas, toast]);

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      const nombreMiembro = datos?.nombreCompleto || appUser?.displayName || 'Miembro de Kanarii';
      const arquetipo = displayFicha?.perfilVisual?.arquetipo || 'Miembro';
      const fecha = new Date().toLocaleDateString('es-ES');

      const secciones: PdfSection[] = SECCIONES_MANUAL.map(sec => {
        const uid = appUser?.uid || displayFicha?.userId || displayFicha?.id || '';
        const enFirestore = (displayFicha?.resumenManual as any)?.secciones?.[sec.id]?.narrativa || '';
        const enMemoria = manualSecciones[sec.id] || '';
        const enCache = uid ? sessionStorage.getItem(`manual_${uid}_${sec.id}`) || '' : '';
        const narrativa = enFirestore || enMemoria || enCache;
        const contenidoHtml = convertMarkdownToHtml(narrativa);
        return {
          titulo: sec.label,
          contenidoHtml
        };
      });

      generateManualPdf({
        nombreMiembro,
        arquetipo,
        fecha,
        secciones
      });
      
      toast.success("¡Preparando documento para imprimir/guardar como PDF!");
    } catch (err) {
      console.error("Error al generar PDF:", err);
      toast.error("Hubo un error al preparar el PDF del manual.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  useEffect(() => {
    if (displayFicha?.resumenManual) {
      generarSeccionLazy(activeManualTab);
    }
  }, [activeManualTab, displayFicha?.resumenManual, generarSeccionLazy]);

  const ofrendasState = useTagArray(getTriadaFromFicha(ficha).ofrendas);
  const saberesState = useTagArray(getTriadaFromFicha(ficha).saberes);
  const necesidadesState = useTagArray(getTriadaFromFicha(ficha).necesidades);

  // Calcular Kin Maya personal si hay fecha de nacimiento
  const kinMaya = datos?.fechaNacimiento ? calcularKin(datos.fechaNacimiento) : null;

  useEffect(() => {
    if (displayFicha) {
      const triadaObj = getTriadaFromFicha(displayFicha);
      ofrendasState.setTags(triadaObj.ofrendas || []);
      saberesState.setTags(triadaObj.saberes || []);
      necesidadesState.setTags(triadaObj.necesidades || []);
    }
  }, [displayFicha]);

  const handleVerificarUbicacion = async () => {
    const lugarStr = getValues("lugar");
    if (!lugarStr) return;
    
    setGeoStatus('loading');
    setGeoMessage('');
    try {
      const geoResult = await geocodeLugar(lugarStr);
      setValue('latitud', geoResult.latitud);
      setValue('longitud', geoResult.longitud);
      setValue('timezone', geoResult.timezone);
      setValue('lugar', geoResult.lugarNormalizado);
      setGeoStatus('success');
      setGeoMessage(`✓ ${geoResult.lugarNormalizado} (${geoResult.latitud}, ${geoResult.longitud})`);
    } catch (e: any) {
      setGeoStatus('error');
      setGeoMessage(e.message || "No se encontró esta ubicación, intenta ser más específico");
    }
  };

  useEffect(() => {
    if (!loadingFicha && !ficha && !localFicha) {
      navigate('/onboarding');
    } else if (ficha) {
      setLocalFicha(ficha);
      reset(getMergedDatosPersona(ficha) as FichaFormData);
    }
  }, [ficha, loadingFicha]);

  // Abrir directamente en modo edición al llegar desde /perfil ("Editar ficha")
  useEffect(() => {
    if (!loadingFicha && searchParams.get('edit') === '1') {
      setEditing(true);
      const next = new URLSearchParams(searchParams);
      next.delete('edit');
      setSearchParams(next, { replace: true });
    }
  }, [loadingFicha, searchParams, setSearchParams]);

  useEffect(() => {
    if (showLeaveModal && appUser?.communityIds) {
      setLoadingCommunities(true);
      getComunidades().then(comms => {
        const filtered = comms.filter(c => appUser.communityIds?.includes(c.id));
        setUserCommunities(filtered);
        
        // Auto-seleccionar la comunidad actual
        if (currentCommunityId && appUser.communityIds.includes(currentCommunityId)) {
          setLeaveCommunityId(currentCommunityId);
        } else if (filtered.length > 0) {
          setLeaveCommunityId(filtered[0].id);
        }
        
        // Si pertenece a 1 sola comunidad, salta directamente al paso 2
        if (appUser.communityIds.length <= 1) {
          setLeaveStep(2);
        } else {
          setLeaveStep(1);
        }
        setLoadingCommunities(false);
      }).catch(err => {
        console.error("Failed to load user communities:", err);
        setLoadingCommunities(false);
      });
    }
  }, [showLeaveModal, appUser, displayFicha]);

  if (loadingFicha || (!ficha && !localFicha)) return null;

  const handleLeaveCommunity = async () => {
    if (!appUser || !leaveCommunityId) return;
    
    const feedback = {
      motivo: leaveMotivo,
      comentario: leaveComentario
    };
    
    setShowLeaveModal(false);
    await abandonarComunidad(appUser.uid, leaveCommunityId, feedback, {
      onSuccess: () => {
        navigate('/comunidades');
      }
    });
  };

  const onSubmit = async (data: FichaFormData) => {
    if (!appUser) return;
    const fichaId = displayFicha?.id || appUser.uid;
    
    const triadaObj = {
      ofrendas: ofrendasState.tags,
      saberes: saberesState.tags,
      necesidades: necesidadesState.tags
    };

    const sanitizedData: FichaFormData = {
      ...data,
      phone: data.phone ? normalizePhone(data.phone) : data.phone
    };

    await saveFicha(appUser.uid, sanitizedData as DatosOnboarding, fichaId, true, triadaObj);
    setLocalFicha({ 
      ...displayFicha, 
      id: fichaId,
      datosPersona: sanitizedData as FichaDatosPersona, 
      datosOnboarding: undefined,
      triada: triadaObj
    });
    setEditing(false);
    if (displayFicha?.manualGenerado) {
      setFichaEditadaDesdeGeneracion(true);
    }
  };

  const handleRegenerateManual = async () => {
    if (!appUser || !datos) return;
    const fichaId = displayFicha?.id || appUser.uid;
    setIsGenerating(true);
    const triadaObj = {
      ofrendas: ofrendasState.tags,
      saberes: saberesState.tags,
      necesidades: necesidadesState.tags
    };
    try {
      await saveFicha(appUser.uid, datos as DatosOnboarding, fichaId, false, triadaObj);
      await saveResumenManual(appUser.uid, null, '');
      reload();
    } catch (e) {
      console.error("Failed to generate manual:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  const contenidoManual = displayFicha?.manualMarkdown ?? displayFicha?.manualGenerado ?? null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 p-6 flex flex-col items-center pb-20 md:pb-6">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <User className="text-[#6B705C] w-8 h-8" />
            <h1 className="text-3xl font-serif text-[#4A4E4D]">{t('myPassportTitle')}</h1>
          </div>
          <Link
            to="/perfil"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6B705C] hover:text-[#4A4E4D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('labels.myProfile')}
          </Link>
        </div>

        {!editing ? (
          <FichaReadOnly
            ficha={displayFicha}
            onEdit={() => setEditing(true)}
            showEditButton={true}
            comunidadSlug={comunidad?.slug}
            appUserUid={appUser?.uid}
            onLeaveCommunity={() => setShowLeaveModal(true)}
            hasCommunities={!!(appUser?.communityIds && appUser.communityIds.length > 0)}
          />
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-[#EAE2D6] p-8 relative overflow-hidden mb-8">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#CB997E]"></div>
            <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif text-[#4A4E4D]">{t('form.editFichaTitle')}</h2>
                <button type="button" onClick={() => setEditing(false)} className="text-stone-500 hover:text-stone-800">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-600">{t('form.name')}</label>
                  <input {...register("nombre")} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-3 px-4 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A5A58D]" />
                  <FieldError error={errors.nombre} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-600">{t('form.birthDate')}</label>
                  <input type="date" {...register("fechaNacimiento")} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-3 px-4 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A5A58D]" />
                  <FieldError error={errors.fechaNacimiento} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-600">{t('form.birthTime')}</label>
                  <input type="time" {...register("hora")} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-3 px-4 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A5A58D]" />
                  <FieldError error={errors.hora} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-600">{t('form.birthPlace')}</label>
                  <div className="relative">
                    <input type="text" placeholder={t('form.birthPlacePlaceholder')} {...register("lugar", { onBlur: handleVerificarUbicacion })} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-3 px-4 pr-12 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A5A58D]" />
                    <button type="button" onClick={handleVerificarUbicacion} disabled={geoStatus === 'loading'} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-stone-400 hover:text-stone-600 bg-transparent rounded-lg">
                      {geoStatus === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
                    </button>
                  </div>
                  {geoMessage && (
                    <p className={`text-xs mt-1 ${geoStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {geoMessage}
                    </p>
                  )}
                  <FieldError error={errors.lugar} />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-600">{t('form.gender')}</label>
                  <select {...register("genero")} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-3 px-4 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A5A58D]">
                    <option value="hombre">{t('form.genders.male')}</option>
                    <option value="mujer">{t('form.genders.female')}</option>
                    <option value="no binario">{t('form.genders.nonBinary')}</option>
                    <option value="prefiero no decirlo">{t('form.genders.preferNotToSay')}</option>
                  </select>
                  <FieldError error={errors.genero} />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-600">{t('form.antiquity')}</label>
                  <select {...register("antiguedad_anos", { valueAsNumber: true })} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-3 px-4 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A5A58D]">
                    <option value={0}>{t('form.antiquities.recent')}</option>
                    <option value={0.5}>{t('form.antiquities.under1Year')}</option>
                    <option value={1}>{t('form.antiquities.year1')}</option>
                    <option value={2}>{t('form.antiquities.years2')}</option>
                    <option value={3}>{t('form.antiquities.years3')}</option>
                    <option value={4}>{t('form.antiquities.years4')}</option>
                    <option value={5}>{t('form.antiquities.years5Plus')}</option>
                  </select>
                  <FieldError error={errors.antiguedad_anos} />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-stone-600">{t('form.skillsJourney')}</label>
                  <textarea {...register("saberes")} rows={4} placeholder={t('form.skillsJourneyPlaceholder')} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-3 px-4 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A5A58D]" />
                  <FieldError error={errors.saberes} />
                </div>

                <div className="space-y-4 md:col-span-2 border-t border-[#EAE2D6] pt-4 mt-2">
                  <h3 className="text-lg font-serif text-[#4A4E4D]">{t('form.structuredTriad')}</h3>
                  <p className="text-xs text-stone-500">
                    {t('form.structuredTriadDesc')}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TagArrayEditor
                      value={ofrendasState.tags}
                      onChange={ofrendasState.setTags}
                      label={t('form.offers')}
                      placeholder={t('form.offersPlaceholder')}
                      colorScheme="green"
                    />
                    
                    <TagArrayEditor
                      value={saberesState.tags}
                      onChange={saberesState.setTags}
                      label={t('form.skills')}
                      placeholder={t('form.skillsPlaceholder')}
                      colorScheme="blue"
                      helperText={t('form.skills')}
                    />
                    
                    <TagArrayEditor
                      value={necesidadesState.tags}
                      onChange={necesidadesState.setTags}
                      label={t('form.needs')}
                      placeholder={t('form.needsPlaceholder')}
                      colorScheme="orange"
                    />
                  </div>
                </div>

                <div className="space-y-4 md:col-span-2 border-t border-[#EAE2D6] pt-4 mt-2">
                  <h3 className="text-lg font-serif text-[#4A4E4D]">{t('form.socialAndContact')}</h3>
                  <p className="text-xs text-stone-500">
                    {t('form.socialAndContactDesc')}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-stone-600">{t('form.social.instagram')}</label>
                      <input {...register("instagram")} placeholder={t('form.social.instagramPlaceholder')} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-2.5 px-3 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#A5A58D]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-stone-600">{t('form.social.linkedin')}</label>
                      <input {...register("linkedin")} placeholder={t('form.social.linkedinPlaceholder')} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-2.5 px-3 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#A5A58D]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-stone-600">{t('form.social.telegram')}</label>
                      <input {...register("telegram")} placeholder={t('form.social.telegramPlaceholder')} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-2.5 px-3 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#A5A58D]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-stone-600">{t('form.social.website')}</label>
                      <input {...register("website")} placeholder={t('form.social.websitePlaceholder')} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-2.5 px-3 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#A5A58D]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-stone-600">{t('form.social.phone')}</label>
                      <input {...register("phone")} placeholder={t('form.social.phonePlaceholder')} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-2.5 px-3 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#A5A58D]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-stone-600">{t('form.social.email')}</label>
                      <input {...register("email")} placeholder={t('form.social.emailPlaceholder')} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-2.5 px-3 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#A5A58D]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-stone-600">{t('form.tensionTitle')}</label>
                  <textarea {...register("tension")} rows={4} placeholder={t('form.tensionPlaceholder')} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-3 px-4 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A5A58D]" />
                  <FieldError error={errors.tension} />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-600">{t('form.headlineTitle')}</label>
                  <input
                    type="text"
                    maxLength={45}
                    {...register("headline")}
                    placeholder={t('form.headlinePlaceholder')}
                    className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-3 px-4 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A5A58D]"
                  />
                  <FieldError error={errors.headline} />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-600">{t('form.kanariiRoleTitle')}</label>
                  <textarea {...register("rol_comunidad")} rows={4} placeholder={t('form.kanariiRolePlaceholder')} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-3 px-4 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A5A58D]" />
                  <FieldError error={errors.rol_comunidad} />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-600">{t('form.roleTitle')}</label>
                  <select {...register("rol")} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-3 px-4 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A5A58D]">
                    <option value="propietario">{t('form.roles.owner')}</option>
                    <option value="miembro">{t('form.roles.member')}</option>
                    <option value="voluntario">{t('form.roles.volunteer')}</option>
                  </select>
                  <FieldError error={errors.rol} />
                </div>

                {watchRol === 'voluntario' && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-stone-600">{t('form.departureDate')}</label>
                    <input type="date" {...register("fechaSalida")} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-3 px-4 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A5A58D]" />
                  </div>
                )}
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#A5A58D] hover:bg-[#6B705C] text-white py-3 px-8 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  {isSubmitting ? t('preview.saving') : <><Check className="w-5 h-5"/> {t('form.saveChanges')}</>}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Panel de Privacidad */}
        {!editing && (
          <div className="bg-white rounded-3xl shadow-sm border border-[#EAE2D6] p-8 relative overflow-hidden mb-8">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#A5A58D]"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <Eye className="text-[#6B705C] w-6 h-6" />
              <h3 className="text-xl font-serif text-[#4A4E4D]">{t('privacy.title')}</h3>
            </div>
            
            <p className="text-stone-500 text-sm mb-6 leading-relaxed">
              {t('privacy.desc')}
            </p>
            
            <div className="space-y-4">
              {[
                { key: 'arquetipo', label: t('privacy.dimensions.arquetipo.label'), desc: t('privacy.dimensions.arquetipo.desc') },
                { key: 'disenoHumano', label: t('privacy.dimensions.disenoHumano.label'), desc: t('privacy.dimensions.disenoHumano.desc') },
                { key: 'kinMaya', label: t('privacy.dimensions.kinMaya.label'), desc: t('privacy.dimensions.kinMaya.desc') },
                { key: 'datosAstrologicos', label: t('privacy.dimensions.datosAstrologicos.label'), desc: t('privacy.dimensions.datosAstrologicos.desc') },
                { key: 'manualCompleto', label: t('privacy.dimensions.manualCompleto.label'), desc: t('privacy.dimensions.manualCompleto.desc') }
              ].map(({ key, label, desc }) => {
                const privacidad = displayFicha?.privacidad || PRIVACIDAD_DEFAULT;
                const isEnabled = privacidad[key as keyof typeof privacidad] ?? true;
                return (
                  <div key={key} className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[#F9F7F1] border border-[#EAE2D6] transition-all duration-200">
                    <div className="flex-1 min-w-0">
                      <span className="font-serif font-medium text-stone-800 text-sm md:text-base">{label}</span>
                      <p className="text-stone-500 text-xs md:text-sm mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTogglePrivacidad(key)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isEnabled ? 'bg-[#6B705C]' : 'bg-stone-300'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-[#EAE2D6]">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="text-[#CB997E] w-5 h-5" />
                <h4 className="text-base font-serif font-bold text-[#4A4E4D]">{t('privacy.socialChannelsTitle')}</h4>
              </div>
              <p className="text-stone-500 text-xs mb-4">
                {t('privacy.socialChannelsDesc')}
              </p>
              
              <div className="space-y-3">
                {[
                  { key: 'instagram', label: t('privacy.channels.instagram.label'), desc: t('privacy.channels.instagram.desc') },
                  { key: 'linkedin', label: t('privacy.channels.linkedin.label'), desc: t('privacy.channels.linkedin.desc') },
                  { key: 'telegram', label: t('privacy.channels.telegram.label'), desc: t('privacy.channels.telegram.desc') },
                  { key: 'website', label: t('privacy.channels.website.label'), desc: t('privacy.channels.website.desc') },
                  { key: 'phone', label: t('privacy.channels.phone.label'), desc: t('privacy.channels.phone.desc') },
                  { key: 'email', label: t('privacy.channels.email.label'), desc: t('privacy.channels.email.desc') }
                ].map(({ key, label, desc }) => {
                  const privacidad = displayFicha?.privacidad || PRIVACIDAD_DEFAULT;
                  const isEnabled = privacidad[key as keyof typeof privacidad] ?? (key === 'phone' || key === 'email' ? false : true);
                  return (
                    <div key={key} className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[#F9F7F1] border border-[#EAE2D6] transition-all duration-200">
                      <div className="flex-1 min-w-0">
                        <span className="font-serif font-medium text-stone-800 text-sm md:text-base">{label}</span>
                        <p className="text-stone-500 text-xs md:text-sm mt-0.5 leading-relaxed">{desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleTogglePrivacidad(key)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          isEnabled ? 'bg-[#6B705C]' : 'bg-stone-300'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            isEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Manual Galáctico Section */}
        {isGeneratingResumen || (displayFicha?.perfilVisual?.arquetipo && !displayFicha?.resumenManual) ? (
          <div className="bg-white rounded-3xl shadow-sm border border-[#EAE2D6] p-8 relative overflow-hidden flex flex-col items-center justify-center text-center">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#8A817C]"></div>
            <div className="w-16 h-16 bg-[#F9F7F1] rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-[#8A817C] animate-pulse" />
            </div>
            <h2 className="text-2xl font-serif text-[#4A4E4D] mb-2">{t('manual.structuring')}</h2>
            <p className="text-stone-500 max-w-md mx-auto mb-6">
              {t('manual.structuringDesc')}
            </p>
            <div className="flex items-center gap-3 px-6 py-3 bg-[#F9F7F1] text-stone-500 rounded-full font-medium">
              <Loader2 className="w-5 h-5 animate-spin text-[#8A817C]" />
              <span>{t('manual.weavingStructure')}</span>
            </div>
          </div>
        ) : displayFicha?.resumenManual ? (
          <div className="bg-white rounded-3xl shadow-sm border border-[#EAE2D6] p-5 sm:p-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-2 h-full bg-[#8A817C]"></div>
             
             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                <div className="flex items-center gap-3 text-[#4A4E4D]">
                  <Sparkles className="w-7 h-7 text-[#8A817C] shrink-0" />
                  <h2 className="text-xl sm:text-2xl font-serif">{t('manual.title')}</h2>
                </div>
                
                <div className="flex flex-wrap items-center gap-2.5">
                  {todasGeneradas && (
                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      disabled={isGeneratingPdf}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-100 transition-colors shadow-sm disabled:opacity-50"
                    >
                      {isGeneratingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      <span className="text-sm font-medium">
                        {isGeneratingPdf ? t('manual.generatingPdf') : t('manual.downloadPdf')}
                      </span>
                    </button>
                  )}

                  <button
                    onClick={handleRegenerateManual}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F9F7F1] text-stone-700 rounded-full hover:bg-[#EAE2D6] transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    <span className="text-sm font-medium">{t('manual.regenerate')}</span>
                  </button>
                </div>
             </div>

             <ManualSeccionesViewer
               ficha={displayFicha}
               manualSecciones={manualSecciones}
               seccionesLoading={seccionesLoading}
               generarSeccionLazy={generarSeccionLazy}
             />
             
             {displayFicha.fechaGeneracion && (
                <div className="mt-8 pt-6 border-t border-[#EAE2D6] flex justify-between items-center text-sm text-stone-400">
                  <span>{t('manual.generatedBy')}</span>
                  <span>
                    {t('manual.onDate')} {new Date(displayFicha.fechaGeneracion.toDate ? displayFicha.fechaGeneracion.toDate() : displayFicha.fechaGeneracion).toLocaleDateString()}
                  </span>
                </div>
             )}
          </div>
        ) : contenidoManual ? (
          <div className="bg-white rounded-3xl shadow-sm border border-[#EAE2D6] p-5 sm:p-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-2 h-full bg-[#8A817C]"></div>
             
             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                <div className="flex items-center gap-3 text-[#4A4E4D]">
                  <Sparkles className="w-7 h-7 text-[#8A817C]" />
                  <h2 className="text-2xl font-serif">{t('manual.legacyTitle')}</h2>
                </div>
                
                <button
                  onClick={handleRegenerateManual}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 bg-[#F9F7F1] text-stone-700 rounded-full hover:bg-[#EAE2D6] transition-colors shadow-sm disabled:opacity-50"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  <span className="text-sm font-medium">{t('manual.updateFormat')}</span>
                </button>
             </div>

              {contenidoManual && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-stone-700 font-mono text-sm whitespace-pre-wrap">
                  {contenidoManual}
                </div>
              )}
             
             {displayFicha.fechaGeneracion && (
                <div className="mt-8 pt-6 border-t border-[#EAE2D6] flex justify-between items-center text-sm text-stone-400">
                  <span>{t('manual.generatedBy')}</span>
                  <span>
                    {t('manual.onDate')} {new Date(displayFicha.fechaGeneracion.toDate ? displayFicha.fechaGeneracion.toDate() : displayFicha.fechaGeneracion).toLocaleDateString()}
                  </span>
                </div>
             )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-[#EAE2D6] p-8 relative overflow-hidden flex flex-col items-center justify-center text-center">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#8A817C]"></div>
            
            <div className="w-16 h-16 bg-[#F9F7F1] rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-[#8A817C]" />
            </div>
            
            <h2 className="text-2xl font-serif text-[#4A4E4D] mb-2">{t('manual.readyTitle')}</h2>
            <p className="text-stone-500 max-w-md mx-auto mb-8">
              {t('manual.readyDesc')}
            </p>
            
            {isGenerating ? (
              <div className="flex items-center gap-3 px-6 py-3 bg-[#F9F7F1] text-stone-500 rounded-full font-medium">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t('manual.weaving')}</span>
              </div>
            ) : (
              <button
                onClick={handleRegenerateManual}
                className="bg-[#A5A58D] hover:bg-[#6B705C] text-white py-3 px-8 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>{t('manual.generateBtn')}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {showLeaveModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-[#EAE2D6] shadow-2xl relative overflow-hidden animate-scaleIn flex flex-col max-h-[90vh]">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#CB997E]"></div>
            
            {/* Header del modal */}
            <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-xl font-serif text-stone-900">{t('leave.title')}</h3>
                <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mt-1">{t('leave.stepOf', { current: leaveStep, total: 3 })}</p>
              </div>
              <button 
                onClick={() => {
                  setShowLeaveModal(false);
                  setLeaveStep(1);
                  setLeaveMotivo('');
                  setLeaveComentario('');
                }} 
                className="p-1.5 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido según el paso */}
            <div className="flex-1 overflow-y-auto pr-1">
              {leaveStep === 1 && (
                <div className="space-y-4">
                  <div className="text-sm text-stone-600 mb-2">
                    {t('leave.whichCommunity')}
                  </div>
                  {loadingCommunities ? (
                    <div className="flex flex-col items-center justify-center py-12 text-stone-400">
                      <Loader2 className="w-8 h-8 animate-spin mb-2" />
                      <span className="text-sm">{t('leave.loadingCommunities')}</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {userCommunities.map(comm => (
                        <label 
                          key={comm.id} 
                          className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                            leaveCommunityId === comm.id 
                              ? 'border-[#CB997E] bg-[#FDFBF7] shadow-sm' 
                              : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="leave-community" 
                            checked={leaveCommunityId === comm.id}
                            onChange={() => setLeaveCommunityId(comm.id)}
                            className="text-[#CB997E] focus:ring-[#CB997E] h-4 w-4 border-stone-300"
                          />
                          <div className="flex-1">
                            <span className="font-serif font-medium text-stone-800 text-base">{comm.nombre}</span>
                            {comm.descripcion && (
                              <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">{comm.descripcion}</p>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {leaveStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-stone-600">
                      {t('leave.motiveExplanation')}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-1">{t('leave.motiveRequired')}</label>
                    <div className="grid grid-cols-1 gap-2.5">
                      {((t('leave.motives', { returnObjects: true }) as string[]) || []).map((motivo) => (
                        <button
                          key={motivo}
                          type="button"
                          onClick={() => setLeaveMotivo(motivo)}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                            leaveMotivo === motivo
                              ? 'bg-[#4A4E4D] text-white border-[#4A4E4D]'
                              : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          {motivo}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-1">{t('leave.commentOptional')}</label>
                    <textarea
                      value={leaveComentario}
                      onChange={(e) => setLeaveComentario(e.target.value)}
                      rows={3}
                      placeholder={t('leave.commentPlaceholder')}
                      className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-3 px-4 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A5A58D] text-sm resize-none"
                    />
                  </div>
                </div>
              )}

              {leaveStep === 3 && (
                <div className="space-y-6 text-center py-4">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                    <LogOut className="w-8 h-8 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-stone-900 mb-2">{t('leave.confirmTitle')}</h4>
                    <p className="text-sm text-stone-500 max-w-sm mx-auto">
                      {t('leave.confirmDesc')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer del modal */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-stone-100">
              {leaveStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setLeaveStep(prev => (prev - 1) as 1 | 2 | 3)}
                  className="px-4 py-2 text-stone-500 hover:text-stone-800 text-sm font-medium transition-colors"
                >
                  {t('leave.back')}
                </button>
              ) : (
                <div />
              )}
              
              {leaveStep < 3 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (leaveStep === 2 && !leaveMotivo) return;
                    setLeaveStep(prev => (prev + 1) as 1 | 2 | 3);
                  }}
                  disabled={leaveStep === 2 && !leaveMotivo}
                  className="px-6 py-2 bg-[#4A4E4D] text-white rounded-xl text-sm font-medium hover:bg-[#363a39] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t('leave.continue')}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLeaveCommunity}
                  className="px-6 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  {t('leave.confirmLeave')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
