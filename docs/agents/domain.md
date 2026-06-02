# Domain Docs

This is a single-context repo for Ollie Pinto's personal portfolio site.

## Before exploring, read these if present

- `CONTEXT.md` at the repo root
- `docs/adr/` for architecture decision records

If these files do not exist, proceed silently. They are created lazily when the project has stable domain language or decisions worth recording.

## Current context

- Static-first Astro portfolio.
- React islands provide interactivity for navigation, theme switching, animated hero elements, modal dialogs, and work cards.
- Homepage copy and portfolio content primarily live in `src/data/portfolio.json`.
- Technical/legal/discovery infrastructure pages and files can live as direct Astro routes or static files rather than in `portfolio.json`.

## Use existing language

Prefer the project vocabulary already used in `AGENTS.md`, source components, and `portfolio.json`: portfolio, technical hardening, contact form, Web3Forms, agent readiness, security headers, privacy page, and current visual system.
