// Base de données des thérapeutes
const initialTherapists = [
  {
    id: 1,
    name: "Éline Dracon",
    vibrationalPhrase: "Je t'aide à renouer avec la mémoire de ton corps et l'intelligence de l'eau.",
    image: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/edc3b0d882ea62edde7b49eef530a893.jpg",
    elements: ['Eau', 'Éther'],
    commune: "Pointe-à-Pitre",
    rating: 5.0,
    featured: true,
    phone: "0590 69 09 38 65",
    website: "calendly.com/eline971-dracon",
    specialties: ["Massage énergétique", "Harmonisation chakras", "Soins aquatiques"],
    approach: "Mon approche est douce et intuitive, je vous guide à écouter les messages de votre corps à travers l'élément Eau.",
    mantra: "L'eau se souvient de tout, ton corps aussi.",
    mission: "Ma mission est d'accompagner chaque personne à se reconnecter à sa puissance naturelle et à l'intelligence de son corps.",
    personalSpaceId: "eline-dracon-space-001",
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    id: 2,
    name: "Maya Soleil",
    vibrationalPhrase: "Je t'accompagne pour transformer tes ombres en lumière et réveiller ton feu sacré.",
    image: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/f62eb04fbb796f7fa1fa717d0cc99cd2.jpg",
    elements: ['Feu', 'Air'],
    commune: "Basse-Terre",
    rating: 4.9,
    featured: false,
    phone: "0590 45 67 89",
    website: "@mayasoleil",
    specialties: ["Danse thérapie", "Libération émotionnelle", "Rituels de feu"],
    approach: "J'utilise le mouvement et l'énergie pour libérer ce qui est bloqué et réveiller votre puissance intérieure.",
    mantra: "Ta puissance est une danse, laisse-la s'exprimer.",
    mission: "Je suis ici pour te rappeler que tu es le soleil. Ma mission est d'attiser ta flamme intérieure.",
    personalSpaceId: "maya-soleil-space-002",
    createdAt: new Date('2024-02-10').toISOString()
  },
  {
    id: 3,
    name: "Léo Gaïa",
    vibrationalPhrase: "Je te guide pour t'ancrer dans la Terre et y puiser ta force créatrice.",
    image: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/131e7588c8e62709cefcef4ce33640bd.jpg",
    elements: ['Terre', 'Feu'],
    commune: "Le Gosier",
    rating: 4.8,
    featured: false,
    phone: "0590 78 45 12",
    website: "leo.gaia@email.com",
    specialties: ["Massage aux pierres", "Artisanat thérapeutique", "Contes guérisseurs"],
    approach: "À travers la création manuelle et le partage, je vous aide à vous reconnecter à la Terre.",
    mantra: "Tes mains savent ce que ton âme a à dire.",
    mission: "Aider chacun à retrouver son ancrage et à sentir qu'il a sa place sur cette Terre.",
    personalSpaceId: "leo-gaia-space-003",
    createdAt: new Date('2024-01-20').toISOString()
  },
  {
    id: 4,
    name: "Clara Céleste",
    vibrationalPhrase: "Par le souffle et la parole, je t'aide à clarifier ton esprit et à t'ouvrir à ta guidance intérieure.",
    image: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/fef0c7ad45e6c0415e2936b54f0b1262.jpg",
    elements: ['Air', 'Éther'],
    commune: "Saint-François",
    rating: 4.9,
    featured: false,
    phone: "0590 56 78 90",
    website: "clara.celeste@therapie.com",
    specialties: ["Méditation guidée", "Enseignements spirituels", "Clarté mentale"],
    approach: "Ma pratique est centrée sur la clarté mentale. J'utilise la méditation et des enseignements pour vous aider à trouver vos propres réponses.",
    mantra: "Chaque respiration est une réponse.",
    mission: "Je suis un canal pour la clarté. Ma mission est de t'aider à apaiser le bruit mental pour que tu puisses entendre la voix de ton âme.",
    personalSpaceId: "clara-celeste-space-004",
    createdAt: new Date('2024-03-05').toISOString()
  },
  {
    id: 5,
    name: "Iris Divina",
    vibrationalPhrase: "Dans le silence, je t'ouvre les portes du cosmos intérieur.",
    image: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/746eb9998a27453610070f44ba9cfe74.jpg",
    elements: ['Éther', 'Eau'],
    commune: "Sainte-Anne",
    rating: 5.0,
    featured: true,
    phone: "0590 67 89 01",
    website: "calendly.com/iris",
    specialties: ["Bains sonores", "Rituels de passage", "Voyages méditatifs"],
    approach: "Je crée des espaces sacrés où, par le son et le rituel, vous pouvez voyager à l'intérieur de vous-même et vous connecter au mystère.",
    mantra: "Le plus grand des voyages est intérieur.",
    mission: "T'ouvrir à l'invisible, au grand mystère qui vit en toi et autour de toi. Ma mission est de te guider dans ton voyage intérieur.",
    personalSpaceId: "iris-divina-space-005",
    createdAt: new Date('2024-03-12').toISOString()
  },
  {
    id: 6,
    name: "Océane Lumière",
    vibrationalPhrase: "Je t'accompagne dans la danse de tes émotions pour retrouver ta fluidité naturelle.",
    image: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/99e4380e0bba25841a9929b2e4cd59c6.jpg",
    elements: ['Eau', 'Air'],
    commune: "Capesterre-Belle-Eau",
    rating: 4.8,
    featured: false,
    phone: "0590 88 77 66",
    website: "oceane.lumiere@therapie.com",
    specialties: ["Watsu", "Massage aquatique", "Thérapie par l'eau"],
    approach: "J'utilise l'élément eau pour créer un espace de guérison profonde où le corps retrouve sa mémoire originelle.",
    mantra: "Dans l'eau, tout redevient possible.",
    mission: "Accompagner chaque âme à retrouver sa fluidité et sa capacité d'adaptation naturelle.",
    personalSpaceId: "oceane-lumiere-space-006",
    createdAt: new Date('2024-04-01').toISOString()
  },
  {
    id: 7,
    name: "Solann Feu Sacré",
    vibrationalPhrase: "Je réveille ta flamme intérieure pour que tu puisses briller de ta propre lumière.",
    image: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/2993cb4c5f20ce8301c62fb77379f925.jpg",
    elements: ['Feu', 'Terre'],
    commune: "Bouillante",
    rating: 4.9,
    featured: true,
    phone: "0590 99 88 77",
    website: "solann.feusacre@gmail.com",
    specialties: ["Breathwork", "Rituels de feu", "Libération émotionnelle"],
    approach: "Par le souffle et le feu sacré, je t'aide à transmuter tes peurs en force et tes blessures en sagesse.",
    mantra: "Ton feu intérieur est ta plus grande médecine.",
    mission: "Rallumer la flamme sacrée en chaque être pour qu'il puisse rayonner sa vérité.",
    personalSpaceId: "solann-feu-sacre-space-007",
    createdAt: new Date('2024-04-15').toISOString()
  },
  {
    id: 8,
    name: "Gaïa Racines",
    vibrationalPhrase: "Je t'aide à retrouver tes racines profondes et à puiser ta force dans la Terre Mère.",
    image: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/5c7422417726a9f109f86da69634f0a4.jpg",
    elements: ['Terre', 'Eau'],
    commune: "Trois-Rivières",
    rating: 4.7,
    featured: false,
    phone: "0590 77 66 55",
    website: "gaia.racines@nature.com",
    specialties: ["Massage aux argiles", "Soins aux plantes", "Ancrage énergétique"],
    approach: "Je travaille avec les éléments naturels de la Guadeloupe pour reconnecter chaque personne à sa force tellurique.",
    mantra: "Tes racines sont ta force, ta terre est ta médecine.",
    mission: "Reconnecter les âmes à la sagesse ancestrale de la Terre et aux pouvoirs guérisseurs des plantes.",
    personalSpaceId: "gaia-racines-space-008",
    createdAt: new Date('2024-05-01').toISOString()
  },
  {
    id: 9,
    name: "Vent d'Espoir",
    vibrationalPhrase: "Par le souffle et la parole sacrée, je t'aide à clarifier ton mental et à ouvrir ton cœur.",
    image: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/a2b26adbc3c05b325cc17599b65d5e86.jpg",
    elements: ['Air', 'Éther'],
    commune: "Deshaies",
    rating: 4.8,
    featured: false,
    phone: "0590 66 55 44",
    website: "vent.espoir@guidance.com",
    specialties: ["Coaching spirituel", "Méditation", "Guidance intuitive"],
    approach: "J'accompagne par la parole juste et les pratiques respiratoires pour apporter clarté et paix intérieure.",
    mantra: "Chaque souffle porte une réponse, chaque silence une révélation.",
    mission: "Aider chaque âme à entendre sa voix intérieure et à suivre sa guidance divine.",
    personalSpaceId: "vent-espoir-space-009",
    createdAt: new Date('2024-05-15').toISOString()
  },
  {
    id: 10,
    name: "Cosmos Infini",
    vibrationalPhrase: "Je t'ouvre les portes de l'invisible et t'accompagne dans ton éveil cosmique.",
    image: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/b4f83bec67a9a7ec14c9c95a563fa716.jpg",
    elements: ['Éther', 'Air'],
    commune: "Sainte-Rose",
    rating: 5.0,
    featured: true,
    phone: "0590 55 44 33",
    website: "cosmos.infini@mystique.com",
    specialties: ["Voyages chamaniques", "Activation ADN", "Connexion galactique"],
    approach: "Je facilite les voyages dans les dimensions subtiles pour reconnecter chaque être à sa nature cosmique.",
    mantra: "Tu es étoile, souviens-toi de ta lumière originelle.",
    mission: "Éveiller la conscience cosmique et accompagner les âmes dans leur mission stellaire sur Terre.",
    personalSpaceId: "cosmos-infini-space-010",
    createdAt: new Date('2024-06-01').toISOString()
  }
];

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

