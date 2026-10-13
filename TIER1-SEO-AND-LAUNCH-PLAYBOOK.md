# PlumbSquare — Tier-1 (US / UK / CA / AU) Launch, SEO & AdSense Playbook

## 1. Why This Exact Website Was Built (Deep Research Findings)
Before writing a single line of code, we ran live search-engine audits across Google's 2026 Tier-1 SERPs for the three highest-RPM micro-tool categories. Here is what the live data showed:

1. **Proof that a `github.io` Subdomain & Brand-New Domains Rank Page 1 in This Niche:**
   - Searching `"even spacing calculator woodworking"` or `"baluster spacing calculator"` on Google US returns **`prodirt-llc.github.io/evenspacing/`** (a single-page `github.io` subdomain!) alongside brand-new independent sites like `stairscalc.com`, `deckandstair.com`, `calcfence.com`, `boardfootcalculator.app`, `woodformulas.com`, and `vibecalc.app`.
2. **Why Google AI Overviews Cannot Replace Visual Carpentry Calculators:**
   - A text paragraph cannot draw a **scaled 2×12 stair stringer blueprint**, check remaining throat depth against `3-1/2"` IRC code, convert `14.6875"` into **`14 11/16"` tape-measure fractions**, or generate a **cumulative hook-to-blade layout table** that a carpenter prints out for the miter saw stand.
