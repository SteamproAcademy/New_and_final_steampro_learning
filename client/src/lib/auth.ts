import { users, type User } from '../data/users';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const getAuthState = (): AuthState => {
  const userStr = localStorage.getItem('steampro_user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      return { user, isAuthenticated: true };
    } catch (error) {
      localStorage.removeItem('steampro_user');
      return { user: null, isAuthenticated: false };
    }
  }
  return { user: null, isAuthenticated: false };
};

export const login = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('steampro_user', JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = (): void => {
  localStorage.removeItem('steampro_user');
  localStorage.removeItem('steampro_progress');
};

export const getCurrentUser = (): User | null => {
  const { user } = getAuthState();
  return user;
};
