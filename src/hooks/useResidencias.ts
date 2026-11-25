import { ConvocatoriaResidencia, getNetworkResidenciasQuery, getResidenciasByNodeQuery } from '../lib/services/residencias';
import { subscribeToCollection } from '../lib/appService';
import { useFirestoreCollection } from './useFirestoreCollection';

/**
 * Hook reactivo para consultar convocatorias de residencias y estancias en tiempo real.
 * Si recibe nodoSlug, filtra por ese nodo; si no, obtiene las de toda la red.
 */
export function useResidencias(nodoSlug?: string) {
  const { items, loading, error, reload } = useFirestoreCollection<ConvocatoriaResidencia>(
    (onData, onError) => {
      const q = nodoSlug ? getResidenciasByNodeQuery(nodoSlug) : getNetworkResidenciasQuery();
      return subscribeToCollection(q, onData, 'residencias', onError);
    },
    [nodoSlug]
  );

  return { items, residencias: items, loading, error, reload };
}
