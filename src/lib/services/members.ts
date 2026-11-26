import { 
  db, 
  colCommunityMembers, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  collection, 
  where, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  handleFirestoreError,
  OperationType,
  onSnapshot
} from './_core';
import { 
  writeBatch, 
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { CommunityMember, FeedbackSalida, HEADLINE_MAX_LENGTH, MembershipType } from './_types';
import { _writeFichaRaw } from './fichas';
import { auth } from '../firebase';

export type CanonicalMemberRole = 'admin' | 'miembro' | 'visitante';

/**
 * Normaliza cualquier rol de presentación o entrada legacy al enum canónico de autorización RBAC
 * reconocido por firestore.rules ('admin' | 'miembro' | 'visitante').
 */
export function normalizeMemberRole(rol?: string | null): CanonicalMemberRole {
  if (!rol) return 'miembro';
  const clean = rol.trim().toLowerCase();
  if (clean === 'admin' || clean === 'propietario' || clean === 'owner' || clean === 'fundador') {
    return 'admin';
  }
  if (clean === 'visitante' || clean === 'visitor') {
    return 'visitante';
  }
  return 'miembro';
}

/**
 * Normaliza y migra cualquier valor legacy de vínculo comunitario (propietario, miembro, voluntario, etc.)
 * al enum estricto MembershipType ('custodian' | 'resident' | 'volunteer' | 'collaborator').
 */
export function normalizeMembershipType(raw?: string | null): MembershipType {
  if (!raw) return 'resident';
  const clean = raw.trim().toLowerCase();
  if (clean === 'custodian' || clean === 'custodio' || clean === 'propietario' || clean === 'owner' || clean === 'fundador') {
    return 'custodian';
  }
  if (clean === 'volunteer' || clean === 'voluntario' || clean === 'voluntaria') {
    return 'volunteer';
  }
  if (clean === 'collaborator' || clean === 'colaborador' || clean === 'colaboradora' || clean === 'visitante' || clean === 'visitor') {
    return 'collaborator';
  }
  return 'resident';
}

/**
 * Acota el oficio/rol corto (headline) al límite máximo admitido en tipos y firestore.rules.
 */
export function normalizeHeadline(raw?: string | null): string {
  if (!raw) return '';
  return raw.trim().slice(0, HEADLINE_MAX_LENGTH);
}

export async function getMemberInfo(uid: string, communityId?: string): Promise<any | null> {
  try {
    let snap = null;
    if (communityId) {
      const docRef = doc(db, 'community_members', `${communityId}_${uid}`);
      snap = await getDoc(docRef);
    } else {
      const q = query(collection(db, 'community_members'), where('userId', '==', uid));
      const querySnap = await getDocs(q);
      if (querySnap && !querySnap.empty) {
        snap = querySnap.docs[0];
      }
    }
    
    if (snap && snap.exists()) return { id: snap.id, ...snap.data() };
    
    // Fallback to users collection
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap && userSnap.exists()) {
      const userData = userSnap.data();
      return { 
        id: userSnap.id, 
        nombre: userData.displayName || userData.email || 'Miembro nuevo',
        isFallback: true 
      };
    }
  } catch (err) {
    // Si falla por permisos en backend, consultar vía Firebase Admin SDK omnipotente
    if (typeof window === 'undefined') {
      try {
        const { getAdminDb } = await import('../firebaseAdmin');
        const dbAdmin = await getAdminDb();
        if (dbAdmin) {
          if (communityId) {
            const adminDoc = await dbAdmin.collection('community_members').doc(`${communityId}_${uid}`).get();
            if (adminDoc.exists) return { id: adminDoc.id, ...adminDoc.data() };
          } else {
            const adminSnap = await dbAdmin.collection('community_members').where('userId', '==', uid).limit(1).get();
            if (!adminSnap.empty) {
              const d = adminSnap.docs[0];
              return { id: d.id, ...d.data() };
            }
          }
          const userAdminDoc = await dbAdmin.collection('users').doc(uid).get();
          if (userAdminDoc.exists) {
            const uData = userAdminDoc.data()!;
            return {
              id: userAdminDoc.id,
              nombre: uData.displayName || uData.email || 'Miembro nuevo',
              isFallback: true
            };
          }
        }
      } catch (adminErr) {
        console.warn('[getMemberInfo Admin SDK Fallback Error]:', adminErr);
      }
    }
    handleFirestoreError(err, OperationType.GET, 'community_members');
  }
  return null;
}

/**
 * Crea un nuevo miembro de comunidad.
 */
