/**
 * MedNex API Client Service
 * Encapsulates backend REST API interactions with graceful offline degradation (NFR-16).
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Generic request helper with timeout and standardized error handling
 */
export async function apiRequest(endpoint, options = {}) {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
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
      const errorMsg = data?.message || data?.error || `HTTP Error ${response.status}`;
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
 * Checks backend health diagnostics (/api/health)
 * Supports graceful fallback if the backend service is not running.
 */
export async function checkBackendHealth() {
  const result = await apiRequest('/health');
  if (result.success && result.data) {
    return {
      healthy: true,
      status: result.data.status || 'OK',
      timestamp: result.data.timestamp || new Date().toISOString(),
      service: result.data.service || 'MedNex Backend',
      disclaimer: result.data.disclaimer,
      uptime: result.data.uptime,
    };
  }
  return {
    healthy: false,
    status: 'Standby / Offline',
    error: result.error || 'Backend unreachable',
  };
}

/**
 * Fetches the root API manifest info
 */
export async function getRootApiInfo() {
  // Direct call to root / or /api
  try {
    const res = await fetch('/');
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // Graceful fallback
  }
  return null;
}
