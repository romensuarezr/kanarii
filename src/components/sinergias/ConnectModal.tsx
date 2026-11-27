import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, HeartHandshake, MapPin, Zap, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';
import { requestConnection } from '../../lib/services/connections';

export interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUserId: string;
  targetName: string;
  targetAvatar?: string;
  targetRole?: string;
  targetLocation?: string;
  communityId?: string;
  synergyScore?: number;
  synergyData?: {
    kinMaya?: string;
    island?: string;
    offerings?: string[];
    needs?: string[];
  };
  onSuccess?: () => void;
}

export function ConnectModal({
  isOpen,
  onClose,
  targetUserId,
  targetName,
  targetAvatar,
  targetRole,
  targetLocation,
  communityId = 'network',
  synergyScore,
  synergyData,
  onSuccess,
}: ConnectModalProps) {
  const { t } = useTranslation(['dashboard', 'common']);
  const { appUser } = useAuth();
  const { success, error: toastError } = useToast();

  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  // Generar nota inicial pre-rellenada basada en la afinidad
  useEffect(() => {
    if (!isOpen) {
      setSent(false);
      return;
    }
    const affinityContext = synergyData?.island
      ? `${t('connectModal.inIsland', { defaultValue: 'en' })} ${synergyData.island}`
      : synergyData?.kinMaya
      ? `${t('connectModal.inKin', { defaultValue: 'a través del kin' })} ${synergyData.kinMaya}`
      : t('connectModal.inNetwork', { defaultValue: 'en la red' });

    const defaultNote = t('connectModal.defaultTemplate', {
      name: targetName,
      context: affinityContext,
      defaultValue: `¡Hola ${targetName}! He visto tu perfil en Kanarii y resonamos ${affinityContext}. Me encantaría conectar contigo para explorar intercambios y sinergias en la comunidad.`,
    });

    setMessage(defaultNote);
  }, [isOpen, targetName, synergyData, t]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appUser?.uid || !targetUserId) return;

    setSubmitting(true);
    try {
      await requestConnection(appUser.uid, targetUserId, communityId, {
        note: message.trim(),
        senderName: appUser.displayName || 'Miembro Kanarii',
        senderAvatar: appUser.photoURL || undefined,
        synergyData: {
          kinMaya: synergyData?.kinMaya,
          island: synergyData?.island,
          score: synergyScore,
          offerings: synergyData?.offerings,
          needs: synergyData?.needs,
        },
      });

      setSent(true);
      success(t('connectModal.successToast', { defaultValue: '¡Solicitud de conexión enviada!' }));
      if (onSuccess) onSuccess();
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      toastError(t('connectModal.errorToast', { defaultValue: 'Error al enviar la solicitud de conexión.' }));
    } finally {
      setSubmitting(false);
    }
  };

  const initial = targetName ? targetName.trim().charAt(0).toUpperCase() : 'M';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-forest-deep/40 backdrop-blur-xs"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-xl z-10 overflow-hidden font-sans text-text-strong"
        >
          {/* Botón Cerrar */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-sand-light transition-colors"
            aria-label={t('common:actions.closeModal', { defaultValue: 'Cerrar modal' })}
          >
            <X size={20} />
          </button>

          {sent ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-status-success-bg text-status-success-text rounded-full flex items-center justify-center mx-auto border border-status-success-text/20">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest-deep">
                {t('connectModal.sentTitle', { defaultValue: '¡Conexión solicitada!' })}
              </h3>
              <p className="text-sm text-stone-600 max-w-sm mx-auto">
                {t('connectModal.sentSubtitle', {
                  name: targetName,
                  defaultValue: `Le hemos enviado una notificación a ${targetName} para sincronizar vuestras intenciones comunitarias.`,
                })}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Encabezado */}
              <div className="flex items-start gap-3.5 pr-8">
                <div className="relative shrink-0">
                  {targetAvatar ? (
                    <img
                      src={targetAvatar}
                      alt={targetName}
                      className="w-14 h-14 rounded-2xl object-cover border border-border shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-forest-deep/10 text-forest-deep border border-border flex items-center justify-center font-bold font-serif text-xl shadow-xs">
                      {initial}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-forest-deep uppercase tracking-wider bg-forest-deep/10 px-2 py-0.5 rounded-md border border-forest-deep/20 mb-1">
                    <HeartHandshake size={12} />
                    {t('connectModal.tagline', { defaultValue: 'Conexión & Sinergia' })}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-forest-deep truncate">
                    {t('connectModal.title', { name: targetName, defaultValue: `Conectar con ${targetName}` })}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                    {targetRole && <span>{targetRole}</span>}
                    {targetLocation && (
                      <span className="flex items-center gap-0.5">
                        <MapPin size={11} className="text-stone-400" />
                        {targetLocation}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Resumen de Sinergia (si aplica) */}
              {(synergyScore !== undefined || synergyData) && (
                <div className="bg-sand-light/60 border border-border rounded-2xl p-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-forest-deep shrink-0" />
                    <span className="text-stone-700">
                      {synergyData?.island && <strong>🌴 {synergyData.island}</strong>}
                      {synergyData?.kinMaya && <span className="ml-2">✨ {synergyData.kinMaya}</span>}
                    </span>
                  </div>
                  {synergyScore !== undefined && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-status-success-bg text-status-success-text border border-status-success-text/20 shrink-0 flex items-center gap-1">
                      <Zap size={12} className="fill-status-success-text/20" />
                      {synergyScore}%
                    </span>
                  )}
                </div>
              )}

              {/* Área de texto personalizada */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  {t('connectModal.messageLabel', { defaultValue: 'Mensaje de presentación / intención:' })}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                  placeholder={t('connectModal.messagePlaceholder', {
                    defaultValue: 'Escribe unas palabras sobre qué te gustaría compartir o intercambiar...',
                  })}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-bg-page border border-border text-xs sm:text-sm text-text-strong placeholder:text-stone-400 focus:outline-hidden focus:border-forest-deep focus:ring-1 focus:ring-forest-deep resize-none transition-all"
                />
              </div>

              {/* Acciones */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-stone-600 hover:bg-sand-light transition-colors"
                >
                  {t('common:cancel', { defaultValue: 'Cancelar' })}
                </button>
                <button
                  type="submit"
                  disabled={submitting || !message.trim()}
                  className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-forest-deep text-white hover:bg-forest-deep/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs flex items-center gap-2"
                >
                  <Send size={14} />
                  <span>
                    {submitting
                      ? t('connectModal.sending', { defaultValue: 'Enviando...' })
                      : t('connectModal.submitBtn', { defaultValue: 'Enviar Solicitud' })}
                  </span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
export default ConnectModal;
