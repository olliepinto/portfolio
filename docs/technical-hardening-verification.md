# Technical Hardening Verification

Last local verification: 2026-06-02.

## Local checks completed

- `npm run typecheck` passed with 0 errors, 0 warnings, and 0 hints.
- `npm run build` passed and generated 4 static routes:
  - `/`
  - `/contact/`
  - `/privacy/`
  - `/404.html`
- `vercel.json` and `public/site.webmanifest` parse as valid JSON.
- Generated HTML audit passed for:
  - exactly one `h1` on home, contact, privacy, and 404 pages
  - canonical links on all generated pages
  - JSON-LD on all generated pages
  - homepage SSR content visible immediately, with the intro loader removed
  - navbar section links resolve to homepage anchors from contact, privacy, and 404 pages
  - manifest and favicon links
  - theme-color and Twitter card metadata
  - 404 `noindex, follow` metadata
  - sitemap includes `/`, `/contact/`, and `/privacy/`
  - sitemap excludes `/404`
  - `robots.txt`, `llms.txt`, `site.webmanifest`, and `favicon.ico` are present in `dist`
- Local HTTP check confirmed an unknown route returns `404 Not Found`.
- Browser smoke checks confirmed:
  - homepage renders one visible main heading
  - no local storage is written on first load in the tested browser context
  - `/contact`, `/privacy`, and unknown routes render the expected page titles/headings
  - contact form shows field-level errors for empty and invalid input
  - missing Web3Forms configuration shows a clear fallback message without exposing a personal email address
  - real Web3Forms submission succeeds from the local contact page when `PUBLIC_WEB3FORMS_ACCESS_KEY` is configured
  - contact modal opens with focus on the close button, sets the main content inert while open, closes cleanly, and restores focus
- Vercel preview deployment was created and verified:
  - Preview URL: `https://portfolio-obet2faja-ollies-projects-cc9d24ca.vercel.app`
  - `/`, `/contact`, and `/privacy` return `200`
  - `/missing-page` returns `404`
  - `robots.txt`, `llms.txt`, `site.webmanifest`, and `favicon.ico` are available
  - Preview responses include `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, `Link`, and `Cache-Control`
  - 404 preview response includes `X-Robots-Tag: noindex`

## Still requires external verification

- Production header checks require a production deployment or promotion.
- Read-only production check on 2026-05-31 confirmed production is still the old deployment:
  - `/contact`, `/privacy`, `/llms.txt`, and an unknown route return Vercel plain-text `404`
  - new CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and `Link` headers are not present on `/`
- Header verification should check:
  - `Content-Security-Policy`
  - `X-Content-Type-Options`
  - `X-Frame-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`
  - `Strict-Transport-Security`
  - `Cache-Control`
  - `Link`
  - `X-Robots-Tag` on the 404 route

## Useful commands

```bash
npm run typecheck
npm run build
curl -I https://<preview-url>/
curl -I https://<preview-url>/contact
curl -I https://<preview-url>/privacy
curl -I https://<preview-url>/missing-page
curl https://<preview-url>/robots.txt
curl https://<preview-url>/llms.txt
curl https://<preview-url>/site.webmanifest
```
