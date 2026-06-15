'use client'

import { useEffect, useState } from 'react'

import { AgentAvatar } from './AgentAvatar'

const JOURNEY_LINES = [
  'Mapping out your journey…',
  'Thinking through your plan…',
  'Putting it together…',
  'Working on it…',
]

const PAYMENT_LINES = [
  'Securing your payment…',
  'Waiting on your bank…',
  'Almost there — hang tight…',
  'Finishing authentication…',
]

const HOLD_MS = 1000

export function AgentThinkingRow({ variant, charMs = 31 }) {
  const lines = variant === 'payment' ? PAYMENT_LINES : JOURNEY_LINES
  const [reduced, setReduced] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)
  const [visibleLen, setVisibleLen] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const line = lines[lineIndex]
    if (!line) return

    if (reduced) {
      setVisibleLen(line.length)
      const hold = window.setTimeout(() => {
        setLineIndex((i) => (i + 1) % lines.length)
        setVisibleLen(0)
      }, HOLD_MS + 400)
      return () => window.clearTimeout(hold)
    }

    setVisibleLen(0)
    let n = 0
    const tick = window.setInterval(() => {
      n += 1
      setVisibleLen(n)
      if (n >= line.length) {
        window.clearInterval(tick)
      }
    }, charMs)

    const hold = window.setTimeout(
      () => {
        window.clearInterval(tick)
        setLineIndex((i) => (i + 1) % lines.length)
      },
      line.length * charMs + HOLD_MS,
    )

    return () => {
      window.clearInterval(tick)
      window.clearTimeout(hold)
    }
  }, [lineIndex, lines, charMs, reduced])

  const line = lines[lineIndex] ?? ''
  const shown = line.slice(0, visibleLen)

  return (
    <div className="flex gap-2 sm:gap-2.5" aria-live="polite" aria-busy="true">
      <AgentAvatar size="sm" className="mt-0.5 shrink-0 opacity-90" />
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="min-h-[1.25rem] text-[13px] leading-relaxed text-zinc-600 sm:text-[14px]">
          {shown}
          <span
            className="ml-px inline-block h-[1em] w-px translate-y-px animate-pulse bg-pg-primary align-middle"
            aria-hidden
          />
        </p>
      </div>
    </div>
  )
}
