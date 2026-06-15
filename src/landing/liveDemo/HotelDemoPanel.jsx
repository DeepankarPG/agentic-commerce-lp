'use client'

import { HotelChatDemo } from './HotelChatDemo'

export function HotelDemoPanel({
  merchantLogoDataUrl,
  onRequestBrandUpload,
  onSelectHoliday,
}) {
  return (
    <HotelChatDemo
      merchantLogoDataUrl={merchantLogoDataUrl}
      onRequestBrandUpload={onRequestBrandUpload}
      onSelectHoliday={onSelectHoliday}
    />
  )
}
