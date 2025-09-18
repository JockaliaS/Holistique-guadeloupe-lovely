// Base de données centralisée pour toutes les entités
import { supabase } from '@/lib/customSupabaseClient';

// Données initiales pour les thérapeutes
const initialTherapists = [
  {
    id: 1,
    name: "Éline Dracon",
    type: "therapist",
    vibrationalPhrase: "Je t'aide à renouer avec la mémoire de ton corps et l'intelligence de l'eau.",
    image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/31d0e86a-732d-4c00-87e3-8bc851042c67/63be44ae937c11b4281137e9f223f814.jpg",
    elements: ['Eau', 'Éther'],
    commune: "Pointe-à-Pitre",
    rating: 5.0,
    featured: true,
    relianceDirecte: "0590 69 09 38 65",
    presenceInspirante: "calendly.com/eline971-dracon",
    experiences: {
      "soin_energetique": ["massage_intuitif", "harmonisation_energetique"],
      "nettoyage_purification": ["reconnexion_eau", "nettoyage_vibratoire"],
    },
    approach: "Mon approche est douce et intuitive, je vous guide à écouter les messages de votre corps à travers l'élément Eau.",
    mantra: "L'eau se souvient de tout, ton corps aussi.",
    mission: "Ma mission est d'accompagner chaque femme à se reconnecter à sa puissance cyclique et à l'intelligence de son corps.",
    messageBienvenue: "Bienvenue à toi, âme sensible. Je t'invite à plonger dans tes profondeurs avec douceur.",
    personalSpaceId: "eline-dracon-space-001",
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: 2,
    name: "Maya Soleil",
    type: "therapist",
    vibrationalPhrase: "Je t'accompagne pour transformer tes ombres en lumière et réveiller ton feu sacré.",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=1974&auto=format&fit=crop",
    elements: ['Feu', 'Air'],
    commune: "Basse-Terre",
    rating: 4.9,
    featured: false,
    relianceDirecte: "0590 45 67 89",
    presenceInspirante: "@mayasoleil",
    experiences: {
      "soin_energetique": ["soin_sonore"],
      "danses_songes": ["danse_intuitive", "danse_medecine"]
    },
    approach: "J'utilise le mouvement et l'énergie pour libérer ce qui est bloqué et réveiller votre puissance intérieure.",
    mantra: "Ta puissance est une danse, laisse-la s'exprimer.",
    mission: "Je suis ici pour te rappeler que tu es le soleil. Ma mission est d'attiser ta flamme intérieure.",
    messageBienvenue: "Que ta flamme intérieure s'éveille ! Ensemble, transformons ce qui doit l'être.",
    personalSpaceId: "maya-soleil-space-002",
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date('2024-02-10').toISOString()
  },
  {
    id: 3,
    name: "Léo Gaïa",
    type: "therapist",
    vibrationalPhrase: "Je te guide pour t'ancrer dans la Terre et y puiser ta force créatrice.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    elements: ['Terre', 'Feu'],
    commune: "Le Gosier",
    rating: 4.8,
    featured: false,
    relianceDirecte: "0590 78 45 12",
    presenceInspirante: "leo.gaia@email.com",
    experiences: {
      "creation_ame": ["artisanat_sacre"],
      "histoires_sagesses": ["cercle_conte"],
    },
    approach: "À travers la création manuelle et le partage, je vous aide à vous reconnecter à la Terre.",
    mantra: "Tes mains savent ce que ton âme a à dire.",
    mission: "Aider chacun à retrouver son ancrage et à sentir qu'il a sa place sur cette Terre.",
    messageBienvenue: "La Terre t'attend. Viens te déposer et sentir tes racines grandir.",
    personalSpaceId: "leo-gaia-space-003",
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString()
  },
  {
    id: 4,
    name: "Clara Céleste",
    type: "therapist",
    vibrationalPhrase: "Par le souffle et la parole, je t'aide à clarifier ton esprit et à t'ouvrir à ta guidance intérieure.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    elements: ['Air', 'Éther'],
    commune: "Saint-François",
    rating: 4.9,
    featured: false,
    relianceDirecte: "0590 56 78 90",
    presenceInspirante: "clara.celeste@therapie.com",
    experiences: {
      "meditation_rituels": ["meditation_guidee"],
      "histoires_sagesses": ["enseignement_oral"]
    },
    approach: "Ma pratique est centrée sur la clarté mentale. J'utilise la méditation et des enseignements pour vous aider à trouver vos propres réponses.",
    mantra: "Chaque respiration est une réponse.",
    mission: "Je suis un canal pour la clarté. Ma mission est de t'aider à apaiser le bruit mental pour que tu puisses entendre la voix de ton âme.",
    messageBienvenue: "Laisse tes pensées s'envoler et la clarté t'inonder. Je suis là pour t'écouter.",
    personalSpaceId: "clara-celeste-space-004",
    createdAt: new Date('2024-03-05').toISOString(),
    updatedAt: new Date('2024-03-05').toISOString()
  }
];

