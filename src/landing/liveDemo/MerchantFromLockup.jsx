'use client'

/**
 * Compact "label + merchant" strip under prices and on receipts so cards consistently show partner branding.
 */
export function MerchantFromLockup({
  children,
  label = 'from',
  align = 'start',
  className = '',
}) {
  return (
    <div
      className={`min-w-0 ${
        align === 'center' ? 'flex flex-col items-center text-center' : 'flex flex-col items-start'
      } gap-0.5 ${className}`}
    >
      <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-400">{label}</p>
      <div className={align === 'center' ? 'flex justify-center' : undefined}>{children}</div>
    </div>
  )
}
