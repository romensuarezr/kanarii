import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, Shield, User, Globe, Send, LogOut, ArrowLeft, Eye, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useFicha } from '../hooks/useFicha';
import { useToast } from '../hooks/useToast';
import { TelegramLinkModal } from '../components/perfil/TelegramLinkModal';
import { saveFicha, PRIVACIDAD_DEFAULT, getTriadaFromFicha } from '../lib/appService';
import { getMergedDatosPersona } from '../components/perfil/FichaReadOnly';

export function AjustesView() {
  const navigate = useNavigate();
  const { appUser, logout } = useAuth();
  const { ficha, loading: loadingFicha } = useFicha();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<'privacidad' | 'perfil' | 'cuenta'>('privacidad');
  const [localFicha, setLocalFicha] = useState(ficha);
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  if (loadingFicha || !appUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#8A817C]">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-sm font-medium">Cargando configuración...</p>
      </div>
    );
  }

  const displayFicha = localFicha || ficha;
  const datos = getMergedDatosPersona(displayFicha);
  const triada = getTriadaFromFicha(displayFicha);

  const handleTogglePrivacidad = async (key: string) => {
    if (!appUser || !displayFicha) return;
    setSavingKey(key);
    const currentPrivacidad = displayFicha.privacidad || PRIVACIDAD_DEFAULT;
    const isCurrentlyEnabled = currentPrivacidad[key as keyof typeof currentPrivacidad] ?? 
      (key === 'phone' || key === 'email' ? false : true);

    const nuevaPrivacidad = {
      ...currentPrivacidad,
      [key]: !isCurrentlyEnabled
    };

    const updatedFicha = {
      ...displayFicha,
      privacidad: nuevaPrivacidad
    };

    setLocalFicha(updatedFicha);

    try {
      const triadaObj = {
        ofrendas: triada.ofrendas || [],
        saberes: triada.saberes || [],
        necesidades: triada.necesidades || []
      };
      await saveFicha(appUser.uid, datos as any, displayFicha.id || appUser.uid, true, triadaObj, nuevaPrivacidad);

      const { sincronizarPasaporte } = await import('../lib/pasaporte');
      await sincronizarPasaporte(updatedFicha, appUser.uid, appUser.displayName || undefined, appUser.photoURL || undefined);
      toast.success("Ajuste de visibilidad guardado y sincronizado");
    } catch (e) {
      console.error("Error al guardar privacidad en Ajustes:", e);
      toast.error("Error al actualizar la visibilidad");
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAE2D6] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/perfil" className="text-stone-400 hover:text-stone-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-bold font-serif text-[#4A4E4D] flex items-center gap-2">
              <Settings className="w-6 h-6 text-[#6B705C]" />
              Ajustes y Configuración
            </h1>
          </div>
          <p className="text-stone-500 text-sm">Gestiona la privacidad de tu pasaporte, visibilidad de contacto y opciones de tu cuenta.</p>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="flex border-b border-[#EAE2D6] gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('privacidad')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'privacidad'
              ? 'border-[#6B705C] text-[#6B705C]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Shield className="w-4 h-4" />
          Privacidad y Pasaporte
        </button>
        <button
          onClick={() => setActiveTab('perfil')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'perfil'
              ? 'border-[#6B705C] text-[#6B705C]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <User className="w-4 h-4" />
          Ficha e Identidad
        </button>
        <button
          onClick={() => setActiveTab('cuenta')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'cuenta'
              ? 'border-[#6B705C] text-[#6B705C]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          Cuenta y Conexiones
        </button>
      </div>

      {/* Tab: Privacidad */}
      {activeTab === 'privacidad' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EAE2D6] shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-[#6B705C]" />
              <div>
                <h2 className="text-lg font-bold font-serif text-[#4A4E4D]">Dimensiones Galácticas y Astrales</h2>
                <p className="text-xs text-stone-500">Elige qué facetas de tu diseño humano, astrología y manual son visibles comunitariamente.</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { key: 'arquetipo', label: 'Arquetipo y Perfil', desc: 'Muestra tu arquetipo de personalidad, fortalezas, sombras y rol sociocrático sugerido.' },
                { key: 'disenoHumano', label: 'Diseño Humano', desc: 'Muestra tu tipo de diseño humano, autoridad y perfil.' },
                { key: 'kinMaya', label: 'Kin Maya / Firma Galáctica', desc: 'Muestra tu Kin Maya, sello galáctico y rol comunitario maya.' },
                { key: 'datosAstrologicos', label: 'Datos Astrológicos', desc: 'Muestra tu Sol, Luna, Ascendente y elementos dominantes.' },
                { key: 'manualCompleto', label: 'Manual de Usuario Humano', desc: 'Muestra el manual de convivencia autogenerado con tus 5 secciones.' }
              ].map(({ key, label, desc }) => {
                const privacidad = displayFicha?.privacidad || PRIVACIDAD_DEFAULT;
                const isEnabled = privacidad[key as keyof typeof privacidad] ?? true;
                const isSaving = savingKey === key;

                return (
                  <div key={key} className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[#F9F7F1] border border-[#EAE2D6]">
                    <div className="flex-1 min-w-0">
                      <span className="font-serif font-medium text-stone-800 text-sm md:text-base">{label}</span>
                      <p className="text-stone-500 text-xs md:text-sm mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => handleTogglePrivacidad(key)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isEnabled ? 'bg-[#6B705C]' : 'bg-stone-300'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EAE2D6] shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-[#CB997E]" />
              <div>
                <h2 className="text-lg font-bold font-serif text-[#4A4E4D]">Redes Sociales y Canales de Contacto</h2>
                <p className="text-xs text-stone-500">Configura qué datos de contacto directo se muestran en tu pasaporte público.</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { key: 'instagram', label: 'Instagram', desc: 'Muestra tu handle de Instagram y enlace directo a tu perfil.' },
                { key: 'linkedin', label: 'LinkedIn', desc: 'Muestra tu perfil profesional de LinkedIn en el pasaporte.' },
                { key: 'website', label: 'Sitio Web', desc: 'Enlace directo a tu web personal o proyecto.' },
                { key: 'phone', label: 'Teléfono y WhatsApp', desc: 'Muestra los botones de llamada nativa y apertura directa en WhatsApp.' },
                { key: 'email', label: 'Correo Electrónico', desc: 'Muestra tu dirección de email pública para contacto comunitario.' }
              ].map(({ key, label, desc }) => {
                const privacidad = displayFicha?.privacidad || PRIVACIDAD_DEFAULT;
                const isEnabled = privacidad[key as keyof typeof privacidad] ?? (key === 'phone' || key === 'email' ? false : true);
                const isSaving = savingKey === key;

                return (
                  <div key={key} className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[#F9F7F1] border border-[#EAE2D6]">
                    <div className="flex-1 min-w-0">
                      <span className="font-serif font-medium text-stone-800 text-sm md:text-base">{label}</span>
                      <p className="text-stone-500 text-xs md:text-sm mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => handleTogglePrivacidad(key)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isEnabled ? 'bg-[#6B705C]' : 'bg-stone-300'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Ficha e Identidad */}
      {activeTab === 'perfil' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EAE2D6] shadow-sm space-y-6">
            <h2 className="text-lg font-bold font-serif text-[#4A4E4D]">Acciones Rápidas de tu Identidad</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/ficha?edit=1"
                className="p-5 rounded-2xl bg-[#F9F7F1] border border-[#EAE2D6] hover:bg-[#EAE2D6]/40 transition-colors flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-[#4A4E4D] text-sm">Editar mi Ficha</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Modifica tus saberes, ofrendas, rol y datos personales</p>
                </div>
                <span className="text-[#6B705C] font-bold text-xs">Ir →</span>
              </Link>

              {appUser.uid && (
                <Link
                  to={`/p/${appUser.uid}`}
                  className="p-5 rounded-2xl bg-[#F9F7F1] border border-[#EAE2D6] hover:bg-[#EAE2D6]/40 transition-colors flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-[#4A4E4D] text-sm">Mi Pasaporte Universal</h3>
                    <p className="text-xs text-stone-500 mt-0.5">Visualiza tu carta de presentación tal como la ve la comunidad</p>
                  </div>
                  <span className="text-[#6B705C] font-bold text-xs">Ver →</span>
                </Link>
              )}

              <Link
                to="/perfil"
                className="p-5 rounded-2xl bg-[#F9F7F1] border border-[#EAE2D6] hover:bg-[#EAE2D6]/40 transition-colors flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-[#4A4E4D] text-sm">Mi Perfil Completo</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Revisa la vista unificada de perfil y pasaporte</p>
                </div>
                <span className="text-[#6B705C] font-bold text-xs">Ir →</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Cuenta */}
      {activeTab === 'cuenta' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EAE2D6] shadow-sm space-y-6">
            <h2 className="text-lg font-bold font-serif text-[#4A4E4D]">Datos de Cuenta y Sesión</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2.5 border-b border-stone-50">
                <span className="text-sm text-stone-500">Nombre de usuario</span>
                <span className="text-sm font-medium text-[#4A4E4D]">{appUser.displayName || '—'}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-stone-50">
                <span className="text-sm text-stone-500">Correo Electrónico</span>
                <span className="text-sm font-medium text-[#4A4E4D]">{appUser.email || '—'}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-stone-50">
                <span className="text-sm text-stone-500">Rol Global</span>
                <span className="inline-block px-2.5 py-0.5 text-xs font-bold text-[#6B705C] bg-[#EAE2D6] rounded-full uppercase">
                  {appUser.role}
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-stone-50">
                <span className="text-sm text-stone-500">ID de Usuario</span>
                <span className="text-xs font-mono text-stone-400">{appUser.uid}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAE2D6] flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button
                type="button"
                onClick={() => setIsTelegramModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#CB997E]/10 hover:bg-[#CB997E]/20 text-[#CB997E] border border-[#CB997E]/30 rounded-xl text-sm font-bold transition-colors"
              >
                <Send className="w-4 h-4" />
                Vincular con Telegram
              </button>

              <button
                type="button"
                onClick={() => logout()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-sm font-bold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de vinculación de Telegram */}
      <TelegramLinkModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
      />
    </div>
  );
}

export default AjustesView;
