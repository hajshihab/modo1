import React, { createContext, useContext, useEffect, useState } from 'react';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'driver';
  phone: string;
  isActive: boolean;
  vehicleInfo?: {
    type: string;
    model: string;
    plateNumber: string;
    color: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      
      // Check localStorage for saved session
      const savedUser = localStorage.getItem('driver_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      
      // TODO: Verify session with backend
      // const response = await fetch('/api/auth/verify');
      // if (response.ok) {
      //   const userData = await response.json();
      //   setUser(userData);
      // }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: '1',
        email,
        name: 'Driver Name',
        role: 'driver',
        phone: '+1234567890',
        isActive: true,
        vehicleInfo: {
          type: 'motorcycle',
          model: 'Honda CBR',
          plateNumber: 'ABC-123',
          color: 'Red'
        }
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(mockUser);
      localStorage.setItem('driver_user', JSON.stringify(mockUser));
      
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // TODO: Call logout API
      // await fetch('/api/auth/logout', { method: 'POST' });
      
      setUser(null);
      localStorage.removeItem('driver_user');
      
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!user) return;
      
      // TODO: Call update API
      // const response = await fetch('/api/auth/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('driver_user', JSON.stringify(updatedUser));
      
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
