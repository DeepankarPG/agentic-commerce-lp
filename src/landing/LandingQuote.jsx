'use client'

import { useState } from 'react'
import { FigmaMintCorner, FigmaSectionMarker } from './figmaSectionChrome'
import { landingPageColumn, landingPageGutter } from './landingLayout'

const testimonialPortrait = '/assets/robbie-duncan-52rOMaF0aVw-unsplash.png'

const SLIDES = [
  {
    quote: 'Our customers were already asking AI for travel packages. PayGlocal made us the answer — and let them book without leaving the conversation.',
    name: 'Rohan Mehta',
    role: 'Director, The Junction',
    company: 'AI-native travel booking platform',
  },
  {
    quote: 'The moment we could close a sale inside the chat — no redirect, no OTP — our conversion rate changed overnight.',
    name: 'Nisha Iyer',
    role: 'Founder & CEO, Nish Hair',
    company: 'Premium hair extensions brand',
  },
  {
    quote: 'AI-led commercial payments are now live in India. With passkey authentication and verified intent, trust is built in — not layered on.',
    name: 'Anouska Ladds',
    role: 'EVP, Commercial Solutions',
    company: 'Mastercard',
  },
]

export function LandingQuote() {
  const [i, setI] = useState(0)
  const slide = SLIDES[i]

  return (
    <section className={`border-t border-blue-900/50 bg-blue-700 pt-px ${landingPageGutter}`}>
      <div
        className={`relative flex min-h-[min(28rem,78svh)] flex-col border-x border-white/15 ${landingPageColumn}`}
      >
        <FigmaMintCorner tone="white" />
        <FigmaSectionMarker n={4} variant="onBlue" />

        <div className="flex flex-1 flex-col lg:min-h-[min(26rem,70svh)] lg:flex-row lg:items-stretch">
          <div className="flex flex-1 flex-col justify-center px-8 py-14 sm:px-10 sm:py-16 lg:min-w-0 lg:px-12 lg:py-20">
            <blockquote className="w-full max-w-[min(52rem,100%)] text-left">
              <p className="font-serif text-[clamp(1.65rem,3.8vw,2.75rem)] font-normal leading-[1.22] tracking-tight text-white">
                <span className="text-white/90">&ldquo;</span>
                {slide.quote}
                <span className="text-white/90">&rdquo;</span>
              </p>
            </blockquote>
          </div>

          <figure className="m-0 w-full shrink-0 overflow-hidden border-t border-white/10 lg:w-[min(40%,22rem)] lg:max-w-sm lg:border-t-0 lg:border-l lg:border-white/15 xl:max-w-md">
            <img
              src={testimonialPortrait}
              alt="Portrait alongside customer testimonial"
              width={1200}
              height={1600}
              className="aspect-[5/4] w-full object-cover object-[center_22%] grayscale max-lg:max-h-[min(52vw,340px)] lg:aspect-auto lg:h-full lg:max-h-none lg:min-h-full"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

        <footer className="mt-auto border-t border-white/15 px-8 py-5 sm:px-10 lg:px-12">
          <div className="flex flex-row flex-wrap items-center justify-between gap-4">
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                className="flex size-9 items-center justify-center border border-white/35 text-white transition-colors hover:bg-white/10"
                onClick={() => setI((v) => (v - 1 + SLIDES.length) % SLIDES.length)}
              >
                <span className="text-base leading-none" aria-hidden>
                  ←
                </span>
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                className="flex size-9 items-center justify-center border border-white/35 text-white transition-colors hover:bg-white/10"
                onClick={() => setI((v) => (v + 1) % SLIDES.length)}
              >
                <span className="text-base leading-none" aria-hidden>
                  →
                </span>
              </button>
            </div>
            <div className="text-right">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-white sm:text-[13px]">
                {slide.name}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-white/60 sm:text-[11px]">
                {slide.role} · {slide.company}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
