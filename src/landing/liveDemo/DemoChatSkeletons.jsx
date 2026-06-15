'use client'

/** Slow shimmer strip for scripted demo loading (no progress claims). */
function ShimmerBlock({ className }) {
  return (
    <div
      className={`demo-chat-shimmer rounded-md bg-zinc-200/70 ${className ?? ''}`}
      aria-hidden
    />
  )
}

/** Horizontal package-style cards (matches carousel vibe). */
export function PackagesGridSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-sm sm:p-4">
      <div className="mb-2 flex flex-wrap gap-2">
        <ShimmerBlock className="h-3 w-40" />
        <ShimmerBlock className="h-3 w-24" />
      </div>
      <div className="flex gap-2.5 overflow-hidden pb-1 sm:gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-[min(200px,72vw)] shrink-0 overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-sm"
          >
            <ShimmerBlock className="h-24 w-full rounded-none rounded-t-xl" />
            <div className="space-y-2 p-2.5 sm:p-3">
              <ShimmerBlock className="h-3 w-[85%]" />
              <ShimmerBlock className="h-2.5 w-1/2" />
              <ShimmerBlock className="h-2.5 w-2/3" />
              <div className="flex items-end justify-between gap-2 pt-1">
                <div className="space-y-1">
                  <ShimmerBlock className="h-4 w-16" />
                  <ShimmerBlock className="h-2 w-12" />
                </div>
                <ShimmerBlock className="h-7 w-14 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Booking draft card chrome. */
export function BookingDraftSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex gap-3 border-b border-zinc-100 pb-3">
        <ShimmerBlock className="size-16 shrink-0 rounded-lg" />
        <div className="min-w-0 flex-1 space-y-2">
          <ShimmerBlock className="h-2.5 w-20" />
          <ShimmerBlock className="h-4 w-[90%]" />
          <ShimmerBlock className="h-3 w-3/4" />
        </div>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="space-y-1.5">
          <ShimmerBlock className="h-2.5 w-24" />
          <ShimmerBlock className="h-9 w-full rounded-lg" />
        </div>
        <div className="space-y-1.5">
          <ShimmerBlock className="h-2.5 w-20" />
          <ShimmerBlock className="h-9 w-full rounded-lg" />
        </div>
      </div>
      <ShimmerBlock className="mt-3 h-3 w-32" />
      <ShimmerBlock className="mt-4 h-10 w-full rounded-xl" />
    </div>
  )
}

/** Single product hero card (electronics browse / PDP wait). */
export function ProductBrowseSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-sm sm:p-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <ShimmerBlock className="h-3 w-44" />
        <ShimmerBlock className="h-3 w-20" />
      </div>
      <div className="overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-sm">
        <ShimmerBlock className="h-36 w-full rounded-none rounded-t-xl sm:h-40" />
        <div className="space-y-2 p-3 sm:p-4">
          <ShimmerBlock className="h-4 w-3/4 max-w-xs" />
          <ShimmerBlock className="h-3 w-full max-w-md" />
          <ShimmerBlock className="h-3 w-5/6 max-w-sm" />
          <div className="flex items-end justify-between gap-3 pt-2">
            <div className="space-y-1">
              <ShimmerBlock className="h-5 w-20" />
              <ShimmerBlock className="h-2.5 w-14" />
            </div>
            <ShimmerBlock className="h-9 w-28 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

/** Variant chips + quantity row. */
export function PdpControlsSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex flex-wrap gap-2">
        <ShimmerBlock className="h-9 w-28 rounded-full" />
        <ShimmerBlock className="h-9 w-24 rounded-full" />
        <ShimmerBlock className="h-9 w-20 rounded-full" />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-zinc-100 pt-4">
        <ShimmerBlock className="h-3 w-16" />
        <div className="flex items-center gap-2">
          <ShimmerBlock className="size-9 rounded-lg" />
          <ShimmerBlock className="h-8 w-10 rounded-lg" />
          <ShimmerBlock className="size-9 rounded-lg" />
        </div>
      </div>
      <ShimmerBlock className="mt-4 h-10 w-full rounded-xl" />
    </div>
  )
}

/** Mini cart + add-on row. */
export function ShoppingCartSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex gap-3 border-b border-zinc-100 pb-3">
        <ShimmerBlock className="size-14 shrink-0 rounded-lg" />
        <div className="min-w-0 flex-1 space-y-2">
          <ShimmerBlock className="h-3 w-32" />
          <ShimmerBlock className="h-3 w-24" />
          <ShimmerBlock className="h-4 w-20" />
        </div>
        <ShimmerBlock className="h-6 w-16 shrink-0" />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <ShimmerBlock className="size-4 rounded border" />
        <ShimmerBlock className="h-3 flex-1 max-w-xs" />
        <ShimmerBlock className="h-4 w-14 shrink-0" />
      </div>
      <ShimmerBlock className="mt-4 h-10 w-full rounded-xl" />
    </div>
  )
}

/** Payment summary card. */
export function CheckoutCardSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-3">
        <div className="flex min-w-0 gap-3">
          <ShimmerBlock className="size-14 shrink-0 rounded-lg" />
          <div className="min-w-0 space-y-2">
            <ShimmerBlock className="h-2.5 w-12" />
            <ShimmerBlock className="h-4 w-36" />
            <ShimmerBlock className="h-3 w-28" />
          </div>
        </div>
        <div className="space-y-2 text-right">
          <ShimmerBlock className="ml-auto h-2.5 w-10" />
          <ShimmerBlock className="ml-auto h-6 w-20" />
          <ShimmerBlock className="ml-auto h-2.5 w-24" />
        </div>
      </div>
      <ShimmerBlock className="mt-3 h-10 w-full rounded-xl" />
    </div>
  )
}
