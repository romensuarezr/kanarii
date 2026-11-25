import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Compass,
  Calendar,
  Tent,
  FileText,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CreateNewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateNewModal({ isOpen, onClose }: CreateNewModalProps) {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();

  // Detección de borradores existentes en localStorage
  const [hasCommunityDraft, setHasCommunityDraft] = useState(false);
  const [hasFichaDraft, setHasFichaDraft] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const commDraft = localStorage.getItem('kanarii_draft_comunidad');
      const fichaDraft = localStorage.getItem('kanarii_pendingFicha');
      setHasCommunityDraft(Boolean(commDraft));
      setHasFichaDraft(Boolean(fichaDraft));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative bg-bg-surface w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl border border-border shadow-2xl p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto"
        style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      >
        {/* Cabecera */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sand-light text-forest-deep border border-border">
              <Layers size={11} className="text-forest-moss" />
              <span>{t('createNew.badge', { defaultValue: 'Sembrar en Canarias' })}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-text-strong">
              {t('createNew.title', { defaultValue: 'Crear algo nuevo' })}
            </h2>
            <p className="text-xs text-stone-500">
              {t('createNew.subtitle', { defaultValue: 'Selecciona cómo deseas convocar o activar a la red comunitaria.' })}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-2xl text-stone-400 hover:text-stone-700 hover:bg-sand-light transition-colors cursor-pointer shrink-0"
            aria-label="Cerrar modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Las 3 opciones nucleares estilo Retribalize */}
        <div className="grid grid-cols-1 gap-3.5">
          {/* Opción 1: Nodo / Tribu */}
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/nueva-comunidad');
            }}
            className="w-full text-left p-4 sm:p-5 rounded-2xl border border-border hover:border-forest-deep/40 bg-sand-light/30 hover:bg-sand-light transition-all flex items-start gap-4 group cursor-pointer shadow-2xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-forest-deep/10 text-forest-deep flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Compass size={24} />
            </div>
            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-text-strong group-hover:text-forest-deep transition-colors">
                  {t('createNew.tribeTitle', { defaultValue: 'Iniciar un Nodo o Tribu' })}
                </h3>
                <ArrowRight size={15} className="text-stone-400 group-hover:text-forest-deep group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t('createNew.tribeDesc', { defaultValue: 'Crea una nueva comunidad, finca, ecoaldea o colectivo en el archipiélago canario.' })}
              </p>
            </div>
          </button>

          {/* Opción 2: Evento / Encuentro */}
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/calendario', { state: { openNewEventModal: true } });
            }}
            className="w-full text-left p-4 sm:p-5 rounded-2xl border border-border hover:border-forest-deep/40 bg-sand-light/30 hover:bg-sand-light transition-all flex items-start gap-4 group cursor-pointer shadow-2xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Calendar size={24} />
            </div>
            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-text-strong group-hover:text-terracotta transition-colors">
                  {t('createNew.eventTitle', { defaultValue: 'Organizar un Encuentro' })}
                </h3>
                <ArrowRight size={15} className="text-stone-400 group-hover:text-terracotta group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t('createNew.eventDesc', { defaultValue: 'Convoca una asamblea, charla, taller o reunión presencial u online.' })}
              </p>
            </div>
          </button>

          {/* Opción 3: Residencia / Estancia */}
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/residencias');
            }}
            className="w-full text-left p-4 sm:p-5 rounded-2xl border border-border hover:border-forest-deep/40 bg-sand-light/30 hover:bg-sand-light transition-all flex items-start gap-4 group cursor-pointer shadow-2xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-forest-moss/10 text-forest-moss flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Tent size={24} />
            </div>
            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-text-strong group-hover:text-forest-moss transition-colors">
                  {t('createNew.residencyTitle', { defaultValue: 'Publicar una Residencia o Estancia' })}
                </h3>
                <ArrowRight size={15} className="text-stone-400 group-hover:text-forest-moss group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t('createNew.residencyDesc', { defaultValue: 'Ofrece espacio de acogida, voluntariado o convivencia en tu finca o espacio.' })}
              </p>
            </div>
          </button>
        </div>

        {/* Sección de Borradores (Drafts) estilo Retribalize */}
        <div className="pt-4 border-t border-border">
          <div className="bg-sand-light/40 border border-border/80 rounded-2xl p-4 flex items-start gap-3">
            <FileText size={18} className="text-stone-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <p className="font-bold text-text-strong">
                {t('createNew.draftsTitle', { defaultValue: 'Tus borradores guardados' })}
              </p>
              {hasCommunityDraft ? (
                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-forest-deep font-medium">
                    {t('createNew.hasCommunityDraft', { defaultValue: 'Tienes un borrador de Nodo pendiente.' })}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate('/nueva-comunidad');
                    }}
                    className="font-bold text-forest-deep underline hover:text-forest-deep/80 cursor-pointer shrink-0"
                  >
                    {t('createNew.resumeDraft', { defaultValue: 'Continuar' })}
                  </button>
                </div>
              ) : hasFichaDraft ? (
                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-forest-deep font-medium">
                    {t('createNew.hasFichaDraft', { defaultValue: 'Tienes una ficha comunitaria sin completar.' })}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate('/ficha-preview');
                    }}
                    className="font-bold text-forest-deep underline hover:text-forest-deep/80 cursor-pointer shrink-0"
                  >
                    {t('createNew.resumeDraft', { defaultValue: 'Continuar' })}
                  </button>
                </div>
              ) : (
                <p className="text-stone-500">
                  {t('createNew.draftsDesc', { defaultValue: 'Nada guardado todavía. Inicia una propuesta y si cierras antes de terminar, tu trabajo quedará seguro aquí.' })}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
