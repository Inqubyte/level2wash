import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/Button"
import { coreServices } from "@/data/services"
import { formatPrice } from "@/data/pricing"

export function Services() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1
          className="text-4xl font-extrabold text-slate-900 sm:text-5xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Our Services
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600 text-balance">
          Comprehensive garment care tailored to your specific needs. We treat every item with the
          utmost respect and professionalism.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {coreServices.map((service, index) => {
          const Icon = service.icon
          return (
            <motion.article
              key={service.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="rounded-xl border border-border/60 bg-card p-8 shadow-sm"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="rounded-full bg-secondary/40 px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  Starting from {formatPrice(service.startingFrom)}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{service.name}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{service.description}</p>
              <ul className="mt-5 space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.article>
          )
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <Button to="/enquiry" size="lg">
          Book a Pickup & Get Quote
        </Button>
      </div>
    </div>
  )
}
