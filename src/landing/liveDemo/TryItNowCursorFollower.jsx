'use client'

/** Lucide `MousePointer2` path — angled multiplayer-style arrow (reference shape). */
const POINTER_PATH =
  'M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z'

/** Figma-style cursor: angled pointer + same-fill tag below (blue / white label). */
export function TryItNowCursorFollower({ active, x, y }) {
  if (!active) return null

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[200] will-change-transform motion-reduce:hidden"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
      aria-hidden
    >
      <div className="-translate-x-[3px] -translate-y-[3px]">
        <div className="flex flex-col items-start drop-shadow-[0_4px_14px_rgba(0,0,0,0.28)]">
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 text-blue-600"
            aria-hidden
          >
            <path
              d={POINTER_PATH}
              fill="currentColor"
              stroke="white"
              strokeWidth={1}
              strokeLinejoin="round"
            />
          </svg>
          <div className="mt-0.5 ml-2 min-w-0 rounded-md border border-white/25 bg-blue-600 px-2 py-1 leading-none shadow-[0_1px_0_rgba(0,0,0,0.12)] ring-1 ring-black/10">
            <span className="font-sans text-[11px] font-semibold tracking-tight text-white sm:text-[12px]">
            Try the Experience
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
