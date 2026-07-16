import { Link } from "react-router-dom"
import { Mail, MapPin, Phone } from "lucide-react"
import { site } from "@/data/site"
import { coreServices } from "@/data/services"

export function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <div className="mb-4 flex items-center gap-3">
            <img
              src={site.logo}
              alt="Durga's Dry Cleaning & Laundry Logo"
              className="h-12 w-12 rounded-full object-cover ring-2 ring-secondary"
            />
            <div>
              <p className="text-xl font-bold text-secondary">Durga's</p>
              <p className="text-xs font-medium uppercase tracking-wide text-secondary/80">
                Dry Cleaning & Laundry
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-accent-foreground/70">
            {site.footerBlurb}
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-secondary">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              ["/", "Home"],
              ["/services", "Services"],
              ["/pricing", "Pricing"],
              ["/about", "About"],
              ["/contact", "Contact"],
              ["/enquiry", "Book Pickup"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-accent-foreground/60 transition-colors hover:text-secondary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-secondary">Our Services</h3>
          <ul className="space-y-2 text-sm">
            {coreServices.map((service) => (
              <li key={service.slug}>
                <Link
                  to="/services"
                  className="text-accent-foreground/60 transition-colors hover:text-secondary"
                >
                  {service.name === "Iron" ? "Steam Ironing" : service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-secondary">Contact</h3>
          <ul className="space-y-3 text-sm text-accent-foreground/70">
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <a href={`tel:${site.phone}`} className="hover:text-secondary">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <a href={`mailto:${site.email}`} className="hover:text-secondary break-all">
                {site.email}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <span>{site.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-accent-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-accent-foreground/50 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
