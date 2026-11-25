import { 
  db,
  colEventos,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getEventosQuery,
  query,
  limit,
  orderBy
} from './_core';
import { arrayUnion, arrayRemove } from 'firebase/firestore';
import { Evento } from './_types';
import { handleFirestoreError, OperationType } from '../error-handler';

export function getNetworkEventosQuery() {
  return query(colEventos, limit(50));
}

export async function createEvento(evento: Partial<Evento>): Promise<string> {
  try {
    const docRef = await addDoc(colEventos, {
      ...evento,
      participantes: evento.participantes || [],
      creadoEn: serverTimestamp()
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'eventos');
    throw err;
  }
}

export async function updateEvento(id: string, cambios: Partial<Evento>): Promise<void> {
  try {
    await updateDoc(doc(db, 'eventos', id), {
      ...cambios,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `eventos/${id}`);
    throw err;
  }
}

export async function deleteEvento(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'eventos', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `eventos/${id}`);
    throw err;
  }
}

export async function getEventos(communityId: string): Promise<Evento[]> {
  try {
    const q = getEventosQuery(communityId);
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Evento));
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, 'eventos');
    throw err;
  }
}

export async function getNetworkEventos(): Promise<Evento[]> {
  try {
    const q = getNetworkEventosQuery();
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Evento));
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, 'eventos_network');
    throw err;
  }
}

export async function inscribirseEnEvento(eventoId: string, uid: string): Promise<void> {
  try {
    const docRef = doc(db, 'eventos', eventoId);
    await updateDoc(docRef, {
      participantes: arrayUnion(uid),
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `eventos/${eventoId}/inscribirse`);
    throw err;
  }
}

export async function desinscribirseDeEvento(eventoId: string, uid: string): Promise<void> {
  try {
    const docRef = doc(db, 'eventos', eventoId);
    await updateDoc(docRef, {
      participantes: arrayRemove(uid),
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `eventos/${eventoId}/desinscribirse`);
    throw err;
  }
}
