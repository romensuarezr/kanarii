import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone } from 'lucide-react';
import { formatPhoneDisplay, toTelUrl, toWhatsAppUrl } from '../../lib/phone';
import { WhatsAppIcon } from '../ui/BrandIcons';

export interface ContactActionsProps {
  phone?: string | null;
  message?: string;
  size?: 'sm' | 'md';
  showPhoneText?: boolean;
  className?: string;
  showCall?: boolean;
  whatsappLabel?: string;
  iconOnly?: boolean;
}

export function ContactActions({
  phone,
  message = 'Hola, te escribo desde Kanarii',
  size = 'md',
  showPhoneText = false,
  className = '',
  showCall = true,
  whatsappLabel = 'WhatsApp',
  iconOnly = false,
}: ContactActionsProps) {
  const { t } = useTranslation('passport');
  if (!phone || !phone.trim()) return null;

  const telUrl = toTelUrl(phone);
  const waUrl = toWhatsAppUrl(phone, undefined, message);
  const formattedDisplay = formatPhoneDisplay(phone);

  const isSmall = size === 'sm';
  const iconSize = isSmall ? 13 : 15;
  const paddingClass = isSmall ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs';

  if (iconOnly) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        {showCall && telUrl && (
          <a
            href={telUrl}
            className="w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-emerald-700 border border-emerald-200 transition-colors shadow-2xs"
            title={`Llamar a ${formattedDisplay}`}
            aria-label={`Llamar a ${formattedDisplay}`}
          >
            <Phone size={14} />
          </a>
        )}

        {waUrl && (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20BA5A] flex items-center justify-center text-white transition-colors shadow-2xs"
            title={`Abrir chat de WhatsApp con ${formattedDisplay}`}
            aria-label={`Abrir chat de WhatsApp con ${formattedDisplay}`}
          >
            <WhatsAppIcon size={16} />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center flex-wrap gap-2 ${className}`}>
      {showPhoneText && (
        <span className="text-stone-700 font-medium mr-1 text-sm">{formattedDisplay}</span>
      )}

      {showCall && telUrl && (
        <a
          href={telUrl}
          className={`inline-flex items-center gap-1.5 font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200 transition-colors shadow-2xs ${paddingClass}`}
          title={t('contactActions.callTo', { name: formattedDisplay, defaultValue: `Llamar a ${formattedDisplay}` })}
        >
          <Phone size={iconSize} className="text-emerald-600" />
          <span>{t('contactActions.call', { defaultValue: 'Llamar' })}</span>
        </a>
      )}

      {waUrl && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 font-semibold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#075E54] rounded-full border border-[#25D366]/40 transition-colors shadow-2xs ${paddingClass}`}
          title={t('contactActions.openWhatsApp', { name: formattedDisplay, defaultValue: `Abrir chat de WhatsApp con ${formattedDisplay}` })}
        >
          <WhatsAppIcon size={iconSize} className="text-[#25D366]" />
          <span>{whatsappLabel}</span>
        </a>
      )}
    </div>
  );
}

export default ContactActions;
