/**
 * Script reproducible para poblar (--seed) y limpiar (--clean) datos demo con imágenes reales en Firestore.
 * Usa el token de Firebase CLI (~/.config/configstore/firebase-tools.json) vía Firestore REST API
 * para que sea ejecutable en cualquier momento sin credenciales manuales adicionales.
 *
 * Uso:
 *   npm run demo:seed   (o npx tsx scripts/seed-demo.ts --seed)
 *   npm run demo:clean  (o npx tsx scripts/seed-demo.ts --clean)
 */

import 'dotenv/config';
import { getAccessToken } from './db-client';

const PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'gen-lang-client-0601258149';
const DATABASE_ID = process.env.VITE_FIREBASE_DATABASE_ID || 'ai-studio-fb5ef2e1-c472-43e5-bb6a-51f1141b0793';
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents`;

function toFirestoreValue(val: any): any {
  if (val === null || val === undefined) return { nullValue: null };
  if (val instanceof Date) return { timestampValue: val.toISOString() };
  if (typeof val === 'boolean') return { booleanValue: val };
  if (typeof val === 'number') {
    return Number.isInteger(val) ? { integerValue: String(val) } : { doubleValue: val };
  }
  if (typeof val === 'string') return { stringValue: val };
  if (Array.isArray(val)) {
    return { arrayValue: { values: val.map((item) => toFirestoreValue(item)) } };
  }
  if (typeof val === 'object') {
    const fields: Record<string, any> = {};
    for (const [k, v] of Object.entries(val)) {
      if (v !== undefined) fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

function toFirestoreDoc(data: Record<string, any>) {
  const fields: Record<string, any> = {};
  for (const [k, v] of Object.entries(data)) {
    if (v !== undefined) fields[k] = toFirestoreValue(v);
  }
  return { fields };
}

async function upsertDoc(collectionName: string, docId: string, data: Record<string, any>, token: string) {
  const url = `${BASE_URL}/${collectionName}/${encodeURIComponent(docId)}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toFirestoreDoc(data)),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Error upsert ${collectionName}/${docId}: ${res.status} ${errText}`);
  }
}

async function deleteDocByName(fullName: string, token: string) {
  const url = `https://firestore.googleapis.com/v1/${fullName}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok && res.status !== 404) {
    const errText = await res.text();
    throw new Error(`Error delete ${fullName}: ${res.status} ${errText}`);
  }
}

