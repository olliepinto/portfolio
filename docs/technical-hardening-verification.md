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

## Production verification completed

- Production deployment completed on 2026-06-02:
  - Production URL: `https://portfolio-b6lftj0bz-ollies-projects-cc9d24ca.vercel.app`
  - Aliased domain: `https://www.olliepinto.com`
  - Vercel deployment ID: `dpl_5hqM4tdAEzXBFdx7esCJ27yn39pw`
  - Inspect URL: `https://vercel.com/ollies-projects-cc9d24ca/portfolio/5hqM4tdAEzXBFdx7esCJ27yn39pw`
- Production route checks passed:
  - `/`, `/contact`, and `/privacy` return `200`
  - `/missing-page` returns `404`
  - `/404` returns `404`
  - `robots.txt`, `llms.txt`, `site.webmanifest`, and `favicon.ico` return `200`
- Production responses include:
  - `Content-Security-Policy`
  - `X-Content-Type-Options`
  - `X-Frame-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`
  - `Strict-Transport-Security`
  - `Link`
- 404 noindex verification passed:
  - Unknown routes include the 404 page `noindex, follow` metadata
  - `/404` includes `X-Robots-Tag: noindex, follow`
- Production content checks passed:
  - contact and privacy pages do not expose implementation-provider or personal email process copy
  - contact, privacy, and 404 navbar links resolve to homepage anchors
  - homepage intro loader markup is absent

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
