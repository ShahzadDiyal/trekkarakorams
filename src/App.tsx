// pages/_app.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';

import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BookingModal } from '../components/BookingModal';
import { CostEstimatorModal } from '../components/CostEstimatorModal';
import { CustomPlanModal } from '../components/CustomPlanModal';
import { Currency } from '../types';

// Remove all page imports – they are handled by Next.js file system

// Helper: scroll to top on route change
function useScrollToTop() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [bookingModalData, setBookingModalData] = useState<{
    isOpen: boolean;
    trekTitle?: string;
    groupSize?: number;
    totalPerPerson?: number;
    notes?: string;
  }>({
    isOpen: false,
  });
  const [costEstimatorOpen, setCostEstimatorOpen] = useState(false);
  const [customPlanOpen, setCustomPlanOpen] = useState(false);

  useScrollToTop();

  const handleOpenBooking = (details: {
    trekTitle: string;
    groupSize: number;
    totalPerPerson: number;
    notes: string;
  }) => {
    setBookingModalData({
      isOpen: true,
      ...details,
    });
  };

  // Inject the onOpenBooking and currency props into every page
  const enhancedPageProps = {
    ...pageProps,
    currency,
    onOpenBooking: handleOpenBooking,
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-grow">
        {/* Next.js renders the current page here */}
        <Component {...enhancedPageProps} />
      </main>

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