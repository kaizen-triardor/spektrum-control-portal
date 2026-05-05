# Spektrum Control Portal

Static landing page at `spektrumcontrol.rs`. Routes users to the admin dashboard and mobile app.

## Stack

Vanilla HTML + CSS + JS. No build step. No dependencies.

```
index.html   — semantic single-viewport
style.css    — light/dark tokens + responsive
script.js    — theme toggle + i18n (4 locales)
robots.txt   — Allow: /
sitemap.xml  — single URL with hreflang
assets/      — logo, favicon, OG image
```

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

**Option A — Vercel (recommended for parity with the other apps):**
- Create project in `mbs-spektrum` org named `spektrum-control-portal`
- Connect this GitHub repo
- Framework preset: Other (or "Static")
- Output dir: `.` (root) — no build needed
- Attach domain: `spektrumcontrol.rs`

**Option B — Hostinger (if hosting alongside mbs-spektrum.com):**
- Static deploy via FTP or Git auto-pull
- Same SSL, same hosting bill

The apps (`app.spektrumcontrol.rs`, `field.spektrumcontrol.rs`) stay on Vercel regardless — they need Next.js SSR.

## What's deliberately NOT here

- No `manifest.json` — only `field.spektrumcontrol.rs` is a PWA
- No service worker
- No login form — clicks go to apps, apps handle auth
- No JS framework / build / node_modules

If you find yourself wanting to add any of these, talk to the project owner first. The minimalism is the design.

## Acceptance checklist

- [ ] Single viewport (no scroll on iPhone SE 320×568, no scroll on 14" laptop 1366×768)
- [ ] Theme toggle works + persists across reload
- [ ] All 4 locales display correctly + persist
- [ ] CTAs are keyboard-focusable (Tab nav)
- [ ] Lighthouse desktop ≥ 95 in Performance / Accessibility / Best Practices / SEO
- [ ] Lighthouse mobile ≥ 90
- [ ] Favicon + apple-touch-icon present
- [ ] DevTools → Application: NO service worker, NO manifest

## Assets needed before launch

- `assets/logo.svg` — Spektrum Control logo (or SVG version of `SpektrumControlLogo.png`)
- `assets/og-image.png` — 1200×630 social preview
- `assets/apple-touch-icon.png` — 180×180

Those are placeholders today — drop them in before pushing to production.
