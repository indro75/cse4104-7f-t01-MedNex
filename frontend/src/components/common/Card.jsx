import React from 'react';

const ACCENT_BORDERS = {
  emergency: 'border-l-4 border-l-red-600',
  critical: 'border-l-4 border-l-rose-500',
  warning: 'border-l-4 border-l-amber-500',
  success: 'border-l-4 border-l-emerald-500',
  primary: 'border-l-4 border-l-sky-600',
  teal: 'border-l-4 border-l-teal-600',
  none: '',
};

export default function Card({
  title,
  subtitle,
  badge,
  icon,
  action,
  children,
  footer,
  statusAccent = 'none',
  hover = false,
  className = '',
  onClick,
}) {
  const accentClass = ACCENT_BORDERS[statusAccent] || '';

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden transition-all duration-200 ${accentClass} ${
        hover ? 'hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 cursor-pointer' : ''
      } ${className}`}
    >
      {(title || icon || action || badge) && (
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {icon && (
              <div className="p-2 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                {icon}
              </div>
            )}
            <div className="truncate">
              {title && (
                <h3 className="font-bold text-slate-900 text-base leading-tight truncate">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-slate-500 mt-0.5 truncate">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {badge && <span>{badge}</span>}
            {action && <div>{action}</div>}
          </div>
        </div>
      )}

      <div className="p-5">{children}</div>

      {footer && (
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
          {footer}
        </div>
      )}
    </div>
  );
}
