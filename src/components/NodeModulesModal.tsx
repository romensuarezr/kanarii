import { X, Check, Layers, Plus, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Comunidad, NodeModuleId } from '../lib/services/_types';
import { NODE_MODULE_CATALOG, NodeModuleTier, useNodeModules } from '../hooks/useNodeModules';

interface NodeModulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  comunidad: Comunidad | null | undefined;
}

const TIER_ORDER: { id: NodeModuleTier; labelKey: string; defaultLabel: string; hintKey: string; defaultHint: string }[] = [
  {
    id: 'semilla',
    labelKey: 'modules.tierSeed',
    defaultLabel: 'Semilla · Siempre activas',
    hintKey: 'modules.tierSeedHint',
    defaultHint: 'Lo esencial para conversar, quedar y acoger en el nodo.',
  },
  {
    id: 'coordinacion',
    labelKey: 'modules.tierCoord',
    defaultLabel: 'Coordinación · Trabajo en equipo',
    hintKey: 'modules.tierCoordHint',
    defaultHint: 'Activa estas herramientas cuando empecéis a repartir tareas o proyectos.',
  },
  {
    id: 'madurez',
    labelKey: 'modules.tierMaturity',
    defaultLabel: 'Madurez · Gobernanza y Economía',
    hintKey: 'modules.tierMaturityHint',
    defaultHint: 'Actívalas cuando el nodo celebre asambleas, actas o acuerdos internos.',
  },
];

/**
 * Selector progresivo de herramientas de Capa 2 agrupadas en 3 niveles
 * con activación granular por módulo individual.
 */
export function NodeModulesModal({ isOpen, onClose, comunidad }: NodeModulesModalProps) {
  const { t } = useTranslation('common');
  const { isModuleEnabled, toggleModule, isUpdating } = useNodeModules(comunidad);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative bg-bg-surface w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl border border-border shadow-2xl p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto"
        style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sand-light text-forest-deep border border-border">
              <Layers size={11} className="text-forest-moss" />
              <span>{comunidad?.nombre || t('nav.nodeSpace', { defaultValue: 'Espacio del Nodo' })}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-text-strong">
              {t('modules.modalTitle', { defaultValue: 'Herramientas del nodo' })}
            </h2>
            <p className="text-xs text-stone-500">
              {t('modules.modalSubtitle', { defaultValue: 'Activa solo lo que vuestra tribu necesite ahora. Puedes añadir o quitar herramientas en cualquier momento.' })}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-2xl text-stone-400 hover:text-stone-700 hover:bg-sand-light transition-colors cursor-pointer shrink-0"
            aria-label={t('actions.closeModal', { defaultValue: 'Cerrar modal' })}
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5">
          {TIER_ORDER.map((tier) => {
            const items = NODE_MODULE_CATALOG.filter((m) => m.tier === tier.id);
            return (
              <div key={tier.id} className="space-y-2.5">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-forest-deep flex items-center gap-1.5">
                    {tier.id === 'semilla' && <Sparkles size={12} className="text-forest-moss" />}
                    <span>{t(tier.labelKey as any, { defaultValue: tier.defaultLabel })}</span>
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    {t(tier.hintKey as any, { defaultValue: tier.defaultHint })}
                  </p>
                </div>

                <div className="space-y-2">
                  {items.map((mod) => {
                    const enabled = isModuleEnabled(mod.id);
                    const locked = Boolean(mod.alwaysActive);

                    return (
                      <button
                        key={mod.id}
                        type="button"
                        disabled={locked || isUpdating}
                        onClick={() => toggleModule(mod.id as NodeModuleId)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          enabled
                            ? 'bg-sand-light/60 border-forest-deep/30'
                            : 'bg-bg-page border-border hover:border-border-hover'
                        } ${locked ? 'cursor-default opacity-90' : 'cursor-pointer'}`}
                      >
                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-text-strong">
                              {t(mod.labelKey as any, { defaultValue: mod.defaultLabel })}
                            </span>
                            {locked && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-light text-forest-deep">
                                {t('modules.baseBadge', { defaultValue: 'Base' })}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 leading-snug">
                            {t(mod.descKey as any, { defaultValue: mod.defaultDesc })}
                          </p>
                        </div>

                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            enabled
                              ? 'bg-forest-deep text-white'
                              : 'bg-sand-light text-stone-500 border border-border'
                          }`}
                        >
                          {enabled ? <Check size={15} /> : <Plus size={15} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
