import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '../services/api.client';
import { authService } from '../services/auth.service';
import { User, ApiResponse, LoginResponse } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = authService.getToken();
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<ApiResponse<LoginResponse>>(
        '/auth/login',
        { email, password }
      );

      if (response.data.success) {
        const { token, refreshToken, userId, firstName, lastName, roles, ministryIds, coordinatorMinistryIds } = response.data.data;

        authService.setToken(token);
        authService.setRefreshToken(refreshToken);

        const user: User = {
          id: userId,
          email,
          firstName,
          lastName,
          roles,
          ministryIds,
          coordinatorMinistryIds
        };

        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      authService.logout();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
