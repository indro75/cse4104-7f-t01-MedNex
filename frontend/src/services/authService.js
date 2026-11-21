/**
 * MedNex Authentication API Service
 * Handles user authentication, demo login, registration, and profile endpoints.
 */

import { apiRequest, http } from './api.js';
import { storage, STORAGE_KEYS } from './storage.js';

export const authService = {
  /**
   * Register a new user account (FR-01, FR-02)
   */
  async register(userData) {
    const result = await http.post('/api/auth/register', userData);
    if (result.success && result.data?.token) {
      storage.setItem(STORAGE_KEYS.AUTH_TOKEN, result.data.token);
      storage.setItem(STORAGE_KEYS.AUTH_USER, result.data.user);
    }
    return result;
  },

  /**
   * Log in an existing user (FR-03)
   */
  async login(credentials) {
    const result = await http.post('/api/auth/login', credentials);
    if (result.success && result.data?.token) {
      storage.setItem(STORAGE_KEYS.AUTH_TOKEN, result.data.token);
      storage.setItem(STORAGE_KEYS.AUTH_USER, result.data.user);
    }
    return result;
  },

  /**
   * 1-Click Demo Patient authentication for evaluation and instant access
   */
  async demoLogin() {
    const result = await http.post('/api/auth/demo-login', {});
    if (result.success && result.data?.token) {
      storage.setItem(STORAGE_KEYS.AUTH_TOKEN, result.data.token);
      storage.setItem(STORAGE_KEYS.AUTH_USER, result.data.user);
    }
    return result;
  },

  /**
   * Fetch current authenticated user profile (FR-06)
   */
  async getProfile() {
    const result = await http.get('/api/auth/profile');
    if (result.success && result.data?.user) {
      storage.setItem(STORAGE_KEYS.AUTH_USER, result.data.user);
    }
    return result;
  },

  /**
   * Update current authenticated user profile (FR-06)
   */
  async updateProfile(profileData) {
    const result = await http.put('/api/auth/profile', profileData);
    if (result.success && result.data?.user) {
      storage.setItem(STORAGE_KEYS.AUTH_USER, result.data.user);
    }
    return result;
  },

  /**
   * Log out active session (FR-04)
   */
  async logout() {
    try {
      await http.post('/api/auth/logout', {});
    } catch (e) {
      // Ignore network errors during logout
    } finally {
      storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      storage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
    return { success: true };
  },

  /**
   * Check if user is currently cached as logged in
   */
  getCachedUser() {
    return storage.getItem(STORAGE_KEYS.AUTH_USER);
  },

  /**
   * Check if active token exists in storage
   */
  getToken() {
    return storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },
};
