'use client'

import { PlusGrid } from './PlusGrid'
import { landingPageColumn, landingPageGutter } from './landingLayout'

const HERO_IMAGE = '/herobannerimage.png'
const PAYGLOCAL_LOGO = '/whitlogopg.png'
const ICON_CHATGPT = '/icon-chatgpt.svg'
const ICON_CLAUDE = '/icon-claude.svg'
const ICON_GEMINI = '/icon-gemini.svg'
const MASTERCARD_LOGO = '/mastercard.v2.svg'
const AXIS_BANK_LOGO = '/AXISBank_Logo.svg'

const MARQUEE_ITEMS = [
  { type: 'text', value: 'Your store — AI ready' },
  { type: 'separator' },
  { type: 'ai-logos' },
  { type: 'separator' },
  { type: 'text', value: 'Your store — AI ready' },
  { type: 'separator' },
  { type: 'ai-logos' },
  { type: 'separator' },
]

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#live-demo', label: 'Live demo' },
  { href: '#metrics', label: 'Why it matters' },
  { href: '#faq', label: 'FAQ' },
]

const STATS = [
  { label: 'Higher conversion', value: '2x_' },
  { label: 'More time on site', value: '3x_' },
  { label: 'Reduction in return rate', value: '20%_' },
]

function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  )
}

