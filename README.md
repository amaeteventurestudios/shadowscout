# ShadowScout — Ligue 2 Scouting Intelligence Platform

## Project Overview
ShadowScout is a dark-theme, data-first football scouting UI prototype focused on France Ligue 2 player discovery. It comprises a public landing page, a login page, and a protected dashboard.

---

## Completed Features

### 🌐 Landing Page (`landing.html`)
- **Fixed-width boxed container layout** (max 1100px, responsive)
- **Blue brand theme** throughout — no orange anywhere
- **Hero section** with animated Signal Board card (floating), real player photos (circular avatars), social proof faces
- **Problem section** — quote block with Ligue 2 scouting context
- **How It Works** — 4-step grid: Data Ingestion → Role Scoring → Signal Detection → Intelligence Output
- **Features bento grid** (visually appealing desktop layout):
  - *Signal Board* — tall left card with mini board preview showing 4 player photos + scores
  - *Shadow Tags* — colour-coded tag cloud (blue, teal, red, amber, green, purple)
  - *Monthly Signal Brief* — PDF + web format items
  - *Role-Based Discovery* — full-width card with role pill grid + player photo stack (right side)
- **Example Signals** — 3 signal cards with player photos, scores, italic reason, and tags
- **What It Is Not** — 2×2 clarity grid with red ✕ icons
- **Why Start With Ligue 2** — stats grid + destination league pills (MLS removed, no longer referenced)
- **Built For** — 4 user cards (scouts, agents, analysts, clubs)
- **Pricing** — 3-tier grid ($99/$199/$499+) with featured card highlighted in blue
- **Early Access** — email capture form with success state
- **Responsive** — desktop, tablet (768px), and mobile (480px) breakpoints

### 🔑 Login Page (`login.html`)
- **Boxed fixed-width layout** (max 1000px, centered on screen, card-style)
- **Blue theme** — accent `#4F8EF7` replacing previous orange throughout
- **Left form column**: logo, "Welcome back" heading, username/password fields, error handling, loading state
- **Right side panel** (desktop only): Live Signal Board preview with 5 player photos (circular with role info), stats (12 signals, 7 U23, 5 roles), blue Shadow Tag badges
- **Demo credentials**: `shadow` / `scout`
- **"Use Demo Credentials" button** — fills form with flash animation
- **Session management** — 8-hour localStorage session, redirects to dashboard if already logged in
- **Responsive** — side panel hidden on mobile, form fills screen

### 📊 Dashboard (`dashboard.html`)
- Fixed sidebar + top nav (16:9 desktop layout)
- All-blue accent scheme (`#4F8EF7`)
- 20 AI-generated fictional player headshots integrated throughout
- Hero signal alert cards, 5 role panels, 10 players worth reviewing, signal movers, shadow tags panel
- Player detail modal with stats and watchlist button
- Live pulse updates (signal scores every 8s)
- Auth guard — redirects to login if no valid session

---

## Entry Points

| Path | Description |
|---|---|
| `landing.html` | Public marketing page (default entry) |
| `login.html` | Authentication page |
| `dashboard.html` | Protected dashboard (requires login) |

**Demo login**: Username `shadow`, Password `scout`

---

## Player Image Assets (`images/players/`)

| File | Player | Role |
|---|---|---|
| `td.jpg` | T. Diallo | Ball-Winning 6 · Caen |
| `yl.jpg` | Y. Lefebvre | Ball-Winning 6 |
| `hs.jpg` | H. Sagna | Ball-Winning 6 |
| `ek.jpg` | E. Kroupi | Progressive 8 · Grenoble |
| `nl.jpg` | N. Lebreton | Progressive 8 · Pau |
| `mt.jpg` | M. Tourraine | Progressive 8 · Valenciennes |
| `ld.jpg` | L. Diarra | Aerial CB · Metz |
| `cv.jpg` | C. Vidal | Aerial CB · Auxerre |
| `mc.jpg` | M. Camara | Aerial CB · Amiens |
| `st.jpg` | S. Traoré | Attacking Fullback · Dunkerque |
| `bp.jpg` | B. Perrin | Attacking Fullback |
| `lo.jpg` | L. Ouattara | Attacking Fullback · Annecy |
| `ak.jpg` | A. Konaté | Box-Threat Forward · Bastia |
| `jn.jpg` | J. Njo Lea | Box-Threat Forward · Amiens |
| `ml.jpg` | M. Larbi | Box-Threat Forward · Quevilly |
| `rt.jpg` | R. Taibi | Signal Mover (Rising) |
| `mi.jpg` | M. Ifnaoui | Signal Mover (Rising) |
| `jm.jpg` | J. Moreira | Signal Mover (Rising) |
| `ad.jpg` | A. Doukansy | Signal Mover (Dropping) |
| `vm.jpg` | V. Maraval | Signal Mover (Dropping) |

---

## CSS Architecture

| File | Purpose |
|---|---|
| `css/landing.css` | Shared base styles: variables, buttons, nav, footer, containers |
| `css/landing-page.css` | Landing page section styles: hero, features bento, pricing, etc. |
| `css/login.css` | Login page layout + blue theme |
| `css/style.css` | Dashboard base styles |
| `css/extras.css` | Dashboard utility styles |

---

## Color Scheme (Blue Theme)

- **Background**: `#080f1c` (base), `#0d1629` (surface), `#0f1e35` (card)
- **Accent**: `#4F8EF7` (blue), `#6aa3f9` (hover)
- **Signal green**: `#10b981` · **Signal amber**: `#f59e0b` · **Signal red**: `#ef4444`
- **Signal cyan**: `#06b6d4` · **Signal purple**: `#a855f7`

---

## Not Yet Implemented
- Backend/API integration (by design — client-side only)
- Real player data (fictional data used throughout)
- Video player integration
- Actual PDF generation for Signal Brief
- Multi-user sessions or team accounts

## Recommended Next Steps
1. Add smooth page transitions between landing → login → dashboard
2. Implement a more detailed player profile page
3. Add a working watchlist (using the Table API for persistence)
4. Expand signal card animations on the landing page hero
5. Add a "Roles" detail page accessible from the dashboard sidebar
