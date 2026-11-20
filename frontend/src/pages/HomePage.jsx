import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  Activity,
  Stethoscope,
  Ambulance,
  FileText,
  Pill,
  Scale,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Server,
  RefreshCw,
  Building2,
  Clock,
  Sparkles,
  ChevronRight,
  Flame,
  Bed,
} from 'lucide-react';
import {
  CORE_PLATFORM_FEATURES,
  BANGLADESH_HOTLINES,
  KHULNA_PRIMARY_HOSPITALS,
  MEDICAL_SAFETY_DISCLAIMER,
} from '../constants/medical';
import { checkBackendHealth } from '../services/api';

export default function HomePage() {
  const [healthData, setHealthData] = useState({
    loading: true,
    healthy: false,
    status: 'Checking backend...',
    timestamp: null,
    uptime: null,
    service: null,
    error: null,
  });

  const loadHealthStatus = async () => {
    setHealthData((prev) => ({ ...prev, loading: true }));
    const result = await checkBackendHealth();
    if (result.healthy) {
      setHealthData({
        loading: false,
        healthy: true,
        status: result.status,
        timestamp: result.timestamp,
        uptime: result.uptime,
        service: result.service,
        error: null,
      });
    } else {
      setHealthData({
        loading: false,
        healthy: false,
        status: 'Standby / Local Mock Mode',
        timestamp: new Date().toISOString(),
        uptime: null,
        service: 'MedNex Backend Service',
        error: result.error || 'Server not reachable on port 5000',
      });
    }
  };

  useEffect(() => {
    loadHealthStatus();
  }, []);

  // Icon mapper helper
  const renderFeatureIcon = (iconName) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-6 h-6" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6" />;
      case 'Ambulance':
        return <Ambulance className="w-6 h-6" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6" />;
      case 'FileText':
        return <FileText className="w-6 h-6" />;
      case 'Pill':
        return <Pill className="w-6 h-6" />;
      case 'Scale':
        return <Scale className="w-6 h-6" />;
      default:
        return <Activity className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* ========================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white overflow-hidden shadow-2xl p-6 sm:p-12 lg:p-16">
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headline & Action Buttons */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Clinical Triage Platform • Khulna Division</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Understand Your Symptoms.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-300">
                  Find the Right Care.
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                MedNex is an intelligent healthcare companion bridging critical medical accessibility gaps across Bangladesh. From AI symptom triage and BMDC-verified doctor directories to lab report biomarker translation and 24/7 ambulance dispatch.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/symptom-checker"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all duration-150 hover:-translate-y-0.5"
                >
                  <Activity className="w-4 h-4" />
                  <span>Start Symptom Triage</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/doctors"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all duration-150"
                >
                  <Stethoscope className="w-4 h-4 text-sky-400" />
                  <span>Find Doctors in Khulna</span>
                </Link>

                <a
                  href={`tel:${BANGLADESH_HOTLINES.NATIONAL_EMERGENCY}`}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-bold text-sm shadow-md transition-all duration-150"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Emergency 999</span>
                </a>
              </div>

              {/* Regional Quality Commitments */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Zero-Hallucination BMDC Registry</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>&lt; 50ms Emergency Red-Flag Trigger</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Verified Khulna Hospitals</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Backend Diagnostics & Architecture Status */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-800/90 border border-slate-700/80 p-5 shadow-xl backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-sky-400" />
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-200">
                      System Architecture Monitor
                    </span>
                  </div>
                  <button
                    onClick={loadHealthStatus}
                    className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                    title="Refresh diagnostics"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 ${healthData.loading ? 'animate-spin' : ''}`}
                    />
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
                    <span className="text-slate-400">Presentation Layer</span>
                    <span className="font-semibold text-sky-400">React 18/19 SPA + Vite</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
                    <span className="text-slate-400">Backend API (Express)</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          healthData.healthy ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
                        }`}
                      />
                      <span
                        className={`font-semibold ${
                          healthData.healthy ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {healthData.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
                    <span className="text-slate-400">Deployment Target</span>
                    <span className="text-slate-300 font-medium">Khulna Division, BD</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
                    <span className="text-slate-400">Emergency Protocol</span>
                    <span className="font-bold text-red-400">999 Immediate Intercept</span>
                  </div>
                </div>

                {/* Day 2 Roadmap Indicator */}
                <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-800/60 text-[11px] text-sky-200 space-y-1.5">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>Frontend Task 02 of 20</span>
                    <span className="bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full text-[10px]">
                      Day 02 Ready
                    </span>
                  </div>
                  <p className="text-sky-300/80 leading-normal">
                    Medical Design System: Badges, WCAG AA buttons, alerts, pain range slider (FR-09), modal dialogs & skeletons.
                  </p>
                  <div className="pt-1">
                    <Link
                      to="/design-system"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-300 hover:text-white underline"
                    >
                      <span>Explore Component Showcase</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. EMERGENCY RED-FLAG WARNING INTERCEPTOR STRIP (FR-11 / FR-24) */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base tracking-wide flex items-center gap-2">
                <span>Suspected Acute Medical Emergency?</span>
                <span className="text-[10px] uppercase font-bold bg-white text-red-700 px-2 py-0.5 rounded-full">
                  Red-Flag Warning
                </span>
              </h2>
              <p className="text-xs text-red-100 mt-0.5">
                If you or someone nearby has crushing chest pain, sudden paralysis, respiratory failure, or heavy trauma, do not delay.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`tel:${BANGLADESH_HOTLINES.NATIONAL_EMERGENCY}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-red-700 hover:bg-red-50 font-extrabold text-sm shadow-md active:scale-95 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>Dial 999 Now</span>
            </a>
            <Link
              to="/emergency"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-800/50 hover:bg-red-800 text-white font-semibold text-xs border border-red-400/40 transition-colors"
            >
              <span>Khulna ERs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. CORE PROPOSED FEATURES (7 PILLARS SHOWCASE) */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Comprehensive Healthcare Suite
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Engineered for Patient Clarity & Clinical Triage
          </h2>
          <p className="text-sm text-slate-500">
            MedNex unites 7 core medical utilities into a single, ethical, accessible digital portal designed specifically for Bangladesh and Khulna Division.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {CORE_PLATFORM_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="group rounded-2xl bg-white border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-sky-600 group-hover:text-white transition-all duration-200 shadow-xs">
                    {renderFeatureIcon(feature.icon)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {feature.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-sky-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-medium text-slate-400">
                  {feature.status}
                </span>
                <Link
                  to={feature.path}
                  className="inline-flex items-center gap-1 font-bold text-sky-600 hover:text-sky-800 transition-colors group-hover:translate-x-0.5"
                >
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. KHULNA REGIONAL HOSPITAL DIRECTORY PREVIEW */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200 mb-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>Khulna Regional Medical Facilities</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Verified 24/7 Emergency Healthcare Network
            </h2>
          </div>
          <Link
            to="/emergency"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800"
          >
            <span>View All Regional Hospitals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KHULNA_PRIMARY_HOSPITALS.map((hosp) => (
            <div
              key={hosp.id}
              className="rounded-xl bg-white border border-slate-200 p-4 shadow-2xs hover:shadow-sm transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                  <Building2 className="w-4 h-4" />
                </div>
                {hosp.hasIcu && (
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                    24/7 ICU
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
                  {hosp.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{hosp.area}</p>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3 h-3 text-slate-400" />
                    {hosp.totalBeds} Beds
                  </span>
                  <span>•</span>
                  <span>{hosp.type.split(' ')[0]}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`tel:${hosp.emergencyPhone}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>{hosp.emergencyPhone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. 20-DAY ROADMAP OVERVIEW BANNER */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400">
                CSE 4104 Frontend Development
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                20-Day Frontend Architecture Roadmap
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Author:</span>
              <span className="font-bold text-sky-300">Sristy Shaha (11230321397)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs pt-2">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">
                Day 01 (Completed)
              </span>
              <h4 className="font-bold text-slate-100 mt-1">Foundation & Layout Shell</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Vite + React, Tailwind CSS, 999 hotline, mobile drawer & safety notices.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-emerald-500/50">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">
                Day 02 (Completed)
              </span>
              <h4 className="font-bold text-slate-100 mt-1">Design System & UI Library</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Standardized badges, WCAG AA buttons, alerts, pain slider, modal dialogs & skeletons.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Days 03 – 04
              </span>
              <h4 className="font-bold text-slate-200 mt-1">Global State & Auth UI</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                AuthContext, user login, registration with disclaimer & profile.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Days 05 – 10
              </span>
              <h4 className="font-bold text-slate-200 mt-1">Directory, ER & Serials</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Ambulance hubs, Khulna Leaflet maps, BMDC doctors & chamber booking.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Days 11 – 20
              </span>
              <h4 className="font-bold text-slate-200 mt-1">AI Triage, CPR & Reports</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                SVG body map, red-flag alerts, audio CPR metronome, OCR parser & BMI.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
