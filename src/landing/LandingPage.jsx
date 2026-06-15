import { LandingBento } from './LandingBento'
import { LandingDeployModes } from './LandingDeployModes'
import { LandingFaq } from './LandingFaq'
import { LandingPostFaqCta } from './LandingPostFaqCta'
import { LandingLiveDemo } from './LandingLiveDemo'
import { LandingMetricsCarousel } from './LandingMetricsCarousel'
import { LandingFooter } from './LandingFooter'
import { LandingHero } from './LandingHero'
import { LandingQuote } from './LandingQuote'
import { LandingStoryReveal } from './LandingStoryReveal'
import { LandingVideoSection } from './LandingVideoSection'
import { LandingVideoStoryDivider } from './LandingVideoStoryDivider'

export function LandingPage() {
  return (
    <div className="bg-white">
      <LandingHero />
      <LandingVideoSection />
      <LandingVideoStoryDivider />
      <LandingStoryReveal />
      <LandingLiveDemo />
      <LandingMetricsCarousel />
      <LandingDeployModes />
      <LandingBento />
      <LandingQuote />
      <LandingFaq />
      <LandingPostFaqCta />
      <LandingFooter />
    </div>
  )
}
