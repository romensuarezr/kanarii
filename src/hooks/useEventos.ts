import { Evento, getEventosQuery, subscribeToCollection } from '../lib/appService';
import { getNetworkEventosQuery } from '../lib/services/eventos';
import { useFirestoreCollection } from './useFirestoreCollection';

/**
 * Hook para gestionar los eventos en tiempo real.
 * Si recibe communityId consulta los de esa comunidad; si es vacío o 'network', consulta todos los eventos de la red.
 * Mapea automáticamente los timestamps de Firestore a objetos Date.
 */
export function useEventos(communityId?: string) {
  const isNetwork = !communityId || communityId === 'network';

  const { items, loading, error, reload } = useFirestoreCollection<Evento>(
    (onData, onError) => {
      const q = isNetwork ? getNetworkEventosQuery() : getEventosQuery(communityId);
      return subscribeToCollection(q, onData, 'eventos', onError);
    },
    [communityId, isNetwork],
    // Transformamos los Timestamps de Firestore a Dates de JS para react-big-calendar y vistas
    (data) => data.map(item => ({
      ...item,
      inicio: item.inicio?.toDate ? item.inicio.toDate() : (item.inicio ? new Date(item.inicio) : new Date()),
      fin: item.fin?.toDate ? item.fin.toDate() : (item.fin ? new Date(item.fin) : new Date())
    }))
  );

  return { items, eventos: items, loading, error, reload };
}
