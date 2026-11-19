import React, { useState } from 'react';
import { AlertTriangle, ChevronRight, X } from 'lucide-react';
import { MEDICAL_SAFETY_DISCLAIMER } from '../../constants/medical';

export default function SafetyDisclaimerBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return (
      <div className="bg-amber-500/10 border-b border-amber-200/60 py-1.5 px-4 text-xs text-amber-900 flex items-center justify-between">
        <div className="flex items-center space-x-2 truncate">
          <span className="font-semibold uppercase tracking-wider text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-amber-300">
            Medical Disclaimer
          </span>
          <span className="truncate">MedNex provides clinical triage support, not professional diagnosis.</span>
        </div>
        <button
          onClick={() => setIsDismissed(false)}
          className="text-amber-700 hover:text-amber-900 underline font-medium text-xs ml-2 shrink-0"
        >
          View Full Notice
        </button>
      </div>
    );
  }

  return (
    <div
      role="alert"
      className="bg-gradient-to-r from-amber-50 via-amber-100/70 to-orange-50 border-b border-amber-200 text-amber-950 px-4 py-2.5 text-xs sm:text-sm shadow-xs transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2.5">
          <div className="p-1 bg-amber-200/70 text-amber-800 rounded-md shrink-0 mt-0.5 sm:mt-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold uppercase tracking-wider text-[11px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded mr-2 border border-amber-300">
              Clinical Safety Notice
            </span>
            <span className="text-amber-900 font-medium">
              {MEDICAL_SAFETY_DISCLAIMER}
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-amber-700 hover:text-amber-950 p-1 rounded-md hover:bg-amber-200/50 transition-colors shrink-0"
          aria-label="Collapse disclaimer banner"
          title="Collapse notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
