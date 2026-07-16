import { Shirt, Sparkles, Wind, Droplets } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type ServiceInfo = {
  slug: string
  name: string
  startingFrom: number
  short: string
  description: string
  features: string[]
  icon: LucideIcon
}

export const coreServices: ServiceInfo[] = [
  {
    slug: "wash-fold",
    name: "Wash & Fold",
    startingFrom: 250,
    short: "Everyday laundry washed, dried, and neatly folded. Starting from ₹250.",
    description:
      "Professional washing service for your everyday clothes. We sort by color and fabric type, using premium eco-friendly detergents to keep your garments fresh, clean, and vibrant.",
    features: ["Color sorting", "Eco-friendly detergents", "Neatly folded"],
    icon: Shirt,
  },
  {
    slug: "wash-iron",
    name: "Wash & Iron",
    startingFrom: 300,
    short: "Washed and professionally pressed for a crisp look. Starting from ₹300.",
    description:
      "The complete package for your everyday wear. Clothes are washed with care and professionally pressed for a crisp, ready-to-wear look.",
    features: ["Deep cleaning", "Professional pressing", "Hanger or fold options"],
    icon: Sparkles,
  },
  {
    slug: "steam-ironing",
    name: "Iron",
    startingFrom: 15,
    short: "Professional steam ironing for wrinkle-free clothes. Starting from ₹15.",
    description:
      "Crisp and wrinkle-free ironing service for all types of garments. Perfect finishing touches for your professional and casual wear.",
    features: ["Steam pressing", "Crease perfection", "Quick turnaround"],
    icon: Wind,
  },
  {
    slug: "dry-cleaning",
    name: "Dry Cleaning",
    startingFrom: 40,
    short: "Expert care for delicate fabrics and formal wear. Starting from ₹40.",
    description:
      "Expert dry cleaning for delicate fabrics, suits, and formal wear. Our advanced cleaning process removes tough stains while preserving the integrity of your garments.",
    features: ["Stain pre-treatment", "Fabric preservation", "Odor removal"],
    icon: Droplets,
  },
]

export const coreValues = [
  {
    title: "Quality First",
    description:
      "We never compromise on the quality of our cleaning processes or the products we use.",
  },
  {
    title: "Eco-Friendly",
    description:
      "Committed to using environmentally safe detergents that are tough on stains but gentle on the planet.",
  },
  {
    title: "Reliability",
    description: "Punctual pickups and deliveries. We respect your time and schedule.",
  },
  {
    title: "Customer Focus",
    description:
      "Your satisfaction is our priority. We listen to your specific garment care needs.",
  },
] as const
