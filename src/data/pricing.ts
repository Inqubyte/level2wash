export type PricingItem = {
  id: string
  name: string
  price: number
  unit: string
  serviceTypeId: string
}

export type ServiceType = {
  id: string
  slug: string
  name: string
}

export function formatPrice(price: number) {
  return `₹${price}`
}

export function formatUnit(unit: string) {
  return unit.replace(/^PER\s+/i, "PER ")
}
