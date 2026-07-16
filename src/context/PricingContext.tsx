import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { PricingItem, ServiceType } from "@/data/pricing"
import {
  fallbackCatalog,
  loadPricingCatalog,
  type PricingCatalog,
} from "@/lib/googleSheets"

type PricingContextValue = {
  services: ServiceType[]
  items: PricingItem[]
  source: PricingCatalog["source"]
  loading: boolean
  error: string | null
  itemsForService: (serviceTypeId: string) => PricingItem[]
  reload: () => void
}

const PricingContext = createContext<PricingContextValue | null>(null)

export function PricingProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<PricingCatalog>(fallbackCatalog)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const next = await loadPricingCatalog()
        if (!cancelled) {
          setCatalog(next)
          if (next.source === "fallback" && import.meta.env.VITE_GOOGLE_SHEET_ID) {
            setError("Could not load Google Sheet; showing bundled prices.")
          }
        }
      } catch (err) {
        if (!cancelled) {
          setCatalog(fallbackCatalog())
          setError(err instanceof Error ? err.message : "Failed to load pricing")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [reloadToken])

  const value = useMemo<PricingContextValue>(
    () => ({
      services: catalog.services,
      items: catalog.items,
      source: catalog.source,
      loading,
      error,
      itemsForService: (serviceTypeId: string) =>
        catalog.items.filter((item) => item.serviceTypeId === serviceTypeId),
      reload: () => setReloadToken((n) => n + 1),
    }),
    [catalog, loading, error],
  )

  return <PricingContext.Provider value={value}>{children}</PricingContext.Provider>
}

export function usePricing() {
  const ctx = useContext(PricingContext)
  if (!ctx) {
    throw new Error("usePricing must be used within a PricingProvider")
  }
  return ctx
}
