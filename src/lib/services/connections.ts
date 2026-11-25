import { 
  db, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  handleFirestoreError,
  OperationType,
  onSnapshot,
  collection,
  addDoc,
  increment
} from './_core';

export interface MemberConnection {
  id: string; // `${senderId}_${receiverId}` (sorted)
  senderId: string;
  receiverId: string;
  communityId: string;
  status: 'pending' | 'connected' | 'rejected';
  note?: string;
  synergyData?: {
    kinMaya?: string;
    island?: string;
    score?: number;
    offerings?: string[];
    needs?: string[];
  };
  senderName?: string;
  senderAvatar?: string;
  createdAt: any;
  updatedAt: any;
}

/**
 * Genera un ID determinista y único para la conexión entre dos usuarios.
 */
export function getConnectionId(userA: string, userB: string): string {
  return [userA, userB].sort().join('_');
}

/**
 * Obtiene el estado actual de la conexión entre dos miembros de una comunidad.
 */
export async function getConnection(userA: string, userB: string): Promise<MemberConnection | null> {
  try {
    const connectionId = getConnectionId(userA, userB);
    const docRef = doc(db, 'connections', connectionId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as MemberConnection;
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, 'connections');
    return null;
  }
}

/**
 * Solicita una conexión entre el usuario actual (senderId) y otro usuario (receiverId).
 */
export async function requestConnection(
  senderId: string, 
  receiverId: string, 
  communityId: string,
  options?: {
    note?: string;
    senderName?: string;
    senderAvatar?: string;
    synergyData?: {
      kinMaya?: string;
      island?: string;
      score?: number;
      offerings?: string[];
      needs?: string[];
    };
  }
): Promise<void> {
  try {
    const connectionId = getConnectionId(senderId, receiverId);
    const docRef = doc(db, 'connections', connectionId);
    
    const data: Record<string, any> = {
      senderId,
      receiverId,
      communityId,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    if (options?.note) data.note = options.note;
    if (options?.senderName) data.senderName = options.senderName;
    if (options?.senderAvatar) data.senderAvatar = options.senderAvatar;
    if (options?.synergyData) data.synergyData = options.synergyData;
    
    await setDoc(docRef, data);

    // Si hay una comunidad asociada, crear notificación para el receptor
    if (communityId && communityId !== 'network') {
      try {
        const memberRef = doc(db, 'community_members', `${communityId}_${receiverId}`);
        const notifsCol = collection(memberRef, 'notificaciones');
        await addDoc(notifsCol, {
          tipo: 'conexion_sinergia',
          referenciaId: connectionId,
          leida: false,
          creadaAt: serverTimestamp(),
          meta: {
            autorNombre: options?.senderName || 'Un miembro de la red',
            excerpt: options?.note?.slice(0, 100) || 'Desea conectar e intercambiar saberes en la red.'
          }
        });
        await updateDoc(memberRef, {
          unreadNotifCount: increment(1)
        }).catch(() => {});
      } catch (e) {
        // Fallback silencioso si no existe el doc de miembro en esa comunidad específica
      }
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'connections');
    throw err;
  }
}

/**
 * Acepta una solicitud de conexión pendiente.
 */
export async function acceptConnection(userA: string, userB: string): Promise<void> {
  try {
    const connectionId = getConnectionId(userA, userB);
    const docRef = doc(db, 'connections', connectionId);
    
    await updateDoc(docRef, {
      status: 'connected',
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, 'connections');
    throw err;
  }
}

/**
 * Cancela, rechaza o deshace una conexión.
 */
export async function deleteConnection(userA: string, userB: string): Promise<void> {
  try {
    const connectionId = getConnectionId(userA, userB);
    const docRef = doc(db, 'connections', connectionId);
    
    await deleteDoc(docRef);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, 'connections');
    throw err;
  }
}

/**
 * Escucha cambios en tiempo real en la conexión entre dos usuarios.
 */
export function subscribeToConnection(
  userA: string,
  userB: string,
  onData: (data: MemberConnection | null) => void
): () => void {
  const connectionId = getConnectionId(userA, userB);
  const ref = doc(db, 'connections', connectionId);
  return onSnapshot(ref, (snap) => {
    onData(snap.exists() ? ({ id: snap.id, ...snap.data() } as MemberConnection) : null);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, 'connections');
  });
}
