'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Headphones, Waves, Zap } from 'lucide-react'

import { AgentThinkingRow } from './AgentThinkingRow'
import { AgentAvatar } from './AgentAvatar'
import { AssistantDemoChrome } from './AssistantDemoChrome'
import {
  CheckoutCardSkeleton,
  PdpControlsSkeleton,
  ShoppingCartSkeleton,
} from './DemoChatSkeletons'
import {
  EARPHONE_PRODUCT,
  demoOrderRef,
  formatInr,
  grandTotalInr,
  lineSubtotalInr,
  unitPriceInr,
  variantById,
  variantProductImage,
} from './shoppingCatalog'
import { MerchantFromLockup } from './MerchantFromLockup'

const OPEN_MESSAGE = 'Show me wireless earphones'

const SALES_CHAT_MAILTO =
  'mailto:sales@payglocal.com?subject=PayGlocal%20Agentic%20Commerce%20%E2%80%94%20chat%20with%20sales'
const SALES_WAITLIST_MAILTO =
  'mailto:sales@payglocal.com?subject=Waitlist%20%E2%80%94%20Agentic%20Commerce%20storefront'

const EXAMPLE_CARDS = [
  { icon: 'headphones', text: 'ANC earbuds under ₹8k with fast charging' },
  { icon: 'zap', text: 'Gym-ready buds with secure fit for HIIT' },
  { icon: 'waves', text: 'Compare two models for commute vs travel' },
]

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
  if (kind === 'zap') return <Zap className={cls} strokeWidth={1.65} aria-hidden />
  if (kind === 'waves') return <Waves className={cls} strokeWidth={1.65} aria-hidden />
  return <Headphones className={cls} strokeWidth={1.65} aria-hidden />
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

function minUnitPriceInr() {
  return Math.min(...EARPHONE_PRODUCT.variants.map((v) => unitPriceInr(v)))
}

