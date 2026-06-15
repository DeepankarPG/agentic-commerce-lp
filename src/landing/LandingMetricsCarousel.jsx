'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'

const metricsBanner1 = '/assets/Metrics/metric banner-1.jpeg'
const metricsBanner2 = '/assets/Metrics/metrics banner-2.png'
const metricsBanner3 = '/assets/Metrics/metrics banner-3.png'

import { FigmaMintCorner, FigmaSectionMarker } from './figmaSectionChrome'
import { landingPageColumn, landingPageGutter } from './landingLayout'

const headingSerif = 'font-heading-serif'

const metricsTagPillClass =
  'mb-6 inline-flex w-fit max-w-full shrink-0 items-center self-start rounded border border-zinc-900/14 bg-white px-2.5 py-1 font-mono text-[10px] font-semibold normal-case tracking-[0.06em] text-zinc-800 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:mb-8 sm:px-3 sm:text-[11px]'

const METRICS_AUTOPLAY_MS = 8_000

const SLIDES = [
  {
    kicker: 'Conversion',
    headline: 'Turn every conversation into a complete sale.',
    body: 'AI-powered commerce boosts conversions from 3.1% to 12.3% and cuts purchase time by 47%.',
    statValue: '4×',
    statLabel: 'Checkout conversion vs. traditional link-based flows',
    statAriaLabel: 'Four times checkout conversion compared to traditional link-based flows',
  },
  {
    kicker: 'Discovery',
    headline: 'Surface the right product before drop-off.',
    body: 'The moment a customer describes what they want, agents recommend it instantly. No manual searching.',
    statValue: '3×',
    statLabel: 'More products discovered per session via agent vs. browsing',
    statAriaLabel: 'Three times more products discovered per session with agent versus browsing',
  },
  {
    kicker: 'Drop-off',
    headline: 'Most checkouts fail before the card is entered.',
    body: 'Redirects, OTP screens and new tabs are where purchases die. PayGlocal eliminates all these steps.',
    statValue: '68%',
    statLabel: 'Average cart abandonment happens at the redirect — we remove it',
    statAriaLabel: 'Sixty-eight percent average cart abandonment at checkout',
  },
]

const headlineClass = `${headingSerif} text-[clamp(1.45rem,2.8vw,2.5rem)] font-normal leading-[1.12] tracking-tight text-endex-firefly lg:text-[clamp(1.55rem,2.4vw,2.65rem)]`
const bodyClass = 'max-w-[min(28rem,100%)] font-sans text-[16px] leading-[1.55] text-endex-firefly/80 sm:text-[17px] sm:leading-[1.58] lg:text-[18px]'
const statValueClass = `${headingSerif} text-[clamp(2.75rem,8vw,4.25rem)] font-normal leading-none tracking-tight text-endex-firefly lg:text-[clamp(3rem,5vw,4.75rem)]`
const statLabelClass = 'mt-3 max-w-[min(26rem,100%)] font-sans text-[14px] leading-snug text-endex-firefly/70 sm:text-[15px] lg:text-[16px]'

const METRICS_BANNERS = [
  { src: metricsBanner1, alt: 'Conversion metric visual', width: 1424, height: 748 },
  { src: metricsBanner2, alt: 'Discovery metric visual', width: 1730, height: 909 },
  { src: metricsBanner3, alt: 'Drop-off metric visual', width: 1730, height: 909 },
]

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'
const DURATION = '550ms'

