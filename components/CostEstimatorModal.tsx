'use client';

import React from 'react';
import { X } from 'lucide-react';
import { CostEstimator } from '@/components/CostEstimator';
import { Currency } from '@/types';

interface CostEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
}

export const CostEstimatorModal: React.FC<CostEstimatorModalProps> = ({
  isOpen,
  onClose,
  currency
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 overflow-y-auto p-4 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-6 sm:p-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[13px]"
          aria-label="Close estimator"
        >
          <X className="w-5 h-5" />
        </button>

        <CostEstimator currency={currency} onOpenBooking={() => onClose()} />
      </div>
    </div>
  );
};
