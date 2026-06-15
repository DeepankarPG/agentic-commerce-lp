'use client'

import { useEffect, useState } from 'react'
import { Cpu, BotMessageSquare, Globe } from 'lucide-react'

import { BRAND_GRADIENT } from './brandGradient'
import { FigmaMintCorner, FigmaSectionMarker } from './figmaSectionChrome'
import { landingPageColumn, landingPageGutter } from './landingLayout'

const headingSerif = 'font-heading-serif'

const phasesColumnHeadlineClass =
  `${headingSerif} max-w-[min(36rem,100%)] text-left text-[clamp(1.35rem,3.4vw,2.35rem)] font-normal leading-[1.08] tracking-tight text-endex-firefly sm:text-[clamp(1.5rem,3vw,2.55rem)]`

const PHASE_AUTOPLAY_MS = 9_000


const phaseRowTitleClass =
  `${headingSerif} min-w-0 flex-1 text-left text-[clamp(0.98rem,2.2vw,1.28rem)] font-normal leading-[1.05] tracking-tight text-endex-firefly sm:text-[clamp(1.05rem,2vw,1.35rem)]`

const PHASES = [
  {
    title: 'MCP Setup & AI Foundation',
    body: 'MCP is the backend layer that makes your catalogue discoverable inside an AI platform. We handle the complete setup.',
    Icon: Cpu,
  },
  {
    title: 'AI Chatbot on your storefront',
    body: 'We build and embed a smart assistant on your website. This enables the customer to choose products and pay, right within the chatbot. No new tabs. No drop-off.',
    Icon: BotMessageSquare,
  },
  {
    title: 'Listed on ChatGPT, Claude, Gemini & More',
    body: "Your products surface naturally when customers ask AI shopping assistants for recommendations — unlocking new discovery channels without additional marketing spend.",
    Icon: Globe,
  },
]

export function LandingBento() {
  const [activePhase, setActivePhase] = useState(0)
  const [progress, setProgress] = useState(0)
  const current = PHASES[activePhase]

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) { setProgress(0); return }

    let raf = 0
    const start = performance.now()
    const tick = (now) => {
      const elapsed = now - start
      if (elapsed >= PHASE_AUTOPLAY_MS) { setActivePhase((p) => (p + 1) % PHASES.length); return }
      setProgress(elapsed / PHASE_AUTOPLAY_MS)
      raf = requestAnimationFrame(tick)
    }
    setProgress(0)
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [activePhase])

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className={`border-t border-endex-grid bg-white pt-px ${landingPageGutter}`}
    >
      <div className={`border-x border-endex-grid ${landingPageColumn}`}>
        <FigmaMintCorner />
        <FigmaSectionMarker n={2} />

        <div className="flex flex-col lg:min-h-[min(38rem,75svh)] lg:flex-row lg:items-stretch">
          {/* Left: accordion */}
          <div className="flex w-full flex-col border-b border-endex-grid bg-white px-8 py-8 sm:px-10 sm:py-10 lg:w-[55%] lg:max-w-[55%] lg:shrink-0 lg:border-b-0 lg:border-r lg:py-12 lg:pl-12 lg:pr-10">
            <header className="relative z-20 mb-[1.6rem] pb-8 sm:mb-8 sm:pb-[2.4rem]">
              <p className="mb-3 inline-flex items-center rounded border border-zinc-900/14 bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-800 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:mb-4 sm:px-3 sm:text-[11px]">
                Rollout
              </p>
              <h2 id="features-heading" className={phasesColumnHeadlineClass}>
                We roll out in phases. You unlock value at every step.
              </h2>
            </header>

            <ul className="w-full list-none p-0" aria-label="Rollout phases">
              {PHASES.map((phase, i) => {
                const step = String(i + 1).padStart(2, '0')
                const isActive = activePhase === i
                const Icon = phase.Icon
                const barWidth = isActive ? `${Math.min(100, progress * 100)}%` : '0%'
                return (
                  <li key={phase.title} className="overflow-hidden">
                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-controls="features-visual"
                      onClick={() => setActivePhase(i)}
                      className={`${headingSerif} flex w-full items-center gap-3 py-[1.125rem] text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600/40 sm:gap-3.5 sm:py-5`}
                    >
                      <span
                        className="flex size-9 shrink-0 items-center justify-center rounded-md border-2 border-blue-600 text-blue-700 sm:size-10"
                        aria-hidden
                      >
                        <Icon className="size-[17px] sm:size-[18px]" strokeWidth={2.35} />
                      </span>
                      <span className={phaseRowTitleClass}>{phase.title}</span>
                      <span className="shrink-0 font-mono text-[10px] font-medium tabular-nums tracking-[0.12em] text-endex-firefly/35 sm:text-[11px]">
                        {step}
                      </span>
                    </button>

                    {isActive && (
                      <div className="pb-6 pl-[3rem] pr-2 pt-1 sm:pl-[3.35rem] sm:pr-4">
                        <p className="m-0 max-w-[36rem] bg-transparent font-sans text-[17px] leading-[1.55] text-endex-firefly/80 sm:text-[18px] md:text-[19px] md:leading-[1.58]">
                          {phase.body}
                        </p>
                      </div>
                    )}

                    <div
                      className="relative h-[2px] w-full overflow-hidden bg-neutral-200/95 sm:h-[2.5px]"
                      role="presentation"
                      aria-hidden
                    >
                      <div
                        className="absolute inset-y-0 left-0"
                        style={{ width: barWidth, background: BRAND_GRADIENT }}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-8">
              <a
                href="mailto:sales@payglocal.com"
                className="group inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded border border-blue-600/50 bg-transparent px-3 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-blue-700 transition-colors hover:border-blue-600 hover:bg-blue-600/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600/40 sm:w-auto sm:px-4 sm:py-2 sm:text-[11px]"
              >
                Join waitlist
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </a>
            </div>
          </div>

          {/* Right: placeholder panel */}
          <div
            id="features-visual"
            className="flex min-h-[min(38svh,16rem)] w-full flex-1 items-center justify-center border-b border-endex-grid bg-neutral-100 p-5 sm:min-h-[min(42svh,18rem)] sm:p-8 lg:min-h-0 lg:min-w-0 lg:border-b-0 lg:p-10"
          >
            <div key={activePhase} className="h-full w-full max-h-[min(48svh,560px)] max-w-[min(100%,920px)] rounded-xl bg-zinc-200/70" />
          </div>
        </div>
      </div>
    </section>
  )
}
