import { parseCsv, rowsToObjects } from "@/lib/csv"
import type { PricingItem, ServiceType } from "@/data/pricing"
import fallbackData from "@/data/pricing.json"

export type PricingCatalog = {
  services: ServiceType[]
  items: PricingItem[]
  source: "google-sheets" | "fallback"
}

/** Public pricing sheet (overridable via .env). */
const DEFAULT_SHEET_ID = "1_QfD9cYKZ1sarEes8EpaxUdIeX2pJCNruI07KkIDkMQ"
const DEFAULT_SHEET_GID = "1626530727"

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function isActive(value: string | undefined) {
  if (value == null || value === "") return true
  const normalized = value.trim().toLowerCase()
  return !["false", "0", "no", "n", "inactive", "off"].includes(normalized)
}

function getField(row: Record<string, string>, keys: string[]) {
  for (const key of keys) {
    if (row[key] != null && row[key] !== "") return row[key]
  }
  return ""
}

export function catalogFromSheetRows(rows: Record<string, string>[]): PricingCatalog {
  const servicesById = new Map<string, ServiceType>()
  const items: PricingItem[] = []

  for (const row of rows) {
    const category = getField(row, ["category", "service", "service type", "servicetype"])
    const name = getField(row, ["item", "item name", "item_name", "name"])
    const priceRaw = getField(row, ["price", "rate", "amount"])
    const unit = getField(row, ["unit", "uom"]) || "PER PIECE"
    const active = isActive(getField(row, ["active", "is_active", "enabled"]))

    if (!category || !name || !active) continue

    const price = Number(String(priceRaw).replace(/[₹,\s]/g, ""))
    if (!Number.isFinite(price) || price < 0) continue

    const serviceId = slugify(category)
    if (!servicesById.has(serviceId)) {
      servicesById.set(serviceId, {
        id: serviceId,
        slug: serviceId,
        name: category,
      })
    }

    const itemId = getField(row, ["id", "item_id"]) || `${serviceId}-${slugify(name)}`

    items.push({
      id: itemId,
      name,
      price,
      unit: unit.toUpperCase().startsWith("PER") ? unit.toUpperCase() : `PER ${unit.toUpperCase()}`,
      serviceTypeId: serviceId,
    })
  }

  return {
    services: Array.from(servicesById.values()),
    items,
    source: "google-sheets",
  }
}

export function fallbackCatalog(): PricingCatalog {
  return {
    services: fallbackData.services as ServiceType[],
    items: fallbackData.items as PricingItem[],
    source: "fallback",
  }
}

function sheetConfig() {
  return {
    sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID?.trim() || DEFAULT_SHEET_ID,
    gid: import.meta.env.VITE_GOOGLE_SHEET_GID?.trim() || DEFAULT_SHEET_GID,
  }
}

/** Direct Google gviz URL (works on GitHub Pages when CORS allows). */
export function sheetsCsvUrl(sheetId: string, gid = "0", cacheBust = Date.now()) {
  const params = new URLSearchParams({
    tqx: "out:csv",
    gid,
    _: String(cacheBust),
  })
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?${params}`
}

/**
 * Same-origin Vite proxy URL (dev / preview only).
 * Avoids browser CORS issues when talking to Google.
 */
export function sheetsProxyUrl(sheetId: string, gid = "0", cacheBust = Date.now()) {
  const params = new URLSearchParams({
    tqx: "out:csv",
    gid,
    _: String(cacheBust),
  })
  return `/sheets-api/spreadsheets/d/${sheetId}/gviz/tq?${params}`
}

async function fetchCsv(url: string): Promise<string> {
  const response = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "text/csv,text/plain,*/*" },
  })

  if (!response.ok) {
    throw new Error(`Google Sheet request failed (${response.status})`)
  }

  const contentType = response.headers.get("content-type") || ""
  const text = await response.text()

  if (
    contentType.includes("text/html") ||
    text.trimStart().startsWith("<!") ||
    text.includes("google.visualization.Query.setResponse")
  ) {
    throw new Error(
      "Google Sheet is not publicly readable. Share it as “Anyone with the link can view”.",
    )
  }

  return text
}

export async function fetchPricingFromGoogleSheet(
  sheetId: string,
  gid = "0",
): Promise<PricingCatalog> {
  const cacheBust = Date.now()
  const urls = import.meta.env.DEV
    ? [sheetsProxyUrl(sheetId, gid, cacheBust), sheetsCsvUrl(sheetId, gid, cacheBust)]
    : [sheetsCsvUrl(sheetId, gid, cacheBust), sheetsProxyUrl(sheetId, gid, cacheBust)]

  let lastError: unknown
  for (const url of urls) {
    try {
      const text = await fetchCsv(url)
      const catalog = catalogFromSheetRows(rowsToObjects(parseCsv(text)))
      if (catalog.services.length === 0 || catalog.items.length === 0) {
        throw new Error("Google Sheet had no valid pricing rows")
      }
      return catalog
    } catch (error) {
      lastError = error
      console.warn("[pricing] fetch failed for", url, error)
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Failed to load Google Sheet")
}

export async function loadPricingCatalog(): Promise<PricingCatalog> {
  const { sheetId, gid } = sheetConfig()

  try {
    return await fetchPricingFromGoogleSheet(sheetId, gid)
  } catch (error) {
    console.error("[pricing] Falling back to local data:", error)
    return fallbackCatalog()
  }
}
