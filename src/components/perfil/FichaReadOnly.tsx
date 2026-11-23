import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, Sparkles, Users, HeartPulse, History, Globe, Eye, Copy, Edit2, LogOut } from 'lucide-react';
import { Ficha, FichaDatosPersona, getTriadaFromFicha } from '../../lib/appService';
import { calcularKin } from '../../lib/kinMaya';
import { useTranslation } from 'react-i18next';

export function getMergedDatosPersona(ficha: Ficha | null | undefined): Partial<FichaDatosPersona> {
  if (!ficha) return {};
  const p = (ficha.datosPersona || {}) as Partial<FichaDatosPersona>;
  const o = (ficha.datosOnboarding || {}) as any;

  return {
    nombre: p.nombre || o.nombre || '',
    fechaNacimiento: p.fechaNacimiento || o.fechaNacimiento || '',
    hora: p.hora || o.hora || '',
    lugar: p.lugar || o.lugar || '',
    genero: p.genero || o.genero || '',
    saberes: p.saberes || o.saberes || '',
    rol_comunidad: p.rol_comunidad || o.rol_comunidad || '',
    antiguedad_anos: p.antiguedad_anos !== undefined
      ? p.antiguedad_anos
      : (typeof o.antiguedad_anos === 'string' ? parseInt(o.antiguedad_anos, 10) || 0 : o.antiguedad_anos ?? 0),
    tension: p.tension || o.tension || '',
    latitud: p.latitud ?? o.latitud,
    longitud: p.longitud ?? o.longitud,
    timezone: p.timezone || o.timezone,
    rol: p.rol || o.rol,
    fechaLlegada: p.fechaLlegada || o.fechaLlegada,
    fechaSalida: p.fechaSalida || o.fechaSalida,
    habilidadesVoluntario: p.habilidadesVoluntario || o.habilidadesVoluntario,
    instagram: p.instagram || o.instagram,
    linkedin: p.linkedin || o.linkedin,
    website: p.website || o.website,
    phone: p.phone || o.phone,
    email: p.email || o.email,
  };
}

export interface FichaReadOnlyProps {
  ficha: Ficha | null | undefined;
  onEdit?: () => void;
  showEditButton?: boolean;
  comunidadSlug?: string;
  appUserUid?: string;
  onLeaveCommunity?: () => void;
  hasCommunities?: boolean;
}

