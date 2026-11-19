import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, ShieldAlert, Sparkles, PhoneCall } from 'lucide-react';
import { BANGLADESH_HOTLINES } from '../constants/medical';

export default function PlaceholderPage({ title, roadmapDay, srsRef, description }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
        <Clock className="w-4 h-4 text-sky-600" />
        <span>Roadmap Target: {roadmapDay}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h1>

      <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
        {description}
      </p>

      {srsRef && (
        <div className="inline-block bg-slate-100 text-slate-700 text-xs font-mono px-3 py-1 rounded-md border border-slate-200">
          SRS Requirement: {srsRef}
        </div>
      )}

      <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <a
          href={`tel:${BANGLADESH_HOTLINES.NATIONAL_EMERGENCY}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm transition-all"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call 999 Hotline</span>
        </a>
      </div>
    </div>
  );
}
