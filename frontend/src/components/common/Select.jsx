import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export default function Select({
  label,
  helperText,
  error,
  required = false,
  id,
  options = [],
  value,
  onChange,
  disabled = false,
  placeholder = 'Select an option',
  className = '',
  selectClassName = '',
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-bold text-slate-700 tracking-wide uppercase"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-2xs">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`block w-full appearance-none rounded-xl border text-sm transition-all duration-150 focus:outline-hidden disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed pl-3.5 pr-10 py-2.5 ${
            error
              ? 'border-red-400 text-red-900 bg-red-50/50 focus:ring-2 focus:ring-red-400 focus:border-red-500'
              : 'border-slate-300 text-slate-900 bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-400'
          } ${selectClassName}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const labelText = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {labelText}
              </option>
            );
          })}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p className="text-xs text-red-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
