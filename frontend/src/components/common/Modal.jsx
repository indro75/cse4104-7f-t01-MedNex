import React, { useEffect } from 'react';
import { X, AlertOctagon, HeartPulse } from 'lucide-react';

const SIZES = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-5xl',
};

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  footer,
  size = 'md',
  isEmergency = false,
  closeOnBackdropClick = true,
  className = '',
}) {
  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClass = SIZES[size] || SIZES.md;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 transition-opacity duration-200 ${
          isEmergency ? 'bg-red-950/80 backdrop-blur-md' : 'bg-slate-900/60 backdrop-blur-xs'
        }`}
        onClick={closeOnBackdropClick ? onClose : undefined}
      />

      {/* Modal Dialog Content */}
      <div
        className={`relative w-full ${sizeClass} bg-white rounded-2xl shadow-2xl overflow-hidden border ${
          isEmergency ? 'border-red-500 ring-4 ring-red-500/30' : 'border-slate-200'
        } transition-all duration-200 z-10 my-8 ${className}`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isEmergency
              ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white border-red-500'
              : 'bg-slate-50/80 text-slate-900 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            {icon ? (
              <div
                className={`p-2 rounded-xl ${
                  isEmergency ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-700'
                }`}
              >
                {icon}
              </div>
            ) : isEmergency ? (
              <div className="p-2 rounded-xl bg-white/20 text-white">
                <AlertOctagon className="w-5 h-5 animate-pulse" />
              </div>
            ) : null}

            <div>
              <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                {title}
              </h3>
              {subtitle && (
                <p
                  className={`text-xs mt-0.5 ${
                    isEmergency ? 'text-red-100' : 'text-slate-500'
                  }`}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isEmergency
                ? 'text-white/80 hover:text-white hover:bg-white/20'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200/60'
            }`}
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[calc(85vh-130px)] overflow-y-auto space-y-4 text-slate-700">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
