/**
 * Skeleton loading placeholders for the FAQ surfaces.
 * Shown while FAQs load from Firestore — shimmer, no spinners.
 */

function Shimmer({ className = '' }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded-md ${className}`} aria-hidden="true" />;
}

/** Matches the homepage FAQSection accordion cards. */
export function FaqSectionSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="mt-4 space-y-3" aria-label="Loading FAQs">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="flex w-full items-center gap-4 px-5 py-5 sm:px-6">
            <Shimmer className="h-9 w-9 shrink-0 !rounded-lg" />
            <div className="min-w-0 flex-1 space-y-2">
              <Shimmer className="h-3 w-28" />
              <Shimmer className="h-4 w-11/12" />
            </div>
            <Shimmer className="h-8 w-8 shrink-0 !rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Matches the /faq page accordion list. */
export function FaqPageSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="mb-10 space-y-3" aria-label="Loading FAQs">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 bg-white">
          <div className="flex w-full items-center justify-between gap-3 p-4 sm:p-5">
            <div className="flex flex-1 items-center gap-2.5">
              <Shimmer className="h-5 w-24 shrink-0 !rounded-sm" />
              <Shimmer className="h-5 flex-1" />
            </div>
            <Shimmer className="h-4 w-4 shrink-0 !rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
