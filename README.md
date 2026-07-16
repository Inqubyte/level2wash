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

Site URL: **https://inqubyte.github.io/level2wash/**

- Vite `base` is `/level2wash/`
- Routing uses `HashRouter` (URLs like `/level2wash/#/pricing`)
- Deploy workflow: `.github/workflows/deploy-pages.yml` (builds on every push to `main`)

### One-time setup

1. Push this repo to `Inqubyte/level2wash` (including the workflow file).
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Optional: **Settings → Secrets and variables → Actions → Variables**  
   - `VITE_GOOGLE_SHEET_ID`  
   - `VITE_GOOGLE_SHEET_GID`  
   (defaults are already baked into the app if unset)
4. If the repo is **private**, Pages may require a paid GitHub plan — make the repo **public** for free hosting.
5. Open the Actions tab, wait for **Deploy to GitHub Pages** to finish, then visit the site URL.

## Pages

- `/` — Home / hero + core services
- `/services` — Full service details
- `/pricing` — Live rate cards (91 items across 4 services)
- `/about` — Story & values
- `/contact` — Contact form + WhatsApp / phone
- `/enquiry` — Book pickup & quote calculator
- `/login`, `/signup` — Auth UI (front-end only)

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 7
- Framer Motion + Lucide icons
