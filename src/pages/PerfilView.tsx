import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFicha } from '../hooks/useFicha';
import { User, Loader2, Sparkles, Fingerprint, Edit2, Globe } from 'lucide-react';
import PasaporteVisual from '../components/perfil/PasaporteVisual';
import { getTriadaFromFicha } from '../lib/appService';
import { calcularKin } from '../lib/kinMaya';

function ContactRow({ label, value, href }: { label: string; value?: string; href?: string }) {
  if (!value || !value.trim()) return null;
  return (
    <div className="flex justify-between items-center gap-4 py-2 border-b border-stone-50 last:border-0">
      <span className="text-sm text-stone-500 shrink-0">{label}</span>
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="text-sm font-medium text-[#6B705C] hover:text-[#4A4E4D] hover:underline truncate max-w-[60%] text-right"
        >
          {value}
        </a>
      ) : (
        <span className="text-sm font-medium text-[#4A4E4D] truncate max-w-[60%] text-right">{value}</span>
      )}
    </div>
  );
}

export function PerfilView() {
  const { appUser } = useAuth();
  const { ficha, loading: loadingFicha } = useFicha();

  if (loadingFicha || !appUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#8A817C]">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-sm font-medium">Cargando tu perfil...</p>
      </div>
    );
  }

  const triada = getTriadaFromFicha(ficha);
  const kinMaya = ficha?.datosOnboarding?.fechaNacimiento
    ? calcularKin(ficha.datosOnboarding.fechaNacimiento)
    : undefined;

  const mappedUser = {
    name: appUser.displayName || 'Miembro',
    avatarUrl: appUser.photoURL || undefined,
    roles: [appUser.role || 'user'],
    offerings: triada.ofrendas || [],
    knowledges: triada.saberes || [],
    needs: triada.necesidades || [],
    kinMaya,
    arquetipo: ficha?.perfilVisual?.arquetipo,
    descripcionArquetipo: ficha?.perfilVisual?.descripcion_arquetipo,
    communityIds: appUser.communityIds || [],
    instagram: ficha?.datosPersona?.instagram || ficha?.datosOnboarding?.instagram,
    linkedin: ficha?.datosPersona?.linkedin || ficha?.datosOnboarding?.linkedin,
    website: ficha?.datosPersona?.website || ficha?.datosOnboarding?.website,
    phone: ficha?.datosPersona?.phone || ficha?.datosOnboarding?.phone,
    email: ficha?.datosPersona?.email || ficha?.datosOnboarding?.email,
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#4A4E4D] flex items-center gap-2">
            <User className="w-6 h-6" />
            Tu Perfil
          </h1>
          <p className="text-stone-500 text-sm">Gestiona tu identidad y visibilidad en Kanarii</p>
        </div>
        <Link
          to="/ficha?edit=1"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#A5A58D] hover:bg-[#6B705C] text-white rounded-xl text-sm font-bold transition-colors shadow-sm"
        >
          <Edit2 className="w-4 h-4" />
          Editar ficha
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Vista previa de tu Pasaporte
          </h2>
          <PasaporteVisual
            user={mappedUser as any}
            privacidad={ficha?.privacidad}
            connectionStatus="self"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#EAE2D6] shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#4A4E4D] flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-[#CB997E]" />
              Identidad Kanarii
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-stone-50">
                <span className="text-sm text-stone-500">Nombre Público</span>
                <span className="text-sm font-medium text-[#4A4E4D]">{appUser.displayName}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-stone-50">
                <span className="text-sm text-stone-500">Email</span>
                <span className="text-sm font-medium text-[#4A4E4D]">{appUser.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-stone-50">
                <span className="text-sm text-stone-500">Rol Global</span>
                <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#6B705C] bg-[#EAE2D6] rounded-full">
                  {appUser.role}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EAE2D6] shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#4A4E4D] flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#CB997E]" />
              Redes y contacto
            </h3>
            <div className="space-y-0">
              <ContactRow
                label="Instagram"
                value={mappedUser.instagram}
                href={mappedUser.instagram ? `https://instagram.com/${mappedUser.instagram.replace('@', '')}` : undefined}
              />
              <ContactRow
                label="LinkedIn"
                value={mappedUser.linkedin}
                href={mappedUser.linkedin ? (mappedUser.linkedin.startsWith('http') ? mappedUser.linkedin : `https://linkedin.com/in/${mappedUser.linkedin}`) : undefined}
              />
              <ContactRow
                label="Web"
                value={mappedUser.website}
                href={mappedUser.website ? (mappedUser.website.startsWith('http') ? mappedUser.website : `https://${mappedUser.website}`) : undefined}
              />
              <ContactRow
                label="Teléfono"
                value={mappedUser.phone}
                href={mappedUser.phone ? `tel:${mappedUser.phone}` : undefined}
              />
              <ContactRow
                label="Email"
                value={mappedUser.email}
                href={mappedUser.email ? `mailto:${mappedUser.email}` : undefined}
              />
            </div>
            {!mappedUser.instagram && !mappedUser.linkedin && !mappedUser.website && !mappedUser.phone && !mappedUser.email && (
              <p className="text-sm text-stone-400">Añade tus redes y contacto desde «Editar ficha».</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilView;
