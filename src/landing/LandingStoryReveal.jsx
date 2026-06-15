'use client'

import { useCallback, useEffect, useRef } from 'react'
import { BRAND_GRADIENT } from './brandGradient'
import { landingPageColumn, landingPageGutter } from './landingLayout'

/** Same pill as FAQ, Rollout, Live demo. */
const storyTagPillClass =
  'inline-flex items-center rounded border border-zinc-900/14 bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-800 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:px-3 sm:text-[11px]'

/** Line breaks match the narrative; empty string = vertical rhythm gap */
const STORY_LINES = [
  "Your customers don't browse anymore.",
  'They ask.',
  '',
  'But your website?',
  'Still makes them search.',
  '',
  'What if your website could respond instantly?',
  'Understand.',
  'Recommend.',
  'And complete the purchase — in the same conversation.',
  'No tabs.',
  'No redirects.',
  'No friction.',
  'Just a conversation.',
  'This is PayGlocal Agentic Commerce —',
  'a storefront that thinks and sells for you.',
]

const STRIKETHROUGH_LINES = new Set([
  STORY_LINES.indexOf('No tabs.'),
  STORY_LINES.indexOf('No redirects.'),
  STORY_LINES.indexOf('No friction.'),
])

const DOT_PX = 12

/** Multiplier on scroll-mapped progress; 1.1 = fill completes ~10% earlier for the same scroll. */
const SCROLL_FILL_SPEED = 1.1

const PAYGLOCAL_LINE_INDEX = STORY_LINES.findIndex((line) => line.includes('PayGlocal Agentic Commerce'))

/** Muted on white (unrevealed); lit = near-black */
const DIM = [196, 198, 204]
const LIT = [9, 9, 11]

function wordsInLine(line) {
  return line.split(/\s+/).filter(Boolean)
}

function smoothstep01(t) {
  const x = Math.min(1, Math.max(0, t))
  return x * x * (3 - 2 * x)
}

function colorForT(t) {
  const u = Math.min(1, Math.max(0, t))
  const r = Math.round(DIM[0] + (LIT[0] - DIM[0]) * u)
  const g = Math.round(DIM[1] + (LIT[1] - DIM[1]) * u)
  const b = Math.round(DIM[2] + (LIT[2] - DIM[2]) * u)
  return `rgb(${r} ${g} ${b})`
}

/** Words for scroll reveal; PayGlocal line merges brand into one token so gradient is continuous. */
function storyTokensForLine(text, lineIndex) {
  if (lineIndex !== PAYGLOCAL_LINE_INDEX || PAYGLOCAL_LINE_INDEX < 0) {
    return wordsInLine(text).map((w) => ({ text: w }))
  }
  const w = wordsInLine(text)
  if (w.length < 6) return w.map((t) => ({ text: t }))
  return [{ text: w[0] }, { text: w[1] }, { text: `${w[2]} ${w[3]} ${w[4]}` }, { text: w[5] }]
}

function isBrandWord(lineIndex, tokenIndex) {
  return lineIndex === PAYGLOCAL_LINE_INDEX && PAYGLOCAL_LINE_INDEX >= 0 && tokenIndex === 2
}

function applyWordStyle(el, t, isBrand, isStrike) {
  if (isBrand) {
    if (t < 0.04) {
      el.style.color = `rgb(${DIM[0]} ${DIM[1]} ${DIM[2]})`
      el.style.backgroundImage = 'none'
      el.style.webkitBackgroundClip = ''
      el.style.backgroundClip = ''
      el.style.webkitTextFillColor = ''
      el.style.opacity = '1'
    } else {
      el.style.color = 'transparent'
      el.style.webkitTextFillColor = 'transparent'
      el.style.backgroundImage = BRAND_GRADIENT
      el.style.webkitBackgroundClip = 'text'
      el.style.backgroundClip = 'text'
      const o = Math.min(1, Math.max(0, (t - 0.04) / 0.96))
      el.style.opacity = String(0.35 + 0.65 * smoothstep01(o))
    }
    return
  }
  el.style.backgroundImage = 'none'
  el.style.webkitBackgroundClip = ''
  el.style.backgroundClip = ''
  el.style.webkitTextFillColor = ''
  el.style.opacity = '1'
  el.style.color = colorForT(t)

  if (isStrike) {
    const progress = Math.min(1, Math.max(0, (t - 0.5) / 0.5))
    el.style.setProperty('--strike-w', `${Math.round(progress * 100)}%`)
  }
}

/**
 * Scroll progress while the block crosses the viewport (stable 0 → 1).
 * When the section top is at the bottom edge: 0. When it has moved up by (vh + height): 1.
 */
function sectionScrollProgress(rect, vh) {
  const travel = Math.max(1, vh + rect.height)
  const scrolled = Math.min(travel, Math.max(0, vh - rect.top))
  return scrolled / travel
}

