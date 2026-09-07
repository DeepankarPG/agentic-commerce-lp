'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Download, MapPin, Palmtree } from 'lucide-react'

import { AgentThinkingRow } from './AgentThinkingRow'
import { AgentAvatar } from './AgentAvatar'
import { AssistantDemoChrome } from './AssistantDemoChrome'
import {
  BookingDraftSkeleton,
  CheckoutCardSkeleton,
  PackagesGridSkeleton,
} from './DemoChatSkeletons'
import { MerchantFromLockup } from './MerchantFromLockup'
import { TRAVEL_CATALOG } from './travelCatalog'

const BOOK_MESSAGE = 'Book me a trip'

const SALES_CHAT_MAILTO =
  'mailto:sales@payglocal.com?subject=PayGlocal%20Agentic%20Commerce%20%E2%80%94%20chat%20with%20sales'
const SALES_WAITLIST_MAILTO =
  'mailto:sales@payglocal.com?subject=Waitlist%20%E2%80%94%20Agentic%20Commerce%20storefront'

/** Matches the booking draft "Travelling from" field in this scripted flow. */
const BOOKING_ORIGIN = 'Bengaluru'

function demoBookingReference(pkgId) {
  const compact = pkgId.replace(/-/g, '').toUpperCase()
  return `RES-${compact.padEnd(8, 'X').slice(0, 8)}`
}

const EXAMPLE_CARDS = [
  { icon: 'globe', text: 'Plan a 5-day Europe itinerary under ₹1.5L' },
  { icon: 'palm', text: 'Book a Goa beach weekend this Fri–Sun' },
  { icon: 'globe', text: 'Best group tours to Japan in October' },
]

/** Placeholder merchant label — dotted border, light fill (demo packages). */
function DemoStoreTag({ className, onActivate }) {
  const cls = `inline-flex max-w-full items-center rounded border border-dotted border-zinc-400 bg-zinc-100 px-1.5 py-0.5 text-[9px] font-medium leading-tight text-zinc-600 sm:text-[10px] ${className ?? ''}`
  const label = '+ Add your logo'
  if (onActivate) {
    return (
      <button
        type="button"
        onClick={onActivate}
        aria-label="Upload your logo"
        className={`${cls} cursor-pointer transition hover:border-zinc-500 hover:bg-zinc-200/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pg-primary`}
      >
        {label}
      </button>
    )
  }
  return <span className={cls}>{label}</span>
}

/** Optimised sidebar logo in package UI, or dotted placeholder when empty. */
function MerchantMark({ merchantLogoDataUrl, onRequestBrandUpload, className }) {
  if (merchantLogoDataUrl) {
    return (
      <span className={`inline-flex max-w-full items-center align-middle ${className ?? ''}`}>
        <img
          src={merchantLogoDataUrl}
          alt=""
          className="h-[1.125rem] max-w-[6.25rem] object-contain object-left sm:h-5 sm:max-w-[8rem]"
          loading="lazy"
        />
      </span>
    )
  }
  return <DemoStoreTag className={className} onActivate={onRequestBrandUpload} />
}

function SuggestionIcon({ kind }) {
  const cls = 'size-[18px] shrink-0 text-zinc-800'
  if (kind === 'palm') {
    return <Palmtree className={cls} strokeWidth={1.65} aria-hidden />
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" />
    </svg>
  )
}

function UserBubble({ children }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[88%] rounded-2xl border border-zinc-200/80 bg-white px-3.5 py-2.5 text-[13px] leading-snug text-zinc-800 shadow-sm sm:max-w-[85%]">
        {children}
      </div>
    </div>
  )
}

/** Echo avatar only on the latest assistant turn; spacer keeps text aligned. */
function AssistantRow({ children, showAvatar }) {
  return (
    <div className="flex gap-2 sm:gap-2.5">
      {showAvatar ? (
        <AgentAvatar size="sm" className="mt-0.5" />
      ) : (
        <span className="mt-0.5 size-7 shrink-0 sm:size-7" aria-hidden />
      )}
      <div className="min-w-0 flex-1 space-y-2 pt-0.5">{children}</div>
    </div>
  )
}

function IconGlobeCard({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" />
    </svg>
  )
}

