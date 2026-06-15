'use client'

import { FooterBarcodeDateRoller } from './FooterBarcodeDateRoller'
import { landingPageColumn, landingPageGutter } from './landingLayout'

/** Barcode + live timestamp divider between video and story sections. */
export function LandingVideoStoryDivider() {
  return (
    <div className={`${landingPageGutter} bg-white pt-px`} role="presentation">
      <div className={`border-x border-endex-grid ${landingPageColumn}`}>
        <div className="mx-auto flex w-full max-w-[min(56rem,100%)] flex-col items-center px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <FooterBarcodeDateRoller dark />
        </div>
      </div>
    </div>
  )
}
