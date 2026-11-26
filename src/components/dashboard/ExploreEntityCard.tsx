import React from 'react';
import { Calendar, Compass, Home, MapPin, ArrowRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  { label: string; badgeClass: string; fallbackBg: string; Icon: React.ComponentType<{ size?: number; className?: string }> }
> = {
  node: {
    label: 'Nodo',
    badgeClass: 'bg-amber-100/95 text-amber-900 border-amber-200',
    fallbackBg: 'from-forest-deep/15 via-sand-light to-sand-dark/30',
    Icon: Compass,
  },
  event: {
    label: 'Evento',
    badgeClass: 'bg-terracotta-deep/90 text-white border-terracotta-deep',
    fallbackBg: 'from-terracotta-deep/20 via-sand-light to-amber-100/50',
    Icon: Calendar,
  },
  residency: {
    label: 'Estancia',
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
  const meta = KIND_META[kind];
  const Icon = meta.Icon;

  return (
    <article
      onClick={() => navigate(href)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(href);
        }
      }}
      className="bg-bg-surface border border-border hover:border-border-hover rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
    >
      {/* Portada visual estilo ReTribalize */}
      <div>
        <div className={`relative h-44 w-full overflow-hidden bg-gradient-to-br ${meta.fallbackBg}`}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-forest-deep/40">
              <Icon size={40} />
            </div>
          )}

          {/* Badge superior izquierdo */}
          <span
            className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-xs ${meta.badgeClass}`}
          >
            <Icon size={12} />
            {meta.label}
          </span>

          {/* Metadato superior derecho (fecha / plazas / tipo) */}
          {(metaPrimary || metaSecondary) && (
            <div className="absolute top-3 right-3 flex flex-col items-end gap-1 max-w-[55%]">
              {metaPrimary && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-900/75 text-white backdrop-blur-xs truncate max-w-full">
                  {metaPrimary}
                </span>
              )}
              {metaSecondary && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/90 text-stone-800 shadow-2xs truncate max-w-full">
                  {metaSecondary}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-5 space-y-2.5">
          <div>
            <h3 className="font-serif font-bold text-base text-text-strong group-hover:text-forest-deep transition-colors line-clamp-1">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs font-medium text-stone-500 line-clamp-1 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          {location && (
            <div className="flex items-center gap-1.5 text-xs text-stone-500">
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
          <span>Explorar {meta.label.toLowerCase()}</span>
        </span>
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </article>
  );
}
