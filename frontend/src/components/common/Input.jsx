import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function Input({
  label,
  helperText,
  error,
  required = false,
  icon = null,
  rightIcon = null,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  className = '',
  inputClassName = '',
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-bold text-slate-700 tracking-wide uppercase"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-2xs">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`block w-full rounded-xl border text-sm transition-all duration-150 focus:outline-hidden disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ${
            icon ? 'pl-10' : 'pl-3.5'
          } ${rightIcon || error ? 'pr-10' : 'pr-3.5'} py-2.5 ${
            error
              ? 'border-red-400 text-red-900 bg-red-50/50 focus:ring-2 focus:ring-red-400 focus:border-red-500'
              : 'border-slate-300 text-slate-900 bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-400'
          } ${inputClassName}`}
          {...props}
        />

        {error ? (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-red-500">
            <AlertCircle className="w-4 h-4" />
          </div>
        ) : rightIcon ? (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
            {rightIcon}
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="text-xs text-red-600 font-medium flex items-center gap-1">
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
