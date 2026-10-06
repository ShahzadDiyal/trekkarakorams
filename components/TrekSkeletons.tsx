/**
 * Skeleton loading placeholders for trek surfaces.
 * Shown while treks load from Firestore — shimmer, no spinners.
 */

function Shimmer({ className = '' }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded-xl ${className}`} aria-hidden="true" />;
}

/** Matches the PackageCard layout used in grids. */
export function TrekCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
      <Shimmer className="h-56 !rounded-none" />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex justify-end">
          <Shimmer className="h-6 w-20 !rounded-full" />
        </div>
        <Shimmer className="h-6 w-11/12" />
        <Shimmer className="mt-2 h-6 w-2/3" />
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Shimmer className="h-16" />
          <Shimmer className="h-16" />
        </div>
        <div className="mt-auto pt-5">
          <div className="mb-4 h-px bg-slate-100" />
          <div className="flex items-end justify-between gap-3">
            <div className="space-y-2">
              <Shimmer className="h-3 w-10" />
              <Shimmer className="h-7 w-24" />
            </div>
            <Shimmer className="h-10 w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrekGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading treks">
      {Array.from({ length: count }).map((_, i) => (
        <TrekCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Matches the trek detail page layout. */
export function TrekDetailSkeleton() {
  return (
    <div className="bg-slate-50 min-h-screen py-8" aria-label="Loading trek">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Shimmer className="mb-6 h-4 w-64" />
        <div className="bg-slate-950 overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <Shimmer className="lg:col-span-7 h-72 sm:h-96 lg:h-[460px] !rounded-none" />
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
              <Shimmer className="h-3 w-40" />
              <Shimmer className="h-8 w-full" />
              <Shimmer className="h-4 w-3/4" />
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Shimmer className="h-16" />
                <Shimmer className="h-16" />
                <Shimmer className="h-16" />
                <Shimmer className="h-16" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-6 space-y-3">
              <Shimmer className="h-6 w-56" />
              <Shimmer className="h-4 w-full" />
              <Shimmer className="h-4 w-full" />
              <Shimmer className="h-4 w-2/3" />
            </div>
            <div className="bg-white p-6">
              <Shimmer className="mb-4 h-6 w-48" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Shimmer className="h-44" />
                <Shimmer className="h-44" />
                <Shimmer className="h-44" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-white p-6 space-y-4">
              <Shimmer className="h-4 w-40" />
              <Shimmer className="h-12 w-full" />
              <Shimmer className="h-4 w-32" />
              <Shimmer className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