export function LandingMetricsCarousel() {
  const [active, setActive] = useState(0)
  const prevRef = useRef(0)
  const dirRef = useRef(1) // 1 = forward, -1 = backward
  const baseId = useId()

  const goTo = useCallback((next) => {
    setActive((cur) => {
      dirRef.current = next > cur ? 1 : -1
      prevRef.current = cur
      return next
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setTimeout(() => {
      goTo((active + 1) % SLIDES.length)
    }, METRICS_AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [active, goTo])

  const onDotsKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo((active + 1) % SLIDES.length) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo((active - 1 + SLIDES.length) % SLIDES.length) }
    else if (e.key === 'Home') { e.preventDefault(); goTo(0) }
    else if (e.key === 'End') { e.preventDefault(); goTo(SLIDES.length - 1) }
  }, [active, goTo])

  return (
    <section
      id="metrics"
      className={`border-t border-endex-grid bg-neutral-50 pt-px ${landingPageGutter}`}
      aria-labelledby={`${baseId}-headline`}
    >
      <div className={`relative border-x border-endex-grid bg-neutral-50 ${landingPageColumn}`}>
        <FigmaMintCorner />
        <FigmaSectionMarker n={3} />

        <div className="relative z-10 flex flex-col gap-10 px-6 py-20 sm:px-10 sm:py-24 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-x-10 lg:gap-y-0 lg:px-12 lg:py-28 xl:gap-x-14 xl:py-32">
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {`${SLIDES[active].kicker}. ${SLIDES[active].body} ${SLIDES[active].statValue}. ${SLIDES[active].statLabel}`}
          </p>

          {/* Left */}
          <div className="flex flex-col text-left lg:pr-2">
            <p className={metricsTagPillClass}>Why it matters?</p>

            {/* Fixed-height stack — prevents layout shift between slides */}
            <div className="relative h-[23rem] shrink-0 sm:h-[24rem] lg:h-[25rem]" aria-live="polite">
              {SLIDES.map((s, i) => {
                const isActive = i === active
                const dir = dirRef.current
                return (
                  <div
                    key={s.kicker}
                    aria-hidden={!isActive}
                    className="absolute inset-0 flex flex-col"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? 'translateY(0px)'
                        : `translateY(${i === prevRef.current ? dir * -16 : dir * 16}px)`,
                      transition: `opacity ${DURATION} ${EASE}, transform ${DURATION} ${EASE}`,
                      pointerEvents: isActive ? 'auto' : 'none',
                      willChange: 'opacity, transform',
                    }}
                  >
                    <h2
                      id={isActive ? `${baseId}-headline` : undefined}
                      className={`${headlineClass} mb-5 max-w-[min(18rem,100%)] sm:mb-6`}
                    >
                      {s.headline}
                    </h2>
                    <p className={`${bodyClass} mb-7 sm:mb-8`}>{s.body}</p>
                    <div>
                      <p className={statValueClass} aria-label={s.statAriaLabel}>{s.statValue}</p>
                      <p className={statLabelClass}>{s.statLabel}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Dots */}
            <div
              className="flex flex-wrap items-center gap-2 pt-6"
              role="tablist"
              aria-label="Choose impact metric"
              onKeyDown={onDotsKeyDown}
            >
              {SLIDES.map((s, i) => {
                const isActive = active === i
                return (
                  <button
                    key={s.kicker}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${baseId}-panel-${i}`}
                    id={`${baseId}-tab-${i}`}
                    className={`rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none ${
                      isActive
                        ? 'h-2 w-8 bg-endex-firefly'
                        : 'h-2 w-2 bg-zinc-300 hover:bg-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600/40'
                    }`}
                    aria-label={`${s.kicker}: ${s.statAriaLabel}`}
                    onClick={() => goTo(i)}
                  />
                )
              })}
            </div>
          </div>

          {/* Right: image crossfade */}
          <div className="relative w-full self-center overflow-hidden rounded-2xl aspect-[16/10] sm:rounded-3xl">
            {METRICS_BANNERS.map((b, i) => {
              const isActive = i === active
              const dir = dirRef.current
              return (
                <img
                  key={b.src}
                  src={b.src}
                  alt={b.alt}
                  width={b.width}
                  height={b.height}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full object-contain object-center"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? 'translateX(0px) scale(1)'
                      : `translateX(${i === prevRef.current ? dir * -24 : dir * 24}px) scale(0.98)`,
                    transition: `opacity ${DURATION} ${EASE}, transform ${DURATION} ${EASE}`,
                    willChange: 'opacity, transform',
                  }}
                  loading="lazy"
                  decoding="async"
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
