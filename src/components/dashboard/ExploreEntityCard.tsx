import React from 'react';
import { Calendar, Compass, Home, MapPin, ArrowRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export type ExploreEntityKind = 'node' | 'event' | 'residency';

export interface ExploreEntityCardProps {
  kind: ExploreEntityKind;
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  location?: string;
  imageUrl?: string;
  metaPrimary?: string;
  metaSecondary?: string;
  tags?: string[];
  href: string;
}

const KIND_META: Record<
  ExploreEntityKind,
  { badgeClass: string; fallbackBg: string; Icon: React.ComponentType<{ size?: number; className?: string }> }
> = {
  node: {
    badgeClass: 'bg-amber-100/95 text-amber-900 border-amber-200',
    fallbackBg: 'from-forest-deep/15 via-sand-light to-sand-dark/30',
    Icon: Compass,
  },
  event: {
    badgeClass: 'bg-terracotta-deep/90 text-white border-terracotta-deep',
    fallbackBg: 'from-terracotta-deep/20 via-sand-light to-amber-100/50',
    Icon: Calendar,
  },
  residency: {
    badgeClass: 'bg-forest-deep/90 text-white border-forest-deep',
    fallbackBg: 'from-forest-deep/20 via-emerald-50 to-sand-light',
    Icon: Home,
  },
};

export function ExploreEntityCard({
  kind,
  title,
  subtitle,
  description,
  location,
  imageUrl,
  metaPrimary,
  metaSecondary,
  tags = [],
  href,
}: ExploreEntityCardProps) {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const meta = KIND_META[kind];
  const Icon = meta.Icon;

  const kindLabel =
    kind === 'node'
      ? t('entities.node')
      : kind === 'event'
      ? t('entities.event')
      : t('entities.residency');

  const actionLabel =
    kind === 'node'
      ? t('entities.exploreNode')
      : kind === 'event'
      ? t('entities.viewEvent')
      : t('entities.viewResidency');

  return (
    <article
      onClick={() => navigate(href)}
      className="group bg-bg-surface border border-border rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-forest-deep/40"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(href);
        }
      }}
    >
      <div>
        {/* Cover / Header con imagen o fallback ornamental */}
        <div className="relative h-40 w-full overflow-hidden bg-sand-light">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${meta.fallbackBg} flex items-center justify-center`}>
              <Icon size={44} className="text-forest-deep/20" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Badge del tipo de entidad */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold uppercase tracking-wider border backdrop-blur-xs shadow-2xs ${meta.badgeClass}`}
            >
              <Icon size={11} />
              <span>{kindLabel}</span>
            </span>
          </div>

          {/* Metas flotantes en la imagen (isla, fecha o capacidad) */}
          {(metaPrimary || metaSecondary) && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              {metaPrimary && (
                <span className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-black/60 text-white backdrop-blur-xs border border-white/10 shadow-2xs">
                  {metaPrimary}
                </span>
              )}
              {metaSecondary && (
                <span className="px-2 py-1 rounded-xl text-[10px] font-semibold bg-white/90 text-stone-800 backdrop-blur-xs border border-border shadow-2xs">
                  {metaSecondary}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Contenido Principal */}
        <div className="p-5 space-y-2.5">
          <div>
            <h3 className="font-serif font-bold text-base text-text-strong group-hover:text-forest-deep transition-colors line-clamp-1">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-stone-500 font-medium truncate mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          {location && (
            <div className="inline-flex items-center gap-1 text-xs text-stone-500 font-medium">
              <MapPin size={12} className="text-terracotta-deep shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          )}

          {description && (
            <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
              {description}
            </p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-sand-light text-stone-700 border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-4 pt-2 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-forest-deep">
        <span className="inline-flex items-center gap-1.5">
          <Users size={13} className="text-stone-400" />
          <span>{actionLabel}</span>
        </span>
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </article>
  );
}
