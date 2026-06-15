'use client'

import { landingPageColumn, landingPageGutter } from './landingLayout'

const licenseBadgeA = '/assets/Licenses/image.png'
const licenseBadgeB = '/assets/Licenses/image copy.png'
const pciDssBadge = '/assets/Licenses/PCI.png'

/** Same mark as hero — PayGlocal AI Lab+ wordmark */
const PAYGLOCAL_AI_LABS_LOGO = '/whitlogopg.png'

const TRUST_BADGES = [
  { src: pciDssBadge, alt: 'PCI DSS compliant' },
  { src: licenseBadgeA, alt: 'Security certification' },
  { src: licenseBadgeB, alt: 'Security certification' },
]

/** Shared circular frame for trust badges (dark rim + subtle inner ring). */
const trustBadgeFrameClass =
  'flex size-[4.25rem] shrink-0 items-center justify-center rounded-full border border-[#2d2d2d] bg-[#1a1a1c] p-2 ring-1 ring-inset ring-white/[0.06] sm:size-[4.5rem]'

function FooterLinkColumn({ title, links }) {
  return (
    <div className="flex min-w-0 flex-col border-b border-[#2d2d2d] last:border-b-0 sm:border-b-0 sm:border-r sm:border-[#2d2d2d] sm:last:border-r-0">
      <div className="border-b border-[#2d2d2d] px-6 py-4 sm:px-5 lg:px-6">
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#949494]">{title}</p>
      </div>
      <nav className="flex flex-col gap-4 px-6 py-6 sm:px-5 lg:px-6" aria-label={title}>
        {links.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group font-sans text-[14px] font-normal leading-snug text-white"
          >
            <span className="bg-clip-text transition-colors duration-200 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-300 group-hover:text-transparent">
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  )
}

function IconLinkedIn({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function IconX({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function LandingFooter() {
  const year = new Date().getFullYear()

  return (
    <footer id="footer" className="mt-12 bg-[#121214] text-white sm:mt-16 lg:mt-20">
      <div className={`${landingPageGutter}`}>
        <div className={`overflow-hidden border-x border-[#2d2d2d] ${landingPageColumn}`}>
          {/* Watermark: large serif clipped by bottom border of this band (ref: taller band + bigger wordmark) */}
          <div className="relative border-b border-[#2d2d2d]">
            <div
              className="pointer-events-none relative h-[7rem] overflow-hidden sm:h-[9rem] md:h-[11rem] lg:h-[12.5rem]"
              aria-hidden
            >
              <p className="absolute left-1/2 top-[76%] w-max -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-heading-serif text-[clamp(4.25rem,18vw,13.5rem)] font-normal leading-none tracking-tight text-white/[0.065] sm:top-[74%] md:text-[clamp(4.75rem,17vw,14rem)] lg:top-[72%]">
                PayGlocal
              </p>
            </div>
          </div>

          {/* Main grid: ~5 | 7 (three equal link columns) */}
          <div className="grid grid-cols-1 border-b border-[#2d2d2d] lg:grid-cols-12">
            <div className="border-b border-[#2d2d2d] px-6 py-10 sm:px-8 lg:col-span-5 lg:border-b-0 lg:border-r lg:px-10 lg:py-14 xl:px-12">
              <a href="#hero" className="inline-block">
                <img
                  src={PAYGLOCAL_AI_LABS_LOGO}
                  alt="PayGlocal AI Lab+"
                  width={220}
                  height={44}
                  className="h-[22px] w-auto max-w-[min(72vw,240px)] object-contain object-left sm:h-[26px]"
                  decoding="async"
                />
              </a>
              <p className="mt-5 max-w-md font-sans text-[15px] leading-relaxed text-[#949494]">
                Built to power storefront-native agentic commerce—discovery, quote, and capture on your rails without
                tab hops.
              </p>
            </div>

            <div className="grid min-w-0 grid-cols-1 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-3">
              <FooterLinkColumn
                title="Company"
                links={[
                  { label: 'About', href: '#hero' },
                  { label: 'Careers', href: 'mailto:sales@payglocal.com?subject=Careers%20%E2%80%94%20PayGlocal' },
                  { label: 'Contact', href: 'mailto:sales@payglocal.com' },
                ]}
              />
              <FooterLinkColumn
                title="Legal"
                links={[
                  { label: 'Privacy', href: '#' },
                  { label: 'Website terms', href: '#' },
                  { label: 'Security', href: '#security' },
                ]}
              />
              <FooterLinkColumn
                title="Resources"
                links={[
                  { label: 'Product tour', href: '#video' },
                  { label: 'FAQ', href: '#faq' },
                  { label: 'Pilot program', href: '#cta' },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-row flex-wrap items-center gap-6 border-b border-[#2d2d2d] px-6 py-10 sm:gap-10 sm:px-8 lg:px-10 xl:px-12">
            <p className="shrink-0 whitespace-nowrap font-sans text-[11px] font-medium uppercase leading-snug tracking-[0.18em] text-[#949494]">
              Proudly secured
            </p>
            <ul className="flex flex-wrap items-center gap-4 sm:gap-5" aria-label="Compliance and security badges">
              {TRUST_BADGES.map((b, i) => (
                <li key={`trust-badge-${i}`}>
                  <div className={trustBadgeFrameClass}>
                    <img src={b.src} alt={b.alt} className="max-h-full max-w-full object-contain" loading="lazy" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
            <p className="font-sans text-[13px] leading-relaxed text-[#949494]">
              © {year} PayGlocal. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-[#949494]">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="transition-colors hover:text-white"
                aria-label="PayGlocal on LinkedIn"
              >
                <IconLinkedIn className="size-5" />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="transition-colors hover:text-white"
                aria-label="PayGlocal on X"
              >
                <IconX className="size-[1.15rem]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
