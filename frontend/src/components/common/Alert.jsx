import React from 'react';
import {
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Info,
  X,
  Flame,
} from 'lucide-react';

const ALERT_CONFIGS = {
  emergency: {
    container: 'bg-red-50 border-red-300 text-red-950',
    iconColor: 'text-red-700 bg-red-100',
    Icon: Flame,
    titleColor: 'text-red-900',
    badge: 'Emergency Escalation',
  },
  critical: {
    container: 'bg-rose-50 border-rose-300 text-rose-950',
    iconColor: 'text-rose-700 bg-rose-100',
    Icon: AlertOctagon,
    titleColor: 'text-rose-900',
    badge: 'Critical Warning',
  },
  warning: {
    container: 'bg-amber-50 border-amber-300 text-amber-950',
    iconColor: 'text-amber-700 bg-amber-100',
    Icon: AlertTriangle,
    titleColor: 'text-amber-900',
    badge: 'Clinical Advisory',
  },
  success: {
    container: 'bg-emerald-50 border-emerald-300 text-emerald-950',
    iconColor: 'text-emerald-700 bg-emerald-100',
    Icon: CheckCircle2,
    titleColor: 'text-emerald-900',
    badge: 'Verified Success',
  },
  info: {
    container: 'bg-sky-50 border-sky-300 text-sky-950',
    iconColor: 'text-sky-700 bg-sky-100',
    Icon: Info,
    titleColor: 'text-sky-900',
    badge: 'Clinical Info',
  },
};

export default function Alert({
  variant = 'info',
  title,
  children,
  action,
  dismissible = false,
  onDismiss,
  className = '',
}) {
  const config = ALERT_CONFIGS[variant] || ALERT_CONFIGS.info;
  const Icon = config.Icon;

  return (
    <div
      role="alert"
      className={`relative rounded-xl border p-4 shadow-xs transition-all duration-150 ${config.container} ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-1.5 rounded-lg shrink-0 ${config.iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 space-y-1">
          {title && (
            <div className="flex items-center gap-2">
              <h4 className={`text-sm font-bold tracking-tight ${config.titleColor}`}>
                {title}
              </h4>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/70 border border-current/20">
                {config.badge}
              </span>
            </div>
          )}
          <div className="text-xs leading-relaxed font-medium">{children}</div>
          {action && <div className="pt-2">{action}</div>}
        </div>

        {dismissible && onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-black/5 transition-colors shrink-0"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