function IconHomeCard({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
    </svg>
  )
}

function PackageCover({ src, title }) {
  return (
    <div className="relative h-24 w-full overflow-hidden border-b border-zinc-200/80 bg-zinc-100">
      <img src={src} alt="" width={400} height={96} className="h-full w-full object-cover" loading="lazy" decoding="async" />
      <span className="sr-only">{title}</span>
    </div>
  )
}

export const TravelChatDemo = forwardRef(function TravelChatDemo(
  { merchantLogoDataUrl = null, onRequestBrandUpload },
  ref,
) {
  const [phase, setPhase] = useState(0)
  const [region, setRegion] = useState(null)
  const [pkg, setPkg] = useState(null)
  const [initialUserMessage, setInitialUserMessage] = useState(BOOK_MESSAGE)
  const [turn, setTurn] = useState(null)
  const [turnKey, setTurnKey] = useState(0)
  const commitRef = useRef(null)
  const timerRef = useRef(null)
  const messagesScrollRef = useRef(null)

  const isBusy = turn !== null

  const scheduleTurn = useCallback((opts) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    const { commit, ...snap } = opts
    commitRef.current = commit
    setTurnKey((k) => k + 1)
    setTurn(snap)
    const delay = 2200 + Math.floor(Math.random() * 800)
    timerRef.current = window.setTimeout(() => {
      commitRef.current?.()
      commitRef.current = null
      setTurn(null)
      timerRef.current = null
    }, delay)
  }, [])

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    [],
  )

  const packages = useMemo(() => (region ? TRAVEL_CATALOG[region] : []), [region])

  const regionLabel = region === 'international' ? 'International' : region === 'domestic' ? 'Domestic' : ''

  const startWelcomeTurn = useCallback(
    (userText) => {
      if (turn !== null) return
      scheduleTurn({
        userText,
        lineSet: 'journey',
        skeleton: null,
        fromWelcome: true,
        commit: () => {
          setInitialUserMessage(userText)
          setPhase(1)
        },
      })
    },
    [turn, scheduleTurn],
  )

  const startTrip = useCallback(() => {
    startWelcomeTurn(BOOK_MESSAGE)
  }, [startWelcomeTurn])

  useImperativeHandle(
    ref,
    () => ({
      beginBookTripAttention: () => {
        if (phase !== 0) return
        if (turn !== null) return
        startTrip()
      },
    }),
    [phase, turn, startTrip],
  )

  useEffect(() => {
    if (phase === 0 && !turn) return
    const pane = messagesScrollRef.current
    if (!pane) return
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        pane.scrollTo({ top: pane.scrollHeight, behavior: 'smooth' })
      })
    })
    return () => cancelAnimationFrame(id)
  }, [phase, turn])

  return (
    <AssistantDemoChrome
      hideFooter={phase === 0 && !turn?.fromWelcome}
      messagesScrollRef={messagesScrollRef}
    >
      {phase === 0 && !turn ? (
        <div className="flex min-h-0 flex-1 flex-col justify-center py-6 sm:py-8">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-3 text-center sm:px-6">
            <AgentAvatar size="hero" className="mt-0.5" />
            <h2 className="mt-5 font-serif text-[clamp(1.3rem,3.8vw,1.75rem)] font-normal tracking-tight text-zinc-900 sm:mt-6">
              Plan your next trip
            </h2>
            <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed tracking-normal text-zinc-600 sm:text-[14px]">
              Your next getaway is one conversation away.
            </p>

            <div className="mt-6 w-full max-w-xl rounded-3xl border border-zinc-200/80 bg-white p-2 sm:mt-7">
              <div className="flex items-center gap-2 rounded-2xl border border-zinc-100 bg-zinc-50/90 px-4 py-3 sm:py-3.5">
                <span className="min-w-0 flex-1 text-left text-[14px] font-normal tracking-wide text-zinc-800 sm:text-[15px]">
                  {BOOK_MESSAGE}
                </span>
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={startTrip}
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-pg-primary text-[15px] font-semibold leading-none text-white transition hover:bg-pg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pg-primary disabled:pointer-events-none disabled:opacity-40"
                  aria-label="Send message"
                >
                  ↑
                </button>
              </div>
            </div>

            <p className="mt-10 text-[9px] font-medium uppercase tracking-[0.24em] text-zinc-400 sm:mt-12 sm:text-[10px]">
              Get started with an example below
            </p>
            <div className="mt-3 flex w-full max-w-3xl justify-center gap-2 sm:mt-4 sm:gap-3">
              {EXAMPLE_CARDS.map((c) => (
                <button
                  key={c.text}
                  type="button"
                  disabled={isBusy}
                  onClick={() => startWelcomeTurn(c.text)}
                  className="group relative min-h-[5.25rem] min-w-0 flex-1 basis-0 rounded-xl border border-zinc-200/90 bg-white p-3 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 disabled:pointer-events-none disabled:opacity-40 sm:min-h-[5.5rem] sm:p-3.5"
                >
                  <span className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800 ring-1 ring-zinc-200/80">
                    <SuggestionIcon kind={c.icon} />
                  </span>
                  <span className="mt-2 block pr-5 text-[11px] font-normal leading-relaxed tracking-[0.03em] text-zinc-600 sm:text-[12px] sm:tracking-[0.025em]">
                    {c.text}
                  </span>
                  <span
                    className="pointer-events-none absolute bottom-2.5 right-2.5 text-[12px] font-normal text-zinc-500 sm:bottom-3 sm:right-3"
                    aria-hidden
                  >
                    ↗
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : phase === 0 && turn?.fromWelcome ? (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 sm:gap-4">
          <UserBubble>{turn.userText}</UserBubble>
          <AgentThinkingRow key={turnKey} variant="journey" />
        </div>
      ) : (
        <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:gap-4">
          <UserBubble>{initialUserMessage}</UserBubble>
          <AssistantRow showAvatar={phase === 1}>
            <p className="text-[13px] leading-relaxed text-zinc-700 sm:text-[14px]">
              Great. Are you thinking international travel, or staying domestic?
            </p>
            {phase === 1 ? (
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => {
                    if (turn) return
                    scheduleTurn({
                      userText: 'International',
                      lineSet: 'journey',
                      skeleton: 'packages',
                      fromWelcome: false,
                      commit: () => {
                        setRegion('international')
                        setPhase(2)
                      },
                    })
                  }}
                  className="rounded-xl border border-zinc-200/90 bg-white p-3 text-left shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 disabled:pointer-events-none disabled:opacity-40 sm:p-3.5"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800 ring-1 ring-zinc-200/80">
                    <IconGlobeCard className="text-zinc-800" />
                  </span>
                  <p className="mt-2 text-[13px] font-semibold text-zinc-900">International</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">
                    Long-haul and regional bundles with clear inclusions.
                  </p>
                </button>
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => {
                    if (turn) return
                    scheduleTurn({
                      userText: 'Domestic',
                      lineSet: 'journey',
                      skeleton: 'packages',
                      fromWelcome: false,
                      commit: () => {
                        setRegion('domestic')
                        setPhase(2)
                      },
                    })
                  }}
                  className="rounded-xl border border-zinc-200/90 bg-white p-3 text-left shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 disabled:pointer-events-none disabled:opacity-40 sm:p-3.5"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800 ring-1 ring-zinc-200/80">
                    <IconHomeCard className="text-zinc-800" />
                  </span>
                  <p className="mt-2 text-[13px] font-semibold text-zinc-900">Domestic</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">
                    Weekends and routes inside your home market.
                  </p>
                </button>
              </div>
            ) : null}
          </AssistantRow>

          {phase >= 2 && region ? (
            <>
              <UserBubble>{regionLabel}</UserBubble>
              <AssistantRow showAvatar={phase === 2}>
                <p className="text-[13px] leading-relaxed text-zinc-700 sm:text-[14px]">
                  Here are curated packages for that scope. Tap <span className="font-medium">Select</span>{' '}
                  on the one you want to hold for checkout.
                </p>
                <div className="rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-sm sm:p-4">
                  <p className="mb-2 flex flex-wrap items-center gap-x-1.5 gap-y-1.5 text-[11px] font-medium text-zinc-600 sm:text-[12px]">
                    <span>
                      Showing <strong className="text-zinc-800">{packages.length}</strong> packages from
                    </span>
                    <MerchantMark
                      merchantLogoDataUrl={merchantLogoDataUrl}
                      onRequestBrandUpload={onRequestBrandUpload}
                    />
                  </p>
                  <div className="flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3">
                    {packages.map((p) => (
                      <article
                        key={p.id}
                        className="w-[min(200px,72vw)] shrink-0 overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-sm"
                      >
                        <PackageCover src={p.coverSrc} title={p.title} />
                        <div className="space-y-1 p-2.5 sm:p-3">
                          <h3 className="text-[12px] font-semibold leading-tight text-zinc-900 sm:text-[13px]">
                            {p.title}
                          </h3>
                          <p className="text-[10px] text-zinc-500 sm:text-[11px]">{p.place}</p>
                          <p className="text-[10px] text-zinc-500 sm:text-[11px]">{p.duration}</p>
                          <div className="flex items-end justify-between gap-2 pt-1">
                            <div className="min-w-0 flex-1 space-y-0.5">
                              <p className="text-[13px] font-semibold text-emerald-700 sm:text-[14px]">
                                {p.price}
                              </p>
                              <MerchantFromLockup className="mt-0.5">
                                <MerchantMark
                                  merchantLogoDataUrl={merchantLogoDataUrl}
                                  onRequestBrandUpload={onRequestBrandUpload}
                                />
                              </MerchantFromLockup>
                            </div>
                            <button
                              type="button"
                              disabled={phase > 2 || isBusy}
                              onClick={() => {
                                if (turn) return
                                scheduleTurn({
                                  userText: p.title,
                                  lineSet: 'journey',
                                  skeleton: 'draft',
                                  fromWelcome: false,
                                  commit: () => {
                                    setPkg(p)
                                    setPhase(3)
                                  },
                                })
                              }}
                              className="shrink-0 rounded-lg bg-pg-primary px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm transition hover:bg-pg-primary-hover disabled:pointer-events-none disabled:opacity-45 sm:px-3 sm:py-1.5 sm:text-[11px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pg-primary"
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </AssistantRow>
            </>
          ) : null}

          {phase >= 3 && pkg ? (
            <>
              <UserBubble>{pkg.title}</UserBubble>
              <AssistantRow showAvatar={phase === 3}>
                <p className="text-[13px] leading-relaxed text-zinc-700 sm:text-[14px]">
                  Perfect—here is a booking draft with typical fields. When you continue, we will show
                  how payment is summarised before capture.
                </p>
                <div className="rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-sm sm:p-4">
                  <div className="flex gap-3 border-b border-zinc-100 pb-3">
                    <img
                      src={pkg.coverSrc}
                      alt=""
                      width={64}
                      height={64}
                      className="size-16 shrink-0 rounded-lg object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        Tour booking
                      </p>
                      <p className="mt-1 text-[14px] font-semibold text-zinc-900">{pkg.title}</p>
                      <p className="mt-0.5 text-[12px] text-zinc-500">
                        {pkg.place} · {pkg.duration} · {pkg.price}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-400">
                        Travelling from
                      </p>
                      <p className="mt-0.5 rounded-lg border border-zinc-200/80 bg-zinc-50 px-2.5 py-1.5 text-[12px] text-zinc-800">
                        Bengaluru
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-400">
                        Travel date
                      </p>
                      <p className="mt-0.5 rounded-lg border border-zinc-200/80 bg-zinc-50 px-2.5 py-1.5 text-[12px] text-zinc-800">
                        15 May 2026
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-zinc-500">1 adult · 0 children</p>
                  <div className="mt-3 border-t border-zinc-100 pt-3">
                    <MerchantFromLockup>
                      <MerchantMark
                        merchantLogoDataUrl={merchantLogoDataUrl}
                        onRequestBrandUpload={onRequestBrandUpload}
                      />
                    </MerchantFromLockup>
                  </div>
                  {phase === 3 ? (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => {
                        if (turn) return
                        scheduleTurn({
                          userText: 'Continue',
                          lineSet: 'journey',
                          skeleton: 'checkout',
                          fromWelcome: false,
                          commit: () => setPhase(4),
                        })
                      }}
                      className="mt-3 w-full rounded-xl bg-pg-primary py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-pg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pg-primary disabled:pointer-events-none disabled:opacity-40"
                    >
                      Continue
                    </button>
                  ) : null}
                  <p className="mt-2 text-[10px] text-zinc-400">You can adjust details before payment.</p>
                </div>
              </AssistantRow>
            </>
          ) : null}

          {phase >= 4 && pkg ? (
            <>
              <UserBubble>Continue</UserBubble>
              <AssistantRow showAvatar={phase === 4}>
              <p className="text-[13px] leading-relaxed text-zinc-700 sm:text-[14px]">
                Here is the amount due on your checkout rails. Confirm to complete this preview booking.
              </p>
              <div className="rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-sm sm:p-4">
                <div className="border-b border-zinc-100 pb-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 gap-3">
                      <img
                        src={pkg.coverSrc}
                        alt=""
                        width={56}
                        height={56}
                        className="size-14 shrink-0 rounded-lg object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                          Trip
                        </p>
                        <p className="text-[14px] font-semibold text-zinc-900">{pkg.title}</p>
                        <p className="text-[12px] text-zinc-500">{pkg.place}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        Total
                      </p>
                      <p className="text-[18px] font-semibold text-pg-primary">{pkg.price}</p>
                      <p className="text-[10px] text-zinc-500">Taxes where applicable</p>
                    </div>
                  </div>
                  <div className="mt-3 border-t border-zinc-100 pt-3">
                    <MerchantFromLockup>
                      <MerchantMark
                        merchantLogoDataUrl={merchantLogoDataUrl}
                        onRequestBrandUpload={onRequestBrandUpload}
                      />
                    </MerchantFromLockup>
                  </div>
                </div>
                {phase === 4 ? (
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => {
                      if (turn) return
                      scheduleTurn({
                        userText: 'Confirm payment',
                        lineSet: 'payment',
                        skeleton: null,
                        fromWelcome: false,
                        commit: () => setPhase(5),
                      })
                    }}
                    className="mt-3 w-full rounded-xl bg-pg-primary py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-pg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pg-primary disabled:pointer-events-none disabled:opacity-40"
                  >
                    Confirm payment
                  </button>
                ) : null}
              </div>
            </AssistantRow>
            </>
          ) : null}

          {phase >= 5 && pkg && region ? (
            <>
              <UserBubble>Confirm payment</UserBubble>
              <AssistantRow showAvatar={false}>
                <div className="space-y-3">
                  <p className="text-[13px] leading-relaxed text-zinc-700 sm:text-[14px]">
                    Payment cleared—your booking is confirmed. Here&apos;s a single view with trip and receipt
                    details you can keep in this thread or forward on.
                  </p>
                  <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200/90 bg-white sm:max-w-lg">
                <div className="border-b border-zinc-100 px-4 pb-5 pt-6 text-center sm:px-6 sm:pb-6 sm:pt-7">
                  <div
                    className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm ring-4 ring-emerald-500/15 sm:size-14"
                    aria-hidden
                  >
                    <svg
                      className="size-6 sm:size-7"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-[17px] font-semibold leading-tight tracking-tight text-zinc-900 sm:text-[18px]">
                    Booking confirmed
                  </h3>
                  <p className="mx-auto mt-2 max-w-[22rem] text-[13px] leading-relaxed text-zinc-600 sm:text-[14px]">
                    You&apos;re set for {pkg.title}. We&apos;ll email your confirmation shortly.
                  </p>
                  <span className="mt-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
                    Payment successful
                  </span>
                </div>

                <div className="space-y-4 p-4 sm:p-5">
                  <div className="rounded-xl border border-zinc-200/90 p-3.5 sm:p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                      Trip details
                    </p>
                    <div className="mt-2 flex items-start justify-between gap-3">
                      <p className="min-w-0 text-[15px] font-semibold leading-snug text-zinc-900 sm:text-[16px]">
                        {pkg.title}
                      </p>
                      <button
                        type="button"
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-zinc-200/90 bg-white px-2 py-1 text-[11px] font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pg-primary"
                        aria-label="Download itinerary PDF (demo)"
                      >
                        <Download className="size-3.5 text-zinc-500" strokeWidth={2} aria-hidden />
                        PDF
                      </button>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <div className="flex w-5 shrink-0 flex-col items-center pt-0.5">
                        <span className="size-2 rounded-full bg-pg-primary ring-2 ring-white" aria-hidden />
                        <div className="my-1 min-h-[1.75rem] w-px flex-1 bg-zinc-200" aria-hidden />
                        <MapPin className="size-4 text-zinc-400" strokeWidth={1.75} aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1 space-y-4">
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">From</p>
                          <p className="mt-0.5 text-[13px] font-semibold text-zinc-900">{BOOKING_ORIGIN}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">To</p>
                          <p className="mt-0.5 text-[13px] font-semibold text-zinc-900">{pkg.place}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-0 border-t border-zinc-100">
                      <div className="flex items-center justify-between gap-3 border-b border-zinc-100 py-3">
                        <span className="text-[12px] text-zinc-500">Duration</span>
                        <span className="text-right text-[12px] font-semibold text-zinc-900">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 py-3">
                        <span className="text-[12px] text-zinc-500">Package</span>
                        <span className="text-right text-[12px] font-semibold capitalize text-zinc-900">
                          {region === 'international' ? 'international' : 'domestic'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-zinc-100 pt-3">
                      <MerchantFromLockup>
                        <MerchantMark
                          merchantLogoDataUrl={merchantLogoDataUrl}
                          onRequestBrandUpload={onRequestBrandUpload}
                        />
                      </MerchantFromLockup>
                    </div>
                  </div>

                  <div className="rounded-xl border border-zinc-200/90 p-3.5 sm:p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-pg-primary">
                      Payment details
                    </p>
                    <div className="mt-2 border-t border-dotted border-zinc-300 pt-3">
                      <div className="grid grid-cols-3 gap-3 text-center sm:gap-4">
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">Amount</p>
                          <p className="mt-1 text-[12px] font-semibold text-zinc-900 sm:text-[13px]">{pkg.price}</p>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">
                            Reference
                          </p>
                          <p className="mt-1 truncate text-[11px] font-semibold text-zinc-900 sm:text-[12px]">
                            {demoBookingReference(pkg.id)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">
                            Reason code
                          </p>
                          <p className="mt-1 text-[11px] font-semibold text-zinc-900 sm:text-[12px]">GL-201-001</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                  </div>
                </div>
              </AssistantRow>
              <AssistantRow showAvatar>
                <div className="space-y-3">
                  <p className="text-[13px] leading-relaxed text-zinc-700 sm:text-[14px]">
                    <span className="font-medium text-zinc-800">Want your store to be AI-ready?</span>{' '}
                    Talk to our team or join the waitlist.
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-start sm:gap-3">
                    <a
                      href={SALES_WAITLIST_MAILTO}
                      className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-300/90 bg-white px-4 py-2.5 text-center text-[13px] font-semibold text-zinc-800 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 sm:w-auto sm:min-w-[10.5rem]"
                    >
                      Join the waitlist
                    </a>
                    <a
                      href={SALES_CHAT_MAILTO}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-pg-primary px-4 py-2.5 text-center text-[13px] font-semibold text-white shadow-sm transition hover:bg-pg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pg-primary sm:w-auto sm:min-w-[10.5rem]"
                    >
                      Chat with our team
                    </a>
                  </div>
                </div>
              </AssistantRow>
            </>
          ) : null}

          {turn && !turn.fromWelcome ? (
            <>
              <UserBubble>{turn.userText}</UserBubble>
              <AgentThinkingRow
                key={turnKey}
                variant={turn.lineSet}
                charMs={turn.skeleton ? 26 : 31}
              />
              {turn.skeleton === 'packages' ? (
                <AssistantRow showAvatar={false}>
                  <PackagesGridSkeleton />
                </AssistantRow>
              ) : null}
              {turn.skeleton === 'draft' ? (
                <AssistantRow showAvatar={false}>
                  <BookingDraftSkeleton />
                </AssistantRow>
              ) : null}
              {turn.skeleton === 'checkout' ? (
                <AssistantRow showAvatar={false}>
                  <CheckoutCardSkeleton />
                </AssistantRow>
              ) : null}
            </>
          ) : null}
        </div>
      )}
    </AssistantDemoChrome>
  )
})

TravelChatDemo.displayName = 'TravelChatDemo'
