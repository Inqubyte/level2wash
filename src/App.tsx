import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "@/components/Layout"
import { PricingProvider } from "@/context/PricingContext"
import { Home } from "@/pages/Home"
import { Services } from "@/pages/Services"
import { Pricing } from "@/pages/Pricing"
import { About } from "@/pages/About"
import { Contact } from "@/pages/Contact"
import { Enquiry } from "@/pages/Enquiry"

export default function App() {
  return (
    <HashRouter>
      <PricingProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="enquiry" element={<Enquiry />} />
            <Route path="book" element={<Navigate to="/enquiry" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </PricingProvider>
    </HashRouter>
  )
}
