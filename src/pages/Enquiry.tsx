import { useMemo, useState, type FormEvent } from "react"
import { CheckCircle2, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/Button"
import { formatPrice, type PricingItem } from "@/data/pricing"
import { usePricing } from "@/context/PricingContext"
import { buildQuoteMessage, openWhatsAppMessage } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

type CartLine = {
  item: PricingItem
  qty: number
}

export function Enquiry() {
  const { services, itemsForService, loading } = usePricing()
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [cart, setCart] = useState<CartLine[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState("")

  const availableItems = useMemo(() => {
    return selectedServices.flatMap((id) => itemsForService(id))
  }, [selectedServices, itemsForService])

  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  function toggleService(id: string) {
    setSelectedServices((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      setCart((lines) => lines.filter((l) => next.includes(l.item.serviceTypeId)))
      return next
    })
  }

  function addItem(item: PricingItem) {
    setCart((prev) => {
      const existing = prev.find((l) => l.item.id === item.id)
      if (existing) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l,
        )
      }
      return [...prev, { item, qty: 1 }]
    })
  }

  function updateQty(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((l) => (l.item.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    )
  }

  function removeLine(id: string) {
    setCart((prev) => prev.filter((l) => l.item.id !== id))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError("")

    if (cart.length === 0) {
      setFormError("Add at least one item to your quote before sending on WhatsApp.")
      return
    }

    const data = new FormData(e.currentTarget)
    const customer = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      address: String(data.get("address") || "").trim(),
      notes: String(data.get("notes") || "").trim(),
    }

    const serviceNames = services
      .filter((s) => selectedServices.includes(s.id))
      .map((s) => s.name)

    const message = buildQuoteMessage(customer, cart, serviceNames)
    openWhatsAppMessage(message)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <CheckCircle2 className="mb-4 h-14 w-14 text-emerald-600" />
        <h1 className="text-3xl font-extrabold text-slate-900">Quote ready in WhatsApp</h1>
        <p className="mt-3 text-slate-600">
          WhatsApp should open with your order details. Tap <strong>Send</strong> to place the
          order with us.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" variant="outline">
            Back to Home
          </Button>
          <Button onClick={() => setSubmitted(false)}>Send another quote</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h1
          className="text-4xl font-extrabold text-slate-900 sm:text-5xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Book a Pickup & Get Quote
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600 text-balance">
          Select your services to view live pricing and instantly calculate your estimated total.
          Send the quote to us on WhatsApp in one tap.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <section className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Customer Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Name *" name="name" required />
              <Field label="Email *" name="email" type="email" required />
              <Field label="Phone *" name="phone" type="tel" required />
              <Field label="Address" name="address" placeholder="Enter pickup/delivery address" />
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Additional Notes
              </span>
              <textarea
                name="notes"
                rows={3}
                placeholder="Any special instructions or stains to point out?"
                className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none ring-ring transition focus:ring-2"
              />
            </label>
          </section>

          <section className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Select Services</h2>
            {loading && services.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">Loading your customized pricing...</p>
            ) : (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {services.map((service) => {
                  const active = selectedServices.includes(service.id)
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={cn(
                        "rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-all",
                        active
                          ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/20"
                          : "border-border bg-input text-slate-700 hover:border-primary/40",
                      )}
                    >
                      {service.name}
                    </button>
                  )
                })}
              </div>
            )}

            {selectedServices.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-accent">
                  Specify Items
                </h3>
                {availableItems.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No standard items found for the selected services.
                  </p>
                ) : (
                  <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
                    {availableItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-background px-3 py-2.5"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {formatPrice(item.price)} · {item.unit}
                          </p>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => addItem(item)}
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        <aside className="h-fit rounded-xl border border-border/60 bg-card p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>

          {cart.length === 0 ? (
            <div className="mt-6 rounded-lg bg-muted/40 px-4 py-8 text-center">
              <p className="font-medium text-slate-700">No items selected</p>
              <p className="mt-1 text-sm text-slate-500">
                Select services and add items to generate your quote.
              </p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {cart.map((line) => (
                <li
                  key={line.item.id}
                  className="flex items-start justify-between gap-2 border-b border-border/40 pb-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800">{line.item.name}</p>
                    <p className="text-xs text-slate-500">
                      {formatPrice(line.item.price)} × {line.qty}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease"
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border"
                        onClick={() => updateQty(line.item.id, -1)}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{line.qty}</span>
                      <button
                        type="button"
                        aria-label="Increase"
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border"
                        onClick={() => updateQty(line.item.id, 1)}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Remove ${line.item.name}`}
                        className="ml-1 text-slate-400 hover:text-destructive"
                        onClick={() => removeLine(line.item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-900">
                    {formatPrice(line.item.price * line.qty)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <span className="font-semibold text-slate-700">Total Estimate</span>
            <span className="text-2xl font-extrabold text-primary">{formatPrice(total)}</span>
          </div>

          {formError && (
            <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
              {formError}
            </p>
          )}

          <Button type="submit" className="mt-6 w-full" size="lg">
            Send Quote on WhatsApp
          </Button>
          <p className="mt-3 text-center text-xs text-slate-500">
            Opens WhatsApp with your order details ready to send.
          </p>
        </aside>
      </form>
    </div>
  )
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none ring-ring transition focus:ring-2"
      />
    </label>
  )
}
