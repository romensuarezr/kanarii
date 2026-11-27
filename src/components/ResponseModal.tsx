import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { PropuestaRespuesta } from '../lib/appService';
import { X, CheckCircle2, MessageSquare, HelpCircle, AlertCircle, Send } from 'lucide-react';
import { usePropuestaActions } from '../hooks/usePropuestaActions';
import { FieldError } from './ui/FieldError';

interface ResponseModalProps {
  propuestaId: string;
  memberId: string;
  totalMembers: number;
  existingResponse?: PropuestaRespuesta;
  onClose: () => void;
  onSuccess: () => void;
}

type ResponseType = PropuestaRespuesta['type'];

export function ResponseModal({
  propuestaId,
  memberId,
  totalMembers,
  existingResponse,
  onClose,
  onSuccess
}: ResponseModalProps) {
  const { t } = useTranslation(['governance', 'common']);
  const { submitResponse } = usePropuestaActions();
  const [type, setType] = useState<ResponseType>(existingResponse?.type || 'consentimiento');
  const [content, setContent] = useState(existingResponse?.content || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Validación inline para objeciones y dudas
    if (type === 'objecion' && content.trim().length < 10) {
      setError(t('socraticResponse.damageRequired', { defaultValue: 'Una objeción requiere una justificación clara (mín. 10 caracteres)' }));
    } else if (type === 'duda' && content.trim().length < 5) {
      setError(t('socraticResponse.questionRequired', { defaultValue: 'Por favor, formula tu duda de forma clara para que el autor pueda responderte' }));
    } else {
      setError(null);
    }
  }, [type, content, t]);

  const handleSubmit = async () => {
    if ((type === 'objecion' || type === 'duda') && !content.trim()) {
      setError(type === 'objecion' ? t('socraticResponse.damageRequired', { defaultValue: 'La justificación es obligatoria para una objeción' }) : t('socraticResponse.questionRequired', { defaultValue: 'Debes escribir tu duda o aclaración' }));
      return;
    }

    const respuesta: PropuestaRespuesta = {
      memberId,
      type,
      content: content.trim() || '',
      status: 'pendiente',
      createdAt: existingResponse?.createdAt || new Date(),
      updatedAt: new Date()
    };

    await submitResponse(propuestaId, respuesta, totalMembers, existingResponse?.type, {
      successMessage: 'Tu participación ha sido registrada ✨',
      onSuccess: () => {
        onSuccess();
        onClose();
      }
    });
  };

  const options: { id: ResponseType; label: string; description: string; icon: any; color: string }[] = [
    { 
      id: 'consentimiento', 
      label: t('socraticResponse.options.consentimiento.label', { defaultValue: 'Consentimiento' }), 
      description: t('socraticResponse.options.consentimiento.desc', { defaultValue: 'No veo razones por las que esto sea perjudicial.' }),
      icon: CheckCircle2,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700'
    },
    { 
      id: 'preocupacion', 
      label: t('socraticResponse.options.preocupacion.label', { defaultValue: 'Preocupación' }), 
      description: t('socraticResponse.options.preocupacion.desc', { defaultValue: 'Consiento, pero me gustaría registrar este posible riesgo.' }),
      icon: MessageSquare,
      color: 'bg-amber-50 border-amber-200 text-amber-700'
    },
    { 
      id: 'duda', 
      label: t('socraticResponse.options.duda.label', { defaultValue: 'Duda / Aclaración' }), 
      description: t('socraticResponse.options.duda.desc', { defaultValue: 'Necesito más información para poder decidir.' }),
      icon: HelpCircle,
      color: 'bg-sky-50 border-sky-200 text-sky-700'
    },
    { 
      id: 'objecion', 
      label: t('socraticResponse.options.objecion.label', { defaultValue: 'Objeción' }), 
      description: t('socraticResponse.options.objecion.desc', { defaultValue: 'Tengo un argumento de por qué esto causará un daño.' }),
      icon: AlertCircle,
      color: 'bg-rose-50 border-rose-200 text-rose-700'
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50 shrink-0">
          <div>
            <h3 className="text-xl font-serif text-stone-800">
              {t('socraticResponse.title', { defaultValue: 'Tu respuesta socrática' })}
            </h3>
            <p className="text-xs text-stone-500 mt-1 uppercase tracking-widest font-bold">
              {existingResponse
                ? t('socraticResponse.modifying', { defaultValue: 'Modificando respuesta anterior' })
                : t('socraticResponse.participating', { defaultValue: 'Participación comunitaria' })}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-stone-200 rounded-full transition-colors"
            aria-label={t('common:actions.closeModal', { defaultValue: 'Cerrar modal' })}
          >
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        <div className="p-8 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          {/* Educación S3 Inline */}
          <div className="bg-[#4A4E4D] p-5 rounded-3xl text-white/90 text-xs leading-relaxed flex gap-4 items-start shadow-inner">
            <HelpCircle className="w-8 h-8 text-[#D4C3A3] shrink-0" />
            <p>
              <Trans
                i18nKey="socraticResponse.s3Note"
                ns="governance"
                defaults="En S3, buscamos propuestas <1>suficientemente buenas</1> por ahora y <3>suficientemente seguras</3> para probarlas. Una objeción no es una preferencia personal, es un regalo a la comunidad para evitar un daño real."
                components={{
                  1: <span className="text-[#D4C3A3] font-bold" />,
                  3: <span className="text-[#D4C3A3] font-bold" />
                }}
              />
            </p>
          </div>

          {/* Opciones */}
          <div className="grid grid-cols-1 gap-3">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setType(opt.id)}
                className={`
                  flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left
                  ${type === opt.id ? `${opt.color} shadow-md` : 'bg-white border-stone-100 hover:border-stone-200 text-stone-600'}
                `}
              >
                <div className={`p-2 rounded-xl ${type === opt.id ? 'bg-white/50' : 'bg-stone-50'}`}>
                  <opt.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider">{opt.label}</p>
                  <p className="text-xs opacity-80 mt-0.5">{opt.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Textarea dinámico */}
          {(type === 'objecion' || type === 'preocupacion' || type === 'duda') && (
            <div className="space-y-2 animate-in slide-in-from-top-4">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block ml-1">
                {type === 'objecion'
                  ? t('socraticResponse.damageLabel', { defaultValue: 'Argumento del daño (Obligatorio)' })
                  : (type === 'duda'
                    ? t('socraticResponse.questionLabel', { defaultValue: 'Pregunta / Aclaración (Obligatorio)' })
                    : t('socraticResponse.contextLabel', { defaultValue: 'Contexto adicional' }))}
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  type === 'objecion' 
                    ? t('socraticResponse.damagePlaceholder', { defaultValue: 'Explica por qué esta propuesta causará un daño a la comunidad...' })
                    : (type === 'duda'
                      ? t('socraticResponse.questionPlaceholder', { defaultValue: '¿Qué necesitas entender mejor?' })
                      : t('socraticResponse.contextPlaceholder', { defaultValue: 'Escribe aquí tus preocupaciones...' }))
                }
                className={`
                  w-full min-h-[120px] p-4 rounded-2xl border-2 bg-stone-50 text-sm text-stone-700 focus:outline-none transition-all
                  ${error ? 'border-rose-200 focus:border-rose-400' : 'border-stone-100 focus:border-stone-300'}
                `}
              />
              <FieldError message={error || undefined} className="ml-1" />
            </div>
          )}
        </div>

        <div className="p-8 bg-stone-50 border-t border-stone-100 flex gap-4 shrink-0">
          <button 
            onClick={onClose}
            className="flex-1 py-4 text-stone-500 font-bold text-xs uppercase tracking-widest hover:bg-stone-200 rounded-2xl transition-all"
          >
            {t('socraticResponse.cancel', { defaultValue: 'Cancelar' })}
          </button>
          <button 
            disabled={!!error}
            onClick={handleSubmit}
            className={`
              flex-[2] py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg flex justify-center items-center gap-2
              ${!!error ? 'bg-stone-300 text-stone-500 cursor-not-allowed grayscale' : 'bg-stone-800 text-white hover:bg-black hover:shadow-xl active:scale-95'}
            `}
          >
            {t('socraticResponse.send', { defaultValue: 'Enviar Respuesta' })} <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
