// Gestion des espaces personnels de voyage intérieur
const initialJourneySpaces = [];

export function getStoredJourneySpaces() {
  try {
    const data = localStorage.getItem('journeySpaces');
    if (!data) {
      localStorage.setItem('journeySpaces', JSON.stringify(initialJourneySpaces));
      return initialJourneySpaces;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading journey spaces from localStorage:", error);
    return initialJourneySpaces;
  }
}

export function getAllJourneySpaces() {
  return getStoredJourneySpaces();
}

export function getJourneySpaceById(id) {
  const spaces = getAllJourneySpaces();
  return spaces.find(space => space.id === id);
}

export function createJourneySpace(journeyData) {
  const spaces = getAllJourneySpaces();
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substr(2, 9);
  const spaceId = `journey-${timestamp}-${randomId}`;
  
  const newSpace = {
    id: spaceId,
    ...journeyData,
    userName: journeyData.userName || 'Voyageur Anonyme',
    createdAt: new Date().toISOString(),
    lastVisited: new Date().toISOString(),
    visits: 1
  };
  
  const updatedSpaces = [...spaces, newSpace];
  localStorage.setItem('journeySpaces', JSON.stringify(updatedSpaces));
  
  // Sauvegarder l'ID dans les cookies
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30); // 30 jours
  document.cookie = `journeySpaceId=${spaceId}; path=/; expires=${expirationDate.toUTCString()}; SameSite=Lax`;
  
  return newSpace;
}

export function updateJourneySpace(id, updatedData) {
  const spaces = getAllJourneySpaces();
  const index = spaces.findIndex(s => s.id === id);
  if (index !== -1) {
    spaces[index] = { 
      ...spaces[index], 
      ...updatedData, 
      lastVisited: new Date().toISOString(),
      visits: (spaces[index].visits || 0) + 1
    };
    localStorage.setItem('journeySpaces', JSON.stringify(spaces));
    return spaces[index];
  }
  return null;
}

export function getCurrentJourneySpaceFromCookie() {
  const cookies = document.cookie.split(';');
  const journeySpaceCookie = cookies.find(cookie => 
    cookie.trim().startsWith('journeySpaceId=')
  );
  
  if (journeySpaceCookie) {
    const spaceId = journeySpaceCookie.split('=')[1];
    return getJourneySpaceById(spaceId);
  }
  
  return null;
}

export function clearJourneySpaceCookie() {
  document.cookie = 'journeySpaceId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

export function deleteJourneySpace(id) {
  const spaces = getAllJourneySpaces();
  const filtered = spaces.filter(s => s.id !== id);
  localStorage.setItem('journeySpaces', JSON.stringify(filtered));
}