/**
 * MedNex System Health & Diagnostics API Service
 * Queries system health, database connection, and API status.
 */

import { http } from './api.js';

export const healthService = {
  /**
   * Query API gateway & server health
   */
  async getSystemHealth() {
    return await http.get('/api/health');
  },

  /**
   * Query database connection status
   */
  async getDbHealth() {
    return await http.get('/api/health/db');
  },

  /**
   * Query root platform metadata
   */
  async getRootInfo() {
    return await http.get('/');
  },
};
