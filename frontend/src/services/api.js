/**
 * MedNex Centralized API Client Service
 * Automatically attaches JWT authentication headers and provides offline degradation (NFR-16).
 */

import { storage, STORAGE_KEYS } from './storage.js';

const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || '/api';

/**
 * Generic request helper with automatic JWT injection, timeout, and standardized error handling
 */
export async function apiRequest(endpoint, options = {}) {
  // Normalize URL
  let url = endpoint;
  if (!endpoint.startsWith('http')) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    // If endpoint already starts with /api and base URL ends with /api, avoid duplication
    if (API_BASE_URL.endsWith('/api') && cleanEndpoint.startsWith('/api')) {
      url = cleanEndpoint;
    } else {
      url = `${API_BASE_URL}${cleanEndpoint}`;
    }
  }

  // Retrieve JWT auth token if available
  const token = storage.getItem(STORAGE_KEYS.AUTH_TOKEN);

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs || 8000);

  try {
    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg =
        data?.message ||
        data?.error ||
        (Array.isArray(data?.errors) ? data.errors.join(', ') : `HTTP Error ${response.status}`);
      return {
        success: false,
        status: response.status,
        error: errorMsg,
        data,
      };
    }

    return {
      success: true,
      status: response.status,
      data,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    return {
      success: false,
      status: 0,
      error: error.name === 'AbortError' ? 'Request timed out' : error.message || 'Network error',
      isOffline: true,
    };
  }
}

/**
 * Convenience HTTP method wrappers
 */
export const http = {
  get: (endpoint, options) => apiRequest(endpoint, { method: 'GET', ...options }),
  post: (endpoint, body, options) =>
    apiRequest(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),
  put: (endpoint, body, options) =>
    apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options }),
  delete: (endpoint, options) => apiRequest(endpoint, { method: 'DELETE', ...options }),
};

/**
 * Checks backend health diagnostics (/api/health)
 * Supports graceful fallback if the backend service is not running.
 */
export async function checkBackendHealth() {
  const result = await apiRequest('/health');
  if (result.success && result.data) {
    return {
      healthy: true,
      status: result.data.status || 'healthy',
      timestamp: result.data.timestamp || new Date().toISOString(),
      service: result.data.platform || 'MedNex Backend',
      services: result.data.services || {},
      databaseDetails: result.data.databaseDetails || {},
      disclaimer: result.data.disclaimer,
      uptimeSeconds: result.data.uptimeSeconds,
    };
  }
  return {
    healthy: false,
    status: 'Standby / Offline Mode',
    error: result.error || 'Backend unreachable on port 5000',
  };
}
