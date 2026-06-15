'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/** Live demo frame root — default cursor inside; custom cursor only outside this node. */
export const LIVE_DEMO_ROOT_SELECTOR = '[data-live-demo-root]'

function isOverLiveDemoPreview(target) {
  const el = target instanceof Element ? target : null
  return !!el?.closest(LIVE_DEMO_ROOT_SELECTOR)
}

/** Restore normal cursors on interactive nodes inside the chrome strip (headline / chrome only). */
export const TRY_IT_CURSOR_CHROME_RESET =
  '[&_button]:cursor-auto [&_a]:cursor-auto [&_textarea]:cursor-text [&_input]:cursor-text [&_select]:cursor-auto'

export function useTryItNowCursor() {
  const [cursorEnabled, setCursorEnabled] = useState(false)
  const [cursorInside, setCursorInside] = useState(false)
  const [overDemoPreview, setOverDemoPreview] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setCursorEnabled(fine.matches && !reduce.matches)
    sync()
    fine.addEventListener('change', sync)
    reduce.addEventListener('change', sync)
    return () => {
      fine.removeEventListener('change', sync)
      reduce.removeEventListener('change', sync)
    }
  }, [])

  const stopCursorLoop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = 0
  }, [])

  const cursorLoop = useCallback(() => {
    const k = 0.28
    const t = targetRef.current
    const p = posRef.current
    p.x += (t.x - p.x) * k
    p.y += (t.y - p.y) * k
    setCursorPos({ x: p.x, y: p.y })
    const err = (t.x - p.x) ** 2 + (t.y - p.y) ** 2
    if (err > 0.25) {
      rafRef.current = requestAnimationFrame(cursorLoop)
    } else {
      rafRef.current = 0
    }
  }, [])

  useEffect(() => () => stopCursorLoop(), [stopCursorLoop])

  const onSectionPointerEnter = (e) => {
    if (!cursorEnabled) return
    const { clientX, clientY } = e
    targetRef.current = { x: clientX, y: clientY }
    posRef.current = { x: clientX, y: clientY }
    setCursorPos({ x: clientX, y: clientY })
    setCursorInside(true)
    setOverDemoPreview(isOverLiveDemoPreview(e.target))
  }

  const onSectionPointerMove = (e) => {
    if (!cursorEnabled) return
    targetRef.current = { x: e.clientX, y: e.clientY }
    setOverDemoPreview(isOverLiveDemoPreview(e.target))
    if (!rafRef.current) rafRef.current = requestAnimationFrame(cursorLoop)
  }

  const onSectionPointerLeave = () => {
    setCursorInside(false)
    setOverDemoPreview(false)
    stopCursorLoop()
  }

  /** `cursor-none` only on chrome above the desktop frame — preview keeps the system cursor. */
  const chromeCursorClass = cursorEnabled ? `cursor-none ${TRY_IT_CURSOR_CHROME_RESET}` : ''

  const showTryItFollower = cursorEnabled && cursorInside && !overDemoPreview

  return {
    cursorEnabled,
    showTryItFollower,
    cursorPos,
    chromeCursorClass,
    onSectionPointerEnter,
    onSectionPointerMove,
    onSectionPointerLeave,
  }
}
