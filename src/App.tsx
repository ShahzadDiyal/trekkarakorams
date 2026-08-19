import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { CostEstimatorModal } from './components/CostEstimatorModal';
import { CustomPlanModal } from './components/CustomPlanModal';
import { Currency } from './types';

// Pages
import { HomePage } from './pages/HomePage';
import { TreksPage } from './pages/TreksPage';
import { TrekDetailPage } from './pages/TrekDetailPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { RoutesMapPage } from './pages/RoutesMapPage';
import { PlannerPage } from './pages/PlannerPage';
import { SafetyGuidesPage } from './pages/SafetyGuidesPage';
import { PermitsVisaGuidePage } from './pages/PermitsVisaGuidePage';
import { TravelStylesPage } from './pages/TravelStylesPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';

// Scroll to top on route change helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [bookingModalData, setBookingModalData] = useState<{
    isOpen: boolean;
    trekTitle?: string;
    groupSize?: number;
    totalPerPerson?: number;
    notes?: string;
  }>({
    isOpen: false
  });
  const [costEstimatorOpen, setCostEstimatorOpen] = useState(false);
  const [customPlanOpen, setCustomPlanOpen] = useState(false);

  const handleOpenBooking = (details: {
    trekTitle: string;
    groupSize: number;
    totalPerPerson: number;
    notes: string;
  }) => {
    setBookingModalData({
      isOpen: true,
      ...details
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-slate-950">
      <ScrollToTop />

      {/* Top Notification Bar with Currency Selector and WhatsApp Emergency Hotline */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            2026 K2 & Baltoro Permits Open (NADRA E-Visa Approved Operator)
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <span>Currency:</span>
            <div className="flex border border-slate-700 bg-slate-800">
              {(['USD', 'EUR', 'GBP', 'PKR', 'AUD'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-1.5 py-0.5 text-[10px] font-bold transition-colors cursor-pointer ${
                    currency === curr ? 'bg-sky-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <a
            href="https://wa.me/923009876543?text=Hi%20Karakoram%20Expeditions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 font-bold hover:underline hidden sm:inline"
          >
            Emergency 24/7: +92 300 9876543
          </a>
        </div>
      </div>

      {/* Primary Sticky Header */}
      <Navbar
        onOpenCostEstimator={() => setCostEstimatorOpen(true)}
        onOpenCustomPlan={() => setCustomPlanOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                currency={currency}
                onOpenBooking={handleOpenBooking}
                onOpenCostEstimator={() => setCostEstimatorOpen(true)}
                onOpenCustomPlan={() => setCustomPlanOpen(true)}
              />
            }
          />
          <Route
            path="/treks"
            element={
              <TreksPage
                currency={currency}
                onOpenBooking={handleOpenBooking}
              />
            }
          />
          <Route
            path="/treks/:id"
            element={
              <TrekDetailPage
                currency={currency}
                onOpenBooking={handleOpenBooking}
              />
            }
          />
          <Route
            path="/destinations"
            element={<DestinationsPage currency={currency} />}
          />
          <Route path="/routes-map" element={<RoutesMapPage />} />
          <Route
            path="/planner"
            element={
              <PlannerPage
                currency={currency}
                onOpenBooking={handleOpenBooking}
              />
            }
          />
          <Route path="/safety-and-guides" element={<SafetyGuidesPage />} />
          <Route path="/permits-visa-guide" element={<PermitsVisaGuidePage />} />
          <Route
            path="/travel-styles"
            element={
              <TravelStylesPage
                currency={currency}
                onOpenBooking={handleOpenBooking}
              />
            }
          />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <BookingModal
        isOpen={bookingModalData.isOpen}
        onClose={() => setBookingModalData({ isOpen: false })}
        trekTitle={bookingModalData.trekTitle}
        groupSize={bookingModalData.groupSize}
        totalPerPerson={bookingModalData.totalPerPerson}
        notes={bookingModalData.notes}
      />

      <CostEstimatorModal
        isOpen={costEstimatorOpen}
        onClose={() => setCostEstimatorOpen(false)}
        currency={currency}
      />

      <CustomPlanModal
        isOpen={customPlanOpen}
        onClose={() => setCustomPlanOpen(false)}
      />
    </div>
  );
}

export default App;
