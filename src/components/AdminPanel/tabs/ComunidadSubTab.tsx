import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, RefreshCw, UserMinus, Clock } from 'lucide-react';
import {
  CommunityMember,
  FeedbackSalida,
  listenBajasRecientes,
  MembershipType,
  CanonicalMemberRole,
  normalizeMembershipType,
  normalizeMemberRole,
  updateCommunityMemberAccess,
} from '../../../lib/appService';
import { useToast } from '../../../hooks/useToast';

interface ComunidadSubTabProps {
  members: CommunityMember[];
  loadingMembers: boolean;
  onSelectFicha: (userId: string) => void;
  onExpelMember: (member: CommunityMember) => void;
  currentCommunityId: string;
  appUserId?: string;
}

const MEMBERSHIP_TYPE_LABELS: Record<MembershipType, string> = {
  custodian: 'Custodio',
  resident: 'Residente',
  volunteer: 'Voluntario',
  collaborator: 'Colaborador',
};

const MEMBER_ROLE_LABELS: Record<CanonicalMemberRole, string> = {
  admin: 'Admin',
  miembro: 'Miembro',
  visitante: 'Visitante',
};

const MEMBERSHIP_FILTER_OPTIONS = ['todos', 'custodian', 'resident', 'volunteer', 'collaborator'] as const;
const ROLE_OPTIONS: CanonicalMemberRole[] = ['admin', 'miembro', 'visitante'];
const MEMBERSHIP_OPTIONS: MembershipType[] = ['custodian', 'resident', 'volunteer', 'collaborator'];

