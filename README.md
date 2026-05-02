# ClientOps Suite

> A collaborative client operations platform that unifies leads, bookings, projects, quotes, and revenue insights into a single workflow.

**Live demo:** [laurandreea10.github.io/clientops](https://laurandreea10.github.io/clientops/)

---

## What this is

ClientOps Suite is a flagship SaaS front-end demo modeling the full client lifecycle — from lead qualification and scheduling, to project delivery, quoting, and performance analytics. Built with a focus on high-complexity UI state, modular architecture, scheduling conflict logic, deadline intelligence, and reusable product patterns.

This repository contains **Phase 1** — the CRM/Pipeline + Dashboard vertical slice. Subsequent modules (Calendar, Projects/Kanban, Catalog, Analytics, Activity, Settings) are scaffolded as placeholder pages and will be built in upcoming phases.

## What's implemented

- **Dashboard** with KPI cards (sparklines, deltas), revenue trend chart (booked vs forecast), lead source donut, conversion funnel, today's actions, high-priority watchlist
- **Pipeline** with 7 stages, full drag-and-drop between stages, owner filter, live search, totals per column
- **Lead Detail Drawer** with stage progression UI, 4 tabs (Overview, Activity, Notes, Bookings), live note composer, score breakdown, contact info
- **Command Palette** (⌘K / Ctrl+K) with fuzzy search across leads and pages
- **Sidebar navigation** with workspace switcher, active states, badge counters
- **Topbar** with breadcrumbs, search trigger, notifications

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **Recharts** for data viz
- **Lucide React** for iconography
- **Native HTML5 drag-and-drop** (no external dnd library — keeps bundle small)
- Custom typography stack: Fraunces (display), Inter Tight (body), JetBrains Mono (numerics)

## Local setup

```bash
git clone https://github.com/laurandreea10/clientops.git
cd clientops
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview  # preview the production build locally
```

## Deploy to GitHub Pages

The repository ships with a GitHub Actions workflow at `.github/workflows/deploy.yml` that auto-deploys on every push to `main`.

### One-time setup

1. Push this repo to `https://github.com/laurandreea10/clientops`
2. Go to **Settings → Pages**
3. Under "Build and deployment", set **Source** to `GitHub Actions`
4. Push to `main` — the workflow will run, build the site, and publish to `https://laurandreea10.github.io/clientops/`

If the repo name changes, update `base` in `vite.config.js` to match: `base: "/your-repo-name/"`.

## Project structure

```
clientops/
├── .github/workflows/deploy.yml  # Auto-deploy on push to main
├── public/                       # Static assets
├── src/
│   ├── App.jsx                   # All UI components (single file for now)
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Tailwind directives + global styles
├── index.html                    # HTML shell with font preloads
├── vite.config.js                # Vite config (base: "/clientops/")
├── tailwind.config.js
└── package.json
```

> **Note:** `App.jsx` is currently a single-file component (~1,400 lines) for ease of demonstration. As the project grows past Phase 1, components will be split into `src/features/{crm,booking,planner,...}/` per the architecture spec.

## Design system

- **Color palette:** zinc-950 base, single amber-400 accent for CTAs/highlights, semantic colors (emerald/rose/sky/violet) for status communication only
- **Typography:** Fraunces italic for editorial moments (greetings, large numerics), Inter Tight for UI, JetBrains Mono for tabular data and IDs
- **Spacing:** Dense — modeled on Linear and Attio rather than typical "spacious B2B SaaS"
- **Motion:** Subtle (150–300ms cubic-bezier), used for entry animations and state transitions only

## Roadmap

- [x] **Phase 1:** Foundations + Dashboard + Pipeline + Lead Detail (current release)
- [ ] **Phase 2:** Calendar + Booking flows with conflict detection
- [ ] **Phase 3:** Projects + Kanban board with drag-and-drop tasks
- [ ] **Phase 4:** Service catalog + Quote builder + promo logic
- [ ] **Phase 5:** Analytics with period comparison + insight cards
- [ ] **Phase 6:** Activity feed + cross-module automation events
- [ ] **Phase 7:** Settings, RBAC, real auth, Supabase backend

See `clientops-implementation-spec.md` for the full implementation plan.

## Case study notes

**Problem:** In small-to-mid agencies and service businesses, the client lifecycle is fragmented across spreadsheets, calendars, CRMs, project tools, and PDF quotes. Context is lost at every handoff.

**Approach:** Model the entire client journey as a single coherent flow — Lead → Booking → Quote → Client → Project → Insights — with one shared design language and one activity feed as the narrative thread.

**Technical decisions:**
- Single `App.jsx` for Phase 1 to demonstrate full UI state holistically before splitting into feature folders
- Native HTML5 drag-and-drop instead of `dnd-kit` to keep dependencies minimal
- Mock data layer with realistic distribution (lead stages, priorities, scoring) rather than uniform seeds
- Semantic design tokens via Tailwind utility classes — no hardcoded hex outside the chart layer
- Score visualization uses SVG + `strokeDashoffset` instead of a chart library for a 28px ring

**What this demonstrates:**
- Multi-module product architecture
- Complex UI state (drag-and-drop, drawer + tab navigation, keyboard shortcuts)
- Reusable component patterns (Avatar, Badge, Button, ScoreRing)
- Restrained, intentional design system
- Production-grade attention to detail (tabular numerics, font selection, hover states, transitions)

## License

MIT
