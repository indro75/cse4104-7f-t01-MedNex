import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Activity,
  PhoneCall,
  Menu,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  Ambulance,
  Server,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { BANGLADESH_HOTLINES } from '../../constants/medical';
import { checkBackendHealth } from '../../services/api';

export default function Header({ onOpenMobileMenu }) {
  const location = useLocation();
  const [backendStatus, setBackendStatus] = useState({
    checked: false,
    healthy: false,
    text: 'Checking...',
  });

  useEffect(() => {
    let isMounted = true;
    async function verifyHealth() {
      const res = await checkBackendHealth();
      if (isMounted) {
        setBackendStatus({
          checked: true,
          healthy: res.healthy,
          text: res.healthy ? 'API Live (Port 5000)' : 'API Standby',
        });
      }
    }
    verifyHealth();
    return () => {
      isMounted = false;
    };
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Symptom Triage', path: '/symptom-checker' },
    { label: 'Khulna Doctors', path: '/doctors' },
    { label: 'Emergency & ER', path: '/emergency' },
    { label: 'First Aid & CPR', path: '/first-aid' },
    { label: 'Lab Reports', path: '/report-analyzer' },
    { label: 'Medicines', path: '/medicines' },
    { label: 'BMI & Vitals', path: '/fitness' },
    { label: 'UI Library', path: '/design-system' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* 1. MedNex Branding (Top-Left, NFR-06) */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
                <HeartPulse className="w-6 h-6 text-white stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-sky-700 transition-colors">
                    Med<span className="text-sky-600">Nex</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded border border-sky-200">
                    Khulna
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium hidden sm:inline -mt-0.5">
                  Clinical Triage & Healthcare Platform
                </span>
              </div>
            </Link>
          </div>

          {/* 2. Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* 3. Right Action Area: 999 Hotline & System Health */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Backend Connectivity Status Badge */}
            <div
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                backendStatus.healthy
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title={
                backendStatus.healthy
                  ? 'MedNex backend is reachable on port 5000'
                  : 'Backend service in standby mode'
              }
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  backendStatus.healthy
                    ? 'bg-emerald-500 animate-pulse'
                    : 'bg-slate-400'
                }`}
              />
              <span className="text-[11px] font-semibold">{backendStatus.text}</span>
            </div>

            {/* Direct 999 Emergency Hotline Action (FR-24) */}
            <a
              href={`tel:${BANGLADESH_HOTLINES.NATIONAL_EMERGENCY}`}
              className="relative group inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/25 active:scale-95 transition-all duration-150"
              title="Immediate telephonic call to Bangladesh National Emergency 999"
            >
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] uppercase font-bold tracking-wider text-red-200 hidden sm:inline">
                  Emergency
                </span>
                <span className="font-extrabold tracking-wide">Call 999</span>
              </div>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-sky-600 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-sky-500 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