export default function ComunidadSubTab({
  members,
  loadingMembers,
  onSelectFicha,
  onExpelMember,
  currentCommunityId,
  appUserId,
}: ComunidadSubTabProps) {
  const { t } = useTranslation(['admin', 'common']);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'todos' | MembershipType>('todos');
  const [bajas, setBajas] = useState<FeedbackSalida[]>([]);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (!currentCommunityId) return;
    const unsubscribe = listenBajasRecientes(currentCommunityId, (lista) => {
      setBajas(lista);
    });
    return () => unsubscribe();
  }, [currentCommunityId]);

  const adminsCount = members.filter((m) => normalizeMemberRole(m.rol) === 'admin').length;

  const filteredMembers = members.filter(m => {
    const membership = normalizeMembershipType(m.membershipType || m.rolComunitario || m.rol);
    if (roleFilter !== 'todos' && membership !== roleFilter) return false;
    return (
      (m.nombre?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (m.rol_comunidad?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  });

  const handleRoleChange = async (member: CommunityMember, nextRole: CanonicalMemberRole) => {
    if (!currentCommunityId) return;
    const currentRole = normalizeMemberRole(member.rol);
    if (currentRole === nextRole) return;

    if (currentRole === 'admin' && nextRole !== 'admin' && adminsCount <= 1 && member.userId === appUserId) {
      toast.error('No puedes degradarte si eres el último admin del nodo');
      return;
    }

    setUpdatingUserId(member.userId);
    try {
      await updateCommunityMemberAccess(currentCommunityId, member.userId, { rol: nextRole });
      toast.success(`Permiso actualizado a ${MEMBER_ROLE_LABELS[nextRole]}`);
    } catch {
      toast.error('No se pudo actualizar el permiso del miembro');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleMembershipTypeChange = async (member: CommunityMember, nextType: MembershipType) => {
    if (!currentCommunityId) return;
    const currentType = normalizeMembershipType(member.membershipType || member.rolComunitario || member.rol);
    if (currentType === nextType) return;

    setUpdatingUserId(member.userId);
    try {
      await updateCommunityMemberAccess(currentCommunityId, member.userId, { membershipType: nextType });
      toast.success(`Vínculo actualizado a ${MEMBERSHIP_TYPE_LABELS[nextType]}`);
    } catch {
      toast.error('No se pudo actualizar el vínculo del miembro');
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl shadow-sm border border-[#EAE2D6] overflow-hidden">
        <div className="p-6 border-b border-[#F9F7F1] flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
            <input
              type="text"
              placeholder={t('admin:membersTable.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-[#EAE2D6] outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-stone-400 shrink-0" />
            {MEMBERSHIP_FILTER_OPTIONS.map(role => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all whitespace-nowrap ${
                  roleFilter === role
                    ? 'bg-[#4A4E4D] text-white border-[#4A4E4D]'
                    : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'
                }`}
              >
                {role === 'todos' ? t('admin:membersTable.filterAll') : MEMBERSHIP_TYPE_LABELS[role]}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-400 text-[10px] uppercase font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">{t('admin:membersTable.colNameRole')}</th>
                <th className="px-6 py-4">{t('admin:membersTable.colPermissionBond')}</th>
                <th className="px-6 py-4">{t('admin:membersTable.colTenure')}</th>
                <th className="px-6 py-4 text-right">{t('admin:membersTable.colActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loadingMembers ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-stone-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" /> {t('admin:membersTable.loading')}
                  </td>
                </tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-stone-400 italic">
                    {t('admin:membersTable.empty')}
                  </td>
                </tr>
              ) : (
                filteredMembers.map(member => {
                  const currentRole = normalizeMemberRole(member.rol);
                  const currentMembershipType = normalizeMembershipType(member.membershipType || member.rolComunitario || member.rol);
                  const isUpdating = updatingUserId === member.userId;
                  const isLastAdminSelf = currentRole === 'admin' && adminsCount <= 1 && member.userId === appUserId;
                  return (
                    <tr key={member.userId} className="hover:bg-[#FDFBF7] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-medium text-stone-800">{member.nombre}</div>
                        <div className="text-xs text-stone-400">{member.rol_comunidad || t('admin:membersTable.noRole')}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${member.estado === 'completo' ? 'bg-teal-500' : 'bg-amber-500'}`} />
                          <select
                            aria-label={`Permiso de ${member.nombre}`}
                            value={currentRole}
                            disabled={isUpdating || isLastAdminSelf}
                            title={isLastAdminSelf ? t('admin:membersTable.lastAdminSelf') : t('admin:membersTable.changePermission')}
                            onChange={(e) => handleRoleChange(member, e.target.value as CanonicalMemberRole)}
                            className="bg-stone-50 border border-stone-200 text-stone-700 rounded-lg px-2 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-stone-300 disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {ROLE_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {MEMBER_ROLE_LABELS[opt]}
                              </option>
                            ))}
                          </select>
                          <select
                            aria-label={`Vínculo de ${member.nombre}`}
                            value={currentMembershipType}
                            disabled={isUpdating}
                            title={t('admin:membersTable.changeBond')}
                            onChange={(e) => handleMembershipTypeChange(member, e.target.value as MembershipType)}
                            className="bg-stone-50 border border-stone-200 text-stone-700 rounded-lg px-2 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-stone-300 disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {MEMBERSHIP_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {MEMBERSHIP_TYPE_LABELS[opt]}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-500">{member.antiguedad_anos || 0} {t('admin:membersTable.years')}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => onSelectFicha(member.userId)}
                            className="p-2 hover:bg-[#EAE2D6]/30 text-stone-400 hover:text-[#4A4E4D] rounded-lg transition-all"
                            title={t('admin:membersTable.viewFicha')}
                          >
                            <Search className="w-4 h-4" />
                          </button>
                          {member.userId !== appUserId && (
                            <button
                              onClick={() => onExpelMember(member)}
                              className="p-2 hover:bg-red-50 text-stone-400 hover:text-red-600 rounded-lg transition-all"
                              title={t('admin:membersTable.expelMember')}
                            >
                              <UserMinus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sección de Bajas Recientes */}
      {bajas.length > 0 && (
        <div className="bg-white rounded-3xl shadow-sm border border-[#EAE2D6] overflow-hidden p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-red-500" />
            <h2 className="font-serif text-xl text-[#4A4E4D]">{t('admin:membersTable.recentDepartures')}</h2>
          </div>
          <div className="space-y-4">
            {bajas.map((baja) => (
              <div key={baja.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-800">{baja.nombreUsuario || 'Miembro'}</span>
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider">
                      {baja.motivo}
                    </span>
                  </div>
                  {baja.comentario && (
                    <p className="text-sm text-stone-600 italic mt-1.5">
                      "{baja.comentario}"
                    </p>
                  )}
                </div>
                <div className="text-xs text-stone-400 font-medium">
                  {baja.fecha?.toDate
                    ? baja.fecha.toDate().toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : new Date(baja.fecha).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
