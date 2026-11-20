import React from 'react';

const VARIANTS = {
  primary: 'bg-sky-100 text-sky-800 border-sky-300',
  emergency: 'bg-red-100 text-red-800 border-red-300',
  critical: 'bg-rose-100 text-rose-800 border-rose-300',
  warning: 'bg-amber-100 text-amber-900 border-amber-300',
  success: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  teal: 'bg-teal-100 text-teal-800 border-teal-300',
  verified: 'bg-emerald-50 text-emerald-800 border-emerald-300',
  neutral: 'bg-slate-100 text-slate-700 border-slate-200',
};

const DOT_COLORS = {
  primary: 'bg-sky-500',
  emergency: 'bg-red-600',
  critical: 'bg-rose-600',
  warning: 'bg-amber-500',
  success: 'bg-emerald-500',
  teal: 'bg-teal-500',
  verified: 'bg-emerald-600',
  neutral: 'bg-slate-400',
};

const SIZES = {
  xs: 'px-1.5 py-0.5 text-[10px]',
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1 text-sm font-semibold',
};

export default function Badge({
  children,
  variant = 'primary',
  size = 'sm',
  dot = false,
  pulse = false,
  icon = null,
  className = '',
}) {
  const variantClasses = VARIANTS[variant] || VARIANTS.primary;
  const dotColor = DOT_COLORS[variant] || DOT_COLORS.primary;
  const sizeClasses = SIZES[size] || SIZES.sm;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-md border ${variantClasses} ${sizeClasses} ${className}`}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`}
            />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`} />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
