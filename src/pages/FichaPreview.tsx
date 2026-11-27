import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Fingerprint, Sparkles, Users, HeartPulse, Leaf, Loader2, Edit2, Check, X, MapPin } from 'lucide-react';
import { syncPendingOnboarding, saveManual, calcularDatosBrutos, calcularDimensiones, getFichaById, _writeFichaRaw } from '../lib/appService';
import { generarPerfilVisual, generarManual } from '../lib/gemini';
import { useToast } from '../hooks/useToast';
import Markdown from 'react-markdown';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ManualViewer } from '../components/ManualViewer';
import { geocodeLugar } from '../lib/geocoding';
import { AuthGateModal } from '../components/AuthGateModal';
import { TagArrayEditor } from '../components/ui/TagArrayEditor';
import { useTagArray } from '../hooks/useTagArray';
import { FieldError } from '../components/ui/FieldError';
import { useTranslation } from 'react-i18next';

const fichaSchema = z.object({
  nombre: z.string().min(1, 'Requerido'),
  fechaNacimiento: z.string().optional(),
  hora: z.string().optional(),
  lugar: z.string().optional(),
  genero: z.string().optional(),
  saberes: z.any().optional(),
  necesidades: z.any().optional(),
  ofrendas: z.any().optional(),
  bio: z.string().optional(),
  headline: z.string().max(45, 'Máximo 45 caracteres').optional(),
  rol_comunidad: z.string().optional(),
  antiguedad_anos: z.preprocess((val) => val === undefined || val === '' ? undefined : Number(val), z.number().optional()),
  tension: z.string().optional(),
  latitud: z.preprocess((val) => val === undefined || val === '' ? undefined : Number(val), z.number().optional()),
  longitud: z.preprocess((val) => val === undefined || val === '' ? undefined : Number(val), z.number().optional()),
  timezone: z.string().optional(),
  rol: z.string().optional(),
  fechaLlegada: z.string().optional(),
  fechaSalida: z.string().optional(),
  habilidadesVoluntario: z.string().optional()
});

type FichaFormData = z.infer<typeof fichaSchema>;

