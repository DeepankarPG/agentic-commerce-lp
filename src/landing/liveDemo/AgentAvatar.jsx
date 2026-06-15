'use client'

const echoLogo = '/assets/Echo_logo.png'

const sizeClass = {
  sm: 'size-7 object-contain sm:size-7',
  md: 'size-8 object-contain sm:size-8',
  hero: 'h-10 w-auto max-w-[160px] object-contain sm:h-11 sm:max-w-[200px]',
}

/** Echo mark for the demo assistant (decorative in mock UI). */
export function AgentAvatar({ size = 'md', className = '' }) {
  return (
    <img
      src={echoLogo}
      alt="Echo"
      width={80}
      height={80}
      className={`shrink-0 ${sizeClass[size]} ${className}`}
      decoding="async"
    />
  )
}
