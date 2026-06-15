'use client'

import { ShoppingChatDemo } from './ShoppingChatDemo'

export function ShoppingDemoPanel({
  merchantLogoDataUrl,
  onRequestBrandUpload,
  onSelectHoliday,
}) {
  return (
    <ShoppingChatDemo
      merchantLogoDataUrl={merchantLogoDataUrl}
      onRequestBrandUpload={onRequestBrandUpload}
      onSelectHoliday={onSelectHoliday}
    />
  )
}
