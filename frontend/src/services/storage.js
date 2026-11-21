/**
 * MedNex Client Storage Service
 * Provides safe, robust localStorage access with in-memory fallback (NFR-16).
 */

const STORAGE_KEYS = {
  AUTH_TOKEN: 'mednex_auth_token',
  AUTH_USER: 'mednex_auth_user',
  HEALTH_TIMELINE: 'mednex_health_timeline',
  OFFLINE_CACHE: 'mednex_offline_cache',
};

class SafeStorage {
  constructor() {
    this.memoryStore = new Map();
  }

  isAvailable() {
    try {
      const testKey = '__mednex_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  getItem(key) {
    if (this.isAvailable()) {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        return window.localStorage.getItem(key);
      }
    }
    return this.memoryStore.get(key) || null;
  }

  setItem(key, value) {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    if (this.isAvailable()) {
      try {
        window.localStorage.setItem(key, serialized);
      } catch (e) {
        console.warn('LocalStorage write failed, falling back to memory store:', e);
      }
    }
    this.memoryStore.set(key, value);
  }

  removeItem(key) {
    if (this.isAvailable()) {
      try {
        window.localStorage.removeItem(key);
      } catch (e) {}
    }
    this.memoryStore.delete(key);
  }

  clear() {
    if (this.isAvailable()) {
      try {
        window.localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        window.localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
        window.localStorage.removeItem(STORAGE_KEYS.HEALTH_TIMELINE);
      } catch (e) {}
    }
    this.memoryStore.clear();
  }
}

export const storage = new SafeStorage();
export { STORAGE_KEYS };
