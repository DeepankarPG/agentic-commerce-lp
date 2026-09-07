import { LandingBento } from './LandingBento'
import { LandingDeployModes } from './LandingDeployModes'
import { LandingFaq } from './LandingFaq'
import { LandingPostFaqCta } from './LandingPostFaqCta'
import { LandingLiveDemo } from './LandingLiveDemo'
import { LandingMetricsCarousel } from './LandingMetricsCarousel'
import { LandingFooter } from './LandingFooter'
import { LandingHero } from './LandingHero'
import { LandingStoryReveal } from './LandingStoryReveal'
import { LandingVideoSection } from './LandingVideoSection'

export function LandingPage() {
  return (
    <div className="bg-white">
      <LandingHero />
      <LandingVideoSection />
      <LandingStoryReveal />
      <LandingLiveDemo />
      <LandingMetricsCarousel />
      <LandingDeployModes />
      <LandingBento />
      <LandingPostFaqCta />
      <LandingFaq />
      <LandingFooter />
    </div>
  )
}
