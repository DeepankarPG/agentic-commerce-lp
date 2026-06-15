'use client'

import { useId } from 'react'
import { Hotel, Palmtree, ShoppingBag } from 'lucide-react'

const ITEMS = [
  { id: 'holiday', label: 'Holiday', Icon: Palmtree },
  { id: 'hotel', label: 'Hotel booking', Icon: Hotel },
  { id: 'shopping', label: 'Shopping', Icon: ShoppingBag },
]

export function UseCaseNav({ value, onChange }) {
  const headingId = useId()

  return (
    <div className="flex shrink-0 flex-col px-3 pb-1 pt-4 sm:px-3 sm:pb-2 sm:pt-5">
      <h3
        id={headingId}
        className="mb-3 text-left text-[12px] font-semibold leading-snug tracking-tight text-zinc-800 sm:mb-3.5 sm:text-[13px]"
      >
        Select your use case
      </h3>
      <nav className="flex flex-row flex-wrap gap-2 sm:flex-col sm:gap-1.5" aria-labelledby={headingId}>
        {ITEMS.map(({ id, label, Icon }) => {
          const selected = value === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-pressed={selected}
              aria-current={selected ? 'page' : undefined}
              className={`flex min-h-[44px] min-w-0 flex-1 basis-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[13px] font-medium transition-colors sm:w-full sm:flex-none sm:basis-auto sm:gap-2.5 sm:rounded-lg sm:px-3 sm:py-2.5 ${
                selected
                  ? 'bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/90'
                  : 'text-zinc-600 hover:bg-white/70 hover:text-zinc-900'
              } `}
            >
              <Icon
                className={`size-4 shrink-0 ${selected ? 'text-zinc-800' : 'text-zinc-500'}`}
                strokeWidth={1.75}
                aria-hidden
              />
              <span className="min-w-0">{label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
