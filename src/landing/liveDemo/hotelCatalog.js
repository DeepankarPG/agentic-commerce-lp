import { HOTEL_IMAGES } from './hotelImages'

/** Scripted "this weekend" copy for the landing demo (stable across timezones). */
export const STAY_DATES_LABEL = 'Fri 15 May – Sun 17 May · 2 nights'

export const STAY_NIGHTS = 2

export const ROOM_TIERS = [
  { id: 'deluxe', label: 'Deluxe king', priceDeltaPerNight: 0 },
  { id: 'suite', label: 'Junior suite', priceDeltaPerNight: 2200 },
]

export const BREAKFAST_PRICE_INR = 899

export const SEARCH_RESULTS = [
  {
    id: 'indiranagar-house',
    name: 'Indiranagar House Hotel',
    area: 'Indiranagar',
    tagline: 'Rooftop pool · 12 min to MG Road',
    pricePerNight: 7200,
    rating: 4.7,
    reviewCount: 1280,
    imageSrc: HOTEL_IMAGES[0],
  },
  {
    id: 'koramangala-atrium',
    name: 'Koramangala Atrium',
    area: 'Koramangala',
    tagline: 'Courtyard rooms · near Forum',
    pricePerNight: 6400,
    rating: 4.5,
    reviewCount: 942,
    imageSrc: HOTEL_IMAGES[1],
  },
  {
    id: 'whitefield-grove',
    name: 'Whitefield Grove Suites',
    area: 'Whitefield',
    tagline: 'Airport express · quiet wing',
    pricePerNight: 5800,
    rating: 4.6,
    reviewCount: 756,
    imageSrc: HOTEL_IMAGES[2],
  },
]

export function hotelById(id) {
  return SEARCH_RESULTS.find((h) => h.id === id)
}

export function formatInr(amount) {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function nightlyRateInr(hotel, tier) {
  return hotel.pricePerNight + tier.priceDeltaPerNight
}

export function roomSubtotalInr(hotel, tier, nights) {
  return nightlyRateInr(hotel, tier) * nights
}

export function grandTotalInr(hotel, tier, nights, breakfast) {
  return roomSubtotalInr(hotel, tier, nights) + (breakfast ? BREAKFAST_PRICE_INR : 0)
}

export function demoReservationRef(hotelId) {
  const compact = hotelId.replace(/-/g, '').toUpperCase()
  const prefix = compact.slice(0, 4).padEnd(4, 'X')
  return `HTL-${prefix}${Math.floor(1000 + Math.random() * 9000)}`
}
