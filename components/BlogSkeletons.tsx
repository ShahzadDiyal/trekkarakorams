/**
 * Skeleton loading placeholders for blog surfaces.
 * Shown while posts load from Firestore — shimmer, no spinners.
 */

function Shimmer({ className = '' }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded-md ${className}`} aria-hidden="true" />;
}

/** Matches the blog card layout (homepage grid + /blog catalog). */
export function BlogCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <Shimmer className="h-48 !rounded-none sm:h-[230px]" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex gap-4">
          <Shimmer className="h-3 w-20" />
          <Shimmer className="h-3 w-16" />
        </div>
        <Shimmer className="h-6 w-11/12" />
        <Shimmer className="mt-2 h-6 w-2/3" />
        <Shimmer className="mt-3 h-4 w-full" />
        <Shimmer className="mt-1 h-4 w-full" />
        <Shimmer className="mt-1 h-4 w-1/2" />
        <div className="mt-auto pt-6">
          <Shimmer className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}

export function BlogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      aria-label="Loading articles"
    >
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Matches the blog post article layout. */
export function BlogPostSkeleton() {
  return (
    <div className="bg-slate-50 min-h-screen py-10" aria-label="Loading article">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Shimmer className="mb-6 h-4 w-64" />
        <div className="bg-white p-6 sm:p-10 mb-10 space-y-4">
          <Shimmer className="h-6 w-32" />
          <Shimmer className="h-9 w-full" />
          <Shimmer className="h-9 w-2/3" />
          <Shimmer className="h-4 w-80" />
          <Shimmer className="h-72 sm:h-96 w-full !rounded-none" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-5/6" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
