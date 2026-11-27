import { Store, Scroll, Leaf, Settings, Handshake, ShieldCheck, Map, CheckCircle2, Zap } from 'lucide-react';
import ContextualEmptyState from './ContextualEmptyState';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

// 1. Marketplace Empty State
export function MarketplaceEmptyState({ onAction }: { onAction: () => void }) {
  const { t } = useTranslation('common');
  return (
    <ContextualEmptyState
      title={t('emptyStates.marketplaceTitle')}
      description={t('emptyStates.marketplaceDesc')}
      icon={Store}
      ctaText={t('emptyStates.marketplaceCta')}
      onAction={onAction}
      illustration={
        <div className="relative flex items-center justify-center">
            <div className="w-32 h-32 bg-amber-50 rounded-[32px] flex items-center justify-center text-amber-600 border border-amber-100 shadow-lg scale-110">
                <Handshake size={64} strokeWidth={1} />
            </div>
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 3 }}
               className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-xl text-emerald-500 border border-emerald-50"
            >
               <Leaf size={24} />
            </motion.div>
        </div>
      }
    />
  );
}

// 2. Actas (Minutes) Empty State
export function ActasEmptyState({ onAction, canCreate = true }: { onAction: () => void; canCreate?: boolean }) {
  const { t } = useTranslation('common');
  return (
    <ContextualEmptyState
      title={t('emptyStates.historyTitle')}
      description={t('emptyStates.historyDesc')}
      icon={Scroll}
      ctaText={canCreate ? t('emptyStates.historyCtaCreate') : t('emptyStates.historyCtaView')}
      onAction={onAction}
      iconColor="text-indigo-600"
      illustration={
        <div className="relative">
            <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-700 shadow-inner overflow-hidden border-4 border-white">
                <Scroll size={64} strokeWidth={1.5} />
            </div>
            <motion.div
               animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
               transition={{ repeat: Infinity, duration: 4 }}
               className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full"
            />
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg">
                <ShieldCheck size={20} />
            </div>
        </div>
      }
    />
  );
}

// 3. Proyectos Empty State
export function ProjectsEmptyState({ onAction }: { onAction: () => void }) {
  const { t } = useTranslation('common');
  return (
    <ContextualEmptyState
      title={t('emptyStates.ideasTitle')}
      description={t('emptyStates.ideasDesc')}
      icon={Map}
      ctaText={t('emptyStates.ideasCta')}
      iconColor="text-emerald-600"
      onAction={onAction}
      illustration={
        <div className="w-40 h-32 relative flex items-center justify-center">
             <motion.div 
               animate={{ height: [40, 80, 75] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
               className="w-1 bg-emerald-300 rounded-full absolute bottom-4"
             />
             <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: [0, 1.2, 1] }}
               transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2.5 }}
               className="absolute top-4 text-emerald-600"
             >
                <Leaf size={48} />
             </motion.div>
             <div className="w-24 h-12 bg-[#D2B48C]/20 rounded-full absolute bottom-0 blur-sm" />
        </div>
      }
    />
  );
}

// 4. Tareas (Tasks) Empty State
export function TasksEmptyState({ onAction }: { onAction: () => void }) {
  const { t } = useTranslation('common');
  return (
    <ContextualEmptyState
      title={t('emptyStates.tasksTitle')}
      description={t('emptyStates.tasksDesc')}
      icon={Settings}
      ctaText={t('emptyStates.tasksCta')}
      iconColor="text-[#8B4513]"
      onAction={onAction}
      illustration={
        <div className="relative w-40 h-40 flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-[#D2B48C]/40"
            >
                <Settings size={80} strokeWidth={1} />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-emerald-600 border border-emerald-50">
                    <CheckCircle2 size={32} />
                </div>
            </div>
            <motion.div
               animate={{ x: [0, 10, 0], opacity: [0.3, 0.7, 0.3] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute top-4 right-4 text-amber-500"
            >
               <Zap size={24} />
            </motion.div>
        </div>
      }
    />
  );
}
