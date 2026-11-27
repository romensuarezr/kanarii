import { useTranslation } from 'react-i18next';
import { FolderKanban } from 'lucide-react';

export default function TareasProyectosTab() {
  const { t } = useTranslation(['admin', 'common']);
  return (
    <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
      <FolderKanban className="w-12 h-12 mb-4 opacity-30" />
      <h3 className="text-lg font-medium">{t('admin:tabs.tareasProyectos')}</h3>
      <p className="text-sm mt-1">{t('admin:placeholderTab.comingSoon')}</p>
    </div>
  );
}
