# Level 2 Laundry — Site Replica

A React + Vite + Tailwind replica of [level2laundry.com](https://www.level2laundry.com/) (Durga's Dry Cleaning & Laundry).

## Run locally

```bash
npm install
cp .env.example .env
# set VITE_GOOGLE_SHEET_ID in .env
npm run dev
```

## Pricing from Google Sheets

Categories, items, and prices load live from a Google Spreadsheet.

1. Create a sheet (or import `public/pricing-seed.csv`).
2. Use these columns on the first row:

   | category | item | price | unit | active |
   |---|---|---|---|---|
   | Wash & Fold | WASH & FOLD MEN | 250 | PER KG | TRUE |

3. Share the sheet as **Anyone with the link → Viewer**.
4. Copy the spreadsheet ID from the URL into `.env`:

   ```bash
   VITE_GOOGLE_SHEET_ID=your_spreadsheet_id
   VITE_GOOGLE_SHEET_GID=0
   ```

5. Restart `npm run dev` (Vite reads env at startup).

If the sheet ID is missing or the fetch fails, the app falls back to bundled `src/data/pricing.json`.

For GitHub Pages, add the same `VITE_GOOGLE_SHEET_*` values as repository Actions secrets / env vars used by your build, or bake them into the build environment.

## GitHub Pages

Site URL: **https://level2wash.com** (also `https://inqubyte.github.io/level2wash/`)

- Vite `base` is `/` (custom domain at site root)
- `public/CNAME` → `level2wash.com`
- Routing uses `HashRouter` (URLs like `/#/pricing`)
- Deploy workflow: `.github/workflows/deploy-pages.yml` (builds on every push to `main`)

### Custom domain DNS (apex)

At your domain registrar for `level2wash.com`:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `AAAA` | `@` | `2606:50c0:8000::153` |
| `AAAA` | `@` | `2606:50c0:8001::153` |
| `AAAA` | `@` | `2606:50c0:8002::153` |
| `AAAA` | `@` | `2606:50c0:8003::153` |

Optional `www` → CNAME to `inqubyte.github.io`, then add `www.level2wash.com` in Pages settings too.

On GitHub: **Settings → Pages → Custom domain** → `level2wash.com` → Save → enable **Enforce HTTPS** after DNS propagates.

## Pages

- `/` — Home / hero + core services
- `/services` — Full service details
- `/pricing` — Live rate cards (91 items across 4 services)
- `/about` — Story & values
- `/contact` — Contact form + WhatsApp / phone
- `/enquiry` — Book pickup & quote calculator

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 7
- Framer Motion + Lucide icons
