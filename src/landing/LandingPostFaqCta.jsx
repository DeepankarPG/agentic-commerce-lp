'use client'

import { useEffect, useRef } from 'react'
import { FigmaMintCorner, FigmaSectionMarker } from './figmaSectionChrome'
import { landingPageColumn, landingPageGutter } from './landingLayout'

const headingSerif = 'font-heading-serif'

const COLS = 18
const ROWS = 10
const REPEL_RADIUS = 90
const REPEL_STRENGTH = 28

function PlusGrid() {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef(0)
  const dotsRef = useRef([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const dots = Array.from(container.querySelectorAll('[data-plus]'))
    dotsRef.current = dots

    const onMove = (e) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        w: rect.width,
        h: rect.height,
      }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
    }

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, w: 0, h: 0 }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
    }

    const tick = () => {
      rafRef.current = 0
      const { x: mx, y: my, w, h } = mouseRef.current
      if (!w || !h) return

      dots.forEach((el) => {
        // Convert percentage positions to actual pixel positions within the container
        const pctX = parseFloat(el.dataset.cx)
        const pctY = parseFloat(el.dataset.cy)
        const dotX = (pctX / 100) * w
        const dotY = (pctY / 100) * h

        const dx = dotX - mx
        const dy = dotY - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
          const tx = (dx / dist) * force
          const ty = (dy / dist) * force
          el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`
          el.style.opacity = String(0.1 + 0.35 * (dist / REPEL_RADIUS))
        } else {
          el.style.transform = 'translate(-50%, -50%)'
          el.style.opacity = '0.45'
        }
      })

      if (mouseRef.current.x !== -9999) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)
    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const items = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // percentage positions for center of each cell
      const cx = ((c + 0.5) / COLS) * 100
      const cy = ((r + 0.5) / ROWS) * 100
      items.push(
        <span
          key={`${r}-${c}`}
          data-plus
          data-cx={cx}
          data-cy={cy}
          aria-hidden
          className="pointer-events-none absolute select-none font-mono text-[11px] text-white will-change-transform"
          style={{
            left: `${cx}%`,
            top: `${cy}%`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.45,
            transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease',
          }}
        >
          +
        </span>
      )
    }
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {items}
    </div>
  )
}

export function LandingPostFaqCta() {
  return (
    <section
      id="cta"
      className={`border-t border-endex-grid bg-white pt-px ${landingPageGutter}`}
      aria-labelledby="post-faq-cta-heading"
    >
      <div className={`relative min-h-0 border-x border-endex-grid bg-[#0c1424] ${landingPageColumn}`}>
        <FigmaMintCorner tone="white" />
        <FigmaSectionMarker n={10} variant="dark" />

        <div className="grid min-h-0 grid-cols-1 lg:min-h-[min(17rem,42svh)] lg:grid-cols-[3fr_2fr]">
          <div className="flex min-w-0 flex-col justify-between gap-10 border-b border-endex-grid px-6 py-14 sm:px-10 sm:py-16 lg:border-b-0 lg:px-12 lg:py-20 lg:gap-12">
            <h2
              id="post-faq-cta-heading"
              className={`${headingSerif} text-left text-[clamp(1.65rem,3.8vw,2.85rem)] font-normal leading-[1.08] tracking-tight text-white sm:text-[clamp(1.85rem,3.2vw,3.1rem)]`}
            >
              Join the PayGlocal Agentic Commerce pilot
              <sup className="ml-0.5 align-super text-[0.5em] font-normal leading-none text-sky-400" aria-hidden>
                +
              </sup>
            </h2>

            <div>
              <a
                href="mailto:sales@payglocal.com?subject=PayGlocal%20Agentic%20Commerce%20%E2%80%94%20intro"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-blue-600 px-7 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/80 sm:min-h-[52px] sm:px-8 sm:text-[11px]"
              >
                Request demo
              </a>
            </div>
          </div>

          <div className="relative min-h-[10rem] min-w-0 overflow-hidden border-b border-endex-grid lg:min-h-0">
            <PlusGrid cols={26} rows={14} opacity={0.45} />
          </div>
        </div>
      </div>
    </section>
  )
}
