import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Phone, MapPin, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/Button"
import { site } from "@/data/site"

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      e.currentTarget.reset()
    }, 700)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1
          className="text-4xl font-extrabold text-slate-900 sm:text-5xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Contact Us
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600 text-balance">
          Have a question or need assistance? We're here to help. Reach out to our customer care
          team today.
        </p>
      </div>

      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        <a
          href={`tel:${site.phone}`}
          className="rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
        >
          <Phone className="mb-3 h-6 w-6 text-primary" />
          <h3 className="font-bold text-slate-900">Call Us</h3>
          <p className="mt-1 text-sm text-slate-500">{site.hours}</p>
          <p className="mt-3 font-semibold text-accent">{site.phone}</p>
        </a>

        <a
          href={`https://wa.me/91${site.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
        >
          <MessageCircle className="mb-3 h-6 w-6 text-[#25D366]" />
          <h3 className="font-bold text-slate-900">WhatsApp</h3>
          <p className="mt-1 text-sm text-slate-500">Instant replies during business hours</p>
          <p className="mt-3 font-semibold text-[#25D366]">Chat Now</p>
        </a>

        <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
          <MapPin className="mb-3 h-6 w-6 text-primary" />
          <h3 className="font-bold text-slate-900">Visit Us</h3>
          <p className="mt-1 text-sm font-medium text-accent">{site.shortBrand}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{site.address}</p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900">Send a Message</h2>
          <p className="mt-2 text-slate-600">
            Fill out the form below and we'll get back to you shortly.
          </p>

          {submitted ? (
            <div className="mt-8 flex flex-col items-center rounded-xl bg-emerald-50 px-6 py-10 text-center">
              <CheckCircle2 className="mb-3 h-10 w-10 text-emerald-600" />
              <p className="font-semibold text-emerald-800">
                Message sent successfully! We will get back to you soon.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSubmitted(false)}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Field label="Full Name" name="name" required />
              <Field label="Phone Number" name="phone" type="tel" required />
              <Field label="Email Address" name="email" type="email" required />
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Message</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none ring-ring transition focus:ring-2"
                />
              </label>
              <Button type="submit" className="w-full" disabled={sending}>
                {sending ? "Sending Message..." : "Send Message"}
              </Button>
            </form>
          )}
        </motion.div>

        <div className="overflow-hidden rounded-xl shadow-lg">
          <img
            src={site.contactImage}
            alt="Customer service representative"
            className="h-full min-h-[320px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none ring-ring transition focus:ring-2"
      />
    </label>
  )
}
