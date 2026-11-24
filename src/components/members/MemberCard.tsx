import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowRight, Sparkles, User, HeartHandshake } from 'lucide-react';
import { ContactActions } from '../perfil/ContactActions';
import { useTranslation } from 'react-i18next';

export interface MemberCardProps {
  id: string;
  name: string;
  photoUrl?: string;
  role?: string;
  location?: string;
  bio?: string;
  saberes?: string[];
  ofrendas?: string[];
  necesidades?: string[];
  phone?: string;
  telegram?: string;
  email?: string;
  onOpenPassport?: (id: string) => void;
  className?: string;
}

export function MemberCard({
  id,
  name,
  photoUrl,
  role,
  location,
  bio,
  saberes = [],
  ofrendas = [],
  necesidades = [],
  phone,
  telegram,
  email,
  onOpenPassport,
  className = '',
}: MemberCardProps) {
  const { t } = useTranslation('passport');

  const initial = name ? name.trim().charAt(0).toUpperCase() : 'M';

  // Combinamos ofrendas y saberes para las pills de aporte
  const allOfferings = Array.from(new Set([...ofrendas, ...saberes])).filter(Boolean);
  const displayOfferings = allOfferings.slice(0, 2);

  const displayNeeds = necesidades.filter(Boolean).slice(0, 2);

  const handleCardClick = () => {
    if (onOpenPassport && id) {
      onOpenPassport(id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
      className={`bg-bg-surface border border-border hover:border-border-hover rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group select-none ${className}`}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="space-y-3.5">
        {/* Cabecera: Avatar + Nombre + Rol */}
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={name}
                className="w-12 h-12 rounded-2xl object-cover border border-border group-hover:scale-102 transition-transform shadow-xs"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-forest-deep/10 text-forest-deep border border-border flex items-center justify-center font-bold font-serif text-lg shadow-xs group-hover:scale-102 transition-transform">
                {initial}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h4 className="font-serif font-bold text-base text-text-strong group-hover:text-forest-deep transition-colors truncate">
                {name}
              </h4>
            </div>

            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              {role ? (
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-deep bg-bg-page px-2 py-0.5 rounded-md border border-border">
                  {role}
                </span>
              ) : (
                <span className="text-[10px] font-medium text-forest-mid">
                  {t('card.activeMember')}
                </span>
              )}

              {location && (
                <span className="text-[11px] text-text-ink/70 flex items-center gap-1 truncate">
                  <MapPin size={11} className="text-forest-mid shrink-0" />
                  <span className="truncate">{location}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bio corta */}
        {bio && (
          <p className="text-xs text-text-ink/80 line-clamp-2 leading-relaxed">
            {bio}
          </p>
        )}

        {/* Tríada de Saberes y Necesidades */}
        {(displayOfferings.length > 0 || displayNeeds.length > 0) && (
          <div className="space-y-2 pt-2 border-t border-border/60 text-xs">
            {displayOfferings.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-deep block mb-1">
                  {t('card.skillsLabel')}
                </span>
                <div className="flex flex-wrap gap-1">
                  {displayOfferings.map((offering, idx) => (
                    <span
                      key={idx}
                      className="bg-status-success-bg/30 text-status-success-text border border-status-success-bg/50 px-2 py-0.5 rounded-lg text-[10px] font-medium truncate max-w-[180px]"
                    >
                      {offering}
                    </span>
                  ))}
                  {allOfferings.length > 2 && (
                    <span className="text-[10px] text-forest-mid self-center font-medium">
                      +{allOfferings.length - 2}
                    </span>
                  )}
                </div>
              </div>
            )}

            {displayNeeds.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-terracota block mb-1">
                  {t('card.needsLabel')}
                </span>
                <div className="flex flex-wrap gap-1">
                  {displayNeeds.map((need, idx) => (
                    <span
                      key={idx}
                      className="bg-brand-terracota/10 text-brand-terracota border border-brand-terracota/20 px-2 py-0.5 rounded-lg text-[10px] font-medium truncate max-w-[180px]"
                    >
                      {need}
                    </span>
                  ))}
                  {necesidades.length > 2 && (
                    <span className="text-[10px] text-brand-terracota/80 self-center font-medium">
                      +{necesidades.length - 2}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer de Tarjeta: Contacto Directo + Ver Pasaporte */}
      <div className="pt-3 mt-3 border-t border-border/60 flex items-center justify-between gap-2">
        {/* Acciones de contacto (evitan propagar el click de la tarjeta) */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5"
        >
          {phone ? (
            <ContactActions
              phone={phone}
              size="sm"
              iconOnly={true}
              message={`Hola ${name}, te escribo desde la tribu en Kanarii`}
            />
          ) : (
            <span className="text-[10px] text-forest-mid italic flex items-center gap-1">
              <HeartHandshake size={12} />
              <span>Kanarii</span>
            </span>
          )}
        </div>

        {/* Ver Pasaporte / Modal trigger */}
        <div className="flex items-center gap-1 text-xs font-semibold text-forest-deep group-hover:text-forest-mid transition-colors">
          <span>{t('card.viewPassport')}</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