async function listCollectionDocs(collectionName: string, token: string): Promise<Array<{ name: string; fields?: any }>> {
  const docs: Array<{ name: string; fields?: any }> = [];
  let pageToken = '';
  do {
    const qp = pageToken ? `?pageSize=200&pageToken=${encodeURIComponent(pageToken)}` : '?pageSize=200';
    const res = await fetch(`${BASE_URL}/${collectionName}${qp}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) break;
    const json: any = await res.json();
    if (Array.isArray(json.documents)) docs.push(...json.documents);
    pageToken = json.nextPageToken || '';
  } while (pageToken);
  return docs;
}

function daysFromNow(days: number, hour = 10): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d;
}

const DEMO_COMUNIDADES = [
  {
    id: 'demo_finca_guayadeque',
    nombre: 'Finca Guayadeque Viva',
    slug: 'demo_finca_guayadeque',
    descripcion: 'Proyecto agroecológico en barranco con bancales regenerativos, banco de semillas canarias y talleres de bioconstrucción en piedra seca.',
    tipo: 'finca',
    esPublica: true,
    requiereAprobacion: true,
    capacidad: 18,
    tags: ['Permacultura', 'Agua', 'Semillas', 'Bioconstrucción'],
    bannerUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
    logoUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',
    ubicacion: { municipio: 'Agüimes', region: 'Gran Canaria', pais: 'España' },
    enabledModules: ['tablon', 'calendario', 'miembros', 'proyectos', 'tareas'],
    adminUids: ['demo_persona_1'],
    createdBy: 'demo_persona_1',
    isDemo: true,
  },
  {
    id: 'demo_ecoaldea_anaga',
    nombre: 'Ecoaldea Bosque de Anaga',
    slug: 'demo_ecoaldea_anaga',
    descripcion: 'Comunidad de convivencia rural rodeada de laurisilva con gobernanza sociocrática, cocina colectiva y espacio de coliving remoto.',
    tipo: 'ecoaldea',
    esPublica: true,
    requiereAprobacion: true,
    capacidad: 24,
    tags: ['Sociocracia', 'Coliving', 'Agroecología', 'Cuidados'],
    bannerUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
    logoUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=400&q=80',
    ubicacion: { municipio: 'Taganana', region: 'Tenerife', pais: 'España' },
    enabledModules: ['tablon', 'calendario', 'miembros', 'proyectos', 'tareas', 'gobernanza', 'actas'],
    adminUids: ['demo_persona_2'],
    createdBy: 'demo_persona_2',
    isDemo: true,
  },
  {
    id: 'demo_casa_timanfaya',
    nombre: 'Casa Volcánica Timanfaya',
    slug: 'demo_casa_timanfaya',
    descripcion: 'Espacio de soberanía energética, arquitectura bioclimática en picón volcánico y residencias creativas frente al Atlántico.',
    tipo: 'cohousing',
    esPublica: true,
    requiereAprobacion: false,
    capacidad: 12,
    tags: ['Energía Solar', 'Arte', 'Arquitectura', 'Autonomía'],
    bannerUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    logoUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80',
    ubicacion: { municipio: 'Tinajo', region: 'Lanzarote', pais: 'España' },
    enabledModules: ['tablon', 'calendario', 'miembros', 'proyectos'],
    adminUids: ['demo_persona_4'],
    createdBy: 'demo_persona_4',
    isDemo: true,
  },
  {
    id: 'demo_taller_garajonay',
    nombre: 'Taller Nómada Garajonay',
    slug: 'demo_taller_garajonay',
    descripcion: 'Red abierta de tecnologías libres, luthería artesanal, música y encuentros itinerantes entre barrancos de La Gomera.',
    tipo: 'nomada',
    esPublica: true,
    requiereAprobacion: false,
    capacidad: 16,
    tags: ['Tecnologías Libres', 'Música', 'Oficios', 'Facilitación'],
    bannerUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80',
    logoUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80',
    ubicacion: { municipio: 'Vallehermoso', region: 'La Gomera', pais: 'España' },
    enabledModules: ['tablon', 'calendario', 'miembros'],
    adminUids: ['demo_persona_5'],
    createdBy: 'demo_persona_5',
    isDemo: true,
  },
];

const DEMO_PERSONAS = [
  {
    userId: 'demo_persona_1',
    nombre: 'Mateo Solís',
    headline: 'Bioconstrucción y domos',
    membershipType: 'custodian' as const,
    rol: 'admin' as const,
    communityId: 'demo_finca_guayadeque',
    lugar: 'Agüimes, Gran Canaria',
    fechaNacimiento: '1992-05-18',
    hora: '14:30',
    genero: 'masculino',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rol_comunidad: 'Coordino las cuadrillas de bioconstrucción y energía solar en el barranco.',
    ofrendas: ['Bioconstrucción', 'Carpintería', 'Energía solar'],
    saberes: ['Piedra seca', 'Sistemas solares', 'Permacultura'],
    necesidades: ['Facilitación S3', 'Banco de semillas'],
    tipo_hd: 'Proyector',
    autoridad_hd: 'Emocional',
    elemento: 'Tierra',
  },
  {
    userId: 'demo_persona_2',
    nombre: 'Elena Morales',
    headline: 'Guardiana de semillas y salud',
    membershipType: 'resident' as const,
    rol: 'admin' as const,
    communityId: 'demo_ecoaldea_anaga',
    lugar: 'Taganana, Tenerife',
    fechaNacimiento: '1988-11-04',
    hora: '08:15',
    genero: 'femenino',
    photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    rol_comunidad: 'Cuido el banco de semillas locales y los botiquines de herboristería comunitaria.',
    ofrendas: ['Herboristería', 'Semillas locales', 'Cocina colectiva'],
    saberes: ['Agroecología', 'Medicina natural', 'Permacultura'],
    necesidades: ['Carpintería', 'Diseño web'],
    tipo_hd: 'Generador',
    autoridad_hd: 'Sacral',
    elemento: 'Agua',
  },
  {
    userId: 'demo_persona_3',
    nombre: 'Yeray Betancort',
    headline: 'Aguas, riego y sociocracia',
    membershipType: 'resident' as const,
    rol: 'miembro' as const,
    communityId: 'demo_finca_guayadeque',
    lugar: 'Gáldar, Gran Canaria',
    fechaNacimiento: '1995-02-28',
    hora: '19:45',
    genero: 'masculino',
    photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rol_comunidad: 'Diseño sistemas de captación de niebla, riego por goteo y círculos de consentimiento.',
    ofrendas: ['Captación de agua', 'Riego eficiente', 'Gobernanza S3'],
    saberes: ['Hidrología rural', 'Tecnologías libres', 'Sociocracia'],
    necesidades: ['Bioconstrucción', 'Música en vivo'],
    tipo_hd: 'Generador Manifestante',
    autoridad_hd: 'Sacral',
    elemento: 'Aire',
  },
  {
    userId: 'demo_persona_4',
    nombre: 'Naira Cabrera',
    headline: 'Energía solar y arquitectura',
    membershipType: 'volunteer' as const,
    rol: 'admin' as const,
    communityId: 'demo_casa_timanfaya',
    lugar: 'Tinajo, Lanzarote',
    fechaNacimiento: '1991-07-12',
    hora: '11:20',
    genero: 'femenino',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rol_comunidad: 'Acompaño instalaciones fotovoltaicas aisladas y diseño bioclimático en tierra volcánica.',
    ofrendas: ['Energía solar', 'Arquitectura bioclimática', 'Diseño gráfico'],
    saberes: ['Fotovoltaica', 'Construcción con cal', 'Facilitación'],
    necesidades: ['Semillas resistentes', 'Red de coliving'],
    tipo_hd: 'Manifestador',
    autoridad_hd: 'Esplénica',
    elemento: 'Fuego',
  },
  {
    userId: 'demo_persona_5',
    nombre: 'Guayre Delgado',
    headline: 'Facilitación y luthería libre',
    membershipType: 'collaborator' as const,
    rol: 'admin' as const,
    communityId: 'demo_taller_garajonay',
    lugar: 'Vallehermoso, La Gomera',
    fechaNacimiento: '1986-03-09',
    hora: '16:10',
    genero: 'masculino',
    photoURL: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    rol_comunidad: 'Facilito círculos de escucha y construyo instrumentos con maderas recuperadas.',
    ofrendas: ['Facilitación de círculos', 'Luthería', 'Tecnologías libres'],
    saberes: ['Mediación', 'Carpintería fina', 'Música tradicional'],
    necesidades: ['Transporte interinsular', 'Permacultura'],
    tipo_hd: 'Reflector',
    autoridad_hd: 'Lunar',
    elemento: 'Aire',
  },
];

const DEMO_EVENTOS = [
  {
    id: 'demo_evt_minga_guayadeque',
    titulo: 'Minga de Stonewall & Acequias',
    descripcion: 'Jornada colectiva de restauración de bancales de piedra seca y limpieza de acequias con almuerzo comunitario.',
    tipo: 'tarea_comunal',
    inicio: daysFromNow(3, 9),
    fin: daysFromNow(3, 15),
    todoElDia: false,
    responsable_uid: 'demo_persona_1',
    participantes: ['demo_persona_1', 'demo_persona_3'],
    communityId: 'demo_finca_guayadeque',
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=900&q=80',
    creadoPor: 'demo_persona_1',
    isDemo: true,
  },
  {
    id: 'demo_evt_circulo_anaga',
    titulo: 'Círculo de Sociocracia 3.0',
    descripcion: 'Taller práctico de toma de decisiones por consentimiento y diseño de roles vivos para comunidades.',
    tipo: 'reunion',
    inicio: daysFromNow(7, 17),
    fin: daysFromNow(7, 20),
    todoElDia: false,
    responsable_uid: 'demo_persona_2',
    participantes: ['demo_persona_2', 'demo_persona_3', 'demo_persona_5'],
    communityId: 'demo_ecoaldea_anaga',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    creadoPor: 'demo_persona_2',
    isDemo: true,
  },
  {
    id: 'demo_evt_solar_lanzarote',
    titulo: 'Taller de Micro-redes Solares',
    descripcion: 'Aprende a dimensionar e instalar sistemas solares aislados para fincas rurales y espacios de trabajo.',
    tipo: 'visita',
    inicio: daysFromNow(12, 10),
    fin: daysFromNow(12, 18),
    todoElDia: false,
    responsable_uid: 'demo_persona_4',
    participantes: ['demo_persona_4', 'demo_persona_1'],
    communityId: 'demo_casa_timanfaya',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80',
    creadoPor: 'demo_persona_4',
    isDemo: true,
  },
  {
    id: 'demo_evt_celebracion_gomera',
    titulo: 'Encuentro de Semillas y Música',
    descripcion: 'Intercambio abierto de semillas criollas, comida compartida y música acústica al atardecer en Garajonay.',
    tipo: 'celebracion',
    inicio: daysFromNow(18, 16),
    fin: daysFromNow(18, 22),
    todoElDia: false,
    responsable_uid: 'demo_persona_5',
    participantes: ['demo_persona_5', 'demo_persona_2'],
    communityId: 'demo_taller_garajonay',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80',
    creadoPor: 'demo_persona_5',
    isDemo: true,
  },
];

const DEMO_RESIDENCIAS = [
  {
    id: 'demo_res_permacultura_gc',
    titulo: 'Estancia de Permacultura & Agua',
    descripcion: 'Convocatoria abierta para 3 personas interesadas en aprender diseño hidrológico, compostaje caliente y cultivo en barranco.',
    tipo: 'volunteer',
    duracion: '4 semanas',
    nodoSlug: 'demo_finca_guayadeque',
    nodoNombre: 'Finca Guayadeque Viva',
    isla: 'Gran Canaria',
    municipio: 'Agüimes',
    plazas: 3,
    plazasOcupadas: 1,
    ofrece: ['Cabaña compartida', 'Comida de huerta', 'Formación práctica'],
    busca: ['Apoyo en huerta', 'Riego', 'Mantenimiento'],
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80',
    activo: true,
    isDemo: true,
  },
  {
    id: 'demo_res_coliving_anaga',
    titulo: 'Coliving Rural entre Laurisilva',
    descripcion: 'Espacio tranquilo con fibra óptica rural, cocina común y caminatas matutinas para creadores y tecnólogos libres.',
    tipo: 'coliving',
    duracion: '1–3 meses',
    nodoSlug: 'demo_ecoaldea_anaga',
    nodoNombre: 'Ecoaldea Bosque de Anaga',
    isla: 'Tenerife',
    municipio: 'Taganana',
    plazas: 5,
    plazasOcupadas: 2,
    ofrece: ['Habitación privada', 'Fibra 600Mb', 'Círculos semanales'],
    busca: ['Contribución económica justa', 'Cuidado común'],
    imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=80',
    activo: true,
    isDemo: true,
  },
  {
    id: 'demo_res_bioconst_lanzarote',
    titulo: 'Custodia & Bioconstrucción Solar',
    descripcion: 'Acompañamiento técnico para levantar un taller comunitario con cal, picón volcánico y cubierta fotovoltaica.',
    tipo: 'stewardship',
    duracion: '6 semanas',
    nodoSlug: 'demo_casa_timanfaya',
    nodoNombre: 'Casa Volcánica Timanfaya',
    isla: 'Lanzarote',
    municipio: 'Tinajo',
    plazas: 2,
    plazasOcupadas: 0,
    ofrece: ['Estudio independiente', 'Taller equipado', 'Alimentos locales'],
    busca: ['Experiencia en obra', 'Electricidad solar', 'Compromiso'],
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=900&q=80',
    activo: true,
    isDemo: true,
  },
];

async function runSeed(token: string) {
  console.log(`🌱 Sembrando datos demo en ${PROJECT_ID} (${DATABASE_ID})...`);
  const now = new Date();

  for (const c of DEMO_COMUNIDADES) {
    await upsertDoc('comunidades', c.id, { ...c, creadoEn: now, updatedAt: now }, token);
  }
  console.log(`   ✅ ${DEMO_COMUNIDADES.length} nodos/comunidades demo creados/actualizados.`);

  for (const p of DEMO_PERSONAS) {
    const profilePayload = {
      userId: p.userId,
      nombre: p.nombre,
      headline: p.headline,
      communityId: p.communityId,
      photoURL: p.photoURL,
      estado: 'completo',
      isDemo: true,
      datosPersona: {
        nombre: p.nombre,
        headline: p.headline,
        fechaNacimiento: p.fechaNacimiento,
        hora: p.hora,
        genero: p.genero,
        lugar: p.lugar,
        rol_comunidad: p.rol_comunidad,
        saberes: p.saberes.join(', '),
        antiguedad_anos: 3,
        tension: '',
        communityId: p.communityId,
      },
      datosOnboarding: {
        nombre: p.nombre,
        headline: p.headline,
        fechaNacimiento: p.fechaNacimiento,
        hora: p.hora,
        genero: p.genero,
        lugar: p.lugar,
        rol_comunidad: p.rol_comunidad,
        saberes: p.saberes.join(', '),
        antiguedad_anos: 3,
        tension: '',
        communityId: p.communityId,
      },
      triada: {
        ofrendas: p.ofrendas,
        saberes: p.saberes,
        necesidades: p.necesidades,
      },
      datosBrutos: {
        carta_astral_completa: {
          posiciones: [],
          modalidad_dominante: 'Cardinal',
          elemento_dominante: p.elemento,
        },
        diseno_humano: {
          tipo: p.tipo_hd,
          autoridad: p.autoridad_hd,
          perfil: '3/5',
        },
      },
      createdAt: now,
      updatedAt: now,
    };

    await upsertDoc('profiles', p.userId, profilePayload, token);
    await upsertDoc('fichas', p.userId, profilePayload, token);
    await upsertDoc(
      'community_members',
      `${p.communityId}_${p.userId}`,
      {
        userId: p.userId,
        communityId: p.communityId,
        nombre: p.nombre,
        displayName: p.nombre,
        photoURL: p.photoURL,
        headline: p.headline,
        rol_comunidad: p.rol_comunidad,
        membershipType: p.membershipType,
        rol: p.rol,
        tipo_hd: p.tipo_hd,
        elemento_dominante: p.elemento,
        autoridad_hd: p.autoridad_hd,
        antiguedad_anos: 3,
        estado: 'activo',
        isDemo: true,
        creadoEn: now,
        updatedAt: now,
      },
      token
    );
  }
  console.log(`   ✅ ${DEMO_PERSONAS.length} personas (profiles, fichas, community_members) demo creadas/actualizadas.`);

  for (const ev of DEMO_EVENTOS) {
    await upsertDoc('eventos', ev.id, { ...ev, creadoEn: now, updatedAt: now }, token);
  }
  console.log(`   ✅ ${DEMO_EVENTOS.length} eventos demo creados/actualizados.`);

  for (const res of DEMO_RESIDENCIAS) {
    await upsertDoc('residencias', res.id, { ...res, creadoEn: now, updatedAt: now }, token);
  }
  console.log(`   ✅ ${DEMO_RESIDENCIAS.length} residencias demo creadas/actualizadas.`);
  console.log('🎉 Seed demo completado con éxito.');
}

async function runClean(token: string) {
  console.log(`🧹 Limpiando datos demo de ${PROJECT_ID} (${DATABASE_ID})...`);
  const collections = ['comunidades', 'profiles', 'fichas', 'community_members', 'eventos', 'residencias'];
  let deletedCount = 0;

  for (const col of collections) {
    const docs = await listCollectionDocs(col, token);
    for (const d of docs) {
      const docId = d.name.split('/').pop() || '';
      const isDemoFlag = d.fields?.isDemo?.booleanValue === true;
      if (isDemoFlag || docId.startsWith('demo_')) {
        await deleteDocByName(d.name, token);
        deletedCount++;
      }
    }
  }

  console.log(`✅ Limpieza completada: ${deletedCount} documentos demo eliminados.`);
}

async function main() {
  const shouldClean = process.argv.includes('--clean');
  const shouldSeed = process.argv.includes('--seed') || !shouldClean;
  const token = getAccessToken();

  if (shouldClean) {
    await runClean(token);
  }
  if (shouldSeed && !process.argv.includes('--clean')) {
    await runSeed(token);
  }
}

main().catch((err) => {
  console.error('❌ Error en seed-demo:', err);
  process.exit(1);
});
