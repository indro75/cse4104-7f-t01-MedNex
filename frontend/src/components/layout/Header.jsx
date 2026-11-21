import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  PhoneCall,
  Menu,
  HeartPulse,
  User,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { BANGLADESH_HOTLINES } from '../../constants/medical';
import { useAuth } from '../../context/AuthContext';
import { useHealth } from '../../context/HealthContext';

export default function Header({ onOpenMobileMenu }) {
  const location = useLocation();
  const { user, isAuthenticated, demoLogin, logout } = useAuth();
  const { systemHealth } = useHealth();

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
    { label: 'State & API', path: '/state-architecture' },
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
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-2.5 py-1.8 rounded-lg text-xs font-semibold transition-all duration-150 ${
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

          {/* 3. Right Action Area: Auth State, 999 Hotline & System Health */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Live Backend Health Dot */}
            <div
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                systemHealth.healthy
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title={
                systemHealth.healthy
                  ? 'MedNex backend is reachable on port 5000'
                  : 'Backend service in standby mode'
              }
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  systemHealth.healthy ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                }`}
              />
              <span className="text-[11px] font-semibold">
                {systemHealth.healthy ? 'API Live' : 'API Standby'}
              </span>
            </div>

            {/* Authenticated User Pill vs 1-Click Demo Login */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-1.5 pl-1">
                <Link
                  to="/state-architecture"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition-colors"
                  title="View authenticated profile & health state"
                >
                  <div className="w-6 h-6 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                    {user.name?.charAt(0) || 'P'}
                  </div>
                  <div className="flex flex-col text-left leading-tight hidden sm:flex">
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">
                      {user.name?.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-sky-700 font-semibold">
                      {user.blood_group || 'B+'}
                    </span>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Log out session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={demoLogin}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 font-bold text-xs transition-colors"
                title="Log in as Demo Patient (Tanvir Hasan)"
              >
                <User className="w-3.5 h-3.5 text-sky-600" />
                <span>Demo Patient</span>
              </button>
            )}

            {/* Direct 999 Emergency Hotline Action (FR-24) */}
            <a
              href={`tel:${BANGLADESH_HOTLINES.NATIONAL_EMERGENCY}`}
              className="relative group inline-flex items-center gap-2 px-3 py-1.8 sm:px-3.5 sm:py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/25 active:scale-95 transition-all duration-150"
              title="Immediate call to Bangladesh National Emergency 999"
            >
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[9px] uppercase font-bold tracking-wider text-red-200 hidden sm:inline">
                  Emergency
                </span>
                <span className="font-extrabold tracking-wide">999 SOS</span>
              </div>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="xl:hidden p-2 rounded-xl text-slate-700 hover:text-sky-600 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-sky-500 transition-colors"
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
