// Base de données des articles de blog
const initialBlogPosts = [
  {
    id: 1,
    title: "🌌 Formes et fréquences : le langage secret de la géométrie sacrée",
    slug: "formes-et-frequences",
    excerpt: "Et si les formes n'étaient pas que des contours visibles, mais des vibrations figées dans la matière ?",
    content: `L'univers entier est vibration. Chaque atome, chaque cellule, chaque étoile est un concert d'ondes qui résonnent. Lorsqu'une vibration sonore est rendue visible – par exemple sur une plaque de sable ou dans l'eau – elle dessine spontanément des motifs géométriques précis. C'est ce que l'on appelle la cymatique.

Ainsi, la fréquence crée la forme. Une note de musique devient un mandala. Un battement rythmique devient une étoile.

La géométrie n'est donc pas seulement mathématique : elle est le visage visible du son.`,
    image: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    excerpt: "Nous vivons tous baignés dans une mer invisible : celle des vibrations de la Terre.",
    content: `Imaginez notre planète comme un immense tambour. Son atmosphère, prise entre la surface terrestre et l'ionosphère, forme une caisse de résonance. Lorsque la foudre frappe (des milliers de fois chaque seconde sur la planète), cela fait vibrer cette "cavité" et génère une onde stable : 7,83 Hz.

C'est le son de fond permanent de notre Terre, une mélodie silencieuse qui nous enveloppe à chaque instant, que nous en soyons conscients ou non.`,
    image: "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    excerpt: "L'eau est partout autour de nous et elle est aussi en nous. Mais l'eau n'est pas seulement une substance vitale.",
    content: `L'eau est partout autour de nous : dans les océans, les rivières, les nuages… et elle est aussi en nous, car notre corps en est composé à plus de 70 %. Mais l'eau n'est pas seulement une substance vitale. Elle est aussi une gardienne de mémoire, un miroir de nos émotions et un lien vivant entre la matière et l'esprit.

Le chercheur japonais Masaru Emoto a bouleversé notre perception de l'eau dans les années 1990. En exposant de l'eau à différents mots, musiques ou intentions, puis en la cristallisant par congélation, il a observé des transformations remarquables.`,
    image: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    excerpt: "Dans les traditions ancestrales, l'art n'était jamais séparé de la guérison.",
    content: `Dans les traditions ancestrales, l'art n'était jamais séparé de la guérison. Chaque couleur, chaque forme, chaque geste créatif portait une intention thérapeutique.

Aujourd'hui, nous redécouvrons cette sagesse : l'art-thérapie, la peinture intuitive, la sculpture méditative... Autant de voies pour libérer les émotions, exprimer l'inexprimable et transformer la souffrance en beauté.

Créer, c'est se créer. Chaque œuvre est un miroir de notre monde intérieur, une cartographie de notre âme en mouvement.`,
    image: "https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    excerpt: "La Guadeloupe regorge de plantes aux vertus thérapeutiques exceptionnelles.",
    content: `La Guadeloupe regorge de plantes aux vertus thérapeutiques exceptionnelles. Nos ancêtres connaissaient les secrets de chaque feuille, de chaque racine, de chaque fleur.

Le Bois d'Inde, anti-inflammatoire puissant. La Verveine tropicale, apaisante pour l'esprit. Le Vétiver, ancrage et purification. Chaque plante porte une médecine spécifique, une vibration unique.

Redécouvrir cette pharmacie naturelle, c'est se reconnecter à la sagesse de la Terre et honorer l'héritage de nos aïeux.`,
    image: "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Éline Dracon",
    publishedAt: new Date('2024-05-20').toISOString(),
    tags: ["phytothérapie", "Guadeloupe", "plantes médicinales"],
    featured: true,
    status: "published"
  }
];

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

export function getAllBlogPosts() {
  return getStoredBlogPosts();
}

export function getBlogPostById(id) {
  const posts = getAllBlogPosts();
  return posts.find(post => post.id === parseInt(id));
}

export function getBlogPostBySlug(slug) {
  const posts = getAllBlogPosts();
  return posts.find(post => post.slug === slug);
}

export function addBlogPost(postData) {
  const posts = getAllBlogPosts();
  const newPost = {
    ...postData,
    id: Date.now(),
    publishedAt: new Date().toISOString(),
    status: "published"
  };
  const updatedPosts = [...posts, newPost];
  localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  return newPost;
}

export function updateBlogPost(id, updatedData) {
  const posts = getAllBlogPosts();
  const index = posts.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updatedData };
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    return posts[index];
  }
  return null;
}

export function deleteBlogPost(id) {
  const posts = getAllBlogPosts();
  const filtered = posts.filter(p => p.id !== parseInt(id));
  localStorage.setItem('blogPosts', JSON.stringify(filtered));
}