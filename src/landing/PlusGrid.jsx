'use client'

import { useEffect, useRef } from 'react'

const REPEL_RADIUS = 100
const REPEL_STRENGTH = 32

export function PlusGrid({ cols = 26, rows = 14, opacity = 0.45, className = '' }) {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999, w: 0, h: 0 })
  const rafRef = useRef(0)
  const dotsRef = useRef([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    dotsRef.current = Array.from(container.querySelectorAll('[data-plus]'))

    function tick() {
      rafRef.current = 0
      const { x: mx, y: my, w, h } = mouseRef.current

      dotsRef.current.forEach((el) => {
        const dotX = (parseFloat(el.dataset.cx) / 100) * w
        const dotY = (parseFloat(el.dataset.cy) / 100) * h
        const dx = dotX - mx
        const dy = dotY - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (w > 0 && dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
          const tx = (dx / dist) * force
          const ty = (dy / dist) * force
          el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`
          el.style.opacity = String(Math.max(0.05, opacity * (dist / REPEL_RADIUS)))
        } else {
          el.style.transform = 'translate(-50%, -50%)'
          el.style.opacity = String(opacity)
        }
      })

      if (mouseRef.current.w > 0) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    function onMove(e) {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        w: rect.width,
        h: rect.height,
      }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
    }

    function onLeave() {
      const { w, h } = mouseRef.current
      mouseRef.current = { x: -9999, y: -9999, w, h }
      // run one final tick to reset all dots
      dotsRef.current.forEach((el) => {
        el.style.transform = 'translate(-50%, -50%)'
        el.style.opacity = String(opacity)
      })
      mouseRef.current = { x: -9999, y: -9999, w: 0, h: 0 }
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)
    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [opacity])

  const items = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = ((c + 0.5) / cols) * 100
      const cy = ((r + 0.5) / rows) * 100
      items.push(
        <span
          key={`${r}-${c}`}
          data-plus
          data-cx={cx}
          data-cy={cy}
          className="absolute select-none font-mono text-[11px] text-white will-change-transform"
          style={{
            left: `${cx}%`,
            top: `${cy}%`,
            transform: 'translate(-50%, -50%)',
            opacity,
            transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          +
        </span>
      )
    }
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ pointerEvents: 'auto' }}
    >
      {items}
    </div>
  )
}
