import { Ficha, getTriadaFromFicha } from './services/_types';
import { cruzarMiembros } from './services/fichas';
import { calcularKin, calcularRelacionKines, KinData } from './kinMaya';

export interface SynergyMatch {
  score: number; // 0 - 100
  targetFicha: Ficha;
  targetUserId: string;
  targetName: string;
  targetAvatar?: string;
  targetRole?: string;
  targetBio?: string;
  targetLocation?: string;
  targetIsland?: string;
  isSameIsland: boolean;
  kinMayaRelation?: {
    userKin: KinData;
    targetKin: KinData;
    tipo: string;
    descripcion: string;
    badgeLabel: string;
  };
  humanDesignRelation?: {
    userType?: string;
    targetType?: string;
    highlight?: string;
    electromagneticChannelsCount: number;
    electromagneticChannels: string[];
  };
  triadSynergy?: {
    complementaryOfferings: string[]; // Lo que target ofrece y user necesita
    complementaryNeeds: string[]; // Lo que user ofrece y target necesita
    sharedSaberes: string[]; // Saberes compartidos
  };
  keyReasons: string[];
}

export const CANARY_ISLANDS = [
  'Gran Canaria',
  'Tenerife',
  'La Palma',
  'Lanzarote',
  'Fuerteventura',
  'La Gomera',
  'El Hierro',
  'La Graciosa',
] as const;

/**
 * Normaliza y detecta deterministamente la isla a partir de un string de ubicación.
 */
export function detectIsland(location?: string | null): string | null {
  if (!location) return null;
  const loc = location.toLowerCase();

  if (loc.includes('gran canaria') || loc.includes('las palmas') || loc.includes('telde') || loc.includes('arucas') || loc.includes('agaete') || loc.includes('arteara') || loc.includes('maspalomas')) {
    return 'Gran Canaria';
  }
  if (loc.includes('tenerife') || loc.includes('santa cruz de tenerife') || loc.includes('la laguna') || loc.includes('adeje') || loc.includes('orotava')) {
    return 'Tenerife';
  }
  if (loc.includes('la palma') || loc.includes('santa cruz de la palma') || loc.includes('los llanos') || loc.includes('el paso')) {
    return 'La Palma';
  }
  if (loc.includes('lanzarote') || loc.includes('arrecife') || loc.includes('teguise') || loc.includes('yaiza')) {
    return 'Lanzarote';
  }
  if (loc.includes('fuerteventura') || loc.includes('puerto del rosario') || loc.includes('corralejo') || loc.includes('oliva')) {
    return 'Fuerteventura';
  }
  if (loc.includes('la gomera') || loc.includes('san sebastián de la gomera') || loc.includes('valle gran rey')) {
    return 'La Gomera';
  }
  if (loc.includes('el hierro') || loc.includes('valverde') || loc.includes('frontera')) {
    return 'El Hierro';
  }
  if (loc.includes('graciosa')) {
    return 'La Graciosa';
  }

  return null;
}

/**
 * Extrae la fecha de nacimiento de una Ficha
 */
function getBirthDate(ficha?: Ficha | null): string | null {
  if (!ficha) return null;
  return ficha.datosPersona?.fechaNacimiento || ficha.datosOnboarding?.fechaNacimiento || null;
}

/**
 * Normaliza cadenas para comparación de texto en la tríada
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Calcula la sinergia determinista multidimensional entre dos fichas
 */