// Données initiales pour les artistes
const initialArtists = [
  {
    id: 1,
    name: "Atelier Lumina",
    type: "artist",
    craft: "Peinture Vibratoire & Talismans",
    description: "Canalise les énergies de la nature guadeloupéenne pour créer des œuvres qui élèvent l'âme et harmonisent les lieux de vie.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1948&auto=format&fit=crop",
    portfolioImages: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1974&auto=format&fit=crop"
    ],
    commune: "Sainte-Rose",
    contact: "atelier.lumina@email.com",
    featured: true,
    category: "Peinture",
    techniques: ["Acrylique", "Aquarelle", "Techniques mixtes"],
    priceRange: "50€ - 500€",
    personalSpaceId: "lumina-artist-space-001",
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-01-10').toISOString()
  },
  {
    id: 2,
    name: "Terre & Esprit",
    type: "artist",
    craft: "Poterie & Céramique Sacrée",
    description: "Façonne l'argile locale en pièces uniques, porteuses d'intention et de l'esprit des volcans et des rivières de l'île.",
    image: "https://images.unsplash.com/photo-1565034893982-598150a04297?q=80&w=1974&auto=format&fit=crop",
    portfolioImages: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1974&auto=format&fit=crop"
    ],
    commune: "Trois-Rivières",
    contact: "@terre.esprit",
    featured: false,
    category: "Poterie",
    techniques: ["Tournage", "Modelage", "Raku"],
    priceRange: "30€ - 200€",
    personalSpaceId: "terre-esprit-space-002",
    createdAt: new Date('2024-02-15').toISOString(),
    updatedAt: new Date('2024-02-15').toISOString()
  },
  {
    id: 3,
    name: "Fils d'Or",
    type: "artist",
    craft: "Tissage & Créations Textiles",
    description: "Tisse des mandalas et des pièces murales en macramé en y intégrant des fibres végétales locales, des graines et des minéraux.",
    image: "https://images.unsplash.com/photo-1626825488437-b43b67bce1b4?q=80&w=1974&auto=format&fit=crop",
    portfolioImages: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1974&auto=format&fit=crop"
    ],
    commune: "Le Moule",
    contact: "fils.dor@artisan.com",
    featured: false,
    category: "Tissage",
    techniques: ["Macramé", "Tissage traditionnel", "Fibres naturelles"],
    priceRange: "25€ - 150€",
    personalSpaceId: "fils-dor-space-003",
    createdAt: new Date('2024-03-01').toISOString(),
    updatedAt: new Date('2024-03-01').toISOString()
  },
  {
    id: 4,
    name: "Mélodie Végétale",
    type: "artist",
    craft: "Bijoux Botaniques & Ornements",
    description: "Crée des bijoux éphémères et durables à partir de fleurs, de feuilles et de graines, capturant la beauté fugace de la flore.",
    image: "https://images.unsplash.com/photo-1611652033933-913711993922?q=80&w=1974&auto=format&fit=crop",
    portfolioImages: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1974&auto=format&fit=crop"
    ],
    commune: "Deshaies",
    contact: "0590 34 56 78",
    featured: true,
    category: "Bijoux",
    techniques: ["Séchage naturel", "Résine végétale", "Montage artisanal"],
    priceRange: "15€ - 80€",
    personalSpaceId: "melodie-vegetale-space-004",
    createdAt: new Date('2024-02-20').toISOString(),
    updatedAt: new Date('2024-02-20').toISOString()
  },
  {
    id: 5,
    name: "Bois Ancestral",
    type: "artist",
    craft: "Sculpture sur Bois & Objets Rituels",
    description: "Travaille les bois flottés et les essences locales pour donner vie à des sculptures intuitives et des objets de rituels connectés aux ancêtres.",
    image: "https://images.unsplash.com/photo-1595053910376-7b0a701a5d6a?q=80&w=1974&auto=format&fit=crop",
    portfolioImages: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1974&auto=format&fit=crop"
    ],
    commune: "Goyave",
    contact: "bois.ancestral@email.com",
    featured: false,
    category: "Sculpture",
    techniques: ["Sculpture traditionnelle", "Gravure", "Finitions naturelles"],
    priceRange: "100€ - 800€",
    personalSpaceId: "bois-ancestral-space-005",
    createdAt: new Date('2024-01-25').toISOString(),
    updatedAt: new Date('2024-01-25').toISOString()
  }
];

