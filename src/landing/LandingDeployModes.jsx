'use client'

import { ArrowLeftRight, Fingerprint, Sparkles } from 'lucide-react'

const featureCatalog = '/assets/Features/image copy.png'
const featurePasskey = '/assets/Features/image copy 2.png'
const featureMcpFlows = '/assets/Features/image.png'

import { FigmaMintCorner, FigmaSectionMarker } from './figmaSectionChrome'
import { landingPageColumn, landingPageGutter } from './landingLayout'

const headingSerif = 'font-heading-serif'

const COLUMNS = [
  {
    title: "AI-guided discovery",
    body: 'Customers describe what they want - the agent recommends your catalogue, instantly.',
    icon: Sparkles,
    image: featureCatalog,
    imageAlt: 'Conversational product catalog in the assistant thread',
  },
  {
    title: 'MCP-Enabled AI Commerce Flows',
    body: 'Let ChatGPT, Claude, and Gemini browse your catalogue, recommend products, and drive purchases directly in chat.',
    icon: Fingerprint,
    image: featureMcpFlows,
    imageAlt: 'MCP-enabled AI commerce flows',
    imageClassName: 'max-h-[min(17rem,70vw)] sm:max-h-[min(19rem,62vw)] lg:max-h-[min(21rem,34vw)]',
  },
  {
    title: 'Passkey-Powered Payments',
    body: 'Frictionless biometric checkout with Mastercard Passkeys, fully powered by PayGlocal.',
    icon: ArrowLeftRight,
    image: featurePasskey,
    imageAlt: 'Passkey-powered payments',
  },
]

export function LandingDeployModes() {
  return (
    <section
      className={`relative overflow-hidden border-t border-white/[0.08] bg-[#08090b] pt-px text-zinc-100 ${landingPageGutter}`}
      aria-labelledby="deploy-modes-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 -top-28 h-72 w-72 rounded-full bg-gradient-to-br from-blue-600/40 via-cyan-500/15 to-transparent blur-3xl" />
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-gradient-to-bl from-amber-400/25 via-blue-600/12 to-transparent blur-3xl" />
      </div>

      <div className={`relative border-x border-white/[0.1] ${landingPageColumn}`}>
        <FigmaMintCorner tone="white" />
        <FigmaSectionMarker n={6} variant="dark" />

        <div className="relative z-10 border-b border-white/[0.08] px-6 py-14 text-center sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="mx-auto flex w-full max-w-[min(52rem,100%)] flex-col items-center gap-4">
            <p className="inline-flex items-center rounded border border-zinc-900/14 bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-800 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:px-3 sm:text-[11px]">
              Features
            </p>
            <h2
              id="deploy-modes-heading"
              className={`${headingSerif} w-full max-w-[min(48rem,100%)] text-[clamp(1.65rem,4.2vw,3.15rem)] font-normal leading-[1.08] tracking-tight text-white`}
            >
              Discovery to purchase — one conversation, zero drop-off
            </h2>
          </div>
        </div>

        <div className="relative z-10 grid divide-y divide-white/[0.08] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {COLUMNS.map((col) => {
            const Icon = col.icon
            return (
              <div key={col.title} className="flex min-h-0 flex-col px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                <div className="mb-4 flex items-center gap-2 text-white/90 sm:mb-5">
                  <Icon className="size-4 shrink-0 text-blue-400/90 sm:size-[18px]" strokeWidth={2} aria-hidden />
                  <h3 className={`${headingSerif} text-left text-[clamp(1.1rem,2.2vw,1.35rem)] font-medium leading-snug tracking-tight`}>
                    {col.title}
                  </h3>
                </div>
                <p className="mb-6 max-w-prose text-left font-sans text-[13px] leading-relaxed text-zinc-400 sm:mb-7 sm:text-[14px]">
                  {col.body}
                </p>
                <div className="flex min-h-[8.5rem] w-full items-center justify-center sm:min-h-[9.5rem] lg:min-h-[10rem]">
                  <img
                    src={col.image}
                    alt={col.imageAlt}
                    width={800}
                    height={600}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className={`mx-auto h-auto w-full object-contain object-center ${col.imageClassName ?? 'max-h-[min(13rem,58vw)] sm:max-h-[min(15rem,50vw)] lg:max-h-[min(17rem,28vw)]'}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            )
          })}
        </div>

        <p className="relative z-10 border-t border-white/[0.08] px-6 py-5 text-center font-sans text-[12px] leading-relaxed text-zinc-500 sm:py-6 sm:text-[13px]">
        Customer asks → product recommended → Passkey-based payment → order confirmed.
        </p>
      </div>
    </section>
  )
}
