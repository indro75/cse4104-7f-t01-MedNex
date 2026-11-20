import React from 'react';
import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary:
    'bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white shadow-sm shadow-sky-600/20 active:scale-[0.98]',
  emergency:
    'bg-red-600 hover:bg-red-700 text-white font-extrabold shadow-md shadow-red-600/30 ring-2 ring-red-400/40 active:scale-[0.98]',
  secondary:
    'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 active:scale-[0.98]',
  outline:
    'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-2xs active:scale-[0.98]',
  teal:
    'bg-teal-600 hover:bg-teal-700 text-white shadow-sm shadow-teal-600/20 active:scale-[0.98]',
  success:
    'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm active:scale-[0.98]',
  danger:
    'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 active:scale-[0.98]',
  ghost:
    'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2.2 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2.5 font-bold',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  const variantStyles = VARIANTS[variant] || VARIANTS.primary;
  const sizeStyles = SIZES[size] || SIZES.md;
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center font-semibold transition-all duration-150 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none select-none ${variantStyles} ${sizeStyles} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
}
