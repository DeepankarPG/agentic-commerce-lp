'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

const barcodeStrip = '/assets/barcode-transparent (1).png'

const ABC = 'abcdefghijklmnopqrstuvwxyz'
const DIGIT_LOOPS = 3
const LETTER_LOOPS = 2
/** Row height (px) — digits and letters align on one baseline strip. */
const ROW_H = 22

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

/** e.g. `14 05 2026 12 01 pm` — 12h clock, spaced like barcode human-readable line. */
function formatBarcodeLine(d) {
  const pad2 = (n) => String(n).padStart(2, '0')
  const y = d.getFullYear()
  const mo = d.getMonth() + 1
  const day = d.getDate()
  const h24 = d.getHours()
  const isAm = h24 < 12
  const h12 = h24 % 12 || 12
  const mi = d.getMinutes()
  return `${pad2(day)} ${pad2(mo)} ${y} ${pad2(h12)} ${pad2(mi)} ${isAm ? 'am' : 'pm'}`
}

function lineToTokens(line) {
  const out = []
  let i = 0
  for (const ch of line) {
    if (ch === ' ') out.push({ kind: 'space', id: `s-${i++}` })
    else if (ch >= '0' && ch <= '9') out.push({ kind: 'digit', v: Number(ch), id: `d-${i++}` })
    else if (ch >= 'a' && ch <= 'z') out.push({ kind: 'letter', v: ch, id: `l-${i++}` })
    else i++
  }
  return out
}

function DigitColumn({ digit, run, reduced, delayMs, colorClass }) {
  const rows = DIGIT_LOOPS * 10 + 10
  const end = DIGIT_LOOPS * 10 + digit
  return (
    <span
      className={`relative inline-block overflow-hidden align-baseline text-[13px] tabular-nums ${colorClass}`}
      style={{ width: '1ch', height: ROW_H }}
    >
      <span
        className="flex flex-col will-change-transform"
        style={{
          transform: reduced || run ? `translateY(-${end * ROW_H}px)` : 'translateY(0px)',
          transition:
            reduced || !run
              ? 'none'
              : `transform 1.45s cubic-bezier(0.22, 1, 0.32, 1) ${delayMs}ms`,
        }}
      >
        {Array.from({ length: rows }, (_, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center justify-center font-mono"
            style={{ height: ROW_H, minHeight: ROW_H, lineHeight: `${ROW_H}px` }}
          >
            {i % 10}
          </span>
        ))}
      </span>
    </span>
  )
}

function LetterColumn({ ch, run, reduced, delayMs, colorClass }) {
  const idx = ABC.indexOf(ch)
  const rows = LETTER_LOOPS * 26 + 26
  const end = LETTER_LOOPS * 26 + idx
  return (
    <span
      className={`relative inline-block overflow-hidden align-baseline text-[13px] ${colorClass}`}
      style={{ width: '1ch', height: ROW_H }}
    >
      <span
        className="flex flex-col will-change-transform"
        style={{
          transform: reduced || run ? `translateY(-${end * ROW_H}px)` : 'translateY(0px)',
          transition:
            reduced || !run
              ? 'none'
              : `transform 1.45s cubic-bezier(0.22, 1, 0.32, 1) ${delayMs}ms`,
        }}
      >
        {Array.from({ length: rows }, (_, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center justify-center font-mono"
            style={{ height: ROW_H, minHeight: ROW_H, lineHeight: `${ROW_H}px` }}
          >
            {ABC[i % 26] ?? '?'}
          </span>
        ))}
      </span>
    </span>
  )
}

export function FooterBarcodeDateRoller({ dark = false }) {
  const reduced = usePrefersReducedMotion()
  const hostRef = useRef(null)
  const [frozen, setFrozen] = useState(null)
  const [run, setRun] = useState(false)
  const textColor = dark ? 'text-zinc-900' : 'text-white'

  useEffect(() => {
    const root = hostRef.current
    if (!root || frozen) return

    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting)
        if (!hit) return
        obs.disconnect()
        setFrozen(new Date())
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    obs.observe(root)
    return () => obs.disconnect()
  }, [frozen])

  useEffect(() => {
    if (!frozen) return
    const id = requestAnimationFrame(() => setRun(true))
    return () => cancelAnimationFrame(id)
  }, [frozen])

  const line = useMemo(() => (frozen ? formatBarcodeLine(frozen) : ''), [frozen])
  const tokens = useMemo(() => (line ? lineToTokens(line) : []), [line])

  let rollerIndex = 0
  const stagger = 48

  return (
    <div
      ref={hostRef}
      className={`flex flex-col items-center gap-4 ${dark ? '' : 'border-b border-[#2d2d2d] px-6 py-10 sm:px-8 lg:px-10 xl:px-12'}`}
    >
      <img
        src={barcodeStrip}
        alt=""
        width={6000}
        height={1759}
        className="mx-auto block h-auto w-full max-w-[min(100%,22rem)] select-none"
        decoding="async"
        loading="lazy"
      />

      <div
        className={`flex min-h-[28px] flex-wrap items-end justify-center gap-0 font-mono text-[13px] tracking-[0.02em] ${textColor}`}
        aria-live="polite"
      >
        {frozen && (
          <span className="sr-only">
            {frozen.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}
          </span>
        )}
        {reduced && frozen ? (
          <span className={dark ? 'text-zinc-900/90' : 'text-white/90'}>{line}</span>
        ) : frozen ? (
          tokens.map((t) => {
            if (t.kind === 'space') {
              return (
                <span key={t.id} className="inline-block w-[0.45em] shrink-0" aria-hidden>
                  {' '}
                </span>
              )
            }
            if (t.kind === 'digit') {
              const delayMs = rollerIndex * stagger
              rollerIndex += 1
              return (
                <DigitColumn key={t.id} digit={t.v} run={run} reduced={reduced} delayMs={delayMs} colorClass={textColor} />
              )
            }
            const delayMs = rollerIndex * stagger
            rollerIndex += 1
            return <LetterColumn key={t.id} ch={t.v} run={run} reduced={reduced} delayMs={delayMs} colorClass={textColor} />
          })
        ) : null}
      </div>
    </div>
  )
}