export function getAllTherapists() {
  return getStoredTherapists();
}

export function getTherapistById(id) {
  const therapists = getAllTherapists();
  return therapists.find(therapist => therapist.id === parseInt(id));
}

export function getTherapistBySpaceId(spaceId) {
  const therapists = getAllTherapists();
  return therapists.find(therapist => therapist.personalSpaceId === spaceId);
}

export function addTherapist(therapistData) {
  const therapists = getAllTherapists();
  const newTherapist = {
    ...therapistData,
    id: Date.now(),
    personalSpaceId: `${therapistData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-space-${Date.now()}`,
    rating: 0,
    featured: false,
    createdAt: new Date().toISOString()
  };
  const updatedTherapists = [...therapists, newTherapist];
  localStorage.setItem('therapists', JSON.stringify(updatedTherapists));
  return newTherapist;
}

export function updateTherapist(id, updatedData) {
  const therapists = getAllTherapists();
  const index = therapists.findIndex(t => t.id === parseInt(id));
  if (index !== -1) {
    therapists[index] = { ...therapists[index], ...updatedData };
    localStorage.setItem('therapists', JSON.stringify(therapists));
    return therapists[index];
  }
  return null;
}

export function deleteTherapist(id) {
  const therapists = getAllTherapists();
  const filtered = therapists.filter(t => t.id !== parseInt(id));
  localStorage.setItem('therapists', JSON.stringify(filtered));
}