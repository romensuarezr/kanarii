import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Tarea, Proyecto } from '../lib/appService';

interface CreateTareaModalProps {
  tareaToEdit?: Tarea | null;
  members: any[];
  proyectos: Proyecto[];
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export function CreateTareaModal({ 
  tareaToEdit, 
  members, 
  proyectos, 
  isSubmitting, 
  onClose, 
  onSubmit 
}: CreateTareaModalProps) {
  const { t } = useTranslation('projects');
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    asignadaA: '',
    fechaLimite: '',
    proyectoId: ''
  });

  useEffect(() => {
    if (tareaToEdit) {
      let dateStr = '';
      if (tareaToEdit.fechaLimite) {
        const d = (tareaToEdit.fechaLimite as any).toDate ? (tareaToEdit.fechaLimite as any).toDate() : new Date(tareaToEdit.fechaLimite);
        dateStr = d.toISOString().split('T')[0];
      }
      setFormData({
        titulo: tareaToEdit.titulo,
        descripcion: tareaToEdit.descripcion || '',
        asignadaA: tareaToEdit.asignadaA || '',
        fechaLimite: dateStr,
        proyectoId: tareaToEdit.proyectoId || ''
      });
    }
  }, [tareaToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo.trim()) return;
    
    const data = {
      ...formData,
      fechaLimite: formData.fechaLimite ? new Date(formData.fechaLimite) : undefined,
      descripcion: formData.descripcion.trim() || undefined,
      asignadaA: formData.asignadaA || undefined,
      proyectoId: formData.proyectoId || undefined
    };
    
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-xl overflow-hidden">
        <div className="p-6 border-b border-[#EAE2D6] flex justify-between items-center bg-[#FDFBF7]">
          <h2 className="text-xl font-serif text-[#4A4E4D]">{tareaToEdit ? t('tasks.modal.editTitle') : t('tasks.modal.newTitle')}</h2>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 transition-colors p-1 rounded-full"
            aria-label={t('tasks.modal.cancel')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t('tasks.modal.title')}</label>
            <input
              required
              type="text"
              value={formData.titulo}
              onChange={e => setFormData({ ...formData, titulo: e.target.value })}
              className="w-full rounded-xl border-[#EAE2D6] focus:border-[#CB997E] focus:ring-[#CB997E] transition-colors"
              placeholder={t('tasks.modal.titlePlaceholder')}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t('tasks.modal.description')}</label>
            <textarea
              rows={3}
              value={formData.descripcion}
              onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full rounded-xl border-[#EAE2D6] focus:border-[#CB997E] focus:ring-[#CB997E] transition-colors resize-none"
              placeholder={t('tasks.modal.descPlaceholder')}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t('tasks.modal.assignTo')}</label>
            <select
              value={formData.asignadaA}
              onChange={e => setFormData({ ...formData, asignadaA: e.target.value })}
              className="w-full rounded-xl border-[#EAE2D6] focus:border-[#CB997E] focus:ring-[#CB997E] transition-colors bg-white"
              disabled={isSubmitting}
            >
              <option value="">{t('tasks.modal.unassigned')}</option>
              {members.map(m => (
                <option key={m.userId} value={m.userId}>{m.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t('tasks.modal.deadline')}</label>
            <input
              type="date"
              value={formData.fechaLimite}
              onChange={e => setFormData({ ...formData, fechaLimite: e.target.value })}
              className="w-full rounded-xl border-[#EAE2D6] focus:border-[#CB997E] focus:ring-[#CB997E] transition-colors"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t('tasks.modal.linkToProject')}</label>
            <select
              value={formData.proyectoId}
              onChange={e => setFormData({ ...formData, proyectoId: e.target.value })}
              className="w-full rounded-xl border-[#EAE2D6] focus:border-[#CB997E] focus:ring-[#CB997E] transition-colors bg-white"
              disabled={isSubmitting}
            >
              <option value="">{t('tasks.modal.unlinked')}</option>
              {proyectos.map(p => (
                <option key={p.id} value={p.id}>{p.titulo}</option>
              ))}
            </select>
            <p className="text-[10px] text-stone-400 mt-1 italic">
              {t('tasks.modal.projectNote')}
            </p>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-500 hover:bg-[#FDFBF7] rounded-xl font-medium transition-colors"
            >
              {t('tasks.modal.cancel')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.titulo.trim()}
              className="bg-[#A5A58D] hover:bg-[#6B705C] text-white px-6 py-2 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              {isSubmitting ? t('tasks.modal.saving') : (tareaToEdit ? t('tasks.modal.saveChanges') : t('tasks.modal.createTask'))}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
