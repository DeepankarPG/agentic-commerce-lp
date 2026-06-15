'use client'

import { useId, useRef, useState } from 'react'
import { Minus, Plus } from 'lucide-react'

import { FigmaMintCorner, FigmaSectionMarker } from './figmaSectionChrome'
import { landingPageColumn, landingPageGutter } from './landingLayout'

/** Lora — same as rollout section + phase rows in LandingBento. */
const headingSerif = 'font-heading-serif'

/** Same scale as "We move in phases…" column headline in Bento. */
const faqSectionHeadlineClass =
  `${headingSerif} max-w-[min(36rem,100%)] text-left text-[clamp(1.35rem,3.4vw,2.35rem)] font-normal leading-[1.08] tracking-tight text-endex-firefly sm:text-[clamp(1.5rem,3vw,2.55rem)]`

/** Same as phase row titles (MCP, catalog, …) in Bento. */
const faqQuestionTitleClass =
  `${headingSerif} min-w-0 flex-1 text-left text-[clamp(0.98rem,2.2vw,1.28rem)] font-normal leading-[1.05] tracking-tight text-endex-firefly sm:text-[clamp(1.05rem,2vw,1.35rem)]`

/** Single-open accordion: opening one item closes the other (switch to multi-open by tracking Set if needed). */
const FAQ_ITEMS = [
  {
    q: "What is PayGlocal's Agentic Commerce platform?",
    a: "PayGlocal's Agentic Commerce platform lets businesses sell through AI — customers can discover products, ask questions, and complete payments within a single conversation. It combines an MCP-powered catalogue layer, an embedded AI chatbot, and Mastercard Passkey checkout so the entire journey from discovery to purchase happens without redirects or friction.",
  },
  {
    q: 'What is MCP and why does it matter for my store?',
    a: "MCP (Model Context Protocol) is the standard that lets AI assistants like ChatGPT, Claude, and Gemini securely read and act on your store's data — products, pricing, inventory, and checkout flows. Once PayGlocal sets up your MCP layer, your catalogue becomes natively discoverable inside every major AI platform without any ongoing work from you.",
  },
  {
    q: 'How does the embedded chatbot work on my website?',
    a: 'PayGlocal builds and embeds a smart assistant directly on your storefront. Customers describe what they want, the agent surfaces the right products from your live catalogue, and they can complete payment — all in the same chat window. No new tabs, no drop-off.',
  },
  {
    q: 'How do customers pay inside the conversation?',
    a: 'Through Mastercard Passkey checkout, powered by PayGlocal. Customers authenticate with a biometric tap — no OTPs, no redirect to a payment page, no lengthy forms. The payment completes inside the chat, which is where the conversion happens.',
  },
  {
    q: 'Does my catalogue and pricing stay in sync automatically?',
    a: "Yes. PayGlocal's MCP layer syncs with your product catalogue, inventory, and pricing in real time, so customers always receive accurate recommendations and up-to-date availability during every conversation.",
  },
  {
    q: 'How long does it take to go live?',
    a: 'Most merchants are AI-ready within days of onboarding. Phase 1 (MCP setup) is fully handled by PayGlocal — you share catalogue and checkout access and we do the rest. The embedded chatbot (Phase 2) typically goes live within 1–2 weeks.',
  },
  {
    q: 'Does PayGlocal support compliance and cross-border payments?',
    a: 'Yes. PayGlocal is built for enterprise-scale commerce with secure payment infrastructure, PCI-compliant systems, and support for cross-border payments and regional data residency requirements.',
  },
]

const faqTagPillClass =
  'inline-flex items-center rounded border border-zinc-900/14 bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-800 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:px-3 sm:text-[11px]'

function FaqItem({ item, i, isOpen, baseId, onToggle }) {
  const panelId = `${baseId}-a-${i}`
  const contentRef = useRef(null)

  return (
    <li className="border-b border-dotted border-endex-grid last:border-b-0">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        id={`${baseId}-q-${i}`}
        className="flex w-full items-start justify-between gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600/40 sm:py-6"
        onClick={onToggle}
      >
        <span className={faqQuestionTitleClass}>{item.q}</span>
        <span
          className="relative mt-1 flex size-[14px] shrink-0 items-center justify-center text-endex-firefly/55 sm:size-[15px]"
          aria-hidden
        >
          {/* horizontal bar — always visible */}
          <span className="absolute h-[1.5px] w-full rounded-full bg-current" />
          {/* vertical bar — fades + collapses to become − */}
          <span className={`absolute h-full w-[1.5px] rounded-full bg-current transition-all duration-300 ease-in-out ${isOpen ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'}`} />
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={`${baseId}-q-${i}`}
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div ref={contentRef} className="overflow-hidden">
          <p className="m-0 max-w-[36rem] pb-4 pt-1 font-sans text-[14px] leading-[1.55] text-endex-firefly/70 sm:pb-5 sm:text-[15px]">
            {item.a}
          </p>
        </div>
      </div>
    </li>
  )
}

export function LandingFaq() {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" aria-labelledby="faq-heading" className={`border-t border-endex-grid bg-white pt-px ${landingPageGutter}`}>
      {/* In-page target for #security nav after Enterprise security section was removed */}
      <div id="security" className="h-0 scroll-mt-24" aria-hidden />
      <div className={`grid border-x border-endex-grid lg:grid-cols-12 ${landingPageColumn}`}>
        <FigmaMintCorner />
        <FigmaSectionMarker n={8} />

        <div className="border-b border-endex-grid px-6 py-16 sm:px-10 sm:py-20 lg:col-span-4 lg:border-b-0 lg:border-r lg:px-12 lg:py-20">
          <div className="lg:sticky lg:top-8 lg:max-w-sm">
            <p className={faqTagPillClass}>FAQ</p>
            <h2 id="faq-heading" className={`${faqSectionHeadlineClass} mt-5 sm:mt-6`}>
              Frequently asked questions
            </h2>
          </div>
        </div>

        <div className="border-b border-endex-grid px-6 pb-16 pt-2 sm:px-10 sm:pb-20 sm:pt-4 lg:col-span-8 lg:px-12 lg:pb-20 lg:pt-20">
          <ul className="m-0 list-none p-0">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                i={i}
                isOpen={openIndex === i}
                baseId={baseId}
                onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
