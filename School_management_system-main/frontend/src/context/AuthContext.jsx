import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize and load user if token is present
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const userData = await api.getCurrentUser();
          setUser(userData);
        } catch (e) {
          console.error('Failed to restore session:', e);
          api.logout();
          setUser(null);
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const userData = await api.login(username, password);
      setUser(userData);
      return userData;
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  // Helper shortcut for fast role testing
  const switchRole = (role) => {
    let mockUsername = 'admin';
    if (role === 'TEACHER') mockUsername = 'teacher_ahmed';
    if (role === 'STUDENT') mockUsername = 'student_zayd';
    if (role === 'PARENT') mockUsername = 'parent_ahmed';

    localStorage.setItem('access_token', 'mock_jwt_token_' + role);
    const mockUser = {
      id: 1,
      username: mockUsername,
      role: role,
      email: mockUsername + '@brightfuture.edu.pk',
      name: role === 'TEACHER' ? 'Ustadh Ahmed Bilal' : 
            role === 'STUDENT' ? 'Zayd Ahmed Bilal' : 
            role === 'PARENT' ? 'Ahmed Bilal Senior' : 'System Administrator',
      profile: {}
    };
    setUser(mockUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, switchRole, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
