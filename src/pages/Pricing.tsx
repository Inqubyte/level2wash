import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { formatPrice, formatUnit } from "@/data/pricing"
import { usePricing } from "@/context/PricingContext"
import { cn } from "@/lib/utils"

export function Pricing() {
  const { services, itemsForService, loading } = usePricing()
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    if (!activeId && services[0]) {
      setActiveId(services[0].id)
    } else if (activeId && services.length > 0 && !services.some((s) => s.id === activeId)) {
      setActiveId(services[0].id)
    }
  }, [services, activeId])

  const activeService = services.find((s) => s.id === activeId) ?? services[0]
  const items = useMemo(
    () => (activeId ? itemsForService(activeId) : []),
    [activeId, itemsForService],
  )

  const bulk = items.filter((i) => i.unit.toUpperCase().includes("KG"))
  const individual = items.filter((i) => !i.unit.toUpperCase().includes("KG"))

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h1
          className="text-4xl font-extrabold text-slate-900 sm:text-5xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Clear & Transparent Pricing
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600 text-balance">
          Explore our comprehensive garment care services designed to keep your wardrobe spotless.
          No hidden fees, just straightforward rates.
        </p>
      </div>

      {loading && services.length === 0 ? (
        <p className="text-center text-slate-500">Loading your customized pricing...</p>
      ) : (
        <>
          <div
            role="tablist"
            className="mx-auto mb-10 flex max-w-3xl flex-wrap justify-center gap-2 rounded-xl border border-border/60 bg-card p-2 shadow-sm"
          >
            {services.map((service) => (
              <button
                key={service.id}
                role="tab"
                aria-selected={service.id === activeId}
                type="button"
                onClick={() => setActiveId(service.id)}
                className={cn(
                  "rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
                  service.id === activeId
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-slate-600 hover:bg-secondary/20 hover:text-accent",
                )}
              >
                {service.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-slate-900">{activeService?.name}</h2>
                <p className="mt-2 text-slate-600">
                  Comprehensive care and transparent rates for all your{" "}
                  {activeService?.name.toLowerCase()} needs.
                </p>
              </div>

              {bulk.length > 0 && (
                <section className="mb-10">
                  <h3 className="mb-4 text-lg font-bold text-accent">Bulk Pricing</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {bulk.map((item) => (
                      <PriceCard
                        key={item.id}
                        name={item.name}
                        unit={item.unit}
                        price={item.price}
                      />
                    ))}
                  </div>
                </section>
              )}

              {individual.length > 0 && (
                <section>
                  <h3 className="mb-4 text-lg font-bold text-accent">
                    {bulk.length > 0 ? "Individual Item Pricing" : "Item Pricing"}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {individual.map((item) => (
                      <PriceCard
                        key={item.id}
                        name={item.name}
                        unit={item.unit}
                        price={item.price}
                      />
                    ))}
                  </div>
                </section>
              )}

              {items.length === 0 && (
                <p className="text-center text-slate-500">
                  No pricing items available for this service yet.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      )}

      <p className="mt-12 text-center text-sm text-slate-500">
        Prices are indicative and may vary slightly based on the fabric, condition, and special
        requirements of the garments.
      </p>
    </div>
  )
}

function PriceCard({
  name,
  unit,
  price,
}: {
  name: string
  unit: string
  price: number
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
      <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800">{name}</h4>
      <div className="mt-3 flex items-end justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {formatUnit(unit)}
        </span>
        <span className="text-2xl font-extrabold text-primary">{formatPrice(price)}</span>
      </div>
    </div>
  )
}
