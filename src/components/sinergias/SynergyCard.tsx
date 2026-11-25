import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Zap, ArrowRight, Sparkles, Check, HeartHandshake, UserPlus } from 'lucide-react';
import { SynergyMatch } from '../../lib/sinergias';
import { ContactActions } from '../perfil/ContactActions';
import { useTranslation } from 'react-i18next';
import { ConnectModal } from './ConnectModal';

export interface SynergyCardProps {
  match: SynergyMatch;
  onOpenPassport: (userId: string) => void;
  className?: string;
}

export function SynergyCard({ match, onOpenPassport, className = '' }: SynergyCardProps) {
  const { t } = useTranslation('dashboard');
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  const initial = match.targetName ? match.targetName.trim().charAt(0).toUpperCase() : 'M';

  const isHighScore = match.score >= 75;

  const phone = match.targetFicha.datosPersona?.phone || match.targetFicha.datosOnboarding?.phone;
  const telegram = match.targetFicha.datosPersona?.telegram || match.targetFicha.datosOnboarding?.telegram;

  const handleCardClick = () => {
    if (onOpenPassport && match.targetUserId) {
      onOpenPassport(match.targetUserId);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`bg-bg-surface border border-border hover:border-border-hover rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group ${className}`}
    >
      <div className="space-y-4">
        {/* Cabecera: Avatar + Datos + Score */}
        <div className="flex items-start justify-between gap-3">
          <div 
            onClick={handleCardClick}
            className="flex items-start gap-3 min-w-0 cursor-pointer flex-1"
          >
            <div className="relative shrink-0">
              {match.targetAvatar ? (
                <img
                  src={match.targetAvatar}
                  alt={match.targetName}
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
              <h3 className="font-serif font-bold text-base text-text-strong group-hover:text-forest-deep transition-colors truncate">
                {match.targetName}
              </h3>
              {match.targetRole && (
                <p className="text-xs text-stone-500 font-medium truncate">
                  {match.targetRole}
                </p>
              )}
              {match.targetLocation && (
                <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                  <MapPin size={11} className="shrink-0 text-stone-400" />
                  <span className="truncate">{match.targetLocation}</span>
                </div>
              )}
            </div>
          </div>

          {/* Badge de Sinergia Determinista */}
          <div
            className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border shadow-2xs ${
              isHighScore
                ? 'bg-status-success-bg text-status-success-text border-status-success-text/20'
                : 'bg-sand-light text-stone-700 border-border'
            }`}
          >
            <Zap size={12} className={isHighScore ? 'text-status-success-text fill-status-success-text/20' : 'text-stone-500'} />
            <span>{t('card.synergyScore', { score: match.score })}</span>
          </div>
        </div>

        {/* Badges de afinidad */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {match.isSameIsland && match.targetIsland && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-forest-light text-forest-deep border border-forest-deep/20 flex items-center gap-1">
              <span>🌴</span> {match.targetIsland}
            </span>
          )}

          {match.kinMayaRelation && (
            <span 
              title={match.kinMayaRelation.descripcion}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-sand-dark/40 text-stone-700 border border-border flex items-center gap-1"
            >
              <span>{match.kinMayaRelation.badgeLabel}</span>
            </span>
          )}

          {match.humanDesignRelation?.userType && match.humanDesignRelation?.targetType && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-terracotta-light/40 text-terracotta-deep border border-terracotta-deep/20 flex items-center gap-1">
              <span>⚡</span> {match.humanDesignRelation.targetType}
            </span>
          )}
        </div>

        {/* Bio breve */}
        {match.targetBio && (
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {match.targetBio}
          </p>
        )}

        {/* Razones deterministas del match */}
        {match.keyReasons && match.keyReasons.length > 0 && (
          <div className="bg-sand-light/60 rounded-2xl p-3 border border-border/60 space-y-1.5">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1">
              <Sparkles size={11} className="text-forest-deep" />
              <span>{t('card.reasonsTitle')}</span>
            </div>
            <ul className="space-y-1">
              {match.keyReasons.map((reason, idx) => (
                <li key={idx} className="text-xs text-stone-700 flex items-start gap-1.5">
                  <Check size={13} className="text-forest-deep shrink-0 mt-0.5" />
                  <span className="leading-snug">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Puntos de tríada (si hay complementariedad directa) */}
        {match.triadSynergy && (
          (match.triadSynergy.complementaryOfferings.length > 0 ||
           match.triadSynergy.complementaryNeeds.length > 0) && (
            <div className="pt-1 flex flex-wrap gap-2 text-[11px]">
              {match.triadSynergy.complementaryOfferings.slice(0, 1).map((offering, idx) => (
                <div key={idx} className="text-stone-600 bg-bg-surface border border-border rounded-lg px-2 py-1 flex items-center gap-1">
                  <HeartHandshake size={12} className="text-forest-deep" />
                  <span className="font-medium text-stone-700">{t('card.offersTitle')}</span>
                  <span className="truncate max-w-[120px]">{offering}</span>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Footer de Acciones Rápidas */}
      <div className="pt-4 mt-3 border-t border-border flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleCardClick}
          className="text-xs font-semibold text-forest-deep hover:text-forest-deep/80 transition-colors flex items-center gap-1 group/btn"
        >
          <span>{t('card.viewPassport')}</span>
          <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsConnectOpen(true);
            }}
            className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-forest-deep text-white hover:bg-forest-deep/90 transition-colors flex items-center gap-1 shadow-2xs"
          >
            <UserPlus size={12} />
            <span>{t('card.connect')}</span>
          </button>

          {phone && (
            <ContactActions
              phone={phone}
              size="sm"
              iconOnly={true}
            />
          )}

          {telegram && !phone && (
            <a
              href={`https://t.me/${telegram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-sand-dark text-stone-800 hover:bg-sand-dark/80 transition-colors"
            >
              Telegram
            </a>
          )}
        </div>
      </div>

      {/* Modal de Conexión de Sinergia */}
      <ConnectModal
        isOpen={isConnectOpen}
        onClose={() => setIsConnectOpen(false)}
        targetUserId={match.targetUserId}
        targetName={match.targetName}
        targetAvatar={match.targetAvatar}
        targetRole={match.targetRole}
        targetLocation={match.targetLocation}
        synergyScore={match.score}
        synergyData={{
          kinMaya: match.kinMayaRelation?.badgeLabel,
          island: match.targetIsland,
          offerings: match.triadSynergy?.complementaryOfferings,
          needs: match.triadSynergy?.complementaryNeeds,
        }}
      />
    </motion.div>
  );
}