export function LandingStoryReveal() {
  const sectionRef = useRef(null)
  const railRef = useRef(null)
  const dotRef = useRef(null)
  const reducedMotion = useRef(false)
  const rafRef = useRef(0)

  const updateVisuals = useCallback(() => {
    const root = sectionRef.current
    const rail = railRef.current
    const dot = dotRef.current
    if (!root || !rail || !dot) return

    const nodes = root.querySelectorAll('[data-story-word]')
    const n = nodes.length
    if (n === 0) return

    const railRect = rail.getBoundingClientRect()
    const railH = railRect.height

    const dotYCenteredOnWord = (wordEl) => {
      const wRect = wordEl.getBoundingClientRect()
      const mid = wRect.top + wRect.height / 2
      let y = mid - railRect.top - DOT_PX / 2
      y = Math.max(0, Math.min(y, railH - DOT_PX))
      dot.style.transform = `translateY(${y}px)`
    }

    if (reducedMotion.current || typeof window === 'undefined') {
      for (const el of nodes) {
        const lineIdx = Number(el.dataset.storyLine)
        const wi = Number(el.dataset.storyWi)
        const brand = isBrandWord(lineIdx, wi)
        const strike = STRIKETHROUGH_LINES.has(lineIdx)
        applyWordStyle(el, 1, brand, strike)
      }
      dotYCenteredOnWord(nodes[n - 1])
      return
    }

    const rect = root.getBoundingClientRect()
    const vh = window.innerHeight
    const progress = Math.min(1, sectionScrollProgress(rect, vh) * SCROLL_FILL_SPEED)
    const floatIdx = progress * n

    for (let i = 0; i < n; i++) {
      const el = nodes[i]
      const lineIdx = Number(el.dataset.storyLine)
      const wi = Number(el.dataset.storyWi)
      const brand = isBrandWord(lineIdx, wi)
      const strike = STRIKETHROUGH_LINES.has(lineIdx)
      const u = Math.min(1, Math.max(0, floatIdx - i))
      const t = smoothstep01(u)
      applyWordStyle(el, t, brand, strike)
    }

    const f = Math.min(Math.max(0, floatIdx), n - 0.001)
    const i0 = Math.min(Math.floor(f), n - 1)
    const i1 = Math.min(i0 + 1, n - 1)
    const frac = f - i0
    const r0 = nodes[i0].getBoundingClientRect()
    const r1 = nodes[i1].getBoundingClientRect()
    const mid0 = r0.top + r0.height / 2
    const mid1 = r1.top + r1.height / 2
    const y0 = mid0 - railRect.top - DOT_PX / 2
    const y1 = mid1 - railRect.top - DOT_PX / 2
    let y = i0 === i1 ? y0 : y0 + (y1 - y0) * frac
    y = Math.max(0, Math.min(y, railH - DOT_PX))
    dot.style.transform = `translateY(${y}px)`
  }, [])

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      updateVisuals()
    })
  }, [updateVisuals])

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = sectionRef.current
    updateVisuals()
    requestAnimationFrame(() => updateVisuals())

    const onScroll = () => scheduleUpdate()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    const ro =
      typeof ResizeObserver !== 'undefined' && root
        ? new ResizeObserver(() => scheduleUpdate())
        : null
    if (root) ro?.observe(root)

    return () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', scheduleUpdate)
      ro?.disconnect()
    }
  }, [scheduleUpdate, updateVisuals])

  const dimCss = `rgb(${DIM[0]} ${DIM[1]} ${DIM[2]})`

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-zinc-950"
      aria-labelledby="story-reveal-heading"
    >
      <div className={landingPageGutter}>
        <div className={`relative border-x border-zinc-200 ${landingPageColumn}`}>
          <div className="mx-auto w-full max-w-[min(64rem,100%)] px-5 pt-16 pb-20 sm:px-8 sm:pt-[4.8rem] sm:pb-24 md:px-10 md:pt-[5.6rem] md:pb-28 lg:px-12 lg:pt-[6.4rem] lg:pb-32">
            <div className="mb-6 pl-8 sm:mb-8 sm:pl-9">
              <p className={storyTagPillClass}>The story</p>
            </div>
            <h2 id="story-reveal-heading" className="sr-only">
              PayGlocal Agentic Commerce story
            </h2>
            <div className="relative w-full">
              <div
                ref={railRef}
                className="pointer-events-none absolute bottom-0 left-0 top-0 w-5 sm:w-6"
                aria-hidden
              >
                <div
                  ref={dotRef}
                  className="absolute left-0 top-0 size-3 bg-blue-600 shadow-[0_0_0_1px_rgba(15,23,42,0.08)] will-change-transform"
                  style={{ transform: 'translateY(0px)' }}
                />
              </div>
              <div className="flex flex-col items-start pl-8 text-left sm:pl-9">
              {STORY_LINES.map((text, i) => {
                if (!text) {
                  return <div key={`gap-${i}`} className="h-6 w-full sm:h-7" aria-hidden />
                }
                const tokens = storyTokensForLine(text, i)
                return (
                  <p
                    key={`line-${i}`}
                    className="mb-[0.12em] w-full font-serif text-[clamp(1.75rem,4.5vw,2.85rem)] font-normal leading-[1.38] tracking-tight sm:text-[clamp(1.95rem,4vw,3.15rem)] sm:leading-[1.4] md:text-[clamp(2.1rem,3.5vw,3.45rem)] md:leading-[1.42] lg:text-[clamp(2.2rem,3.2vw,3.65rem)]"
                  >
                    {tokens.map((tok, wi) => {
                      const isStrike = STRIKETHROUGH_LINES.has(i)
                      return (
                        <span
                          key={`${i}-${wi}`}
                          data-story-word
                          data-story-line={i}
                          data-story-wi={wi}
                          className={`inline-block align-baseline will-change-[color,opacity]${isStrike ? ' story-strike' : ''}`}
                          style={{
                            color: dimCss,
                            marginRight: wi < tokens.length - 1 ? '0.3em' : undefined,
                            '--strike-w': '0%',
                          }}
                        >
                          {tok.text}
                        </span>
                      )
                    })}
                  </p>
                )
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