export function FichaPreview() {
  const { t } = useTranslation('passport');
  const { appUser, login, updateConsent } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [pendingFicha, setPendingFicha] = useState<any>(() => JSON.parse(localStorage.getItem('kanarii_pendingFicha') || 'null'));
  
  const [estadoVista, setEstadoVista] = useState<'datos' | 'manual'>('datos');
  const [generatedManual, setGeneratedManual] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'save' | 'generate' | null>(null);
  const syncInProgress = useRef(false);

  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [geoMessage, setGeoMessage] = useState('');

  const { register, handleSubmit, getValues, setValue, watch, formState: { errors, isSubmitting } } = useForm<FichaFormData>({
    // @ts-ignore
    resolver: zodResolver(fichaSchema),
    defaultValues: pendingFicha || {}
  });

  const watchRol = watch("rol");

  const parseTags = (field: any): string[] => {
    if (Array.isArray(field)) return field;
    if (typeof field === 'string' && field.trim()) return field.split(',').map(s => s.trim()).filter(Boolean);
    return [];
  };

  const ofrendasState = useTagArray(parseTags(pendingFicha?.ofrendas || pendingFicha?.triada?.ofrendas));
  const saberesState = useTagArray(parseTags(pendingFicha?.saberes || pendingFicha?.triada?.saberes));
  const necesidadesState = useTagArray(parseTags(pendingFicha?.necesidades || pendingFicha?.triada?.necesidades));

  const onEditSubmit = (data: FichaFormData) => {
    const updatedData = {
      ...data,
      ofrendas: ofrendasState.tags,
      saberes: saberesState.tags,
      necesidades: necesidadesState.tags,
      triada: {
        ofrendas: ofrendasState.tags,
        saberes: saberesState.tags,
        necesidades: necesidadesState.tags
      }
    };
    setPendingFicha(updatedData);
    localStorage.setItem('kanarii_pendingFicha', JSON.stringify(updatedData));
    setIsEditing(false);
  };

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

  // Efecto para cargar datos reales si el usuario está logueado
  // Esto evita el "fantasma de asdf" del localStorage
  useEffect(() => {
    async function loadRealData() {
      if (appUser) {
        try {
          const realFicha = await getFichaById(appUser.uid);
          if (realFicha) {
            // Si hay datos en la nube, los priorizamos
            const mappedData = {
              ...realFicha.datosPersona,
              ...realFicha.datosOnboarding,
              rol: realFicha.datosOnboarding?.rol_comunidad || realFicha.datosPersona?.rol,
              userId: appUser.uid
            };
            setPendingFicha(mappedData);
          }
        } catch (e) {
          console.log("No hay ficha previa en la nube, usando local.");
        }
      }
    }
    loadRealData();
  }, [appUser]);

  const handleGenerateManual = async () => {
    if (!appUser) {
      setPendingAction('generate');
      setIsAuthModalOpen(true);
      return;
    }

    setIsGenerating(true);
    try {
      // FIX 2 — Guardar ficha automáticamente si no existe antes de llamar a IA
      const fichaExistente = await getFichaById(appUser.uid).catch(() => null);
      if (!fichaExistente) {
        // Normalizar datos para _writeFichaRaw
        const horaVal = !pendingFicha.hora || pendingFicha.hora.trim() === '00:00' ? '00:00' : pendingFicha.hora;
        const baseFicha = {
          userId: appUser.uid,
          datosPersona: { ...pendingFicha, hora: horaVal },
          datosOnboarding: { ...pendingFicha, hora: horaVal },
          datosBrutos: null,
          estado: 'capa1_completa',
        };
        await _writeFichaRaw(appUser.uid, baseFicha, false);
      }

      let latitud = pendingFicha.latitud ? parseFloat(pendingFicha.latitud.toString()) : 0;
      let longitud = pendingFicha.longitud ? parseFloat(pendingFicha.longitud.toString()) : 0;
      let timezone = pendingFicha.timezone || 'UTC';
      
      if (!latitud && !longitud && pendingFicha.lugar) {
        try {
          const parsed = JSON.parse(pendingFicha.lugar);
          latitud = parsed.latitud; longitud = parsed.longitud; timezone = parsed.timezone;
        } catch (e) {}
      }
      const horaVal = !pendingFicha.hora || pendingFicha.hora.trim() === '00:00' ? '00:00' : pendingFicha.hora;
      
      const rawData = await calcularDatosBrutos({
        fecha: pendingFicha.fechaNacimiento,
        hora: horaVal,
        latitud, longitud, timezone
      });
      const datosPersona = { ...pendingFicha, hora: horaVal };
      const dimensiones = calcularDimensiones(rawData, datosPersona);
      const perfilVisual = await generarPerfilVisual(rawData, datosPersona, dimensiones);
      const manualText = await generarManual(rawData, datosPersona, perfilVisual);

      const updatedFicha = { ...pendingFicha, preview_perfilVisual: perfilVisual, preview_manual: manualText, preview_dimensiones: dimensiones };
      setPendingFicha(updatedFicha);
      localStorage.setItem('kanarii_pendingFicha', JSON.stringify(updatedFicha));

      setGeneratedManual(manualText);
      setEstadoVista('manual');
    } catch (e: any) {
      console.error("Failed to generate manual", e);
      toast.error(e.message || "Hubo un problema. Inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (appUser && pendingAction && !syncInProgress.current) {
      setIsAuthModalOpen(false);
      
      const action = pendingAction;
      setPendingAction(null); // Limpiar primero para evitar re-ejecuciones

      if (action === 'save') {
        syncInProgress.current = true;
        (async () => {
          try {
            const fichaId = await syncPendingOnboarding(appUser.uid);
            if (fichaId && generatedManual) {
              try {
                await saveManual(appUser.uid, generatedManual, fichaId);
              } catch (e) {
                console.error("Failed to save manual:", e);
              }
            }
            await updateConsent();
            navigate('/ficha');
          } catch (e: any) {
            console.error('[FichaPreview] Error guardando ficha:', e?.code, e?.message);
            const msg = e?.code === 'permission-denied'
              ? 'Sin permisos de escritura. Contacta con el equipo.'
              : 'No pudimos guardar tu ficha. Inténtalo de nuevo.';
            alert(msg); 
          } finally {
            setIsSaving(false);          // SIEMPRE
            setPendingAction(null);      // SIEMPRE
            syncInProgress.current = false; // SIEMPRE
          }
        })();
      } else if (action === 'generate') {
        handleGenerateManual();
      }
    }
  }, [appUser, pendingAction, generatedManual, updateConsent, navigate]);

  // Si no hay borrador previo, inicializar perfil básico limpio en modo edición
  useEffect(() => {
    if (!pendingFicha) {
      setIsEditing(true);
    }
  }, [pendingFicha]);

  if (!pendingFicha && !isEditing) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 space-y-4">
        <div className="text-center text-stone-600 font-serif text-lg">
          {t('preview.noDraft')}
        </div>
        <button
          onClick={() => navigate('/orientacion')}
          className="px-6 py-2.5 bg-[#6B705C] text-white rounded-2xl text-sm font-medium hover:bg-[#5A5A40] transition-colors"
        >
          {t('preview.backToOrientation')}
        </button>
      </div>
    );
  }

  const handleSaveClick = async () => {
    if (!appUser) {
      setPendingAction('save');
      setIsAuthModalOpen(true);
      setIsSaving(true);
    } else {
      setPendingAction('save');
      setIsSaving(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 p-6 flex flex-col items-center pb-24">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <Leaf className="text-[#6B705C] w-8 h-8" />
            <h1 className="text-3xl font-serif text-[#4A4E4D]">{t('form.title')}</h1>
          </div>
        </div>

        {isGenerating ? (
          <div className="bg-white rounded-3xl shadow-sm border border-[#EAE2D6] p-8 mt-12 flex flex-col items-center justify-center py-20 text-center space-y-6">
            <Loader2 className="w-12 h-12 text-[#CB997E] animate-spin" />
            <h2 className="text-2xl font-serif text-[#4A4E4D]">{t('preview.weavingManual')}</h2>
            <p className="text-stone-600 max-w-md">
              {t('preview.weavingManualDesc')}
            </p>
          </div>
        ) : estadoVista === 'datos' ? (
          <div className="bg-white rounded-3xl shadow-sm border border-[#EAE2D6] p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#CB997E]"></div>
            
            {isEditing ? (
              <form onSubmit={handleSubmit(onEditSubmit as any)} className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-serif text-[#4A4E4D]">{t('form.editData')}</h2>
                  <button type="button" onClick={() => setIsEditing(false)} className="text-stone-500 hover:text-stone-800">
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

                  {/* TRÍADA ESTRUCTURADA CON CHIPS */}
                  <div className="space-y-4 md:col-span-2 pt-2 border-t border-[#FAF9F6]">
                    <h3 className="font-serif font-bold text-base text-[#3E2723]">{t('form.triadTitle')}</h3>
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

                  {/* CAMPO LIBRE SOBRE MÍ / BIOGRAFÍA */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-stone-600">{t('form.bioTitle')}</label>
                    <textarea {...register("bio")} rows={4} placeholder={t('form.bioPlaceholder')} className="w-full bg-[#F9F7F1] border border-[#EAE2D6] rounded-xl py-3 px-4 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A5A58D]" />
                    <FieldError error={errors.bio} />
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
            ) : (
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <h2 className="text-3xl font-serif text-[#4A4E4D]">{t('preview.yourRegistrationData')}</h2>
                      {pendingFicha?.rol && (
                        <div className="flex">
                          {pendingFicha.rol === 'propietario' && <span className="px-3 py-1 bg-green-800 text-white rounded-full text-xs font-medium">{t('roleLabels.owner')}</span>}
                          {pendingFicha.rol === 'miembro' && <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-medium">{t('roleLabels.member')}</span>}
                          {pendingFicha.rol === 'voluntario' && (
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              pendingFicha.fechaSalida && new Date(pendingFicha.fechaSalida) < new Date() 
                                ? 'bg-teal-50 text-teal-700 border border-teal-200 opacity-80'
                                : 'bg-teal-600 text-white'
                            }`}>
                              {t('roleLabels.volunteer')} {pendingFicha.fechaSalida ? (
                                new Date(pendingFicha.fechaSalida) < new Date()
                                  ? `· ${t('roleLabels.departed')}`
                                  : `· ${t('roleLabels.until', { date: new Date(pendingFicha.fechaSalida).toLocaleDateString() })}`
                              ) : ''}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F9F7F1] text-stone-700 rounded-full hover:bg-[#EAE2D6] transition-colors shadow-sm cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('profile.editData')}</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 pt-2">
                  <div className="space-y-4 md:col-span-2">
                    <div className="flex items-center gap-2 text-[#CB997E] border-b border-[#EAE2D6] pb-2">
                      <Fingerprint className="w-5 h-5" />
                      <h3 className="text-lg font-serif">{t('sections.baseIdentity')}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">{t('form.name')}</h4>
                        <p className="text-stone-700">{pendingFicha.nombre}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">{t('labels.birth')}</h4>
                        <p className="text-stone-700">{pendingFicha.fechaNacimiento} {t('labels.atTime')} {pendingFicha.hora}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">{t('labels.place')}</h4>
                        <p className="text-stone-700">{pendingFicha.lugar}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">{t('labels.gender')}</h4>
                        <p className="text-stone-700">{pendingFicha.genero}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#8A817C] border-b border-[#EAE2D6] pb-2">
                      <Sparkles className="w-5 h-5" />
                      <h3 className="text-lg font-serif">{t('preview.ikigaiTitle')}</h3>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">{t('preview.knowledgesAndJourney')}</h4>
                      <p className="text-stone-700">{pendingFicha.saberes}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#6B705C] border-b border-[#EAE2D6] pb-2">
                      <Users className="w-5 h-5" />
                      <h3 className="text-lg font-serif">{t('sections.roleAndCoexistence')}</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">{t('labels.kanariiRole')}</h4>
                        <p className="text-stone-700">{pendingFicha.rol_comunidad}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">{t('labels.antiquity')}</h4>
                        <p className="text-stone-700">{pendingFicha.antiguedad_anos}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 md:col-span-2">
                    <div className="flex items-center gap-2 text-[#B58368] border-b border-[#EAE2D6] pb-2">
                      <HeartPulse className="w-5 h-5" />
                      <h3 className="text-lg font-serif">{t('sections.tension')}</h3>
                    </div>
                    <div className="bg-[#F9F7F1] p-5 rounded-2xl border border-[#EAE2D6]">
                      <p className="text-stone-700 italic text-lg leading-relaxed">{pendingFicha.tension}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row justify-end gap-4">
                  <button
                    onClick={handleGenerateManual}
                    className="flex-1 md:flex-none bg-[#CB997E] hover:bg-[#B58368] text-white py-4 px-8 rounded-2xl font-medium transition-colors shadow-sm text-lg cursor-pointer flex justify-center items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5"/>
                    {t('preview.generateGalacticManual')}
                  </button>
                  
                  <button
                    onClick={handleSaveClick}
                    disabled={isSaving}
                    className="flex-1 md:flex-none bg-[#A5A58D] hover:bg-[#6B705C] text-white py-4 px-8 rounded-2xl font-medium transition-colors shadow-sm text-lg cursor-pointer flex justify-center items-center"
                  >
                    {isSaving ? (
                      <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> {t('preview.saving')}</span>
                    ) : (
                      t('preview.saveWithoutManual')
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-[#EAE2D6] p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#8A817C]"></div>
              
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-serif text-[#4A4E4D]">{t('preview.willBeYourProfile')}</h2>
              </div>
              
              <ManualViewer content={generatedManual || ""} />
            </div>

            <div className="flex flex-col md:flex-row justify-end gap-4 mt-8">
              <button
                onClick={() => setEstadoVista('datos')}
                className="w-full md:w-auto bg-white border border-[#EAE2D6] text-stone-700 hover:bg-[#F9F7F1] py-4 px-8 rounded-2xl font-medium transition-colors shadow-sm text-lg cursor-pointer flex justify-center items-center"
              >
                {t('preview.editAndRegenerate')}
              </button>
              
              <button
                onClick={handleSaveClick}
                disabled={isSaving}
                className="w-full md:w-auto bg-[#A5A58D] hover:bg-[#6B705C] text-white py-4 px-8 rounded-2xl font-medium transition-colors shadow-sm text-lg cursor-pointer flex justify-center items-center"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> {t('preview.savingInNetwork')}</span>
                ) : (
                  t('preview.saveInTribe')
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <AuthGateModal 
        isOpen={isAuthModalOpen && !appUser} 
        title={pendingAction === 'generate' ? t('preview.authModalGenerateTitle') : undefined}
        subtitle={pendingAction === 'generate' ? t('preview.authModalGenerateSubtitle') : undefined}
        onClose={() => {
          setPendingAction(null);
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
}
