'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { RotateCcw } from 'lucide-react'

import { DemoBrandUpload } from './DemoBrandUpload'
import { HotelDemoPanel } from './HotelDemoPanel'
import { ShoppingDemoPanel } from './ShoppingDemoPanel'
import { TravelChatDemo } from './TravelChatDemo'
import { UseCaseNav } from './UseCaseNav'

export const DesktopDemoFrame = forwardRef(
  function DesktopDemoFrame(_props, ref) {
  const [useCase, setUseCase] = useState('holiday')
  const [holidaySession, setHolidaySession] = useState(0)
  const [hotelSession, setHotelSession] = useState(0)
  const [shoppingSession, setShoppingSession] = useState(0)
  const [merchantLogoDataUrl, setMerchantLogoDataUrl] = useState(null)
  const brandUploadRef = useRef(null)
  const travelRef = useRef(null)
  const useCaseRef = useRef('holiday')
  const pendingBookTripAttentionRef = useRef(false)

  useCaseRef.current = useCase

  const flushBookTripAttention = useCallback(() => {
    travelRef.current?.beginBookTripAttention()
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      beginBookTripAttention: () => {
        if (useCaseRef.current !== 'holiday') {
          pendingBookTripAttentionRef.current = true
          setUseCase('holiday')
        } else {
          queueMicrotask(flushBookTripAttention)
        }
      },
    }),
    [flushBookTripAttention],
  )

  useEffect(() => {
    if (useCase !== 'holiday' || !pendingBookTripAttentionRef.current) return
    pendingBookTripAttentionRef.current = false
    const id = requestAnimationFrame(flushBookTripAttention)
    return () => cancelAnimationFrame(id)
  }, [useCase, flushBookTripAttention])

  const onLogoChange = useCallback((url) => {
    setMerchantLogoDataUrl(url)
  }, [])

  const requestBrandUpload = useCallback(() => {
    brandUploadRef.current?.openFilePicker()
  }, [])

  return (
    <div
      className="mx-auto w-full max-w-[min(1120px,100%)] cursor-auto overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-[0_12px_42px_-14px_rgba(15,23,42,0.07)] ring-1 ring-zinc-900/[0.035]"
      data-live-demo-root
    >
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-zinc-200/80 bg-gradient-to-b from-zinc-50 via-zinc-50 to-zinc-100/90 px-2 sm:h-12 sm:px-3">
        <span className="flex shrink-0 gap-1.5 pl-1" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#e8a09c]/55 sm:size-3" />
          <span className="size-2.5 rounded-full bg-[#dcc894]/55 sm:size-3" />
          <span className="size-2.5 rounded-full bg-[#9ccfaf]/55 sm:size-3" />
        </span>
        <div className="flex min-w-0 flex-1 justify-center px-1 sm:px-2">
          <div className="h-8 w-full max-w-lg truncate rounded-lg border border-zinc-200/70 bg-white/95 px-3 text-center font-mono text-[10px] leading-8 text-zinc-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:text-[11px]">
          PayGlocal-Agentic-Commerce/Live-demo
          </div>
        </div>
        <div className="flex w-8 shrink-0 justify-end sm:w-8">
          {useCase === 'holiday' ? (
            <button
              type="button"
              onClick={() => setHolidaySession((n) => n + 1)}
              className="flex size-7 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-200/60 hover:text-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              aria-label="Reset holiday demo"
            >
              <RotateCcw className="size-3.5" strokeWidth={2} aria-hidden />
            </button>
          ) : useCase === 'hotel' ? (
            <button
              type="button"
              onClick={() => setHotelSession((n) => n + 1)}
              className="flex size-7 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-200/60 hover:text-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              aria-label="Reset hotel demo"
            >
              <RotateCcw className="size-3.5" strokeWidth={2} aria-hidden />
            </button>
          ) : useCase === 'shopping' ? (
            <button
              type="button"
              onClick={() => setShoppingSession((n) => n + 1)}
              className="flex size-7 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-200/60 hover:text-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              aria-label="Reset shopping demo"
            >
              <RotateCcw className="size-3.5" strokeWidth={2} aria-hidden />
            </button>
          ) : (
            <span className="size-7 shrink-0" aria-hidden />
          )}
        </div>
      </div>

      <div className="flex h-[min(76vh,720px)] min-h-[min(52vh,420px)] max-h-[min(88vh,820px)] min-w-0 flex-col overflow-hidden sm:h-[min(78vh,760px)] sm:min-h-[min(54vh,460px)] sm:flex-row">
        <aside className="flex min-h-0 w-full shrink-0 flex-col border-b border-zinc-200/80 bg-zinc-50/95 sm:w-[220px] sm:border-b-0 sm:border-r sm:border-zinc-200/80">
          <UseCaseNav value={useCase} onChange={setUseCase} />
          <div className="mt-auto min-h-0 shrink-0 px-3 py-3">
            <DemoBrandUpload ref={brandUploadRef} logoDataUrl={merchantLogoDataUrl} onLogoChange={onLogoChange} />
          </div>
        </aside>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {useCase === 'holiday' ? (
            <TravelChatDemo
              ref={travelRef}
              key={holidaySession}
              merchantLogoDataUrl={merchantLogoDataUrl}
              onRequestBrandUpload={requestBrandUpload}
            />
          ) : null}
          {useCase === 'hotel' ? (
            <HotelDemoPanel
              key={hotelSession}
              merchantLogoDataUrl={merchantLogoDataUrl}
              onRequestBrandUpload={requestBrandUpload}
              onSelectHoliday={() => setUseCase('holiday')}
            />
          ) : null}
          {useCase === 'shopping' ? (
            <ShoppingDemoPanel
              key={shoppingSession}
              merchantLogoDataUrl={merchantLogoDataUrl}
              onRequestBrandUpload={requestBrandUpload}
              onSelectHoliday={() => setUseCase('holiday')}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
  },
)

DesktopDemoFrame.displayName = 'DesktopDemoFrame'
