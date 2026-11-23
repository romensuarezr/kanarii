import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { formatPhoneDisplay, toTelUrl, toWhatsAppUrl } from '../../lib/phone';

export interface ContactActionsProps {
  phone?: string | null;
  message?: string;
  size?: 'sm' | 'md';
  showPhoneText?: boolean;
  className?: string;
}

export function ContactActions({
  phone,
  message = 'Hola, te escribo desde Kanarii',
  size = 'md',
  showPhoneText = false,
  className = '',
}: ContactActionsProps) {
  if (!phone || !phone.trim()) return null;

  const telUrl = toTelUrl(phone);
  const waUrl = toWhatsAppUrl(phone, undefined, message);
  const formattedDisplay = formatPhoneDisplay(phone);

  const isSmall = size === 'sm';
  const iconSize = isSmall ? 12 : 14;
  const paddingClass = isSmall ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <div className={`inline-flex items-center flex-wrap gap-1.5 ${className}`}>
      {showPhoneText && (
        <span className="text-stone-700 font-medium mr-1">{formattedDisplay}</span>
      )}

      {telUrl && (
        <a
          href={telUrl}
          className={`inline-flex items-center gap-1 font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200 transition-colors shadow-xs ${paddingClass}`}
          title={`Llamar a ${formattedDisplay}`}
        >
          <Phone size={iconSize} />
          <span>Llamar</span>
        </a>
      )}

      {waUrl && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 font-medium bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#075E54] rounded-full border border-[#25D366]/30 transition-colors shadow-xs ${paddingClass}`}
          title={`Abrir chat de WhatsApp con ${formattedDisplay}`}
        >
          <MessageCircle size={iconSize} className="text-[#25D366]" />
          <span>WhatsApp</span>
        </a>
      )}
    </div>
  );
}

export default ContactActions;