export async function createCommunityMember(member: Partial<CommunityMember>): Promise<string> {
  try {
    const docRef = await addDoc(colCommunityMembers, {
      ...member,
      creadoEn: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'community_members');
    throw err;
  }
}

/**
 * Actualiza un miembro de comunidad existente.
 */
export async function updateCommunityMember(id: string, cambios: Partial<CommunityMember>): Promise<void> {
  try {
    await updateDoc(doc(db, 'community_members', id), {
      ...cambios,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `community_members/${id}`);
    throw err;
  }
}

/**
 * Actualiza el permiso RBAC (`rol`) y/o el vínculo comunitario (`membershipType`) de un miembro,
 * sincronizando atómicamente `comunidades/{communityId}.adminUids` cuando cambia `rol`.
 */
export async function updateCommunityMemberAccess(
  communityId: string,
  targetUserId: string,
  updates: { rol?: CanonicalMemberRole; membershipType?: MembershipType }
): Promise<void> {
  if (!updates.rol && !updates.membershipType) return;

  try {
    const batch = writeBatch(db);
    const memberRef = doc(db, 'community_members', `${communityId}_${targetUserId}`);
    const communityRef = doc(db, 'comunidades', communityId);

    const memberUpdates: Record<string, any> = {
      updatedAt: serverTimestamp()
    };
    if (updates.rol !== undefined) {
      memberUpdates.rol = updates.rol;
    }
    if (updates.membershipType !== undefined) {
      memberUpdates.membershipType = updates.membershipType;
    }

    batch.update(memberRef, memberUpdates);

    if (updates.rol !== undefined) {
      batch.update(communityRef, {
        adminUids: updates.rol === 'admin'
          ? arrayUnion(targetUserId)
          : arrayRemove(targetUserId),
        updatedAt: serverTimestamp()
      });
    }

    await batch.commit();
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `community_members/${communityId}_${targetUserId}`);
    throw err;
  }
}

/**
 * Elimina un miembro de comunidad.
 */
export async function deleteCommunityMember(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'community_members', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `community_members/${id}`);
    throw err;
  }
}

export async function unirseComunidadDirecto(communityId: string, uid: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) throw new Error('El usuario no existe');
    const userData = userSnap.data();
    const communityIds = userData.communityIds || [];
    if (communityIds.includes(communityId)) {
      throw new Error('YA_ES_MIEMBRO');
    }

    // FORZAR REFRESH DEL USER DE AUTH para obtener datos actualizados
    await new Promise<void>((resolve) => {
      if (auth.currentUser) {
        auth.currentUser.reload()
          .then(() => resolve())
          .catch(() => resolve());
      } else {
        resolve();
      }
    });
    const currentUser = auth.currentUser;

    const profileRef = doc(db, 'profiles', uid);
    const profileSnap = await getDoc(profileRef);
    const memberRef = doc(db, 'community_members', `${communityId}_${uid}`);

    let resolvedDisplayName = '';
    if (profileSnap.exists()) {
      const profileData = profileSnap.data();
      const base = profileData.datosPersona || profileData.datosOnboarding || {};
      resolvedDisplayName = base.nombre || profileData.nombre || '';
    }

    if (!resolvedDisplayName && currentUser?.displayName) {
      resolvedDisplayName = currentUser.displayName;
    }

    if (!resolvedDisplayName && currentUser?.email) {
      resolvedDisplayName = currentUser.email;
    }

    const batch = writeBatch(db);

    const userUpdates: any = {
      communityIds: arrayUnion(communityId),
      ...(!userData.communityId ? { communityId: communityId } : {}),
      updatedAt: serverTimestamp()
    };
    if ((!userData.displayName || userData.displayName === '') && resolvedDisplayName) {
      userUpdates.displayName = resolvedDisplayName;
    }
    batch.update(userRef, userUpdates);

    if (profileSnap.exists()) {
      const profileData = profileSnap.data();
      const base = profileData.datosPersona || profileData.datosOnboarding || {};

      batch.set(memberRef, {
        userId: uid,
        communityId: communityId,
        nombre: resolvedDisplayName || 'Sin Nombre',
        tipo_hd: profileData.datosBrutos?.diseno_humano?.tipo || '',
        elemento_dominante: profileData.datosBrutos?.carta_astral_completa?.elemento_dominante || '',
        autoridad_hd: profileData.datosBrutos?.diseno_humano?.autoridad || '',
        antiguedad_anos: base.antiguedad_anos || 0,
        rol_comunidad: base.rol_comunidad || '',
        headline: normalizeHeadline(base.headline),
        membershipType: normalizeMembershipType(base.rol),
        rol: normalizeMemberRole(base.rol),
        estado: 'activo',
        photoURL: userData.photoURL || '',
        displayName: resolvedDisplayName,
        email: userData.email || '',
        creadoEn: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });

      if (!profileData.communityId) {
        batch.update(profileRef, {
          communityId: communityId,
          'datosOnboarding.communityId': communityId,
          'datosPersona.communityId': communityId
        });
      }
    } else {
      batch.set(memberRef, {
        userId: uid,
        communityId: communityId,
        nombre: resolvedDisplayName || 'Sin Nombre',
        tipo_hd: '',
        elemento_dominante: '',
        autoridad_hd: '',
        antiguedad_anos: 0,
        rol_comunidad: '',
        headline: '',
        membershipType: 'resident',
        rol: 'miembro',
        estado: 'activo',
        photoURL: userData.photoURL || '',
        displayName: resolvedDisplayName,
        email: userData.email || '',
        creadoEn: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
    }

    // Propagar communityId a /fichas si existe (sin tocar displayName ni otros campos)
    try {
      const fichaRef = doc(db, 'fichas', uid);
      const fichaSnap = await getDoc(fichaRef);
      if (fichaSnap.exists()) {
        await updateDoc(fichaRef, { 
          communityId: communityId,
          updatedAt: serverTimestamp()
        });
      }
    } catch (e) {
      console.warn('No se pudo propagar communityId a fichas:', e);
    }

    await batch.commit();
  } catch (error: any) {
    handleFirestoreError(error, OperationType.UPDATE, 'Unirse directamente');
    throw error;
  }
}