// Données initiales pour les articles de blog
const initialBlogPosts = [
  {
    id: 1,
    title: "🌌 Formes et fréquences : le langage secret de la géométrie sacrée",
    slug: "formes-et-frequences",
    excerpt: "Et si les formes n'étaient pas que des contours visibles, mais des vibrations figées dans la matière ? Et si, derrière chaque cercle, chaque spirale, chaque rosace, se cachait une fréquence qui dialogue en silence avec notre être profond ?",
    content: `L'univers entier est vibration. Chaque atome, chaque cellule, chaque étoile est un concert d'ondes qui résonnent. Lorsqu'une vibration sonore est rendue visible – par exemple sur une plaque de sable ou dans l'eau – elle dessine spontanément des motifs géométriques précis. C'est ce que l'on appelle la cymatique.

Ainsi, la fréquence crée la forme. Une note de musique devient un mandala. Un battement rythmique devient une étoile.

La géométrie n'est donc pas seulement mathématique : elle est le visage visible du son.`,
    image: "https://images.unsplash.com/photo-1518621736915-f3b1c811cd17?q=80&w=2070&auto=format&fit=crop",
    author: "Éline Dracon",
    publishedAt: new Date('2024-08-02').toISOString(),
    tags: ["géométrie sacrée", "vibrations", "cymatique"],
    featured: true,
    status: "published"
  },
  {
    id: 2,
    title: "🌍 La résonance de Schumann : le battement de cœur de la Terre",
    slug: "resonance-schumann",
    excerpt: "Nous vivons tous baignés dans une mer invisible : celle des vibrations de la Terre. Comme chaque être vivant, la planète elle-même a un rythme, un pouls, une fréquence qui lui est propre.",
    content: `Imaginez notre planète comme un immense tambour. Son atmosphère, prise entre la surface terrestre et l'ionosphère, forme une caisse de résonance. Lorsque la foudre frappe (des milliers de fois chaque seconde sur la planète), cela fait vibrer cette "cavité" et génère une onde stable : 7,83 Hz.

C'est le son de fond permanent de notre Terre, une mélodie silencieuse qui nous enveloppe à chaque instant, que nous en soyons conscients ou non.`,
    image: "https://images.unsplash.com/photo-1543722530-539c3c415520?q=80&w=2070&auto=format&fit=crop",
    author: "Clara Céleste",
    publishedAt: new Date('2024-07-26').toISOString(),
    tags: ["résonance", "Terre", "fréquences"],
    featured: false,
    status: "published"
  },
  {
    id: 3,
    title: "💧 L'eau, gardienne de mémoire",
    slug: "eau-memoire",
    excerpt: "L'eau est partout autour de nous : dans les océans, les rivières, les nuages… et elle est aussi en nous, car notre corps en est composé à plus de 70 %. Mais l'eau n'est pas seulement une substance vitale.",
    content: `L'eau est partout autour de nous : dans les océans, les rivières, les nuages… et elle est aussi en nous, car notre corps en est composé à plus de 70 %. Mais l'eau n'est pas seulement une substance vitale. Elle est aussi une gardienne de mémoire, un miroir de nos émotions et un lien vivant entre la matière et l'esprit.

Le chercheur japonais Masaru Emoto a bouleversé notre perception de l'eau dans les années 1990. En exposant de l'eau à différents mots, musiques ou intentions, puis en la cristallisant par congélation, il a observé des transformations remarquables.`,
    image: "https://images.unsplash.com/photo-1533219355137-593339174548?q=80&w=2070&auto=format&fit=crop",
    author: "Maya Soleil",
    publishedAt: new Date('2024-07-12').toISOString(),
    tags: ["eau", "mémoire", "Masaru Emoto"],
    featured: true,
    status: "published"
  },
  {
    id: 4,
    title: "🎨 L'art comme médecine de l'âme",
    slug: "art-medecine-ame",
    excerpt: "Dans les traditions ancestrales, l'art n'était jamais séparé de la guérison. Chaque couleur, chaque forme, chaque geste créatif portait une intention thérapeutique.",
    content: `Dans les traditions ancestrales, l'art n'était jamais séparé de la guérison. Chaque couleur, chaque forme, chaque geste créatif portait une intention thérapeutique.

Aujourd'hui, nous redécouvrons cette sagesse : l'art-thérapie, la peinture intuitive, la sculpture méditative... Autant de voies pour libérer les émotions, exprimer l'inexprimable et transformer la souffrance en beauté.

Créer, c'est se créer. Chaque œuvre est un miroir de notre monde intérieur, une cartographie de notre âme en mouvement.`,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1974&auto=format&fit=crop",
    author: "Léo Gaïa",
    publishedAt: new Date('2024-06-15').toISOString(),
    tags: ["art-thérapie", "créativité", "guérison"],
    featured: false,
    status: "published"
  },
  {
    id: 5,
    title: "🌿 Les plantes maîtresses de Guadeloupe",
    slug: "plantes-maitresses-guadeloupe",
    excerpt: "La Guadeloupe regorge de plantes aux vertus thérapeutiques exceptionnelles. Découvrez la pharmacie naturelle de nos ancêtres.",
    content: `La Guadeloupe regorge de plantes aux vertus thérapeutiques exceptionnelles. Nos ancêtres connaissaient les secrets de chaque feuille, de chaque racine, de chaque fleur.

Le Bois d'Inde, anti-inflammatoire puissant. La Verveine tropicale, apaisante pour l'esprit. Le Vétiver, ancrage et purification. Chaque plante porte une médecine spécifique, une vibration unique.

Redécouvrir cette pharmacie naturelle, c'est se reconnecter à la sagesse de la Terre et honorer l'héritage de nos aïeux.`,
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop",
    author: "Éline Dracon",
    publishedAt: new Date('2024-05-20').toISOString(),
    tags: ["phytothérapie", "Guadeloupe", "plantes médicinales"],
    featured: true,
    status: "published"
  }
];

