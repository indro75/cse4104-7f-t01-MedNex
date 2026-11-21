import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { storage, STORAGE_KEYS } from '../services/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize authentication state on application boot
  useEffect(() => {
    async function initAuth() {
      try {
        const storedToken = storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const cachedUser = storage.getItem(STORAGE_KEYS.AUTH_USER);

        if (storedToken) {
          setToken(storedToken);
          if (cachedUser) {
            setUser(cachedUser);
          }

          // Verify token validity with backend
          const res = await authService.getProfile();
          if (res.success && res.data?.user) {
            setUser(res.data.user);
          } else if (res.status === 401) {
            // Token expired or invalid
            authService.logout();
            setUser(null);
            setToken(null);
          }
        }
      } catch (err) {
        console.warn('Auth initialization fallback:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();
  }, []);

  /**
   * Log in user
   */
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.login({ email, password });
      if (res.success && res.data?.user) {
        setUser(res.data.user);
        setToken(res.data.token);
        return { success: true, user: res.data.user };
      } else {
        setError(res.error || 'Login failed');
        return { success: false, error: res.error };
      }
    } catch (err) {
      const msg = err.message || 'An unexpected error occurred during login';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register new user with mandatory medical disclaimer consent (FR-01, FR-02)
   */
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.register(userData);
      if (res.success && res.data?.user) {
        setUser(res.data.user);
        setToken(res.data.token);
        return { success: true, user: res.data.user };
      } else {
        setError(res.error || 'Registration failed');
        return { success: false, error: res.error };
      }
    } catch (err) {
      const msg = err.message || 'Registration error occurred';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 1-Click Demo Patient Login
   */
  const demoLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.demoLogin();
      if (res.success && res.data?.user) {
        setUser(res.data.user);
        setToken(res.data.token);
        return { success: true, user: res.data.user, isDemo: true };
      } else {
        // Offline demo fallback (NFR-16)
        const mockDemoUser = {
          id: 'demo-user-khulna',
          name: 'Tanvir Hasan',
          email: 'demo.patient@mednex.org',
          phone: '01711000000',
          age: 34,
          gender: 'Male',
          blood_group: 'B+',
          city: 'Khulna',
          emergency_contact: '01811000000',
          allergies: ['Penicillin', 'Dust'],
          chronic_conditions: ['Mild Asthma'],
        };
        setUser(mockDemoUser);
        setToken('offline-demo-jwt-token');
        storage.setItem(STORAGE_KEYS.AUTH_USER, mockDemoUser);
        storage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'offline-demo-jwt-token');
        return { success: true, user: mockDemoUser, isDemo: true, isOffline: true };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update clinical profile metadata (FR-06)
   */
  const updateProfile = async (profileData) => {
    setIsLoading(true);
    try {
      const res = await authService.updateProfile(profileData);
      if (res.success && res.data?.user) {
        setUser(res.data.user);
        return { success: true, user: res.data.user };
      }
      return { success: false, error: res.error };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Log out active session
   */
  const logout = async () => {
    setIsLoading(true);
    await authService.logout();
    setUser(null);
    setToken(null);
    setError(null);
    setIsLoading(false);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    error,
    login,
    register,
    demoLogin,
    updateProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
