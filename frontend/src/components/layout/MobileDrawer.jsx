import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X,
  HeartPulse,
  Activity,
  Stethoscope,
  Ambulance,
  FileText,
  Pill,
  Scale,
  PhoneCall,
  ShieldCheck,
  Building2,
  ChevronRight,
  Sparkles,
  User,
  LogOut,
  Database,
} from 'lucide-react';
import { BANGLADESH_HOTLINES } from '../../constants/medical';
import { useAuth } from '../../context/AuthContext';

export default function MobileDrawer({ isOpen, onClose }) {
  const location = useLocation();
  const { user, isAuthenticated, demoLogin, logout } = useAuth();

  if (!isOpen) return null;

  const menuSections = [
    {
      title: 'Clinical Triage & Assessment',
      items: [
        {
          label: 'AI Symptom Checker',
          path: '/symptom-checker',
          desc: 'Conversational intake & body map triage',
          icon: Activity,
          badge: 'AI Triage',
        },
        {
          label: 'Diagnostic Lab Reports',
          path: '/report-analyzer',
          desc: 'Biomarker parsing & doctor questions',
          icon: FileText,
          badge: 'Biomarkers',
        },
      ],
    },
    {
      title: 'Healthcare Directory & Serials',
      items: [
        {
          label: 'Khulna Doctor Directory',
          path: '/doctors',
          desc: 'BMDC verified specialists & serials',
          icon: Stethoscope,
          badge: 'BMDC',
        },
        {
          label: 'Emergency Hospitals & ER',
          path: '/emergency',
          desc: 'KMCH, Sheikh Abu Naser, 24/7 ICU',
          icon: Building2,
          badge: '24/7 ER',
        },
        {
          label: 'Ambulance Fleets',
          path: '/emergency',
          desc: 'ICU, BLS & Oxygen transport',
          icon: Ambulance,
          badge: 'Dispatch',
        },
      ],
    },
    {
      title: 'First Aid & Preventive Care',
      items: [
        {
          label: 'First Aid & CPR Metronome',
          path: '/first-aid',
          desc: 'Audio 100-120 BPM CPR pacing',
          icon: HeartPulse,
          badge: 'Life Support',
        },
        {
          label: 'Medicine & Drug Checker',
          path: '/medicines',
          desc: 'Bangladeshi drugs & interactions',
          icon: Pill,
          badge: 'Safety',
        },
        {
          label: 'BMI & Vitals Monitoring',
          path: '/fitness',
          desc: 'WHO weight classification & trends',
          icon: Scale,
          badge: 'WHO Vitals',
        },
      ],
    },
    {
      title: 'Architecture & State Stores',
      items: [
        {
          label: 'State & API Architecture',
          path: '/state-architecture',
          desc: 'AuthContext, HealthContext & Timeline',
          icon: Database,
          badge: 'Day 03',
        },
        {
          label: 'UI Library & Primitives',
          path: '/design-system',
          desc: 'Standardized badges, modals, alerts & pain slider',
          icon: Sparkles,
          badge: 'Day 02',
        },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden xl:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-sky-50 to-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-sm">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-extrabold text-lg text-slate-900 leading-tight">
                  Med<span className="text-sky-600">Nex</span>
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">Khulna Division Portal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card / Demo Login in Drawer */}
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center">
                    {user.name?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900">{user.name}</h3>
                    <p className="text-[11px] text-slate-500">{user.email}</p>
                    <span className="inline-block mt-0.5 text-[10px] font-bold bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded">
                      Blood: {user.blood_group || 'B+'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Session Status
                  </span>
                  <p className="text-xs font-semibold text-slate-800">Guest Access</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    demoLogin();
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Demo Login</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick 999 Hotline Banner */}
          <div className="p-3 bg-red-50 border-b border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                  Emergency Service
                </span>
                <p className="text-xs font-semibold text-red-900 mt-0.5">
                  National Helpline & Ambulance
                </p>
              </div>
              <a
                href={`tel:${BANGLADESH_HOTLINES.NATIONAL_EMERGENCY}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold shadow-xs hover:bg-red-700 active:scale-95 transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call 999</span>
              </a>
            </div>
          </div>

          {/* Navigation Links by Sections */}
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            {menuSections.map((sec, idx) => (
              <div key={idx} className="space-y-1.5">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
                  {sec.title}
                </h3>
                <div className="space-y-1">
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path + item.label}
                        to={item.path}
                        onClick={onClose}
                        className={`group flex items-center justify-between p-2 rounded-xl transition-all ${
                          isActive
                            ? 'bg-sky-50 text-sky-800 font-bold border border-sky-200'
                            : 'hover:bg-slate-50 text-slate-700 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`p-1.5 rounded-lg ${
                              isActive
                                ? 'bg-sky-600 text-white'
                                : 'bg-slate-100 text-slate-600 group-hover:bg-sky-100 group-hover:text-sky-700'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold">{item.label}</div>
                            <div className="text-[10px] text-slate-500 line-clamp-1">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-700">
                          {item.badge}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Drawer Footer Notice */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/70 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>BMDC Verified Directory</span>
            </div>
            <p className="line-clamp-2">
              Chambers at KMCH, Sheikh Abu Naser, Gazi Medical, and regional Khulna facilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
