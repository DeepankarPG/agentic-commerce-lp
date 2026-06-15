import { SHOPPING_IMAGES } from './shoppingImages'

/** Maps finish → image from SHOPPING_IMAGES (same order as variants). */
const VARIANT_IMAGE_INDEX = {
  graphite: 0,
  silver: 1,
  sage: 2,
}

/** Default hero for browse / before a variant is chosen. */
export const PRODUCT_HERO_IMAGE = SHOPPING_IMAGES[0]

export function variantProductImage(variantId) {
  const i = VARIANT_IMAGE_INDEX[variantId]
  return SHOPPING_IMAGES[i ?? 0]
}

/** Single hero SKU for the scripted electronics demo. */
export const EARPHONE_PRODUCT = {
  id: 'wave-buds-pro',
  title: 'Wave Buds Pro',
  subtitle: 'Wireless ANC · 36h with case · IPX5',
  coverSrc: PRODUCT_HERO_IMAGE,
  basePrice: 7999,
  variants: [
    { id: 'graphite', label: 'Graphite black', priceDelta: 0 },
    { id: 'silver', label: 'Silver frost', priceDelta: 500 },
    { id: 'sage', label: 'Sage', priceDelta: 300 },
  ],
  carePlanPrice: 799,
  sku: 'WBP-G2',
}

export function formatInr(amount) {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function variantById(id) {
  return EARPHONE_PRODUCT.variants.find((v) => v.id === id)
}

export function unitPriceInr(variant) {
  return EARPHONE_PRODUCT.basePrice + variant.priceDelta
}

export function lineSubtotalInr(variant, qty) {
  return unitPriceInr(variant) * qty
}

export function grandTotalInr(variant, qty, carePlan) {
  return lineSubtotalInr(variant, qty) + (carePlan ? EARPHONE_PRODUCT.carePlanPrice : 0)
}

export function demoOrderRef() {
  const n = EARPHONE_PRODUCT.id.replace(/-/g, '').toUpperCase().slice(0, 4)
  return `ORD-${n}${Math.floor(1000 + Math.random() * 9000)}`
}
