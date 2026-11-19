import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SafetyDisclaimerBanner from './SafetyDisclaimerBanner';
import Header from './Header';
import MobileDrawer from './MobileDrawer';
import MobileBottomNav from './MobileBottomNav';
import Footer from './Footer';

export default function Layout() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* 1. Mandatory Clinical Safety Disclaimer Banner (NFR-15, FR-02) */}
      <SafetyDisclaimerBanner />

      {/* 2. Top Navigation Bar (NFR-06) */}
      <Header onOpenMobileMenu={() => setMobileDrawerOpen(true)} />

      {/* 3. Slide-over Mobile Service Drawer (NFR-06) */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />

      {/* 4. Main Page Content (SPA Outlet) */}
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>

      {/* 5. Sticky Bottom Navigation Bar for Mobile (NFR-06) */}
      <MobileBottomNav onOpenMobileMenu={() => setMobileDrawerOpen(true)} />

      {/* 6. Comprehensive Platform Footer */}
      <Footer />
    </div>
  );
}
