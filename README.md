# Quantum Florida Management

Professional flat-fee property management website serving property owners across Florida.

**Live Site:** [hectronix2005.github.io/Quantum](https://hectronix2005.github.io/Quantum/src/index.html)

## About

Quantum Florida Management offers full-service property management with transparent flat monthly fees instead of the traditional percentage-based pricing model. Services include property administration, maintenance coordination, HOA representation, rental management, sales coordination, and financial oversight.

### Pricing Plans

| Plan | Price | Target |
|------|-------|--------|
| Essential | $149/mo | Single-unit condos & apartments |
| Professional | $249/mo | Full-service rental properties |
| Premium | $399/mo | Multi-unit portfolios & investment properties |

### Service Areas

Miami-Dade, Broward (Fort Lauderdale), Orange (Orlando), Hillsborough (Tampa), Duval (Jacksonville)

## Project Structure

```
├── index.html              # Root redirect to src/index.html
├── 404.html                # Custom 404 page
├── robots.txt              # Search engine crawl rules
├── sitemap.xml             # XML sitemap for SEO
└── src/
    ├── index.html          # Main landing page
    ├── css/styles.css      # Global styles
    ├── js/main.js          # Main JavaScript (i18n, animations, forms)
    ├── assets/             # Images, favicons, OG images
    ├── login/              # Login portal
    │   ├── index.html
    │   ├── css/
    │   └── js/
    ├── admin/              # Admin dashboard
    │   ├── index.html
    │   ├── css/
    │   └── js/
    └── client/             # Client portal
        ├── index.html
        ├── css/
        └── js/
```

## Features

- **Bilingual** — Full English/Spanish support with live language toggle
- **Responsive** — Mobile-first design with Inter & Playfair Display typography
- **SEO Optimized** — Meta tags, Open Graph, Twitter Cards, JSON-LD structured data, sitemap, robots.txt
- **Portals** — Separate login, admin dashboard, and client portal interfaces
- **Static Hosting** — Deployed on GitHub Pages with no backend dependencies

## Deployment

The site is hosted on **GitHub Pages** from the `main` branch. Any push to `main` automatically deploys.

## License

All rights reserved. &copy; 2026 Quantum Florida Management.