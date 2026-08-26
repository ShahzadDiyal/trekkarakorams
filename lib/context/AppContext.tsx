'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Currency } from '@/types';
import { BookingModal } from '@/components/BookingModal';
import { CostEstimatorModal } from '@/components/CostEstimatorModal';
import { CustomPlanModal } from '@/components/CustomPlanModal';

interface BookingDetails {
  trekTitle: string;
  groupSize: number;
  totalPerPerson: number;
  notes: string;
}

interface AppContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onOpenBooking: (details: BookingDetails) => void;
  openCostEstimator: () => void;
  openCustomPlan: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

/** Scrolls to top on every route change (replicates the old React Router ScrollToTop helper). */
function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [currency, setCurrency] = useState<Currency>('USD');
  const [bookingModalData, setBookingModalData] = useState<{
    isOpen: boolean;
    trekTitle?: string;
    groupSize?: number;
    totalPerPerson?: number;
    notes?: string;
  }>({ isOpen: false });
  const [costEstimatorOpen, setCostEstimatorOpen] = useState(false);
  const [customPlanOpen, setCustomPlanOpen] = useState(false);

  const onOpenBooking = useCallback((details: BookingDetails) => {
    // Instead of opening the modal, redirect to the booking page
    const params = new URLSearchParams();
    if (details.trekTitle) params.set('trek', details.trekTitle);
    if (details.groupSize) params.set('group', details.groupSize.toString());
    if (details.notes) params.set('notes', details.notes);
    
    router.push(`/booking?${params.toString()}`);
  }, [router]);

  const openCostEstimator = useCallback(() => setCostEstimatorOpen(true), []);
  const openCustomPlan = useCallback(() => setCustomPlanOpen(true), []);

  const value: AppContextValue = {
    currency,
    setCurrency,
    onOpenBooking,
    openCostEstimator,
    openCustomPlan,
  };

  return (
    <AppContext.Provider value={value}>
      <ScrollToTop />
      {children}

      {/* Global Modals - persist across route changes, same as the old App.tsx */}
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
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProviders');
  }
  return ctx;
}