import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-5">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900">404 - Page Not Found</h1>
      <p className="text-sm text-slate-600 max-w-md mx-auto">
        The medical portal route you requested does not exist or has been relocated within the MedNex architecture.
      </p>
      <div className="pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-sm transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return to MedNex Home</span>
        </Link>
      </div>
    </div>
  );
}
