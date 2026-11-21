import React, { useState } from 'react';
import {
  Server,
  User,
  ShieldCheck,
  Activity,
  Download,
  Trash2,
  PlusCircle,
  Database,
  Lock,
  LogOut,
  Sparkles,
  RefreshCw,
  Clock,
  HeartPulse,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useHealth } from '../context/HealthContext';
import { Badge, Button, Card, Input, Select, Alert } from '../components/common';

export default function StateArchitecturePage() {
  const { user, token, isAuthenticated, isLoading, login, logout, demoLogin } = useAuth();
  const { systemHealth, healthTimeline, refreshHealth, logHealthActivity, clearTimeline, exportTimelineJson } =
    useHealth();

  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newType, setNewType] = useState('symptom_triage');
  const [newSeverity, setNewSeverity] = useState('info');
  const [logSuccess, setLogSuccess] = useState(false);

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    logHealthActivity({
      type: newType,
      title: newTitle,
      summary: newSummary || 'User-logged clinical activity entry.',
      tag: newType.replace('_', ' ').toUpperCase(),
      severity: newSeverity,
    });

    setNewTitle('');
    setNewSummary('');
    setLogSuccess(true);
    setTimeout(() => setLogSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CSE 4104 Frontend Day 03 Deliverable</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Global State & API Service Architecture
        </h1>
        <p className="text-sm text-slate-500 max-w-3xl leading-relaxed">
          Inspect and interact with MedNex's reactive state stores: <code>AuthContext</code> (JWT bearer tokens & patient profile), <code>HealthContext</code> (system diagnostics & longitudinal activity timeline), and centralized API service interceptors (NFR-16, NFR-19).
        </p>
      </div>

      {/* Grid: Left Column (Auth Store) / Right Column (System Diagnostics) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 1. AUTHENTICATION CONTEXT & USER STATE (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card
            title="AuthContext & Security Store"
            subtitle="JWT Token Management & Persistent Clinical Profile"
            icon={<Lock className="w-5 h-5 text-sky-600" />}
            badge={
              isAuthenticated ? (
                <Badge variant="verified" dot>
                  Authenticated
                </Badge>
              ) : (
                <Badge variant="neutral">Guest / Unauthenticated</Badge>
              )
            }
          >
            <div className="space-y-5">
              {isAuthenticated && user ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50 to-teal-50 border border-sky-200/80 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-sky-600 text-white font-extrabold text-lg flex items-center justify-center shadow-sm">
                        {user.name?.charAt(0) || 'P'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-slate-900 text-base">{user.name}</h3>
                          <Badge variant="primary" size="xs">
                            Blood: {user.blood_group || 'B+'}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500">{user.email}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {user.city || 'Khulna'} • Age: {user.age || 34} • {user.gender || 'Male'}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="danger"
                      size="sm"
                      icon={<LogOut className="w-3.5 h-3.5" />}
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </div>

                  {/* Clinical Profile Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-700 block mb-1">Known Allergies:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {Array.isArray(user.allergies) && user.allergies.length > 0 ? (
                          user.allergies.map((all, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold text-[11px]"
                            >
                              {all}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400">None reported</span>
                        )}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-700 block mb-1">Chronic Conditions:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {Array.isArray(user.chronic_conditions) && user.chronic_conditions.length > 0 ? (
                          user.chronic_conditions.map((cond, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 font-semibold text-[11px]"
                            >
                              {cond}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400">None recorded</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Active Token Preview */}
                  <div className="p-3 rounded-lg bg-slate-900 text-slate-300 font-mono text-[11px] space-y-1 overflow-x-auto">
                    <span className="text-sky-400 font-bold block uppercase text-[10px]">
                      Active JWT Authorization Header:
                    </span>
                    <p className="truncate text-slate-400">
                      Bearer {token || 'No active token'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert variant="info" title="No Active Session Found">
                    Log in as our pre-configured Demo Patient to test real-time state reactivity, profile synchronization, and authenticated API queries.
                  </Alert>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      variant="primary"
                      icon={<User className="w-4 h-4" />}
                      loading={isLoading}
                      onClick={demoLogin}
                    >
                      1-Click Demo Patient Login
                    </Button>
                    <span className="text-xs text-slate-500">
                      (Tanvir Hasan • B+ • Khulna Division)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* 2. SYSTEM ARCHITECTURE & API HEALTH DIAGNOSTICS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card
            title="System Diagnostics"
            subtitle="Live Health & Latency Monitor"
            icon={<Server className="w-5 h-5 text-teal-600" />}
            action={
              <button
                type="button"
                onClick={refreshHealth}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Refresh diagnostics"
              >
                <RefreshCw className={`w-4 h-4 ${systemHealth.loading ? 'animate-spin' : ''}`} />
              </button>
            }
          >
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-medium">Gateway Service:</span>
                <Badge variant={systemHealth.healthy ? 'success' : 'warning'} dot>
                  {systemHealth.healthy ? 'Operational' : 'Standby / Local'}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-medium">Database Layer:</span>
                <span className="font-semibold text-slate-800">
                  {systemHealth.databaseDetails?.engine || 'PostgreSQL / Supabase'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-medium">Server Uptime:</span>
                <span className="font-mono text-slate-700">
                  {systemHealth.uptimeSeconds ? `${systemHealth.uptimeSeconds}s` : 'Standby'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-medium">Emergency Protocol:</span>
                <span className="font-bold text-red-600">Active (999 Direct)</span>
              </div>

              <p className="text-[11px] text-slate-400 pt-1">
                Last checked: {systemHealth.lastChecked ? new Date(systemHealth.lastChecked).toLocaleTimeString() : 'Just now'}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* 3. HEALTH TIMELINE & LONGITUDINAL ACTIVITY LOG (FR-41) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-sky-600" />
              <span>Patient Health Activity Timeline (FR-41)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Chronological log of clinical interactions, triage outcomes, chamber serials, and diagnostic reports with client-side persistence.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              icon={<Download className="w-3.5 h-3.5" />}
              onClick={() => exportTimelineJson(user?.name || 'Tanvir Hasan')}
            >
              Export JSON (FR-41)
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={<Trash2 className="w-3.5 h-3.5" />}
              onClick={clearTimeline}
            >
              Clear Log
            </Button>
          </div>
        </div>

        {logSuccess && (
          <Alert variant="success" title="Activity Recorded">
            New clinical event successfully committed to your reactive health timeline and local storage.
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Timeline List (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {healthTimeline.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
                No health activities currently recorded. Add an entry using the form on the right.
              </div>
            ) : (
              healthTimeline.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2 hover:border-sky-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={item.severity || 'info'} size="xs">
                        {item.tag || item.type}
                      </Badge>
                      <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                    </div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>
                </div>
              ))
            )}
          </div>

          {/* Activity Input Form (5 cols) */}
          <div className="lg:col-span-5">
            <Card
              title="Record New Activity"
              subtitle="Simulate Clinical Events"
              icon={<PlusCircle className="w-5 h-5 text-sky-600" />}
            >
              <form onSubmit={handleAddActivity} className="space-y-4">
                <Input
                  label="Activity Title"
                  placeholder="e.g. Serial #14 Booked with Dr. Hasan"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />

                <Select
                  label="Activity Category"
                  options={[
                    { value: 'symptom_triage', label: 'AI Symptom Triage' },
                    { value: 'doctor_booking', label: 'Chamber Serial Booking' },
                    { value: 'lab_report', label: 'Lab Report Analysis' },
                    { value: 'bmi_vitals', label: 'BMI & Vitals Update' },
                    { value: 'emergency_intercept', label: 'Red-Flag 999 Intercept' },
                  ]}
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                />

                <Select
                  label="Severity Level"
                  options={[
                    { value: 'info', label: 'Standard Information' },
                    { value: 'success', label: 'Confirmed / Normal' },
                    { value: 'warning', label: 'Warning / Elevated' },
                    { value: 'critical', label: 'Critical / Action Needed' },
                    { value: 'emergency', label: 'Emergency 999 Event' },
                  ]}
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value)}
                />

                <Input
                  label="Summary Notes"
                  placeholder="e.g. Appointment confirmed at Gazi Medical for Nov 24."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                />

                <Button type="submit" variant="primary" fullWidth icon={<PlusCircle className="w-4 h-4" />}>
                  Append to Health Timeline
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
