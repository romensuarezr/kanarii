import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

export const DEFAULT_PHONE_COUNTRY: CountryCode = 'ES';

/**
 * Valida si un número telefónico tiene una estructura plausible/válida.
 */
export function isValidPhone(phone?: string | null, defaultCountry: CountryCode = DEFAULT_PHONE_COUNTRY): boolean {
  if (!phone || typeof phone !== 'string' || !phone.trim()) return false;
  try {
    const phoneNumber = parsePhoneNumberFromString(phone.trim(), defaultCountry);
    return !!phoneNumber && phoneNumber.isValid();
  } catch {
    return false;
  }
}

/**
 * Normaliza cualquier entrada telefónica a formato E.164 (ej: +34600123456).
 * Si no es parseable, devuelve el valor original recortado sin lanzar excepción (fail-safe).
 */
export function normalizePhone(phone?: string | null, defaultCountry: CountryCode = DEFAULT_PHONE_COUNTRY): string {
  if (!phone || typeof phone !== 'string') return '';
  const trimmed = phone.trim();
  if (!trimmed) return '';

  try {
    const phoneNumber = parsePhoneNumberFromString(trimmed, defaultCountry);
    if (phoneNumber && phoneNumber.isValid()) {
      return phoneNumber.number; // Formato E.164 (+34...)
    }
  } catch {
    // Fallback silencioso
  }
  return trimmed;
}

/**
 * Formatea un número para presentación legible (ej: +34 600 12 34 56).
 */
export function formatPhoneDisplay(phone?: string | null, defaultCountry: CountryCode = DEFAULT_PHONE_COUNTRY): string {
  if (!phone || typeof phone !== 'string') return '';
  const trimmed = phone.trim();
  if (!trimmed) return '';

  try {
    const phoneNumber = parsePhoneNumberFromString(trimmed, defaultCountry);
    if (phoneNumber && phoneNumber.isValid()) {
      return phoneNumber.formatInternational();
    }
  } catch {
    // Fallback silencioso
  }
  return trimmed;
}

/**
 * Construye el enlace universal a WhatsApp (`https://wa.me/<dígitos>?text=...`).
 * Reglas de WhatsApp: número completo internacional SIN '+', sin espacios ni guiones.
 * Devuelve `null` si el teléfono no es válido.
 */
export function toWhatsAppUrl(
  phone?: string | null,
  defaultCountry: CountryCode = DEFAULT_PHONE_COUNTRY,
  message = 'Hola, te escribo desde Kanarii'
): string | null {
  if (!phone || typeof phone !== 'string') return null;
  const trimmed = phone.trim();
  if (!trimmed) return null;

  try {
    const phoneNumber = parsePhoneNumberFromString(trimmed, defaultCountry);
    if (phoneNumber && phoneNumber.isValid()) {
      // Extraemos solo dígitos (el formato E.164 empieza con '+')
      const digitsOnly = phoneNumber.number.replace(/\D/g, '');
      const queryParam = message ? `?text=${encodeURIComponent(message)}` : '';
      return `https://wa.me/${digitsOnly}${queryParam}`;
    }
  } catch {
    // Fallback silencioso
  }

  return null;
}

/**
 * Genera el enlace nativo para llamadas (`tel:+34...`).
 */
export function toTelUrl(phone?: string | null, defaultCountry: CountryCode = DEFAULT_PHONE_COUNTRY): string | null {
  const normalized = normalizePhone(phone, defaultCountry);
  if (!normalized) return null;
  return `tel:${normalized}`;
}
