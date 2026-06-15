'use client'

export function FigmaMintCorner({ className = '', tone = 'mint' }) {
  const fill =
    tone === 'white'
      ? 'bg-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.22)]'
      : 'bg-pg-primary shadow-[0_0_0_1px_rgba(15,23,42,0.12)]'
  return <div className={`absolute left-px top-px z-10 size-3 ${fill} ${className}`} aria-hidden />
}

export function FigmaSectionMarker({ n, variant = 'light', className = '' }) {
  const tone =
    variant === 'light'
      ? 'text-black/40'
      : variant === 'onBlue'
        ? 'text-white/55'
        : 'text-white/35'
  return (
    <div className={`absolute -left-12 top-0 z-10 hidden size-12 items-center justify-center font-mono text-[14px] leading-none lg:flex ${tone} ${className}`}>
      {n}
    </div>
  )
}
