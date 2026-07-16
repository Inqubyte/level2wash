import { formatPrice, type PricingItem } from "@/data/pricing"
import { site } from "@/data/site"

export type QuoteLine = {
  item: PricingItem
  qty: number
}

export type QuoteCustomer = {
  name: string
  email: string
  phone: string
  address: string
  notes: string
}

function digitsOnly(phone: string) {
  return phone.replace(/\D/g, "")
}

/** E.164-ish digits for wa.me (defaults to India country code). */
export function whatsappNumber(phone = site.whatsapp) {
  const digits = digitsOnly(phone)
  if (digits.startsWith("91") && digits.length >= 12) return digits
  if (digits.length === 10) return `91${digits}`
  return digits
}

export function buildQuoteMessage(
  customer: QuoteCustomer,
  lines: QuoteLine[],
  serviceNames: string[],
) {
  const total = lines.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  const itemLines =
    lines.length === 0
      ? ["(No items selected — please advise)"]
      : lines.map(
          (line) =>
            `• ${line.item.name} × ${line.qty} (${formatPrice(line.item.price)} ${line.item.unit}) = ${formatPrice(line.item.price * line.qty)}`,
        )

  const parts = [
    `*New laundry order — ${site.shortBrand}*`,
    "",
    "*Customer*",
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Email: ${customer.email}`,
    customer.address ? `Address: ${customer.address}` : null,
    "",
    serviceNames.length ? `*Services:* ${serviceNames.join(", ")}` : null,
    "*Items*",
    ...itemLines,
    "",
    `*Total estimate: ${formatPrice(total)}*`,
    customer.notes ? `\n*Notes:* ${customer.notes}` : null,
    "",
    "_Sent from level2wash.com Book Now form_",
  ]

  return parts.filter((p) => p != null).join("\n")
}

export function openWhatsAppQuote(message: string, phone = site.whatsapp) {
  const url = `https://wa.me/${whatsappNumber(phone)}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank", "noopener,noreferrer")
  return url
}
