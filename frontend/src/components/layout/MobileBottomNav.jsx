import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, PhoneCall, Stethoscope, Menu } from 'lucide-react';
import { BANGLADESH_HOTLINES } from '../../constants/medical';

export default function MobileBottomNav({ onOpenMobileMenu }) {
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isTriage = location.pathname === '/symptom-checker';
  const isDoctors = location.pathname === '/doctors';

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-2 py-1.5"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            isHome ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>

        {/* Triage */}
        <Link
          to="/symptom-checker"
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            isTriage ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Triage</span>
        </Link>

        {/* Floating Emergency 999 Center Action Button (NFR-06, FR-24) */}
        <a
          href={`tel:${BANGLADESH_HOTLINES.NATIONAL_EMERGENCY}`}
          className="-mt-5 flex flex-col items-center group focus:outline-hidden"
          title="Direct Call to 999"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-red-500/40 ring-4 ring-white group-active:scale-95 transition-transform">
            <PhoneCall className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-[10px] font-extrabold text-red-600 mt-0.5 tracking-tight">
            999 SOS
          </span>
        </a>

        {/* Doctors */}
        <Link
          to="/doctors"
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            isDoctors ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Stethoscope className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Doctors</span>
        </Link>

        {/* More / Drawer */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="flex flex-col items-center py-1 px-2.5 rounded-lg text-slate-500 hover:text-slate-900 transition-colors focus:outline-hidden"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Services</span>
        </button>
      </div>
    </nav>
  );
}