export function FichaReadOnly({
  ficha,
  onEdit,
  showEditButton = true,
  comunidadSlug,
  appUserUid,
  onLeaveCommunity,
  hasCommunities = false,
}: FichaReadOnlyProps) {
  const { t, i18n } = useTranslation('passport');
  const navigate = useNavigate();
  const currentLocale = i18n.language === 'en' ? 'en' : 'es';
  const [copied, setCopied] = useState(false);

  const datos = getMergedDatosPersona(ficha);
  const triada = getTriadaFromFicha(ficha);
  const kinMaya = datos?.fechaNacimiento ? calcularKin(datos.fechaNacimiento) : null;

  const handleCopyPasaporteUrl = () => {
    if (!comunidadSlug || !appUserUid) return;
    const url = `${window.location.origin}/c/${comunidadSlug}/miembro/${appUserUid}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-[#EAE2D6] p-8 relative overflow-hidden mb-8">
      {!datos?.fechaNacimiento && (
        <div className="mb-6 p-5 bg-amber-50/70 border border-amber-200/60 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif font-bold text-base text-[#3E2723]">
              {t('galacticBanner.title')}
            </h3>
            <p className="text-xs text-[#5D4037]/80">
              {t('galacticBanner.desc')}
            </p>
          </div>
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-[#6B705C] hover:bg-[#5A5A40] text-white text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0"
            >
              {t('galacticBanner.button')}
            </button>
          )}
        </div>
      )}
      <div className="absolute top-0 left-0 w-2 h-full bg-[#CB997E]"></div>

      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-serif text-[#4A4E4D]">{datos?.nombre}</h2>
              {comunidadSlug && appUserUid && (
                <div className="flex items-center gap-1 ml-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/c/${comunidadSlug}/miembro/${appUserUid}`)}
                    className="p-1 rounded-full hover:bg-stone-100 text-[#5A5A40] transition-colors"
                    title="Ver Pasaporte Comunitario"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyPasaporteUrl}
                    className="p-1 rounded-full hover:bg-stone-100 text-[#5A5A40] transition-colors flex items-center gap-1.5"
                    title="Copiar enlace del Pasaporte"
                  >
                    <Copy size={18} />
                    {copied && (
                      <span className="text-xs font-serif text-[#CB997E] animate-fadeIn">
                        ¡Copiado!
                      </span>
                    )}
                  </button>
                </div>
              )}
              {datos?.rol && (
                <div className="flex">
                  {datos.rol === 'propietario' && <span className="px-3 py-1 bg-green-800 text-white rounded-full text-xs font-medium">{t('roleLabels.owner')}</span>}
                  {datos.rol === 'miembro' && <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-medium">{t('roleLabels.member')}</span>}
                  {datos.rol === 'voluntario' && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      datos.fechaSalida && new Date(datos.fechaSalida) < new Date() 
                        ? 'bg-teal-50 text-teal-700 border border-teal-200 opacity-80'
                        : 'bg-teal-600 text-white'
                    }`}>
                      {t('roleLabels.volunteer')} {datos.fechaSalida ? (
                        new Date(datos.fechaSalida) < new Date()
                          ? `· ${t('roleLabels.departed')}`
                          : `· ${t('roleLabels.until', { date: new Date(datos.fechaSalida).toLocaleDateString(currentLocale === 'en' ? 'en-US' : 'es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) })}`
                      ) : ''}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {showEditButton && onEdit && (
              <button
                onClick={onEdit}
                className="flex items-center gap-2 px-4 py-2 bg-[#F9F7F1] text-stone-700 rounded-full hover:bg-[#EAE2D6] transition-colors shadow-sm"
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm font-medium">{t('buttons.edit')}</span>
              </button>
            )}
            {hasCommunities && onLeaveCommunity && (
              <button
                onClick={onLeaveCommunity}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full hover:bg-red-100 transition-colors shadow-sm border border-red-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">{t('buttons.leaveCommunity')}</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 pt-2">
          
          {/* 1. Identidad base */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2 text-[#CB997E] border-b border-[#EAE2D6] pb-2">
              <Fingerprint className="w-5 h-5" />
              <h3 className="text-lg font-serif">{t('sections.baseIdentity')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">{t('labels.birth')}</h4>
                <p className="text-stone-700">{datos?.fechaNacimiento || '—'} {datos?.hora ? `${t('labels.atTime')} ${datos.hora}` : ''}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">{t('labels.place')}</h4>
                <p className="text-stone-700">{datos?.lugar || '—'}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">{t('labels.gender')}</h4>
                <p className="text-stone-700">{datos?.genero || '—'}</p>
              </div>
            </div>

            {/* Firma Galáctica (Kin Maya) */}
            {kinMaya && (() => {
              const sealName = t(`kin.seals.${kinMaya.selloIndex}`);
              const toneName = t(`kin.tones.${kinMaya.tonoIndex}`);
              const colorName = t(`kin.colors.${kinMaya.colorIndex}`);
              const roleText = t(`kin.roles.${kinMaya.selloIndex}`);
              const descKin = t('kin.format', { kin: kinMaya.kin, tone: toneName, seal: sealName, color: colorName });

              return (
                <div className="mt-4 pt-4 border-t border-[#EAE2D6]">
                  <div className="flex items-start gap-4 bg-[#F9F7F1] rounded-2xl px-5 py-4 border border-[#EAE2D6]">
                    <span className="text-3xl leading-none mt-0.5" aria-hidden="true">{kinMaya.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">{t('astral.galacticSignature')}</h4>
                      <p className="text-stone-800 font-medium text-base">{descKin}</p>
                      <p className="text-stone-500 text-sm mt-1 leading-relaxed">{roleText}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 1b. Redes Sociales y Contacto */}
          {(datos.instagram || datos.linkedin || datos.website || datos.phone || datos.email) && (
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2 text-[#CB997E] border-b border-[#EAE2D6] pb-2">
                <Globe className="w-5 h-5" />
                <h3 className="text-lg font-serif">Redes Sociales y Contacto</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {datos.instagram && (
                  <div>
                    <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Instagram</h4>
                    <a
                      href={`https://instagram.com/${datos.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-700 hover:text-[#CB997E] hover:underline break-all"
                    >
                      {datos.instagram}
                    </a>
                  </div>
                )}
                {datos.linkedin && (
                  <div>
                    <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">LinkedIn</h4>
                    <a
                      href={datos.linkedin.startsWith('http') ? datos.linkedin : `https://linkedin.com/in/${datos.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-700 hover:text-[#CB997E] hover:underline break-all"
                    >
                      {datos.linkedin}
                    </a>
                  </div>
                )}
                {datos.website && (
                  <div>
                    <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Sitio Web</h4>
                    <a
                      href={datos.website.startsWith('http') ? datos.website : `https://${datos.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-700 hover:text-[#CB997E] hover:underline break-all"
                    >
                      {datos.website}
                    </a>
                  </div>
                )}
                {datos.phone && (
                  <div>
                    <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Teléfono / WhatsApp</h4>
                    <a
                      href={`tel:${datos.phone}`}
                      className="text-stone-700 hover:text-[#CB997E] hover:underline break-all"
                    >
                      {datos.phone}
                    </a>
                  </div>
                )}
                {datos.email && (
                  <div>
                    <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Correo Electrónico</h4>
                    <a
                      href={`mailto:${datos.email}`}
                      className="text-stone-700 hover:text-[#CB997E] hover:underline break-all"
                    >
                      {datos.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. Tríada Comunitaria */}
          <div className="space-y-6 md:col-span-2">
            <div className="flex items-center gap-2 text-[#8A817C] border-b border-[#EAE2D6] pb-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-lg font-serif">{t('sections.triad')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Ofrendas */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  {t('triad.offersFull')}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {triada.ofrendas.length > 0 ? (
                    triada.ofrendas.map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-stone-900 border border-emerald-200 dark:bg-emerald-950/20 dark:text-stone-100 dark:border-emerald-900/40">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs italic text-stone-400">{t('triad.empty')}</span>
                  )}
                </div>
              </div>

              {/* Saberes */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
                  {t('triad.skillsFull')}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {triada.saberes.length > 0 ? (
                    triada.saberes.map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-50 text-stone-900 border border-sky-200 dark:bg-sky-950/20 dark:text-stone-100 dark:border-sky-900/40">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs italic text-stone-400">{t('triad.empty')}</span>
                  )}
                </div>
              </div>

              {/* Necesidades */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                  {t('triad.needsFull')}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {triada.necesidades.length > 0 ? (
                    triada.necesidades.map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-stone-900 border border-amber-200 dark:bg-amber-950/20 dark:text-stone-100 dark:border-amber-900/40">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs italic text-stone-400">{t('triad.empty')}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Rol y convivencia */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#6B705C] border-b border-[#EAE2D6] pb-2">
              <Users className="w-5 h-5" />
              <h3 className="text-lg font-serif">{t('sections.roleAndCoexistence')}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">{t('labels.kanariiRole')}</h4>
                <p className="text-stone-700">{datos?.rol_comunidad || '—'}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">{t('labels.antiquity')}</h4>
                <p className="text-stone-700">{t('labels.membershipDuration', { count: datos?.antiguedad_anos ?? 0 })}</p>
              </div>
            </div>
          </div>

          {/* 4. Estado de tensión y cuidado */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2 text-[#B58368] border-b border-[#EAE2D6] pb-2">
              <HeartPulse className="w-5 h-5" />
              <h3 className="text-lg font-serif">{t('sections.tension')}</h3>
            </div>
            <div className="bg-[#F9F7F1] p-5 rounded-2xl border border-[#EAE2D6]">
              <p className="text-stone-700 italic text-lg leading-relaxed">{datos?.tension || 'Sin tensión registrada'}</p>
            </div>
          </div>

          {/* 5. Revisión viva con fecha */}
          <div className="space-y-4 md:col-span-2 pt-6">
            <div className="flex items-center gap-2 text-stone-400 justify-center text-sm">
              <History className="w-4 h-4" />
              <span>{t('labels.updatedAt', { date: ficha?.updatedAt ? new Date(ficha.updatedAt.toDate ? ficha.updatedAt.toDate() : ficha.updatedAt).toLocaleDateString() : 'hoy' })}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FichaReadOnly;
