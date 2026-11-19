import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  ShieldCheck,
  PhoneCall,
  MapPin,
  ExternalLink,
  Users,
  AlertTriangle,
} from 'lucide-react';
import { BANGLADESH_HOTLINES, KHULNA_PRIMARY_HOSPITALS } from '../../constants/medical';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Platform Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Med<span className="text-sky-400">Nex</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An AI-powered healthcare companion and clinical triage platform bridging medical accessibility and navigation across Bangladesh, with localized focus on the Khulna metropolitan area.
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-medium">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Khulna Division Hub (KMCH, Boyra, Sonadanga)</span>
            </div>
          </div>

          {/* Column 2: Regional Khulna Centers */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              Khulna Medical Network
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {KHULNA_PRIMARY_HOSPITALS.map((hosp) => (
                <li key={hosp.id} className="hover:text-slate-200 transition-colors">
                  <div className="font-medium text-slate-300">{hosp.name}</div>
                  <div className="text-[11px] text-slate-500">
                    {hosp.area} • 24/7 ER: {hosp.emergencyPhone}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Emergency & Hotlines */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-red-400" />
              National Emergency Helplines
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={`tel:${BANGLADESH_HOTLINES.NATIONAL_EMERGENCY}`}
                className="flex items-center justify-between p-2.5 rounded-lg bg-red-950/40 border border-red-800/50 text-red-200 hover:bg-red-900/50 transition-colors"
              >
                <span>National Emergency & Police</span>
                <span className="font-mono font-bold text-sm bg-red-800/80 px-2 py-0.5 rounded text-white">
                  999
                </span>
              </a>
              <a
                href={`tel:${BANGLADESH_HOTLINES.HEALTH_CALL_CENTER}`}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700/60 transition-colors"
              >
                <span>Shasthya Batayan (Health Line)</span>
                <span className="font-mono font-bold text-sm bg-sky-900/80 px-2 py-0.5 rounded text-sky-200">
                  16263
                </span>
              </a>
            </div>
            <p className="text-[11px] text-slate-500 mt-3">
              One-tap dial connects directly to certified ambulance dispatchers and emergency intake desks.
            </p>
          </div>

          {/* Column 4: Academic & Engineering Team */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-400" />
              CSE 4104 Team CSE4104-7F-T01
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <span className="text-[10px] uppercase font-bold text-sky-400">Frontend Lead</span>
                <p className="font-semibold text-slate-200">Sristy Shaha (11230321397)</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <span className="text-[10px] uppercase font-bold text-slate-400">Backend Lead</span>
                <p className="font-semibold text-slate-300">Indrojit Sana (11230321391)</p>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                AI/ML: Towfiq Ahmed (11230321388) • DB: Jannatun Nayim Shorno (11230321382)
              </div>
            </div>
          </div>
        </div>

        {/* Persistent Medical Safety Legal Disclaimer Bar */}
        <div className="pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/70 flex flex-col md:flex-row items-start md:items-center gap-3 text-xs text-slate-400">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="leading-relaxed">
              <strong className="text-slate-200">Mandatory Clinical Disclaimer:</strong> MedNex provides intelligent triage and health literacy support, not clinical diagnosis or medical prescriptions. Always consult a registered medical practitioner (BMDC certified) for physical diagnosis and medication management. In an emergency, dial 999.
            </p>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div>
              © 2026 MedNex Platform • CSE 4104 Software Engineering Project • All Rights Reserved
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-400 transition-colors">Khulna Division Hub</span>
              <span>•</span>
              <span className="hover:text-slate-400 transition-colors">React 18/19 & Vite v6</span>
              <span>•</span>
              <span className="hover:text-slate-400 transition-colors">Express REST Backend</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
