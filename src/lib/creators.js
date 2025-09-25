// Base de données des créateurs/artistes
const initialCreators = [
  {
    id: 1,
    name: "Atelier Lumina",
    craft: "Peinture Vibratoire & Talismans",
    description: "Canalise les énergies de la nature guadeloupéenne pour créer des œuvres qui élèvent l'âme et harmonisent les lieux de vie.",
    image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=800",
    commune: "Sainte-Rose",
    contact: "atelier.lumina@email.com",
    category: "Peinture",
    priceRange: "50€ - 500€",
    featured: true,
    createdAt: new Date('2024-01-10').toISOString()
  },
  {
    id: 2,
    name: "Terre & Esprit",
    craft: "Poterie & Céramique Sacrée",
    description: "Façonne l'argile locale en pièces uniques, porteuses d'intention et de l'esprit des volcans et des rivières de l'île.",
    image: "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=800",
    commune: "Trois-Rivières",
    contact: "@terre.esprit",
    category: "Poterie",
    priceRange: "30€ - 200€",
    featured: false,
    createdAt: new Date('2024-02-15').toISOString()
  },
  {
    id: 3,
    name: "Fils d'Or",
    craft: "Tissage & Créations Textiles",
    description: "Tisse des mandalas et des pièces murales en macramé en y intégrant des fibres végétales locales, des graines et des minéraux.",
    image: "https://images.pexels.com/photos/3768146/pexels-photo-3768146.jpeg?auto=compress&cs=tinysrgb&w=800",
    commune: "Le Moule",
    contact: "fils.dor@artisan.com",
    category: "Tissage",
    priceRange: "25€ - 150€",
    featured: false,
    createdAt: new Date('2024-03-01').toISOString()
  },
  {
    id: 4,
    name: "Mélodie Végétale",
    craft: "Bijoux Botaniques & Ornements",
    description: "Crée des bijoux éphémères et durables à partir de fleurs, de feuilles et de graines, capturant la beauté fugace de la flore.",
    image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=800",
    commune: "Deshaies",
    contact: "0590 34 56 78",
    category: "Bijoux",
    priceRange: "15€ - 80€",
    featured: true,
    createdAt: new Date('2024-02-20').toISOString()
  },
  {
    id: 5,
    name: "Bois Ancestral",
    craft: "Sculpture sur Bois & Objets Rituels",
    description: "Travaille les bois flottés et les essences locales pour donner vie à des sculptures intuitives et des objets de rituels connectés aux ancêtres.",
    image: "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=800",
    commune: "Goyave",
    contact: "bois.ancestral@email.com",
    category: "Sculpture",
    priceRange: "100€ - 800€",
    featured: false,
    createdAt: new Date('2024-01-25').toISOString()
  }
];

export function getStoredCreators() {
  try {
    const data = localStorage.getItem('creators');
    if (!data) {
      localStorage.setItem('creators', JSON.stringify(initialCreators));
      return initialCreators;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading creators from localStorage:", error);
    return initialCreators;
  }
}

export function getAllCreators() {
  return getStoredCreators();
}

export function getCreatorById(id) {
  const creators = getAllCreators();
  return creators.find(creator => creator.id === parseInt(id));
}

export function getCreatorBySpaceId(spaceId) {
  const creators = getAllCreators();
  return creators.find(creator => creator.personalSpaceId === spaceId);
}

export function addCreator(creatorData) {
  const creators = getAllCreators();
  const newCreator = {
    ...creatorData,
    id: Date.now(),
    personalSpaceId: `${creatorData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-space-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  const updatedCreators = [...creators, newCreator];
  localStorage.setItem('creators', JSON.stringify(updatedCreators));
  return newCreator;
}

export function updateCreator(id, updatedData) {
  const creators = getAllCreators();
  const index = creators.findIndex(c => c.id === parseInt(id));
  if (index !== -1) {
    creators[index] = { ...creators[index], ...updatedData };
    localStorage.setItem('creators', JSON.stringify(creators));
    return creators[index];
  }
  return null;
}

export function deleteCreator(id) {
  const creators = getAllCreators();
  const filtered = creators.filter(c => c.id !== parseInt(id));
  localStorage.setItem('creators', JSON.stringify(filtered));
}