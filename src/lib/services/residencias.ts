import {
  db,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  query,
  where,
  limit,
  orderBy
} from './_core';
import { arrayUnion, arrayRemove } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../error-handler';

export interface ConvocatoriaResidencia {
  id?: string;
  titulo: string;
  descripcion: string;
  tipo: 'volunteer' | 'coliving' | 'stewardship';
  duracion: string;
  nodoSlug: string;
  nodoNombre: string;
  isla: string;
  municipio: string;
  plazas: number;
  plazasOcupadas?: number;
  ofrece: string[];
  busca: string[];
  solicitantes?: string[];
  imageUrl?: string;
  activo?: boolean;
  creadoEn?: any;
  updatedAt?: any;
}

export const colResidencias = collection(db, 'residencias');

export function getNetworkResidenciasQuery() {
  return query(colResidencias, limit(50));
}

export function getResidenciasByNodeQuery(nodoSlug: string) {
  return query(colResidencias, where('nodoSlug', '==', nodoSlug), limit(50));
}

export async function createResidencia(residencia: Partial<ConvocatoriaResidencia>): Promise<string> {
  try {
    const docRef = await addDoc(colResidencias, {
      ...residencia,
      activo: residencia.activo ?? true,
      solicitantes: residencia.solicitantes || [],
      creadoEn: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'residencias');
    throw err;
  }
}

export async function updateResidencia(id: string, cambios: Partial<ConvocatoriaResidencia>): Promise<void> {
  try {
    await updateDoc(doc(db, 'residencias', id), {
      ...cambios,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `residencias/${id}`);
    throw err;
  }
}

export async function deleteResidencia(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'residencias', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `residencias/${id}`);
    throw err;
  }
}

export async function solicitarEstanciaEnResidencia(residenciaId: string, uid: string, mensaje?: string): Promise<void> {
  try {
    const resRef = doc(db, 'residencias', residenciaId);
    await updateDoc(resRef, {
      solicitantes: arrayUnion(uid),
      updatedAt: serverTimestamp()
    });

    // Guardar solicitud detallada en subcolección para el guardián
    const solRef = collection(db, 'residencias', residenciaId, 'solicitudes');
    await addDoc(solRef, {
      residenciaId,
      solicitanteUid: uid,
      mensaje: mensaje || '',
      estado: 'pendiente',
      creadoEn: serverTimestamp()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `residencias/${residenciaId}/solicitud`);
    throw err;
  }
}

export async function getNetworkResidencias(): Promise<ConvocatoriaResidencia[]> {
  try {
    const q = getNetworkResidenciasQuery();
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as ConvocatoriaResidencia));
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, 'residencias');
    throw err;
  }
}
