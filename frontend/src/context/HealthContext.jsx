import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../services/storage';
import { checkBackendHealth } from '../services/api';

const HealthContext = createContext(null);

export function HealthProvider({ children }) {
  // 1. System Health Diagnostics State
  const [systemHealth, setSystemHealth] = useState({
    loading: true,
    healthy: false,
    status: 'Checking...',
    uptimeSeconds: null,
    services: {},
    databaseDetails: {},
    error: null,
    lastChecked: null,
  });

  // 2. Longitudinal Patient Health Timeline & Activities Log (FR-41)
  const [healthTimeline, setHealthTimeline] = useState([]);

  // Load timeline and initial health diagnostics
  useEffect(() => {
    // Load timeline from safe storage
    const cachedTimeline = storage.getItem(STORAGE_KEYS.HEALTH_TIMELINE);
    if (Array.isArray(cachedTimeline) && cachedTimeline.length > 0) {
      setHealthTimeline(cachedTimeline);
    } else {
      // Default initial clinical activity entry
      const initialEntry = {
        id: 'activity-init',
        type: 'account_created',
        title: 'MedNex Health Portal Account Initialized',
        summary: 'Primary clinical context configured for Khulna Division healthcare network.',
        tag: 'System',
        severity: 'neutral',
        timestamp: new Date().toISOString(),
      };
      setHealthTimeline([initialEntry]);
      storage.setItem(STORAGE_KEYS.HEALTH_TIMELINE, [initialEntry]);
    }

    refreshHealth();
  }, []);

  /**
   * Refreshes backend & database health status
   */
  const refreshHealth = async () => {
    setSystemHealth((prev) => ({ ...prev, loading: true }));
    const result = await checkBackendHealth();
    setSystemHealth({
      loading: false,
      healthy: result.healthy,
      status: result.status,
      uptimeSeconds: result.uptimeSeconds,
      services: result.services || {},
      databaseDetails: result.databaseDetails || {},
      error: result.error,
      lastChecked: new Date().toISOString(),
    });
  };

  /**
   * Record a new health activity entry to the user's longitudinal timeline (FR-41)
   */
  const logHealthActivity = ({ type, title, summary, tag = 'Clinical', severity = 'info' }) => {
    const newEntry = {
      id: `activity-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type, // 'symptom_triage', 'doctor_booking', 'lab_report', 'bmi_log', 'emergency_intercept'
      title,
      summary,
      tag,
      severity, // 'emergency', 'critical', 'warning', 'success', 'info', 'neutral'
      timestamp: new Date().toISOString(),
    };

    setHealthTimeline((prev) => {
      const updated = [newEntry, ...prev];
      storage.setItem(STORAGE_KEYS.HEALTH_TIMELINE, updated);
      return updated;
    });

    return newEntry;
  };

  /**
   * Clear the patient's local health timeline
   */
  const clearTimeline = () => {
    setHealthTimeline([]);
    storage.removeItem(STORAGE_KEYS.HEALTH_TIMELINE);
  };

  /**
   * Export patient health timeline in standardized JSON format (FR-41)
   */
  const exportTimelineJson = (patientName = 'Patient') => {
    const exportData = {
      platform: 'MedNex Healthcare Platform',
      exportTimestamp: new Date().toISOString(),
      patientName,
      regionalContext: 'Khulna Division, Bangladesh',
      totalRecords: healthTimeline.length,
      activities: healthTimeline,
      disclaimer:
        'MedNex provides clinical triage support and health literacy records, not formal hospital EHR medical diagnoses.',
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mednex_health_timeline_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    return exportData;
  };

  const value = {
    systemHealth,
    healthTimeline,
    refreshHealth,
    logHealthActivity,
    clearTimeline,
    exportTimelineJson,
  };

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>;
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
}

export default HealthContext;
