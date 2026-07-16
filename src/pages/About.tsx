import { motion } from "framer-motion"
import { coreValues } from "@/data/services"
import { site } from "@/data/site"

export function About() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-4xl font-extrabold text-slate-900 sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Our Story
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600">
            <p>
              Founded with a simple mission to take the hassle out of laundry day, Durga's Laundry
              Services has grown into a trusted name in premium garment care.
            </p>
            <p>
              We noticed that busy professionals and families were spending hours every week
              sorting, washing, and ironing. We wanted to give that time back, providing a service
              that treats every garment with the same care you would at home—but with professional
              results.
            </p>
            <p>
              Today, we operate a state-of-the-art facility, combining traditional attention to
              detail with modern, eco-friendly cleaning technology to deliver excellence at every
              level.
            </p>
          </div>

          <div className="mt-8 inline-flex flex-col rounded-xl border border-border/60 bg-card px-6 py-5 shadow-sm">
            <span className="text-4xl font-extrabold text-primary">{site.garmentsPerMonth}</span>
            <span className="mt-1 text-sm font-medium text-slate-600">
              Garments cleaned with care every month
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-2xl shadow-lg"
        >
          <img
            src={site.aboutImage}
            alt="Professional laundry facility"
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-accent/40 to-transparent" />
        </motion.div>
      </section>

      <section className="border-t border-border/50 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2
              className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Our Core Values
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              The principles that guide every wash, fold, and delivery.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-xl border border-border/60 bg-card p-6 shadow-sm"
              >
                <div className="mb-3 h-1.5 w-10 rounded-full bg-secondary" />
                <h3 className="text-lg font-bold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
