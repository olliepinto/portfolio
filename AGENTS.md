# AGENTS.md — Project Context for Codex

## Project Summary
- Personal portfolio site for Ollie Pinto.
- Static-first site built with Astro 4 + React islands, Tailwind CSS, and Framer Motion.
- Content-driven UI; most copy and data live in `src/data/portfolio.json`.

## Stack
- Framework: Astro (`astro`).
- UI: React 18 (islands inside Astro).
- Styling: Tailwind CSS with CSS variables.
- Animation: Framer Motion.
- Icons: Lucide React.
- Fonts: `@fontsource/*` (Abril Fatface, Poppins, Geist Mono, Inter, Inter Tight, Newsreader).

## Commands
- `npm install`
- `npm run dev` (local dev server on `localhost:4321`)
- `npm run build`
- `npm run preview`

## Environment
- Required env var for contact form: `PUBLIC_WEB3FORMS_ACCESS_KEY`
- Example in `.env.example`.

## Routing and Layout
- Single page at `src/pages/index.astro`.
- Global wrapper/layout: `src/layouts/Layout.astro`.
- Layout handles SEO meta, JSON-LD schema, favicon links, and default theme behavior.
- Default theme is light; dark mode only if `localStorage.theme === 'dark'`.

## Data Sources
- Primary content source: `src/data/portfolio.json`.
- Update this file for hero copy, nav items, bento content, work history, lab items, and footer text.

## Major Components
- `src/components/Navbar.tsx` — sticky nav, mobile menu, theme toggle, contact modal trigger.
- `src/components/Loader.tsx` — initial loading screen with animated text/progress.
- `src/components/Hero.astro` + `src/components/HeroText.tsx` + `src/components/HeroBackground.tsx` — hero layout, text animation, background motion.
- `src/components/LogoSlider.astro` — autoplay carousel with optional multi-row support; includes inline JS for scrolling logic.
- `src/components/BentoGrid.tsx` — about section cards driven by `portfolio.json`.
- `src/components/CaseStudyRail.tsx` — work grid + modal detail view; focus trap logic.
- `src/components/LabSection.astro` — experiments section.
- `src/components/ContactModal.tsx` — Web3Forms submission, focus trap, success/error states.
- `src/components/ThemeToggle.tsx` — toggles `dark` class and `localStorage.theme`.
- `src/components/Footer.astro` — footer copy.

## Styling System
- Tailwind config in `tailwind.config.mjs`.
- Design tokens defined as CSS variables in `src/styles/global.css`.
- Theme variables: `--bg-depth`, `--surface`, `--surface-hover`, `--accent-primary`, `--accent-secondary`, `--text-primary`, `--text-muted`, `--border-color`.
- `dark` class switches variables.
- Utility helpers in `global.css`: `.no-scrollbar`, `.flicker-fix`, and custom hover for accent primary.

## Assets
- Static assets in `public/` and `public/assets/` (images, favicons, logos).
- Hero image: `public/assets/headshot-hero.webp`.
- OG image: `public/assets/og-image.png`.

## Patterns and Conventions
- Prefer Astro for static structure and React islands for interactive components.
- Use `client:load` for immediate hydration and `client:visible` for lazy hydration.
- Avoid mixing Tailwind `transition-all` with Framer Motion on the same element.
- Keep accessibility in mind: keyboard navigation, focus traps, `aria-*` labels, and `role="dialog"` for modals.
- If adding new copy-heavy sections, prefer wiring them through `src/data/portfolio.json`.

## Deployment/Config
- Site URL set in `astro.config.mjs` for sitemap and canonical URLs.

## Notes for Future Changes
- Theme behavior is enforced in `Layout.astro` (light by default).
- Contact form requires a valid Web3Forms key in `.env`.
- TypeScript is non-strict; JSON imports are enabled via `resolveJsonModule`.