export async function removerMiembroComunidad(userId: string, communityId: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      throw new Error('El usuario no existe');
    }
    
    const userData = userSnap.data();
    const communityIds: string[] = userData.communityIds || [];
    const newCommunityIds = communityIds.filter(id => id !== communityId);
    const newPrimaryCommunityId = newCommunityIds[0] ?? null;

    const batch = writeBatch(db);

    // 1. Actualizar el documento de usuario
    batch.update(userRef, {
      communityIds: newCommunityIds,
      communityId: newPrimaryCommunityId,
      updatedAt: serverTimestamp()
    });

    // 2. Eliminar el miembro de community_members usando la clave compuesta
    const memberRef = doc(db, 'community_members', `${communityId}_${userId}`);
    batch.delete(memberRef);

    // 3. Actualizar la Ficha (tanto en profiles como en fichas si existen)
    const profileRef = doc(db, 'profiles', userId);
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
      batch.update(profileRef, {
        communityId: newPrimaryCommunityId,
        updatedAt: serverTimestamp()
      });
    }

    const fichaRef = doc(db, 'fichas', userId);
    const fichaSnap = await getDoc(fichaRef);
    if (fichaSnap.exists()) {
      batch.update(fichaRef, {
        communityId: newPrimaryCommunityId,
        updatedAt: serverTimestamp()
      });
    }

    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, 'community_members');
    throw error;
  }
}

export async function registrarSalidaComunidad(
  userId: string,
  communityId: string,
  motivo: string,
  comentario: string
): Promise<void> {
  try {
    let nombreUsuario = 'Miembro';
    const profileRef = doc(db, 'profiles', userId);
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
      const pData = profileSnap.data();
      nombreUsuario = pData.datosPersona?.nombre || pData.nombre || 'Miembro';
    } else {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        nombreUsuario = userSnap.data().displayName || 'Miembro';
      }
    }

    await addDoc(collection(db, 'community_exits'), {
      userId,
      nombreUsuario,
      communityId,
      motivo,
      comentario: comentario || '',
      fecha: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'Registrar feedback de salida');
    throw error;
  }
}

export function listenBajasRecientes(
  communityId: string,
  callback: (bajas: FeedbackSalida[]) => void
): () => void {
  const q = query(
    collection(db, 'community_exits'),
    where('communityId', '==', communityId)
  );
  return onSnapshot(q, (snap) => {
    const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as FeedbackSalida));
    list.sort((a, b) => {
      const getMs = (ts: any) => {
        if (!ts) return 0;
        if (ts.seconds) return ts.seconds * 1000;
        if (ts.toDate) return ts.toDate().getTime();
        return new Date(ts).getTime() || 0;
      };
      return getMs(b.fecha) - getMs(a.fecha);
    });
    callback(list);
  });
}

