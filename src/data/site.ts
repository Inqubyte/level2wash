export const site = {
  brand: "Durga's Dry Cleaning & Laundry",
  shortBrand: "Level 2 Laundry Services",
  tagline: "Next level care for your garments.",
  description:
    "Experience premium laundry and dry cleaning services. We handle the chores so you can focus on what matters most.",
  footerBlurb:
    "Premium laundry and dry cleaning services delivered to your doorstep. Quality care for your everyday wear.",
  phone: "9848131177",
  whatsapp: "9848131177",
  email: "level2laundry6@gmail.com",
  hours: "Mon-Sat from 8am to 8pm",
  address:
    "Plot No 234, HUDA Layout, Nallagandala, Hyderabad – 500019, Opposite to Citizens Hospital",
  city: "Hyderabad, Telangana, India",
  logo: `${import.meta.env.BASE_URL}logo.png`,
  heroImage:
    "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=2071&auto=format&fit=crop",
  aboutImage:
    "https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?q=80&w=2070&auto=format&fit=crop",
  contactImage:
    "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop",
  garmentsPerMonth: "10,000+",
} as const

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const