export function ShoppingChatDemo({
  merchantLogoDataUrl = null,
  onRequestBrandUpload,
  onSelectHoliday,
}) {
  const [phase, setPhase] = useState(0)
  const [variantId, setVariantId] = useState(EARPHONE_PRODUCT.variants[0].id)
  const [qty, setQty] = useState(1)
  const [carePlan, setCarePlan] = useState(false)
  const [orderRef] = useState(() => demoOrderRef())
  const [initialUserMessage, setInitialUserMessage] = useState(OPEN_MESSAGE)
  const [turn, setTurn] = useState(null)
  const [turnKey, setTurnKey] = useState(0)
  const commitRef = useRef(null)
  const timerRef = useRef(null)
  const messagesScrollRef = useRef(null)

  const isBusy = turn !== null

  const variant = useMemo(
    () => variantById(variantId) ?? EARPHONE_PRODUCT.variants[0],
    [variantId],
  )

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

  const openShop = useCallback(() => {
    startWelcomeTurn(OPEN_MESSAGE)
  }, [startWelcomeTurn])

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

  const fromLabel = `From ${formatInr(minUnitPriceInr())}`

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
              Shop our partner&apos;s storefront
            </h2>
            <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed tracking-normal text-zinc-600 sm:text-[14px]">
              Your next purchase is one conversation away.
            </p>

            <div className="mt-6 w-full max-w-xl rounded-3xl border border-zinc-200/80 bg-white p-2 sm:mt-7">
              <div className="flex items-center gap-2 rounded-2xl border border-zinc-100 bg-zinc-50/90 px-4 py-3 sm:py-3.5">
                <span className="min-w-0 flex-1 text-left text-[14px] font-normal tracking-wide text-zinc-800 sm:text-[15px]">
                  {OPEN_MESSAGE}
                </span>
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={openShop}
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
            {onSelectHoliday ? (
              <button
                type="button"
                onClick={onSelectHoliday}
                className="mt-10 text-[11px] font-medium text-zinc-500 underline-offset-2 transition hover:text-zinc-800 hover:underline sm:mt-12"
              >
                Prefer the holiday booking demo?
              </button>
            ) : null}
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
              Here&apos;s our top pick for wireless ANC in your range—configure colour and quantity, then we&apos;ll
              hold your bag for checkout.
            </p>
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-sm sm:p-4">
              <p className="mb-2 flex flex-wrap items-center gap-x-1.5 gap-y-1.5 text-[11px] font-medium text-zinc-600 sm:text-[12px]">
                <span>
                  Showing <strong className="text-zinc-800">1</strong> product from
                </span>
                <MerchantMark merchantLogoDataUrl={merchantLogoDataUrl} onRequestBrandUpload={onRequestBrandUpload} />
              </p>
              <div className="overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-sm">
                <div className="relative h-36 w-full overflow-hidden border-b border-zinc-200/80 bg-zinc-100 sm:h-40">
                  <img
                    src={EARPHONE_PRODUCT.coverSrc}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="space-y-2 p-3 sm:p-4">
                  <h3 className="text-[14px] font-semibold leading-tight text-zinc-900 sm:text-[15px]">
                    {EARPHONE_PRODUCT.title}
                  </h3>
                  <p className="text-[11px] leading-snug text-zinc-500 sm:text-[12px]">{EARPHONE_PRODUCT.subtitle}</p>
                  <div className="flex items-end justify-between gap-3 pt-1">
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-emerald-700 sm:text-[15px]">{fromLabel}</p>
                      <p className="text-[9px] text-zinc-500">per unit · incl. GST where shown</p>
                      <MerchantFromLockup className="mt-1.5">
                        <MerchantMark
                          merchantLogoDataUrl={merchantLogoDataUrl}
                          onRequestBrandUpload={onRequestBrandUpload}
                        />
                      </MerchantFromLockup>
                    </div>
                    {phase === 1 ? (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => {
                          if (turn) return
                          scheduleTurn({
                            userText: `Configure · ${EARPHONE_PRODUCT.title}`,
                            lineSet: 'journey',
                            skeleton: 'pdp',
                            fromWelcome: false,
                            commit: () => {
                              setVariantId(EARPHONE_PRODUCT.variants[0].id)
                              setQty(1)
                              setPhase(2)
                            },
                          })
                        }}
                        className="shrink-0 rounded-xl bg-pg-primary px-3 py-2 text-[11px] font-semibold text-white shadow-sm transition hover:bg-pg-primary-hover disabled:pointer-events-none disabled:opacity-40 sm:px-4 sm:text-[12px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pg-primary"
                      >
                        Continue
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </AssistantRow>

          {phase >= 2 ? (
            <>
              <UserBubble>{`Configure · ${EARPHONE_PRODUCT.title}`}</UserBubble>
              <AssistantRow showAvatar={phase === 2}>
                <p className="text-[13px] leading-relaxed text-zinc-700 sm:text-[14px]">
                  Choose your finish and how many you want—we&apos;ll price the line before you add to bag.
                </p>
                <div className="rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-sm sm:p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl border border-zinc-100 bg-zinc-100 sm:h-36 sm:w-36">
                      <img
                        src={variantProductImage(variantId)}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 flex-1 space-y-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Colour</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {EARPHONE_PRODUCT.variants.map((v) => (
                            <button
                              key={v.id}
                              type="button"
                              disabled={isBusy || phase > 2}
                              onClick={() => setVariantId(v.id)}
                              className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition sm:text-[12px] ${
                                variantId === v.id
                                  ? 'border-pg-primary bg-pg-primary/10 text-pg-primary ring-1 ring-pg-primary/25'
                                  : 'border-zinc-200/90 bg-zinc-50 text-zinc-800 hover:border-zinc-300'
                              } disabled:opacity-45`}
                            >
                              {v.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Quantity</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            disabled={isBusy || phase > 2 || qty <= 1}
                            onClick={() => setQty((q) => Math.max(1, q - 1))}
                            className="flex size-9 items-center justify-center rounded-lg border border-zinc-200/90 bg-white text-[15px] font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="min-w-[2.25rem] text-center text-[14px] font-semibold tabular-nums text-zinc-900">
                            {qty}
                          </span>
                          <button
                            type="button"
                            disabled={isBusy || phase > 2 || qty >= 5}
                            onClick={() => setQty((q) => Math.min(5, q + 1))}
                            className="flex size-9 items-center justify-center rounded-lg border border-zinc-200/90 bg-white text-[15px] font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 space-y-3 border-t border-zinc-100 pt-3">
                        <MerchantFromLockup>
                          <MerchantMark
                            merchantLogoDataUrl={merchantLogoDataUrl}
                            onRequestBrandUpload={onRequestBrandUpload}
                          />
                        </MerchantFromLockup>
                        <div className="flex flex-wrap items-end justify-between gap-2">
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">Line subtotal</p>
                          <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            <p className="text-[18px] font-semibold tabular-nums text-pg-primary">
                              {formatInr(lineSubtotalInr(variant, qty))}
                            </p>
                            <p className="text-[10px] tabular-nums text-zinc-500">
                              {formatInr(unitPriceInr(variant))} × {qty}
                            </p>
                          </div>
                        </div>
                        {phase === 2 ? (
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => {
                              if (turn) return
                              scheduleTurn({
                                userText: `${variant.label} · Qty ${qty}`,
                                lineSet: 'journey',
                                skeleton: 'cart',
                                fromWelcome: false,
                                commit: () => {
                                  setCarePlan(false)
                                  setPhase(3)
                                },
                              })
                            }}
                            className="shrink-0 rounded-xl bg-pg-primary px-4 py-2.5 text-[12px] font-semibold text-white shadow-sm transition hover:bg-pg-primary-hover disabled:pointer-events-none disabled:opacity-40 sm:text-[13px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pg-primary"
                          >
                            Add to bag
                          </button>
                        ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AssistantRow>
            </>
          ) : null}

          {phase >= 3 ? (
            <>
              <UserBubble>{`${variant.label} · Qty ${qty}`}</UserBubble>
              <AssistantRow showAvatar={phase === 3}>
                <p className="text-[13px] leading-relaxed text-zinc-700 sm:text-[14px]">
                  Your bag is ready. Add optional protection, then continue to rails for payment.
                </p>
                <div className="rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-sm sm:p-4">
                  <div className="border-b border-zinc-100 pb-3">
                    <div className="flex gap-3">
                      <img
                        src={variantProductImage(variantId)}
                        alt=""
                        className="size-14 shrink-0 rounded-lg object-cover"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Line item</p>
                        <p className="mt-0.5 text-[13px] font-semibold text-zinc-900">{EARPHONE_PRODUCT.title}</p>
                        <p className="text-[11px] text-zinc-500">
                          {variant.label} · Qty {qty}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Subtotal</p>
                        <p className="mt-0.5 text-[14px] font-semibold text-zinc-900">
                          {formatInr(lineSubtotalInr(variant, qty))}
                        </p>
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
                  <label className="mt-3 flex cursor-pointer items-start gap-2.5 rounded-xl border border-zinc-100 bg-zinc-50/80 px-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={carePlan}
                      disabled={isBusy || phase > 3}
                      onChange={(e) => setCarePlan(e.target.checked)}
                      className="mt-0.5 size-4 shrink-0 rounded border-zinc-300 text-pg-primary focus:ring-pg-primary"
                    />
                    <span className="min-w-0 text-left">
                      <span className="text-[12px] font-semibold text-zinc-900">2-year care plan</span>
                      <span className="mt-0.5 block text-[11px] text-zinc-500">
                        Drops, spills, and one battery swap — {formatInr(EARPHONE_PRODUCT.carePlanPrice)} one-time
                      </span>
                    </span>
                  </label>
                  <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3">
                    <span className="text-[12px] font-medium text-zinc-600">Estimated total</span>
                    <span className="text-[16px] font-semibold text-pg-primary">
                      {formatInr(grandTotalInr(variant, qty, carePlan))}
                    </span>
                  </div>
                  {phase === 3 ? (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => {
                        if (turn) return
                        scheduleTurn({
                          userText: 'Continue to checkout',
                          lineSet: 'journey',
                          skeleton: 'checkout',
                          fromWelcome: false,
                          commit: () => setPhase(4),
                        })
                      }}
                      className="mt-3 w-full rounded-xl bg-pg-primary py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-pg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pg-primary disabled:pointer-events-none disabled:opacity-40"
                    >
                      Continue to checkout
                    </button>
                  ) : null}
                </div>
              </AssistantRow>
            </>
          ) : null}

          {phase >= 4 ? (
            <>
              <UserBubble>Continue to checkout</UserBubble>
              <AssistantRow showAvatar={phase === 4}>
                <p className="text-[13px] leading-relaxed text-zinc-700 sm:text-[14px]">
                  You&apos;re on PayGlocal rails—confirm to place this preview order.
                </p>
                <div className="rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-sm sm:p-4">
                  <div className="border-b border-zinc-100 pb-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex min-w-0 gap-3">
                        <img
                          src={variantProductImage(variantId)}
                          alt=""
                          className="size-14 shrink-0 rounded-lg object-cover"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Checkout</p>
                          <p className="text-[14px] font-semibold text-zinc-900">{EARPHONE_PRODUCT.title}</p>
                          <p className="text-[12px] text-zinc-500">
                            {variant.label} · {qty} units
                            {carePlan ? ' · Care plan' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Total</p>
                        <p className="text-[18px] font-semibold text-pg-primary">
                          {formatInr(grandTotalInr(variant, qty, carePlan))}
                        </p>
                        <p className="text-[10px] text-zinc-500">Incl. offers shown</p>
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
                          userText: `Pay ${formatInr(grandTotalInr(variant, qty, carePlan))}`,
                          lineSet: 'payment',
                          skeleton: null,
                          fromWelcome: false,
                          commit: () => setPhase(5),
                        })
                      }}
                      className="mt-3 w-full rounded-xl bg-pg-primary py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-pg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pg-primary disabled:pointer-events-none disabled:opacity-40"
                    >
                      Pay {formatInr(grandTotalInr(variant, qty, carePlan))}
                    </button>
                  ) : null}
                </div>
              </AssistantRow>
            </>
          ) : null}

          {phase >= 5 ? (
            <>
              <UserBubble>{`Pay ${formatInr(grandTotalInr(variant, qty, carePlan))}`}</UserBubble>
              <AssistantRow showAvatar={false}>
                <div className="space-y-3">
                  <p className="text-[13px] leading-relaxed text-zinc-700 sm:text-[14px]">
                    Payment cleared—your order is confirmed. Here&apos;s a compact receipt you can keep in this thread.
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
                        Order confirmed
                      </h3>
                      <p className="mx-auto mt-2 max-w-[22rem] text-[13px] leading-relaxed text-zinc-600 sm:text-[14px]">
                        We&apos;ll email tracking for {EARPHONE_PRODUCT.title} shortly.
                      </p>
                      <span className="mt-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
                        Paid
                      </span>
                    </div>
                    <div className="space-y-3 p-4 sm:p-5">
                      <div className="rounded-xl border border-zinc-200/90 p-3.5 sm:p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Order</p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <span className="text-[12px] text-zinc-500">Reference</span>
                          <span className="text-[12px] font-semibold text-zinc-900">{orderRef}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-2 border-t border-zinc-100 pt-2">
                          <span className="text-[12px] text-zinc-500">SKU</span>
                          <span className="text-[12px] font-semibold text-zinc-900">{EARPHONE_PRODUCT.sku}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-2 border-t border-zinc-100 pt-2">
                          <span className="text-[12px] text-zinc-500">Total paid</span>
                          <span className="text-[13px] font-semibold text-pg-primary">
                            {formatInr(grandTotalInr(variant, qty, carePlan))}
                          </span>
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
              {turn.skeleton === 'pdp' ? (
                <AssistantRow showAvatar={false}>
                  <PdpControlsSkeleton />
                </AssistantRow>
              ) : null}
              {turn.skeleton === 'cart' ? (
                <AssistantRow showAvatar={false}>
                  <ShoppingCartSkeleton />
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
}