3. **Tier-1 AdSense RPM ($20–$45 RPM) + High-Ticket Affiliate Potential:**
   - Visitors searching for stair stringer cuts, deck board counts, fence post concrete bags, and board-and-batten layouts are actively buying lumber, power tools, fasteners, and composite decking in the **United States, Canada, the UK, and Australia**.
   - Home improvement advertisers (Home Depot, Lowe's, DeWalt, Milwaukee Tool, Trex, Simpson Strong-Tie, Rockler) bid **$1.50 to $4.50+ CPC**, resulting in **$20 to $45 AdSense Page RPM**.

---

## 2. Complete Site Inventory (22 Pages + Assets)

### 10 Interactive Visual Blueprint Calculators (`/tools/`)
| # | File | Target Tier-1 Search Keywords | Live Interactive Features |
|---|---|---|---|
| 1 | `tools/stair-stringer-calculator.html` | `stair stringer calculator`, `stair rise and run calculator`, `2x12 stringer layout` | Scaled SVG stair stringer side profile, IRC R311.7 code check, bottom riser tread-drop math, cumulative framing square notch table |
| 2 | `tools/board-and-batten-calculator.html` | `board and batten calculator`, `wainscoting layout calculator`, `wall paneling spacing` | Scaled wall elevation SVG, on-center + clear bay gap in `1/16"` fractions, left-to-right cumulative tape-measure hook marks |
| 3 | `tools/even-spacing-calculator.html` | `even spacing calculator`, `baluster spacing calculator`, `slat wall gap calculator` | IRC 4-inch sphere code badge, Edge-to-Edge vs Center-to-Center SVG blueprint, cumulative spindle hook marks |
| 4 | `tools/plywood-cut-list-optimizer.html` | `plywood cut list calculator`, `4x8 sheet layout optimizer`, `kerf cut calculator` | Interactive 2D guillotine bin-packing across 4×8/5×5 sheets, saw blade kerf allowance, multi-sheet selector |
| 5 | `tools/board-foot-calculator.html` | `board foot calculator`, `hardwood lumber price calculator`, `4/4 8/4 lumber calculator` | Multi-species rough/S4S hardwood invoice builder (Walnut, White Oak, Cherry, Maple), waste %, linear-foot converter |
| 6 | `tools/wall-stud-framing-calculator.html` | `wall stud calculator`, `16 vs 24 oc stud framing calculator`, `plate and header lumber list` | Scaled wall framing elevation SVG (sole plate, double top plate, king/jack/cripple studs), 4×8 OSB sheathing count |
| 7 | `tools/deck-board-joist-calculator.html` | `deck board calculator`, `deck joist & footing calculator`, `hidden fastener deck calculator` | Top-down deck framing + board layout SVG, IRC joist span check, hidden clip + ledger screw + concrete bag estimator |
| 8 | `tools/fence-post-picket-calculator.html` | `fence post and picket calculator`, `privacy fence material calculator`, `concrete per post` | Fence elevation SVG (dog-ear, shadowbox, horizontal slat), cylindrical post-hole minus post displacement concrete math |
| 9 | `tools/crown-molding-miter-calculator.html` | `crown molding miter bevel angle calculator`, `38 45 spring angle chart`, `out of square corner crown` | Compound miter saw dual-dial SVG, nested vs flat-on-table trigonometry for any wall angle (`60°–170°`), printable saw card |
| 10 | `tools/cabinet-shelf-sag-calculator.html` | `shelf sag calculator`, `bookshelf span deflection calculator`, `plywood vs mdf shelf sag` | Fixed-beam deflection mechanics (`L/360` limit), front hardwood edge-band stiffener I-beam math, exaggerated sag SVG |

### 4 Deep Field Reference Guides (`/guides/`) + Hub
- `guides/index.html` — Shop Reference Guides Hub
- `guides/nominal-vs-actual-lumber-chart.html` — Complete 1×, 2×, 4×, 5/4 & Hardwood Quarters Reference Table
- `guides/irc-stair-building-code-guide.html` — 2026 IRC R311.7 Stair Riser, Tread, Headroom & Baluster Guide
- `guides/board-and-batten-wall-layout-guide.html` — How to Layout Board & Batten Around Windows, Doors & Outlets
- `guides/plywood-sheet-grades-and-kerf-guide.html` — Plywood Veneer Grades (A–D), `23/32"` Caliper Thickness & Saw Kerf Guide

### AdSense & Technical SEO Infrastructure (Root)
- `index.html`, `about.html`, `contact.html`, `privacy-policy.html`, `terms-conditions.html`, `disclaimer.html`, `404.html`
- `sitemap.xml`, `robots.txt`, `ads.txt`, `update-domain.py`, `.github/workflows/deploy-pages.yml`

---

## 3. How to Deploy on GitHub Pages (`github.io`) OR a Custom Domain in 2 Minutes

### Option A: Deploy on Free GitHub Pages (`https://yourusername.github.io`)
1. Create a new public repository on GitHub (either `yourusername.github.io` for a root subdomain or any repo name like `plumbsquare`).
2. If your URL differs from `https://plumbsquare.github.io`, run the included one-line updater before pushing:
   ```bash
   python3 update-domain.py https://yourusername.github.io
   ```
3. Push all files in `plumbsquare-site/` to the `main` branch.
4. In GitHub → **Settings → Pages → Build and deployment**, select **GitHub Actions** (the workflow `.github/workflows/deploy-pages.yml` is already pre-configured!).

### Option B: Connect a Custom `.com` Domain Later
1. Buy any clean domain (e.g., `plumbsquare.com`, `sawmarkcalc.com`, `tapefraction.com`) on Cloudflare Registrar (~$10/yr).
2. Run:
   ```bash
   python3 update-domain.py https://yourcustomdomain.com
   ```
3. Add a `CNAME` file containing `yourcustomdomain.com` and enable **Enforce HTTPS** in GitHub Pages settings.

---

## 4. Fast Tier-1 Traffic & Backlink Seeding Strategy (Weeks 1–6)
Why did `prodirt-llc.github.io/evenspacing/` and `stairscalc.com` rank so fast in the US/CA/UK? Because woodworkers and DIY homeowners bookmark and share visual layout tools in forums and Pinterest boards!
1. **Google Search Console + Bing Webmaster Tools (Day 1):**
   - Submit `sitemap.xml` to both Google Search Console and Bing Webmaster Tools (Bing powers DuckDuckGo, Yahoo, and ChatGPT Search—and indexes `github.io` sites within 48 hours).
2. **Download Blueprint PNGs → Post to Pinterest (Days 2–14):**
   - Every calculator on PlumbSquare has a **"⬇ Download Blueprint PNG"** button that exports a crisp `1200px` workshop diagram with your brand watermark.
   - Pin 2–3 blueprints per tool on Pinterest targeting `"Board and Batten Wall Layout Chart"`, `"2x12 Stair Stringer Dimensions"`, and `"Plywood Cut Sheet Diagram"`. Pinterest drives massive US/CA/UK homeowner traffic within days.
3. **Helpful Replies in Woodworking & DIY Communities:**
   - Whenever someone on `r/BeginnerWoodWorking`, `r/Carpentry`, `r/HomeImprovement`, `r/Decks`, `SawMillCreek`, or `LumberJocks` asks *"How many battens should I use on an 11-foot wall?"*, use the **"🔗 Copy Shareable Layout Link"** button (e.g., `.../board-and-batten-calculator.html?wallW=132&panels=7`) to give them their exact `1/16"` hook marks and blueprint URL.
