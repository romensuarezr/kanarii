import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Servicio } from '../lib/appService';
import { Heart, Package, X } from 'lucide-react';

interface CreateServicioModalProps {
  servicioToEdit?: Servicio | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export function CreateServicioModal({ servicioToEdit, isSubmitting, onClose, onSubmit }: CreateServicioModalProps) {
  const { t } = useTranslation('marketplace');
  const [formData, setFormData] = useState({
    tipo: servicioToEdit?.type || 'talento',
    titulo: servicioToEdit?.title || '',
    descripcion: servicioToEdit?.description || '',
    categoria: servicioToEdit?.category || 'artesanía',
    ubicacion: servicioToEdit?.location || '',
    disponibilidad: servicioToEdit?.availability || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo.trim() || !formData.tipo) return;
    
    onSubmit({
      ...formData,
      titulo: formData.titulo.trim(),
      descripcion: formData.descripcion.trim(),
      ubicacion: formData.ubicacion.trim(),
      disponibilidad: formData.disponibilidad.trim()
    });
  };

  return (
    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-xl overflow-hidden">
        <div className="p-6 border-b border-[#EAE2D6] flex justify-between items-center bg-[#FDFBF7]">
          <h2 className="text-xl font-serif text-[#4A4E4D]">{t('createService.title')}</h2>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex p-1 bg-[#FDFBF7] rounded-xl border border-[#EAE2D6]">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, tipo: 'talento' })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                formData.tipo === 'talento' 
                  ? 'bg-[#CB997E] text-white shadow-sm' 
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <Heart className="w-4 h-4" />
              {t('createService.talent')}
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, tipo: 'recurso' })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                formData.tipo === 'recurso' 
                  ? 'bg-[#A5A58D] text-white shadow-sm' 
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <Package className="w-4 h-4" />
              {t('createService.resource')}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t('createService.whatToOffer')}</label>
            <input
              required
              type="text"
              value={formData.titulo}
              onChange={e => setFormData({ ...formData, titulo: e.target.value })}
              className="w-full rounded-xl border-[#EAE2D6] focus:border-[#CB997E] focus:ring-[#CB997E] transition-colors"
              placeholder={formData.tipo === 'talento' ? t('createService.placeholderTalent') : t('createService.placeholderResource')}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t('createService.category')}</label>
            <select
              value={formData.categoria}
              onChange={e => setFormData({ ...formData, categoria: e.target.value })}
              className="w-full rounded-xl border-[#EAE2D6] focus:border-[#CB997E] focus:ring-[#CB997E] transition-colors bg-white"
              disabled={isSubmitting}
            >
              <option value="artesanía">{t('createService.catCraft')}</option>
              <option value="agricultura">{t('createService.catAgri')}</option>
              <option value="herramientas">{t('createService.catTools')}</option>
              <option value="transporte">{t('createService.catTransport')}</option>
              <option value="cuidados">{t('createService.catCare')}</option>
              <option value="tecnología">{t('createService.catTech')}</option>
              <option value="otro">{t('createService.catOther')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t('createService.descriptionAndDetails')}</label>
            <textarea
              rows={3}
              value={formData.descripcion}
              onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full rounded-xl border-[#EAE2D6] focus:border-[#CB997E] focus:ring-[#CB997E] transition-colors resize-none"
              placeholder={t('createService.descPlaceholder')}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">{t('createService.location')}</label>
              <input
                type="text"
                value={formData.ubicacion}
                onChange={e => setFormData({ ...formData, ubicacion: e.target.value })}
                className="w-full rounded-xl border-[#EAE2D6] focus:border-[#CB997E] focus:ring-[#CB997E] transition-colors text-sm"
                placeholder={t('createService.locationPlaceholder')}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">{t('createService.availability')}</label>
              <input
                type="text"
                value={formData.disponibilidad}
                onChange={e => setFormData({ ...formData, disponibilidad: e.target.value })}
                className="w-full rounded-xl border-[#EAE2D6] focus:border-[#CB997E] focus:ring-[#CB997E] transition-colors text-sm"
                placeholder={t('createService.availPlaceholder')}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-500 hover:bg-[#FDFBF7] rounded-xl font-medium transition-colors"
              disabled={isSubmitting}
            >
              {t('createService.cancel')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.titulo.trim()}
              className={`${
                formData.tipo === 'talento' ? 'bg-[#CB997E] hover:bg-[#B58368]' : 'bg-[#A5A58D] hover:bg-[#6B705C]'
              } text-white px-6 py-2 rounded-xl font-medium transition-all shadow-sm disabled:opacity-50`}
            >
              {isSubmitting ? t('createService.saving') : t('createService.catalog')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
