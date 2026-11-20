import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function Textarea({
  label,
  helperText,
  error,
  required = false,
  id,
  rows = 4,
  placeholder,
  value,
  onChange,
  disabled = false,
  className = '',
  textareaClassName = '',
  ...props
}) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-xs font-bold text-slate-700 tracking-wide uppercase"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-2xs">
        <textarea
          id={textareaId}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`block w-full rounded-xl border text-sm transition-all duration-150 focus:outline-hidden disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed p-3.5 ${
            error
              ? 'border-red-400 text-red-900 bg-red-50/50 focus:ring-2 focus:ring-red-400 focus:border-red-500'
              : 'border-slate-300 text-slate-900 bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-400'
          } ${textareaClassName}`}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-xs text-red-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
