'use client'

import { useCallback, useRef } from 'react'

import { FigmaMintCorner, FigmaSectionMarker } from './figmaSectionChrome'
import { DesktopDemoFrame } from './liveDemo/DesktopDemoFrame'
import { TryItNowCursorFollower } from './liveDemo/TryItNowCursorFollower'
import { useTryItNowCursor } from './liveDemo/useTryItNowCursor'
import { landingPageColumn, landingPageGutter } from './landingLayout'

// Stable object reference — never changes, so the div using it never re-renders due to style identity
const BG_STYLE = {
  backgroundImage: 'url(/bg-demo.webp)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  willChange: 'auto',
}

export function LandingLiveDemo() {
  const demoFrameRef = useRef(null)
  /** Resets on full page refresh (unlike sessionStorage). */
  const liveDemoAttentionConsumedRef = useRef(false)

  const {
    cursorEnabled,
    showTryItFollower,
    cursorPos,
    chromeCursorClass,
    onSectionPointerEnter,
    onSectionPointerMove,
    onSectionPointerLeave,
  } = useTryItNowCursor()

  const onLiveDemoPointerDownCapture = useCallback((e) => {
    if (liveDemoAttentionConsumedRef.current) return
    if (!e.currentTarget.contains(e.target)) return

    liveDemoAttentionConsumedRef.current = true

    e.preventDefault()
    e.stopPropagation()
    demoFrameRef.current?.beginBookTripAttention()
  }, [])

  return (
    <>
      <section
        id="live-demo"
        className="border-t border-endex-grid/90"
        onMouseEnter={onSectionPointerEnter}
        onMouseMove={onSectionPointerMove}
        onMouseLeave={onSectionPointerLeave}
        onPointerDownCapture={onLiveDemoPointerDownCapture}
      >
        <div className={`${landingPageGutter}`}>
          <div className={`relative overflow-hidden border-x border-endex-grid/90 ${landingPageColumn}`}>
            <div className="pointer-events-none absolute inset-0" style={BG_STYLE} aria-hidden />
            <div className="relative z-10">
              <div className={chromeCursorClass}>
                <FigmaMintCorner tone="white" />
                <FigmaSectionMarker n={5} />

                <div className="mx-auto flex w-full max-w-[min(52rem,100%)] flex-col items-center gap-4 px-8 pb-6 pt-20 text-center sm:px-10 sm:pt-24 lg:px-12 lg:pt-28">
                  <p className="inline-flex items-center rounded border border-zinc-900/14 bg-white/78 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-800 shadow-[0_1px_2px_rgba(15,23,42,0.06)] backdrop-blur-[1.5px] sm:px-3 sm:text-[11px]">
                    Live demo
                  </p>
                  <h2 className="w-full max-w-[760px] font-serif text-[clamp(1.45rem,4.8vw,3.35rem)] font-normal leading-[1.05] tracking-tight text-endex-firefly sm:text-[clamp(1.85rem,4.6vw,3.85rem)]">
                  Still wondering? Try the live experience end-to-end.
                  </h2>
                </div>
              </div>

              <div className="px-6 pb-20 pt-10 sm:px-8 sm:pb-24 sm:pt-12 lg:px-12 lg:pb-28 lg:pt-14">
                <DesktopDemoFrame ref={demoFrameRef} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {cursorEnabled ? (
        <TryItNowCursorFollower active={showTryItFollower} x={cursorPos.x} y={cursorPos.y} />
      ) : null}
    </>
  )
}