// Utilisateur admin
const adminUser = {
  id: 'admin-001',
  username: 'admin',
  email: 'admin@terranova.gp',
  role: 'admin',
  name: 'Administrateur Terra Nova',
  createdAt: new Date('2024-01-01').toISOString()
};

// Fonctions utilitaires
function generateId() {
  return Date.now() + Math.random().toString(36).substr(2, 9);
}

function generatePersonalSpaceId(name, type) {
  const cleanName = name.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${cleanName}-${type}-space-${generateId()}`;
}

// Gestion des thérapeutes
export function getStoredTherapists() {
  try {
    const data = localStorage.getItem('therapists');
    if (!data) {
      localStorage.setItem('therapists', JSON.stringify(initialTherapists));
      return initialTherapists;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading therapists from localStorage:", error);
    return initialTherapists;
  }
}

export function saveTherapists(therapists) {
  try {
    localStorage.setItem('therapists', JSON.stringify(therapists));
  } catch (error) {
    console.error("Error saving therapists to localStorage:", error);
  }
}

export function addTherapist(formData) {
  const therapists = getStoredTherapists();
  const newTherapist = {
    id: generateId(),
    name: formData.name || "Nouveau Thérapeute",
    type: "therapist",
    vibrationalPhrase: formData.vibrationalPhrase,
    image: formData.portraitPhoto || "https://images.unsplash.com/photo-1595872018818-97555653a011",
    artImage: formData.artPhoto,
    elements: formData.elements,
    commune: formData.commune || "Guadeloupe",
    rating: 0,
    featured: false,
    relianceDirecte: formData.relianceDirecte || "Non spécifié",
    presenceInspirante: formData.presenceInspirante || "Non spécifié",
    experiences: formData.experiences || {},
    approach: formData.approach || "",
    mantra: formData.mantra || "",
    mission: formData.mission || "",
    messageBienvenue: formData.messageBienvenue || "",
    intentions: formData.intentions || [],
    durations: formData.durations || [],
    locations: formData.locations || [],
    personalSpaceId: generatePersonalSpaceId(formData.name, 'therapist'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const updatedTherapists = [...therapists, newTherapist];
  saveTherapists(updatedTherapists);
  return newTherapist;
}

export function getAllTherapists() {
  return getStoredTherapists();
}

export function getTherapistById(id) {
  const allTherapists = getAllTherapists();
  return allTherapists.find(therapist => therapist.id == id);
}

export function getTherapistBySpaceId(spaceId) {
  const allTherapists = getAllTherapists();
  return allTherapists.find(therapist => therapist.personalSpaceId === spaceId);
}

export function updateTherapist(id, updatedData) {
  let therapists = getAllTherapists();
  const index = therapists.findIndex(t => t.id == id);
  if (index !== -1) {
    therapists[index] = { 
      ...therapists[index], 
      ...updatedData,
      image: updatedData.portraitPhoto || therapists[index].image,
      updatedAt: new Date().toISOString()
    };
    saveTherapists(therapists);
    return therapists[index];
  }
  return null;
}

export function deleteTherapist(id) {
  let therapists = getAllTherapists();
  therapists = therapists.filter(t => t.id != id);
  saveTherapists(therapists);
}

// Gestion des artistes
export function getStoredArtists() {
  try {
    const data = localStorage.getItem('artists');
    if (!data) {
      localStorage.setItem('artists', JSON.stringify(initialArtists));
      return initialArtists;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading artists from localStorage:", error);
    return initialArtists;
  }
}

export function saveArtists(artists) {
  try {
    localStorage.setItem('artists', JSON.stringify(artists));
  } catch (error) {
    console.error("Error saving artists to localStorage:", error);
  }
}

export function addArtist(formData) {
  const artists = getStoredArtists();
  const newArtist = {
    id: generateId(),
    name: formData.name || "Nouvel Artiste",
    type: "artist",
    craft: formData.craft || "Art créatif",
    description: formData.description || "",
    image: formData.portraitPhoto || "https://images.unsplash.com/photo-1595872018818-97555653a011",
    portfolioImages: formData.portfolioImages || [],
    commune: formData.commune || "Guadeloupe",
    contact: formData.contact || "Non spécifié",
    featured: false,
    category: formData.category || "Autre",
    techniques: formData.techniques || [],
    priceRange: formData.priceRange || "Sur devis",
    personalSpaceId: generatePersonalSpaceId(formData.name, 'artist'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const updatedArtists = [...artists, newArtist];
  saveArtists(updatedArtists);
  return newArtist;
}

export function getAllArtists() {
  return getStoredArtists();
}

export function getArtistById(id) {
  const allArtists = getAllArtists();
  return allArtists.find(artist => artist.id == id);
}

export function getArtistBySpaceId(spaceId) {
  const allArtists = getAllArtists();
  return allArtists.find(artist => artist.personalSpaceId === spaceId);
}

export function updateArtist(id, updatedData) {
  let artists = getAllArtists();
  const index = artists.findIndex(a => a.id == id);
  if (index !== -1) {
    artists[index] = { 
      ...artists[index], 
      ...updatedData,
      image: updatedData.portraitPhoto || artists[index].image,
      updatedAt: new Date().toISOString()
    };
    saveArtists(artists);
    return artists[index];
  }
  return null;
}

export function deleteArtist(id) {
  let artists = getAllArtists();
  artists = artists.filter(a => a.id != id);
  saveArtists(artists);
}

// Gestion des articles de blog
export function getStoredBlogPosts() {
  try {
    const data = localStorage.getItem('blogPosts');
    if (!data) {
      localStorage.setItem('blogPosts', JSON.stringify(initialBlogPosts));
      return initialBlogPosts;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading blog posts from localStorage:", error);
    return initialBlogPosts;
  }
}

export function saveBlogPosts(posts) {
  try {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  } catch (error) {
    console.error("Error saving blog posts to localStorage:", error);
  }
}

export function addBlogPost(formData) {
  const posts = getStoredBlogPosts();
  const newPost = {
    id: generateId(),
    title: formData.title || "Nouvel Article",
    slug: formData.slug || formData.title?.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') || 'nouvel-article',
    excerpt: formData.excerpt || "",
    content: formData.content || "",
    image: formData.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    author: formData.author || "Terra Nova",
    publishedAt: new Date().toISOString(),
    tags: formData.tags || [],
    featured: formData.featured || false,
    status: formData.status || "published"
  };
  const updatedPosts = [...posts, newPost];
  saveBlogPosts(updatedPosts);
  return newPost;
}

export function getAllBlogPosts() {
  return getStoredBlogPosts();
}

export function getBlogPostById(id) {
  const allPosts = getAllBlogPosts();
  return allPosts.find(post => post.id == id);
}

export function getBlogPostBySlug(slug) {
  const allPosts = getAllBlogPosts();
  return allPosts.find(post => post.slug === slug);
}

export function updateBlogPost(id, updatedData) {
  let posts = getAllBlogPosts();
  const index = posts.findIndex(p => p.id == id);
  if (index !== -1) {
    posts[index] = { 
      ...posts[index], 
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    saveBlogPosts(posts);
    return posts[index];
  }
  return null;
}

export function deleteBlogPost(id) {
  let posts = getAllBlogPosts();
  posts = posts.filter(p => p.id != id);
  saveBlogPosts(posts);
}

// Gestion de l'admin
export function getAdminUser() {
  try {
    const data = localStorage.getItem('adminUser');
    if (!data) {
      localStorage.setItem('adminUser', JSON.stringify(adminUser));
      return adminUser;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading admin user from localStorage:", error);
    return adminUser;
  }
}

export function isAdmin(userId) {
  const admin = getAdminUser();
  return admin.id === userId;
}

// Session management
export function getCurrentUser() {
  try {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading current user from localStorage:", error);
    return null;
  }
}

export function setCurrentUser(user) {
  try {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } catch (error) {
    console.error("Error saving current user to localStorage:", error);
  }
}

export function logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('loggedInUserId');
}

// Recherche globale
export function searchAll(query) {
  const therapists = getAllTherapists();
  const artists = getAllArtists();
  const blogPosts = getAllBlogPosts();
  
  const results = {
    therapists: therapists.filter(t => 
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.vibrationalPhrase.toLowerCase().includes(query.toLowerCase())
    ),
    artists: artists.filter(a => 
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.craft.toLowerCase().includes(query.toLowerCase()) ||
      a.description.toLowerCase().includes(query.toLowerCase())
    ),
    blogPosts: blogPosts.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      p.content.toLowerCase().includes(query.toLowerCase())
    )
  };
  
  return results;
}