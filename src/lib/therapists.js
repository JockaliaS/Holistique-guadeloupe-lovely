// Base de données des thérapeutes
const initialTherapists = [
  {
    id: 1,
    name: "Éline Dracon",
    vibrationalPhrase: "Je t'aide à renouer avec la mémoire de ton corps et l'intelligence de l'eau.",
    image: "https://images.pexels.com/photos/3768146/pexels-photo-3768146.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    image: "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=800",
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