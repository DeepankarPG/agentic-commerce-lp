'use client'

import { useEffect, useId, useRef, useState } from 'react'

import { landingPageColumn, landingPageGutter } from './landingLayout'

const VIMEO_VIDEO_ID = '1200540172'
const VIDEO_CAPTION =
  '//Agentic Commerce - a walkthrough. Discover how a purchase is done, all within a single conversation.'

const headingSerif = 'font-heading-serif'

function vimeoPosterUrl(id) {
  return `https://vumbnail.com/${id}.jpg`
}

function vimeoEmbedSrc(id) {
  return `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`
}

export function LandingVideoSection() {
  const [open, setOpen] = useState(false)
  const closeButtonRef = useRef(null)
  const triggerRef = useRef(null)
  const dialogTitleId = useId()
  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) {
        requestAnimationFrame(() => triggerRef.current?.focus())
      }
      wasOpenRef.current = false
      return
    }
    wasOpenRef.current = true
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = requestAnimationFrame(() => closeButtonRef.current?.focus())
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(t)
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <section
      id="video"
      className={`border-t border-endex-grid bg-white pt-px ${landingPageGutter}`}
      aria-label="Video"
    >
      <div className={`border-x border-endex-grid ${landingPageColumn}`}>
        <div className="mx-auto w-full max-w-[min(56rem,100%)] px-5 pt-16 pb-[3.2rem] sm:px-8 sm:pt-20 sm:pb-16 lg:px-10 lg:pt-24 lg:pb-[4.8rem]">
          <button
            ref={triggerRef}
            type="button"
            className="group relative block w-full overflow-hidden rounded-2xl border border-endex-grid bg-black/5 shadow-sm ring-1 ring-black/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600/40 sm:rounded-3xl"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label="Play video: PayGlocal"
          >
            <span className="relative block aspect-video w-full">
              <img
                src={vimeoPosterUrl(VIMEO_VIDEO_ID)}
                alt="Play video: PayGlocal"
                width={1280}
                height={720}
                className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                loading="lazy"
                decoding="async"
              />
              <span
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                aria-hidden
              />
              <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
                <span className="flex size-16 items-center justify-center rounded-full bg-white/95 text-endex-firefly shadow-lg ring-1 ring-black/10 transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:size-[4.5rem]">
                  <svg viewBox="0 0 24 24" className="ml-0.5 size-7 sm:size-8" aria-hidden>
                    <polygon points="8,5 8,19 19,12" fill="currentColor" />
                  </svg>
                </span>
              </span>
            </span>
          </button>

          <p
            className={`${headingSerif} mt-5 text-center text-[clamp(0.8125rem,1.45vw,0.95rem)] font-normal leading-snug tracking-tight text-zinc-500 sm:mt-6 sm:text-[clamp(0.875rem,1.35vw,1rem)]`}
          >
            {VIDEO_CAPTION}
          </p>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="presentation">
          <button
            type="button"
            tabIndex={-1}
            className="absolute inset-0 bg-black/70 backdrop-blur-[1px] motion-reduce:transition-none"
            aria-label="Close video"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            className="relative z-[101] w-full max-w-[min(90vw,960px)] rounded-2xl border border-white/10 bg-black p-2 shadow-2xl sm:p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id={dialogTitleId} className="sr-only">
              YouTube video
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              className="absolute -right-1 -top-1 z-[102] flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 bg-black/80 px-3 font-sans text-[13px] font-medium text-white shadow-md transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 sm:right-2 sm:top-2"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                title="Vimeo video"
                src={vimeoEmbedSrc(VIMEO_VIDEO_ID)}
                className="size-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
