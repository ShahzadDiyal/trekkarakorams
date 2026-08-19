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
import { CustomPlanPage } from './pages/CustomPlanPage';

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



      {/* Primary Sticky Header */}
      <Navbar

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
          <Route path="/custom-plan" element={<CustomPlanPage />} />

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
