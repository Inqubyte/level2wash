import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/Button"
import { coreServices } from "@/data/services"
import { site } from "@/data/site"
import { formatPrice } from "@/data/pricing"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export function Home() {
  return (
    <>
      <section className="relative isolate min-h-[calc(100vh-4.5rem)] overflow-hidden">
        <img
          src={site.heroImage}
          alt="Clean laundry background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/90 via-accent/75 to-primary/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(51_100%_50%_/_0.25),transparent_55%)]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.12 }}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="mb-6 flex items-center gap-4">
              <img
                src={site.logo}
                alt="Durga's Dry Cleaning & Laundry Logo"
                className="h-20 w-20 rounded-full object-cover ring-4 ring-secondary/70 shadow-xl sm:h-24 sm:w-24"
              />
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-secondary sm:text-3xl">
                  Durga's
                </p>
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-secondary/85">
                  Dry Cleaning & Laundry
                </p>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Next level care{" "}
              <span className="text-secondary">for your garments.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="mt-5 max-w-[42ch] text-lg leading-relaxed text-white/85"
            >
              {site.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button to="/enquiry" size="lg" variant="secondary">
                Book Now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                to="/pricing"
                size="lg"
                className="border-2 border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20"
              >
                View Pricing
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Our Core Services
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-600 text-balance">
            From everyday wear to delicate fabrics, we provide comprehensive care for all your
            garments.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coreServices.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
              >
                <Link
                  to="/services"
                  className="group flex h-full flex-col rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {service.short}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-primary">
                    Starting from {formatPrice(service.startingFrom)}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="border-y border-border/50 bg-accent">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-extrabold text-secondary sm:text-3xl">
              Ready for fresh, crisp clothes?
            </h2>
            <p className="mt-2 max-w-xl text-accent-foreground/70">
              Schedule a pickup in minutes. We'll take care of the rest — wash, press, and deliver.
            </p>
          </div>
          <Button to="/enquiry" size="lg" variant="secondary">
            Book a Pickup
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  )
}
