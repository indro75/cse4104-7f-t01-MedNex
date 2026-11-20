import React from 'react';
import { Loader2 } from 'lucide-react';

export function Spinner({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <Loader2
      className={`animate-spin text-sky-600 ${sizeMap[size] || sizeMap.md} ${className}`}
    />
  );
}

export function SkeletonLine({ width = 'w-full', height = 'h-4', className = '' }) {
  return (
    <div
      className={`animate-pulse bg-slate-200/80 rounded-md ${width} ${height} ${className}`}
    />
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div
      className={`rounded-2xl bg-white border border-slate-200 p-5 space-y-4 animate-pulse ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-slate-200" />
        <div className="w-20 h-5 rounded-full bg-slate-200" />
      </div>
      <div className="space-y-2">
        <div className="w-3/4 h-5 rounded-md bg-slate-200" />
        <div className="w-1/2 h-3.5 rounded-md bg-slate-200" />
      </div>
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="w-24 h-4 rounded-md bg-slate-200" />
        <div className="w-16 h-4 rounded-md bg-slate-200" />
      </div>
    </div>
  );
}

export function SkeletonDoctor({ className = '' }) {
  return (
    <div
      className={`rounded-2xl bg-white border border-slate-200 p-5 space-y-4 animate-pulse ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="w-40 h-4 bg-slate-200 rounded-md" />
          <div className="w-28 h-3 bg-slate-200 rounded-md" />
          <div className="w-32 h-3 bg-slate-200 rounded-md" />
        </div>
      </div>
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <div className="w-20 h-4 bg-slate-200 rounded-md" />
        <div className="w-24 h-8 bg-slate-200 rounded-lg" />
      </div>
    </div>
  );
}

export default function Skeleton({
  variant = 'line',
  width,
  height,
  className = '',
}) {
  if (variant === 'card') return <SkeletonCard className={className} />;
  if (variant === 'doctor') return <SkeletonDoctor className={className} />;
  return <SkeletonLine width={width} height={height} className={className} />;
}