export function LandingHero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col bg-[#030303] text-zinc-100 lg:h-[100svh] lg:max-h-[100dvh] lg:overflow-hidden"
    >
      <HeroBackdrop />

      <div className={`relative z-10 flex flex-1 min-h-0 flex-col ${landingPageGutter}`}>
        <div className={`flex flex-1 min-h-0 flex-col border-x border-white/[0.12] ${landingPageColumn}`}>
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.12] px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
            <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              <a href="#" className="group flex shrink-0 items-center py-1">
                <img
                  src={PAYGLOCAL_LOGO}
                  alt="PayGlocal AI Lab+"
                  width={200}
                  height={40}
                  className="h-[18px] w-auto max-w-[min(40vw,200px)] shrink-0 object-contain object-left opacity-95 transition-opacity group-hover:opacity-100 sm:h-[20px] sm:max-w-[220px] md:h-[22px] md:max-w-none"
                  decoding="async"
                />
              </a>
              <nav className="hidden min-w-0 items-center gap-4 md:flex lg:gap-6">
                {NAV_LINKS.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="group whitespace-nowrap font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-zinc-500 transition-colors lg:text-[12px]"
                  >
                    <span className="text-zinc-600">/</span>{' '}
                    <span className="bg-clip-text transition-colors duration-200 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:text-transparent">{label}</span>
                  </a>
                ))}
              </nav>
            </div>
            <a
              href="mailto:sales@payglocal.com"
              className="group shrink-0 inline-flex items-center gap-1.5 rounded border border-blue-500/45 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-blue-100/95 transition-colors hover:border-blue-400/70 hover:bg-blue-600/15 sm:px-4 sm:py-2 sm:text-[11px]"
            >
              Request demo
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </a>
          </header>

          <div className="relative flex min-h-[44px] shrink-0 items-center justify-center border-b border-white/[0.12] px-4 py-2 sm:min-h-[48px] sm:px-6 lg:px-8">
            <div className="absolute left-0 top-0 size-2 border-l border-t border-blue-500/50" aria-hidden />
            <p className="mx-auto max-w-full text-center">
              <span className="sr-only">PayGlocal agentic checkout on Mastercard and Axis Bank rails</span>
              <span
                className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-2 font-mono text-[10px] font-normal uppercase leading-snug tracking-[0.18em] text-zinc-500 sm:gap-x-3 sm:text-[11px] md:text-[12px]"
                aria-hidden
              >
                <span>PayGlocal Agentic commerce</span>
                <span className="hidden text-zinc-700 sm:inline">///</span>
                <span className="sm:hidden">·</span>
                <span>Powered by</span>
                <img src={MASTERCARD_LOGO} alt="" width={36} height={24} className="h-[18px] w-auto shrink-0 object-contain sm:h-[22px] md:h-[24px]" decoding="async" />
                <span className="text-zinc-600">&amp;</span>
                <img src={AXIS_BANK_LOGO} alt="" width={120} height={36} className="h-[15px] w-auto max-w-[min(30vw,100px)] shrink-0 object-contain sm:h-[18px] sm:max-w-[120px] md:h-[20px] md:max-w-none" decoding="async" />
              </span>
            </p>
          </div>

          <div className="relative grid min-h-0 flex-1 grid-cols-1 border-white/[0.12] lg:grid-cols-2 lg:grid-rows-[minmax(0,1fr)] lg:border-b-0">
            <div className="absolute left-1/2 top-0 z-10 hidden h-full w-px bg-white/[0.12] lg:block" aria-hidden />

            <div className="relative flex min-h-0 flex-col justify-center overflow-y-auto px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
              <div className="relative max-w-[540px]">
                <p className="inline-flex items-center gap-2 rounded border border-white/[0.14] bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-400 sm:text-[10px]">
                  <span className="text-blue-400">●</span>
                  Now live · MCP-powered commerce
                </p>
                <h1 className="mt-3 w-full max-w-[760px] font-serif text-[clamp(1.45rem,4.8vw,3.35rem)] font-normal leading-[1.05] tracking-tight text-white sm:mt-4 sm:text-[clamp(1.85rem,4.6vw,3.85rem)]">
                  The future of agentic commerce is here
                </h1>
                <p className="mt-3 max-w-[32rem] text-pretty font-sans text-[13px] leading-snug text-zinc-400 sm:mt-4 sm:text-[14px] md:text-[15px]">
                  PayGlocal Agentic Commerce delivers a seamless shopping experience where customers can discover, ask, and complete payments - all without ever leaving the chat.
                </p>
                <form className="mt-5 max-w-md sm:mt-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-stretch">
                    <label htmlFor="hero-email" className="sr-only">Email</label>
                    <input
                      id="hero-email"
                      type="email"
                      placeholder="you@company.com"
                      className="min-h-9 w-full flex-1 cursor-text border border-white/[0.18] bg-black/40 px-2.5 py-2 font-mono text-[12px] text-white placeholder:text-zinc-600 focus:border-blue-500/55 focus:outline-none focus:ring-1 focus:ring-blue-500/35 sm:min-h-10 sm:px-3"
                    />
                    <button
                      type="submit"
                      className="group min-h-9 shrink-0 inline-flex items-center gap-1.5 rounded bg-blue-600 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm transition-colors hover:bg-blue-500 sm:min-h-10 sm:px-4 sm:text-[11px]"
                    >
                      Join waitlist
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                    </button>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <p className="font-sans text-[11px] font-medium leading-snug text-zinc-500 sm:text-[12px]">
                      Make your store available on:
                    </p>
                    <ul className="mt-2 flex list-none flex-wrap items-center gap-3.5 p-0 sm:gap-5" aria-label="AI assistants">
                      <li className="shrink-0"><img src={ICON_CHATGPT} alt="ChatGPT" width={28} height={28} className="h-5 w-5 object-contain sm:h-6 sm:w-6 md:h-7 md:w-7" decoding="async" /></li>
                      <li className="shrink-0"><img src={ICON_CLAUDE} alt="Claude" width={28} height={28} className="h-5 w-5 object-contain sm:h-6 sm:w-6 md:h-7 md:w-7" decoding="async" /></li>
                      <li className="shrink-0"><img src={ICON_GEMINI} alt="Gemini" width={28} height={28} className="h-5 w-5 object-contain sm:h-6 sm:w-6 md:h-7 md:w-7" decoding="async" /></li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>

            <div className="relative flex h-full min-h-0 w-full items-center justify-center self-stretch overflow-hidden border-t border-white/[0.12] bg-[#030303] max-lg:min-h-[min(40svh,300px)] lg:border-t-0">
              {/* + grid behind image */}
              <PlusGrid cols={22} rows={16} opacity={0.22} className="z-0" />
              {/* hero image — pointer-events-none so mouse events pass through to PlusGrid */}
              <img
                src={HERO_IMAGE}
                alt="PayGlocal agentic commerce hero"
                width={1600}
                height={1200}
                className="relative z-10 max-h-full max-w-full min-w-0 origin-center object-contain object-center [transform:translateZ(0)] scale-[1.45] motion-reduce:scale-100 sm:scale-[1.5] lg:scale-[1.62] pointer-events-none"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>

          <div className="shrink-0 border-t border-white/[0.12]">
            <div className="grid divide-y divide-white/[0.12] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {STATS.map(({ label, value }) => (
                <div key={label} className="px-4 py-2.5 sm:px-5 sm:py-3 lg:px-7">
                  <p className="font-mono text-[8px] font-medium uppercase tracking-[0.18em] text-zinc-600 sm:text-[9px]">{label}</p>
                  <p className="mt-0.5 font-mono text-[clamp(0.95rem,2.4vw,1.2rem)] font-semibold tabular-nums tracking-tight text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/[0.12] bg-black/35">
              <div className="relative overflow-hidden py-2.5 sm:py-3">
                <div className="marquee-track flex w-max animate-pg-marquee gap-10 motion-reduce:animate-none md:gap-14">
                  {[0, 1].map((c) => (
                    <ul key={c} className="flex shrink-0 items-center gap-10 md:gap-12">
                      {MARQUEE_ITEMS.map((item, i) => (
                        <li key={`${c}-${i}`} className="flex shrink-0 items-center">
                          {item.type === 'separator' && (
                            <span className="font-mono text-[22px] font-thin leading-none text-zinc-600 sm:text-[26px]">+</span>
                          )}
                          {item.type === 'text' && (
                            <span className="whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:text-[11px]">{item.value}</span>
                          )}
                          {item.type === 'ai-logos' && (
                            <span className="flex items-center gap-2.5">
                              <span className="whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:text-[11px]">Make your store available on</span>
                              <img src={ICON_CHATGPT} alt="ChatGPT" width={16} height={16} className="h-4 w-4 object-contain opacity-60" decoding="async" />
                              <img src={ICON_CLAUDE} alt="Claude" width={16} height={16} className="h-4 w-4 object-contain opacity-60" decoding="async" />
                              <img src={ICON_GEMINI} alt="Gemini" width={16} height={16} className="h-4 w-4 object-contain opacity-60" decoding="async" />
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