export function calcularSinergia(
  userFicha: Ficha | null | undefined,
  targetFicha: Ficha
): SynergyMatch {
  const targetUserId = targetFicha.userId || targetFicha.id || 'unknown';
  const targetName =
    targetFicha.datosPersona?.nombre ||
    targetFicha.datosOnboarding?.nombre ||
    targetFicha.nombre ||
    'Miembro de la Red';

  const targetAvatar =
    targetFicha.datosPersona?.plataformaOrigen ||
    (targetFicha as any).avatarUrl ||
    (targetFicha as any).photoURL;

  const targetRole =
    targetFicha.datosPersona?.rol_comunidad ||
    targetFicha.datosOnboarding?.rol_comunidad ||
    targetFicha.perfilVisual?.arquetipo ||
    'Miembro';

  const targetBio =
    (targetFicha as any).bio ||
    targetFicha.manualGenerado?.slice(0, 160) ||
    targetFicha.datosOnboarding?.tension ||
    'En búsqueda de sinergias y propósito regenerativo en comunidad.';

  const userLocation = userFicha?.datosPersona?.lugar || userFicha?.datosOnboarding?.lugar;
  const targetLocation = targetFicha.datosPersona?.lugar || targetFicha.datosOnboarding?.lugar;

  const userIsland = detectIsland(userLocation);
  const targetIsland = detectIsland(targetLocation);

  const isSameIsland = !!(userIsland && targetIsland && userIsland === targetIsland);

  let score = 50; // Base score
  const keyReasons: string[] = [];

  // 1. Ubicación insular
  if (isSameIsland && userIsland) {
    score += 18;
    keyReasons.push(`Misma isla: ${userIsland} 🌴`);
  } else if (targetIsland) {
    score += 6;
    keyReasons.push(`Ubicación: ${targetIsland} 🌊`);
  }

  // 2. Kin Maya
  let kinMayaRelation: SynergyMatch['kinMayaRelation'] | undefined;
  const userBirth = getBirthDate(userFicha);
  const targetBirth = getBirthDate(targetFicha);

  if (userBirth && targetBirth) {
    try {
      const userKin = calcularKin(userBirth);
      const targetKin = calcularKin(targetBirth);
      const rel = calcularRelacionKines(userKin, targetKin);

      let badgeLabel = `${targetKin.sello} ${targetKin.emoji}`;
      if (rel.tipo === 'analogo') {
        score += 15;
        badgeLabel = `Aliado Natural · ${targetKin.sello} ${targetKin.emoji}`;
        keyReasons.push(`Kin Maya: Aliados naturales (${userKin.sello} ↔ ${targetKin.sello})`);
      } else if (rel.tipo === 'oculto') {
        score += 14;
        badgeLabel = `Poder Oculto · ${targetKin.sello} ${targetKin.emoji}`;
        keyReasons.push(`Kin Maya: Poder oculto y crecimiento mutuo`);
      } else if (rel.tipo === 'antipoda') {
        score += 12;
        badgeLabel = `Polo Desafiante · ${targetKin.sello} ${targetKin.emoji}`;
        keyReasons.push(`Kin Maya: Polaridad creativa complementaria`);
      } else if (rel.tipo === 'mismaTreceOndas') {
        score += 12;
        badgeLabel = `Misma Onda · ${targetKin.sello} ${targetKin.emoji}`;
        keyReasons.push(`Kin Maya: Comparten el propósito de la Onda Encantada`);
      } else if (rel.tipo === 'mismoSello') {
        score += 10;
        badgeLabel = `Mismo Sello · ${targetKin.sello} ${targetKin.emoji}`;
        keyReasons.push(`Kin Maya: Reflejo directo del mismo arquetipo`);
      } else if (rel.tipo === 'tonosComplementarios') {
        score += 8;
        keyReasons.push(`Tonos complementarios en acción y escucha`);
      }

      kinMayaRelation = {
        userKin,
        targetKin,
        tipo: rel.tipo,
        descripcion: rel.descripcion,
        badgeLabel,
      };
    } catch (e) {
      // Ignorar fallo de parseo de fecha
    }
  }

  // 3. Diseño Humano y Canales Electromagnéticos
  let humanDesignRelation: SynergyMatch['humanDesignRelation'] | undefined;
  if (userFicha && targetFicha) {
    try {
      const cruce = cruzarMiembros(userFicha, targetFicha);
      const userHd = userFicha.datosBrutos?.diseno_humano;
      const targetHd = targetFicha.datosBrutos?.diseno_humano;

      const electro = cruce.canalesConexion?.electromagneticos || [];
      const electroCount = electro.length;

      // Ponderación de puntuación determinista
      if (cruce.puntuacion > 60) {
        score += Math.round((cruce.puntuacion - 50) * 0.4);
      }

      if (electroCount > 0) {
        score += Math.min(15, electroCount * 5);
        keyReasons.push(`${electroCount} canal${electroCount > 1 ? 'es' : ''} electromagnético${electroCount > 1 ? 's' : ''} compartido${electroCount > 1 ? 's' : ''}`);
      }

      if (cruce.compatibilidades && cruce.compatibilidades.length > 0) {
        keyReasons.push(cruce.compatibilidades[0]);
      }

      humanDesignRelation = {
        userType: userHd?.tipo,
        targetType: targetHd?.tipo,
        highlight: cruce.compatibilidades?.[0],
        electromagneticChannelsCount: electroCount,
        electromagneticChannels: electro,
      };
    } catch (e) {
      // Ignorar si faltan datos brutos
    }
  }

  // 4. Tríada de Reciprocidad (Ofrendas ⇄ Necesidades)
  let triadSynergy: SynergyMatch['triadSynergy'] | undefined;
  if (userFicha && targetFicha) {
    const userTriada = getTriadaFromFicha(userFicha);
    const targetTriada = getTriadaFromFicha(targetFicha);

    const complementaryOfferings: string[] = [];
    const complementaryNeeds: string[] = [];
    const sharedSaberes: string[] = [];

    // Target ofrece lo que User necesita
    for (const offering of targetTriada.ofrendas || []) {
      const offNorm = normalizeText(offering);
      const matches = (userTriada.necesidades || []).some(need => {
        const needNorm = normalizeText(need);
        return offNorm.includes(needNorm) || needNorm.includes(offNorm);
      });
      if (matches) complementaryOfferings.push(offering);
    }

    // User ofrece lo que Target necesita
    for (const offering of userTriada.ofrendas || []) {
      const offNorm = normalizeText(offering);
      const matches = (targetTriada.necesidades || []).some(need => {
        const needNorm = normalizeText(need);
        return offNorm.includes(needNorm) || needNorm.includes(offNorm);
      });
      if (matches) complementaryNeeds.push(offering);
    }

    // Saberes comunes
    for (const saber of targetTriada.saberes || []) {
      const sNorm = normalizeText(saber);
      const matches = (userTriada.saberes || []).some(us => {
        const usNorm = normalizeText(us);
        return sNorm === usNorm || sNorm.includes(usNorm) || usNorm.includes(sNorm);
      });
      if (matches) sharedSaberes.push(saber);
    }

    if (complementaryOfferings.length > 0) {
      score += Math.min(16, complementaryOfferings.length * 8);
      keyReasons.push(`Ofrece: ${complementaryOfferings[0]} (lo que tú buscas)`);
    }

    if (complementaryNeeds.length > 0) {
      score += Math.min(16, complementaryNeeds.length * 8);
      keyReasons.push(`Busca: ${complementaryNeeds[0]} (lo que tú ofreces)`);
    }

    if (sharedSaberes.length > 0) {
      score += 6;
      keyReasons.push(`Saberes comunes: ${sharedSaberes.slice(0, 2).join(', ')}`);
    }

    triadSynergy = {
      complementaryOfferings,
      complementaryNeeds,
      sharedSaberes,
    };
  }

  // Si no hay razones específicas, añadir una por defecto
  if (keyReasons.length === 0) {
    keyReasons.push('Potencial de colaboración y aprendizaje mutuo');
  }

  // Acotar la puntuación determinista entre 35 y 98
  const finalScore = Math.min(98, Math.max(35, score));

  return {
    score: finalScore,
    targetFicha,
    targetUserId,
    targetName,
    targetAvatar,
    targetRole,
    targetBio,
    targetLocation,
    targetIsland: targetIsland || undefined,
    isSameIsland,
    kinMayaRelation,
    humanDesignRelation,
    triadSynergy,
    keyReasons: keyReasons.slice(0, 3), // Máximo 3 razones principales
  };
}

/**
 * Calcula y ordena las sinergias de una lista de fichas frente al usuario logueado.
 */
export function calcularSinergiasMultiples(
  userFicha: Ficha | null | undefined,
  allFichas: Ficha[],
  currentUserId?: string
): SynergyMatch[] {
  const matches: SynergyMatch[] = [];

  for (const ficha of allFichas) {
    const fUserId = ficha.userId || ficha.id;
    // Omitir al propio usuario
    if (currentUserId && fUserId === currentUserId) continue;

    matches.push(calcularSinergia(userFicha, ficha));
  }

  // Ordenar descendentemente por puntuación de sinergia determinista
  return matches.sort((a, b) => b.score - a.score);
}
