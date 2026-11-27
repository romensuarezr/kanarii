import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Share2, Mail, Link2, Check, Download, X as CloseIcon } from 'lucide-react';
import { WhatsAppIcon, TelegramIcon, LinkedInIcon, XIcon } from '../ui/BrandIcons';
import { useToast } from '../../hooks/useToast';

export interface PasaporteShareModalProps {
  open: boolean;
  onClose: () => void;
  userName: string;
  url: string;
  role?: string;
  kinDesc?: string;
  photoUrl?: string;
}

export function PasaporteShareModal({
  open,
  onClose,
  userName,
  url,
  role = 'Miembro',
  kinDesc,
}: PasaporteShareModalProps) {
  const { t } = useTranslation(['passport', 'common']);
  const [copied, setCopied] = useState(false);
  const toast = useToast();
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  const title = `${userName} en Kanarii`;
  const shareText = `Conoce el pasaporte de ${userName} (${role}${kinDesc ? ` · ${kinDesc}` : ''}) en la tribu Kanarii:`;

  useEffect(() => {
    if (!open) return;
    firstButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const enc = encodeURIComponent;

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title,
          text: shareText,
          url,
        });
        toast.success('¡Compartido con éxito!');
        onClose();
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          toast.error('No se pudo compartir');
        }
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('¡Enlace copiado al portapapeles!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error('No se pudo copiar el enlace');
    }
  };

  const handleDownloadCard = () => {
    // Generar un canvas ligero con la tarjeta de presentación para compartir
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fondo cálido Kanarii
    ctx.fillStyle = '#FDFBF7';
    ctx.fillRect(0, 0, 1200, 630);

    // Borde decorativo
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#CB997E';
    ctx.strokeRect(30, 30, 1140, 570);

    // Cabecera
    ctx.fillStyle = '#6B705C';
    ctx.font = 'bold 32px serif';
    ctx.fillText('TRIBU KANARII · PASAPORTE COMUNITARIO', 80, 110);

    // Nombre
    ctx.fillStyle = '#3E2723';
    ctx.font = 'bold 64px serif';
    ctx.fillText(userName, 80, 210);

    // Rol y Kin
    ctx.fillStyle = '#8A817C';
    ctx.font = '36px sans-serif';
    ctx.fillText(role, 80, 280);

    if (kinDesc) {
      ctx.fillStyle = '#A5A58D';
      ctx.font = 'italic 30px sans-serif';
      ctx.fillText(kinDesc, 80, 340);
    }

    // Pie con URL
    ctx.fillStyle = '#CB997E';
    ctx.font = 'bold 28px monospace';
    ctx.fillText(url, 80, 520);

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `pasaporte-${userName.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    toast.success('¡Tarjeta descargada lista para compartir!');
  };

  const channels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <WhatsAppIcon size={18} className="text-white" />,
      bg: 'bg-[#25D366] hover:bg-[#20BA5A] text-white',
      url: `https://wa.me/?text=${enc(`${shareText} ${url}`)}`,
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: <TelegramIcon size={18} className="text-white" />,
      bg: 'bg-[#0088cc] hover:bg-[#0077b3] text-white',
      url: `https://t.me/share/url?url=${enc(url)}&text=${enc(shareText)}`,
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      icon: <XIcon size={16} className="text-white" />,
      bg: 'bg-stone-900 hover:bg-stone-800 text-white',
      url: `https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(url)}`,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <LinkedInIcon size={16} className="text-white" />,
      bg: 'bg-[#0A66C2] hover:bg-[#084e96] text-white',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    },
    {
      id: 'email',
      name: 'Correo Electrónico',
      icon: <Mail size={18} className="text-stone-700" />,
      bg: 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200',
      url: `mailto:?subject=${enc(title)}&body=${enc(`${shareText}\n\n${url}`)}`,
    },
  ];

  const hasNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('shareModal.title', { defaultValue: 'Compartir Pasaporte' })}
        className="w-full max-w-md bg-[#FDFBF7] rounded-[28px] border border-[#EAE2D6] shadow-2xl p-6 space-y-6 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D6]">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#CB997E]/10 rounded-xl text-[#CB997E]">
              <Share2 size={18} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#4A4E4D]">
                {t('shareModal.title', { defaultValue: 'Compartir Pasaporte' })}
              </h3>
              <p className="text-xs text-stone-500">
                {t('shareModal.subtitle', { defaultValue: 'Muestra tu ficha y saberes al mundo' })}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common:actions.closeModal', { defaultValue: 'Cerrar modal' })}
            className="p-1.5 rounded-full hover:bg-stone-200/60 text-stone-400 hover:text-stone-600 transition-colors"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Acciones Rápidas */}
        <div className="space-y-3">
          {hasNativeShare && (
            <button
              type="button"
              ref={firstButtonRef}
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-[#6B705C] hover:bg-[#5A5A40] text-white rounded-2xl font-bold text-xs transition-all shadow-xs active:scale-98"
            >
              <Share2 size={16} />
              <span>{t('shareModal.shareWithApps', { defaultValue: 'Compartir con aplicaciones de tu dispositivo' })}</span>
            </button>
          )}

          {/* Canales Directos */}
          <div className="grid grid-cols-2 gap-2.5">
            {channels.map((ch) => (
              <a
                key={ch.id}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-2xs active:scale-98 ${ch.bg}`}
              >
                {ch.icon}
                <span className="truncate">{ch.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Enlace y Copiado */}
        <div className="pt-2 border-t border-[#EAE2D6] space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 bg-white border border-[#EAE2D6] rounded-xl px-3 py-2 text-xs text-stone-600 select-all focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2 bg-[#EAE2D6] hover:bg-[#D2B48C]/60 text-[#4A4E4D] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
              title={t('shareModal.copyLink', { defaultValue: 'Copiar enlace' })}
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Link2 size={14} />}
              <span>{copied ? t('shareModal.copied', { defaultValue: '¡Copiado!' }) : t('shareModal.copy', { defaultValue: 'Copiar' })}</span>
            </button>
          </div>

          {/* Descargar Tarjeta */}
          <button
            type="button"
            onClick={handleDownloadCard}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-stone-500 hover:text-stone-800 text-xs font-semibold hover:bg-[#EAE2D6]/40 rounded-xl transition-colors"
          >
            <Download size={14} />
            <span>{t('shareModal.downloadCard', { defaultValue: 'Descargar tarjeta de presentación (PNG)' })}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasaporteShareModal;
