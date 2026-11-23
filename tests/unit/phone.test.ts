import { describe, it, expect } from 'vitest';
import {
  isValidPhone,
  normalizePhone,
  formatPhoneDisplay,
  toWhatsAppUrl,
  toTelUrl,
} from '../../src/lib/phone';

describe('Phone Utilities (E.164 & WhatsApp)', () => {
  it('valida correctamente números españoles móviles y fijos', () => {
    expect(isValidPhone('600123456')).toBe(true);
    expect(isValidPhone('+34 600 12 34 56')).toBe(true);
    expect(isValidPhone('928123456')).toBe(true);
    expect(isValidPhone('12345')).toBe(false);
    expect(isValidPhone('')).toBe(false);
    expect(isValidPhone(null)).toBe(false);
  });

  it('normaliza a formato E.164', () => {
    expect(normalizePhone('600123456')).toBe('+34600123456');
    expect(normalizePhone('+34 600 12 34 56')).toBe('+34600123456');
    expect(normalizePhone('0034 600 123 456')).toBe('+34600123456');
    expect(normalizePhone('928-12-34-56')).toBe('+34928123456');
    // Fallback si no es parseable
    expect(normalizePhone('invalido')).toBe('invalido');
    expect(normalizePhone('')).toBe('');
  });

  it('formatea para visualización internacional legible', () => {
    expect(formatPhoneDisplay('600123456')).toBe('+34 600 12 34 56');
    expect(formatPhoneDisplay('+34600123456')).toBe('+34 600 12 34 56');
  });

  it('construye URL de WhatsApp oficial sin el signo más', () => {
    const waUrl = toWhatsAppUrl('600123456', 'ES', 'Hola Kanarii');
    expect(waUrl).toBe('https://wa.me/34600123456?text=Hola%20Kanarii');

    // Sin mensaje personalizado
    expect(toWhatsAppUrl('+34 600 12 34 56', 'ES', '')).toBe('https://wa.me/34600123456');

    // Teléfono inválido devuelve null
    expect(toWhatsAppUrl('12345')).toBeNull();
    expect(toWhatsAppUrl('')).toBeNull();
  });

  it('genera enlace tel: en formato E.164', () => {
    expect(toTelUrl('600123456')).toBe('tel:+34600123456');
    expect(toTelUrl('')).toBeNull();
  });
});
