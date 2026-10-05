'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X, MessageSquare, ShieldCheck,
  ClipboardList
} from 'lucide-react';
import { whatsappLink, SITE_NAME, PHONE_DISPLAY } from '@/lib/site';
import { TREK_PACKAGES } from '@/data/treks';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  trekTitle?: string;
  groupSize?: number;
  totalPerPerson?: number;
  notes?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  trekTitle,
  groupSize = 2,
  notes
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleProceedToBooking = () => {
    onClose();
    // Navigate to booking page with query parameters
    const params = new URLSearchParams();
    if (trekTitle) params.set('trek', trekTitle);
    if (groupSize) params.set('group', groupSize.toString());
    if (notes) params.set('notes', notes);
    
    router.push(`/booking?${params.toString()}`);
  };

  const whatsappInquiryUrl = whatsappLink(
    `Hello ${SITE_NAME}! I'm interested in booking: ${trekTitle || 'a trek'}, Group: ${groupSize}, Notes: ${notes || 'None'}`
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 overflow-y-auto p-4 flex items-center justify-center">
      <div className="bg-white max-w-xl w-full p-6 sm:p-8 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-sky-500 text-slate-950 text-[14px] font-bold px-2 py-0.5 uppercase tracking-wider">
              Expedition Reservation
            </span>
            <span className="text-[13px] text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero Booking Surcharges</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Ready to Book Your Karakoram Trek?
          </h2>
          
          <p className="text-[14px] text-slate-600 mt-2 mb-6 leading-relaxed">
            {trekTitle ? (
              <>You're about to book <strong className="text-slate-900">{trekTitle}</strong> for <strong className="text-slate-900">{groupSize}</strong> traveler{groupSize > 1 ? 's' : ''}.</>
            ) : (
              <>Complete your expedition reservation with our secure booking form.</>
            )}
          </p>

          <div className="space-y-4">
            <div className="bg-sky-50 border border-sky-200 p-4 text-[14px] text-slate-700">
              <p className="font-medium text-sky-900 mb-1 flex items-center gap-1.5"><ClipboardList className="w-4 h-4" /> What's included in the process:</p>
              <ul className="space-y-1 text-[13px]">
                <li>• Official Pakistan E-Visa Letter of Invitation (LOI)</li>
                <li>• Complete permit clearance paperwork</li>
                <li>• Detailed gear briefing and preparation guide</li>
                <li>• 24/7 support from our Skardu operations team</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleProceedToBooking}
                className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-medium py-3.5 px-4 text-[15px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Proceed to Booking Form</span>
                <span>→</span>
              </button>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3.5 px-4 text-[15px] flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </a>
            </div>

            <div className="text-center text-[11px] text-slate-400 pt-2">
              You'll be redirected to our secure booking page to complete your reservation.
              <br />
              By booking you agree to our{' '}
              <a href="/terms" className="underline hover:text-sky-600">
                deposit &amp; cancellation terms
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};