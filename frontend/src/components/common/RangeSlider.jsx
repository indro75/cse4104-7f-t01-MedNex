import React from 'react';
import { getPainSeverityInfo } from '../../constants/medical';

export { getPainSeverityInfo };

export default function RangeSlider({
  label = 'Pain Severity Scale (1 - 10)',
  min = 1,
  max = 10,
  step = 1,
  value = 5,
  onChange,
  disabled = false,
  helperText = 'Select your subjective pain intensity level to assist clinical triage.',
  className = '',
}) {
  const currentVal = Number(value);
  const severityInfo = getPainSeverityInfo(currentVal);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">
          {label}
        </label>
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${severityInfo.color}`}
        >
          <span>Level {currentVal} / {max}</span>
          <span>•</span>
          <span>{severityInfo.label}</span>
        </div>
      </div>

      <div className="relative pt-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentVal}
          onChange={onChange}
          disabled={disabled}
          className="w-full h-2.5 bg-gradient-to-r from-emerald-400 via-amber-400 via-orange-400 to-red-500 rounded-lg appearance-none cursor-pointer accent-sky-700 focus:outline-hidden disabled:opacity-50"
        />

        <div className="flex justify-between text-[11px] font-bold text-slate-400 px-1 mt-1.5">
          <span>1 (Minimal)</span>
          <span>5 (Moderate)</span>
          <span>10 (Worst Possible)</span>
        </div>
      </div>

      {helperText && <p className="text-[11px] text-slate-500">{helperText}</p>}
    </div>
  );
}
