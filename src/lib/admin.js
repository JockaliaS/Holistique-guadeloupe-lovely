// Gestion de l'administration
const adminUser = {
  id: 'admin-001',
  username: 'admin',
  email: 'admin@terranova.gp',
  role: 'admin',
  name: 'Administrateur Terra Nova',
  createdAt: new Date('2024-01-01').toISOString()
};

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
  localStorage.removeItem('loggedInUserType');
}